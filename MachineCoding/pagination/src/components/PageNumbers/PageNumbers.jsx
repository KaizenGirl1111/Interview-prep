import './PageNumbers.css'
function PageNumbers({currentPage,setCurrentPage,noOfPages}){
      const handlePageChange = (n)=>{
       setCurrentPage(n)
    }
    const prevPage = ()=>{
        setCurrentPage(prev=>prev-1)
    }
    const nextPage = ()=>{
        setCurrentPage(prev=>prev+1)
    }
    return(<div className="page-number-container">
    <button className="page-btn" disabled={currentPage===0} onClick={prevPage}>←</button>
    {[...Array(noOfPages).keys()].map((val,ind)=>(<span className={currentPage===val?"page-btn active":"page-btn"}key={ind} onClick={()=>handlePageChange(val)}>{val}</span>))}
    <button className="page-btn" disabled={currentPage===noOfPages-1} onClick={nextPage}>→</button>
    </div>)
}

export default PageNumbers