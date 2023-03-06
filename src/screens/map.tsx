import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View, SegmentedControl, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {Section} from '@app/components/section';
import {Row} from '@app/components/row';
import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '@app/utils/types/enums';
import {useAppearance} from '@app/utils/hooks';
import {useStores} from '@app/stores';
import {HeaderButton} from '@app/components/button';
import {services} from '@app/services';

import MapView from 'react-native-maps';

export const Map: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {ui} = useStores();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);

  // Computed
  const unsavedChanges = ui.appearance !== appearance || ui.language !== language;

  const appearanceInitialIndex = appearances.findIndex(it => it === appearance);
  const appearanceSegments = appearancesUI.map(it => ({label: it}));

  const languageInitialIndex = languages.findIndex(it => it === language);
  const languageSegments = languagesUI.map(it => ({label: it}));

  // Start ARCHIVED
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () =>
  //       unsavedChanges ? <HeaderButton onPress={handleSave} label="Save" /> : null,
  //   });
  // }, [unsavedChanges, appearance, language]);

  // Methods
  const handleAppearanceIndexChange = (index: number) =>
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
  const handleLanguageIndexChange = (index: number) =>
    setLanguage(languageUIToInternal[languagesUI[index]]);

  const handleSave = () => {
    ui.setMany({
      appearance,
      language,
    });
  };

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
