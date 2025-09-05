import CardButton from '@/components/cardButton/CardButton'
import Filter from '@/components/filter/Filter'
import MenuCard from '@/components/menuCard/MenuCard'
import SearchBar from '@/components/searchBar/SearchBar'
import { getCategories, getMenu } from '@/lib/appwrite'
import useAppWrite from '@/lib/useAppWrite'
import { MenuItem } from '@/type'
import clsx from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'


const Search = () => {
    const { category, query } = useLocalSearchParams<{ query: string, category: string }>()

    const { data, refetch, loading } = useAppWrite({
        fn: getMenu,
        params: {
            category,
            query,
            limit: 6,

        }
    });


    const { data: categories } = useAppWrite({ fn: getCategories });




    useEffect(() => {
        refetch({ category, query, limit: 6 })
    }, [category, query]);



    return (
        <SafeAreaView className='mt-10 bg-white h-full pb-44'>
            {/**
             * <Button
                title='Seed'
                onPress={() => seed().catch((error) => console.log('Error in seed database', error)
                )}
            />
             */}

            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirtRightColItem = index % 2 === 0

                    return (
                        <View className={clsx('flex-1 max-w-[48%]', !isFirtRightColItem ? 'mt-10' : 'mt-0')}>
                            <MenuCard item={item as MenuItem} />
                        </View>
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName='gap-4'
                contentContainerClassName='gap-4 px-4 pb-30'
                ListHeaderComponent={() => (
                    <View className='my-6 gap-5'>
                        <View className='flex-between flex-row w-ful'>
                            <View className='flex-start'>
                                <Text className='small-bold uppercase text-primary'>
                                    Search
                                </Text>
                                <View className='flex-start flex-row gap-x-1 mt-0.5'>
                                    <Text className='paragraph-semibold text-dark-100'>Find your favorite food</Text>
                                </View>
                            </View>
                            <CardButton />
                        </View>

                        <SearchBar />

                        <Filter
                            categories={categories!}
                        />
                    </View>
                )}
                ListEmptyComponent={() => !loading && <Text>Dont have result</Text>}
            />


        </SafeAreaView>
    )
}

export default Search