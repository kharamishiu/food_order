import CartItem from '@/components/cartItem/CartItem';
import CustomButton from '@/components/customButton/CustomButton';
import CustomHeader from '@/components/customHeader/CustomHeader';
import { useCartStore } from '@/store/cart.store';
import { PaymentInfoStripeProps } from '@/type';
import clsx from 'clsx';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle }: PaymentInfoStripeProps) => {
    return (
        <View className='flex-between flex-row my-1'>
            <Text className={clsx('paragraph-medium text-gray-200', labelStyle)}>
                {label}
            </Text>
            <Text className={clsx('paragraph-bold text-dark-100', valueStyle)}>
                {value}
            </Text>
        </View>
    )
};

const Cart = () => {

    const { items, getTotalItems, getTotalPrice } = useCartStore();

    const totalItems = getTotalItems();
    const totalPrices = getTotalPrice();

    console.log(totalItems, totalPrices);

    return (
        <SafeAreaView className='bg-white h-full mt-10 pb-20 '>



            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(items) => items.id}
                contentContainerClassName='pb-20 px-4 pt-2'
                ListHeaderComponent={() => <CustomHeader title='Your Cart' />}
                ListEmptyComponent={() => <Text>Cart Empty</Text>}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className='gap-2'>
                        <View className='mt-3 border-gray-200 p-4 rounded-2xl'>
                            <Text className='h3-bold text-dark-100 mb-5'>Payment Summary</Text>

                            <PaymentInfoStripe
                                label={`Total items ${totalItems}`}
                                value={`$${totalPrices.toFixed(2)}`}
                            />

                            <PaymentInfoStripe
                                label='Delivery fee'
                                value='$5.00'
                            />
                            <PaymentInfoStripe
                                label='Discount'
                                value='- $0.40'
                                valueStyle='!text-succes'
                            />
                            <View className='border-t border-gray-200 my-2' />
                            <PaymentInfoStripe
                                label='Total'
                                value={`$${(totalPrices + 5 - 0.4).toFixed(2)}`}
                                labelStyle='base-bold !text-dark-100'
                                valueStyle='base-bold !text-dark-100 !text-right'
                            />
                        </View>

                        <CustomButton
                            title='Order now'

                        />

                    </View>
                )}

            >
            </FlatList>

        </SafeAreaView>
    )
}

export default Cart