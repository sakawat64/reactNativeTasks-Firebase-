import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config.js";
const styles = StyleSheet.create({
  form: {
    marginHorizontal: 25,
    marginTop: 60,
  },
  input: {
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  SignupView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfimPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const signup = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "You need to fill in all the inutes", [
        { text: "OK", onPress: () => {} },
      ]);
    } else if (password != confirmPassword) {
      Alert.alert("Error", "Confirm password should be same as password", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          console.log("response: ", response);
          setLoading(false);
          //first step -> get user id
          const uid = response.user.uid;
          //2nd step-> create user profile data
          const userProfileData = {
            id: uid,
            email: email,
          };
          //3rd step->user collection
          const userRef = firebase.firestore().collection("users");
          //4th step->save it cloud
          userRef.doc(uid).set(userProfileData);
        })
        .catch((error) => {
          console.log("error: ", error);
          setLoading(false);
          alert(error);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.form}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={(text) => setConfimPassword(text)}
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={true}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button onPress={signup} title="Sign up" backgroundColor="#FFE600" />
        )}
      </View>
      <View style={styles.SignupView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 20 }}
        >
          <Text style={{ fontSize: 16 }}>
            Already have an account?{" "}
            <Text style={{ color: "#18B18D", fontWeight: "bold" }}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
