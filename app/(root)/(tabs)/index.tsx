import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {Card, FeatureCard} from "@/components/Cards";
import Filter from "@/components/Filter";
import {useGlobalContext} from "@/lib/global-provider";

export default function Index() {

    const {user} = useGlobalContext()
    return (
        <SafeAreaView className={'h-full bg-white'}>

            <FlatList data={[1, 2, 3, 4]}
                      renderItem={({item}) => <Card/>}
                      keyExtractor={(item) => item.toString()}
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
                                          <Text className={'text-base font-rubikMedium text-black-300'}>{user?.name || "Tom"}</Text>
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

                                  <FlatList data={[1,2,3]}
                                            renderItem={({item}) => <FeatureCard />}
                                            keyExtractor={(item) => item.toString()}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            bounces={false}
                                            contentContainerClassName={'flex gap-5 mt-4'}
                                  />

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
