import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {
  Container,
  Icon,
  Button,
  Text,
  Content,
  H3,
  Footer,
  FooterTab,
} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {Col, Row, Grid} from 'react-native-easy-grid';

export class DetailRoom extends Component {
  state = {
    homeName: '',
    description: '',
    bedType: '',
    fan: null,
    wardrobe: null,
    toilet: '',
    priceNight: null,
    personInroom: null,
    idGender: null,
    phoneNumber: '',
    provinsi: '',
    kotaKabupaten: '',
    kecamatan: '',
    images: [
      'https://source.unsplash.com/1024x768/?nature',
      'https://source.unsplash.com/1024x768/?water',
      'https://source.unsplash.com/1024x768/?girl',
      'https://source.unsplash.com/1024x768/?tree',
    ],
  };

  componentDidMount() {
    this.setState({
      homeName: this.props.route.params.data.homeName,
      kecamatan: this.props.route.params.data.kecamatan,
      kotaKabupaten: this.props.route.params.data.kotaKabupaten,
      provinsi: this.props.route.params.data.provinsi,
      description: this.props.route.params.data.description,
    });
  }

  render() {
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
              {this.state.kecamatan +
                ', ' +
                this.state.kotaKabupaten +
                ', ' +
                this.state.provinsi}
            </Text>
            <Button
              iconLeft
              small
              bordered
              primary
              onPress={() => this.props.navigation.navigate('Maps')}
              style={{width: 150, marginTop: 10}}>
              <Icon name="pin" />
              <Text>Lihat di peta</Text>
            </Button>
            <View
              style={{
                marginTop: 15,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: '#333',
                paddingVertical: 15,
              }}>
              <Grid>
                <Col>
                  <Icon
                    name="ios-star"
                    style={{color: '#333', alignSelf: 'center'}}
                  />
                  <Text style={{alignSelf: 'center', fontSize: 12}}>
                    Wifi gratis
                  </Text>
                </Col>
                <Col>
                  <Icon
                    name="ios-star"
                    style={{color: '#333', alignSelf: 'center'}}
                  />
                  <Text style={{alignSelf: 'center', fontSize: 12}}>
                    Layanan kebersihan
                  </Text>
                </Col>
                <Col>
                  <Icon
                    name="ios-star"
                    style={{color: '#333', alignSelf: 'center'}}
                  />
                  <Text style={{alignSelf: 'center', fontSize: 12}}>
                    Lemari Pakaian
                  </Text>
                </Col>
              </Grid>
            </View>
            <Text style={{marginTop: 15}}>{this.state.description}</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Text>Pesan Kamar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default DetailRoom;
