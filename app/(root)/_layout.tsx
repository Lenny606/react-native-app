import {useGlobalContext} from "@/lib/global-provider";
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator} from "react-native";
import {Navigator, Redirect, Slot} from "expo-router";

export default function AppLayout() {
    const {isLoggedIn, loading, refetch} = useGlobalContext()

    if (loading) {
        return (
            <SafeAreaView className={'bg-white h-full flex justify-center items-center'}>
                {/*LOADER*/}
                <ActivityIndicator className={'text-primary-300'} size={'large'}/>
            </SafeAreaView>
        )
    }
    //TODO check if user is logged in
    // if (!isLoggedIn) {
    //     return (
    //         <Redirect href={'/'}/>
    //     )
    // }

    // Slot is a placeholder for the current screen
    return <Slot />
}