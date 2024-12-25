import {Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {Card, FeatureCard} from "@/components/Cards";
import Filter from "@/components/Filter";

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
                    <Image source={icons.bell} className={'size-6'}/>
                </View>
                <Search></Search>
                <View className={'my-5'}>
                    <View className={'flex flex-row items-center justify-between'}>
                        <Text className={'text-xl font-rubikBold text-black-200'}>
                            Featured
                        </Text>
                        <TouchableOpacity>
                            <Text className={'text-base font-rubikBold text-primary-300'}>
                                All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className={'flex flex-row gap-5 mt-5'}>
                        <FeatureCard/>
                        <FeatureCard/>
                        <FeatureCard/>
                    </View>

                    {/*<Card />*/}
                </View>
                <View className={'flex flex-row items-center justify-between'}>
                    <Text className={'text-xl font-rubikBold text-black-200'}>
                        Recommended
                    </Text>
                    <TouchableOpacity>
                        <Text className={'text-base font-rubikBold text-primary-300'}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Filter/>

                </View>
                <View className={'flex flex-row gap-5 mt-5'}>
                    <Card/>
                    <Card/>
                </View>
            </View>
        </SafeAreaView>
    );
}
