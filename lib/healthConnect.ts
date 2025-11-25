import {
  initialize,
  requestPermission,
  readRecords,
  Permission,
} from "react-native-health-connect";
import { Platform } from "react-native";

const DEFAULT_RESULT = { steps: 0, activeCalories: 0 };

export async function getStepsCaloriesActive() {
  try {
    // Somente Android
    if (Platform.OS !== "android") {
      console.warn("⚠ Health Connect só funciona no Android.");
      return DEFAULT_RESULT;
    }

    // Tenta inicializar (mesmo que a verificação de módulo falhe, pode funcionar)
    console.log("🔄 Tentando inicializar Health Connect...");
    const ok = await initialize();
    if (!ok) {
      console.warn("⚠ Health Connect não iniciou. Verifique se o módulo está linkado corretamente.");
      return DEFAULT_RESULT;
    }
    console.log("✅ Health Connect inicializado com sucesso!");

    // Permissões obrigatórias
    console.log("🔐 Solicitando permissões do Health Connect...");
    await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "ActiveCaloriesBurned" },
    ] satisfies Permission[]);
    console.log("✅ Permissões concedidas!");

    // Últimas 24 horas
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // -------------------- PASSOS --------------------
    console.log("📊 Lendo dados de passos...");
    const stepsResult = await readRecords("Steps", {
      timeRangeFilter: {
        operator: "between",
        startTime,
        endTime,
      },
    });

    const steps =
      stepsResult.records?.reduce(
        (sum, r) => sum + (r.count ?? 0),
        0
      ) ?? 0;
    console.log(`👣 Passos encontrados: ${steps}`);

    // -------------------- CALORIAS ATIVAS --------------------
    console.log("🔥 Lendo dados de calorias ativas...");
    const caloriesActiveResult = await readRecords("ActiveCaloriesBurned", {
      timeRangeFilter: {
        operator: "between",
        startTime,
        endTime,
      },
    });

    const activeCalories =
      caloriesActiveResult.records?.reduce(
        (sum, r) => sum + (r.energy?.inKilocalories ?? 0),
        0
      ) ?? 0;
    console.log(`🔥 Calorias ativas encontradas: ${activeCalories}`);

    return {
      steps,
      activeCalories,
    };

  } catch (error: any) {
    console.error("❌ Erro no Health Connect:", error);
    console.error("Detalhes do erro:", error?.message || error);
    return DEFAULT_RESULT;
  }
}
