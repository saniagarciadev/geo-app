import React, {useCallback, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {useStores} from '@app/stores';
import {mapStyle} from '../utils/mapStyle';

export const Spot: NavioScreen<Props> = observer(() => {
  useAppearance(); // for Dark Mode
  const navigation = useNavigation();
  const {t, navio} = useServices();
  // const {spot, ui} = useStores();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        {/* <Text style={styles.title}>{spot.value.title}</Text> */}
        <View style={styles.container}>
          {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            camera={{
              center: {
                latitude: spot.value.coordinate.latitude,
                longitude: spot.value.coordinate.longitude,
              },
              zoom: 15,
            }}
          >
            {spot.value && (
              <Marker
                // image={flagPinkImg}
                pinColor={'aqua'}
                coordinate={{
                  latitude: spot.value.coordinate.latitude,
                  longitude: spot.value.coordinate.longitude,
                }}
              />
            )}
          </MapView> */}
        </View>
        {/* <Text style={styles.baseText}>{spot.value.description}</Text>
        <Text style={styles.baseText}>{'Source: ' + spot.value.source}</Text>
        {spot.value.source === 'temp' && (
          <Button
            title="Save spot"
            onPress={() => {
              console.log('TEST hi');
            }}
            color="aqua"
          />
        )} */}
      </ScrollView>
    </View>
  );
});

// Spot.options = props => ({
//   headerBackTitleStyle: false,
//   title: `${services.t.do('marker.title')} ${(props?.route?.params as Props)?.marker ?? ''}`,
// });

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: 30,
    padding: 20,
  },
  map: {
    width: '100%',
    height: '120%',
  },
  baseText: {
    width: '100%',
    padding: 25,
    marginBottom: 30,
    color: 'white',
    backgroundColor: 'black',
  },
  saveButton: {
    color: 'white',
  },
});
