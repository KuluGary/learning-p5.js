function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!valid.includes(arr[i])) arr.splice(i, 1);
  }
}
