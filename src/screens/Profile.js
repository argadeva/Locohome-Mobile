import React, {Component, Profiler} from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Title,
  Badge,
  Card,
  CardItem,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import FooterBar from '../components/FooterBar';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('status');
      await AsyncStorage.removeItem('email');
      await this.props.navigation.replace('Login');
    } catch (e) {
      e;
    }
  };

  logOut = async () => {
    Axios.post(
      `http://18.206.61.46:1000/api/v1/users/logout/${await AsyncStorage.getItem(
        'status',
      )}`,
    )
      .then(res => {
        this.removeToken();
      })
      .catch(err => {});
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8af9">
          <Body>
            <Title style={{alignSelf: 'center'}}>Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Icon active name="ios-person" />
              <Text>Nama Lengkap</Text>
            </CardItem>
            <CardItem bordered>
              <Icon active name="ios-pin" />
              <Text>Alamat</Text>
            </CardItem>
            <CardItem bordered>
              <Icon active name="ios-mail" />
              <Text>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Icon active name="ios-call" />
              <Text>Phone Number</Text>
            </CardItem>
          </Card>

          <Grid>
            <Col
              style={{
                padding: 20,
              }}>
              <Button
                rounded
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#2196F3',
                }}>
                <Text>UPDATE</Text>
              </Button>
            </Col>
            <Col
              style={{
                padding: 20,
              }}>
              <Button
                onPress={() => this.logOut()}
                rounded
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#2196F3',
                  flex: 1,
                }}>
                <Text>LOGOUT</Text>
              </Button>
            </Col>
          </Grid>

          <Card>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Help')}>
              <CardItem bordered>
                <Icon active name="ios-help-circle-outline" />
                <Text>Hubungi Kami</Text>
              </CardItem>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('About')}>
              <CardItem bordered>
                <Icon active name="ios-heart" />
                <Text>Tentang Kami</Text>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </Content>
        <FooterBar menu={this.props} profile={true} />
      </Container>
    );
  }
}

export default Profile;
