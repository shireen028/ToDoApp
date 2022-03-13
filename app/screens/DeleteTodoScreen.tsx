import React, {useState} from 'react';
import {View, StyleSheet, Alert,Text,Button} from 'react-native';
// import {Text, Icon, Button} from 'react-native-elements';
import {Todo} from '../types';
import {Navigation} from 'react-native-navigation';

export type Props = {
  todo: Todo;
  componentId: string;
  removeTodo: Function;
};
export const DeleteTodoScreen: React.FC<Props> = ({
  todo,
  componentId,
  removeTodo,
}) => {
  const [loading, setLoading] = useState(false);
  const deleteTodo = async () => {
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
          method: 'DELETE',
        },
      );
      await response.json();
      removeTodo();
    } catch (error) {
      Alert.alert('Error', 'Delete todo failed');
    }

    setLoading(false);
    Navigation.pop(componentId);
  };
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Delete Todo
      </Text>
      <View style={styles.content}>
        {/* <Icon
          name={todo.completed ? 'checkmark-circle-outline' : 'walk-outline'}
          size={60}
          type="ionicon"
          color={todo.completed ? 'green' : 'black'}
        /> */}
        <Text h4 style={styles.title}>
          {todo.title}
        </Text>
      </View>
      <Button
        title="Delete"
        loading={loading}
        onPress={deleteTodo}
        icon={styles.icon}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '60%',
    borderRadius: 10,
  },
  button: {
    minHeight: 52,
    minWidth: 350,
    backgroundColor: 'red',
    marginVertical: 50,
  },
  icon: {
    name: 'trash-outline',
    type: 'ionicon',
    color: 'white',
  },
});
