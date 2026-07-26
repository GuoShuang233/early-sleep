# 早睡系统 — 架构评估报告

> 基于 V4 方案的技术可行性评估

---

## 总体评价

**V4 方案在 Android 上完全可行，在 iOS 上有一个关键限制需要处理。**

---

## 评估逐项

### ✅ 1. React Native 跨平台

**结论：合适。**

RN 可以同时覆盖 Android、iOS、鸿蒙，一套 JS 代码处理 UI 层，各平台的能力差异通过 Native Module 桥接。

需要原生模块的地方：
- 读取 UsageStats（Android）
- 读取 ScreenTime（iOS）
- 读取 HealthKit / Health Connect
- Siri Shortcuts 集成
- App Actions 集成

这些在 RN 里都有成熟的社区插件或官方支持，不需要从零写。

---

### ⚠️ 2. iOS 宵禁检测 — 有坑

**这是整个架构里最大的风险点。**

V4 方案的核心是"读系统日志检测宵禁期间有没有用手机"。但在 iOS 上：

| 能力 | Android | iOS |
|------|---------|-----|
| 读取屏幕使用时间 | ✅ `UsageStatsManager` | ❌ **第三方 App 无权限** |
| 读取解锁记录 | ✅ | ❌ |
| 读取前台 App | ✅ | ❌ |
| 读取睡眠模式状态 | ✅ | ✅ `FocusStatus` |
| 读取系统睡眠数据 | ✅ Health Connect | ✅ HealthKit |
| 读取当前屏幕状态 | ✅ | ✅ |

**iOS 的 ScreenTime 权限体系：**
- Apple 的 ScreenTime API 主要为**家长控制**和**MDM** 设计
- 普通第三方 App **不能读取**用户的屏幕使用时间、App 使用时长、解锁次数
- 即使是用户授权了也不行——API 根本不对第三方开放

**iOS 上的替代方案：**

| 方案 | 可行性 | 说明 |
|------|--------|------|
| 读 HealthKit 睡眠数据 | ✅ 可行 | 如果有 Apple Watch 或 iPhone 睡眠模式，数据很准 |
| 读 Focus/Sleep 模式状态 | ✅ 可行 | 用户开启"睡眠专注模式"时能检测到 |
| 起床时检测屏幕状态 | ✅ 可行 | 点"起床了"那一下，检查屏幕是不是亮着 |
| 回溯检测整晚屏幕使用 | ❌ 不可行 | iOS 不允许第三方 App 干这个 |

**iOS 的最优策略：**
```
如果用户有 Apple Watch / 用系统睡眠模式：
  → 宵禁检测 = HealthKit 睡眠数据（有就是睡了）
  
如果用户没有：
  → 宵禁检测 = 基于"是否开启了睡眠专注模式"
  → + 起床时看一眼屏幕状态
  → + 用户自评（"昨晚放下手机了吗？"）
```

**Android 上照常：** `UsageStats.queryUsageStats()` 直接读出宵禁时段内的使用记录，精确到 App 级别。

---

### ✅ 3. Android UsageStats 权限

**结论：可行，用户手动授权一次。**

Android 的 `UsageStatsManager` 需要用户在 **设置 → 使用情况访问权限** 中手动开启。这不是敏感权限（不需要 Google Play 审核），但需要引导用户操作。

首次打开 App 时弹引导页，告诉用户去开，开一次就不用再管了。

---

### ✅ 4. HealthKit / Health Connect 读取

**结论：可行，可选权限。**

- iOS HealthKit：用户通过系统弹窗授权，可单选"睡眠"数据类型
- Android Health Connect：同样系统弹窗授权
- 用户不给也不影响核心功能（降级为用就寝-起床时间估算睡眠时长）

---

### ✅ 5. 本地 AI 分析

**结论：纯统计就够了，不需要 ML 框架。**

这个 App 的分析需求（平均值、趋势线、按星期几汇总、相关性）全部是基本数学运算，不需要 Core ML / ML Kit。后续如果要加"预测今晚几点睡"之类的功能，再用 ML 也不迟。

---

### ✅ 6. 语音打卡（Siri Shortcuts）

**结论：可行，稳定，但有学习成本。**

- Siri Shortcuts：成熟稳定，用户需要在 Shortcuts App 里添加一次快捷指令（App 可引导）
- Android App Actions：零配置，系统自动学习
- 小爱/小布/小艺：需要品牌开发者账号，可后补

---

### ✅ 7. 纯本地，无服务器

**结论：完全合适。**

习惯追踪类的 App 不需要服务器。数据存在手机上，用 SQLite 就够了。以后如果需要多设备同步再加也不迟。

---

## 架构调整建议

### 平台差异化检测策略

```
当用户打卡"我睡觉了"：

[Android]
  · 记录就寝时间
  · 第二天起床时 → 读 UsageStats（宵禁时间段的手机使用记录）
  · 读 Health Connect（如果有授权）
  → 完整的宵禁检测

[iOS]
  · 记录就寝时间
  · 检测是否开启了 Sleep Focus（专注模式）
  · 第二天起床时 → 检查当前屏幕状态
  · 读 HealthKit（如果有授权）
  · 补充问题："昨晚有看手机吗？"（自评）
  → 降级但仍有意义的宵禁检测
```

### 技术栈确认

| 层 | 选型 | 理由 |
|----|------|------|
| 跨平台框架 | React Native | 生态成熟，社区活跃 |
| 导航 | React Navigation | RN 标配 |
| 本地存储 | SQLite（react-native-sqlite-storage） | 离线、高效 |
| 图表 | react-native-chart-kit 或 victory-native | 趋势可视化 |
| Siri 集成 | react-native-siri-shortcuts | 社区插件 |
| UsageStats | 自定义 Native Module | Android 独有 |
| HealthKit | react-native-health | 成熟插件 |
| 状态管理 | Zustand（轻量） | 够用，不引入 Redux 的复杂度 |

---

## 结论

**架构没问题，可以开工。**

关键点就一个：**iOS 的宵禁检测比 Android 弱**，需要接受降级方案。这不是技术能解决的，是 Apple 的 API 限制。其他全部可行。

开工前我建议先定 UI 风格，再开始写代码。要看看 UI 设计方向吗？
