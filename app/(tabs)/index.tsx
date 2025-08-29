import CardButton from "@/components/cardButton/CardButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from 'clsx';
import { Fragment } from "react";
import { FlatList, Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import "../globals.css";

export default function Index() {

  const { user } = useAuthStore();

  console.log('USER', JSON.stringify(user, null, 2));

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">

      <FlatList
        data={offers}
        renderItem={({ item, index }) => {

          const isEven: boolean = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View className={cn("offer-card__info", isEven ? 'pl-5' : 'pr-5')}>
                      <Text className="h3-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        className="size-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                        source={images.arrowRight}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-28 px-6"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className=" flex-start">
              <Text className="small-bold text-primary">Deliver</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-2 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Spain</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />

              </TouchableOpacity>
            </View>

            <CardButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}