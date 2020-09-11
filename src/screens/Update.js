import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config.js";
import { showMessage } from "react-native-flash-message";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 25,
    flex: 1,
  },
  titleWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 50,
  },
});

export default function Update({ route, navigation }) {
  const userId = route.params.userId;
  const item = route.params.item;
  // console.log("uid: ", userId);
  const taskRef = firebase.firestore().collection("tasks");
  const [task, setTask] = useState(item.description);
  const [loading, setLoading] = useState(false);
  const onUpdate = () => {
    if (task && task.length > 0) {
      //1 make loadding active
      setLoading(true);
      return taskRef
        .doc(item.id)
        .update({ description: task })
        .then(() => {
          showMessage({
            message: "Updated Successfully",
            type: "success",
          });
          setLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    return alert("Task is Empty");
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Edit Task</Text>
        <TextInput
          onChangeText={(text) => setTask(text)}
          placeholder="Update Task"
          style={styles.input}
          autoCapitalize="none"
          value={task}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button onPress={onUpdate} title="Update" backgroundColor="#FFE600" />
        )}
      </View>
    </View>
  );
}
