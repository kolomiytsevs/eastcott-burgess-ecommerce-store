import React from "react"

import {CrossIcon} from '../svgIcons'

const BasketDrawerItemCard = (props) =>(
    
    //Single entry in the basket drawer
    <div style={{display:"grid", gridTemplateColumns:"repeat(5, auto)", padding:"5px", border:"1px grey solid", borderRadius:"5px", margin:"10px 10px 0px 10px", alignItems:"center", alignContent:"center", textAlign:"center", gridColumnGap:"10px", color:"black"}}>
    <img 
    src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${props.imgUrl}`}
    alt="" 
    style={{objectFit:"cover", 
        width:"50px", 
        height:"50px",
    }}/>
    <div style={{textAlign:"start"}}>{props.productName}</div>
    <div style={{textAlign:"start"}}>qty:{props.qty}</div>
    <div style={{textAlign:"start"}}>£{props.price}</div>
    <div style={{margin:"0px 5px 0px 0px"}}>
        <a onClick={()=>props.handleRemoveFromBasket(props.item.id, props.item.productType)} style={{cursor:"pointer", }}>< CrossIcon />
</a>
    </div>  
    </div>
)

export default BasketDrawerItemCard