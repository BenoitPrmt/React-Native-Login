import {Button, Text, View} from "react-native";
import {FIREBASE_AUTH} from "../../FirebaseConfig";
import {NavigationProp} from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Open details" onPress={() => navigation.navigate('details')}/>
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()}/>
            <Text>test</Text>
        </View>
    )
};

export default List;
