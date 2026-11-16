/*
  作者：倪铭浩
  建立时间：2026-11-12 13:46
  使用模型：GLM-5.3-Flash
  功能名称及简介：server.js —— 诗词数据服务器
  读取同目录 db.json 中 poems 数组（pic / title / content），
  通过 GET /api/poems 以 JSON 返回给前端「上图下文」页面，端口 3004。
*/
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3004;

/* 允许跨域：前端页面（如 8321 端口的静态服务器或本地文件）访问本服务时不受同源策略限制 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/* 静态提供 imgs 目录下的图片，供 poems 的 pic 字段访问（如 /imgs/6.jpg） */
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

/* GET /api/poems —— 读取 db.json 并返回 poems 数组 */
app.get('/api/poems', (req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    const data = JSON.parse(raw);
    res.json(data.poems);
  } catch (err) {
    res.status(500).json({ error: '读取 db.json 失败', detail: err.message });
  }
});

/* GET /api/authors —— 从 poems 数据中提取去重后的作者列表（含作品数） */
app.get('/api/authors', (req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    const poems = JSON.parse(raw).poems;
    /* 用 reduce 按作者归组，统计每位作者的作品数量 */
    const map = {};
    poems.forEach(p => {
      map[p.author] = (map[p.author] || 0) + 1;
    });
    const authors = Object.keys(map).map(name => ({ name, works: map[name] }));
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: '读取 db.json 失败', detail: err.message });
  }
});

/* 首页提示，便于在浏览器直接确认服务已启动 */
app.get('/', (req, res) => {
  res.send('诗词数据服务器运行中，数据接口：/api/poems');
});

app.listen(PORT, () => {
  console.log(`诗词数据服务器已启动：http://localhost:${PORT}/api/poems`);
});
