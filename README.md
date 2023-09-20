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