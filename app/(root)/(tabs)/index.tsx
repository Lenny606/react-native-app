import {Image, Text, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

export default function Index() {
    return (
       <SafeAreaView className={'h-full bg-white'}>
           <View className={'px-5'}>
               <View className={'flex flex-row items-center justify-between mt-5'}>
                   <View className={'flex flex-row items-center'}>
                       <Image source={images.avatar} className={'rounded-full size-10'}/>
                       <View className={'flex-col flex items-start justify-center ml-2'}>
                           <Text className={'text-xs font-rubik text-black-100'}>Hello</Text>
                           <Text className={'text-base font-rubikMedium text-black-300'}>Tom</Text>
                       </View>
                   </View>
                   <Image source={icons.bell} className={'size-6'} />
               </View>
           </View>

       </SafeAreaView>
    );
}
