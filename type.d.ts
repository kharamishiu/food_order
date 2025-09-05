import { ImageSourcePropType } from "react-native"
import { Models } from "react-native-appwrite"

interface CustomInputProps {
    placeholder: string,
    value?: string,
    onChangeText?: (text: string) => void,
    label: string,
    secureTextEntry?: boolean,
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
}

interface CustomButtonProps {
    onPress?: () => void,
    title?: string,
    style?: string,
    textStyle?: string,
    leftIcon?: string,
    isLoading?: boolean
}

interface CreateUserParams {
    name: string,
    email: string,
    password: string
}

interface SignInParams {
    email: string,
    password: string
}

export interface User extends Models.Document {
    name: string,
    email: string,
    avatars: string,
}

interface TabBarIconProps {
    focused: boolean,
    icon: ImageSourcePropType,
    title: string,
}

interface GetMenuParams {
    category: string,
    query: string,

}

export interface MenuItem extends Models.Document {
    name: string,
    price: number,
    image_url: string,
    description: string,
    calories: number,
    protein: number,
    rating: number,
    type: string,
}

export interface CartCustomization {
    id: string,
    name: string,
    price: number,
    type: string,
}

export interface CartItemType {
    id: string,
    name: string,
    price: number,
    image_url: string,
    quantity: number,
    customizations?: CartCustomization[]
}

export interface CartStorage {
    items: CartItemType[],
    addItem: (item: Omi<CartItemType, 'quantity'>) => void,
    removeItem: (id: string, customizations: CartCustomization[]) => void,
    increaseQty: (id: string, customizations: CartCustomization[]) => void,
    decreaseQty: (id: string, customizations: CartCustomization[]) => void,
    cleartCart: () => void,
    getTotalItems: () => number,
    getTotalPrice: () => number,
}

export interface Category extends Models.Document {
    name: string,
    description: string,
}

interface PaymentInfoStripeProps {
    label: string,
    value: string,
    labelStyle?: string,
    valueStyle?: string,
}

export interface CartItemType {
    id: string,
    name: string,
    price: number,
    image_url: string,
    quantity: number,
    customizations?: CartCustomization[]
}

interface CustomHeaderProps {
    title?: string,
}