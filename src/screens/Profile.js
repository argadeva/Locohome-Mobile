import React, {Component, Profiler} from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Input,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Form,
  Title,
  Label,
  Card,
  CardItem,
  Icon,
  View,
  Item,
} from 'native-base';
import {TouchableOpacity, Modal} from 'react-native';
import FooterBar from '../components/FooterBar';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from 'react-native-dialog';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      PhoneNumber: '',
      loading: true,
      modalUpdate: false,
    };
  }
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

  getUsers = async () => {
    await Axios.get(
      `http://18.206.61.46:1000/api/v1/users/getusers/${await AsyncStorage.getItem(
        'email',
      )}`,
      {
        headers: {'x-access-token': await AsyncStorage.getItem('status')},
      },
    )
      .then(res => {
        console.log(res.data[0]);
        this.setState({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          email: res.data[0].email,
          password: res.data[0].password,
          phoneNumber: res.data[0].phoneNumber,
          loading: false,
        });
      })
      .catch(err => {});
  };
  updateUsers = async () => {
    await Axios.patch(
      `http://18.206.61.46:1000/api/v1/users/${this.state.email}`,
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
      },
      {
        headers: {'x-access-token': await AsyncStorage.getItem('status')},
      },
    )
      .then(res => {
        this.setState({
          modalUpdate: false,
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#3c8af9"
          style={{backgroundColor: '#3c8af9'}}>
          <Body>
            <Title style={{alignSelf: 'center'}}>Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Thumbnail
            large
            style={{margin: 20, alignSelf: 'center'}}
            source={{uri: 'https://dummyimage.com/500x500/0d15ff/fff'}}
          />
          <Card>
            <CardItem bordered>
              <Icon active name="ios-person" />
              <Text>
                {this.state.loading !== true
                  ? this.state.firstName + ' ' + this.state.lastName
                  : ''}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Icon active name="ios-mail" />
              <Text>{this.state.loading !== true ? this.state.email : ''}</Text>
            </CardItem>
            <CardItem bordered>
              <Icon active name="ios-call" />
              <Text>
                {this.state.loading !== true ? this.state.phoneNumber : ''}
              </Text>
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
                }}
                onPress={() => {
                  this.setState({modalUpdate: true});
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
        {/* -----------------------------------modal update-------------------------------- */}

        <Modal visible={this.state.modalUpdate}>
          <Content style={{padding: 20}}>
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: 10,
                fontSize: 20,
                borderBottomWidth: 1,
              }}>
              Update Your Profile
            </Text>

            <Form>
              <Thumbnail
                large
                style={{margin: 20, alignSelf: 'center'}}
                source={{uri: 'https://dummyimage.com/500x500/0d15ff/fff'}}
              />
              <Label style={{alignSelf: 'center', marginBottom: 10}}>
                First Name
              </Label>
              <Item rounded>
                <Input
                  type="text"
                  onChangeText={text => this.setState({firstName: text})}
                  style={{
                    padding: 5,
                  }}>
                  {this.state.firstName}
                </Input>
              </Item>
              <Label style={{alignSelf: 'center', marginBottom: 10}}>
                Last Name
              </Label>
              <Item rounded>
                <Input
                  type="text"
                  onChangeText={text => this.setState({lastName: text})}
                  style={{
                    padding: 5,
                  }}>
                  {this.state.lastName}
                </Input>
              </Item>
              <Label style={{alignSelf: 'center', marginBottom: 10}}>
                Email
              </Label>
              <Item rounded>
                <Input
                  type="email"
                  style={{
                    padding: 5,
                  }}
                  editable={false}>
                  {this.state.email}
                </Input>
              </Item>
              <Text style={{color: 'red', fontSize: 10}}>
                #You Can't Edit Your Email
              </Text>
              <Label style={{alignSelf: 'center', marginVertical: 10}}>
                Password
              </Label>
              <Item rounded>
                <Input
                  secureTextEntry={true}
                  password={true}
                  type="password"
                  onChangeText={text => this.setState({password: text})}
                  style={{padding: 5}}>
                  {this.state.password}
                </Input>
              </Item>
              <Label style={{alignSelf: 'center', marginBottom: 10}}>
                Phone Number
              </Label>
              <Item rounded>
                <Input
                  type="text"
                  onChangeText={text => this.setState({phoneNumber: text})}
                  style={{
                    padding: 5,
                  }}>
                  {this.state.phoneNumber}
                </Input>
              </Item>
            </Form>

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
                    marginTop: 0,
                    flex: 1,
                  }}
                  onPress={() => this.updateUsers()}>
                  <Text>Update</Text>
                </Button>
              </Col>
              <Col
                style={{
                  padding: 20,
                }}>
                <Button
                  rounded
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#2196F3',
                    marginTop: 0,
                    flex: 1,
                  }}
                  onPress={() => this.setState({modalUpdate: false})}>
                  <Text>Cancel</Text>
                </Button>
              </Col>
            </Grid>
          </Content>
        </Modal>
      </Container>
    );
  }
}

export default Profile;
