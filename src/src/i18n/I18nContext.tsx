import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  // @ts-ignore - RN has this
  const locale = (global as any).nativeExtensions?.locale || 'en';
  const code = locale.slice(0, 2);
  return SUPPORTED_LANGS.find((l) => l.code === code)?.code || 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setLangState(saved as Lang);
        } else {
          setLangState(getSystemLang());
        }
      } catch { setLangState(getSystemLang()); }
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
