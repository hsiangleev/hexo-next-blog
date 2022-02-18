---
title: mongodb操作命令
date: 2019/01/29 10:46:28
tags: mongodb
categories: mongodb
excerpt: mongodb操作记录
---

### $set 更新或添加属性

------
**例**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "item" : "A"
        }, 
        {
            "item" : "B",
            "score" : 4.0,
            "answers" : [ 
                {
                    "q" : 1.0,
                    "a" : 0.0
                }
            ]
        }
    ]
}
```
**添加属性**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$set: {"arr.0.score": 10}}
)
```
**更新属性**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$set: {"arr.1.score": 10}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "item" : "A",
            "score" : 10.0
        }, 
        {
            "item" : "B",
            "score" : 10.0,
            "answers" : [ 
                {
                    "q" : 1.0,
                    "a" : 0.0
                }
            ]
        }
    ]
}
```

### $unset 删除对象的属性或把数组的其中一项变成null

------
**例**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "item" : "A",
            "score" : 5.5
        }, 
        {
            "item" : "B",
            "score" : 4.0,
            "answers" : [ 
                {
                    "q" : 1.0,
                    "a" : 0.0
                }, 
                {
                    "q" : 1.0,
                    "a" : 0.0
                }
            ]
        }
    ]
}
```
**删除一个指定的字段**
```javascript
// 删除arr数组的第一项的score属性
db.getCollection('user').update(
    {"_id": 1.0},
    {$unset: {"arr.0.score": 1}}
)
```
**当匹配到的是数组元素，$unset替换指定的元素为null而不是删除掉指定的元素，此行为保持数组大小和位置不变；**
```javascript
// 把数组arr的第二项的answers的第二项的值变为null
db.getCollection('user').update(
    {"_id": 1.0},
    {$unset: {"arr.1.answers.1": 1}}
)
```
**结果** 
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "item" : "A"
        }, 
        {
            "item" : "B",
            "score" : 4.0,
            "answers" : [ 
                {
                    "q" : 1.0,
                    "a" : 0.0
                }, 
                null
            ]
        }
    ]
}
```

### $rename 重新命名属性名(不能操作数组)

------
**例**
```javascript
{
    "_id" : 1.0,
    "name" : {
        "gge" : 18
    }
}
```

```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$rename: {"name.gge": "name.age"}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "name" : {
        "age" : 18
    }
}
```

### $pop 删除数组中的第一个或者最后一个元素(给$pop传递-1会删除第一个元素传递1会删除最后一个元素)

------
**例**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        1, 
        2, 
        3, 
        4, 
        5
    ]
}
```
**删除数组第一个**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$pop: {"arr": -1}}
)
```
**删除数组最后一个**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$pop: {"arr": 1}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        2, 
        3, 
        4
    ]
}
```

### $pull 删除数组中符合条件的元素

------
**例**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a": 2,
            "b": 5,
            "c": 8
        },
        {
            "a": 6,
            "b": 7,
            "c": 8
        }
    ]
}
```
**删除数组arr中的a>=5的项**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$pull: {"arr": {"a": {$gte: 5}}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a" : 2,
            "b" : 5,
            "c" : 8
        }
    ]
}
```
**使用$elemMatch匹配多个条件**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "c" : [ 
                {
                    "a" : 10,
                    "b" : 10
                }, 
                {
                    "a" : 15,
                    "b" : 15
                }
            ]
        }, 
        {
            "c" : [ 
                {
                    "a" : 20,
                    "b" : 20
                }, 
                {
                    "a" : 25,
                    "b" : 25
                }
            ]
        }
    ]
}
```
**删除arr数组  中的c数组中 (a=25 && b=25)**
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$pull: {"arr": {"c": {$elemMatch: {"a": 25,"b":25}}}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "c" : [ 
                {
                    "a" : 10,
                    "b" : 10
                }, 
                {
                    "a" : 15,
                    "b" : 15
                }
            ]
        }
    ]
}
```

### $push 向已有的数组末尾加入一个元素

------
**例**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        5
    ]
}
```
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$push: {"arr": 10}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        5, 
        10.0
    ]
}
```
**使用$position添加到任意位置**
```javascript
// 在arr数组第二项插入四项数据
db.getCollection('user').update(
    {"_id": 1.0},
    {$push: {"arr": {$each: [15,16,17,18], $position: 1}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        5, 
        15.0, 
        16.0, 
        17.0, 
        18.0, 
        10.0
    ]
}
```

### $sort 数组排序

------
**1为升序排列，-1为降序排列**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        3, 
        1, 
        5, 
        2, 
        6
    ]
}
```
```javascript
db.getCollection('user').update(
    {"_id": 1.0},
    {$push: {"arr": {$each: [], $sort: 1}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        1, 
        2, 
        3, 
        5, 
        6
    ]
}
```
**2. 根据数组的某一项排序**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a" : 5,
            "b" : 6
        }, 
        {
            "a" : 3,
            "b" : 6
        }, 
        {
            "a" : 2,
            "b" : 6
        }, 
        {
            "a" : 4,
            "b" : 6
        }, 
        {
            "a" : 5,
            "b" : 6
        }
    ]
}
```
```javascript
// 根据数组arr的a属性升序排列
db.getCollection('user').update(
    {"_id": 1.0},
    {$push: {"arr": {$each: [], $sort: {"a": 1}}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a" : 2,
            "b" : 6
        }, 
        {
            "a" : 3,
            "b" : 6
        }, 
        {
            "a" : 4,
            "b" : 6
        }, 
        {
            "a" : 5,
            "b" : 6
        }, 
        {
            "a" : 5,
            "b" : 6
        }
    ]
}
```

### $slice 数组截取

------
**正数则从前向后，负数从后向前**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        1, 
        2, 
        3, 
        4, 
        5
    ]
}
```
```javascript
// 截取数组arr后三位
db.getCollection('user').update(
    {"_id": 1.0},
    {$push: {"arr": {$each: [], $slice: -3}}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        3, 
        4, 
        5
    ]
}
```


### 占位符$，更新数组的某一项不确定位置的值

------
**例1**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 3, 4, 5, 20 ]
}
```
```javascript
// 把数组arr值为20的变成10
db.getCollection('user').update(
    {"_id": 1.0, "arr": 20},
    {$set: {"arr.$": NumberInt(10)}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 3, 4, 5, 10 ]
}
```
**例2**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a" : 1,
            "b" : 10
        }, 
        {
            "a" : 2,
            "b" : 20
        }, 
        {
            "a" : 3,
            "b" : 30
        }
    ]
}
```
```javascript
// 更新数组arr里面属性a为2的，把当前位置的b变成200
db.getCollection('user').update(
    {"_id": 1.0, "arr.a": 2},
    {$set: {"arr.$.b": NumberInt(200)}}
)
```
**结果**
```javascript
{
    "_id" : 1.0,
    "arr" : [ 
        {
            "a" : 1,
            "b" : 10
        }, 
        {
            "a" : 2,
            "b" : 200
        }, 
        {
            "a" : 3,
            "b" : 30
        }
    ]
}
```