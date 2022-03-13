import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, ListItem, Text} from 'react-native-elements';
import {TodoListItem, EmptyContent} from 'components';
import * as actions from 'actions';
import {Todo, FILTERS} from '../types';
import Modal from 'react-native-modal';

const _filters = ['All', 'Completed', 'Incomplete'];

export const ListTodoScreen = (props: {componentId: string}): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const {filter, list} = useSelector((state: {todo: {toJS: Function}}) =>
    state.todo.toJS(),
  );

  // });
  const dispatch = useDispatch();
  useEffect(() => {
    const buttonPressedListern =
      Navigation.events().registerNavigationButtonPressedListener(
        handleButtonPressed,
      );
    loadTodos();
    () => {
      buttonPressedListern.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getTodos(): Todo[] {
    if (filter === FILTERS.COMPLETED) {
      return list.filter((item: Todo) => item.completed).reverse();
    } else if (filter === FILTERS.INCOMPLETE) {
      return list.filter((item: Todo) => !item.completed).reverse();
    } else if (filter === FILTERS.ALL) {
      return list.reverse();
    } else {
      return [];
    }
  }
  const loadTodos = async () => {
    setRefreshing(true);
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        method: 'GET',
      },
    );
    const todos = await response.json();
    setRefreshing(false);
    dispatch(actions.setTodoList(todos));
  };
  const openEditTodo = (todo: Todo) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'EditTodo',
        options: {
          topBar: {
            title: {
              text: 'Edit',
            },
          },
        },
        passProps: {
          todo: todo,
          updateTodo: (_id: number) => {
            dispatch(actions.updateTodo(_id));
          },
        },
      },
    });
  };

  const openDeleteTodo = (todo: Todo) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'DeleteTodo',
        options: {
          topBar: {
            title: {
              text: 'Delete',
            },
          },
        },
        passProps: {
          todo: todo,
          removeTodo: () => {
            dispatch(actions.removeTodo(todo.id));
          },
        },
      },
    });
  };

  function changeFilter(_filter: FILTERS) {
    setVisible(false);
    dispatch(actions.changeFilter(_filter));
  }
  const handleButtonPressed = (event: {buttonId: string}) => {
    if (event.buttonId === 'addTodo') {
      Navigation.push(props.componentId, {
        component: {
          name: 'AddTodo',
          options: {
            topBar: {
              title: {
                text: 'Create',
              },
            },
          },
          passProps: {
            addTodo: (_todo: Todo) => {
              dispatch(actions.addTodo(_todo));
            },
          },
        },
      });
    }
    if (event.buttonId === 'filter') {
      setVisible(true);
    }
  };

  function renderItem(todo: {item: Object; index: number}): JSX.Element {
    return (
      <TodoListItem
        todo={todo.item}
        openEditTodo={openEditTodo}
        openDeleteTodo={openDeleteTodo}
      />
    );
  }

  function renderEmpty() {
    return <EmptyContent />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        refreshing={refreshing}
        onRefresh={loadTodos}
        data={getTodos().slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item: {id: number}) => String(item.id)}
        legacyImplementation={false}
        ListEmptyComponent={renderEmpty}
        initialNumToRender={15}
        updateCellsBatchingPeriod={1}
        maxToRenderPerBatch={3}
      />
      <Modal isVisible={visible}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.circle}>
            <Icon
              name="close-outline"
              type="ionicon"
              size={50}
              color="black"
              onPress={() => setVisible(false)}
            />
          </View>
          <View style={styles.bottomSheetContent}>
            <Text h3 style={{textAlign: 'center'}}>
              Filter
            </Text>
            {_filters.map(item => {
              var value = FILTERS.ALL;
              if (item === 'Completed') {
                value = FILTERS.COMPLETED;
              } else if (item === 'Incomplete') {
                value = FILTERS.INCOMPLETE;
              }
              return (
                <ListItem onPress={() => changeFilter(value)}>
                  <ListItem.Content>
                    <ListItem.Title
                      style={{color: filter === value ? 'blue' : 'black'}}>
                      {item}
                    </ListItem.Title>
                  </ListItem.Content>
                  {filter === value && (
                    <Icon
                      name="checkmark-circle-outline"
                      type="ionicon"
                      color="blue"
                      size={30}
                    />
                  )}
                </ListItem>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
    padding: 2,
    height: 500,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    height: 300,
    width: 350,
    padding: 10,
  },
});
