import React, { Component } from 'react';
import {
  Text, TextInput,
  View, Platform,
  Image, StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase'
import { Button } from 'react-native-elements';

import { backgroundColor, primaryColorBrown, primaryColorGreen, primaryColorRed } from '../styles'

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isSigningIn: false,
    isSigningUp: false
  }

  renderLogo = () => (
    <Image
      style={styles.logo}
      resizeMode='contain'
      source={require('../../imgs/logo_app.jpg')} />
  )

  renderEmailInput = () => (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.icon}
          resizeMode='contain'
          source={require('../../imgs/ic_email.png')} />
        <Text style={styles.textTitle}>Email</Text>
      </View>
      <TextInput
        style={styles.input}
        keyboardType={'email-address'}
        underlineColorAndroid={'rgba(0,0,0,0)'}
        onChangeText={(email) => this.setState({ email })} />
    </View>
  )

  renderPasswordInput = () => (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.icon}
          resizeMode='contain'
          source={require('../../imgs/ic_password.png')} />
        <Text style={styles.textTitle}>Password</Text>
      </View>
      <TextInput
        style={styles.input}
        underlineColorAndroid={'rgba(0,0,0,0)'}
        onChangeText={(password) => this.setState({ password })}
      />
    </View>
  )

  onSignIn = () => {

    if (this.state.email === '') {
      this.setState({ err: 'Error: Pls enter email' })
      return
    }
    if (this.state.password === '') {
      this.setState({ err: 'Error: Pls enter passowrd' })
      return
    }

    this.setState({ isSigningIn: true })

    firebase.auth()
      .signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          err: '',
          isSigningIn: false
        })
      })
      .catch(err => this.setState({
        err: err.toString(),
        isSigningIn: false
      }))
  }

  onSignUp = () => {

    if (this.state.email === '') {
      this.setState({ err: 'Error: Pls enter email' })
      return
    }
    if (this.state.password === '') {
      this.setState({ err: 'Error: Pls enter passowrd' })
      return
    }

    this.setState({ isSigningUp: true })

    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          err: '',
          isSigningUp: false
        })
      })
      .catch(err => this.setState({
        err: err.toString(),
        isSigningUp: false
      }))
  }

  renderButtons = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Button
        title='Sign up'
        titleStyle={{ fontSize: 16 }}
        buttonStyle={{
          backgroundColor: primaryColorGreen,
          width: 130,
          borderRadius: 30
        }}
        containerStyle={{ marginTop: 20, marginHorizontal: 5 }}
        onPress={this.onSignUp}
        loading={this.state.isSigningUp}
        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }} />
      <Button
        title='Sign in'
        titleStyle={{ fontSize: 16 }}
        buttonStyle={{
          backgroundColor: primaryColorRed,
          width: 130,
          borderRadius: 30
        }}
        containerStyle={{ marginTop: 20, marginHorizontal: 5 }}
        onPress={this.onSignIn}
        loading={this.state.isSigningIn}
        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }} />
    </View>
  )

  renderError = () => (
    <Text style={styles.error}>{this.state.err}</Text>
  )

  render() {
    return (
      <View style={styles.container}>
        {this.renderLogo()}
        {this.renderEmailInput()}
        {this.renderPasswordInput()}
        {this.renderError()}
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  icon: {
    width: 16,
    height: 16
  },
  textTitle: {
    marginStart: 5,
    color: primaryColorBrown
  },
  input: {
    borderBottomWidth: 1,
    borderColor: primaryColorBrown,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    paddingHorizontal: 0,
  },
  error: {
    color: primaryColorRed,
    marginVertical: 20,
    height: 18
  }
})

export default LoginScreen;