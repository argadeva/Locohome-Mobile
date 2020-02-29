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

export class Home extends Component {
  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8af9" style={{display: 'none'}} />
        <Content style={{backgroundColor: '#f1f1f3'}} padder>
          <H2 style={{padding: 10, marginTop: 10}}>Cari Ruang Menginap Anda</H2>
          <Item rounded style={{backgroundColor: '#fff', marginVertical: 10}}>
            <Icon name="ios-search" />
            <Input
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
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={true}
                  disabled={false}
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
                  placeHolderText="Select date"
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#333'}}
                  onDateChange={true}
                  disabled={false}
                />
              </Item>
            </Col>
          </Grid>
          <Button
            rounded
            style={{
              justifyContent: 'center',
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
        <FooterBar />
      </Container>
    );
  }
}

export default Home;
