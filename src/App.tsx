import React from 'react';
import { StatusBar, Text } from 'react-native';
import { T } from './src/theme/T';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { I18nProvider, useI18n } from './src/i18n/I18nContext';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ReportScreen from './src/screens/ReportScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const NAV_TABS = ['home','calendar','report','goal','settings'] as const;

function AppNavigator() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const TAB_LABELS: Record<string, string> = {
    home: t('nav.home'), calendar: t('nav.calendar'), report: t('nav.report'),
    goal: t('nav.goal'), settings: t('nav.settings'),
  };

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.colors.background, borderTopColor: theme.colors.surfaceBorder, borderTopWidth: 1, height: 64 + insets.bottom, paddingBottom: 8 + insets.bottom / 2, paddingTop: 8 },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ focused }) => {
            const icons: Record<string, string> = { home: '🌙', calendar: '📅', report: '📊', goal: '🏆', settings: '⚙️' };
            return <T style={{ fontSize: 22, opacity: focused ? 1 : 0.6 }}>{icons[route.name] || '🌙'}</T>;
          },
          tabBarLabel: TAB_LABELS[route.name] || route.name,
        })}>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="calendar" component={CalendarScreen} />
        <Tab.Screen name="report" component={ReportScreen} />
        <Tab.Screen name="goal" component={AchievementsScreen} />
        <Tab.Screen name="settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
