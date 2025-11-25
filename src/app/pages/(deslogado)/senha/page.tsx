import { useAuth } from '@/src/contextos/AuthContext';
import { supabase } from '@/lib/supabase';
import { View, Text, StyleSheet } from 'react-native';

export default function EsqueciSenha() {
    // const {email, setEmail} = useState('');
    // const {setAuth, user} = useAuth();

    // async function handleResetPassword() {
    //     const { data, error } = await supabase.auth.resetPasswordForEmail(user?.email || '', {
            
    //     });
    //     if (error) {
    //         console.log('Error:', error.message);
    //         return;
    //     }
    //     console.log('Senha redefinida com sucesso', data);

    // }
    return (
        <View style={styles.container}>
            <Text>Esqueci Senha Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
});
