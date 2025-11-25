import React from 'react';
import colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/src/contextos/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Image, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';



export default function HistoricoTreinos() {
    const { user } = useAuth();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>


                    <View style={styles.header}>

                        <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/pages/(logado)/home/page')}>
                            <MaterialIcons name="arrow-back-ios" size={24} color={colors.darkBlue} />
                        </TouchableOpacity>

                        <Text style={styles.logoText}>Histórico de treinos</Text>

                    </View>
                </View>

                <View style={styles.main}>


                    <Text style={styles.welcomeText}>Confira seus resultados {user?.user_metadata.name}!</Text>


                    <View style={styles.formSearch}>


                        <TextInput placeholder="Procurar atividades em grupo" style={styles.inputSearch} textContentType="birthdate" placeholderTextColor={colors.darkGray} />
                        <TouchableOpacity activeOpacity={0.6}>
                            <MaterialIcons name="search" size={20} color={colors.gray} />
                        </TouchableOpacity>


                    </View>

                    <View style={styles.atividadesEmGrupo}>

                        <Text style={styles.dataUltimoTreinoTitle}>Ultimo treino: </Text>
                        <Text style={styles.dataUltimoTreinoTitle}>Tempo de treino: </Text>

                        <View style={styles.conatinerUltimosTreinos}>
                            <Text style={styles.ultimoTreinoText}>Nenhum treino feito recentemente</Text>
                        </View>



                    </View>
                </View>



        </ScrollView>
    </SafeAreaView >
);

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: colors.white,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        gap: 5,


    },
    voltar: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 10,

    },
    header: {
        flexDirection: "row",
        alignContent: "center",


    },
    logoText: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.darkBlue,
        alignSelf: "center",
    },
    main: {
        width: '100%',
        padding: 20,
        gap: 12,

    },
    welcomeText: {
        width: '100%',
        fontSize: 16,
        color: colors.darkGray,
    },
    labelSearch: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.darkBlue,
        marginTop: 16,
    },
    formSearch: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.gray,
        paddingHorizontal: 16,
        paddingVertical: 3,
        gap: 8,
        borderRadius: 30,
        marginTop: 10,
    },
    inputSearch: {
        flex: 1,
        width: '100%',
        minHeight: 40,
        fontSize: 16,
    },
    atividadesEmGrupo: {
        marginTop: 10,
    },
    dataUltimoTreinoTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: colors.darkGray,
        marginBottom: 10,
    },
    conatinerUltimosTreinos: {
        width: '100%',
        marginTop: 10,
        minHeight: 200,
        height: 'auto',
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        alignItems: 'center',
    },
    ultimoTreinoText: {
        fontSize: 15,

        color: colors.darkGray,
        textAlign: "center",
    },




});


