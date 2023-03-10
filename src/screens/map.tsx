import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View, SegmentedControl, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';
import {services} from '@app/services';

import MapView from 'react-native-maps';

const PlaceholderSpots = {};

export const Map: NavioScreen = observer(({}) => {
  return (
    <View flex bg-bgColor>
      <MapView style={styles.map} />
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
    height: '100%',
  },
});
