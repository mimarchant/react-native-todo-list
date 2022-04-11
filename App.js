import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setGoal(enteredText);
  };

  const addGoal = () => {
    if (goal === "") {
      Alert.alert("debes agregar una tarea!!");
      return;
    }
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: goal, id: Math.random().toString() },
    ]);
    setGoal("");
  };

  const deleteGoal = (id) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your goals here..."
          onChangeText={goalInputHandler}
          value={goal}
        />
        <Button color="#9A81FF" title="Add your goal" onPress={addGoal} />
      </View>
      <View style={styles.goalsContainer}>
        <Text>List of your goals:</Text>
        <FlatList
          data={goals}
          renderItem={(itemData) => {
            return (
              <TouchableOpacity
                style={styles.goalItem}
                onPress={() => deleteGoal(itemData.item.id)}
              >
                <Text style={styles.goalText}>{itemData.item.text}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#311b6b",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#9A81FF",
    width: "60%",
    borderRadius: 16,
    height: 35,
    backgroundColor: "#e4d0ff",
  },
  goalsContainer: {
    flex: 4,
  },
  goalItem: {
    backgroundColor: "#0BB5E7",
    marginVertical: 4,
    paddingVertical: 4,
    borderRadius: 8,
  },
  goalText: {
    color: "white",
    paddingLeft: 4,
  },
});
