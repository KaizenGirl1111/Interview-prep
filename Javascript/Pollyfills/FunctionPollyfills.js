Function.prototype.myCall = function(context,...args){
    if(typeof this!=='function'){
        throw new TypeError("This is not a function call")
    }
    context = context!==null && context!==undefined?Object(context):globalThis
    const unique = Symbol() //key should not collide with exisiting keys in context
    console.log(context,unique,context[unique])
    context[unique] = this
    const result = context[unique](...args)
    delete context[unique] //if not cleaned up then object will become very big
    return result;
}

function greet(city,state){
    return `Hello, my name is ${this.name}, age ${this.age}, I'm from ${city}, ${state}`
}

const person1={
    name:"Avni",
    age:"22"
}

console.log(greet.myCall(person1,"Pune","Maharashtra"))
console.log(greet("Pune","Maharashtra"))

Function.prototype.myApply = function(context,...args){
    if(typeof this!=='function'){
        throw new TypeError("myApply is not a function")
    }
    console.log(this)
    if(!Array.isArray(args)){
        throw new TypeError("args is not an array")
    }

    context = context!==null && context!==undefined?Object(context):globalThis
    const unique = Symbol()
    context[unique] = this
    console.log(this)
    const result =context[unique](args);
    delete context[unique]
    return result;
}

const args2 = ["Dosi","Idly","Sambar"]
function favFood(args){
    return `${this.name}'s favorite foods are ${args}`
}
const person2={
    name:"Ghanshyam"
}
console.log(favFood.myApply(person2,args2))
Function.prototype.myBind = function(context,...args){
//can call later
 if(typeof this!=='function'){
        throw new TypeError("This is not a function call")
    }
    context = context!==null && context!==undefined?Object(context):globalThis
    const unique = Symbol() //key should not collide with exisiting keys in context
    console.log(context,unique,context[unique])
    context[unique] = this
    const result = context[unique](...args)
    delete context[unique] //if not cleaned up then object will become very big
    return ()=>result;
}

//compare with actual call apply bind in every test case 
setTimeout(cbk(),100)