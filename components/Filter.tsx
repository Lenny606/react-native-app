import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filter = () => {

    const params = useLocalSearchParams<{ filter?: string }>()
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All")

    const handleCategoryChange = (category: string) => {

        if (selectedCategory === category) {
            setSelectedCategory("All")
            router.setParams({filter: "All"})
            return
        }

        setSelectedCategory(category)
        router.setParams({filter: category})
    }

    return (
        <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    className={"mt-3 mb-2"}>
            {
                categories.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => handleCategoryChange(item.category)}
                        className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full bg-primary-200 border ${selectedCategory === item.category ? "border-primary-300" : "border-primary-200"}`}>
                        <Text className={'text-sm font-rubik-bold flex flex-row'}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }

        </ScrollView>
    )
}
export default Filter
