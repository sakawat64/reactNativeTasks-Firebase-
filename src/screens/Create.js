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
import { TouchableOpacity } from "react-native-gesture-handler";
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

export default function Create({ route, navigation }) {
  const [task, setTask] = useState(null);
  const [priority, setPriority] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = route.params.userId;
  // console.log("uid: ", userId);
  const taskRef = firebase.firestore().collection("tasks");
  const onSave = () => {
    if (task && task.length > 0 && priority) {
      setLoading(true);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        description: task,
        priority: priority,
        authorId: userId,
        createdAt: timestamp,
      };
      return taskRef
        .add(data)
        .then((_doc) => {
          showMessage({
            message: "Created Successfully",
            type: "success",
          });
          setTask(null);
          setLoading(false);
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    return alert("Task or Priority is Empty");
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Create Task</Text>
        <TextInput
          onChangeText={(text) => setTask(text)}
          placeholder="Task Name"
          style={styles.input}
          autoCapitalize="none"
          value={task}
        />
        <View style={{ marginTop: 10 }}>
          <Text>Priority</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setPriority("High")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "#FF0202",
              }}
            ></TouchableOpacity>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Text>High</Text>
            </View>
            <TouchableOpacity
              onPress={() => setPriority("Low")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "#27AE60",
              }}
            ></TouchableOpacity>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Text>Low</Text>
            </View>
            <TouchableOpacity
              onPress={() => setPriority("Medium")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "#2F80ED",
              }}
            ></TouchableOpacity>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <Text>Medium</Text>
            </View>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button onPress={onSave} title="Save" backgroundColor="#FFE600" />
        )}
      </View>
    </View>
  );
}
