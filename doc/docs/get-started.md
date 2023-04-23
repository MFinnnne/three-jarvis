# 快速上手

让我们直接用起来看看

## 监控模式

在监控模式下three-jarvis只提供对场景的监控能力，所有的操作都是不可持久化的，刷新后立即恢复原样。

**开启监控模式**

````javascript

import {ThreeJarvis} from 'three-jarvis';
// 使用监控模式
ThreeJarvis.monitor(scene);
````

<script setup>
import MonitorComponent from './compoonents/MonitorComponent.vue';
</script>
**效果**

<MonitorComponent />


