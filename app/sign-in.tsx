import {View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import {login} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";
import {Redirect} from "expo-router";

const SignIn = () => {

    const {isLoggedIn, loading, refetch} = useGlobalContext()

    if (isLoggedIn && !loading) {
        return <Redirect href={'/'} />
    }

    const handleLogin = async () => {

        const result = await login()

        if (result) {
            console.log('Login success')
            refetch()
        } else {
            console.log('Login fail')
            Alert.alert('Failed to login')
        }
    }
    return (
        <SafeAreaView className={'h-full bg-white'}>
            <ScrollView contentContainerClassName={'h-full'}>
                <Image source={images.onboarding} className={'w-full h-4/6'} resizeMode={'contain'}/>
                <View className={'px-10'}>
                    <Text className={'text-base text-center uppercase font-rubik text-black-200'}>
                        Welcome to the app
                    </Text>
                    <Text className={'text-3xl font-rubikBold text-black-300 text-center mt-2'}>
                        New application {'\n'}
                        <Text className={'text-primary-300'}>
                            Home Page
                        </Text>
                    </Text>
                    <Text className={'text-3xl font-rubik text-black-200 text-center mt-12'}>
                        Login with Google
                    </Text>
                    <TouchableOpacity
                        onPress={handleLogin}
                        className={'bg-primary-300 shadow-md shadow-zinc-300 w-full py-4 rounded-lg mt-4'}
                    >
                        <View className={'flex flex-row items-center justify-center'}>
                            <Image
                                source={icons.google}
                                className={'w-4 h-5'}
                                resizeMode={'contain'}
                            />
                            <Text className={'text-lg font-rubikMedium text-black-300 ml-2 '}>Continue with
                                Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignIn;