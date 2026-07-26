import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager, Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang, tr, SUPPORTED_LANGS } from './translations';

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  langName: string;
  supportedLangs: typeof SUPPORTED_LANGS;
}

const I18nContext = createContext<I18nContextType>(null!);
const STORAGE_KEY = '@earlysleep_lang';

function getSystemLang(): Lang {
  try {
    let locale = 'en';
    if (Platform.OS === 'android') {
      const im = NativeModules.I18nManager;
      if (im?.getConstants) locale = im.getConstants().localeIdentifier || locale;
      else if (im?.localeIdentifier) locale = im.localeIdentifier;
      // Fallback to SettingsManager
      if (!locale || locale === 'en') {
        locale = NativeModules.SettingsManager?.settings?.DeviceLanguage || 'en';
      }
    } else {
      const s = NativeModules.SettingsManager?.settings;
      locale = s?.AppleLocale || s?.AppleLanguages?.[0] || 'en';
    }
    locale = String(locale);
    const full = locale.slice(0, 5).toLowerCase();
    if (full.startsWith('zh-hk') || full.startsWith('zh-tw') || full.startsWith('zh-mo')) return 'zh-Hant';
    if (locale.slice(0, 2) === 'zh') return 'zh';
    const code = locale.slice(0, 2);
    return SUPPORTED_LANGS.find((l) => l.code === code)?.code || 'en';
  } catch {
    return 'en';
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        setLangState((saved as Lang) || getSystemLang());
      } catch {
        setLangState(getSystemLang());
      }
      setLoaded(true);
    })();
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  };

  const tFn = (key: string) => tr(key, lang);
  const langName = SUPPORTED_LANGS.find((l) => l.code === lang)?.name || 'English';

  if (!loaded) return null;

  return (
    <I18nContext.Provider value={{ lang, setLang, t: tFn, langName, supportedLangs: SUPPORTED_LANGS }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
