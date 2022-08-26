# Jayce's Git Page Content Table

## Content1. first

2. second
3. third

### 1. 基本使用

transition 的类名对应了 2 个过程：动画的进入和离开， 分别对应 3 个关键帧：

**进入**

1. xxx-enter-from : 进入的开始状态
2. xxx-enter-active: 进入的执行中动画
3. xxx-enter-to : 进入的结束状态

**离开**

1. xxx-leave-from: 离开的开始状态
2. xxx-leave-active: 离开执行中动画
3. xxx-leave-to: 离开的结束状态

```vue
<transition name="any">
    <div class="box" v-if="toggle"></div>
  </transition>
```

```css
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3);
}
.any-enter-from {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
.any-enter-active {
  transition: all 0.8s ease-in-out;
}
.any-enter-to {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.any-leave-from {
  /* 这里写不写都可以，和 .any-enter-to 一样的, 所以也可以写在一起*/
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.any-leave-active {
  transition: all 0.8s ease-in-out;
}
.any-leave-to {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
</style>
```

#### **改写类名**

你也可以向 `<Transition>` 传递以下的 props 来指定自定义的过渡 class：

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

```vue
<transition
  enter-from-class="a"
  enter-active-class="aa"
  enter-to-class="aaa"
  leave-from-class="b"
  leave-active-class="bb"
  leave-to-class="bbb"
>
    <div class="box" v-if="toggle0"></div>
  </transition>
```

```css
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3);
}
.a {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
.aa {
  transition: all 0.8s ease-in-out;
}
.aaa {
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.b {
  /* 这里写不写都可以，和 .a 一样的, 所以也可以写在一起*/
  width: 100px;
  height: 100px;
  background-color: rgb(4, 0, 255);
  transform: translate(800px, 200px) scale(3) rotate(0);
}
.bb {
  transition: all 0.8s ease-in-out;
}
.bbb {
  width: 0;
  height: 0;
  background-color: rgb(0, 0, 0);
  transform: translate(0, 0) scale(0) rotate(1960deg);
}
</style>
```

### 2. 结合 animation 属性

通过`@keyframe` 定义好关键帧以后，指定 `xxx-enter-active` 和 `xxx-leave-active` 两个关键帧即可。

```vue
<transition name="any1">
    <div class="box1" v-if="toggle1"></div>
  </transition>
```

```css
<style>
.box1 {
  width: 100px;
  height: 100px;
  border: 1px solid;
}
.any1-enter-active {
  animation: bounce-in 0.5s;
}
.any1-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

### 3. 结合 css 动画库（如 animation.css）

无需写特定的 css 样式，直接通过 `enter-active-class` 和 `leave-active-class` 关键帧 props 动画库所暴露的 类名即可。

```bash
$ npm install animate.css --save
```

```vue
import 'animate.css';
```

```vue
<transition
  name="any2"
  enter-active-class="animate__animated animate__backInDown"
  leave-active-class="animate__animated animate__backOutUp"
>
    <div class="box2" v-if="toggle2"></div>
  </transition>
```

```css
<style>
.box2 {
  width: 200px;
  height: 100px;
  border: 1px solid;
}
</style>
```

### 4. duration 属性

该属性指定了动画的时长

如, 同时指定动画入和动画出的时长为 2s：

```vue
<transition
  name="any2"
  :duration="2000"
  enter-active-class="animate__animated animate__backInDown"
  leave-active-class="animate__animated animate__backOutUp"
>
    <div class="box2" v-if="toggle2"></div>
  </transition>
```

指定动画入的时长为 2s, 动画出的时长为 300ms ：

```vue
<transition
  name="any2"
  :duration="{ enter: 2000, leave: 300 }"
  enter-active-class="animate__animated animate__backInDown"
  leave-active-class="animate__animated animate__backOutUp"
>
    <div class="box2" v-if="toggle2"></div>
  </transition>
```

### 5. 定义动画序列

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition duration="550" name="nested">
    <div v-if="show" class="outer">
      <div class="inner">Hello</div>
    </div>
  </Transition>
</template>

<style>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
```
