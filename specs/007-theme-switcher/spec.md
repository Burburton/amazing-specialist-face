# Feature: Theme Switcher

## Metadata
```yaml
feature_id: 007-theme-switcher
status: completed
created: 2026-04-05
author: architect
based_on: 006-global-search
```

## 1. Problem Statement

### Current State

- 当前主题跟随系统偏好 (`prefers-color-scheme`)
- 用户无法手动切换 Light/Dark 模式
- 夜间浏览深色内容可能需要浅色模式，反之亦然

### User Impact

1. **用户偏好无法持久化**：每次访问都跟随系统
2. **场景受限**：无法根据环境光选择最佳模式
3. **无控制感**：用户期望能自主控制界面外观

---

## 2. Goal

### Primary Goal

实现 Light/Dark 主题切换功能，支持：
- 手动切换主题
- 自动检测系统偏好
- 用户偏好持久化

### Success Criteria

1. **手动切换**：Header 提供 ThemeToggle 按钮
2. **三种模式**：Light / Dark / System (跟随系统)
3. **持久化**：用户选择保存到 localStorage
4. **无闪烁**：页面加载时立即应用主题，无闪烁

---

## 3. Theme Strategy

### 主题模式

| Mode | Behavior |
|------|----------|
| `light` | 强制浅色模式 |
| `dark` | 强制深色模式 |
| `system` | 跟随系统偏好 (default) |

### CSS 实现

使用 `data-theme` 属性在 `<html>` 元素：

```html
<html data-theme="dark">
<html data-theme="light">
<html data-theme="system">
```

CSS 优先级：
1. `data-theme="dark"` → 强制深色
2. `data-theme="light"` → 强制浅色
3. `data-theme="system"` 或无属性 → 跟随 `prefers-color-scheme`

---

## 4. Component Specifications

### 4.1 ThemeToggle Component

**位置**: Header 右侧，SearchTrigger 旁边

**UI**:
```
┌──────────────────────────┐
│  🌙 / ☀️ / 💻            │  ← 图标根据当前主题变化
│  (下拉菜单)               │
│  ┌────────────────────┐  │
│  │ ☀️ Light           │  │
│  │ 🌙 Dark            │  │
│  │ 💻 System          │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

**图标映射**:
| 当前有效主题 | 显示图标 |
|-------------|----------|
| Light | ☀️ |
| Dark | 🌙 |
| System (实际 dark) | 🌙 |
| System (实际 light) | ☀️ |

---

### 4.2 useTheme Hook

```typescript
interface UseThemeResult {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';  // 实际应用的主题
}

export function useTheme(): UseThemeResult;
```

---

## 5. Implementation Scope

### In Scope

1. **ThemeToggle** - Header 主题切换按钮
2. **useTheme Hook** - 主题状态管理
3. **CSS 变量扩展** - 支持 `data-theme` 属性切换
4. **localStorage 持久化**
5. **无闪烁初始化** - 在 `<head>` 中注入脚本

### Out of Scope

1. **更多主题**（仅 Light/Dark）
2. **主题自定义**（颜色调整）
3. **主题预览**（切换前预览）

---

## 6. Acceptance Criteria

### AC-001: useTheme Hook
- [ ] 支持 light/dark/system 三种模式
- [ ] resolvedTheme 返回实际应用的主题
- [ ] localStorage 持久化正确
- [ ] 初始化时读取 localStorage

### AC-002: ThemeToggle Component
- [ ] 显示当前主题图标
- [ ] 点击展开下拉菜单
- [ ] 选择主题后立即切换
- [ ] 下拉菜单点击外部关闭

### AC-003: CSS 主题切换
- [ ] data-theme="dark" 强制深色
- [ ] data-theme="light" 强制浅色
- [ ] data-theme="system" 跟随系统
- [ ] 切换时无闪烁

### AC-004: Header 集成
- [ ] ThemeToggle 显示在 Header
- [ ] 移动端适配

### AC-005: 构建验证
- [ ] `npm run build` 无错误
- [ ] TypeScript 类型正确

---

## 7. Technical Approach

### CSS 变量覆盖

```css
/* 默认 dark (已在 tokens.css) */
:root {
  --color-background: #09090b;
  /* ... dark tokens ... */
}

/* Light 模式 */
[data-theme="light"] {
  --color-background: #fafafa;
  --color-surface: #ffffff;
  /* ... light tokens ... */
}

/* Dark 模式 (显式设置时覆盖 media query) */
[data-theme="dark"] {
  --color-background: #09090b;
  /* ... dark tokens ... */
}

/* System 模式 - 跟随 media query */
[data-theme="system"] {
  /* 不覆盖，让 media query 生效 */
}
```

### 无闪烁初始化

在 `index.html` 的 `<head>` 中添加：

```html
<script>
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    if (theme !== 'system') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  })();
</script>
```

---

## 8. Risks / Tradeoffs

| ID | Risk | Mitigation |
|----|------|------------|
| R-001 | localStorage 不可用 | 降级到 system 模式 |
| R-002 | SSR hydration mismatch | 仅客户端渲染 ThemeToggle |

---

## 9. References

- `src/styles/tokens.css` - 现有设计令牌
- `src/components/common/Header.tsx` - Header 结构
- next-themes - 参考实现