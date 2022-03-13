import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Text, Switch} from 'react-native-elements';
import {Input} from 'components';
import {Todo} from '../types';
import {Navigation} from 'react-native-navigation';

export type Props = {
  todo: Todo;
  componentId: string;
  updateTodo: Function;
};

export const EditTodoScreen: React.FC<Props> = ({
  todo,
  componentId,
  updateTodo,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          method: 'PUT',
          body: JSON.stringify({
            title: title,
            userId: todo.userId,
            completed: completed,
          }),
        },
      );
      const _todo = await response.json();
      updateTodo(_todo);
    } catch (error) {
      Alert.alert('Error', 'Update todo failed');
    }
    setLoading(false);
    Navigation.pop(componentId);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text h3 style={styles.title}>
          Edit Todo
        </Text>

        <View style={{alignItems: 'center', marginVertical: 40}}>
          <Input
            placeholder="Edito todo"
            value={title}
            onChangeText={setTitle}
            multiline
            onSubmitEditing={handleUpdate}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: 200,
            }}>
            <Text h4>{completed ? 'Complete' : 'Incomplete'}</Text>
            <Switch value={completed} onValueChange={setCompleted} />
          </View>
          <Button
            title="Edit"
            onPress={handleUpdate}
            loading={loading}
            icon={styles.icon}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    minHeight: '60%',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    minHeight: 52,
    minWidth: '90%',
    backgroundColor: 'blue',
    marginVertical: 50,
  },
  icon: {
    name: 'create-outline',
    type: 'ionicon',
    color: 'white',
  },
});
