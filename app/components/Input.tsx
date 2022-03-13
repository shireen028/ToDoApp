import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

export class Input extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      borderColor: '#F2EBDD',
    };
  }
  onFocus = () => {
    this.setState({borderColor: 'blue'});
  };
  onBlur = () => {
    this.setState({borderColor: '#F2EBDD'});
  };
  render() {
    return (
      <View style={[styles.container, {borderColor: this.state.borderColor}]}>
        <TextInput
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.props}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:200
  },
  input: {
    fontSize: 16,
    minHeight: 200,
    width: '98%',
  },
});
