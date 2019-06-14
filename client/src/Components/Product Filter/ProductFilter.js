import React from "react"
import "./ProductFilter.css"
import ProductDB from "../../ProductDB"

let teaTypeArray = ProductDB.map(item=>item.type)
let uniqueTeaTypesArray = Array.from(new Set(teaTypeArray))

const ProductFilter = (props) => 
    <div className="filter-buttons" >    
            <label>Show:</label>
                <button value="" className={""===props.filterArray?"button-active":"button"} style={{marginBottom:"5px"}} onClick={(e)=>props.filterItems(e) }>all</button>
               
                {/*Array of unique tea types taken from ProductDB and mapped onto buttons*/}
                {uniqueTeaTypesArray.map(item=>
                <button 
                    key={item} 
                    value={item} 
                    className={item===props.filterArray?"button-active":"button"} 
                    onClick={(e)=>props.filterItems(e)}
                    style={{marginBottom:"5px"}}
                >
                    {item}
                </button>)}
                
            </div>

export default ProductFilter