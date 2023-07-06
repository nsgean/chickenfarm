import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeContainer from '../containers/Home';
import SettingsContainer from '../containers/Settings';

const Tab = createBottomTabNavigator();

function Boot() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e30224',
          headerStyle: { backgroundColor: '#e30224', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
          tabBarStyle: { paddingBottom: 2, backgroundColor: "#FFFFFF" },
          headerTitleStyle: { color: 'white' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeContainer}
          options={{
            title: 'Início',
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsContainer}
          options={{
            title: 'Ajustes',
            tabBarLabel: 'Ajustes',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gear" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

export default Boot;