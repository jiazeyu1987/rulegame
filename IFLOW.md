# 项目概述

这是一个基于 React + TypeScript + Vite 构建的寝室规则怪谈文字冒险游戏。玩家扮演不同职业的角色，在一个充满诡异规则的寝室中生存，通过选择不同的行动来推进剧情并尝试达成通关条件。

## 核心功能

- **角色扮演**：玩家可以选择不同的职业（学生、老人、残疾人、律师、医生等），每个职业可能有不同的初始属性。
- **规则系统**：游戏中存在多张规则纸条，玩家可以标记规则的真假状态，这些规则会影响游戏进程。
- **属性系统**：角色具有时间、饱食度、体力、理智值、智力、力量、速度、运气等属性，不同选择会影响这些属性。
- **剧情分支**：根据玩家的选择，游戏会进入不同的故事段落，产生多种可能的结局。
- **通关条件**：游戏设定了S、A、B、C四个等级的通关条件，玩家需要根据规则和属性管理来达成目标。

## 技术栈

- React 19
- TypeScript
- Vite
- CSS Modules (推测)

# 构建和运行

## 环境要求

- Node.js (版本未明确指定，但项目使用了较新的React版本，建议使用Node 16+)

## 安装依赖

```bash
npm install
```

## 开发运行

```bash
npm run dev
```

这将启动Vite开发服务器，通常在 http://localhost:5173 上访问。

## 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 预览生产构建

```bash
npm run preview
```

## 代码检查

```bash
npm run lint
```

# 项目结构

```
rules-kill-react/
├── src/
│   ├── components/
│   │   ├── game/          # 游戏核心组件
│   │   └── rules/         # 规则相关组件
│   ├── types/             # TypeScript 类型定义
│   ├── assets/            # 静态资源
│   ├── styles/            # 全局样式
│   ├── App.tsx            # 主应用组件
│   └── main.tsx           # 应用入口
├── public/                # 静态公共资源
├── 甜蜜之家/               # 项目相关文档（中文）
└── ...                    # 配置文件等
```

# 开发约定

## 组件开发

- 使用 TypeScript 进行类型安全开发
- 组件采用函数式组件 (Functional Components) 配合 React Hooks
- 组件文件命名采用 PascalCase，如 `GameHeader.tsx`
- 组件内部样式使用 CSS 类名，避免内联样式

## 状态管理

- 使用 React 内置的 useState 进行组件状态管理
- 游戏核心状态集中在 App.tsx 组件中
- 通过 props 向下传递状态和回调函数

## 样式规范

- 使用 CSS 类名进行样式定义
- 避免使用内联样式，除非是动态计算的样式（如进度条宽度）
- 样式类名采用 kebab-case 命名规范

## 类型安全

- 所有组件和函数都应有明确的 TypeScript 类型定义
- 类型定义统一放在 `src/types` 目录下
- 使用接口 (interface) 定义对象结构，使用类型别名 (type) 定义联合类型

## 代码组织

- 游戏逻辑和数据集中在 `App.tsx`
- UI 组件按功能模块划分到 `components` 目录下
- 静态数据（如规则、剧情）在 `App.tsx` 中定义
- 事件处理函数命名采用动词开头，如 `handleTestSubmit`, `toggleRuleMark`