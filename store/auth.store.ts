import { getCurrentUser } from '@/lib/appwrite'
import { User } from '@/type'
import { create } from 'zustand'

type AuthState = {
    isAuthenticated: boolean,
    user: User | null,
    isLoading: boolean,

    setIsAuthenticated: (value: boolean) => void,
    setUser: (user: User | null) => void,
    seIsLoading: (isLoading: boolean) => void,

    fetchAuthenticated: () => Promise<void>,

}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    seIsLoading: (value) => set({ isLoading: value }),


    fetchAuthenticated: async () => {
        set({ isLoading: true })

        try {
            const user = await getCurrentUser()

            if (user) {
                set({ isAuthenticated: true, user: user as User })
            } else {
                set({ isAuthenticated: false, user: null })
            }

        } catch (error) {
            console.log('fetchAuthenticated error', error);
            set({ isAuthenticated: false, user: null })

        } finally {
            set({ isLoading: false })
        }
    }

}))

export default useAuthStore;