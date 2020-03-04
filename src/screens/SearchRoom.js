import React, {Component} from 'react';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Left,
  Body,
  Spinner,
  Right,
  Content,
  Card,
  CardItem,
  H3,
  Badge,
  DatePicker,
  Picker,
} from 'native-base';
import {Image, TouchableOpacity, View, Alert} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {getRoom} from '../redux/actions/ListRoom';

class SearchRoom extends Component {
  state = {
    search: '',
    checkIn: '',
    checkOut: '',
    resData: [],
    urutan: 'priceNight',
    today: '',
    loading: false,
    page: 1,
    pending: true,
  };

  onSearch = async () => {
    await this.props.dispatch(getRoom(this.state));
  };

  setDateIn(newDate) {
    this.setState({checkIn: newDate});
  }

  setDateOut(newDate) {
    this.setState({checkOut: newDate});
  }

  async componentDidMount() {
    await this.setState({
      today: this.props.route.params.post.today,
      search: this.props.route.params.post.search,
      checkIn: this.props.route.params.post.checkIn,
      checkOut: this.props.route.params.post.checkOut,
    });
    await this.onSearch().then(() => {
      this.setState({
        resData: this.props.ListRoom.searchData.result,
        pending: false,
      });
    });
  }

  searchButton = () => {
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
      this.setState({page: 1, pending: true});
      setTimeout(() => {
        this.searchDelay();
      }, 100);
    }
  };

  searchDelay = async () => {
    await this.onSearch().then(() => {
      this.setState({
        resData: this.props.ListRoom.searchData.result,
        pending: false,
      });
    });
  };

  onValueChange(value) {
    this.setState({
      urutan: value,
    });
  }

  setCurrentReadOffset = async event => {
    let itemHeight = 150;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);
    if (currentItemIndex > this.state.page) {
      await this.setState({page: currentItemIndex, loading: true});
      await this.props.dispatch(getRoom(this.state)).then(() => {
        if (this.props.ListRoom.searchData.result.length !== 0) {
          this.setState({
            loading: false,
            resData: this.state.resData.concat(
              this.props.ListRoom.searchData.result,
            ),
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
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

    function formatNumber(num) {
      return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    return (
      <Container>
        <Header
          androidStatusBarColor="#3c8af9"
          style={{backgroundColor: '#3c8af9'}}>
          <Left style={{flex: 1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex: 6}}>
            <Item rounded style={{backgroundColor: 'white', height: 40}}>
              <Input
                onChangeText={text => this.setState({search: text})}
                defaultValue={this.state.search}
                style={{padding: 5}}
              />
            </Item>
          </Body>
          <Right style={{flex: 1}}>
            <Button transparent onPress={() => this.searchButton()}>
              <Icon name="ios-search" />
            </Button>
          </Right>
        </Header>
        <View style={{backgroundColor: '#3c8af9', height: 65}}>
          <Grid>
            <Col style={{padding: 10}}>
              <Item rounded style={{backgroundColor: '#fff'}}>
                <Icon active name="ios-calendar" style={{fontSize: 12}} />
                <DatePicker
                  defaultDate={new Date(this.props.route.params.post.checkIn)}
                  minimumDate={new Date(this.props.route.params.post.checkIn)}
                  locale={'id'}
                  timeZoneOffsetInMinutes={+7}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  textStyle={{color: '#3c8af9', fontSize: 12, padding: 5}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={txt => this.setDateIn(convertDate(txt))}
                />
              </Item>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Check In
              </Text>
            </Col>
            <Col style={{padding: 10}}>
              <Item rounded style={{backgroundColor: '#fff'}}>
                <Icon active name="ios-calendar" style={{fontSize: 12}} />
                <DatePicker
                  defaultDate={new Date(this.props.route.params.post.checkOut)}
                  minimumDate={new Date()}
                  locale={'id'}
                  timeZoneOffsetInMinutes={+7}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  textStyle={{color: '#3c8af9', fontSize: 12, padding: 5}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={txt => this.setDateOut(convertDate(txt))}
                />
              </Item>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Check Out
              </Text>
            </Col>
            <Col style={{padding: 10}}>
              <Item rounded style={{backgroundColor: '#fff', height: 28}}>
                <Icon active name="ios-funnel" style={{fontSize: 12}} />
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.urutan}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Picker.Item label="Harga" value="priceNight" />
                  <Picker.Item label="Nama" value="homeName" />
                  <Picker.Item label="Kota" value="kotaKabupaten" />
                </Picker>
              </Item>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Urutkan
              </Text>
            </Col>
          </Grid>
        </View>
        <Content
          padder
          scrollEventThrottle={300}
          onScroll={this.setCurrentReadOffset}>
          {!this.state.pending ? (
            <>
              {this.state.resData.map(data => {
                var array = data.image.split(',');
                return (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() =>
                      this.props.navigation.navigate('DetailRoom', {
                        data: data,
                        parent: this.state,
                      })
                    }>
                    <Card>
                      <Grid>
                        <Col style={{width: '40%'}}>
                          <Image
                            source={{
                              uri: array[0],
                            }}
                            style={{
                              height: 200,
                              width: null,
                              flex: 1,
                              resizeMode: 'cover',
                            }}
                          />
                        </Col>
                        <Col style={{padding: 10}}>
                          <Text>{data.homeName + ' - Kamar A' + data.id}</Text>
                          <Item style={{borderBottomWidth: 0, marginTop: 10}}>
                            <Icon name="ios-pin" />
                            <Text>{data.kotaKabupaten}</Text>
                          </Item>
                          {data.idGender === 1 ? (
                            <Badge
                              style={{
                                marginTop: 10,
                                backgroundColor: '#2196F3',
                              }}>
                              <Text>Pria</Text>
                            </Badge>
                          ) : null}
                          {data.idGender === 2 ? (
                            <Badge
                              style={{
                                marginTop: 10,
                                backgroundColor: '#e91e63',
                              }}>
                              <Text>Wanita</Text>
                            </Badge>
                          ) : null}
                          {data.idGender === 0 ? (
                            <Badge
                              style={{
                                marginTop: 10,
                                backgroundColor: '#4caf50',
                              }}>
                              <Text>Keluarga</Text>
                            </Badge>
                          ) : null}
                          <Col
                            style={{
                              justifyContent: 'flex-end',
                            }}>
                            <Text
                              style={{
                                alignSelf: 'flex-end',
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                              {formatNumber(data.priceNight)} / Malam
                            </Text>
                          </Col>
                        </Col>
                      </Grid>
                    </Card>
                  </TouchableOpacity>
                );
              })}
              {this.state.resData.length === 0 ? (
                <Text style={{textAlign: 'center', marginVertical: '50%'}}>
                  Kamar Tidak Tersedia Silahkan Memilih Tanggal Atau Pencarian
                  Lain
                </Text>
              ) : null}
            </>
          ) : (
            <Spinner color="blue" style={{height: 500}} />
          )}
          {this.state.loading ? <Spinner color="blue" /> : null}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ListRoom}) => {
  return {
    ListRoom,
  };
};

export default connect(mapStateToProps)(SearchRoom);
