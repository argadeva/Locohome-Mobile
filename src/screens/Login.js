import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {
  Container,
  Content,
  Tabs,
  Tab,
  Text,
  H3,
  Form,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import logo from '../image/logo.png';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from 'react-native-dialog';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      login: '',
      token: '',
      userData: [],
      splash: true,
      regFirstName: '',
      regLastName: '',
      regEmail: '',
      regPassword: '',
      regPhoneNumber: '',
      regLogin: '',
      regToken: '',
      regUserData: [],
      regVerify: false,
      regVerifyByEmail: false,
    };
  }

  onLoginButton = async () => {
    await Axios.post('http://18.206.61.46:1000/api/v1/users/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(res => {
        if (res.data.token !== null) {
          const _storeData = async () => {
            try {
              await AsyncStorage.setItem('status', res.data.token);
              await AsyncStorage.setItem('email', this.state.email);
            } catch (e) {
              e;
            }
          };

          _storeData();
          this.props.navigation.replace('Home');
        } else {
          alert('Email atau Password Salah');
        }
      })
      .catch(err => {
        err;
      });
  };

  getStatus = async () => {
    await Axios.get(
      `http://18.206.61.46:1000/api/v1/users/${await AsyncStorage.getItem(
        'status',
      )}`,
    )
      .then(res => {
        this.setState({login: res.data});
        if (this.state.login === true) {
          this.props.navigation.replace('Home');
        }
        this.setState({splash: false});
      })
      .catch(err => err);
  };

  componentDidMount() {
    this.getStatus();
  }

  onRegButton = async mode => {
    await Axios.post(`http://18.206.61.46:1000/api/v1/users/register/${mode}`, {
      firstName: this.state.regFirstName,
      lastName: this.state.regLastName,
      email: this.state.regEmail,
      password: this.state.regPassword,
      phoneNumber: this.state.regPhoneNumber,
    }).then(res => {
      if (mode === 2) {
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem('OTP', `${res.data.OTP}`);
            await AsyncStorage.setItem('status', `${res.data.token}`);
            await AsyncStorage.setItem('email', `${this.state.regEmail}`);
          } catch (error) {}
        };
        _storeData();
        this.props.navigation.navigate('OTP');
      }
      this.setState({
        regFirstName: '',
        regLastName: '',
        regEmail: '',
        regPassword: '',
        regPhoneNumber: '',
      });
    });
  };

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          {this.state.splash === true ? (
            <View style={{marginVertical: '50%'}}>
              <Image
                source={logo}
                style={{width: null, height: 200, resizeMode: 'contain'}}
              />
              <H3 style={{alignSelf: 'center'}}>LOCOHOME</H3>
            </View>
          ) : (
            <>
              <View style={{padding: 20}}>
                <Image
                  source={logo}
                  style={{width: null, height: 100, resizeMode: 'contain'}}
                />
                <H3 style={{alignSelf: 'center'}}>LOCOHOME</H3>
              </View>
              <Tabs
                tabBarUnderlineStyle={{backgroundColor: '#0373fc'}}
                tabContainerStyle={{
                  elevation: 0,
                }}>
                <Tab
                  heading="Masuk"
                  tabStyle={{backgroundColor: 'white'}}
                  textStyle={{color: '#333'}}
                  activeTabStyle={{backgroundColor: 'white'}}
                  activeTextStyle={{color: '#333', fontWeight: 'normal'}}>
                  <View style={{padding: 30}}>
                    <Form>
                      <Label style={{alignSelf: 'center', marginBottom: 10}}>
                        Email
                      </Label>
                      <Item rounded>
                        <Input
                          type="email"
                          onChangeText={text => this.setState({email: text})}
                          style={{
                            padding: 5,
                          }}
                        />
                      </Item>
                      <Label style={{alignSelf: 'center', marginVertical: 10}}>
                        Password
                      </Label>
                      <Item rounded>
                        <Input
                          secureTextEntry={true}
                          password={true}
                          type="password"
                          onChangeText={text => this.setState({password: text})}
                          style={{padding: 5}}
                        />
                      </Item>
                    </Form>
                    {this.state.email.length > 0 &&
                    this.state.password.length > 0 ? (
                      <Button
                        rounded
                        onPress={() => this.onLoginButton()}
                        style={{
                          justifyContent: 'center',
                          marginVertical: 20,
                          flex: 1,
                          backgroundColor: '#0373fc',
                        }}>
                        <Text>Masuk</Text>
                      </Button>
                    ) : (
                      <Button
                        rounded
                        onPress={() => alert('Email dan Password Kosong')}
                        style={{
                          justifyContent: 'center',
                          marginVertical: 20,
                          flex: 1,
                          backgroundColor: '#0373fc',
                        }}>
                        <Text>Masuk</Text>
                      </Button>
                    )}
                    <Button
                      transparent
                      style={{justifyContent: 'center'}}
                      onPress={() =>
                        this.props.navigation.navigate('ForgetPassword')
                      }>
                      <Text>Lupa Password</Text>
                    </Button>
                  </View>
                </Tab>
                <Tab
                  heading="Daftar"
                  tabStyle={{backgroundColor: 'white'}}
                  textStyle={{color: '#333'}}
                  activeTabStyle={{backgroundColor: 'white'}}
                  activeTextStyle={{color: '#333', fontWeight: 'normal'}}>
                  <View style={{padding: 30}}>
                    <Form>
                      <Label style={{alignSelf: 'center', marginBottom: 10}}>
                        Nama Depan
                      </Label>
                      <Item rounded>
                        <Input
                          style={{padding: 5}}
                          onChangeText={text =>
                            this.setState({regFirstName: text})
                          }>
                          {this.state.regFirstName}
                        </Input>
                      </Item>
                      {this.state.regFirstName.length >= 3 ? null : (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          Minimal 3 Karakter
                        </Text>
                      )}
                      <Label style={{alignSelf: 'center', marginVertical: 10}}>
                        Nama Belakang
                      </Label>
                      <Item rounded>
                        <Input
                          style={{padding: 5}}
                          onChangeText={text =>
                            this.setState({regLastName: text})
                          }>
                          {this.state.regLastName}
                        </Input>
                      </Item>
                      {this.state.regLastName.length >= 3 ? null : (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          Minimal 3 Karakter
                        </Text>
                      )}
                      <Label style={{alignSelf: 'center', marginVertical: 10}}>
                        No. HP
                      </Label>
                      <Item rounded>
                        <Input
                          keyboardType="numeric"
                          style={{padding: 5}}
                          onChangeText={text =>
                            this.setState({regPhoneNumber: text})
                          }>
                          {this.state.regPhoneNumber}
                        </Input>
                      </Item>
                      {this.state.regPhoneNumber.length >= 10 &&
                      (this.state.regPhoneNumber.slice(0, 1) == 0 ||
                        this.state.regPhoneNumber.slice(0, 1) == 6) ? null : (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          Nomer Telfon tidak Valid
                        </Text>
                      )}
                      <Label style={{alignSelf: 'center', marginVertical: 10}}>
                        Email
                      </Label>
                      <Item rounded>
                        <Input
                          style={{padding: 5}}
                          onChangeText={text =>
                            this.setState({regEmail: text})
                          }>
                          {this.state.regEmail}
                        </Input>
                      </Item>
                      {this.state.regEmail.length > 0 ? null : (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          Email Kosong
                        </Text>
                      )}
                      <Label style={{alignSelf: 'center', marginVertical: 10}}>
                        Password
                      </Label>
                      <Item rounded>
                        <Input
                          style={{padding: 5}}
                          secureTextEntry={true}
                          onChangeText={text =>
                            this.setState({regPassword: text})
                          }>
                          {this.state.regPassword}
                        </Input>
                      </Item>
                      {this.state.regPassword.length >= 3 ? null : (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 10,
                            marginTop: 5,
                            textAlign: 'center',
                          }}>
                          Minimal 3 Karakter
                        </Text>
                      )}
                    </Form>
                    {this.state.regFirstName.length >= 3 &&
                    (this.state.regPhoneNumber.slice(0, 1) == 0 ||
                      this.state.regPhoneNumber.slice(0, 1) == 6) &&
                    this.state.regLastName.length >= 3 &&
                    this.state.regPassword.length >= 3 &&
                    this.state.regPhoneNumber.length >= 10 &&
                    this.state.regEmail.length >= 3 ? (
                      <Button
                        rounded
                        onPress={() => {
                          this.setState({regVerify: true});
                        }}
                        style={{
                          justifyContent: 'center',
                          marginVertical: 20,
                          flex: 1,
                          backgroundColor: '#0373fc',
                        }}>
                        <Text>Daftar</Text>
                      </Button>
                    ) : (
                      <Button
                        rounded
                        style={{
                          justifyContent: 'center',
                          marginVertical: 20,
                          flex: 1,
                          backgroundColor: '#0373fc',
                        }}>
                        <Text>Daftar</Text>
                      </Button>
                    )}
                  </View>
                </Tab>
              </Tabs>
              <Dialog.Container visible={this.state.regVerify}>
                <Dialog.Title>Pilih Metode Verifikasi</Dialog.Title>
                <Dialog.Button
                  label="Email"
                  onPress={() => {
                    this.setState({
                      regVerifyByEmail: true,
                      regVerify: false,
                    });
                    this.onRegButton(1);
                  }}
                />
                <Dialog.Button
                  label="SMS"
                  onPress={() => {
                    this.setState({regVerify: false});
                    this.onRegButton(2);
                  }}
                />
                <Dialog.Button
                  label="Cancel"
                  onPress={() => {
                    this.setState({regVerify: false});
                  }}
                />
              </Dialog.Container>
              <Dialog.Container visible={this.state.regVerifyByEmail}>
                <Dialog.Title>Please Check Your Email</Dialog.Title>
                <Dialog.Button
                  label="Ok"
                  onPress={() => {
                    this.setState({regVerifyByEmail: false});
                    this.props.navigation.navigate('Login');
                  }}
                />
              </Dialog.Container>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

export default Login;
