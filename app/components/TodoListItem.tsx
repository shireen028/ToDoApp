import React, { memo } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import OptionsMenu from 'react-native-option-menu';
import * as actions from 'actions';
import { Todo } from '../types';
import { useDispatch } from 'react-redux';

type Props = {
  todo: Todo;
  componentId: string;
  openEditTodo: Function;
  openDeleteTodo: Function;
};

export const TodoListItem: React.FC<Props> = memo(
  ({todo, openEditTodo, openDeleteTodo}) => {
    const incompleteIcon = require('assets/inprogress.png');
    const completeIcon = require('assets/done.png');
    const dispatch = useDispatch();
    const updateTodo = async (completed: boolean) => {
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
            title: todo.title,
            userId: todo.userId,
            completed: completed,
          }),
        },
      );
      const _todo = await response.json();
      dispatch(actions.updateTodo(_todo));
    };
    const options = ['Update'];
    const actions = [() => openEditTodo(todo)];
    if (!todo.completed) {
      options.push('Completed');
      actions.push(() => updateTodo(true));
    }
    options.push('Cancel');

    return (
      <ListItem bottomDivider>
        {/*  <Icon
          name={todo.completed ? 'checkmark-circle-outline' : 'walk-outline'}
          size={30}
          type="ionicon"
          color={todo.completed ? 'green' : 'blue'}
        />
 */}
         <Image style={{width: 34, height: 34 }} source= 
         {todo.completed? require('assets/done.png') : 
         require('assets/inprogress.png') }/>
        
        <ListItem.Content>
          <ListItem.Title
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.title}>
            {todo.title}
          </ListItem.Title>
        </ListItem.Content>
       
         <Icon
          name="trash-outline"
          type="ionicon"
          size={23}
          color="red"
          onPress={() => openDeleteTodo(todo)}/>

          <TouchableOpacity style={{ padding: 1 }} onPress={() => openEditTodo(todo)}>
          <Image style={{width: 33, height: 33 }} source={require('assets/edit.png')} />
        
        </TouchableOpacity>
        
        {/* <OptionsMenu
          button={require('assets/edit.png')}
          buttonStyle={{
            width: 32,
            height: 14,
            // margin: 7.5,
            resizeMode: 'contain',
          }}
          destructiveIndex={1}
          options={options}
          actions={actions}
        /> */}
      </ListItem>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
});
