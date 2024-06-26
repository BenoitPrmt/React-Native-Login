import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import {useEffect, useState} from "react";
import {FIREBASE_AUTH} from "./FirebaseConfig";
import {onAuthStateChanged, User} from "firebase/auth"

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='Todos' component={List}/>
            <InsideStack.Screen name='details' component={Details}/>
        </InsideStack.Navigator>
    )
}

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Text>loading</Text>; // replace with your actual loading screen component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
                ) : (
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
