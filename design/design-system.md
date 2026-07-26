# 早睡系统 · UI 设计规范 & 组件库

> 所有 4 套主题 + 自定义组合共享同一套布局、间距、组件标准。
> 差异只在于 Theme 对象的颜色/圆角/氛围值。

---

## 统一画布

| 项目 | 值 |
|------|----|
| 手机画布 | 380 × 740px |
| 圆角 | 44pt（外框） |
| 状态栏 | 44pt |
| 底部导航 | 64pt |
| 页面 padding | 20pt（水平） |
| 间距系统 | 8pt 网格 |

---

## 组件库

### 核心按钮

| 状态 | 样式 |
|------|------|
| 主按钮（睡觉） | 渐变背景，44pt 高，14pt 圆角，17pt font-weight 600 |
| 次按钮（起床） | 半透明背景，1px 边框，44pt 高 |
| 宠物按钮 | 猫爪/熊掌/猫头鹰/星星 + emoji 装饰 |

### 统计卡片

3 列等宽，圆角 12pt，统计数值 22pt weight 700，标签 10pt uppercase。

### 记录卡片

标题行 12pt uppercase，每行 44pt 高，圆点 8pt，标签 13pt，时间 11pt。

### 底部导航

4 项，触控区域 44×44pt，图标 22pt，标签 9pt，活跃态主色。

### 广告位

| 类型 | 尺寸 | 特点 |
|------|------|------|
| Banner | 通栏 40pt | 圆角 10pt，左上标"广告" |
| 信息流 | 与列表行一致 | 右上标"广告"，外观融合 |
| 激励/视频 | 通栏 80pt | 居中图标，底部按钮 |

---

## 4 套预设主题色板

| Token | A: Dark Precision | B: Warm Night | C: Nature Calm | D: Minimal Light |
|-------|------------------|--------------|---------------|-----------------|
| 背景 | `#08090a` | `#120c1a→#1e1630` | `#0c140e→#102014` | `#ffffff` |
| 卡片 | `rgba(255,255,255,0.02)` | `rgba(200,180,230,0.04)` | `rgba(80,180,100,0.04)` | `#faf9f7` |
| 主色 | `#7170ff` | `#b8a0e0` | `#80d890` | `#6c5ce7` |
| 文字 | `#f7f8f8` | `#f0ece4` | `#e0efe0` | `#2c2c2c` |
| 次要 | `#8a8f98` | `#8a7a9a` | `#6a8a6a` | `#9a9a9a` |
| 边框 | `rgba(255,255,255,0.06)` | `rgba(200,180,230,0.08)` | `rgba(80,180,100,0.08)` | `#eeece8` |
| 圆角 | 12-14pt | 16-18pt | 14-16pt | 12-14pt |

---

## 8 个主题自定义维度

见 `theme-customization.md`，UI 效果见 `sketches/000-showcase/`。

---

## React Native 实现

```typescript
interface ThemeConfig {
  preset?: 'dark-precision' | 'warm-night' | 'nature-calm' | 'minimal-light';
  colors: {
    primary, background, backgroundGradient, surface, surfaceBlur, text, textSecondary, success, warning, error
  };
  button: {
    style: 'rounded' | 'pill' | 'sharp' | 'pet' | 'glow' | 'outline' | '3d';
    petType?: 'cat' | 'bear' | 'owl' | 'star';
  };
  companion: { type: 'plant' | 'flower' | 'cactus' | 'cat' | 'owl' | 'ocean' | 'star'; currentStage: number };
  background: { type: 'color' | 'gradient' | 'photo' | 'animated' | 'texture'; photoPath?: string; blur?: number; overlay?: number };
  sound: { bedtime?: string; wakeup?: string; feedback?: string };
  font: 'system' | 'rounded' | 'serif' | 'handwrite' | 'mono';
  density: 'comfortable' | 'compact' | 'minimal';
  animation: 'smooth' | 'reduced' | 'playful' | 'none';
}

// ThemeProvider 包裹整个 App
// 所有组件通过 useTheme() 获取当前颜色/尺寸/字体
// 预设主题 = 4 个预填充的 ThemeConfig 对象
// 自定义 = 用户修改任意字段 → 合并到当前 theme
```
