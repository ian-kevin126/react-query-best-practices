# react-query-best-practice

Explore React Query best practice with TypeScript in React.

# Mock 方案

## Mirage 
- mock数据：[jsonplaceholder](https://jsonplaceholder.typicode.com/?ref=testdev.tools&ref_type=adv&utm_campaign=TestDevTools&utm_medium=web&utm_source=TestDev.tools)
- [Mirage](https://miragejs.com/docs/getting-started/introduction/)

## json server mock

```shell
npm install -g json-server
```

根目录新建 db.json 文件。

启动 server：

```shell
json-server --watch db.json --port 8008
```

# 一键启动

```json
"start": "vite",
"mock_server": "json-server --watch db.json --port 8008",
"dev": "concurrently --kill-others \"npm run mock_server\" \"npm run start\"",
```

只需要指令 `pnpm run dev` 即可一键启动 mock 服务和项目。

# 推荐资源

- [Redux Took Kit Query in React](https://medium.com/readytowork-org/redux-took-kit-query-in-react-69220942f5e5)
- [Like react-query and redux? You'll love RTK Query](https://dev.to/esponges/like-react-query-and-redux-youll-love-rtk-query-1cge)