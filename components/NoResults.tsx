import {View, Text, Image} from 'react-native'
import React from 'react'
import images from "@/constants/images";

const NoResults = () => {
    return (
        <View className={'flex items-center my-5'}>
            <Image source={images.noResult} resizeMode={'contain'} className={'w-11/12 h-80'}/>
            <Text className={'font-rubik text-black-200 mt-2'}>No Results found</Text>
        </View>
    )
}
export default NoResults
