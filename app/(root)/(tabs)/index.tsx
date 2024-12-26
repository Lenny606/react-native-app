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

export default function Index() {
//TODO fix filter + search
    const {user} = useGlobalContext()
    const params = useLocalSearchParams<{ query?: string, filter?: string }>()
    const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
        fn: getLatestsProperites
    })
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
            limit: 6
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
                                  <View className={'flex flex-row items-center'}>
                                      <Image source={{uri: user?.avatar}} className={'rounded-full size-10'}/>
                                      <View className={'flex-col flex items-start justify-center ml-2'}>
                                          <Text className={'text-xs font-rubik text-black-100'}>Hello</Text>
                                          <Text
                                              className={'text-base font-rubikMedium text-black-300'}>{user?.name || "Tom"}</Text>
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

                                  {
                                      latestPropertiesLoading ?
                                          <ActivityIndicator size={'large'} className={'text-black-200 mt-5'}/>
                                          : !latestProperties || latestProperties.length === 0 ?
                                              <NoResults/> : (
                                                  <FlatList data={latestProperties}
                                                            renderItem={({item}) => <FeatureCard item={item}
                                                                                                 onPress={() => handleCardPress(item.$id)}/>}
                                                            keyExtractor={(item) => item.$id}
                                                            horizontal
                                                            showsHorizontalScrollIndicator={false}
                                                            bounces={false}
                                                            contentContainerClassName={'flex gap-5 mt-4'}
                                                            ListEmptyComponent={loading ? (
                                                                <ActivityIndicator size={'large'}
                                                                                   className={'text-black-200 mt-5'}/>
                                                            ) : <NoResults/>}
                                                  />
                                              )
                                  }


                                  {/*<View className={'flex flex-row gap-5 mt-5'}>*/}
                                  {/*    <FeatureCard/>*/}
                                  {/*    <FeatureCard/>*/}
                                  {/*    <FeatureCard/>*/}
                                  {/*</View>*/}

                                  {/*/!*<Card />*!/*/}
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
                              {/*<View className={'flex flex-row gap-5 mt-5'}>*/}
                              {/*    <Card/>*/}
                              {/*    <Card/>*/}
                              {/*</View>*/}
                          </View>
                      }
            />

        </SafeAreaView>
    );
}
