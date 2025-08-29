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