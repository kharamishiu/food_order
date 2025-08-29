import CustomButton from '@/components/customButton/CustomButton'
import CustomInput from '@/components/customInput/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })


    const submit: () => Promise<void> = async () => {
        const { name, email, password } = form;

        if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email and password')

        setIsSubmitting(true)



        try {
            //call api appwrite
            const res = await createUser({
                name: name,
                email: email,
                password: password
            })



            //Alert.alert('Success', 'User signed up successfully')
            router.replace('/')


        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>


            <CustomInput
                placeholder='Enter your Name'
                value={form.name}
                onChangeText={(text: string) => setForm((prev) => ({ ...prev, name: text }))}
                label='name'

            />
            <CustomInput
                placeholder='Enter your Email'
                value={form.email}
                onChangeText={(text: string) => setForm((prev) => ({ ...prev, email: text }))}
                label='Email'
                keyboardType='email-address'
            />
            <CustomInput
                placeholder='Enter your password'
                value={form.password}
                onChangeText={(text: string) => setForm((prev) => ({ ...prev, password: text }))}
                label='Password'
                secureTextEntry={true}
            />
            <CustomButton
                title='Sign In'
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                    Already have a account?
                </Text>
                <Link href='/sign-in' className='base-bold text-primary'>
                    Sign In
                </Link>
            </View>
        </View>
    )
}

export default SignUp