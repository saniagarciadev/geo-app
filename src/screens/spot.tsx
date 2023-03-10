import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {NavioSection} from '@app/components/sections/NavioSection';
import {useStores} from '@app/stores';

export const Spot: NavioScreen<Props> = observer(() => {
  useAppearance(); // for Dark Mode
  const navigation = useNavigation();
  const {t, navio} = useServices();
  const {spot, ui} = useStores();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Text style={styles.baseText}>{spot.value.title}</Text>
      </ScrollView>
    </View>
  );
});

// Spot.options = props => ({
//   headerBackTitleStyle: false,
//   title: `${services.t.do('marker.title')} ${(props?.route?.params as Props)?.marker ?? ''}`,
// });

const styles = StyleSheet.create({
  baseText: {
    color: 'white',
  },
});
