import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [goals, setGoals] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }
  const endAddGoalHandler = () => {
    setModalIsVisible(false)
  }

  const addGoalHnadler = (enteredGoalText) => {
    setGoals((currGoals) =>  [...currGoals, {text: enteredGoalText, id: Math.random().toString()}])
    endAddGoalHandler()
  }
  const deleteGoalHandler = (id) => {
    setGoals(currGoals => {
      return currGoals.filter((goal) => goal.id !== id)
    })
  }
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.container}>
      <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoalHandler} style={styles.button}/>
      <GoalInput onAddGoal={addGoalHnadler} visible={modalIsVisible} onCancel={endAddGoalHandler} />
      <View style={styles.gaolsContainer}>
        <FlatList data={goals} renderItem={itemData => {
          return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
        }}
        keyExtractor={(item, index) => {
          return item.id 
        }}
        />
        </View>
    </View>
    </>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  gaolsContainer: {
    marginTop: 24,
    flex: 5,
  },
  button: {
    marginBottom: 16
  }

});
