import {View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import {logout} from "@/lib/appwrite";


interface SettingItemProps {
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}: SettingItemProps
) => {

    return (
        <TouchableOpacity className={'flex flex-row items-center justify-between py-3'}>
            <View className={'flex flex-row items-center gap-3'}>
                <Image source={icon} className={'size-6'}/>
                <Text className={`text-lg font-rubikMedium text-black-200 ${textStyle}`}>
                    {title}
                </Text>
            </View>
            {
                showArrow && <Image source={icons.rightArrow} className={'size-5'}/>
            }

        </TouchableOpacity>
    )
}


const Profile = () => {
    const {user, refetch} = useGlobalContext()

    console.log(user)
    const handleLogout = async () => {

        const result = await logout()

        if (result) {
            Alert.alert('Success', 'Logout successful')
            await refetch()
        } else {
            Alert.alert('Error', 'Failed to logout')
        }

    }

    return (
        <SafeAreaView className={'h-full bg-white'}>
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerClassName={'pb-31 px-7'}>
                <View className={'flex flex-row items-center justify-between mt-5 pr-1'}>
                    <Text className={'text-xl font-rubikBold'}>
                        Profile
                    </Text>
                    <Image source={icons.bell} className={'size-6'}/>
                </View>
                <View className={'flex flex-row justify-center mt-5'}>
                    <View className={'flex flex-col items-center relative mt-5'}>
                        <Image source={{uri: user?.avatar}} className={'size-30 relative rounded-full'}/>
                        <TouchableOpacity className={'absolute bottom-11 right-2'}>
                            <Image source={icons.edit} className={'size-9'}/>
                        </TouchableOpacity>
                        <Text className={'text-2xl font-rubikBold mt-2'}>
                            Tom
                        </Text>
                    </View>
                </View>
                <View className={'flex flex-col mt-10'}>
                    {/*LIST OF ITEMS*/}
                    <SettingsItem icon={icons.calendar} title={"My Bookings"}/>
                    <SettingsItem icon={icons.wallet} title={"My Payments"}/>
                </View>
                <View className={'flex flex-col mt-5 border-t pt-5 border-primary-200'}>
                    {/*LIST OF SETTINGS*/}
                    {
                        settings.slice(2).map((item, index) => (
                            <SettingsItem key={index} icon={item.icon} title={item.title}/>
                        ))
                    }
                </View>
                <View className={'flex flex-col  mt-5 border-t pt-5 border-primary-200'}>
                    {/*LOGOUTT*/}
                    <SettingsItem icon={icons.logout} title={"Logout"} textStyle={'text-danger'} showArrow={false}
                                  onPress={handleLogout}/>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;