import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Item,
  Input,
  Icon,
  DatePicker,
  Button,
  H1,
  H2,
  H3,
  Card,
  CardItem,
} from 'native-base';
import {Image, Alert, TouchableOpacity} from 'react-native';
import FooterBar from '../components/FooterBar';
import {Col, Row, Grid} from 'react-native-easy-grid';
import bromo from '../image/bromo.jpg';
import bali from '../image/bali.jpg';
import borobudur from '../image/borobudur.jpg';
import merbabu from '../image/merbabu.jpg';

class Home extends Component {
  state = {
    search: '',
    checkIn: '',
    checkOut: '',
    today: '',
  };

  componentDidMount() {
    let checkIn = new Date();
    let checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 1);
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
        '-',
      );
    }
    this.setState({
      search: 'Depok',
      today: convertDate(checkIn),
      checkIn: convertDate(checkIn),
      checkOut: convertDate(checkOut),
    });
  }

  setDateIn(newDate) {
    this.setState({checkIn: newDate});
  }

  setDateOut(newDate) {
    this.setState({checkOut: newDate});
  }

  onSearch = () => {
    if (this.state.search === '' || this.state.search === undefined) {
      Alert.alert(
        'Gagal!',
        'Kata kunci pencarian kosong!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else if (this.state.checkIn < this.state.today) {
      Alert.alert(
        'Gagal!',
        'Tanggal check in minimal hari ini!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else if (this.state.checkOut <= this.state.checkIn) {
      Alert.alert(
        'Gagal!',
        'Tanggal check out harus lebih besar!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('SearchRoom', {post: this.state});
    }
  };

  render() {
    // console.disableYellowBox = true;

    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
        '-',
      );
    }

    let date = new Date();
    date.setDate(date.getDate() + 1);
    return (
      <Container>
        <Header androidStatusBarColor="#3c8af9" style={{display: 'none'}} />
        <Content style={{backgroundColor: '#f1f1f3'}} padder>
          <H2
            style={{
              padding: 10,
              marginTop: 20,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Cari Ruang Menginap Anda
          </H2>
          <Item rounded style={{backgroundColor: '#fff', marginVertical: 10}}>
            <Icon name="ios-search" />
            <Input
              onChangeText={text => this.setState({search: text})}
              placeholder="Depok"
              style={{padding: 5}}
            />
          </Item>
          <Grid>
            <Col>
              <Text style={{alignSelf: 'center', marginBottom: 10}}>
                Check In
              </Text>
              <Item rounded style={{backgroundColor: '#fff'}}>
                <Icon active name="ios-calendar" />
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={'id'}
                  timeZoneOffsetInMinutes={+7}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  textStyle={{color: '#3c8af9'}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={txt => this.setDateIn(convertDate(txt))}
                />
              </Item>
            </Col>
            <Col>
              <Text style={{alignSelf: 'center', marginBottom: 10}}>
                Check Out
              </Text>
              <Item rounded style={{backgroundColor: '#fff'}}>
                <Icon active name="ios-calendar" />
                <DatePicker
                  defaultDate={date}
                  minimumDate={date}
                  locale={'id'}
                  timeZoneOffsetInMinutes={+7}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  textStyle={{color: '#3c8af9'}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={txt => this.setDateOut(convertDate(txt))}
                />
              </Item>
            </Col>
          </Grid>
          <Button
            onPress={() => this.onSearch()}
            rounded
            style={{
              justifyContent: 'center',
              flex: 1,
              backgroundColor: '#2196F3',
              marginVertical: 20,
            }}>
            <Text>Cari!</Text>
          </Button>
          <H3 style={{padding: 10, textAlign: 'center', fontWeight: 'bold'}}>
            Destinasi Popular
          </H3>
          <Grid style={{flexWrap: 'wrap'}}>
            <Col style={{width: '50%', padding: 5}}>
              <TouchableOpacity
                onPress={async () => {
                  await this.setState({search: 'pasuruan'});
                  await this.onSearch();
                }}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={bromo}
                      style={{height: 150, width: null, flex: 1}}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <TouchableOpacity
                onPress={async () => {
                  await this.setState({search: 'bali'});
                  await this.onSearch();
                }}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={bali}
                      style={{height: 150, width: null, flex: 1}}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <TouchableOpacity
                onPress={async () => {
                  await this.setState({search: 'magelang'});
                  await this.onSearch();
                }}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={borobudur}
                      style={{height: 150, width: null, flex: 1}}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <TouchableOpacity
                onPress={async () => {
                  await this.setState({search: 'boyolali'});
                  await this.onSearch();
                }}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={merbabu}
                      style={{height: 150, width: null, flex: 1}}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </Content>
        <FooterBar menu={this.props} home={true} />
      </Container>
    );
  }
}

export default Home;
