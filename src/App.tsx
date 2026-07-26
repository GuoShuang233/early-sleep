import React from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ReportScreen from './src/screens/ReportScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  Home: '🌙', Calendar: '📅', Report: '📊',
  Achievements: '🏆', Settings: '⚙️',
};

function AppNavigator() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.surfaceBorder,
            borderTopWidth: 1,
            height: 64 + insets.bottom,
            paddingBottom: 8 + insets.bottom / 2,
            paddingTop: 8,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.6 }}>
              {TAB_ICONS[route.name] || '🌙'}
            </Text>
          ),
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '首页' }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarLabel: '日历' }} />
        <Tab.Screen name="Report" component={ReportScreen} options={{ tabBarLabel: '报告' }} />
        <Tab.Screen name="Achievements" component={AchievementsScreen} options={{ tabBarLabel: '成就' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: '设置' }} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
