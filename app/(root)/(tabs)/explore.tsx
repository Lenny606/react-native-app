import {ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {Card, FeatureCard} from "@/components/Cards";
import Filter from "@/components/Filter";
import {useGlobalContext} from "@/lib/global-provider";
import seed from "@/lib/seed";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestsProperites, getProperites} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {

    const params = useLocalSearchParams<{ query?: string, filter?: string }>()

    const {data: properties, loading, refetch} = useAppwrite({
        fn: getProperites,
        params: {
            filter: params.filter,
            query: params.query,
            limit: 6
        },
        skip: true
    })

    useEffect(() => {
        refetch({
            filter: params.filter,
            query: params.query,
            limit: 20
        })
    }, [params.query, params.filter]);

    const handleCardPress = (id: string) => {
        router.push(`/properties/${id}`)
    }

    return (
        <SafeAreaView className={'h-full bg-white'}>
            {/*<Button onPress={seed} title={"SEED DATA"} ></Button>*/}
            <FlatList data={properties}
                      renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)}/>}
                      keyExtractor={(item) => item.$id}
                      numColumns={2}
                      contentContainerClassName={'pb-32'}
                      columnWrapperClassName={'flex gap-5 px-5'}
                      showsVerticalScrollIndicator={false}
                      ListHeaderComponent={
                          <View className={'px-5'}>
                              <View className={'flex flex-row items-center justify-between mt-5'}>
                                  <TouchableOpacity onPress={() => router.back()}
                                                    className={'flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'}>
                                      <Image source={icons.backArrow}  className={'size-5'}/>

                                  </TouchableOpacity>
                                  <Text className={'text-base text-center font-rubikBold text-black-200'}>
                                      Search for home
                                  </Text>
                                  <Image source={icons.bell} className={'size-5'}/>
                              </View>
                              <Search/>
                              <View className={'mt-5'}>
                                  <Filter/>
                                  <Text className={'font-rubik text-xl text-black-200 mt-4'}>
                                      Found {properties?.length} properties
                                  </Text>
                              </View>
                          </View>
                      }
            />

        </SafeAreaView>
    );
}