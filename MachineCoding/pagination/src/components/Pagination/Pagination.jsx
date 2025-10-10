import PageNumbers from '../PageNumbers/PageNumbers'
import ProductsContainer from '../ProductsContainer/ProductsContainer'
import './Pagination.css'
import {useEffect,useState} from 'react'

const PAGE_SIZE =10
function Pagination(){
    const [products,setProducts] = useState([])
    const [currentPage,setCurrentPage] = useState(0)
    useEffect(()=>{
        const fetchProducts = async() =>{ //TODO: add loader
        try{
        const url = `https://dummyjson.com/products?limit=500`
        const data = await fetch(url)
        const parsedData = await data.json()
        setProducts(parsedData.products)
        }
        catch(e){
            throw new Error("Error fetching data",e)
        }
    }
    fetchProducts()    
    },[])

    const totalProducts = products.length
    const noOfPages = Math.ceil(totalProducts/PAGE_SIZE)
    const start = currentPage*PAGE_SIZE  
    const end = start+PAGE_SIZE 

    return( 
    <>
    <div className="page-container">
    <PageNumbers currentPage={currentPage} setCurrentPage={setCurrentPage} noOfPages={noOfPages}/>
    <ProductsContainer products={products} start={start} end={end}/>
    </div>
    </>
    )
}

export default Pagination;