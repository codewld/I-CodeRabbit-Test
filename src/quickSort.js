// 快速排序算法，纯函数实现
export const quickSort = (arr) => {
  if (!Array.isArray(arr)) return [];
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
} 