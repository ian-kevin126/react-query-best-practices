# json server 教程

json-server 可以实现本地增删改查，满足基本测试使用

## 一.环境搭建

npm : [json server](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjson-server)

安装 : `npm install -g json-server`
帮助 : `json-server --help`
启动 : `json-server --watch db.json`

```shell
json-server --watch db.json
```

自动生成了 `db.json` 文件：

```json
{
    "posts": [
        {
            "id": 1,
            "title": "json-server",
            "author": "typicode"
        }
    ],
    "comments": [
        {
            "id": 1,
            "body": "some comment",
            "postId": 1
        }
    ],
    "profile": {
        "name": "typicode"
    }
}
```

修改端口 : `json-watch --watch db.json --port 3001`

## 二.数据请求

### 1.get(查)

- 根据 id 方式一：`http://localhost:3000/posts/1`

```json
{
    "id": 1,
    "title": "json-server",
    "author": "typicode"
}
```

- 根据 id 方式二：`http://localhost:3000/posts?id=1`

```json
[
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode"
    }
]
```

- 多个条件：·`http://localhost:3000/posts?id=1&title=json-server`

```json
[
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode"
    }
]
```

- `obj.key` 方式：`http://localhost:3000/posts?name.nickname=myName`

字段不存在的时候会返回全部数据

```json
[
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode",
        "name": {
            "nickname": "myName"
        }
    }
]
```

- 模糊搜索（全局）：`http://localhost:3000/posts?q=json-server`

```json
[
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode",
        "name": {
            "nickname": "myName"
        }
    },
    {
        "id": 2,
        "title": "json-server2",
        "author": "typicode2"
    }
]
```

- `_page _limit` 分页搜索
  - _page 设置页码
  - _limit 控制每页显示的条数（默认 10）
  `http://localhost:3000/posts?_page=1&_limit=2`

- `_sort _order` 排序
  - `_sort` 指定字段
  - `_order` 设置升序降序（默认升序 asc）`[asc\desc]`
    `http://localhost:3000/posts?_sort=id&_order=2`

- `_start _end _limit` 截取
  `_start`开始索引 `_end` 结束索引 `_limit` 从开始索引向后取的个数
  - `http://localhost:3000/posts?_start=0&_end=5`
  - `http://localhost:3000/posts?_start=0&_limit=5`

- `_gte _lte` 取值范围
  `_gte` 大于等于 `_lte` 小于等于
  `http://localhost:3000/posts?id_gte=3&_lte=5`

- `_ne` 非
  `_ne` 排除 `id = 1` 的数据
  `http://localhost:3000/posts?id_ne=1`
  `http://localhost:3000/posts?id_ne=1&id_ne=2`

- `_like` 模糊：`http://localhost:3000/posts?id_like=1`

- 关联查询：`http://localhost:3000/posts/1/comments`

```json
[
    {
        "id": 1,
        "body": "some comment",
        "postId": 1
    }
]
```

`_embed _expand` 关系拼装(注意单词复数和单数)
`_embed`包含子资源 `_expand`包含父资源
`http://localhost:3000/posts?_embed=comments`

```json
[
    {
        "id": 1,
        "title": "json-server",
        "author": "typicode",
        "name": {
            "nickname": "myName"
        },
        "comments": [
            {
                "id": 1,
                "body": "some comment",
                "postId": 1
            }
        ]
    },
    {
        "id": 2,
        "title": "json-server2",
        "author": "typicode2",
        "comments": []
    }
]
```

`http://localhost:3000/comments?_expand=post`

```json
[
    {
        "id": 1,
        "body": "some comment",
        "postId": 1,
        "post": {
            "id": 1,
            "title": "json-server",
            "author": "typicode",
            "name": {
                "nickname": "myName"
            }
        }
    }
]
```

### 2.post(增)

```js
const params = {
    id: 3, // id 可不传 , 自动生成
    title: "json-server3",
    author: "typicode3",
};
axios.post("http://localhost:3000/posts", params).then((res) => {
    console.log(res.data); // 返回params的数据
});
```

### 3.delete(删)

```js
axios.delete("http://localhost:3000/posts/3").then((res) => {
    console.log(res.data);
});
```

### 4.put、patch(改)

put 全覆盖,不传的字段会被删掉

```js
const params = {
    title: "json-server333",
    author: "typicode333",
};
axios.put("http://localhost:3000/posts/3", params).then((res) => {
    console.log(res.data);
});
```

patch 存在则修改，不存在则新增

```js
const params = {
    title: "json-server333-patch",
    // author: "typicode333",
};
axios.patch("http://localhost:3000/posts/3", params).then((res) => {
    console.log(res.data);
});
```

## 三.静态资源

静态资源包含 html、css 、js 、图片、视频等资源。根目录新建 `json-server-config.json`

```json
{
    "port": 3000,
    "watch": true,
    "static": "./public",
    "read-only": false,
    "no-cors": true,
    "no-gzip": false
}
```

重启服务，可以直接访问根目录public下面的静态文件

- `http://localhost:3000/test.html`
- `http://localhost:3000/test.png`
