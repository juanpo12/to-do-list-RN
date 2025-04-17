import React, { useState } from 'react';
import { View, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

const HomeScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (!input.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: input,
      completed: false,
    };

    setTasks(prev => [newTask, ...prev]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Agregar tarea"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Agregar" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});
