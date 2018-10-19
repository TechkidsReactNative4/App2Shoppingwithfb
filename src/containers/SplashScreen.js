import React, { Component } from 'react';
import {
  Text, StyleSheet,
  View, Image
} from 'react-native';
import firebase from 'react-native-firebase'
import { backgroundColor } from '../styles'

class SplashScreen extends Component {
  state = {}

  componentDidMount() {
    // firebase.auth().signOut()

    firebase.auth().onAuthStateChanged(res => res !== null
      ? setTimeout(() => this.props.navigation.navigate('HomeScreen'), 2000)
      : setTimeout(() => this.props.navigation.navigate('LoginScreen'), 2000))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../../imgs/logo_app.jpg')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  }
})

export default SplashScreen;