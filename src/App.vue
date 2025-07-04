<template>
  <div id="app">
    <div>
      <h1>Vue 3 App</h1>
      <input v-model="inputValue" placeholder="输入数字，用逗号分隔" class="border rounded px-2 py-1 mr-2" />
      <button @click="handleSort" class="bg-blue-500 text-white px-4 py-1 rounded">快速排序</button>
      <div v-if="result.length" class="mt-4">
        <span>排序结果：</span>
        <span>{{ result.join(', ') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { quickSort } from './quickSort.js'

const inputValue = ref('')
const result = ref([])

const handleSort = () => {
  const arr = inputValue.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n))
  result.value = quickSort(arr)
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
