import React from 'react';
import {View, Image} from 'react-native';
import {Content, Text, H3, Button, Icon} from 'native-base';
import logo from '../image/logo.png';

const Help = props => {
  return (
    <Content padder>
      <View style={{padding: 20}}>
        <Image
          source={logo}
          style={{width: null, height: 100, resizeMode: 'contain'}}
        />
        <H3 style={{alignSelf: 'center', fontWeight: 'bold'}}>LocoHome</H3>
        <H3 style={{alignSelf: 'center', color: 'grey', fontSize: 15}}>
          Kode versi v0.0.1
        </H3>
      </View>
      <Text style={{marginTop: 0, alignSelf: 'center', fontSize: 30}}>
        Dukungan LocoHome
      </Text>
      <Text
        style={{
          marginTop: 15,
          alignSelf: 'center',
          marginLeft: 20,
          fontSize: 16,
          textAlign: 'center',
        }}>
        Untuk semua pertanyaan yang berhubungan dengan LocoHome App, hubungi
        kami:
      </Text>
      <Text style={{marginTop: 20, alignSelf: 'center', fontSize: 16}}>
        Email: Locohome14@gmail.com
      </Text>
      <Text style={{marginTop: 10, alignSelf: 'center', fontSize: 16}}>
        Call Center: +6289*********
      </Text>
      <Text style={{marginTop: 25, alignSelf: 'center', fontSize: 30}}>
        Alamat Perusahaan
      </Text>
      <Text
        style={{
          marginTop: 15,
          marginLeft: 20,
          fontSize: 16,
          textAlign: 'center',
        }}>
        LocoHome Inc.
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginLeft: 20,
          fontSize: 16,
          textAlign: 'center',
        }}>
        Pesona Depok Blok B no 2
      </Text>
      <Text
        style={{
          marginTop: -3,
          marginLeft: 20,
          fontSize: 16,
          textAlign: 'center',
        }}>
        Pancoran Mas Depok, Jawa Barat
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginLeft: 20,
          fontSize: 16,
          textAlign: 'center',
        }}>
        Indonesia
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

export default Help;
