---
layout:     post
title:      "interface 还是 type?"
subtitle:   "“TypeScript进阶用法”"
date:       2023-12-14
author:     "Lyuminghui"
header-img: "/img/for-post/TypeScript-cover.jpg"
tags:
    - 2023
    - TypeScript
    - 精选
---

# 1. Type Assertions断言
在编译阶段，断言会被删除,但在开发阶段可以指定变量为更具体或更不具体的值。
```
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
type name = string | number

```

# 2.类型推断
```
let a = 13;//因为用let = 声明，所以后期可能会是别的number，因此被推断为a:number
a = 14;// ✅

let b : 13 = 13;//因为用let:声明，被推断为字面量13，后续不能赋值为别的数字
b = 14;// ❌
```

# 3. implements执行接口
类不能直接扩展接口，而应该是implements执行
```typescript
interface Person{
    name:string,
    age:number
}

class P implements Person{
    name:string;
    age:number;
    constructor(name:string, age:number){
        //...
    }
}
```

# 4.模块化
不同文件的ts代码都处于全局，会用重名风险。很早使用namescape组织和封装代码，但由于模块化（import export的出现，namescape很少使用了）
```

//model.ts,一个文件即为一个模块
export default model{
    name:'ming',
    age:34
}
export function call(){
    console.log('hi')
}

//按地址引用模块model.ts
import model, { call } from './model.ts'
```