import React from "react"

const SubTotal = (props) => (
    <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", margin:"10px", color:"black"}}>
        <h4>Subtotal: £ {props.total}</h4>
    </div>
)

export default SubTotal