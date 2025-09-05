import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';


const SearchBar = () => {
    const params = useLocalSearchParams<{ query?: string }>();
    const [query, setQuery] = useState(params.query);


    const handleSearch = (text: string) => {
        setQuery(text);

        if (!text) router.setParams({ query: undefined })

    }

    const handleSubmit = () => {
        if (query?.trim()) router.setParams({ query })

    }

    console.log(query);

    return (
        <View className=' flex-row items-center'>
            <TextInput
                className='flex-1 p-3'
                placeholder='Search pizaa, burgues etc..'
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor='#A0A0A0'
                returnKeyType='search'
            />
            <TouchableOpacity
                className='pr-4'
                onPress={() => router.setParams({ query })}
            >
                <Image
                    source={images.search}
                    className='size-5'
                    resizeMode='contain'
                    tintColor='#5D5F6D'
                />

            </TouchableOpacity>
        </View>
    )
}

export default SearchBar