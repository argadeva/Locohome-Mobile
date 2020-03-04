import React, {Component} from 'react';
import {StatusBar, View, Modal, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Icon,
  Button,
  Text,
  Content,
  H3,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  H2,
  Spinner,
} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {
  indomartPayment,
  bcaPayment,
  bniPayment,
} from '../redux/actions/Payment';
import indomart from '../image/indomart.png';
import bca from '../image/bca.png';
import bni from '../image/bni.png';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import fan from '../image/feature/fan.png';
import ac from '../image/feature/ac.png';
import bed from '../image/feature/bed.png';
import bottle from '../image/feature/bottle.png';
import person from '../image/feature/person.png';
import shower from '../image/feature/shower.png';
import wardrobe from '../image/feature/wardrobe.png';

export class DetailRoom extends Component {
  state = {
    id: null,
    idRoom: null,
    idGender: null,
    homeName: '',
    description: '',
    detailAddress: '',
    kecamatan: '',
    kotaKabupaten: '',
    provinsi: '',
    long: '',
    lat: '',
    images: [],
    checkIn: '',
    checkOut: '',
    priceNight: null,
    modal: false,
    days: null,
    total: null,
    idUser: null,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    modalPayment: false,
  };

  orderSubmit = async pay => {
    await Axios.post(
      'http://18.206.61.46:1000/api/v1/orders/order',
      {
        idUser: this.state.idUser,
        idRoom: this.state.idRoom,
        idListRoom: this.state.id,
        dateCheckIn: this.state.checkIn,
        dateCheckOut: this.state.checkOut,
        price: this.state.priceNight,
        paymentStatus: 0,
      },
      {
        headers: {'x-access-token': await AsyncStorage.getItem('status')},
      },
    )
      .then(res => {
        this.setState({
          modal: false,
          modalPayment: true,
        });
        if (pay === 1) {
          this.indomartPayment(res.data.result.id);
        } else if (pay === 3) {
          this.bcaPayment(res.data.result.id);
        } else {
          this.bniPayment(res.data.result.id);
        }
      })
      .catch(err => {
        err;
      });
  };

  indomartPayment = async id => {
    await this.props.dispatch(indomartPayment(this.state, id));
  };

  bcaPayment = async id => {
    await this.props.dispatch(bcaPayment(this.state, id));
  };

  bniPayment = async id => {
    await this.props.dispatch(bniPayment(this.state, id));
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
          idUser: res.data[0].id,
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          phoneNumber: res.data[0].phoneNumber,
          email: res.data[0].email,
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getUsers();
    var array = this.props.route.params.data.image.split(',');
    const date1 = new Date(this.props.route.params.parent.checkIn);
    const date2 = new Date(this.props.route.params.parent.checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.setState({
      checkIn: this.props.route.params.parent.checkIn,
      checkOut: this.props.route.params.parent.checkOut,
      id: this.props.route.params.data.id,
      idRoom: this.props.route.params.data.idRoom,
      idGender: this.props.route.params.data.idGender,
      homeName: this.props.route.params.data.homeName,
      detailAddress: this.props.route.params.data.detailAddress,
      kecamatan: this.props.route.params.data.kecamatan,
      kotaKabupaten: this.props.route.params.data.kotaKabupaten,
      provinsi: this.props.route.params.data.provinsi,
      description: this.props.route.params.data.description,
      long: this.props.route.params.data.long,
      lat: this.props.route.params.data.lat,
      images: array,
      priceNight: this.props.route.params.data.priceNight,
      days: diffDays,
      total: parseInt(this.props.route.params.data.priceNight * diffDays),
    });
  }

  render() {
    function formatNumber(num) {
      return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function date(inputFormat) {
      var d = new Date(inputFormat);
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('-');
    }

    return (
      <Container>
        <Content>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="transparent"
            translucent={true}
          />
          <SliderBox images={this.state.images} />
          <Button
            onPress={() => this.props.navigation.navigate('SearchRoom')}
            transparent
            style={{position: 'absolute', top: 20}}>
            <Icon style={{color: 'white'}} name="arrow-back" />
          </Button>
          <View style={{padding: 15}}>
            <H3>{this.state.homeName}</H3>
            <Text style={{fontSize: 12}}>
              {this.state.detailAddress +
                ', ' +
                this.state.kecamatan +
                ', ' +
                this.state.kotaKabupaten +
                ', ' +
                this.state.provinsi}
            </Text>
            <Grid>
              <Col style={{paddingRight: 10}}>
                <Button
                  iconLeft
                  small
                  bordered
                  onPress={() =>
                    this.props.navigation.navigate('Maps', {data: this.state})
                  }
                  style={{marginTop: 10, borderColor: 'red'}}>
                  <Icon name="pin" style={{color: 'red'}} />
                  <Text style={{color: 'red'}}>Lihat di peta</Text>
                </Button>
              </Col>
              <Col>
                <Button small transparent style={{marginTop: 10}}>
                  <Text style={{color: '#3c8af9', textAlign: 'center'}}>
                    {this.state.idGender === 1 ? 'Kamar Pria' : null}
                    {this.state.idGender === 2 ? 'Kamar Wanita' : null}
                    {this.state.idGender === 0 ? 'Kamar Keluarga' : null}
                  </Text>
                </Button>
              </Col>
            </Grid>
            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 3,
                borderTopWidth: 3,
                borderColor: '#ff9800',
                paddingVertical: 15,
              }}>
              <H3
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                Fasilitas
              </H3>
              <Grid>
                <Row style={{flexWrap: 'wrap'}}>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={bed}
                      style={{
                        height: 30,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                        marginBottom: 10,
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      {this.props.route.params.data.bed !== 1
                        ? 'Single'
                        : 'Double'}{' '}
                      Bed
                    </Text>
                  </Col>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={bottle}
                      style={{
                        height: 30,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                        marginBottom: 10,
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      Gratis Minum
                    </Text>
                  </Col>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={this.props.route.params.data.fan !== 1 ? ac : fan}
                      style={{
                        height: 40,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      {this.props.route.params.data.fan !== 1
                        ? 'AC'
                        : 'Kipas Angin'}
                    </Text>
                  </Col>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={person}
                      style={{
                        height: 30,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                        marginBottom: 10,
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      {this.props.route.params.data.personInroom} Orang
                    </Text>
                  </Col>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={wardrobe}
                      style={{
                        height: 30,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                        marginBottom: 10,
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      Almari Pakaian
                    </Text>
                  </Col>
                  <Col style={{width: '28%', margin: 8}}>
                    <Image
                      source={shower}
                      style={{
                        height: 30,
                        width: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                        marginBottom: 10,
                      }}
                    />
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      {this.props.route.params.data.personInroom !== 1
                        ? 'Toilet Luar'
                        : 'Toilet Dalam'}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
            <Card style={{marginTop: 20}}>
              <CardItem bordered>
                <Col style={{flex: 1}}>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                    Check In
                  </Text>
                  <Text style={{alignSelf: 'center'}}>
                    {date(this.state.checkIn)}
                  </Text>
                </Col>
                <Col style={{flex: 1}}>
                  <Icon
                    style={{alignSelf: 'center', marginLeft: 25}}
                    name="ios-arrow-forward"
                  />
                </Col>
                <Col style={{flex: 1}}>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                    Check Out
                  </Text>
                  <Text style={{alignSelf: 'center'}}>
                    {date(this.state.checkOut)}
                  </Text>
                </Col>
              </CardItem>
              <CardItem style={{alignSelf: 'center'}} bordered>
                <Text>{this.state.days + ' Malam'}</Text>
              </CardItem>
              <CardItem style={{alignSelf: 'center'}} footer>
                <Text style={{fontWeight: 'bold'}}>
                  Total : {formatNumber(parseInt(this.state.total))}
                </Text>
              </CardItem>
            </Card>
            <Text style={{marginVertical: 20, textAlign: 'center'}}>
              {this.state.description}
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal}>
            <Button transparent onPress={() => this.setState({modal: false})}>
              <Icon name="close" />
            </Button>
            <Content padder>
              <H3 style={{alignSelf: 'center', marginBottom: 20}}>
                Pilih Metode Pembayaran
              </H3>
              <TouchableOpacity onPress={() => this.orderSubmit(3)}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail square source={bca} />
                      <Body>
                        <Text>BCA Virtual Account</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.orderSubmit(4)}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail square source={bni} />
                      <Body>
                        <Text>BNI Virtual Account</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.orderSubmit(1)}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail square source={indomart} />
                      <Body>
                        <Text>Indomart Merchant</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Content>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalPayment}>
            <Button
              transparent
              onPress={() => this.props.navigation.replace('Home')}>
              <Icon name="close" />
            </Button>
            <Content padder>
              {!this.props.payment.isPending ? (
                <>
                  <H2 style={{alignSelf: 'center', marginBottom: 20}}>
                    Transaksi Sukses
                  </H2>
                  {this.props.payment.paymentData.store === 'indomaret' ? (
                    <Thumbnail
                      square
                      source={indomart}
                      style={{
                        alignSelf: 'center',
                        width: 150,
                        resizeMode: 'cover',
                        marginBottom: 20,
                      }}
                    />
                  ) : null}
                  {this.props.payment.paymentData.payment_type !== 'cstore' &&
                  this.props.payment.paymentData.va_numbers[0].bank ===
                    'bca' ? (
                    <Thumbnail
                      square
                      source={bca}
                      style={{
                        alignSelf: 'center',
                        width: 150,
                        resizeMode: 'cover',
                        marginBottom: 20,
                      }}
                    />
                  ) : null}
                  {this.props.payment.paymentData.payment_type !== 'cstore' &&
                  this.props.payment.paymentData.va_numbers[0].bank ===
                    'bni' ? (
                    <Thumbnail
                      square
                      source={bni}
                      style={{
                        alignSelf: 'center',
                        width: 150,
                        resizeMode: 'cover',
                        marginBottom: 20,
                      }}
                    />
                  ) : null}
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    Order ID
                  </H3>
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    {this.props.payment.paymentData.order_id}
                  </H3>
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    Payment Code
                  </H3>
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    {this.props.payment.paymentData.payment_type === 'cstore'
                      ? this.props.payment.paymentData.payment_code
                      : this.props.payment.paymentData.va_numbers[0].va_number}
                  </H3>
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    Total Payment
                  </H3>
                  <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                    {formatNumber(parseInt(this.state.total))}
                  </H3>
                </>
              ) : (
                <Spinner color="blue" style={{height: 500}} />
              )}
            </Content>
          </Modal>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              style={{backgroundColor: '#3c8af9'}}
              onPress={() => this.setState({modal: true})}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Pesan Kamar Sekarang !
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({payment}) => {
  return {
    payment,
  };
};

export default connect(mapStateToProps)(DetailRoom);
