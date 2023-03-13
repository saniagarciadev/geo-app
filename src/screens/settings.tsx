import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, SegmentedControl, Colors, Button, TextArea} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {Section} from '@app/components/section';
import {Row} from '@app/components/row';
import {services} from '@app/services';
import {clusterApiUrl, Connection, Keypair} from '@solana/web3.js';
import {NavioSection} from '@app/components/sections/NavioSection';

export const Settings: NavioScreen = observer(({}) => {
  const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());
  const randomKeypair = () => {
    setKeypair(() => Keypair.generate());
  };

  const [version, setVersion] = useState<any>('');
  useEffect(() => {
    const conn = new Connection(clusterApiUrl('devnet'));
    conn.getVersion().then(r => {
      setVersion(r);
    });
  }, []);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Section title={'UI'}>
          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Appearance
                </Text>
              </View>
              {version ? <Text title="Version">{JSON.stringify(version, null, 2)}</Text> : null}
              {keypair ? (
                <Text>{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Text>
              ) : null}
              <Button title="New Keypair" onPress={randomKeypair} />
            </Row>
          </View>

          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Language
                </Text>
              </View>

              {/* <SegmentedControl
                initialIndex={languageInitialIndex}
                segments={languageSegments}
                backgroundColor={Colors.bgColor}
                activeColor={Colors.primary}
                inactiveColor={Colors.textColor}
                onChangeIndex={handleLanguageIndexChange}
              /> */}
            </Row>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
});
Settings.options = () => ({
  title: services.t.do('settings.title'),
});
