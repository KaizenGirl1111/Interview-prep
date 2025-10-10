//Infinite currying
function sumCurry(...init){
    let res = init.reduce((a,b)=>a+b,0)
    function acc(...more){
       if(more.length===0) return res
       res += more.reduce((a,b)=>a+b,0)
       return acc
    }
    return acc
}

//currying a multi arg function

function currying(){
    return function(...moreArgs){
        if(args.length>=fn.length){
           return  currying.apply(this,moreArgs)
        }
        else{
          return function(...args2){
            return currying.apply(this,args.concat(args2))
          }
        }
    }
}