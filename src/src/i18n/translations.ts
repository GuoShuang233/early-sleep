// 多语言翻译系统
export type Lang = 'zh' | 'zh-Hant' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru';

type TranslationMap = Record<string, Record<Lang, string>>;

const t: TranslationMap = {
  // Nav
  'nav.home':     { zh:'首页', en:'Home', ja:'ホーム', ko:'홈', fr:'Accueil', de:'Start', es:'Inicio', ru:'Главная' },
  'nav.calendar': { zh:'日历', en:'Calendar', ja:'カレンダー', ko:'달력', fr:'Calendrier', de:'Kalender', es:'Calendario', ru:'Календарь' },
  'nav.report':   { zh:'报告', en:'Report', ja:'レポート', ko:'보고서', fr:'Rapport', de:'Bericht', es:'Informe', ru:'Отчет' },
  'nav.goal':     { zh:'成就', en:'Goals', ja:'実績', ko:'업적', fr:'Objectifs', de:'Erfolge', es:'Logros', ru:'Достижения' },
  'nav.settings': { zh:'设置', en:'Settings', ja:'設定', ko:'설정', fr:'Paramètres', de:'Einstellungen', es:'Ajustes', ru:'Настройки' },

  // Home
  'home.greeting.night':  { zh:'🌙 晚上好', en:'🌙 Good Evening', ja:'🌙 こんばんは', ko:'🌙 안녕하세요', fr:'🌙 Bonsoir', de:'🌙 Guten Abend', es:'🌙 Buenas noches', ru:'🌙 Добрый вечер' },
  'home.greeting.morning':{ zh:'☀️ 早上好', en:'☀️ Good Morning', ja:'☀️ おはようございます', ko:'☀️ 좋은 아침', fr:'☀️ Bonjour', de:'☀️ Guten Morgen', es:'☀️ Buenos días', ru:'☀️ Доброе утро' },
  'home.target':          { zh:'目标', en:'Target', ja:'目標', ko:'목표', fr:'Objectif', de:'Ziel', es:'Objetivo', ru:'Цель' },
  'home.streak':          { zh:'连续', en:'Streak', ja:'連続', ko:'연속', fr:'Série', de:'Serie', es:'Racha', ru:'Серия' },
  'home.curfew.rate': { zh:'完成度', en:'Completion', ja:'完了度', ko:'완성도', fr:'Complétion', de:'Abschluss', es:'Finalización', ru:'Завершено' },
  'home.sleep':           { zh:'睡眠', en:'Sleep', ja:'睡眠', ko:'수면', fr:'Sommeil', de:'Schlaf', es:'Sueño', ru:'Сон' },
  'home.bedtime':         { zh:'🌙 准备睡觉', en:'🌙 Go to Bed', ja:'🌙 寝る準備', ko:'🌙 잘 준비', fr:'🌙 Au lit', de:'🌙 Schlafen', es:'🌙 A dormir', ru:'🌙 Ко сну' },
  'home.bedtime.sub':     { zh:'放下手机', en:'Put down your phone', ja:'スマホを置いて', ko:'핸드폰을 내려놓으세요', fr:'Lâchez le téléphone', de:'Handy weglegen', es:'Suelta el móvil', ru:'Отложите телефон' },
  'home.wakeup':          { zh:'☀️ 我起床了', en:'☀️ I&apos;m Up', ja:'☀️ 起きました', ko:'☀️ 일어났어요', fr:'☀️ Je me suis levé', de:'☀️ Aufgestanden', es:'☀️ Me levanté', ru:'☀️ Я проснулся' },
  'home.detail':          { zh:'详情 →', en:'Details →', ja:'詳細 →', ko:'상세 →', fr:'Détails →', de:'Details →', es:'Detalles →', ru:'Подробнее →' },
  'home.completed':       { zh:'✅ 今日打卡已完成', en:'✅ Today&apos;s Log Complete', ja:'✅ 今日の記録完了', ko:'✅ 오늘 기록 완료', fr:'✅ Enregistré aujourd&apos;hui', de:'✅ Heute erfasst', es:'✅ Registro completo', ru:'✅ Сегодня записано' },
  'home.recent':          { zh:'最近记录', en:'Recent Logs', ja:'最近の記録', ko:'최근 기록', fr:'Historique', de:'Verlauf', es:'Historial', ru:'История' },
  'home.note.placeholder':{ zh:'备注（选填）加班、应酬...', en:'Note (optional) Overtime, dinner...', ja:'メモ（任意）残業、接待...', ko:'메모 (선택) 야근, 회식...', fr:'Note (optionnelle) Heures sup...', de:'Notiz (optional) Überstunden...', es:'Nota (opcional) Horas extra...', ru:'Заметка (необ.) Переработка...' },
  'home.confirm.bedtime': { zh:'🌙 确认睡觉', en:'🌙 Confirm Sleep', ja:'🌙 就寝確認', ko:'🌙 취침 확인', fr:'🌙 Confirmer', de:'🌙 Bestätigen', es:'🌙 Confirmar', ru:'🌙 Подтвердить' },
  'home.cancel':          { zh:'取消', en:'Cancel', ja:'キャンセル', ko:'취소', fr:'Annuler', de:'Abbrechen', es:'Cancelar', ru:'Отмена' },
  'home.modal.desc':      { zh:'手机将进入宵禁检测模式\n检测到使用会记录但不打扰你', en:'Phone enters curfew mode\nUsage is logged but won&apos;t disturb you', ja:'スマホは門限モードに\n使用を記録しますが邪魔しません', ko:'휴대폰이 통금 모드로 전환됩니다\n사용이 기록되지만 방해하지 않습니다', fr:'Mode couvre-feu activé\nL&apos;utilisation est enregistrée sans déranger', de:'Ausgangssperren-Modus aktiv\nNutzung wird protokolliert, stört nicht', es:'Modo toque de queda\nEl uso se registra sin molestar', ru:'Режим комендантского часа\nИспользование записывается без уведомлений' },

  // Report
  'report.greeting': { zh:'早上好', en:'Good Morning', ja:'おはようございます', ko:'좋은 아침', fr:'Bonjour', de:'Guten Morgen', es:'Buenos días', ru:'Доброе утро' },
  'report.week':     { zh:'📅 本周', en:'📅 This Week', ja:'📅 今週', ko:'📅 이번 주', fr:'📅 Cette semaine', de:'📅 Diese Woche', es:'📅 Esta semana', ru:'📅 Эта неделя' },
  'report.stats':    { zh:'🏆 统计', en:'🏆 Stats', ja:'🏆 統計', ko:'🏆 통계', fr:'🏆 Statistiques', de:'🏆 Statistiken', es:'🏆 Estadísticas', ru:'🏆 Статистика' },
  'report.bedtime':  { zh:'就寝', en:'Bedtime', ja:'就寝', ko:'취침', fr:'Coucher', de:'Schlafenszeit', es:'Acostarse', ru:'Ко сну' },
  'report.wakeup':   { zh:'起床', en:'Wake up', ja:'起床', ko:'기상', fr:'Réveil', de:'Aufstehen', es:'Despertar', ru:'Просыпание' },
  'report.compliant':{ zh:'✅ 达标', en:'✅ Compliant', ja:'✅ 達成', ko:'✅ 달성', fr:'✅ Conforme', de:'✅ Erfolgreich', es:'✅ Cumplido', ru:'✅ Выполнено' },
  'report.note':     { zh:'📝 备注', en:'📝 Note', ja:'📝 メモ', ko:'📝 메모', fr:'📝 Note', de:'📝 Notiz', es:'📝 Nota', ru:'📝 Заметка' },
  'report.streak':   { zh:'🔥 连续天数', en:'🔥 Streak', ja:'🔥 連続日数', ko:'🔥 연속 일수', fr:'🔥 Série', de:'🔥 Serie', es:'🔥 Racha', ru:'🔥 Серия' },
  'report.longest':  { zh:'📈 最长连续', en:'📈 Longest', ja:'📈 最長連続', ko:'📈 최장 연속', fr:'📈 Record', de:'📈 Rekord', es:'📈 Récord', ru:'📈 Рекорд' },
  'report.curfew': { zh:'打卡', en:'Check-in', ja:'チェックイン', ko:'체크인', fr:'Pointage', de:'Check-in', es:'Registro', ru:'Отметка' },
  'report.total':    { zh:'📋 总记录天数', en:'📋 Total Days', ja:'📋 総記録日数', ko:'📋 총 기록 일수', fr:'📋 Total jours', de:'📋 Gesamttage', es:'📋 Días totales', ru:'📋 Всего дней' },

  // Calendar
  'calendar.title': { zh:'日历', en:'Calendar', ja:'カレンダー', ko:'달력', fr:'Calendrier', de:'Kalender', es:'Calendario', ru:'Календарь' },
  'calendar.empty': { zh:'当日无记录', en:'No records', ja:'記録なし', ko:'기록 없음', fr:'Aucune donnée', de:'Keine Daten', es:'Sin datos', ru:'Нет записей' },
  'calendar.ad':    { zh:'泰国乳胶枕·限时7折', en:'Thai Latex Pillow · 30% OFF', ja:'タイ製ラテックス枕·30%OFF', ko:'태국 라텍스 베개·30% 할인', fr:'Oreiller latex Thaï · -30%', de:'Thai-Latexkissen · 30% Rabatt', es:'Cojín látex Tailandia · 30% OFF', ru:'Подушка из латекса · скидка 30%' },

  // Achievements
  'goal.title':     { zh:'🏆 成就', en:'🏆 Achievements', ja:'🏆 実績', ko:'🏆 업적', fr:'🏆 Objectifs', de:'🏆 Erfolge', es:'🏆 Logros', ru:'🏆 Достижения' },
  'goal.badges':    { zh:'徽章', en:'Badges', ja:'バッジ', ko:'뱃지', fr:'Badges', de:'Abzeichen', es:'Insignias', ru:'Значки' },
  'goal.ad':        { zh:'夜间助眠音乐·免费试听', en:'Sleep Music · Free Trial', ja:'睡眠音楽·無料試聴', ko:'수면 음악·무료 체험', fr:'Musique sommeil · Gratuit', de:'Schlafmusik · Kostenlos', es:'Música para dormir · Prueba', ru:'Музыка для сна · Бесплатно' },

  // Settings
  'settings.title':  { zh:'⚙️ 设置', en:'⚙️ Settings', ja:'⚙️ 設定', ko:'⚙️ 설정', fr:'⚙️ Paramètres', de:'⚙️ Einstellungen', es:'⚙️ Ajustes', ru:'⚙️ Настройки' },
  'settings.theme':  { zh:'🎨 主题', en:'🎨 Theme', ja:'🎨 テーマ', ko:'🎨 테마', fr:'🎨 Thème', de:'🎨 Design', es:'🎨 Tema', ru:'🎨 Тема' },
  'settings.language':{zh:'🌐 语言', en:'🌐 Language', ja:'🌐 言語', ko:'🌐 언어', fr:'🌐 Langue', de:'🌐 Sprache', es:'🌐 Idioma', ru:'🌐 Язык' },
  'settings.auto':   { zh:'日夜自动切换', en:'Auto Switch', ja:'自動切替', ko:'자동 전환', fr:'Auto jour/nuit', de:'Automatisch', es:'Auto día/noche', ru:'Авто переключение' },
  'settings.auto.desc':{zh:'白天亮色 · 夜晚深色', en:'Light by day · Dark by night', ja:'昼は明るく·夜は暗く', ko:'낮에는 밝게·밤에는 어둡게', fr:'Clair le jour · sombre la nuit', de:'Hell am Tag · dunkel bei Nacht', es:'Claro de día · oscuro de noche', ru:'Светлая днем · темная ночью' },
  'settings.customize':{zh:'自定义', en:'Customize', ja:'カスタマイズ', ko:'사용자 정의', fr:'Personnaliser', de:'Anpassen', es:'Personalizar', ru:'Настроить' },
  'settings.export': { zh:'📤 导出主题', en:'📤 Export Theme', ja:'📤 テーマ出力', ko:'📤 테마 내보내기', fr:'📤 Exporter', de:'📤 Exportieren', es:'📤 Exportar', ru:'📤 Экспорт' },
  'settings.import': { zh:'📥 导入主题', en:'📥 Import Theme', ja:'📥 テーマ読込', ko:'📥 테마 가져오기', fr:'📥 Importer', de:'📥 Importieren', es:'📥 Importar', ru:'📥 Импорт' },
  'settings.pref':   { zh:'偏好', en:'Preferences', ja:'設定', ko:'기본 설정', fr:'Préférences', de:'Einstellungen', es:'Preferencias', ru:'Настройки' },
  'settings.bedtime.target':{zh:'🌙 目标就寝', en:'🌙 Bedtime Goal', ja:'🌙 目標就寝時間', ko:'🌙 목표 취침', fr:'🌙 Heure coucher', de:'🌙 Schlafenszeit', es:'🌙 Hora dormir', ru:'🌙 Время ко сну' },
  'settings.wakeup.target':{zh:'☀️ 目标起床', en:'☀️ Wake-up Goal', ja:'☀️ 目標起床時間', ko:'☀️ 목표 기상', fr:'☀️ Heure réveil', de:'☀️ Aufstehzeit', es:'☀️ Hora despertar', ru:'☀️ Время подъема' },
  'settings.notification':{zh:'🔔 睡前提醒', en:'🔔 Bedtime Reminder', ja:'🔔 就寝リマインダー', ko:'🔔 취침 알림', fr:'🔔 Rappel coucher', de:'🔔 Erinnerung', es:'🔔 Recordatorio', ru:'🔔 Напоминание' },
  'settings.custom.color':  { zh:'颜色', en:'Color', ja:'色', ko:'색상', fr:'Couleur', de:'Farbe', es:'Color', ru:'Цвет' },
  'settings.custom.button': { zh:'按钮', en:'Button', ja:'ボタン', ko:'버튼', fr:'Bouton', de:'Tasten', es:'Botón', ru:'Кнопка' },
  'settings.custom.companion':{zh:'伙伴', en:'Companion', ja:'仲間', ko:'동반자', fr:'Compagnon', de:'Begleiter', es:'Compañero', ru:'Компаньон' },
  'settings.custom.font':  { zh:'字体', en:'Font', ja:'フォント', ko:'글꼴', fr:'Police', de:'Schriftart', es:'Fuente', ru:'Шрифт' },
  'settings.custom.sound': { zh:'音效', en:'Sound', ja:'サウンド', ko:'사운드', fr:'Son', de:'Klang', es:'Sonido', ru:'Звук' },
  'settings.custom.animation':{zh:'动效', en:'Animation', ja:'アニメーション', ko:'애니메이션', fr:'Animation', de:'Animation', es:'Animación', ru:'Анимация' },
  'settings.custom.background':{zh:'背景', en:'Background', ja:'背景', ko:'배경', fr:'Arrière-plan', de:'Hintergrund', es:'Fondo', ru:'Фон' },
  'settings.density':  { zh:'📊 密度', en:'📊 Density', ja:'📊 密度', ko:'📊 밀도', fr:'📊 Densité', de:'📊 Dichte', es:'📊 Densidad', ru:'📊 Плотность' },
  'settings.custom.upload':{zh:'点击上传照片作为背景', en:'Tap to upload a photo', ja:'タップして写真を選択', ko:'탭하여 사진 업로드', fr:'Choisir une photo', de:'Foto auswählen', es:'Elige una foto', ru:'Выберите фото' },
  'settings.custom.upload.hint':{zh:'自动叠加暗色遮罩 + 模糊', en:'Auto dark overlay + blur', ja:'自動で暗色マスク+ぼかし', ko:'자동 어두운 오버레이 + 블러', fr:'Masque sombre + flou auto', de:'Automatische Überlagerung', es:'Superposición oscura + desenfoque', ru:'Авто затемнение + размытие' },
  'settings.font.size':{zh:'字体大小', en:'Font Size', ja:'フォントサイズ', ko:'글꼴 크기', fr:'Taille police', de:'Schriftgröße', es:'Tamaño fuente', ru:'Размер шрифта' },
  'settings.font.small':{zh:'小', en:'Small', ja:'小', ko:'작게', fr:'Petite', de:'Klein', es:'Pequeño', ru:'Маленький' },
  'settings.font.medium':{zh:'中', en:'Medium', ja:'中', ko:'중간', fr:'Moyenne', de:'Mittel', es:'Medio', ru:'Средний' },
  'settings.font.large':{zh:'大', en:'Large', ja:'大', ko:'크게', fr:'Grande', de:'Groß', es:'Grande', ru:'Большой' },
  'settings.sound.bedtime':{zh:'🌙 睡前', en:'🌙 Bedtime', ja:'🌙 就寝時', ko:'🌙 취침 시', fr:'🌙 Coucher', de:'🌙 Schlafenszeit', es:'🌙 Al dormir', ru:'🌙 Ко сну' },
  'settings.sound.wakeup':{zh:'☀️ 起床', en:'☀️ Wake-up', ja:'☀️ 起床時', ko:'☀️ 기상 시', fr:'☀️ Réveil', de:'☀️ Aufstehen', es:'☀️ Al despertar', ru:'☀️ Подъем' },
  'settings.sound.feedback':{zh:'🔊 反馈', en:'🔊 Feedback', ja:'🔊 フィードバック', ko:'🔊 피드백', fr:'🔊 Retour', de:'🔊 Rückmeldung', es:'🔊 Retroalimentación', ru:'🔊 Отклик' },
  'settings.animation.reduced':{zh:'减弱动效', en:'Reduced Motion', ja:'動きを減らす', ko:'움직임 줄이기', fr:'Mouvement réduit', de:'Weniger Bewegung', es:'Movimiento reducido', ru:'Уменьшить анимацию' },
  'settings.animation.smooth':{zh:'流畅', en:'Smooth', ja:'スムーズ', ko:'부드럽게', fr:'Fluide', de:'Flüssig', es:'Suave', ru:'Плавно' },
  'settings.on':{zh:'已开启', en:'On', ja:'オン', ko:'켜짐', fr:'Activé', de:'An', es:'Activado', ru:'Вкл' },
  'settings.off':{zh:'已关闭', en:'Off', ja:'オフ', ko:'꺼짐', fr:'Désactivé', de:'Aus', es:'Desactivado', ru:'Выкл' },
  'settings.sound.rain':{zh:'雨声', en:'Rain', ja:'雨音', ko:'빗소리', fr:'Pluie', de:'Regen', es:'Lluvia', ru:'Дождь' },
  'settings.sound.ocean':{zh:'海浪', en:'Ocean', ja:'波の音', ko:'파도 소리', fr:'Océan', de:'Meer', es:'Océano', ru:'Океан' },
  'settings.sound.forest':{zh:'森林', en:'Forest', ja:'森の音', ko:'숲 소리', fr:'Forêt', de:'Wald', es:'Bosque', ru:'Лес' },
  'settings.sound.whitenoise':{zh:'白噪音', en:'White Noise', ja:'ホワイトノイズ', ko:'백색 잡음', fr:'Bruit blanc', de:'Weißes Rauschen', es:'Ruido blanco', ru:'Белый шум' },
  'settings.sound.fire':{zh:'篝火', en:'Bonfire', ja:'焚き火', ko:'모닥불', fr:'Feu de camp', de:'Lagerfeuer', es:'Hoguera', ru:'Костёр' },
  'settings.sound.piano':{zh:'钢琴', en:'Piano', ja:'ピアノ', ko:'피아노', fr:'Piano', de:'Klavier', es:'Piano', ru:'Пианино' },
  'settings.sound.birds':{zh:'鸟鸣', en:'Birds', ja:'鳥のさえずり', ko:'새소리', fr:'Oiseaux', de:'Vögel', es:'Pájaros', ru:'Птицы' },
  'settings.sound.meditation':{zh:'冥想钟', en:'Meditation Bell', ja:'瞑想の鐘', ko:'명상 종', fr:'Cloche méditation', de:'Meditationsglocke', es:'Campana meditación', ru:'Колокол медитации' },
  'settings.sound.gentle':{zh:'渐进铃', en:'Gentle Chime', ja:'優しいチャイム', ko:'부드러운 차임', fr:'Carillon doux', de:'Sanfter Klang', es:'Campanilla suave', ru:'Нежный звон' },
  'settings.sound.chord':{zh:'和弦', en:'Chord', ja:'コード', ko:'코드', fr:'Accord', de:'Akkord', es:'Acorde', ru:'Аккорд' },
  'settings.sound.ding':{zh:'叮咚', en:'Ding', ja:'ディン', ko:'딩', fr:'Ding', de:'Ding', es:'Ding', ru:'Динь' },

  // Language names
  'lang.zh': { zh:'中文', en:'Chinese', ja:'中国語', ko:'중국어', fr:'Chinois', de:'Chinesisch', es:'Chino', ru:'Китайский' },
  'lang.en': { zh:'英语', en:'English', ja:'英語', ko:'영어', fr:'Anglais', de:'Englisch', es:'Inglés', ru:'Английский' },
  'lang.ja': { zh:'日语', en:'Japanese', ja:'日本語', ko:'일본어', fr:'Japonais', de:'Japanisch', es:'Japonés', ru:'Японский' },
  'lang.ko': { zh:'韩语', en:'Korean', ja:'韓国語', ko:'한국어', fr:'Coréen', de:'Koreanisch', es:'Coreano', ru:'Корейский' },
  'lang.fr': { zh:'法语', en:'French', ja:'フランス語', ko:'프랑스어', fr:'Français', de:'Französisch', es:'Francés', ru:'Французский' },
  'lang.de': { zh:'德语', en:'German', ja:'ドイツ語', ko:'독일어', fr:'Allemand', de:'Deutsch', es:'Alemán', ru:'Немецкий' },
  'lang.es': { zh:'西班牙语', en:'Spanish', ja:'スペイン語', ko:'스페인어', fr:'Espagnol', de:'Spanisch', es:'Español', ru:'Испанский' },
  'lang.ru': { zh:'俄语', en:'Russian', ja:'ロシア語', ko:'러시아어', fr:'Russe', de:'Russisch', es:'Ruso', ru:'Русский' },

  // Settings background
  'settings.bg.set':      { zh:'背景已设置', en:'Background set', ja:'背景設定済み', ko:'배경 설정됨', fr:'Fond défini', de:'Hintergrund gesetzt', es:'Fondo establecido', ru:'Фон установлен' },
  'settings.bg.reset':    { zh:'恢复默认', en:'Reset default', ja:'デフォルトに戻す', ko:'기본값 복원', fr:'Réinitialiser', de:'Zurücksetzen', es:'Restablecer', ru:'Сбросить' },
  'settings.bg.intensity':{ zh:'遮罩强度', en:'Overlay intensity', ja:'マスク強度', ko:'오버레이 강도', fr:'Intensité', de:'Überlagerung', es:'Intensidad', ru:'Прозрачность' },
  'report.health': { zh:'健康生活', en:'Health Score', ja:'健康スコア', ko:'건강 점수', fr:'Score santé', de:'Gesundheit', es:'Salud', ru:'Здоровье' },
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
};


export function tr(key: string, lang: Lang): string {
  const row = t[key];
  if (!row) return key;
  // Exact match
  if (row[lang]) return row[lang];
  // zh-Hant: convert zh (simplified) to traditional
  if (lang === 'zh-Hant' && row['zh']) {
    let s = row['zh'];
    let out = '';
    for (const ch of s) {
      out += S2T[ch] || ch;
    }
    return out;
  }
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
