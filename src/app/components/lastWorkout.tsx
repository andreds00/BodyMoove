import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/constants/Colors";

/** NORMALIZA A DATA VINDO DO SUPABASE */
function parseDate(dateField: any, timeField: any): Date | null {
    try {
        // Se já for Date
        if (dateField instanceof Date) {
            const d = new Date(dateField);
            if (timeField) {
                const [hh, mm] = String(timeField).split(":").map(Number);
                d.setHours(hh || 0, mm || 0, 0, 0);
            }
            return d;
        }

        // Formato: YYYY-MM-DD
        if (typeof dateField === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateField)) {
            const time = timeField?.length === 5 ? `${timeField}:00` : timeField || "00:00:00";
            const d = new Date(`${dateField}T${time}`);
            return isNaN(d.getTime()) ? null : d;
        }

        // Formato ISO completo
        if (typeof dateField === "string" && dateField.includes("T")) {
            const d = new Date(dateField);
            if (!isNaN(d.getTime())) return d;
        }

        // Formato Supabase object { year, month, day }
        if (typeof dateField === "object" && dateField?.year && dateField?.month && dateField?.day) {
            const { year, month, day } = dateField;
            const [hh, mm] = String(timeField || "00:00").split(":").map(Number);
            const d = new Date(year, month - 1, day, hh || 0, mm || 0, 0);
            return d;
        }
    } catch (e) {}

    return null;
}

export default function LastWorkoutCard({
    workout,
    loading,
    onPressView,
}: {
    workout: any | null;
    loading?: boolean;
    onPressView?: () => void;
}) {
    if (loading) {
        return (
            <View style={styles.emptyContainer}>
                <ActivityIndicator size="large" color={colors.darkBlue} />
            </View>
        );
    }

    if (!workout) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.noWorkoutText}>Você ainda não fez nenhum treino.</Text>
            </View>
        );
    }

    // --- Correção: usa parseDate ---
    const d = parseDate(workout.data, workout.horario);

    const formattedDate = d
        ? new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
          }).format(d)
        : "—";

    // valores placeholder
    const distance = "10 km";
    const steps = "10.000";
    const bpm = "68";
    const speed = "15";

    return (
        <LinearGradient
            colors={[colors.blue, colors.darkBlue, "#071132"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.card}
        >
            <View style={styles.headerPill}>
                <Text style={styles.headerPillText}>Último treino — {formattedDate}</Text>
            </View>

            <View style={styles.metricsList}>
                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="run" size={28} color="#fff" />
                    <Text style={styles.metricText}>{distance}</Text>
                </View>

                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="shoe-print" size={28} color="#fff" />
                    <Text style={styles.metricText}>{steps}</Text>
                </View>

                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="heart-pulse" size={28} color="#fff" />
                    <Text style={styles.metricText}>{bpm} bpm</Text>
                </View>

                <View style={styles.metricRow}>
                    <MaterialCommunityIcons name="speedometer" size={28} color="#fff" />
                    <Text style={styles.metricText}>{speed} Km/h</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={onPressView}>
                <Text style={styles.buttonText}>Ver último treino</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        width: "100%",
        minHeight: 150,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        padding: 20,
        borderRadius: 20,
        backgroundColor: colors.lightGray,
    },
    noWorkoutText: {
        fontSize: 15,
        color: colors.darkGray,
        textAlign: "center",
    },
    card: {
        width: "100%",
        borderRadius: 20,
        padding: 20,
        marginTop: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    headerPill: {
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 18,
    },
    headerPillText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },
    metricsList: {
        marginTop: 6,
        gap: 16,
        alignItems: "center",
    },
    metricRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    metricText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    button: {
        marginTop: 20,
        alignSelf: "flex-end",
        backgroundColor: "rgba(255,255,255,0.12)",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },
});
