// 多语言翻译系统
export type Lang = 'zh' | 'zh-Hant' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru';

type TranslationMap = Record<string, Record<Lang, string>>;

const t: TranslationMap = {
  // Nav
  'nav.home':     { 'zh-Hant':'首页', zh:'首页', en:'Home', ja:'ホーム', ko:'홈', fr:'Accueil', de:'Start', es:'Inicio', ru:'Главная' },
  'nav.calendar': { 'zh-Hant':'日历', zh:'日历', en:'Calendar', ja:'カレンダー', ko:'달력', fr:'Calendrier', de:'Kalender', es:'Calendario', ru:'Календарь' },
  'nav.report':   { 'zh-Hant':'报告', zh:'报告', en:'Report', ja:'レポート', ko:'보고서', fr:'Rapport', de:'Bericht', es:'Informe', ru:'Отчет' },
  'nav.goal':     { 'zh-Hant':'成就', zh:'成就', en:'Goals', ja:'実績', ko:'업적', fr:'Objectifs', de:'Erfolge', es:'Logros', ru:'Достижения' },
  'nav.settings': { 'zh-Hant':'设置', zh:'设置', en:'Settings', ja:'設定', ko:'설정', fr:'Paramètres', de:'Einstellungen', es:'Ajustes', ru:'Настройки' },

  // Home
  'home.greeting.night':  { 'zh-Hant':'🌙 晚上好', zh:'🌙 晚上好', en:'🌙 Good Evening', ja:'🌙 こんばんは', ko:'🌙 안녕하세요', fr:'🌙 Bonsoir', de:'🌙 Guten Abend', es:'🌙 Buenas noches', ru:'🌙 Добрый вечер' },
  'home.greeting.morning':{ 'zh-Hant':'☀️ 早上好', zh:'☀️ 早上好', en:'☀️ Good Morning', ja:'☀️ おはようございます', ko:'☀️ 좋은 아침', fr:'☀️ Bonjour', de:'☀️ Guten Morgen', es:'☀️ Buenos días', ru:'☀️ Доброе утро' },
  'home.target':          { 'zh-Hant':'目标', zh:'目标', en:'Target', ja:'目標', ko:'목표', fr:'Objectif', de:'Ziel', es:'Objetivo', ru:'Цель' },
  'home.streak':          { 'zh-Hant':'连续', zh:'连续', en:'Streak', ja:'連続', ko:'연속', fr:'Série', de:'Serie', es:'Racha', ru:'Серия' },
  'home.curfew.rate': { 'zh-Hant':'完成度', zh:'完成度', en:'Completion', ja:'完了度', ko:'완성도', fr:'Complétion', de:'Abschluss', es:'Finalización', ru:'Завершено' },
  'home.sleep':           { 'zh-Hant':'睡眠', zh:'睡眠', en:'Sleep', ja:'睡眠', ko:'수면', fr:'Sommeil', de:'Schlaf', es:'Sueño', ru:'Сон' },
  'home.bedtime':         { 'zh-Hant':'🌙 准备睡觉', zh:'🌙 准备睡觉', en:'🌙 Go to Bed', ja:'🌙 寝る準備', ko:'🌙 잘 준비', fr:'🌙 Au lit', de:'🌙 Schlafen', es:'🌙 A dormir', ru:'🌙 Ко сну' },
  'home.bedtime.sub':     { 'zh-Hant':'放下手机', zh:'放下手机', en:'Put down your phone', ja:'スマホを置いて', ko:'핸드폰을 내려놓으세요', fr:'Lâchez le téléphone', de:'Handy weglegen', es:'Suelta el móvil', ru:'Отложите телефон' },
  'home.wakeup':          { 'zh-Hant':'☀️ 我起床了', zh:'☀️ 我起床了', en:'☀️ I&apos;m Up', ja:'☀️ 起きました', ko:'☀️ 일어났어요', fr:'☀️ Je me suis levé', de:'☀️ Aufgestanden', es:'☀️ Me levanté', ru:'☀️ Я проснулся' },
  'home.detail':          { 'zh-Hant':'详情 →', zh:'详情 →', en:'Details →', ja:'詳細 →', ko:'상세 →', fr:'Détails →', de:'Details →', es:'Detalles →', ru:'Подробнее →' },
  'home.completed':       { 'zh-Hant':'✅ 今日打卡已完成', zh:'✅ 今日打卡已完成', en:'✅ Today&apos;s Log Complete', ja:'✅ 今日の記録完了', ko:'✅ 오늘 기록 완료', fr:'✅ Enregistré aujourd&apos;hui', de:'✅ Heute erfasst', es:'✅ Registro completo', ru:'✅ Сегодня записано' },
  'home.recent':          { 'zh-Hant':'最近记录', zh:'最近记录', en:'Recent Logs', ja:'最近の記録', ko:'최근 기록', fr:'Historique', de:'Verlauf', es:'Historial', ru:'История' },
  'home.note.placeholder':{ 'zh-Hant':'备注（选填）加班、应酬...', zh:'备注（选填）加班、应酬...', en:'Note (optional) Overtime, dinner...', ja:'メモ（任意）残業、接待...', ko:'메모 (선택) 야근, 회식...', fr:'Note (optionnelle) Heures sup...', de:'Notiz (optional) Überstunden...', es:'Nota (opcional) Horas extra...', ru:'Заметка (необ.) Переработка...' },
  'home.confirm.bedtime': { 'zh-Hant':'🌙 确认睡觉', zh:'🌙 确认睡觉', en:'🌙 Confirm Sleep', ja:'🌙 就寝確認', ko:'🌙 취침 확인', fr:'🌙 Confirmer', de:'🌙 Bestätigen', es:'🌙 Confirmar', ru:'🌙 Подтвердить' },
  'home.cancel':          { 'zh-Hant':'取消', zh:'取消', en:'Cancel', ja:'キャンセル', ko:'취소', fr:'Annuler', de:'Abbrechen', es:'Cancelar', ru:'Отмена' },
  'home.modal.desc':      { 'zh-Hant':'手机将进入宵禁检测模式\n检测到使用会记录但不打扰你', zh:'手机将进入宵禁检测模式\n检测到使用会记录但不打扰你', en:'Phone enters curfew mode\nUsage is logged but won&apos;t disturb you', ja:'スマホは門限モードに\n使用を記録しますが邪魔しません', ko:'휴대폰이 통금 모드로 전환됩니다\n사용이 기록되지만 방해하지 않습니다', fr:'Mode couvre-feu activé\nL&apos;utilisation est enregistrée sans déranger', de:'Ausgangssperren-Modus aktiv\nNutzung wird protokolliert, stört nicht', es:'Modo toque de queda\nEl uso se registra sin molestar', ru:'Режим комендантского часа\nИспользование записывается без уведомлений' },

  // Report
  'report.greeting': { 'zh-Hant':'早上好', zh:'早上好', en:'Good Morning', ja:'おはようございます', ko:'좋은 아침', fr:'Bonjour', de:'Guten Morgen', es:'Buenos días', ru:'Доброе утро' },
  'report.week':     { 'zh-Hant':'📅 本周', zh:'📅 本周', en:'📅 This Week', ja:'📅 今週', ko:'📅 이번 주', fr:'📅 Cette semaine', de:'📅 Diese Woche', es:'📅 Esta semana', ru:'📅 Эта неделя' },
  'report.stats':    { 'zh-Hant':'🏆 统计', zh:'🏆 统计', en:'🏆 Stats', ja:'🏆 統計', ko:'🏆 통계', fr:'🏆 Statistiques', de:'🏆 Statistiken', es:'🏆 Estadísticas', ru:'🏆 Статистика' },
  'report.bedtime':  { 'zh-Hant':'就寝', zh:'就寝', en:'Bedtime', ja:'就寝', ko:'취침', fr:'Coucher', de:'Schlafenszeit', es:'Acostarse', ru:'Ко сну' },
  'report.wakeup':   { 'zh-Hant':'起床', zh:'起床', en:'Wake up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufstehen', es:'Despertar', ru:'Просыпание' },
  'report.compliant':{ 'zh-Hant':'✅ 达标', zh:'✅ 达标', en:'✅ Compliant', ja:'✅ 達成', ko:'✅ 달성', fr:'✅ Conforme', de:'✅ Erfolgreich', es:'✅ Cumplido', ru:'✅ Выполнено' },
  'report.note':     { 'zh-Hant':'📝 备注', zh:'📝 备注', en:'📝 Note', ja:'📝 メモ', ko:'📝 메모', fr:'📝 Note', de:'📝 Notiz', es:'📝 Nota', ru:'📝 Заметка' },
  'report.streak':   { 'zh-Hant':'🔥 连续天数', zh:'🔥 连续天数', en:'🔥 Streak', ja:'🔥 連続日数', ko:'🔥 연속 일수', fr:'🔥 Série', de:'🔥 Serie', es:'🔥 Racha', ru:'🔥 Серия' },
  'report.longest':  { 'zh-Hant':'📈 最长连续', zh:'📈 最长连续', en:'📈 Longest', ja:'📈 最長連続', ko:'📈 최장 연속', fr:'📈 Record', de:'📈 Rekord', es:'📈 Récord', ru:'📈 Рекорд' },
  'report.curfew': { 'zh-Hant':'打卡', zh:'打卡', en:'Check-in', ja:'チェックイン', ko:'체크인', fr:'Pointage', de:'Check-in', es:'Registro', ru:'Отметка' },
  'report.total':    { 'zh-Hant':'📋 总记录天数', zh:'📋 总记录天数', en:'📋 Total Days', ja:'📋 総記録日数', ko:'📋 총 기록 일수', fr:'📋 Total jours', de:'📋 Gesamttage', es:'📋 Días totales', ru:'📋 Всего дней' },

  // Calendar
  'calendar.title': { 'zh-Hant':'日历', zh:'日历', en:'Calendar', ja:'カレンダー', ko:'달력', fr:'Calendrier', de:'Kalender', es:'Calendario', ru:'Календарь' },
  'calendar.empty': { 'zh-Hant':'当日无记录', zh:'当日无记录', en:'No records', ja:'記録なし', ko:'기록 없음', fr:'Aucune donnée', de:'Keine Daten', es:'Sin datos', ru:'Нет записей' },
  'calendar.ad':    { 'zh-Hant':'泰国乳胶枕·限时7折', zh:'泰国乳胶枕·限时7折', en:'Thai Latex Pillow · 30% OFF', ja:'タイ製ラテックス枕·30%OFF', ko:'태국 라텍스 베개·30% 할인', fr:'Oreiller latex Thaï · -30%', de:'Thai-Latexkissen · 30% Rabatt', es:'Cojín látex Tailandia · 30% OFF', ru:'Подушка из латекса · скидка 30%' },

  // Achievements
  'goal.title':     { 'zh-Hant':'🏆 成就', zh:'🏆 成就', en:'🏆 Achievements', ja:'🏆 実績', ko:'🏆 업적', fr:'🏆 Objectifs', de:'🏆 Erfolge', es:'🏆 Logros', ru:'🏆 Достижения' },
  'goal.badges':    { 'zh-Hant':'徽章', zh:'徽章', en:'Badges', ja:'バッジ', ko:'뱃지', fr:'Badges', de:'Abzeichen', es:'Insignias', ru:'Значки' },
  'goal.ad':        { 'zh-Hant':'夜间助眠音乐·免费试听', zh:'夜间助眠音乐·免费试听', en:'Sleep Music · Free Trial', ja:'睡眠音楽·無料試聴', ko:'수면 음악·무료 체험', fr:'Musique sommeil · Gratuit', de:'Schlafmusik · Kostenlos', es:'Música para dormir · Prueba', ru:'Музыка для сна · Бесплатно' },

  // Settings
  'settings.title':  { 'zh-Hant':'⚙️ 设置', zh:'⚙️ 设置', en:'⚙️ Settings', ja:'⚙️ 設定', ko:'⚙️ 설정', fr:'⚙️ Paramètres', de:'⚙️ Einstellungen', es:'⚙️ Ajustes', ru:'⚙️ Настройки' },
  'settings.theme':  { 'zh-Hant':'🎨 主题', zh:'🎨 主题', en:'🎨 Theme', ja:'🎨 テーマ', ko:'🎨 테마', fr:'🎨 Thème', de:'🎨 Design', es:'🎨 Tema', ru:'🎨 Тема' },
  'settings.language':{'zh-Hant':'🌐 语言', zh:'🌐 语言', en:'🌐 Language', ja:'🌐 言語', ko:'🌐 언어', fr:'🌐 Langue', de:'🌐 Sprache', es:'🌐 Idioma', ru:'🌐 Язык' },
  'settings.auto':   { 'zh-Hant':'日夜自动切换', zh:'日夜自动切换', en:'Auto Switch', ja:'自動切替', ko:'자동 전환', fr:'Auto jour/nuit', de:'Automatisch', es:'Auto día/noche', ru:'Авто переключение' },
  'settings.auto.desc':{'zh-Hant':'白天亮色 · 夜晚深色', zh:'白天亮色 · 夜晚深色', en:'Light by day · Dark by night', ja:'昼は明るく·夜は暗く', ko:'낮에는 밝게·밤에는 어둡게', fr:'Clair le jour · sombre la nuit', de:'Hell am Tag · dunkel bei Nacht', es:'Claro de día · oscuro de noche', ru:'Светлая днем · темная ночью' },
  'settings.customize':{'zh-Hant':'自定义', zh:'自定义', en:'Customize', ja:'カスタマイズ', ko:'사용자 정의', fr:'Personnaliser', de:'Anpassen', es:'Personalizar', ru:'Настроить' },
  'settings.export': { 'zh-Hant':'📤 导出主题', zh:'📤 导出主题', en:'📤 Export Theme', ja:'📤 テーマ出力', ko:'📤 테마 내보내기', fr:'📤 Exporter', de:'📤 Exportieren', es:'📤 Exportar', ru:'📤 Экспорт' },
  'settings.import': { 'zh-Hant':'📥 导入主题', zh:'📥 导入主题', en:'📥 Import Theme', ja:'📥 テーマ読込', ko:'📥 테마 가져오기', fr:'📥 Importer', de:'📥 Importieren', es:'📥 Importar', ru:'📥 Импорт' },
  'settings.pref':   { 'zh-Hant':'偏好', zh:'偏好', en:'Preferences', ja:'設定', ko:'기본 설정', fr:'Préférences', de:'Einstellungen', es:'Preferencias', ru:'Настройки' },
  'settings.bedtime.target':{'zh-Hant':'🌙 目标就寝', zh:'🌙 目标就寝', en:'🌙 Bedtime Goal', ja:'🌙 目標就寝時間', ko:'🌙 목표 취침', fr:'🌙 Heure coucher', de:'🌙 Schlafenszeit', es:'🌙 Hora dormir', ru:'🌙 Время ко сну' },
  'settings.wakeup.target':{'zh-Hant':'☀️ 目标起床', zh:'☀️ 目标起床', en:'☀️ Wake-up Goal', ja:'☀️ 目標起床時間', ko:'☀️ 목표 기상', fr:'☀️ Heure réveil', de:'☀️ Aufstehzeit', es:'☀️ Hora despertar', ru:'☀️ Время подъема' },
  'settings.notification':{'zh-Hant':'🔔 睡前提醒', zh:'🔔 睡前提醒', en:'🔔 Bedtime Reminder', ja:'🔔 就寝リマインダー', ko:'🔔 취침 알림', fr:'🔔 Rappel coucher', de:'🔔 Erinnerung', es:'🔔 Recordatorio', ru:'🔔 Напоминание' },
  'settings.custom.color':  { 'zh-Hant':'颜色', zh:'颜色', en:'Color', ja:'色', ko:'색상', fr:'Couleur', de:'Farbe', es:'Color', ru:'Цвет' },
  'settings.custom.button': { 'zh-Hant':'按钮', zh:'按钮', en:'Button', ja:'ボタン', ko:'버튼', fr:'Bouton', de:'Tasten', es:'Botón', ru:'Кнопка' },
  'settings.custom.companion':{'zh-Hant':'伙伴', zh:'伙伴', en:'Companion', ja:'仲間', ko:'동반자', fr:'Compagnon', de:'Begleiter', es:'Compañero', ru:'Компаньон' },
  'settings.custom.font':  { 'zh-Hant':'字体', zh:'字体', en:'Font', ja:'フォント', ko:'글꼴', fr:'Police', de:'Schriftart', es:'Fuente', ru:'Шрифт' },
  'settings.custom.sound': { 'zh-Hant':'音效', zh:'音效', en:'Sound', ja:'サウンド', ko:'사운드', fr:'Son', de:'Klang', es:'Sonido', ru:'Звук' },
  'settings.custom.animation':{'zh-Hant':'动效', zh:'动效', en:'Animation', ja:'アニメーション', ko:'애니메이션', fr:'Animation', de:'Animation', es:'Animación', ru:'Анимация' },
  'settings.custom.background':{'zh-Hant':'背景', zh:'背景', en:'Background', ja:'背景', ko:'배경', fr:'Arrière-plan', de:'Hintergrund', es:'Fondo', ru:'Фон' },
  'settings.density':  { 'zh-Hant':'📊 密度', zh:'📊 密度', en:'📊 Density', ja:'📊 密度', ko:'📊 밀도', fr:'📊 Densité', de:'📊 Dichte', es:'📊 Densidad', ru:'📊 Плотность' },
  'settings.custom.upload':{'zh-Hant':'点击上传照片作为背景', zh:'点击上传照片作为背景', en:'Tap to upload a photo', ja:'タップして写真を選択', ko:'탭하여 사진 업로드', fr:'Choisir une photo', de:'Foto auswählen', es:'Elige una foto', ru:'Выберите фото' },
  'settings.custom.upload.hint':{'zh-Hant':'自动叠加暗色遮罩 + 模糊', zh:'自动叠加暗色遮罩 + 模糊', en:'Auto dark overlay + blur', ja:'自動で暗色マスク+ぼかし', ko:'자동 어두운 오버레이 + 블러', fr:'Masque sombre + flou auto', de:'Automatische Überlagerung', es:'Superposición oscura + desenfoque', ru:'Авто затемнение + размытие' },
  'settings.font.size':{'zh-Hant':'字体大小', zh:'字体大小', en:'Font Size', ja:'フォントサイズ', ko:'글꼴 크기', fr:'Taille police', de:'Schriftgröße', es:'Tamaño fuente', ru:'Размер шрифта' },
  'settings.font.small':{'zh-Hant':'小', zh:'小', en:'Small', ja:'小', ko:'작게', fr:'Petite', de:'Klein', es:'Pequeño', ru:'Маленький' },
  'settings.font.medium':{'zh-Hant':'中', zh:'中', en:'Medium', ja:'中', ko:'중간', fr:'Moyenne', de:'Mittel', es:'Medio', ru:'Средний' },
  'settings.font.large':{'zh-Hant':'大', zh:'大', en:'Large', ja:'大', ko:'크게', fr:'Grande', de:'Groß', es:'Grande', ru:'Большой' },
  'settings.sound.bedtime':{'zh-Hant':'🌙 睡前', zh:'🌙 睡前', en:'🌙 Bedtime', ja:'🌙 就寝時', ko:'🌙 취침 시', fr:'🌙 Coucher', de:'🌙 Schlafenszeit', es:'🌙 Al dormir', ru:'🌙 Ко сну' },
  'settings.sound.wakeup':{'zh-Hant':'☀️ 起床', zh:'☀️ 起床', en:'☀️ Wake-up', ja:'☀️ 起床時', ko:'☀️ 기상 시', fr:'☀️ Réveil', de:'☀️ Aufstehen', es:'☀️ Al despertar', ru:'☀️ Подъем' },
  'settings.sound.feedback':{'zh-Hant':'🔊 反馈', zh:'🔊 反馈', en:'🔊 Feedback', ja:'🔊 フィードバック', ko:'🔊 피드백', fr:'🔊 Retour', de:'🔊 Rückmeldung', es:'🔊 Retroalimentación', ru:'🔊 Отклик' },
  'settings.animation.reduced':{'zh-Hant':'减弱动效', zh:'减弱动效', en:'Reduced Motion', ja:'動きを減らす', ko:'움직임 줄이기', fr:'Mouvement réduit', de:'Weniger Bewegung', es:'Movimiento reducido', ru:'Уменьшить анимацию' },
  'settings.animation.smooth':{'zh-Hant':'流畅', zh:'流畅', en:'Smooth', ja:'スムーズ', ko:'부드럽게', fr:'Fluide', de:'Flüssig', es:'Suave', ru:'Плавно' },
  'settings.on':{'zh-Hant':'已开启', zh:'已开启', en:'On', ja:'オン', ko:'켜짐', fr:'Activé', de:'An', es:'Activado', ru:'Вкл' },
  'settings.off':{'zh-Hant':'已关闭', zh:'已关闭', en:'Off', ja:'オフ', ko:'꺼짐', fr:'Désactivé', de:'Aus', es:'Desactivado', ru:'Выкл' },
  'settings.sound.rain':{'zh-Hant':'雨声', zh:'雨声', en:'Rain', ja:'雨音', ko:'빗소리', fr:'Pluie', de:'Regen', es:'Lluvia', ru:'Дождь' },
  'settings.sound.ocean':{'zh-Hant':'海浪', zh:'海浪', en:'Ocean', ja:'波の音', ko:'파도 소리', fr:'Océan', de:'Meer', es:'Océano', ru:'Океан' },
  'settings.sound.forest':{'zh-Hant':'森林', zh:'森林', en:'Forest', ja:'森の音', ko:'숲 소리', fr:'Forêt', de:'Wald', es:'Bosque', ru:'Лес' },
  'settings.sound.whitenoise':{'zh-Hant':'白噪音', zh:'白噪音', en:'White Noise', ja:'ホワイトノイズ', ko:'백색 잡음', fr:'Bruit blanc', de:'Weißes Rauschen', es:'Ruido blanco', ru:'Белый шум' },
  'settings.sound.fire':{'zh-Hant':'篝火', zh:'篝火', en:'Bonfire', ja:'焚き火', ko:'모닥불', fr:'Feu de camp', de:'Lagerfeuer', es:'Hoguera', ru:'Костёр' },
  'settings.sound.piano':{'zh-Hant':'钢琴', zh:'钢琴', en:'Piano', ja:'ピアノ', ko:'피아노', fr:'Piano', de:'Klavier', es:'Piano', ru:'Пианино' },
  'settings.sound.birds':{'zh-Hant':'鸟鸣', zh:'鸟鸣', en:'Birds', ja:'鳥のさえずり', ko:'새소리', fr:'Oiseaux', de:'Vögel', es:'Pájaros', ru:'Птицы' },
  'settings.sound.meditation':{'zh-Hant':'冥想钟', zh:'冥想钟', en:'Meditation Bell', ja:'瞑想の鐘', ko:'명상 종', fr:'Cloche méditation', de:'Meditationsglocke', es:'Campana meditación', ru:'Колокол медитации' },
  'settings.sound.gentle':{'zh-Hant':'渐进铃', zh:'渐进铃', en:'Gentle Chime', ja:'優しいチャイム', ko:'부드러운 차임', fr:'Carillon doux', de:'Sanfter Klang', es:'Campanilla suave', ru:'Нежный звон' },
  'settings.sound.chord':{'zh-Hant':'和弦', zh:'和弦', en:'Chord', ja:'コード', ko:'코드', fr:'Accord', de:'Akkord', es:'Acorde', ru:'Аккорд' },
  'settings.sound.ding':{'zh-Hant':'叮咚', zh:'叮咚', en:'Ding', ja:'ディン', ko:'딩', fr:'Ding', de:'Ding', es:'Ding', ru:'Динь' },

  // Language names
  'lang.zh': { 'zh-Hant':'中文', zh:'中文', en:'Chinese', ja:'中国語', ko:'중국어', fr:'Chinois', de:'Chinesisch', es:'Chino', ru:'Китайский' },
  'lang.en': { 'zh-Hant':'英语', zh:'英语', en:'English', ja:'英語', ko:'영어', fr:'Anglais', de:'Englisch', es:'Inglés', ru:'Английский' },
  'lang.ja': { 'zh-Hant':'日语', zh:'日语', en:'Japanese', ja:'日本語', ko:'일본어', fr:'Japonais', de:'Japanisch', es:'Japonés', ru:'Японский' },
  'lang.ko': { 'zh-Hant':'韩语', zh:'韩语', en:'Korean', ja:'韓国語', ko:'한국어', fr:'Coréen', de:'Koreanisch', es:'Coreano', ru:'Корейский' },
  'lang.fr': { 'zh-Hant':'法语', zh:'法语', en:'French', ja:'フランス語', ko:'프랑스어', fr:'Français', de:'Französisch', es:'Francés', ru:'Французский' },
  'lang.de': { 'zh-Hant':'德语', zh:'德语', en:'German', ja:'ドイツ語', ko:'독일어', fr:'Allemand', de:'Deutsch', es:'Alemán', ru:'Немецкий' },
  'lang.es': { 'zh-Hant':'西班牙语', zh:'西班牙语', en:'Spanish', ja:'スペイン語', ko:'스페인어', fr:'Espagnol', de:'Spanisch', es:'Español', ru:'Испанский' },
  'lang.ru': { 'zh-Hant':'俄语', zh:'俄语', en:'Russian', ja:'ロシア語', ko:'러시아어', fr:'Russe', de:'Russisch', es:'Ruso', ru:'Русский' },

  // Settings background
  'settings.bg.set':      { 'zh-Hant':'背景已设置', zh:'背景已设置', en:'Background set', ja:'背景設定済み', ko:'배경 설정됨', fr:'Fond défini', de:'Hintergrund gesetzt', es:'Fondo establecido', ru:'Фон установлен' },
  'settings.bg.reset':    { 'zh-Hant':'恢复默认', zh:'恢复默认', en:'Reset default', ja:'デフォルトに戻す', ko:'기본값 복원', fr:'Réinitialiser', de:'Zurücksetzen', es:'Restablecer', ru:'Сбросить' },
  'settings.bg.intensity':{ 'zh-Hant':'遮罩强度', zh:'遮罩强度', en:'Overlay intensity', ja:'マスク強度', ko:'오버레이 강도', fr:'Intensité', de:'Überlagerung', es:'Intensidad', ru:'Прозрачность' },
  'report.health': { 'zh-Hant':'健康生活', zh:'健康生活', en:'Health Score', ja:'健康スコア', ko:'건강 점수', fr:'Score santé', de:'Gesundheit', es:'Salud', ru:'Здоровье' },
  // Report page
  'report.title':       { 'zh-Hant':'每日报告', zh:'每日报告', en:'Daily Report', ja:'デイリーレポート', ko:'일일 보고서', fr:'Rapport quotidien', de:'Tagesbericht', es:'Informe diario', ru:'Ежедневный отчет' },
  'report.bedtime':     { 'zh-Hant':'🌙 就寝', zh:'🌙 就寝', en:'Bedtime', ja:'就寝', ko:'취침', fr:'Coucher', de:'Schlafenszeit', es:'Hora de dormir', ru:'Отход ко сну' },
  'report.wakeup':      { 'zh-Hant':'☀️ 起床', zh:'☀️ 起床', en:'Wake up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufwachen', es:'Despertar', ru:'Пробуждение' },
  'report.week':        { 'zh-Hant':'📅 本周', zh:'📅 本周', en:'This Week', ja:'今週', ko:'이번 주', fr:'Cette semaine', de:'Diese Woche', es:'Esta semana', ru:'На этой неделе' },
  'report.stats':       { 'zh-Hant':'🏆 统计', zh:'🏆 统计', en:'Stats', ja:'統計', ko:'통계', fr:'Stats', de:'Statistiken', es:'Estadísticas', ru:'Статистика' },
  'report.streak':      { 'zh-Hant':'🔥 连续天数', zh:'🔥 连续天数', en:'Streak', ja:'連続日数', ko:'연속 일수', fr:'Série', de:'Serie', es:'Racha', ru:'Серия' },
  'report.longest':     { 'zh-Hant':'📈 最长连续', zh:'📈 最长连续', en:'Longest', ja:'最長連続', ko:'최장 연속', fr:'Record', de:'Rekord', es:'Récord', ru:'Рекорд' },
  'report.rate':        { 'zh-Hant':'📊 完成度', zh:'📊 完成度', en:'Completion Rate', ja:'完了率', ko:'완성률', fr:'Taux', de:'Abschlussrate', es:'Tasa', ru:'Процент' },
  'report.total':       { 'zh-Hant':'📋 总记录天数', zh:'📋 总记录天数', en:'Total Days', ja:'総記録日数', ko:'총 기록', fr:'Total jours', de:'Gesamttage', es:'Días totales', ru:'Всего дней' },
  'report.advice.late1': { 'zh-Hant':'比目标晚了不少，今晚试试提前放下手机', zh:'比目标晚了不少，今晚试试提前放下手机', en:'Quite late vs target, try putting down phone earlier tonight', ja:'目標よりかなり遅れています', ko:'목표보다 늦었습니다', fr:'Très en retard', de:'Deutlich zu spät', es:'Muy tarde', ru:'Сильно опоздали' },
  'report.advice.late2': { 'zh-Hant':'比目标晚了一点，睡前1小时不刷短视频试试', zh:'比目标晚了一点，睡前1小时不刷短视频试试', en:'A bit late, try no short videos 1h before bed', ja:'少し遅れました', ko:'조금 늦었습니다', fr:'Un peu en retard', de:'Etwas zu spät', es:'Un poco tarde', ru:'Немного опоздали' },
  'report.advice.ok':   { 'zh-Hant':'按时睡觉很棒！继续保持', zh:'按时睡觉很棒！继续保持', en:'On time! Keep it up', ja:'時間通り！継続しましょう', ko:'제시간! 계속하세요', fr:'À l\'heure! Continuez', de:'Pünktlich! Weiter so', es:'¡A tiempo! Sigue así', ru:'Вовремя! Продолжайте' },
  'report.advice.nolog':{ 'zh-Hant':'还没有打卡记录，记得睡前点击「准备睡觉」', zh:'还没有打卡记录，记得睡前点击「准备睡觉」', en:'No check-in yet, remember to tap before sleep', ja:'まだ記録がありません', ko:'아직 기록이 없습니다', fr:'Pas encore pointé', de:'Noch nicht eingecheckt', es:'Aún sin registro', ru:'Ещё нет записи' },
  'report.advice.low':  { 'zh-Hant':'完成度偏低，打卡后尽量不要再碰手机', zh:'完成度偏低，打卡后尽量不要再碰手机', en:'Low completion rate, avoid phone after check-in', ja:'完了率が低いです', ko:'완성률이 낮습니다', fr:'Taux faible', de:'Niedrige Rate', es:'Tasa baja', ru:'Низкий процент' },
  'report.advice.streak':{ 'zh-Hant':'已连续{}天打卡，坚持下去！', zh:'已连续{}天打卡，坚持下去！', en:'{} days streak, keep going!', ja:'{}日連続！', ko:'{}일 연속!', fr:'{} jours de suite!', de:'{} Tage in Folge!', es:'¡{} días seguidos!', ru:'{} дней подряд!' },

  // Calendar
  'cal.complete':       { 'zh-Hant':'完整', zh:'完整', en:'Complete', ja:'完了', ko:'완료', fr:'Complet', de:'Vollständig', es:'Completo', ru:'Завершено' },
  'cal.partial':        { 'zh-Hant':'仅就寝', zh:'仅就寝', en:'Bed Only', ja:'就寝のみ', ko:'취침만', fr:'Coucher seul', de:'Nur Schlafen', es:'Solo dormir', ru:'Только сон' },
  'cal.nodata':         { 'zh-Hant':'无记录', zh:'无记录', en:'No Data', ja:'記録なし', ko:'기록 없음', fr:'Aucune donnée', de:'Keine Daten', es:'Sin datos', ru:'Нет данных' },
  'cal.bedtime':        { 'zh-Hant':'就寝', zh:'就寝', en:'Bedtime', ja:'就寝', ko:'취침', fr:'Coucher', de:'Schlafen', es:'Dormir', ru:'Сон' },
  'cal.wakeup':         { 'zh-Hant':'起床', zh:'起床', en:'Wake', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufwachen', es:'Despertar', ru:'Пробуждение' },
  'cal.checkin':        { 'zh-Hant':'打卡', zh:'打卡', en:'Check-in', ja:'チェックイン', ko:'체크인', fr:'Pointage', de:'Check-in', es:'Registro', ru:'Отметка' },
  'cal.rate':           { 'zh-Hant':'完成度', zh:'完成度', en:'Rate', ja:'完了度', ko:'완성도', fr:'Taux', de:'Rate', es:'Tasa', ru:'Процент' },

  // Time picker
  'time.title':         { 'zh-Hant':'选择时间', zh:'选择时间', en:'Select Time', ja:'時間選択', ko:'시간 선택', fr:'Choisir l\'heure', de:'Zeit wählen', es:'Seleccionar hora', ru:'Выберите время' },
  'time.confirm':       { 'zh-Hant':'确认', zh:'确认', en:'Confirm', ja:'確認', ko:'확인', fr:'Confirmer', de:'Bestätigen', es:'Confirmar', ru:'Подтвердить' },
  'time.cancel':        { 'zh-Hant':'取消', zh:'取消', en:'Cancel', ja:'キャンセル', ko:'취소', fr:'Annuler', de:'Abbrechen', es:'Cancelar', ru:'Отмена' },

  // Health score
  'health.title':       { 'zh-Hant':'💚 健康评分明细', zh:'💚 健康评分明细', en:'Health Score Details', ja:'健康スコア詳細', ko:'건강 점수 상세', fr:'Détails du score', de:'Gesundheitsbewertung', es:'Detalles de salud', ru:'Оценка здоровья' },
  'health.max':         { 'zh-Hant':'满分100分', zh:'满分100分', en:'Max 100 points', ja:'満点100点', ko:'만점 100점', fr:'Max 100 points', de:'Max 100 Punkte', es:'Máx 100 puntos', ru:'Макс 100 баллов' },
  'health.total':       { 'zh-Hant':'总分', zh:'总分', en:'Total', ja:'合計', ko:'총점', fr:'Total', de:'Gesamt', es:'Total', ru:'Итого' },
  'health.close':       { 'zh-Hant':'关闭', zh:'关闭', en:'Close', ja:'閉じる', ko:'닫기', fr:'Fermer', de:'Schließen', es:'Cerrar', ru:'Закрыть' },
  'health.bed.label':   { 'zh-Hant':'就寝准时', zh:'就寝准时', en:'On-time Bed', ja:'就寝時間厳守', ko:'취침 시간 준수', fr:'Heure coucher', de:'Pünktlich schlafen', es:'Hora de dormir', ru:'Вовремя спать' },
  'health.dur.label':   { 'zh-Hant':'睡眠时长', zh:'睡眠时长', en:'Sleep Duration', ja:'睡眠時間', ko:'수면 시간', fr:'Durée sommeil', de:'Schlafdauer', es:'Duración sueño', ru:'Длительность сна' },
  'health.curfew.label':{ 'zh-Hant':'未使用手机', zh:'未使用手机', en:'No Phone Use', ja:'スマホ未使用', ko:'휴대폰 미사용', fr:'Pas de téléphone', de:'Kein Handy', es:'Sin teléfono', ru:'Без телефона' },

  // Health score status
  'health.great':       { 'zh-Hant':'🥳 健康', zh:'🥳 健康', en:'Great', ja:'🥳 健康', ko:'🥳 건강', fr:'🥳 Parfait', de:'🥳 Gesund', es:'🥳 Saludable', ru:'🥳 Здоров' },
  'health.ok':          { 'zh-Hant':'🙄 亚健康', zh:'🙄 亚健康', en:'Fair', ja:'🙄 やや不良', ko:'🙄 보통', fr:'🙄 Correct', de:'🙄 Okay', es:'🙄 Regular', ru:'🙄 Нормально' },
  'health.bad':         { 'zh-Hant':'🤡 不健康', zh:'🤡 不健康', en:'Poor', ja:'🤡 不良', ko:'🤡 나쁨', fr:'🤡 Mauvais', de:'🤡 Schlecht', es:'🤡 Mal', ru:'🤡 Плохо' },
  'health.dead':        { 'zh-Hant':'☠️ 不要命啦！', zh:'☠️ 不要命啦！', en:'☠️ Danger!', ja:'☠️ 危険！', ko:'☠️ 위험!', fr:'☠️ Danger!', de:'☠️ Gefahr!', es:'☠️ ¡Peligro!', ru:'☠️ Опасно!' },

  // Device stats
  'device.usage':       { 'zh-Hant':'📱 昨晚设备使用', zh:'📱 昨晚设备使用', en:'Last Night Usage', ja:'昨晩の使用状況', ko:'지난밤 사용', fr:'Utilisation nocturne', de:'Nutzung letzte Nacht', es:'Uso anoche', ru:'Использование ночью' },
  'device.total':       { 'zh-Hant':'总使用时长', zh:'总使用时长', en:'Total Usage', ja:'総使用時間', ko:'총 사용 시간', fr:'Total utilisation', de:'Gesamtnutzung', es:'Uso total', ru:'Общее время' },

  // Permission
  'perm.title':         { 'zh-Hant':'使用统计权限', zh:'使用统计权限', en:'Usage Access', ja:'使用統計権限', ko:'사용 통계 권한', fr:'Accès utilisation', de:'Nutzungszugriff', es:'Acceso de uso', ru:'Доступ к статистике' },
  'perm.desc':          { 'zh-Hant':'我们需要「使用情况访问」权限来检测你睡前是否使用手机。这有助于记录真实的睡眠习惯。', zh:'我们需要「使用情况访问」权限来检测你睡前是否使用手机。这有助于记录真实的睡眠习惯。', en:'We need Usage Access to detect phone use during sleep.', ja:'睡眠中のスマホ使用を検出するために使用状況へのアクセスが必要です。', ko:'수면 중 휴대폰 사용을 감지하기 위해 사용 통계 권한이 필요합니다.', fr:'Nous avons besoin de l\'accès à l\'utilisation pour détecter l\'utilisation du téléphone.', de:'Wir benötigen Zugriff auf Nutzungsstatistiken.', es:'Necesitamos acceso a estadísticas de uso.', ru:'Нам нужен доступ к статистике использования.' },
  'perm.later':         { 'zh-Hant':'暂不开启', zh:'暂不开启', en:'Not Now', ja:'あとで', ko:'나중에', fr:'Plus tard', de:'Später', es:'Ahora no', ru:'Позже' },
  'perm.go':            { 'zh-Hant':'去授权', zh:'去授权', en:'Authorize', ja:'許可する', ko:'허용', fr:'Autoriser', de:'Autorisieren', es:'Autorizar', ru:'Разрешить' },

  'theme.dark':         { 'zh-Hant':'暗色精确', zh:'暗色精确', en:'Dark Precision', ja:'ダーク', ko:'다크', fr:'Sombre précis', de:'Dunkel präzise', es:'Oscuro preciso', ru:'Тёмный' },
  'theme.warm':         { 'zh-Hant':'暖色助眠', zh:'暖色助眠', en:'Warm Night', ja:'ウォーム', ko:'웜', fr:'Nuit chaude', de:'Warme Nacht', es:'Noche cálida', ru:'Тёплая ночь' },
  'theme.nature':       { 'zh-Hant':'自然简约', zh:'自然简约', en:'Nature Calm', ja:'ナチュラル', ko:'네이처', fr:'Nature calme', de:'Natur ruhig', es:'Naturaleza', ru:'Природа' },
  'theme.light':        { 'zh-Hant':'极简亮色', zh:'极简亮色', en:'Minimal Light', ja:'ミニマル', ko:'미니멀', fr:'Lumière min', de:'Minimal hell', es:'Luz mínima', ru:'Минимальный' },
  'settings.bg.intensity':{ 'zh-Hant':'遮罩强度', zh:'遮罩强度', en:'Overlay', ja:'オーバーレイ', ko:'오버레이', fr:'Superposition', de:'Überlagerung', es:'Superposición', ru:'Наложение' },
  'settings.export':    { 'zh-Hant':'导出主题', zh:'导出主题', en:'Export Theme', ja:'テーマ出力', ko:'테마 내보내기', fr:'Exporter thème', de:'Thema exportieren', es:'Exportar tema', ru:'Экспорт темы' },
  'settings.import':    { 'zh-Hant':'导入主题', zh:'导入主题', en:'Import Theme', ja:'テーマ読込', ko:'테마 가져오기', fr:'Importer thème', de:'Thema importieren', es:'Importar tema', ru:'Импорт темы' },

  'ad.label':           { 'zh-Hant':'广告', zh:'广告', en:'Ad', ja:'広告', ko:'광고', fr:'Pub', de:'Anzeige', es:'Anuncio', ru:'Реклама' },
  'ach.continue':       { 'zh-Hant':'连续 {} / {} 天', zh:'连续 {} / {} 天', en:'{} / {} days', ja:'{} / {} 日', ko:'{} / {} 일', fr:'{} / {} jours', de:'{} / {} Tage', es:'{} / {} días', ru:'{} / {} дней' },
  'ach.3day':           { 'zh-Hant':'连续3天', zh:'连续3天', en:'3-day streak', ja:'3日連続', ko:'3일 연속', fr:'3 jours', de:'3 Tage', es:'3 días', ru:'3 дня' },
  'ach.7day':           { 'zh-Hant':'连续7天', zh:'连续7天', en:'7-day streak', ja:'7日連続', ko:'7일 연속', fr:'7 jours', de:'7 Tage', es:'7 días', ru:'7 дней' },
  'ach.14day':          { 'zh-Hant':'连续14天', zh:'连续14天', en:'14-day streak', ja:'14日連続', ko:'14일 연속', fr:'14 jours', de:'14 Tage', es:'14 días', ru:'14 дней' },
  'comp.grow':          { 'zh-Hant':'随连续天数进化成长', zh:'随连续天数进化成长', en:'Evolves with streak', ja:'連続日数で進化', ko:'연속 일수에 따라 진화', fr:'Évolue avec la série', de:'Entwickelt sich mit Serie', es:'Evoluciona con la racha', ru:'Растёт с серией' },
  'color.title':        { 'zh-Hant':'🎨 选择主色', zh:'🎨 选择主色', en:'🎨 Pick Color', ja:'🎨 色を選択', ko:'🎨 색상 선택', fr:'🎨 Choisir couleur', de:'🎨 Farbe wählen', es:'🎨 Elegir color', ru:'🎨 Выбрать цвет' },

  'settings.ach':       { 'zh-Hant':'🏆 成就', zh:'🏆 成就', en:'Achievements', ja:'実績', ko:'성취', fr:'Succès', de:'Erfolge', es:'Logros', ru:'Достижения' },
  'settings.badge':     { 'zh-Hant':'徽章', zh:'徽章', en:'Badges', ja:'バッジ', ko:'배지', fr:'Badges', de:'Abzeichen', es:'Insignias', ru:'Значки' },
  'report.wakeup':      { 'zh-Hant':'☀️ 今早起', zh:'☀️ 今早起', en:'Woke up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufgewacht', es:'Desperté', ru:'Проснулся' },

  'color.title':        { 'zh-Hant':'🎨 选择主色', zh:'🎨 选择主色', en:'🎨 Pick Color', ja:'🎨 色を選択', ko:'🎨 색상 선택', fr:'🎨 Choisir couleur', de:'🎨 Farbe wählen', es:'🎨 Elegir color', ru:'🎨 Выбрать цвет' },
  'color.current':      { 'zh-Hant':'当前', zh:'当前', en:'Current', ja:'現在', ko:'현재', fr:'Actuel', de:'Aktuell', es:'Actual', ru:'Текущий' },
  'settings.custom.button':{ 'zh-Hant':'🎪 按钮风格', zh:'🎪 按钮风格', en:'🎪 Button Style', ja:'🎪 ボタンスタイル', ko:'🎪 버튼 스타일', fr:'🎪 Style bouton', de:'🎪 Button-Stil', es:'🎪 Estilo botón', ru:'🎪 Стиль кнопок' },
  'settings.custom.companion':{ 'zh-Hant':'🌱 虚拟伙伴', zh:'🌱 虚拟伙伴', en:'🌱 Companion', ja:'🌱 仲間', ko:'🌱 동반자', fr:'🌱 Compagnon', de:'🌱 Begleiter', es:'🌱 Compañero', ru:'🌱 Питомец' },
  'settings.custom.font':{ 'zh-Hant':'🔠 字体', zh:'🔠 字体', en:'🔠 Font', ja:'🔠 フォント', ko:'🔠 글꼴', fr:'🔠 Police', de:'🔠 Schrift', es:'🔠 Fuente', ru:'🔠 Шрифт' },
  'settings.font.size':  { 'zh-Hant':'字体大小', zh:'字体大小', en:'Font Size', ja:'フォントサイズ', ko:'글꼴 크기', fr:'Taille police', de:'Schriftgröße', es:'Tamaño fuente', ru:'Размер шрифта' },
  'settings.font.small': { 'zh-Hant':'小', zh:'小', en:'S', ja:'小', ko:'작게', fr:'Petit', de:'Klein', es:'Pequeño', ru:'Мал' },
  'settings.font.medium':{ 'zh-Hant':'中', zh:'中', en:'M', ja:'中', ko:'중간', fr:'Moyen', de:'Mittel', es:'Medio', ru:'Сред' },
  'settings.font.large': { 'zh-Hant':'大', zh:'大', en:'L', ja:'大', ko:'크게', fr:'Grand', de:'Groß', es:'Grande', ru:'Бол' },

};

// Simple Simplified→Traditional Chinese character mapping for zh-Hant
const S2T: Record<string, string> = {
  '设':'設','置':'置','主':'主','题':'題','颜':'顏','色':'色','自':'自','定':'定','义':'義',
  '语':'語','言':'言','动':'動','切':'切','换':'換','导':'導','航':'航','栏':'欄','首':'首',
  '页':'頁','日':'日','历':'曆','报':'報','告':'告','成':'成','就':'就','开':'開','关':'關',
  '闭':'閉','间':'間','时':'時','钟':'鐘','见':'見','问':'問','馈':'饋','帮':'幫','助':'助',
  '状':'狀','态':'態','信':'信','息':'息','错':'錯','误':'誤','输':'輸','入':'入','出':'出',
  '回':'回','复':'復','制':'製','贴':'貼','统':'統','络':'絡','软':'軟','件':'件','验':'驗',
  '证':'證','码':'碼','数':'數','据':'據','库':'庫','备':'備','注':'註','释':'釋','加':'加',
  '班':'班','应':'應','酬':'酬','放':'放','下':'下','手':'手','机':'機','准':'準','取':'取',
  '消':'消','确':'確','认':'認','台':'臺','湾':'灣','香':'香','港':'港','澳':'澳','门':'門',
  '项':'項','目':'目','值':'值','对':'對','于':'於','最':'最','新':'新','版':'版','更':'更',
  '功':'功','能':'能','修':'修','復':'復','简':'簡','体':'體','繁':'繁','转':'轉','选':'選',
  '择':'擇','改':'改','为':'為','从':'從','默':'默','认':'認','模':'模','糊':'糊','叠':'疊',
  '遮':'遮','罩':'罩','检':'檢','测':'測','会':'會','打':'打','扰':'擾','长':'長','发':'發',
  '现':'現','后':'後','来':'來','说':'說','时':'時','样':'樣','点':'點','对':'對','儿':'兒',
  '级':'級','线':'線','层':'層','龙':'龍','乐':'樂','关':'關','开':'開','个':'個','这':'這',
  '国':'國','爲':'為','画':'畫','当':'當','党':'黨','电':'電','风':'風','飞':'飛','马':'馬',
  '门':'門','鸟':'鳥','鱼':'魚','东':'東','习':'習','书':'書','学':'學','头':'頭','体':'體',
  '亲':'親','产':'產','长':'長','门':'門','间':'間','贝':'貝','见':'見','车':'車','华':'華',
  '爱':'愛','重':'重','要':'要','什':'什','么':'麼','不':'不','是':'是','我':'我','全':'全',
  '部':'部','走':'走','跳':'跳','实':'實','际':'際','落':'落','预':'預','序':'序','列':'列',
  '背':'背','景':'景','图':'圖','片':'片','上':'上','传':'傳','正':'正','常':'常','半':'半',
  '透':'透','明':'明','显':'顯','示':'示','效':'效','形':'形','状':'狀','睡':'睡','眠':'眠',
  '起':'起','床':'床','就':'就','寝':'寢','醒':'醒','早':'早','晚':'晚','今':'今','昨':'昨',
  '明':'明','星':'星','期':'期','步':'步','逐':'逐','修':'修','跳':'跳','的':'的','要':'要',
  '在':'在','之':'之','以':'以','对':'對','第':'第','使':'使','用':'用','浏':'瀏','览':'覽',
  '器':'器','标':'標','签':'籤','网':'網','络':'絡','记':'記','录':'錄','续':'續','连':'連',
  '宵':'宵','禁':'禁','模':'模','式':'式',
  // Report page
  'report.title':       { 'zh-Hant':'每日报告', zh:'每日报告', en:'Daily Report', ja:'デイリーレポート', ko:'일일 보고서', fr:'Rapport quotidien', de:'Tagesbericht', es:'Informe diario', ru:'Ежедневный отчет' },
  'report.bedtime':     { 'zh-Hant':'🌙 就寝', zh:'🌙 就寝', en:'Bedtime', ja:'就寝', ko:'취침', fr:'Coucher', de:'Schlafenszeit', es:'Hora de dormir', ru:'Отход ко сну' },
  'report.wakeup':      { 'zh-Hant':'☀️ 起床', zh:'☀️ 起床', en:'Wake up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufwachen', es:'Despertar', ru:'Пробуждение' },
  'report.week':        { 'zh-Hant':'📅 本周', zh:'📅 本周', en:'This Week', ja:'今週', ko:'이번 주', fr:'Cette semaine', de:'Diese Woche', es:'Esta semana', ru:'На этой неделе' },
  'report.stats':       { 'zh-Hant':'🏆 统计', zh:'🏆 统计', en:'Stats', ja:'統計', ko:'통계', fr:'Stats', de:'Statistiken', es:'Estadísticas', ru:'Статистика' },
  'report.streak':      { 'zh-Hant':'🔥 连续天数', zh:'🔥 连续天数', en:'Streak', ja:'連続日数', ko:'연속 일수', fr:'Série', de:'Serie', es:'Racha', ru:'Серия' },
  'report.longest':     { 'zh-Hant':'📈 最长连续', zh:'📈 最长连续', en:'Longest', ja:'最長連続', ko:'최장 연속', fr:'Record', de:'Rekord', es:'Récord', ru:'Рекорд' },
  'report.rate':        { 'zh-Hant':'📊 完成度', zh:'📊 完成度', en:'Completion Rate', ja:'完了率', ko:'완성률', fr:'Taux', de:'Abschlussrate', es:'Tasa', ru:'Процент' },
  'report.total':       { 'zh-Hant':'📋 总记录天数', zh:'📋 总记录天数', en:'Total Days', ja:'総記録日数', ko:'총 기록', fr:'Total jours', de:'Gesamttage', es:'Días totales', ru:'Всего дней' },
  'report.advice.late1': { 'zh-Hant':'比目标晚了不少，今晚试试提前放下手机', zh:'比目标晚了不少，今晚试试提前放下手机', en:'Quite late vs target, try putting down phone earlier tonight', ja:'目標よりかなり遅れています', ko:'목표보다 늦었습니다', fr:'Très en retard', de:'Deutlich zu spät', es:'Muy tarde', ru:'Сильно опоздали' },
  'report.advice.late2': { 'zh-Hant':'比目标晚了一点，睡前1小时不刷短视频试试', zh:'比目标晚了一点，睡前1小时不刷短视频试试', en:'A bit late, try no short videos 1h before bed', ja:'少し遅れました', ko:'조금 늦었습니다', fr:'Un peu en retard', de:'Etwas zu spät', es:'Un poco tarde', ru:'Немного опоздали' },
  'report.advice.ok':   { 'zh-Hant':'按时睡觉很棒！继续保持', zh:'按时睡觉很棒！继续保持', en:'On time! Keep it up', ja:'時間通り！継続しましょう', ko:'제시간! 계속하세요', fr:'À l\'heure! Continuez', de:'Pünktlich! Weiter so', es:'¡A tiempo! Sigue así', ru:'Вовремя! Продолжайте' },
  'report.advice.nolog':{ 'zh-Hant':'还没有打卡记录，记得睡前点击「准备睡觉」', zh:'还没有打卡记录，记得睡前点击「准备睡觉」', en:'No check-in yet, remember to tap before sleep', ja:'まだ記録がありません', ko:'아직 기록이 없습니다', fr:'Pas encore pointé', de:'Noch nicht eingecheckt', es:'Aún sin registro', ru:'Ещё нет записи' },
  'report.advice.low':  { 'zh-Hant':'完成度偏低，打卡后尽量不要再碰手机', zh:'完成度偏低，打卡后尽量不要再碰手机', en:'Low completion rate, avoid phone after check-in', ja:'完了率が低いです', ko:'완성률이 낮습니다', fr:'Taux faible', de:'Niedrige Rate', es:'Tasa baja', ru:'Низкий процент' },
  'report.advice.streak':{ 'zh-Hant':'已连续{}天打卡，坚持下去！', zh:'已连续{}天打卡，坚持下去！', en:'{} days streak, keep going!', ja:'{}日連続！', ko:'{}일 연속!', fr:'{} jours de suite!', de:'{} Tage in Folge!', es:'¡{} días seguidos!', ru:'{} дней подряд!' },

  // Calendar

  // Time picker
  'time.title':         { 'zh-Hant':'选择时间', zh:'选择时间', en:'Select Time', ja:'時間選択', ko:'시간 선택', fr:'Choisir l\'heure', de:'Zeit wählen', es:'Seleccionar hora', ru:'Выберите время' },
  'time.confirm':       { 'zh-Hant':'确认', zh:'确认', en:'Confirm', ja:'確認', ko:'확인', fr:'Confirmer', de:'Bestätigen', es:'Confirmar', ru:'Подтвердить' },
  'time.cancel':        { 'zh-Hant':'取消', zh:'取消', en:'Cancel', ja:'キャンセル', ko:'취소', fr:'Annuler', de:'Abbrechen', es:'Cancelar', ru:'Отмена' },

  // Health score
  'health.title':       { 'zh-Hant':'💚 健康评分明细', zh:'💚 健康评分明细', en:'Health Score Details', ja:'健康スコア詳細', ko:'건강 점수 상세', fr:'Détails du score', de:'Gesundheitsbewertung', es:'Detalles de salud', ru:'Оценка здоровья' },
  'health.max':         { 'zh-Hant':'满分100分', zh:'满分100分', en:'Max 100 points', ja:'満点100点', ko:'만점 100점', fr:'Max 100 points', de:'Max 100 Punkte', es:'Máx 100 puntos', ru:'Макс 100 баллов' },
  'health.total':       { 'zh-Hant':'总分', zh:'总分', en:'Total', ja:'合計', ko:'총점', fr:'Total', de:'Gesamt', es:'Total', ru:'Итого' },
  'health.close':       { 'zh-Hant':'关闭', zh:'关闭', en:'Close', ja:'閉じる', ko:'닫기', fr:'Fermer', de:'Schließen', es:'Cerrar', ru:'Закрыть' },
  'health.bed.label':   { 'zh-Hant':'就寝准时', zh:'就寝准时', en:'On-time Bed', ja:'就寝時間厳守', ko:'취침 시간 준수', fr:'Heure coucher', de:'Pünktlich schlafen', es:'Hora de dormir', ru:'Вовремя спать' },
  'health.dur.label':   { 'zh-Hant':'睡眠时长', zh:'睡眠时长', en:'Sleep Duration', ja:'睡眠時間', ko:'수면 시간', fr:'Durée sommeil', de:'Schlafdauer', es:'Duración sueño', ru:'Длительность сна' },
  'health.curfew.label':{ 'zh-Hant':'未使用手机', zh:'未使用手机', en:'No Phone Use', ja:'スマホ未使用', ko:'휴대폰 미사용', fr:'Pas de téléphone', de:'Kein Handy', es:'Sin teléfono', ru:'Без телефона' },

  // Health score status
  'health.great':       { 'zh-Hant':'🥳 健康', zh:'🥳 健康', en:'Great', ja:'🥳 健康', ko:'🥳 건강', fr:'🥳 Parfait', de:'🥳 Gesund', es:'🥳 Saludable', ru:'🥳 Здоров' },
  'health.ok':          { 'zh-Hant':'🙄 亚健康', zh:'🙄 亚健康', en:'Fair', ja:'🙄 やや不良', ko:'🙄 보통', fr:'🙄 Correct', de:'🙄 Okay', es:'🙄 Regular', ru:'🙄 Нормально' },
  'health.bad':         { 'zh-Hant':'🤡 不健康', zh:'🤡 不健康', en:'Poor', ja:'🤡 不良', ko:'🤡 나쁨', fr:'🤡 Mauvais', de:'🤡 Schlecht', es:'🤡 Mal', ru:'🤡 Плохо' },
  'health.dead':        { 'zh-Hant':'☠️ 不要命啦！', zh:'☠️ 不要命啦！', en:'☠️ Danger!', ja:'☠️ 危険！', ko:'☠️ 위험!', fr:'☠️ Danger!', de:'☠️ Gefahr!', es:'☠️ ¡Peligro!', ru:'☠️ Опасно!' },

  // Device stats
  'device.usage':       { 'zh-Hant':'📱 昨晚设备使用', zh:'📱 昨晚设备使用', en:'Last Night Usage', ja:'昨晩の使用状況', ko:'지난밤 사용', fr:'Utilisation nocturne', de:'Nutzung letzte Nacht', es:'Uso anoche', ru:'Использование ночью' },
  'device.total':       { 'zh-Hant':'总使用时长', zh:'总使用时长', en:'Total Usage', ja:'総使用時間', ko:'총 사용 시간', fr:'Total utilisation', de:'Gesamtnutzung', es:'Uso total', ru:'Общее время' },

  // Permission
  'perm.title':         { 'zh-Hant':'使用统计权限', zh:'使用统计权限', en:'Usage Access', ja:'使用統計権限', ko:'사용 통계 권한', fr:'Accès utilisation', de:'Nutzungszugriff', es:'Acceso de uso', ru:'Доступ к статистике' },
  'perm.desc':          { 'zh-Hant':'我们需要「使用情况访问」权限来检测你睡前是否使用手机。这有助于记录真实的睡眠习惯。', zh:'我们需要「使用情况访问」权限来检测你睡前是否使用手机。这有助于记录真实的睡眠习惯。', en:'We need Usage Access to detect phone use during sleep.', ja:'睡眠中のスマホ使用を検出するために使用状況へのアクセスが必要です。', ko:'수면 중 휴대폰 사용을 감지하기 위해 사용 통계 권한이 필요합니다.', fr:'Nous avons besoin de l\'accès à l\'utilisation pour détecter l\'utilisation du téléphone.', de:'Wir benötigen Zugriff auf Nutzungsstatistiken.', es:'Necesitamos acceso a estadísticas de uso.', ru:'Нам нужен доступ к статистике использования.' },
  'perm.later':         { 'zh-Hant':'暂不开启', zh:'暂不开启', en:'Not Now', ja:'あとで', ko:'나중에', fr:'Plus tard', de:'Später', es:'Ahora no', ru:'Позже' },
  'perm.go':            { 'zh-Hant':'去授权', zh:'去授权', en:'Authorize', ja:'許可する', ko:'허용', fr:'Autoriser', de:'Autorisieren', es:'Autorizar', ru:'Разрешить' },

  'theme.dark':         { 'zh-Hant':'暗色精确', zh:'暗色精确', en:'Dark Precision', ja:'ダーク', ko:'다크', fr:'Sombre précis', de:'Dunkel präzise', es:'Oscuro preciso', ru:'Тёмный' },
  'theme.warm':         { 'zh-Hant':'暖色助眠', zh:'暖色助眠', en:'Warm Night', ja:'ウォーム', ko:'웜', fr:'Nuit chaude', de:'Warme Nacht', es:'Noche cálida', ru:'Тёплая ночь' },
  'theme.nature':       { 'zh-Hant':'自然简约', zh:'自然简约', en:'Nature Calm', ja:'ナチュラル', ko:'네이처', fr:'Nature calme', de:'Natur ruhig', es:'Naturaleza', ru:'Природа' },
  'theme.light':        { 'zh-Hant':'极简亮色', zh:'极简亮色', en:'Minimal Light', ja:'ミニマル', ko:'미니멀', fr:'Lumière min', de:'Minimal hell', es:'Luz mínima', ru:'Минимальный' },
  'settings.bg.intensity':{ 'zh-Hant':'遮罩强度', zh:'遮罩强度', en:'Overlay', ja:'オーバーレイ', ko:'오버레이', fr:'Superposition', de:'Überlagerung', es:'Superposición', ru:'Наложение' },
  'settings.export':    { 'zh-Hant':'导出主题', zh:'导出主题', en:'Export Theme', ja:'テーマ出力', ko:'테마 내보내기', fr:'Exporter thème', de:'Thema exportieren', es:'Exportar tema', ru:'Экспорт темы' },
  'settings.import':    { 'zh-Hant':'导入主题', zh:'导入主题', en:'Import Theme', ja:'テーマ読込', ko:'테마 가져오기', fr:'Importer thème', de:'Thema importieren', es:'Importar tema', ru:'Импорт темы' },

  'ad.label':           { 'zh-Hant':'广告', zh:'广告', en:'Ad', ja:'広告', ko:'광고', fr:'Pub', de:'Anzeige', es:'Anuncio', ru:'Реклама' },
  'ach.continue':       { 'zh-Hant':'连续 {} / {} 天', zh:'连续 {} / {} 天', en:'{} / {} days', ja:'{} / {} 日', ko:'{} / {} 일', fr:'{} / {} jours', de:'{} / {} Tage', es:'{} / {} días', ru:'{} / {} дней' },
  'ach.3day':           { 'zh-Hant':'连续3天', zh:'连续3天', en:'3-day streak', ja:'3日連続', ko:'3일 연속', fr:'3 jours', de:'3 Tage', es:'3 días', ru:'3 дня' },
  'ach.7day':           { 'zh-Hant':'连续7天', zh:'连续7天', en:'7-day streak', ja:'7日連続', ko:'7일 연속', fr:'7 jours', de:'7 Tage', es:'7 días', ru:'7 дней' },
  'ach.14day':          { 'zh-Hant':'连续14天', zh:'连续14天', en:'14-day streak', ja:'14日連続', ko:'14일 연속', fr:'14 jours', de:'14 Tage', es:'14 días', ru:'14 дней' },
  'comp.grow':          { 'zh-Hant':'随连续天数进化成长', zh:'随连续天数进化成长', en:'Evolves with streak', ja:'連続日数で進化', ko:'연속 일수에 따라 진화', fr:'Évolue avec la série', de:'Entwickelt sich mit Serie', es:'Evoluciona con la racha', ru:'Растёт с серией' },
  'color.title':        { 'zh-Hant':'🎨 选择主色', zh:'🎨 选择主色', en:'🎨 Pick Color', ja:'🎨 色を選択', ko:'🎨 색상 선택', fr:'🎨 Choisir couleur', de:'🎨 Farbe wählen', es:'🎨 Elegir color', ru:'🎨 Выбрать цвет' },

  'settings.ach':       { 'zh-Hant':'🏆 成就', zh:'🏆 成就', en:'Achievements', ja:'実績', ko:'성취', fr:'Succès', de:'Erfolge', es:'Logros', ru:'Достижения' },
  'settings.badge':     { 'zh-Hant':'徽章', zh:'徽章', en:'Badges', ja:'バッジ', ko:'배지', fr:'Badges', de:'Abzeichen', es:'Insignias', ru:'Значки' },
  'report.wakeup':      { 'zh-Hant':'☀️ 今早起', zh:'☀️ 今早起', en:'Woke up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufgewacht', es:'Desperté', ru:'Проснулся' },

  'color.title':        { 'zh-Hant':'🎨 选择主色', zh:'🎨 选择主色', en:'🎨 Pick Color', ja:'🎨 色を選択', ko:'🎨 색상 선택', fr:'🎨 Choisir couleur', de:'🎨 Farbe wählen', es:'🎨 Elegir color', ru:'🎨 Выбрать цвет' },
  'color.current':      { 'zh-Hant':'当前', zh:'当前', en:'Current', ja:'現在', ko:'현재', fr:'Actuel', de:'Aktuell', es:'Actual', ru:'Текущий' },
  'settings.custom.button':{ 'zh-Hant':'🎪 按钮风格', zh:'🎪 按钮风格', en:'🎪 Button Style', ja:'🎪 ボタンスタイル', ko:'🎪 버튼 스타일', fr:'🎪 Style bouton', de:'🎪 Button-Stil', es:'🎪 Estilo botón', ru:'🎪 Стиль кнопок' },
  'settings.custom.companion':{ 'zh-Hant':'🌱 虚拟伙伴', zh:'🌱 虚拟伙伴', en:'🌱 Companion', ja:'🌱 仲間', ko:'🌱 동반자', fr:'🌱 Compagnon', de:'🌱 Begleiter', es:'🌱 Compañero', ru:'🌱 Питомец' },
  'settings.custom.font':{ 'zh-Hant':'🔠 字体', zh:'🔠 字体', en:'🔠 Font', ja:'🔠 フォント', ko:'🔠 글꼴', fr:'🔠 Police', de:'🔠 Schrift', es:'🔠 Fuente', ru:'🔠 Шрифт' },
  'settings.font.size':  { 'zh-Hant':'字体大小', zh:'字体大小', en:'Font Size', ja:'フォントサイズ', ko:'글꼴 크기', fr:'Taille police', de:'Schriftgröße', es:'Tamaño fuente', ru:'Размер шрифта' },
  'settings.font.small': { 'zh-Hant':'小', zh:'小', en:'S', ja:'小', ko:'작게', fr:'Petit', de:'Klein', es:'Pequeño', ru:'Мал' },
  'settings.font.medium':{ 'zh-Hant':'中', zh:'中', en:'M', ja:'中', ko:'중간', fr:'Moyen', de:'Mittel', es:'Medio', ru:'Сред' },
  'settings.font.large': { 'zh-Hant':'大', zh:'大', en:'L', ja:'大', ko:'크게', fr:'Grand', de:'Groß', es:'Grande', ru:'Бол' },

};


export function tr(key: string, lang: Lang): string {
  const row = t[key];
  if (!row) return key;
  if (row[lang]) return row[lang];
  // Fallback: zh-Hant → zh → en
  if (lang === 'zh-Hant' && row['zh']) return row['zh'];
  return row['en'] || key;
}

export const SUPPORTED_LANGS: { code: Lang; name: string; nameLocal: string }[] = [
  { code: 'zh', name: '中文', nameLocal: '简体中文' },
  { code: 'zh-Hant', name: '繁体中文', nameLocal: '繁體中文' },
  { code: 'en', name: 'English', nameLocal: 'English' },
  { code: 'ja', name: '日本語', nameLocal: '日本語' },
  { code: 'ko', name: '한국어', nameLocal: '한국어' },
  { code: 'fr', name: 'Français', nameLocal: 'Français' },
  { code: 'de', name: 'Deutsch', nameLocal: 'Deutsch' },
  { code: 'es', name: 'Español', nameLocal: 'Español' },
  { code: 'ru', name: 'Русский', nameLocal: 'Русский' },
];
