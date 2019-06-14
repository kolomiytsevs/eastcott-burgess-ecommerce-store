import React from "react"
import {Link} from "react-router-dom"
import "./ProductCard.css"

class ProductCard extends React.Component{
constructor(props){
    super(props)
    this.state={
        displayImg:this.props.imgUrl
    }
    this.handleHover=this.handleHover.bind(this)
    this.handleLeave=this.handleLeave.bind(this)
}
    handleHover(){
        this.setState({displayImg:this.props.imgUrl_1})
    }

    handleLeave(){
        this.setState({displayImg:this.props.imgUrl})
    }

    render(){
        const gtag = window.gtag
        return(
            <div className="product-container" onPointerEnter={this.handleLeave} style={{margin:"10px"}}>
                <Link 
                    
                    onClick={
                        ()=>gtag('event', 'product click', {
                        'event_category':`${this.props.productName}`,
                        'event_label':`${this.props.productName}`
                        })  
                    }
                    className="image-link" 
                    to={`/shop/${this.props.good.id}`}>
                        <img 
                            key={this.state.displayImg} 
                            onPointerOver={this.handleHover} 
                            onPointerOut={this.handleLeave} 
                            alt={this.props.productName}
                            src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_350,e_sharpen:90,q_auto:best,w_350/${this.state.displayImg}`} 
                            className="img-top" 
                        />
                </Link>


                <div className="product-text">
                    <Link 
                        to={`/shop/${this.props.good.id}`} 
                        className="product-name" 
                        style={{
                            fontSize:"18px", 
                            fontWeight:"400", 
                            textDecoration:"none", 
                            color:"black"}}
                        >
                        {this.props.productName}
                    </Link>
                </div>               
                    {
                    //turnery to display the price or say 'out of stock'
                        this.props.good.inStock===true? 
                            <h3 
                                className="product-price" 
                                style={{fontSize:"18px", 
                                    fontWeight:"400", 
                                    textAlign:"start", 
                                    padding:"10px"
                                        }}>£ {this.props.price.toFixed(2)}
                            </h3>
                            : 
                            <h3 
                                className="item-notInStock" 
                                style={{
                                    fontSize:"18px", 
                                    fontWeight:"400", 
                                    textAlign:"start", 
                                    padding:"10px", 
                                    color:"darkred"
                                        }}>out of stock
                            </h3>}
            </div> 
        )
    }
}

export default ProductCard