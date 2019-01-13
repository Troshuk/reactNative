import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native';

export default class register extends Component {

  constructor(props){
    super(props)
    this.state={
      userFirstName:'',
      userLastName:''
    }
  }

  userRegister = () => {
    const {userFirstName} = this.state;
    const {userLastName} = this.state;

    fetch('http://192.168.1.9/index.php', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        firstName: userFirstName,
        lastName: userLastName,
      })
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      alert(responseJson.response);
    })
    .catch((error)=>{
      console.error(error);
    });
  }

  render() { return (
  <View style={styles.container}>
    <TextInput
      placeholder="Enter First Name"
      style={{width:350,height:30,margin:10, borderColor:"#333", borderWidth:1}}
      underlineColorAndroid="transparent"
      onChangeText= {userFirstName => this.setState({userFirstName})}
    />

    <TextInput
      placeholder="Enter Last Name"
      style={{width:350,height:30,margin:10, borderColor:"#333",
      borderWidth:1}}
      underlineColorAndroid="transparent"
      onChangeText= {userLastName => this.setState({userLastName})}
    />

    <TouchableOpacity
      onPress={this.userRegister}
      style={{width:350,padding:10, backgroundColor:'green',
      alignItems:'center'}}>
      <Text style={{color:'#fff'}}>Send</Text>
    </TouchableOpacity>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

AppRegistry.registerComponent('register', () => register);