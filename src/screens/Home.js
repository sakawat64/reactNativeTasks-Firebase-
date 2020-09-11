import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config";
import { AntDesign, Feather } from "@expo/vector-icons";
import Card from "../components/Card";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
});

export default function Home({ navigation, extraData }) {
  const [tasks, setTasks] = useState(null);
  const [color, setColor] = useState(null);
  const userId = extraData.uid;
  const taskRef = firebase.firestore().collection("tasks");
  useEffect(() => {
    const subscriber = taskRef
      .where("authorId", "==", userId)
      .onSnapshot((querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          newTasks.push(task);
        });
        setTasks(newTasks);
      });
    return subscriber;
  }, []);
  const onDelete = (id) => {
    return taskRef.doc(id).delete();
  };
  //console.log("uid: ", userId);
  const renderTask = ({ item, index }) => {
    //console.log(item.priority);
    item.priority = "High" ? setColor("#FF0202") : null;
    item.priority = "Low" ? setColor("#27AE60") : null;
    item.priority = "Medium" ? setColor("#2F80ED") : null;
    return (
      <Card
        customStyle={{ padding: 20, marginBottom: 15, backgroundColor: color }}
      >
        <View style={[styles.titleWrapper, { flex: 1 }]}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
            <Text>{`Task #${index + 1} - `}</Text>
            <Text>{item.description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Update", { item })}
            >
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <AntDesign
                name="delete"
                size={24}
                color="black"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };
  if (!tasks || (tasks && tasks.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>My TODOs</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Create", { userId })}
            >
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={{ height: 200, width: "100%", marginTop: 100 }}
              resizeMode="contain"
              source={require("../../assets/empty.png")}
            />
            <Text style={{ textAlign: "center", paddingTop: 20, fontSize: 18 }}>
              Sorry you do not have tasks
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              title="LOGOUT"
              backgroundColor="#FFE600"
              onPress={() => {
                firebase.auth().signOut();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>My TODOs</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create", { userId })}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            title="LOGOUT"
            backgroundColor="#FFE600"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
        </View>
      </View>
    </View>
  );
}
