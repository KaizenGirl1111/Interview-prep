/*


[1,2,,,3,4,5,6]

[1,2,undefined,,3,4,5,6]

arr.map((x)=>x * this.a,{a:2})


arr.map(function(num) {
  return num * this.a;
}, {a:10});


*/




Array.prototype.myMap = function(cbk,thisArg){
    if(typeof cbk!=='function')throw new TypeError('cbk is not a function')
    let arr = []
    for(let i=0;i<this.length;i++){
        if(i in this)
        arr[i] = cbk.call(thisArg,this[i],i,this)
    }
    return arr;
}



let arr = [1,2,3,4,5]
let arr2 = [1,2,undefined,,3,4,5]

// console.log(arr.myMap(x=>x*2));
// console.log(arr.myMap(x=>x*this.a,{a:10}))
// console.log(arr2.myMap(x=>x*2))
// console.log(arr2.map(x=>x*2))
// console.log(arr.map(function(x){
//     return x*this.a
// },{a:10}))

// arrow functions don't have this attached to them, they use this from the context where function is defined

Array.prototype.myFilter = function(cbk,thisArg){
    if(typeof(cbk)!=='function')throw new TypeError("cbk is not a function")
    let arr = []
    for(let i=0;i<this.length;i++){
        if(cbk.call(thisArg,this[i],i,this)){
          arr.push(this[i])
        }
    }
    return arr
}

// console.log(arr.myFilter(x=>x%2===0))
// console.log(arr.filter(function(x){
//      return x%this.a===0
//  },{a:2}))
// console.log(arr2.myFilter(function(x){
//      return x%this.a===0
//  },{a:2}))
// console.log(arr2.filter(function(x){
//      return x%this.a===0
//  },{a:2}))

 Array.prototype.myReduce = function(cbk,initialValue){
    if(typeof cbk!=='function')throw new TypeError("cbk is not function")
    let sum = initialValue==undefined?this[0]:initialValue
    let startIndex = initialValue==undefined?1:0
    for(let i=startIndex;i<this.length;i++){
        if(i in this)
        sum+=cbk(this[i],i,this)
    }
    return sum;
 }

 console.log(arr.myReduce(x=>x*2,2))
