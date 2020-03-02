import React, {Component} from 'react';
import {View} from 'react-native';

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
  Item,
  Input,
} from 'native-base';
import Axios from 'axios';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      forgetPassword: false,
    };
  }

  onSubmitButton = async () => {
    await Axios.patch('http://18.206.61.46:1000/api/v1/users/forgetPassword', {
      email: this.state.email,
    }).then(res => {
      this.props.navigation.navigate('Login');
    });
  };

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
            <Title>Lupa Password</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View style={{padding: 30}}>
            <Item rounded>
              <Input
                placeholder="Email"
                style={{padding: 5}}
                onChangeText={text => this.setState({email: text})}
              />
            </Item>
          </View>
          <View style={{paddingHorizontal: 80}}>
            <Button
              rounded
              style={{justifyContent: 'center', flex: 1}}
              onPress={() => {
                this.setState({forgetPassword: true});
                this.onSubmitButton();
              }}>
              <Text>Lupa Password</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ForgetPassword;
