import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/Colors';

export default function ConfirmacaoHandebol() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    localNome?: string;
    localEndereco?: string;
    horario?: string;
    nivel?: string;
  }>();

  const localNome = params.localNome || 'Quadra não informada';
  const localEndereco = params.localEndereco || '';
  const horario = params.horario || 'Horário não informado';
  const nivel = params.nivel || '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <Text style={styles.message}>
            Parabéns por confirmar seu treino de{'\n'}
            <Text style={styles.bold}>
              Handebol {nivel ? `(${nivel})` : ''}
            </Text>{' '}
            no <Text style={styles.bold}>{localNome}</Text>
            {localEndereco ? `\n${localEndereco}` : ''}
            {'\n'}às <Text style={styles.bold}>{horario}</Text>!
          </Text>

          <View style={styles.details}>
            <Detail label="Local" value={localNome} />
            {localEndereco ? <Detail label="Endereço" value={localEndereco} /> : null}
            <Detail label="Horário" value={horario} />
            {nivel ? <Detail label="Nível" value={nivel} /> : null}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
  details: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: colors.lightBlue,
    fontWeight: '600',
  },
  detailValue: {
    color: '#fff',
    flexShrink: 1,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: '600',
  },
});

