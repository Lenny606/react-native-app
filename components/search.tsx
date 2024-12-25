import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams, usePathname} from "expo-router";
import icons from "@/constants/icons";
import {useDebouncedCallback} from "use-debounce";

const Search = () => {

    const path = usePathname()
    const params = useLocalSearchParams<{ query?: string }>()
    const [search, setSearch] = useState(params.query)

    const handleSearch = async (text: string) => {
        setSearch(text)
    }
//from package use-debounce
    const debounceSearch = useDebouncedCallback((text: string) => {
        return router.setParams({query: text})
    }, 500)

    return (
        <View
            className={'flex flex-row items-center justify-between w-full rounded-lg bg-accent-100 border border-primary-200 px-4 py-2 mt-2'}>
            <View className={'flex-1 flex flex-row items-center justify-start z-50'}>
                <Image source={icons.search} className={'size-5'}/>
                <TextInput value={search}
                           placeholder={'Search...'}
                           onChangeText={handleSearch}
                           className={'text-sm font-rubik text-black-200 ml-2 flex-1'}></TextInput>
            </View>
            <TouchableOpacity>
                <Image source={icons.filter} className={'size-5'}/>
            </TouchableOpacity>
        </View>
    )
}
export default Search