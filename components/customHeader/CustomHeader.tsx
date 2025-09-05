import { images } from '@/constants'
import { CustomHeaderProps } from '@/type'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CustomHeader = ({ title }: CustomHeaderProps) => {

    const router = useRouter()


    return (
        <View className=' flex-row flex-between my-2'>
            <TouchableOpacity
                onPress={() => router.back()}
            >
                <Image
                    source={images.arrowBack}
                    className='size-5'
                    resizeMode='contain'
                />

            </TouchableOpacity>

            {title && <Text className='base-semibold text-dark-100'>{title}</Text>}

            <Image source={images.search} className='size-5' resizeMode='contain' />
        </View>
    )
}

export default CustomHeader