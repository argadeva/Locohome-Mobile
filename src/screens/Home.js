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
import {Image} from 'react-native';
import FooterBar from '../components/FooterBar';
import {Col, Row, Grid} from 'react-native-easy-grid';

class Home extends Component {
  state = {
    search: '',
    checkIn: '',
    checkOut: '',
  };

  setDateIn(newDate) {
    this.setState({checkIn: newDate});
  }

  setDateOut(newDate) {
    this.setState({checkOut: newDate});
  }

  onSearch = () => {
    this.props.navigation.navigate('SearchRoom', {post: this.state});
  };

  render() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
        '-',
      );
    }

    return (
      <Container>
        <Header androidStatusBarColor="#3c8af9" style={{display: 'none'}} />
        <Content style={{backgroundColor: '#f1f1f3'}} padder>
          <H2 style={{padding: 10, marginTop: 10}}>Cari Ruang Menginap Anda</H2>
          <Item rounded style={{backgroundColor: '#fff', marginVertical: 10}}>
            <Icon name="ios-search" />
            <Input
              onChangeText={text => this.setState({search: text})}
              placeholder="Kota / Nama penginapan ..."
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
                  textStyle={{color: 'green'}}
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
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  textStyle={{color: 'green'}}
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
          <H3 style={{padding: 10}}>Ruang Populer</H3>
          <Grid style={{flexWrap: 'wrap'}}>
            <Col style={{width: '50%', padding: 5}}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: 'https://dummyimage.com/500x500/0048ff/0011ff',
                    }}
                    style={{height: 150, width: null, flex: 1}}
                  />
                </CardItem>
              </Card>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: 'https://dummyimage.com/500x500/0048ff/0011ff',
                    }}
                    style={{height: 150, width: null, flex: 1}}
                  />
                </CardItem>
              </Card>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: 'https://dummyimage.com/500x500/0048ff/0011ff',
                    }}
                    style={{height: 150, width: null, flex: 1}}
                  />
                </CardItem>
              </Card>
            </Col>
            <Col style={{width: '50%', padding: 5}}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: 'https://dummyimage.com/500x500/0048ff/0011ff',
                    }}
                    style={{height: 150, width: null, flex: 1}}
                  />
                </CardItem>
              </Card>
            </Col>
          </Grid>
        </Content>
        <FooterBar menu={this.props} home={true} />
      </Container>
    );
  }
}

export default Home;
