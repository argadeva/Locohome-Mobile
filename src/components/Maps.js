import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

class Maps extends Component {
  state = {
    lat: -6.391982,
    long: 106.826729,
  };

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
    );
  }
}

export default Maps;
