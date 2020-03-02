import React, {Component} from 'react';
import {View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
  Content,
  Text,
} from 'native-base';

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      token: '',
      Otp: '',
      userData: [],
      code: '',
    };
  }

  onSubmitButton = async token => {
    console.log(this.state.code);
    console.log(this.state.OTP);
    if (this.state.code === this.state.OTP) {
      await Axios.patch(
        `http://18.206.61.46:1000/api/v1/users/verification/${token}`,
      ).then(res => {
        this.props.navigation.navigate('Home');
      });
    } else {
      console.log('gagal');
    }
  };

  _retrieveData = async () => {
    try {
      const Otp = await AsyncStorage.getItem('OTP');
      const token = await AsyncStorage.getItem('status');
      this.setState({token: token, OTP: Otp});
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Login')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>OTP Code</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <OTPInputView
            style={{
              padding: 50,
              height: 200,
              color: 'black',
            }}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              color: 'black',
              borderBottomWidth: 2,
              borderColor: 'black',
            }}
            codeInputHighlightStyle={{borderColor: '#03DAC6'}}
            onCodeFilled={code => {
              this.setState({code: code});
            }}
          />
          <View style={{paddingHorizontal: 80}}>
            <Button rounded style={{justifyContent: 'center'}}>
              <Text>Verifikasi</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default OTP;
