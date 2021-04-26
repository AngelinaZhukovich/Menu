// Реализовать функцию разворачивания массива чисел, которая вернет
//  сумму всех этих чисел  и число, соответствующее максимальной
//   глубине вложенности массива в массив.

// Пример: 
//   1. [4,6, [5,9]] // Сумма: 24, Макс. вложенность: 1.
//   2. [1,3,[7,2, [3,4]]] // сумма: 20, Макс. вложенность: 2.


// const arr = [1,3,[7,5, [3,4]]] ;

// // console.log(sum(arr));

// function a(arr){
//     const sum = arr => arr.reduce((res, el) => res + (Array.isArray(el) ? sum(el) : el), 0);
//     console.log(sum(arr))
// }

// a(arr)

function test(arr) {
  let deep = 0;
  let sum = 0;
  
  function flatten() {
    let flat = [], i;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
            flat = flat.concat(flatten.apply(null, arguments[i]));
        } else {
            flat.push(arguments[i]);
        }
    }
    return flat;
  }
  
  function ololo(arr) {
    for (let i of arr) {
      if(Array.isArray(i)) {
        ololo(i);
        deep++;
      } else {
        sum = sum + i;
      }
    }
  }
  
  ololo(arr);
  let newArr = flatten(arr);
  
  console.log([newArr, deep, sum]);
  return [newArr, deep, sum];
 
}

test(arr);





// Реализовать функцию для перемножения 2 чисел. 
// Функция должна уметь сохранять выполнение последних 3 операций 
// (кешировать). 
// И если в  функцию были переданы аргументы, вычисление
//  результата которых есть в кэше - то значение должно быть
//   возвращено из кэша, а не пересчитано заново. 

// function paperwork(n, m) {
//     if (n>0 && m>0){
//       return n*m
//     } else {
//       return 0
//     }
//   }
function multiply(a,b) {
	return a*b;
}
  
const memMultiply = cacheAnything(multiply, 1);
  
function cacheAnything(fn, size) {
  
  let cache = new Map();
  
  return function(...args) {
    if ( cache.has(JSON.stringify([...args]))) {
      console.log( 'return from cache....', cache.get(JSON.stringify([...args])) );
      return cache.get(JSON.stringify([...args]));
    } else {
      let result = fn(...args);
      cache.set(JSON.stringify([...args]), result);
      if (cache.size < size + 1) {
        console.log('calculate....', [...cache]);
        return result;
      } else {
        let mapIter = cache.keys();
        cache.delete(mapIter.next().value);
        console.log('calculate....', [...cache]);
        return result;
      }
    }
	}
}
  
memMultiply(3,5);