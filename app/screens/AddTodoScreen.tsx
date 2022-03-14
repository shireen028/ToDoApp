import React, {useState} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {Input} from 'components/Input';
import {Navigation} from 'react-native-navigation';

type Props = {
  componentId: string;
  addTodo: Function;
};

export const AddTodoScreen: React.FC<Props> = ({componentId, addTodo}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          method: 'POST',
          body: JSON.stringify({title: text, userId: 1, completed: false}),
        },
      );
      const todo = await response.json();
      addTodo(todo);
    } catch (error) {
      Alert.alert('Error', 'Create todo failed');
    }
    setLoading(false);
    Navigation.pop(componentId);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text h3 style={styles.title}>
            Create a Todo
          </Text>
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Input
              placeholder="Todo"
              value={text}
              onChangeText={setText}
              multiline
              onSubmitEditing={handleAddTodo}
            />
            <Button
              title="Add Todo"
              onPress={handleAddTodo}
              loading={loading}
              icon={styles.icon}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
    name: 'add-outline',
    type: 'ionicon',
    color: 'white',
  },
});
