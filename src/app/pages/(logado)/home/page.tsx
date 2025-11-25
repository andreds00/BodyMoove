import React, { useCallback, useRef, useMemo } from 'react';
import colors from '@/constants/Colors';
import { useAuth } from '@/src/contextos/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Image, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';




export default function Home() {
    const { user, userData } = useAuth();
    const bottomSheetRef = useRef<BottomSheetModal | null>(null);
    const snapPoints = useMemo<string[]>(() => ['30%', '80%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present?.();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}  // some quando fechar
                appearsOnIndex={0}      // aparece quando abrir
                opacity={0.6}           // intensidade do escurecimento

            />
        ),
        []
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
                        showsVerticalScrollIndicator={false}
                    >


                        <View style={styles.container}>

                            <View style={styles.header}>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
                                    <Text style={styles.logoText}>Body Moove</Text>
                                </View>


                                <View style={styles.iconesHeader}>
                                    <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/pages/(logado)/notificacao/page')}>

                                        <View style={styles.icone}>
                                            <MaterialIcons name="notifications" size={20} color="white" />
                                        </View>

                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('/pages/(logado)/perfil/page')}>
                                        <View style={styles.icone}>
                                            <MaterialIcons name="person" size={20} color="white" />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>


                            <View style={styles.main}>


                                <Text style={styles.welcomeText}>Bem-vindo(a), { userData?.name ||user?.user_metadata.name}</Text>



                                <Text style={styles.labelSearch}>O que faremos hoje?</Text>

                                <View style={styles.formSearch}>

                                    <TouchableOpacity activeOpacity={0.4} style={styles.buttonCategorias} onPress={handlePresentModalPress}>


                                        <Text style={styles.textButtonCategorias}>Buscar por categoria</Text>
                                        <TouchableOpacity activeOpacity={0.6}>
                                            <MaterialIcons name="search" size={24} color={colors.gray} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>

                                </View>

                                <BottomSheetModal
                                    ref={bottomSheetRef}
                                    index={1}
                                    snapPoints={snapPoints}
                                    backgroundStyle={{ backgroundColor: colors.white }}

                                    enablePanDownToClose={true}
                                    backdropComponent={renderBackdrop}
                                    onChange={handleSheetChanges}

                                >
                                    <BottomSheetView style={{ flex: 1, alignItems: 'center' }}
                                    >
                                        <LinearGradient style={styles.bottonShettHeader}
                                            // Background Linear Gradient
                                            colors={[colors.darkBlue, colors.blue, colors.lightBlue]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >

                                            <Text style={styles.titleBottomSheet}>Categorias</Text>

                                        </LinearGradient>
                                        <View style={styles.modalidadesContainer}>
                                            <View style={{ width: "100%", padding: "4%", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-around", alignItems: 'center', gap: 9.5 }}>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/volei/page') }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-volleyball' size={40} color="white" />
                                                    <Text style={styles.modalidadesText}>Vôlei</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/capoeira/page')}}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-tennis' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Tênis</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/capoeira/page') }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-kabaddi' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Capoeira</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/lutas/page') }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-mma' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Lutas</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/danca/page') }}>
                                                    <View style={styles.modalidadesImageContainer}>
                                                        <Image style={styles.modalidadesImage} source={require('@/assets/images/danca.png')} />

                                                    </View>
                                                    <Text style={styles.modalidadesText}>Dança</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/handebol/page') }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-handball' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Handebol</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/ginastica/page') }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-gymnastics' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Ginástica</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push("/pages/(logado)/categorias/basquete/page") }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-basketball' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Basquete</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/meditacao/page') }}>
                                                    <View style={styles.modalidadesImageContainer}>
                                                        <Image style={styles.modalidadesImage} source={require('@/assets/images/meditacao.png')} />

                                                    </View>
                                                    <Text style={styles.modalidadesText}>Meditação</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router.push('/pages/(logado)/categorias/corrida/page') }}>
                                                    <View style={styles.modalidadesImageContainer}>
                                                        <MaterialIcons style={styles.modalidadesIcon} name='directions-run' size={35} color="white" />

                                                    </View>
                                                    <Text style={styles.modalidadesText}>Corrida</Text>
                                                </TouchableOpacity>



                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='chair' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Descanso</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router }}>
                                                    <View style={styles.modalidadesImageContainer}>
                                                        <Image style={styles.modalidadesImage} source={require('@/assets/images/circo.png')} />

                                                    </View>
                                                    <Text style={styles.modalidadesText}>Circo</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='sports-cricket' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Squash</Text>
                                                </TouchableOpacity>


                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='fitness-center' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>musculação</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.modalidades} activeOpacity={0.7} onPress={() => { router }}>
                                                    <MaterialIcons style={styles.modalidadesIcon} name='ice-skating' size={38} color="white" />
                                                    <Text style={styles.modalidadesText}>Patinação</Text>
                                                </TouchableOpacity>









                                            </View>

                                        </View>
                                    </BottomSheetView>
                                </BottomSheetModal>






                                <View style={styles.atividadesEmGrupo}>

                                    <Text style={styles.welcomeText}>Atividades em grupo</Text>

                                    <TouchableOpacity activeOpacity={0.6} style={styles.atividades} onPress={() => { router.replace("/pages/categorias/hot yoga/informacoes") }}>
                                        <Text style={styles.atividadeTitle}>Hot Yoga Iniciante - 10h</Text>
                                        <MaterialIcons name="arrow-forward-ios" size={18} color={colors.white} />
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.containerTreinos}>

                                    <View style={styles.mostrarTreinos}>
                                        <Text style={styles.mostrarTreinosText}>Mostrar meus treinos</Text>
                                        <TouchableOpacity activeOpacity={0.6} style={styles.buttonMostrarTreinos} onPress={() => { router.push('/pages/(logado)/meusTreinos/page') }}>
                                            <MaterialIcons name="arrow-forward-ios" size={18} color={colors.white} />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.avatar}>
                                        <Image style={styles.avatar} source={require('@/assets/images/avatar.png')} />
                                    </View>

                                </View>

                                <View style={styles.ultimoTreino}>

                                    {/* O ultimo treino ficara aqui */}
                                    <Text style={styles.ultimoTreinoText}>Você ainda não fez nenhum treino.</Text>
                                    

                                </View>


                                <View style={styles.containerButtons}>

                                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonTreinosMetas} onPress={() => router.push('/pages/(logado)/historicoTreinos/page')}>
                                        <MaterialIcons name="calendar-today" size={24} color={colors.darkBlue} />
                                        <Text style={styles.buttonTreinosMetasText}>Histórico de treinos</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonTreinosMetas} onPress={() => router.push('/pages/(logado)/metas/page')}>
                                        <MaterialIcons name="crisis-alert" size={24} color={colors.darkBlue} />
                                        <Text style={styles.buttonTreinosMetasText}>Metas</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
                    </ScrollView >
                </BottomSheetModalProvider>
            </GestureHandlerRootView>


        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: colors.white,
        paddingVertical: '3%',
        paddingHorizontal: '3%',


    },
    header: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,


    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logo: {
        width: 30,
        height: 30,
    },
    logoText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    iconesHeader: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "flex-end",
        gap: 16,
    },
    icone: {
        backgroundColor: colors.darkBlue,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
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
    buttonCategorias: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        minHeight: 40,
        alignItems: "center",
    },
    textButtonCategorias: {
        flex: 1,
        fontSize: 16,
        color: colors.darkBlue,
    },
    atividadesEmGrupo: {
        marginTop: 10,
    },
    atividades: {
        flexDirection: "row",
        marginTop: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue,
    },
    atividadeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
    },
    containerTreinos: {
        flexDirection: "row",
        width: '100%',
        height: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
    },
    mostrarTreinos: {
        width: '55%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 12,
        height: 'auto',
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: colors.darkBlue,
        gap: 20,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 3,
        // Shadow for Android
        elevation: 3,
    },
    mostrarTreinosText: {
        width: '100%',
        textAlign: 'justify',
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
    },
    buttonMostrarTreinos: {
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: colors.white,
        width: "100%",
        borderRadius: 25,
        padding: 10,
    },

    avatar: {

        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 300,

    },
    ultimoTreino: {

        width: '100%',
        minHeight: 150,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        padding: 20,
        borderRadius: 25,
        backgroundColor: colors.lightGray,
    },
    ultimoTreinoText: {
        fontSize: 15,

        color: colors.darkGray,
        textAlign: "center",
    },
    dataUltimoTreino: {
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: 25,
        padding: 8,
    },
    dataUltimoTreinoText: {
        fontWeight: "bold",
        fontSize: 17,
        color: colors.white,
    },
    descricaoUltimoTreino: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: '100%',
        marginTop: 10,
        flexDirection: "row",
    },
    km: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: colors.white,
    },
    containerButtons: {
        marginTop: 20,
        gap: 15,
    },
    buttonTreinosMetas: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.gray,
    },
    buttonTreinosMetasText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkBlue,
    },
    titleBottomSheet: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: 10,
        marginBottom: 10
    },
    bottonShettHeader: {
        backgroundColor: colors.blue,
        width: '100%',
        height: "13%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,


    },
    modalidadesContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    modalidades: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "10%",


    },
    modalidadesIcon: {
        marginBottom: 4,
        backgroundColor: colors.darkBlue,
        borderRadius: 50,
        padding: 10,
        width: "100%",
        height: "100%",
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white,


    },
    modalidadesImage: {
        width: 40,
        height: 40,

        textAlign: 'center',
        textAlignVertical: 'center',

    },
    modalidadesImageContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "4%",
        backgroundColor: colors.darkBlue,
        borderRadius: 50,
        padding: 10,
    },

    modalidadesText: {
        textAlign: 'center',
        fontSize: 14,
        color: colors.darkBlue,
        fontWeight: 'bold',


    },

});


