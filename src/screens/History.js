import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Text,
  Item,
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
  Spinner,
  Button,
  H2,
  H3,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import FooterBar from '../components/FooterBar';
import {connect} from 'react-redux';
import {getHistory} from '../redux/actions/History';
import AsyncStorage from '@react-native-community/async-storage';
import {Modal, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import indomart from '../image/indomart.png';
import bca from '../image/bca.png';
import bni from '../image/bni.png';

class History extends Component {
  state = {
    userToken: null,
    email: null,
    historyData: [],
    modal: false,
    detailData: [],
    pending: true,
  };

  getHistory = async () => {
    await this.props
      .dispatch(getHistory(this.state.email, this.state.userToken))
      .then(() => {
        this.setState({
          historyData: this.props.history.historyData.result,
          pending: false,
        });
      })
      .catch(() => {
        this.setState({
          pending: false,
        });
      });
  };

  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('status');
      if (token !== null) {
        const email = await AsyncStorage.getItem('email');
        this.setState({
          userToken: token,
          email: email,
        });
      }
    } catch (e) {
      e;
    }
  };

  detail = detail => {
    Axios.get(
      `https://api.sandbox.midtrans.com/v2/${'BO' + detail.ordersId}/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Basic U0ItTWlkLXNlcnZlci11WTBVN09rR2JjajBVaXp5bkpycjB3eEY6',
        },
      },
    ).then(res => {
      this.setState({
        detailData: res.data,
        modal: true,
      });
    });
  };

  componentDidMount() {
    this.getToken();
    setTimeout(() => {
      this.getHistory();
    }, 1000);
  }

  render() {
    function formatNumber(num) {
      return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    return (
      <Container>
        <Header
          androidStatusBarColor="#3c8af9"
          style={{backgroundColor: '#3c8af9'}}>
          <Body>
            <Title style={{alignSelf: 'center'}}>Pesanan Saya</Title>
          </Body>
        </Header>
        <Content padder>
          {!this.state.pending ? (
            <>
              {this.state.historyData.map(history => {
                var array = history.image.split(',');
                let image = array[0];
                return (
                  <TouchableOpacity
                    key={history.ordersId}
                    onPress={() => this.detail(history)}>
                    <Card>
                      <CardItem header bordered>
                        <Left>
                          <Thumbnail
                            square
                            large
                            source={{
                              uri: image,
                            }}
                          />
                          <List style={{marginLeft: 10}}>
                            <Text>{history.homeName}</Text>
                            <Item style={{borderBottomWidth: 0, marginTop: 10}}>
                              <Icon name="ios-pin" />
                              <Text>{history.kotaKabupaten}</Text>
                            </Item>
                          </List>
                        </Left>
                        <Right>
                          <Icon name="ios-arrow-forward" />
                        </Right>
                      </CardItem>
                      <CardItem bordered>
                        <Text>ID Pesanan : BO{history.ordersId}</Text>
                      </CardItem>
                      <CardItem bordered>
                        <Col style={{flex: 1}}>
                          <Text style={{alignSelf: 'center'}}>Check-in</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {history.dateCheckIn}
                          </Text>
                        </Col>
                        <Col style={{flex: 1}}>
                          <Icon
                            style={{alignSelf: 'center', marginLeft: 25}}
                            name="ios-arrow-forward"
                          />
                        </Col>
                        <Col style={{flex: 1}}>
                          <Text style={{alignSelf: 'center'}}>Check-out</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {history.dateCheckOut}
                          </Text>
                        </Col>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                );
              })}
              {this.state.historyData.length === 0 ? (
                <Text style={{textAlign: 'center', marginVertical: '50%'}}>
                  Anda Belum Memiliki Pesanan Kamar!
                </Text>
              ) : null}
            </>
          ) : (
            <Spinner color="blue" style={{height: 500}} />
          )}
          {this.state.detailData.length !== 0 ? (
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modal}>
              <Button
                transparent
                onPress={() => this.setState({modal: false, detailData: []})}>
                <Icon name="close" />
              </Button>
              <Content padder>
                <H2 style={{alignSelf: 'center', marginBottom: 20}}>
                  Detail Order
                </H2>

                {this.state.detailData.payment_type === 'bank_transfer' ? (
                  <>
                    {this.state.detailData.va_numbers[0].bank === 'bca' ? (
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
                    {this.state.detailData.va_numbers[0].bank === 'bni' ? (
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
                  </>
                ) : (
                  <>
                    {this.state.detailData.store === 'indomaret' ? (
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
                  </>
                )}
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  Order ID
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  {this.state.detailData.order_id}
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  {this.state.detailData.payment_code !== undefined
                    ? 'Payment Code'
                    : 'VA Number'}
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  {this.state.detailData.payment_code !== undefined
                    ? this.state.detailData.payment_code
                    : this.state.detailData.va_numbers[0].va_number}
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  Total Payment
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  {formatNumber(parseInt(this.state.detailData.gross_amount))}
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  Status
                </H3>
                <H3 style={{alignSelf: 'center', marginVertical: 10}}>
                  {this.state.detailData.transaction_status !== 'settlement'
                    ? 'Belum Terbayar'
                    : 'Sudah Terbayar'}
                </H3>
              </Content>
            </Modal>
          ) : null}
        </Content>

        <FooterBar menu={this.props} history={true} />
      </Container>
    );
  }
}

const mapStateToProps = ({history}) => {
  return {history};
};

export default connect(mapStateToProps)(History);
