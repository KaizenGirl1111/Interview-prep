import './ProductsContainer.css'
import ProductCard from '../ProductCard/ProductCard';

function ProductsContainer({products,start,end}){
  
   
return(
     <div className="product-container">
       {
        products.length===0?
        <p>No products found</p>
        :
        products.slice(start,end).map((product)=>{
            return(
            <ProductCard product={product} key ={product.id}/>
            )
        }) 
       }
    </div>
)
}

export default ProductsContainer;