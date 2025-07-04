<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- 显示屏 -->
      <div class="p-6 bg-gray-800 text-right">
        <div class="text-gray-400 text-sm h-6">{{ previousValue || '0' }} {{ operatorDisplay }}</div>
        <div class="text-white text-4xl font-mono font-bold truncate">{{ currentValue || '0' }}</div>
      </div>
      
      <!-- 按钮区域 -->
      <div class="grid grid-cols-4 gap-3 p-6 bg-gray-50">
        <!-- 功能按钮 -->
        <button 
          @click="clearAll"
          class="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          AC
        </button>
        <button 
          @click="deleteLast"
          class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          DEL
        </button>
        <button 
          @click="setOperator('÷')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          ÷
        </button>
        
        <!-- 数字按钮 -->
        <button 
          v-for="num in [7,8,9]" 
          :key="num"
          @click="appendNumber(num.toString())"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          {{ num }}
        </button>
        <button 
          @click="setOperator('×')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          ×
        </button>
        
        <button 
          v-for="num in [4,5,6]" 
          :key="num"
          @click="appendNumber(num.toString())"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          {{ num }}
        </button>
        <button 
          @click="setOperator('-')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          -
        </button>
        
        <button 
          v-for="num in [1,2,3]" 
          :key="num"
          @click="appendNumber(num.toString())"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          {{ num }}
        </button>
        <button 
          @click="setOperator('+')"
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          +
        </button>
        
        <!-- 底部按钮 -->
        <button 
          @click="appendNumber('0')"
          class="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          0
        </button>
        <button 
          @click="appendNumber('.')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          .
        </button>
        <button 
          @click="calculate"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-200 active:scale-95"
        >
          =
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentValue = ref<string>('');
const previousValue = ref<string>('');
const operator = ref<string>('');
const operatorDisplay = ref<string>('');

const appendNumber = (num: string) => {
  // 防止重复小数点
  if (num === '.' && currentValue.value.includes('.')) return;
  
  // 限制输入长度
  if (currentValue.value.length >= 12) return;
  
  currentValue.value += num;
};

const setOperator = (op: string) => {
  if (currentValue.value === '') return;
  
  if (previousValue.value !== '') {
    calculate();
  }
  
  operator.value = op === '×' ? '*' : op === '÷' ? '/' : op;
  operatorDisplay.value = op;
  previousValue.value = currentValue.value;
  currentValue.value = '';
};

const calculate = () => {
  if (operator.value === '' || previousValue.value === '' || currentValue.value === '') return;
  
  const prev = parseFloat(previousValue.value);
  const current = parseFloat(currentValue.value);
  let result: number;
  
  switch (operator.value) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentValue.value = '错误';
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  
  // 处理结果精度
  result = parseFloat(result.toFixed(10));
  
  currentValue.value = result.toString();
  previousValue.value = '';
  operator.value = '';
  operatorDisplay.value = '';
};

const clearAll = () => {
  currentValue.value = '';
  previousValue.value = '';
  operator.value = '';
  operatorDisplay.value = '';
};

const deleteLast = () => {
  currentValue.value = currentValue.value.slice(0, -1);
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
