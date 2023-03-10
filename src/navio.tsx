import {Navio} from 'rn-navio';

import {Map} from '@app/screens/map';
import {Main} from '@app/screens/main';
import {Playground} from '@app/screens/playground';
import {Settings} from '@app/screens/settings';
import {Example} from '@app/screens/_screen-sample';
import {Spot} from '@app/screens/spot';

import {useAppearance} from '@app/utils/hooks';
import {
  screenDefaultOptions,
  tabScreenDefaultOptions,
  getTabBarIcon,
  drawerScreenDefaultOptions,
} from '@app/utils/designSystem';
import {services} from '@app/services';

// NAVIO
export const navio = Navio.build({
  screens: {
    Map,
    Main,
    Settings,
    Example,
    Spot,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
    ProductPage: {
      component: Example,
      options: {
        headerShown: false,
      },
    },
  },
  stacks: {
    MapStack: ['Map'],
    MainStack: ['Main', 'Example'],
    ExampleStack: {
      screens: ['Example'],
      navigatorProps: {
        screenListeners: {
          focus: () => {},
        },
      },
    },
    SpotStack: {
      screens: ['Spot'],
      navigatorProps: {
        screenListeners: {
          focus: () => {},
        },
      },
    },
    ProductPageStack: {
      screens: ['ProductPage'],
      containerOptions: {
        headerShown: true,
        title: 'Product page',
      },
    },
  },
  tabs: {
    AppTabs: {
      content: {
        MapTab: {
          stack: 'MapStack',
          options: () => ({
            title: 'Map',
            tabBarIcon: getTabBarIcon('MainTab'),
          }),
        },
        MainTab: {
          stack: 'MainStack',
          options: () => ({
            title: 'Main',
            tabBarIcon: getTabBarIcon('MainTab'),
          }),
        },
        PlaygroundTab: {
          stack: ['Playground'],
          options: () => ({
            title: 'Playground',
            tabBarIcon: getTabBarIcon('PlaygroundTab'),
          }),
        },
        SettingsTab: {
          stack: ['Settings'],
          options: () => ({
            title: services.t.do('settings.title'),
            tabBarIcon: getTabBarIcon('SettingsTab'),
            tabBarBadge: 23,
          }),
        },
      },
    },
  },
  modals: {
    ExampleModal: 'ExampleStack',
    SpotModal: 'SpotStack',
  },
  drawers: {
    MainDrawer: {
      content: {
        Map: {
          stack: 'MapStack',
          options: {
            drawerType: 'front',
          },
        },
        Main: {
          stack: 'MainStack',
        },
        Example: 'ExampleStack',
        Playground: ['Playground'],
      },
    },
  },
  root: 'AppTabs',
  hooks: [useAppearance],
  defaultOptions: {
    stacks: {
      screen: screenDefaultOptions,
    },
    tabs: {
      screen: tabScreenDefaultOptions,
    },
    drawers: {
      screen: drawerScreenDefaultOptions,
    },
  },
});

export const getNavio = () => navio;
export const App = navio.App;
