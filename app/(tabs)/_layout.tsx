import { Redirect, Slot } from 'expo-router';


function _Layout() {
    const isAuthenticated = false;

    if (!isAuthenticated) return <Redirect href="/sign-in" />

    return <Slot />
}

export default _Layout