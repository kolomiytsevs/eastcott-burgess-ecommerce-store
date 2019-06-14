import React from "react"
import BasketDrawerItemCard from "./BasketDrawerItemCard"
import SubTotal from "./SubTotal"
import "./BasketDrawer.css"
import {CSSTransition} from "react-transition-group"
import CheckoutBtn from "./CheckoutBtn"
import ShippingSelect from './ShippingSelect'



const BasketDrawer = (props) => 
<div>
{/*Basket Drawer which containes*/}
<CSSTransition
    in={props.basketDrawerOpen}
    timeout={350}
    classNames="menu-slide"
    unmountOnExit
    >
        <div className="wrapper"><div className="map-grid" ><div>{props.added.map(item => 
        
        <BasketDrawerItemCard key={item.id} imgUrl={item.imgUrl} productName={item.productName} price={item.price} item={item} qty={item.qty} handleRemoveFromBasket={props.handleRemoveFromBasket} productType={item.productType}
        />
    )}
    </div>
    {/*chec to see if the basket is empty*/}
    {props.total!=0? 
        <div>
            <SubTotal total={props.total}/>
            <ShippingSelect 
            selectRelevantPostagePrice={props.selectRelevantPostagePrice}
            className="shipping-select"
            />
            <CheckoutBtn />
        </div>:
        <p style={{display:"flex",justifyContent:"center", fontWeight:600, padding:"30px",margin:"50px", color:"black"}}>Cart Empty</p>
        }
    
    <div className="x-close" onClick={props.toggleBasketDrawerHandler}>
    <svg style={{}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
    </div>
    
 
    </div>
    </div>

</CSSTransition>
{/*backdrop transition when basket drawer is toggled*/}
<CSSTransition
                in={props.basketDrawerOpen}
                timeout={350}
                classNames="fade"
                unmountOnExit
                >
                    <div className="backdrop" onClick={props.toggleBasketDrawerHandler}></div>

</CSSTransition>
</div>

export default BasketDrawer