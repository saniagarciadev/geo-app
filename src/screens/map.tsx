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
import {toJS} from 'mobx';

type Marker = {
  // id: number;
  title: string;
  latitude: number;
  longitude: number;
  description: string;
  source: string;
};
export const Map: NavioScreen = observer(({}) => {
  const {spots, ui} = useStores();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const {t, navio} = useServices();

  // Methods
  // const handleSelectMarker = (marker: {
  //   coordinate: any;
  //   source: string;
  //   title: string;
  //   description: string;
  // }) => spots.set('value', marker);

  const modalsShow = () => navio.modals.show('SpotModal');

  useEffect(() => {
    // spots.saved.map(s => {
    //   console.log('TEST spot', s);
    // });
    // spots.set('saved', [
    //   {
    //     title: 'My spot',
    //     latitude: 48.868505,
    //     longitude: 2.352202,
    //     description: 'Description',
    //     source: 'local-storage',
    //   },
    // ]);
    console.log('TEST spots.saved', toJS(spots.saved));
    const savedSpots = toJS(spots.saved);
    console.log('TEST savedSpots[0]', savedSpots[0]);
    setMarkers(savedSpots);
  }, [spots]);

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
          // handleSelectMarker({
          //   ...exampleSpot,
          //   coordinate: e.nativeEvent.coordinate,
          //   source: 'temp',
          // });
          modalsShow();
        }}
      >
        {markers.map((spot: Marker, i: number) => (
          <Marker
            // image={flagPinkImg}
            pinColor={'aqua'}
            key={i}
            coordinate={{latitude: spot.latitude, longitude: spot.longitude}}
            onPress={() => {
              // handleSelectMarker(spot);
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
