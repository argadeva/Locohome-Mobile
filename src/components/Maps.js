import React, {Component} from 'react';
import {Icon, Button} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

class Maps extends Component {
  state = {
    lat: -6.391982,
    long: 106.826729,
  };

  render() {
    return (
      <>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          showsUserLocation
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.lat,
              longitude: this.state.long,
            }}
            title={'Arkademy Depok'}
            description={'Tempat Belajar Coding'}
          />
        </MapView>
        <Button
          onPress={() => this.props.navigation.goBack()}
          transparent
          style={{position: 'absolute', top: 30, left: 20}}>
          <Icon style={{color: '#333'}} name="arrow-back" />
        </Button>
      </>
    );
  }
}

export default Maps;
