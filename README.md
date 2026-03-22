# 姬圈属性隐藏人格测试

基于 `React + Vite + Tailwind CSS` 的沉浸式测试 H5，内置：

- 极简首页 + 两种模式入口
- 30 题尝鲜版 / 80 题完整版
- 本地 `3` 次测试机会限制
- 返回上一题 / 自动切换下一题
- 动态进度条 / 分析中加载动画 / 逐步解锁结果卡片
- 6 种人格原型计算逻辑
- 前端 Canvas 分享海报导出

## 本地运行

```bash
npm install
npm run dev
```

## 关键文件

- `src/App.tsx`：页面状态机、次数限制、测试流程、结果页交互
- `src/data/questionBank.ts`：30 + 80 题题库
- `src/data/questionBank.sample.json`：尝鲜版前 5 题 JSON 示例
- `src/lib/scoring.ts`：权重累加、人格映射、报告文本生成
- `src/lib/poster.ts`：分享海报导出

## 默认限制逻辑

- 首次进入默认 `3` 次机会
- 每次点击开始测试即消耗 `1` 次
- 次数持久化在 `localStorage`
