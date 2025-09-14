Array.prototype.myMap = function(callback){
    if(typeof callback!=='function'){
        throw new TypeError("map error")
    }
    let result = []
    for(let i=0;i<this.length;i++){
       result.push(callback(this[i],i,this));
    }
    return result;
}

let arr = [1,2,3,4,5]

console.log(arr.myMap(x=>x*2));