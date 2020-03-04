import React from 'react';
import {View, Image} from 'react-native';
import {Content, Text, H3, Button, Icon} from 'native-base';
import logo from '../image/logo.png';

const About = props => {
  return (
    <Content padder>
      <View style={{padding: 20}}>
        <Image
          source={logo}
          style={{width: null, height: 100, resizeMode: 'contain'}}
        />
        <H3 style={{alignSelf: 'center', fontWeight: 'bold'}}>LOCOHOME</H3>
        <H3 style={{alignSelf: 'center', color: 'grey', fontSize: 15}}>
          Kode Versi v0.0.1
        </H3>
      </View>
      <Text style={{marginTop: 18, alignSelf: 'center', fontSize: 20}}>
        Tentang Kami LocoHome
      </Text>
      <Text style={{marginTop: 5, alignSelf: 'center', fontSize: 20}}>
        ( Low Cost Home )
      </Text>
      <Text
        style={{
          marginTop: 25,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 16,
          marginLeft: 10,
        }}>
        LocoHome merupakan penyedia layanan penginapan untuk perjalanan yang
        lebih murah dan mudah. Dapatkan penginapan pada rumah warga setempat
        untuk merasakan moment hangat dan berbagai tradisi bersama masyarakat
        sekitar.
      </Text>
      <Text
        style={{
          marginTop: 100,
          alignSelf: 'center',
          fontSize: 19,
          marginLeft: 0,
          fontWeight: 'bold',
        }}>
        Get a Moment in Your Holiday
      </Text>
      <Button
        onPress={() => props.navigation.goBack()}
        transparent
        style={{position: 'absolute', top: 30, left: 20}}>
        <Icon style={{color: '#333'}} name="arrow-back" />
      </Button>
    </Content>
  );
};

export default About;
