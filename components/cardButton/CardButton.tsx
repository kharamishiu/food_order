
import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CardButton = () => {
    const totalItems = 6;

    return (
        <TouchableOpacity onPress={() => { }} className='rounded-full bg-black w-8 h-8 justify-center items-center'>
            <Image
                source={images.bag}
                className='size-4'
                resizeMode='contain'

            />


            {totalItems > 0 && (

                <View className='cart-badge'>
                    <Text className='small-bold text-white'>{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>

    )
}

export default CardButton