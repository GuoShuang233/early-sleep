import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import ReportScreen from './src/screens/ReportScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🌙',
    Report: '📊',
    Achievements: '🏆',
    Settings: '⚙️',
  };
  return (
    <React.Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#08090a"
      />
      <React.Fragment>
        {/* Using Text for icons since we can't use emoji in RN without Text */}
        <>{/* Icons rendered in tabBarIcon */}</>
      </React.Fragment>
    </React.Fragment>
  );
}

function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.surfaceBorder,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            Home: '🌙',
            Report: '📊',
            Achievements: '🏆',
            Settings: '⚙️',
          };
          const icon = icons[route.name] || '🌙';
          return (
            <React.Fragment>
              <>{/* Icon: {icon} */}</React.Fragment>
            </React.Fragment>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '首页' }} />
      <Tab.Screen name="Report" component={ReportScreen} options={{ tabBarLabel: '报告' }} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} options={{ tabBarLabel: '成就' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: '设置' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
