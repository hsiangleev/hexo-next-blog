---
title: js十大排序算法记录
date: 2019/7/10 15:45:30
tags: js
categories: js
# description: 
excerpt: js十大排序算法记录
---

### 冒泡排序
------

说明：即两两比较，较大的放到后面

动图演示：
<img data-src="/images/十大排序算法/bubbleSort.gif" class="lozad"/>

js代码：
```javascript
function bubbleSort(arr) {
    var len=arr.length;
    for(var i=0;i<len;i++){
        // len-1是因为前一项为j，后一项为j+1
        // -i是因为每次第一次循环结束之后，倒数第i项便已经排好了
        for(var j=0;j<len-1-i;j++){
            // 判断如果前面的比后面的大，则交换位置
            if(arr[j]>arr[j+1]){
                // 交换第j项与第j+1项
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}
```

### 选择排序
------

说明：即假设当前位置为最小项，如果后面找到比它小的，则记录当前项索引，里层循环结束后交换，交换当前项和最小项

动图演示：
<img data-src="/images/十大排序算法/selectionSort.gif" class="lozad"/>

js代码：
```javascript
function selectionSort(arr) {
    var minIndex,len=arr.length;
    for(var i=0;i<len;i++){
        minIndex=i;     // 假设当前位置为最小项
        for(var j=i+1;j<len;j++){
            // 判断后面的是否有比它小的，如果有，则记录
            if(arr[minIndex]>arr[j]){
                minIndex=j;
            }
        }
        // 如果当前项不是最小，则交换
        if(i!==minIndex){
            var temp=arr[i];
            arr[i]=arr[minIndex];
            arr[minIndex]=temp;
        }
    }
    return arr;
}
```

### 插入排序
------

说明：类似玩扑克牌，假设从第二项开始都是未排列的，在已排序序列中从后向前扫描，找到相应位置插入（对应几乎快排好的数据效率高）。

动图演示：
<img data-src="/images/十大排序算法/insertionSort.gif" class="lozad"/>

js代码：
```javascript
function insertSort(arr) {
    var len=arr.length;
    for(var i=1;i<len;i++){
        var temp=arr[i];    // 待排序的项
        // 向前搜索，如果满足当前项大于待排项，则把当前项赋值给下一项，
        for(var j=i-1;j>=0&&arr[j]>temp;j--){
            arr[j+1] = arr[j];
        }
        // 把待排序项赋值到最后一个满足条件的项
        arr[j+1] = temp;

        // while写法，与上面的for循环等价
        // var preIndex=i-1;
        // var current=arr[i];
        // while(preIndex>=0 && arr[preIndex]>current){
        //     arr[preIndex+1]=arr[preIndex];
        //     preIndex--;
        // }
        // arr[preIndex+1]=current;
    }
    return arr;
}
```

### 希尔排序
------

说明：插入排序改进版，即先把数据分为若干子数列进行排序，待序列基本有序时，再整体进行插入排序

动图演示：
<img data-src="/images/十大排序算法/Sorting_shellsort_anim.gif" class="lozad"/>

js代码：
```javascript
function insertSort(arr) {
    var len=arr.length;
    var step=1;
    while(step < len/3) {          //定义间隔序列，确保最后一次间隔为1，即最后一次整体进行插入排序
        step =step*3+1;
    }
    for(step;step>0;step=Math.floor(step/3)){
        // 里层与插入排序基本一样
        for(var i=step;i<len;i++){
            var temp=arr[i];
            for(var j=i-step;j>=0&&arr[j]>temp;j-=step){
                arr[j+step]=arr[j];
            }
            arr[j+step]=temp;
        }
    }
    return arr;
}
```

### 归并排序
------

说明：采用分治法，即一分二，二分四，分到最后的小数组只有一个元素，或没有元素，然后两两比较

动图演示：
<img data-src="/images/十大排序算法/mergeSort.gif" class="lozad"/>

js代码：
```javascript
function mergeSort(arr) {
    var len=arr.length;
    // left和right分割到最小为只有一个元素的数组
    if(len<2){
        return arr;
    }
    // 找中间值，根据中间值把数组分为更小的两个数组
    var middle=Math.floor(len/2);
    var left=arr.slice(0,middle);
    var right=arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    // left和right为已排序的数组
    var result=[];
    while(left.length && right.length){
        if(left[0]>right[0]){
            result.push(right.shift());
        }else{
            result.push(left.shift());
        }
    }
    while(left.length) result.push(left.shift());
    while(right.length) result.push(right.shift());
    return result;
}
```

### 快速排序
------

说明：设置基准项，把所有比基准大的排后面，比基准小的排前面，然后把前面的数组和后面的数组再重复前面操作，即采用分治法，一分二，二分四...

动图演示：
<img data-src="/images/十大排序算法/quickSort.gif" class="lozad"/>

js代码：
```javascript
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}
function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            // 每次找到一个比基准大，一个比基准小的交换
            if(i!==index) swap(arr, i, index);
            index++;
        }        
    }
    // 交换基准与最后一个比基准小的，即所有比基准小的都在基准前面了
    swap(arr, pivot, index - 1);
    return index-1;
}
// 下文省略swap函数
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

### 堆排序
------

说明：是一种利用堆的概念来排序的选择排序。
1. 创建大顶堆，即每个节点大于或等于其子节点
2. 堆首尾互换，尺寸减1，调用堆调整，数组顶端数据调整到相应位置
3. 重复步骤 2，直到堆的尺寸为 1。

动图演示：
<img data-src="/images/十大排序算法/heapSort.gif" class="lozad"/>

js代码：
```javascript
var len;
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}
function heapify(arr, i) {     // 堆调整
    // i为当前节点，left和right为其左右子节点
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    // 然后假设当前节点为最大节点，判断子节点是否比它大，把最大的节点交换到当前节点
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}
function heapSort(arr) {
    buildMaxHeap(arr);
    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
```

本文gif图及部分代码来源[https://github.com/hustcc/JS-Sorting-Algorithm](https://github.com/hustcc/JS-Sorting-Algorithm)