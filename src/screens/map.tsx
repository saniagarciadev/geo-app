import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View, SegmentedControl, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';
import {services} from '@app/services';
import {useServices} from '../services';
import {mapStyle} from '../utils/mapStyle';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useStores} from '@app/stores';

const exampleSpot = {
  title: 'My spot',
  coordinate: {
    latitude: 48.868505,
    longitude: 2.352202,
  },
  description: 'Description',
  source: 'local-storage',
};
export const Map: NavioScreen = observer(({}) => {
  const [spots, setSpots] = useState([exampleSpot]);
  const {t, navio} = useServices();
  const {spot, ui} = useStores();

  // Methods
  const handleSelectMarker = (marker: {
    coordinate: any;
    source: string;
    title: string;
    description: string;
  }) => spot.set('value', marker);

  const modalsShow = () => navio.modals.show('SpotModal');

  return (
    <View flex bg-bgColor>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        showsMyLocationButton
        onPress={e => {
          // const newSpotsArray = [...spots, {...exampleSpot, coordinate: e.nativeEvent.coordinate}];
          // setSpots(newSpotsArray);
          if (e.nativeEvent.action === 'marker-press') return;
          handleSelectMarker({
            ...exampleSpot,
            coordinate: e.nativeEvent.coordinate,
            source: 'temp',
          });
          modalsShow();
        }}
      >
        {spots.map((spot: typeof exampleSpot, i: number) => (
          <Marker
            // image={flagPinkImg}
            pinColor={'aqua'}
            key={i}
            coordinate={spot.coordinate}
            onPress={() => {
              handleSelectMarker(spot);
              modalsShow();
            }}
          />
        ))}
      </MapView>
    </View>
  );
});
Map.options = () => ({
  title: services.t.do('map.title'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '110%',
  },
});
