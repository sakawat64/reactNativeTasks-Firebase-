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
    marginBottom: 30,
  },
  SignupView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = () => {
    if (!email || !password) {
      Alert.alert("Error", "You need to fill in all the inutes", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          setLoading(false);
          console.log("res", res);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
          alert(error);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignSelf: "center", marginTop: 120 }}>
        <Image source={require("../../assets/landing-image.png")} />
      </View>
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
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button onPress={login} title="LOGIN" backgroundColor="#FFE600" />
        )}
      </View>
      <View style={styles.SignupView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{ padding: 20 }}
        >
          <Text style={{ fontSize: 16 }}>
            Don't have an account?{" "}
            <Text style={{ color: "#18B18D", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
