import { appWriteConfig } from '@/lib/appwrite';
import { useCartStore } from '@/store/cart.store';
import { MenuItem } from '@/type';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {

    const imageUrl = `${image_url}?view=${appWriteConfig.projectId}`;
    const { addItem } = useCartStore();

    return (
        <TouchableOpacity className='menu-card' style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787' } : {}}>
            <Image source={{ uri: image_url }} className='size-32 absolute -top-8' resizeMode='contain' />
            <Text className='text-center base-bold text-dark-100 mb-4' numberOfLines={2}>{name}</Text>
            <Text className='body-regular text-gray-200 mb-4'>${price}</Text>
            <TouchableOpacity onPress={() => addItem({ id: $id, name, price, image_url, customizations: [] })}>
                <Text className='paragraph-bold text-primary'>Add Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard