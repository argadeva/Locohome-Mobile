import React, {Component, Profiler} from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Button,
  Input,
  Thumbnail,
  Body,
  Form,
  Title,
  Label,
  Card,
  CardItem,
  Icon,
  Spinner,
  Item,
} from 'native-base';
import {
  TouchableOpacity,
  Modal,
  Alert,
  TouchableOpacityBase,
} from 'react-native';
import FooterBar from '../components/FooterBar';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import profile from '../image/profile.jpg';
import ImagePicker from 'react-native-image-picker';

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
      image: null,
      loading: true,
      modalUpdate: false,
      avatarSource: null,
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
        this.setState({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          email: res.data[0].email,
          password: res.data[0].password,
          phoneNumber: res.data[0].phoneNumber,
          image: res.data[0].image,
          loading: false,
        });
      })
      .catch(err => {});
  };
  updateUsers = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append('firstName', this.state.firstName);
    bodyFormData.append('lastName', this.state.lastName);
    bodyFormData.append('email', this.state.email);
    bodyFormData.append('password', this.state.password);
    bodyFormData.append('phoneNumber', this.state.phoneNumber);
    if (this.state.avatarSource !== null) {
      bodyFormData.append('image', {
        uri: this.state.avatarSource.uri,
        type: 'image/jpeg',
        name: this.state.avatarSource.fileName,
      });
    }
    await Axios.patch(
      `http://18.206.61.46:1000/api/v1/users/update/${this.state.email}`,
      bodyFormData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'x-access-token': await AsyncStorage.getItem('status'),
        },
      },
    )
      .then(res => {
        Alert.alert(
          'Success!',
          'Update profil berhasil!',
          [
            {
              text: 'OK',
              onPress: () => this.updateState(),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(err => {
        Alert.alert(
          'Gagal!',
          'Update profil gagal!',
          [
            {
              text: 'Close',
            },
          ],
          {cancelable: false},
        );
      });
  };

  updateState = () => {
    if (this.state.avatarSource === null) {
      this.setState({
        modalUpdate: false,
      });
    } else {
      this.setState({
        modalUpdate: false,
        image: this.state.avatarSource,
      });
    }
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          avatarSource: response,
        });
      }
    });
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
        {!this.state.loading ? (
          <Content padder>
            {this.state.avatarSource === null ? (
              <>
                {this.state.image === null ? (
                  <Thumbnail
                    large
                    style={{margin: 20, alignSelf: 'center'}}
                    source={profile}
                  />
                ) : (
                  <Thumbnail
                    large
                    style={{margin: 20, alignSelf: 'center'}}
                    source={{uri: this.state.image}}
                  />
                )}
              </>
            ) : (
              <>
                {this.state.avatarSource && (
                  <Thumbnail
                    large
                    style={{margin: 20, alignSelf: 'center'}}
                    source={this.state.avatarSource}
                  />
                )}
              </>
            )}
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
                <Text>
                  {this.state.loading !== true ? this.state.email : ''}
                </Text>
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
        ) : (
          <Spinner color="blue" style={{height: 500}} />
        )}
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
              <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                {this.state.avatarSource === null ? (
                  <>
                    {this.state.image === null ? (
                      <Thumbnail
                        large
                        style={{margin: 20, alignSelf: 'center'}}
                        source={profile}
                      />
                    ) : (
                      <Thumbnail
                        large
                        style={{margin: 20, alignSelf: 'center'}}
                        source={{uri: this.state.image}}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {this.state.avatarSource && (
                      <Thumbnail
                        large
                        style={{margin: 20, alignSelf: 'center'}}
                        source={this.state.avatarSource}
                      />
                    )}
                  </>
                )}
              </TouchableOpacity>

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

            <Grid style={{marginBottom: 50}}>
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
