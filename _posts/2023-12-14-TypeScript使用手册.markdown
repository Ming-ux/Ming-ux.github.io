---
layout:     post
title:      "interface 还是 type?"
subtitle:   "“interface还是type两者非常相似，好像哪个都可以，但实际真的如此吗？”"
date:       2023-12-14
author:     "Lyuminghui"
header-img: "/img/for-post/TypeScript-cover.jpg"
tags:
    - 2023
    - TypeScript
    - 精选
---

# 1. interface 还是 type
interface与type非常相似，可用于自定义灵活的数据类型。下面介绍两者的相同和不同之处。

## 1.1 interface和type的相似性
### 1.1.1可定义obj结构
不像string、number、boolean等基础类型，工作中常使用结构shape多样的obj。interface和type在定义shape上几乎是一样的。(type需要多一个等号)
```typescript
interface obj1{
    name:string;
    age:number;
};

type obj2 = {
    name:string;
    age:number;
};
```

## 1.2 interface和type的差异
### 1.2.1 拓展类型时 写法不同
- interface使用`extends`
- type使用`&`

```typescript
type baseItem = {
    a:string;
}

interface obj1 extends baseItem{
    b:number;
};

type obj2 = baseItem & {
    c:number;
};
```

### 1.2.2 可更改性不同
- interface可重复声明，类型let
- type不可重复声明

```typescript

interface obj1 {
    a:number;
};
interface obj1 {
    b:string;
}//✅ obj{a:number, b:string}

type obj2 = {
    a:number;
};

type obj2 = {
    b:string;
}//报错：❌ 命名重复
```

### 1.2.3 type更灵活
- 联合类型
- 元组
- 基础类型别名
```typescript
type obj = number | string; //联合类型
type myArray = [number,string]; //元组
type myString = string; //基础类型别名
```

### 1.2.4 type报错可能会错报

```typescript
type myNumber = number;

const a: myNumber = 10;
const b: number = '20';  // 报错，在typescript4.2版本前可能报告错误在type myNumber,因为number同名牵涉。
```

# 2. 小结
- 约束obj的形状结构时，建议用`interface`。
- 其余涉及联合类型、元组、基础类型别名用`type`。