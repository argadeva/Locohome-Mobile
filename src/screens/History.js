import React, {Component} from 'react';
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
import {Col, Row, Grid} from 'react-native-easy-grid';
import FooterBar from '../components/FooterBar';

class History extends Component {
  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#3c8af9">
          <Body>
            <Title style={{alignSelf: 'center'}}>Pesanan Saya</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Left>
                <Thumbnail
                  square
                  large
                  source={{uri: 'https://dummyimage.com/500x500/0048ff/0011ff'}}
                />
                <List style={{marginLeft: 10}}>
                  <Text>Penginapan Murah Dhika Home</Text>
                  <Text>Bandung</Text>
                </List>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </CardItem>
            <CardItem bordered>
              <Text>ID Pesanan : 111111</Text>
            </CardItem>
            <CardItem bordered>
              <Col style={{flex: 1}}>
                <Text style={{alignSelf: 'center'}}>Check-in</Text>
                <Text style={{alignSelf: 'center'}}>10 Jan 2020</Text>
              </Col>
              <Col style={{flex: 1}}>
                <Icon
                  style={{alignSelf: 'center', marginLeft: 25}}
                  name="ios-arrow-forward"
                />
              </Col>
              <Col style={{flex: 1}}>
                <Text style={{alignSelf: 'center'}}>Check-out</Text>
                <Text style={{alignSelf: 'center'}}>12 Jan 2020</Text>
              </Col>
            </CardItem>
            <CardItem footer bordered>
              <Icon name="ios-card" />
              <Text>Belum Terbayar</Text>
            </CardItem>
          </Card>
        </Content>
        <FooterBar menu={this.props} history={true} />
      </Container>
    );
  }
}

export default History;
