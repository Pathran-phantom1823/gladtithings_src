import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { Color, Routes } from 'common';
import Footer from 'modules/generic/Footer';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import InputFieldWithIcon from 'modules/generic/InputFieldWithIcon';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import IncrementButton from 'components/Form/Button';
import Api from 'services/api/index.js';

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password:null,
      confirmPassword: null,
      username: null,
      id: null,
      isLoading: false
    }
  }

  componentDidMount() {
    const { user } = this.props.state;
    this.setState({email: user.email})
    this.retrieve();
  }

  retrieve = () => {
    const { user } = this.props.state;
    if (user === null) {
      return
    }
    let parameter = {
      condition: [{
        value: user.id,
        clause: '=',
        column: 'account_id'
      }]
    }
    this.setState({ isLoading: true })
    Api.request(Routes.accountRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        let data = response.data[0]
        this.setState({
          id: data.id,
          username: data.username
        })
      }
    }, error => {
      console.log(error)
      this.setState({ isLoading: false })
    });
  }

  update = () => {
    const { user } = this.props.state;
    if (user === null) {
      return
    }
    console.log(user.email, this.state.email);
    if(user.email === this.state.email) {
      return
    }
    this.updateAccount();
  }

  reloadProfile = () => {
    const { user, token } = this.props.state;
    if (user == null) {
      return
    }
    let parameter = {
      condition: [{
        value: user.id,
        clause: '=',
        column: 'id'
      }]
    }
    this.setState({ isLoading: true })
    Api.request(Routes.accountRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      const { updateUser } = this.props;
      updateUser(response.data[0])
    }, error => {
      console.log(error)
      this.setState({ isLoading: false })
    });
  }

  updateAccount = () => {
    const { user } = this.props.state;
    if(this.state.email !== user.email && (this.state.password === '' || this.state.password === null)) {
      Alert.alert(
        "Opps",
        "Email not updated. Password needs to be changed too if you change your email.",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
      return
    }
    if(this.state.password && (this.state.password.length < 6 || /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(this.state.password) === false)) {
      Alert.alert(
        "Opps",
        "Passwords should be atleast 6 characters. It must be alphanumeric characters. It should contain 1 number, 1 special character and 1 capital letter.",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
      return
    }
    if((this.state.password !== null || this.state.confirmPassword !== null
      || this.state.password !== '' || this.state.confirmPassword !== '') && this.state.password !== this.state.confirmPassword) {
      Alert.alert(
        "Opps",
        "Passwords doesn't match.",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      );
      return
    }
    if(this.state.password === null || this.state.confirmPassword === null
      || this.state.password === '' || this.state.confirmPassword === '') {
        return
    }
    let parameter = {
      id: user.id,
      code: user.code,
      username: user.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(parameter, Routes.accountUpdate);
    this.setState({ isLoading: true })
    Api.request(Routes.accountUpdate, parameter, response => {
      this.setState({ isLoading: false })
      if(response.data !== null) {
        Alert.alert(
          "",
          "Account updated successfully!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        );
      }
      this.reloadProfile();
    }, error => {
      this.setState({ isLoading: false })
      console.log(error)
    });
  }

  render() {
    const { language, user } = this.props.state;
    return (
      <View style={{
        height: height,
        backgroundColor: Color.containerBackground
      }}>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingLeft: 20,
            paddingRight: 20,
            minHeight: height + (height * 0.5)
          }}>
            <InputFieldWithIcon
              placeholder={user ? user.username : language.username}
              icon={faUser}
              label={language.username}
              disable={true}
              onTyping={(text) => {this.setState({username: text})}}
            />

            <InputFieldWithIcon
              placeholder={user ? user.email : language.emailAddress}
              icon={faEnvelope}
              label={language.emailAddress}
              onTyping={(text) => {this.setState({email: text})}}
            />

            <View style={{
              marginTop: 20,
              marginBottom: 20
            }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold'
              }}>{language.securityCredentials}</Text>

              <InputFieldWithIcon
                placeholder={language.newPassword}
                icon={faUser}
                label={language.newPassword}
                secureTextEntry={true}
                onTyping={(text) => {this.setState({password: text})}}
              />

              <InputFieldWithIcon
                placeholder={language.confirmPassword}
                icon={faUser}
                label={language.confirmPassword}
                secureTextEntry={true}
                onTyping={(text) => {this.setState({confirmPassword: text})}}
              />

              <IncrementButton style={{
                  backgroundColor: Color.primary,
                  width: '40%',
                  marginTop: 20,
                  marginBottom: 20
                }}
                textStyle={{
                  fontFamily: 'Poppins-SemiBold'
                }}
                onClick={() => {
                  this.update()
                }}
                title={language.update}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

export default connect(
  mapStateToProps
)(AccountSettings);