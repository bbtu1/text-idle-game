# 文字放置类游戏

这是一个基于文字的放置类游戏项目。玩家可以通过管理资源、建造建筑和解锁升级来发展自己的帝国。

## 功能特点

- 多种资源管理系统
- 自动化建筑系统
- 丰富的升级选项
- 存档系统
- 简洁的用户界面

## 安装说明

1. 克隆仓库：
```bash
git clone [repository-url]
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

## 项目结构

/text-idle-game
├── public/            # 静态资源
│   ├── index.html     # 主页面
│   ├── css/
│   │   └── style.css  # 主样式文件
│   └── assets/        # 图片/音效等资源
├── src/               # 源代码
│   ├── core/          # 游戏核心逻辑
│   │   ├── game-core.js   # 游戏主循环与核心逻辑
│   │   ├── resources.js   # 资源管理系统
│   │   ├── buildings.js   # 建筑系统
│   │   └── upgrades.js    # 升级系统
│   ├── ui/            # 界面相关
│   │   ├── ui-manager.js  # 界面更新控制
│   │   ├── panels/        # 各个界面面板
│   │   └── components/    # 可复用的UI组件
│   ├── data/          # 数据管理
│   │   ├── save-system.js # 存档系统
│   │   └── config.js      # 游戏配置数据
│   └── utils/         # 工具函数
│       └── helpers.js     # 通用辅助函数
├── docs/              # 项目文档
├── tests/             # 测试文件（可选）
├── .gitignore
├── package.json       # 项目配置
├── README.md          # 项目说明
└── server.js          # 简易开发服务器（可选）

## 开发指南

详细的开发文档请查看 `docs` 目录。

## 许可证

MIT 