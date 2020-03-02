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
  Title,
  Right,
  Content,
  Card,
  CardItem,
  H3,
  Badge,
} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {getRoom} from '../redux/actions/ListRoom';

class SearchRoom extends Component {
  state = {
    search: '',
    checkIn: '',
    checkOut: '',
    resData: [],
  };

  onSearch = async () => {
    await this.props.dispatch(getRoom(this.state));
  };

  async componentDidMount() {
    await this.setState({
      search: this.props.route.params.post.search,
      checkIn: this.props.route.params.post.checkIn,
      checkOut: this.props.route.params.post.checkOut,
    });
    await this.onSearch().then(() => {
      this.setState({
        resData: this.props.ListRoom.searchData.result,
      });
    });
  }

  searchButton = async () => {
    await this.onSearch().then(() => {
      this.setState({
        resData: this.props.ListRoom.searchData.result,
      });
    });
  };

  render() {
    function formatNumber(num) {
      return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    return (
      <Container>
        <Header>
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
        <Content padder>
          {this.state.resData.map(data => {
            return (
              <TouchableOpacity
                key={data.id}
                onPress={() =>
                  this.props.navigation.navigate('DetailRoom', {data: data})
                }>
                <Card>
                  <Grid>
                    <Col style={{width: '40%'}}>
                      <Image
                        source={{
                          uri:
                            'https://pix6.agoda.net/hotelImages/4656079/-1/f7771c6afc7cc32401286116a7eed6f0.jpg',
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
                      <Text>{data.homeName}</Text>
                      <Item style={{borderBottomWidth: 0, marginTop: 10}}>
                        <Icon name="ios-pin" />
                        <Text>{data.kotaKabupaten}</Text>
                      </Item>
                      {data.idGender === 1 ? (
                        <Badge style={{marginTop: 10}}>
                          <Text>Khusus Laki-laki</Text>
                        </Badge>
                      ) : null}
                      {data.idGender === 2 ? (
                        <Badge style={{marginTop: 10}}>
                          <Text>Khusus Perempuan</Text>
                        </Badge>
                      ) : null}
                      {data.idGender === 0 ? (
                        <Badge style={{marginTop: 10}}>
                          <Text>Campur</Text>
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
