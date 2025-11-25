// src/services/BleService.ts
import { BleManager, Device, Subscription } from "react-native-ble-plx";
import { Buffer } from "buffer";

const manager = new BleManager();
let monitorSubscription: Subscription | null = null;
let connectedDevice: Device | null = null;

export const getManager = () => manager;

export async function startScan(onDeviceFound: (d: Device) => void, timeout = 10000) {
  // limpa lista do caller; aqui só start scan
  manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
    if (error) {
      console.warn("BLE scan error:", error);
      return;
    }
    if (device) onDeviceFound(device);
  });

  // auto-stop após timeout
  setTimeout(() => {
    try { manager.stopDeviceScan(); } catch (e) {}
  }, timeout);
}

export async function stopScan() {
  try { manager.stopDeviceScan(); } catch (e) {}
}

export async function connectToDevice(deviceId: string) {
  try {
    const device = await manager.connectToDevice(deviceId, { requestMTU: 517 });
    await device.discoverAllServicesAndCharacteristics();
    connectedDevice = device;
    return device;
  } catch (err) {
    console.warn("Erro conectar dispositivo:", err);
    throw err;
  }
}

export async function disconnectCurrentDevice() {
  try {
    if (!connectedDevice) return;
    // remove monitor subscription antes de desconectar
    if (monitorSubscription) {
      try { monitorSubscription.remove(); } catch {}
      monitorSubscription = null;
    }
    await manager.cancelDeviceConnection(connectedDevice.id);
    connectedDevice = null;
  } catch (err) {
    console.warn("Erro ao desconectar:", err);
    throw err;
  }
}

// Monitora característica Heart Rate (2A37) de 180D
export function monitorHeartRate(device: Device, onHeartRate: (bpm: number) => void) {
  const serviceUUID = "180D";
  const characteristicUUID = "2A37";

  // se já tinha uma subscription, remove
  if (monitorSubscription) {
    try { monitorSubscription.remove(); } catch {}
    monitorSubscription = null;
  }

  const sub = device.monitorCharacteristicForService(
    serviceUUID,
    characteristicUUID,
    (error, characteristic) => {
      if (error) {
        console.warn("monitor error:", error);
        return;
      }
      if (!characteristic?.value) return;

      try {
        const buffer = Buffer.from(characteristic.value, "base64");
        const flags = buffer[0];
        const hrFormatUINT16 = flags & 0x01;
        let bpm = 0;
        if (hrFormatUINT16) bpm = buffer.readUInt16LE(1);
        else bpm = buffer[1];
        onHeartRate(bpm);
      } catch (e) {
        console.warn("Erro parse HR:", e);
      }
    }
  );

  // guarda para cleanup
  monitorSubscription = sub;
  return () => {
    try { sub.remove(); } catch {}
    monitorSubscription = null;
  };
}

// cleanup final
export async function destroyManager() {
  try {
    if (monitorSubscription) {
      try { monitorSubscription.remove(); } catch {}
      monitorSubscription = null;
    }
    manager.destroy();
  } catch (e) {
    // ignore
  }
}
export function monitorRawCharacteristic(
  device: Device,
  serviceUUID: string,
  characteristicUUID: string,
  onData: (value: Uint8Array) => void
) {
  return device.monitorCharacteristicForService(
    serviceUUID,
    characteristicUUID,
    (error, characteristic) => {
      if (error) {
        console.warn("Erro monitor:", error);
        return;
      }

      if (!characteristic?.value) return;

      try {
        const raw = Buffer.from(characteristic.value, "base64");
        onData(raw);
      } catch (e) {
        console.warn("Erro ao decodificar characteristic:", e);
      }
    }
  );
}
// Lista todas as characteristics NOTIFY do dispositivo
export async function findNotifyCharacteristics(device: Device) {
  const result: {
    serviceUUID: string;
    charUUID: string;
    isReadable: boolean;
  }[] = [];

  try {
    const services = await device.services();
    for (const service of services) {
      const chars = await service.characteristics();
      for (const ch of chars) {
        if (ch.isNotifiable) {
          result.push({
            serviceUUID: service.uuid,
            charUUID: ch.uuid,
            isReadable: !!ch.isReadable,
          });
        }
      }
    }
  } catch (e) {
    console.warn("Erro findNotifyCharacteristics:", e);
  }

  return result;
}

// Parser específico detectado no SEU relógio
// SERVICE: 00006006
// CHAR:    00008004
export function monitorStepsAndCalories(
  device: Device,
  onUpdate: (steps: number, calories: number) => void
) {
  const SVC = "00006006-0000-1000-8000-00805f9b34fb";
  const CHAR = "00008004-0000-1000-8000-00805f9b34fb";

  return device.monitorCharacteristicForService(
    SVC,
    CHAR,
    (error, characteristic) => {
      if (error) {
        console.warn("Erro monitorStepsAndCalories:", error);
        return;
      }

      if (!characteristic?.value) return;
      try {
        const raw = Buffer.from(characteristic.value, "base64");

        // Seu relógio envia assim:
        // [..., ?, ?, steps_L, steps_H, calories, ...]
        const steps = raw[3] + (raw[4] << 8);
        const calories = raw[5];

        onUpdate(steps, calories);
      } catch (e) {
        console.warn("Erro parse steps/calories:", e);
      }
    }
  );
}

