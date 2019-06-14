import React from "react"
import "./ProductPage.css"
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet'

import ProductDB from "../../ProductDB"
import AccordianMenu from "../../Components/Accordian/AccordianMenu"
import {WholeStarIcon, HalfStarIcon, EmptyStarIcon, CartPlusIcon, ReturnIcon} from '../../Components/svgIcons'

export const ThumbnailImg = (props) => (  
    
    <img 
    alt={props.productName} 
    src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${props.imgUrl}`} 
    onClick={()=>props.handleThumbnailImgClick(props.imgUrl)} 
    className="thumbnail-img"
    />
  
)

export const AddToCartBtn = (props) => (
    props.item.inStock? 
                    
        <button className="product-cart-btn" onClick={()=>props.handleAddToCart(props.item.productName, props.item.imgUrl, props.selectedVariationPrice.toFixed(2)/100, props.selectedVariationId, Number(props.quantity), props.productType)} style={{color:"white", cursor:"pointer" }}>
        <CartPlusIcon />Add to Basket</button>
        : 
        <button className="product-cart-btn" style={{color:"white", cursor:"not-allowed", backgroundColor:"lightgrey"}} disabled >Out of Stock</button>
)

class ProductPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mainProductImg:"",
            quantity:1,
            selectedVariation:"",
            selectedVariationId:"",
            selectedVariationPrice:0,
            averageStarRating:[],
            productType:""
        }
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleThumbnailImgClick=this.handleThumbnailImgClick.bind(this)
        this.ratingToStars=this.ratingToStars.bind(this)
    }
    
/*sets the intial price to be equal to the price of the first product sub variation*/
    componentWillMount(){
        this.setState({
            selectedVariationPrice:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations[0].variationPrice
        })

        this.setState({
            mainProductImg: ProductDB.filter(item => item.id === this.props.match.params.id)[0].imgUrl
        })

        this.setState({
            selectedVariationId:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations[0].id 
        })
        this.setState({
            selectedVariation:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations[0].variationName 
        })
        this.setState({
            productType:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations[0].shipType  
        })

    }

    ratingToStars = (num)=>{
        let starRating = [];

        let wholeStars = Math.floor(num/50/2);
        let halfStars = Math.floor(num/50%2); 
        let emptyStars = Math.floor(Math.floor(10-Math.floor(num/50))/2)

        starRating = [...Array(wholeStars)].map((wholeStars, index)=> <WholeStarIcon key ={index}/>
        ).concat([...Array(halfStars)].map((halfStars, index)=> <HalfStarIcon key={index+10}/>

        )).concat([...Array(emptyStars)].map((emptyStars, index)=> <EmptyStarIcon key={index+20}/>))

        return starRating
    }

    handleThumbnailImgClick(imgUrl){
        
        this.setState({
            mainProductImg: imgUrl
        })
    }

    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        }, ()=>{
            this.setState({
                selectedVariationId:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations.filter(item=> item.variationName===this.state.selectedVariation)[0].id
            })
    
            this.setState({
                selectedVariationPrice:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations.filter(item=> item.variationName===this.state.selectedVariation)[0].variationPrice
            })

            this.setState({
                productType:ProductDB.filter(item => item.id === this.props.match.params.id)[0].variations.filter(item=> item.variationName===this.state.selectedVariation)[0].shipType
            })
        })        
    }
 
    
    render(){
        
 
        return(
            <div className="product-page-overlay">
            <Link className="return-btn" to="/shop" style={{marginTop:"60px", textAlign:"start", display:"flex"}}><ReturnIcon />
<p style={{}}>back</p></Link>  
            {ProductDB.filter(item => item.id === this.props.match.params.id).map(item=>
            <div key={item.id}>
                <Helmet>
                <title> {item.productName} | Eastcott &amp; Burgess Tea</title>
                </Helmet>
            <div className="grid-wrap" key={item.id}>
            <div className="product-page-wrap" style={{}}>
                <div className="img-div" style={{display:"flex"}}>
                    <div style={{display:"flex", flexDirection:"column", marginRight:"10px", justifyContent:"space-between"}}>
                        {Object.keys(item.images).map((img, index) => 
                        
                        <ThumbnailImg 
                        productName={item.productName} 
                        imgUrl={item.images[img]} 
                        handleThumbnailImgClick={this.handleThumbnailImgClick} 
                        key={item.productName+index} 
                        className="thumbnail-img" 
                        />
                        
                        )}
                        {/*<ThumbnailImg productName={item.productName} imgUrl={item.imgUrl} handleThumbnailImgClick={this.handleThumbnailImgClick} />
                        <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${item.imgUrl}`} onClick={()=>this.handleThumbnailImgClick(item.imgUrl)} className="thumbnail-img"/>
                        <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${item.imgUrl_1}`} onClick={()=>this.handleThumbnailImgClick(item.imgUrl_1)} className="thumbnail-img"/>
                        <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${item.imgUrl_2}`} onClick={()=>this.handleThumbnailImgClick(item.imgUrl_2)} className="thumbnail-img"/>
                        <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${item.imgUrl_3}`} onClick={()=>this.handleThumbnailImgClick(item.imgUrl_3)} className="thumbnail-img"/>
                        <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_50,q_auto:best,w_50/${item.imgUrl_4}`} onClick={()=>this.handleThumbnailImgClick(item.imgUrl_4)} className="thumbnail-img"/>*/}
                        
                    </div>
                    <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_550,q_auto,e_sharpen:90,w_400/${this.state.mainProductImg}`} className="main-product-img"/>
                </div>
                
                <div className="description-div">
                <div>{item.description}</div>
                </div> 
                </div>
                <div className="accordian-menu">
                <div className="main-shop-div" style={{}}>
                    <h1>{item.productName}</h1> 
                    <div className="rating-price-div">
                    <div className="rating-div">
                        <div>{this.ratingToStars(item.averageRating*100)}</div>
                    </div>
                    <h3>Price: £{this.state.selectedVariationPrice.toFixed(2)/100}</h3>
                    </div>
                    <div className="select-div">
                    <form>
                        <select 
                        value={this.state.selectedVariation}
                        name="selectedVariation"
                        onChange={this.handleInputChange}
                        >
                            {item.variations.map(variation => <option key={variation.id} value={variation.variationName}>{variation.variationName}</option>)}
                        </select>
                        <br />
                        <input name="quantity" value={this.state.quantity} onChange={this.handleInputChange} type="number" min="1"></input>
                    </form>
                    </div>
                    {/*this.state.quantity below is passed in as number as otherwise the state management seems to turn it into a string*/}
                        <AddToCartBtn 
                            item ={item} 
                            handleAddToCart={this.props.handleAddToCart}
                            selectedVariationPrice={this.state.selectedVariationPrice}
                            selectedVariationId={this.state.selectedVariationId}
                            quantity={this.state.quantity}
                            productType={this.state.productType}
                        />
                </div>
                <AccordianMenu className="accordian-menu" item={item} />
                </div>
                
            </div>
            <div className="grid-wrap-mobile" key={`${item.id}_mobile`}>
            
                <div className="img-div" style={{display:"flex"}}>
                    <div style={{display:"flex", flexDirection:"column", marginRight:"10px", justifyContent:"space-between"}}>

                    {Object.keys(item.images).map((img, index) => 
                    
                    <ThumbnailImg 
                    productName={item.productName} 
                    imgUrl={item.images[img]} 
                    handleThumbnailImgClick={this.handleThumbnailImgClick} 
                    key ={item.productName} 
                    />
                    
                    )}

                    </div>
                    <img alt={item.productName} src={`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_550,q_auto,e_sharpen:90,w_400/${this.state.mainProductImg}`} className="main-product-img"/>
                </div>
                <div className="main-shop-div" style={{}}>
                    <h1>{item.productName}</h1>
                    <div className="rating-select-div"> 
                    <div className="rating-price-div">
                    <div className="rating-div">
                        <div>{this.ratingToStars(item.averageRating*100)}</div>
                    </div>
                    <h3>Price: £{this.state.selectedVariationPrice.toFixed(2)/100}</h3>
                    </div>
                    <div className="select-div">
                    <form>
                        <select 
                        value={this.state.selectedVariation}
                        name="selectedVariation"
                        onChange={this.handleInputChange}
                        >
                            {item.variations.map(variation => <option key={variation.id} value={variation.variationName}>{variation.variationName}</option>)}
                        </select>
                        <br />
                        <input name="quantity" value={this.state.quantity} onChange={this.handleInputChange} type="number" min="1"></input>
                    </form>
                    </div>
                    </div>
                    {/*this.state.quantity below is passed in as number as otherwise the state management seems to turn it into a string*/}
                    <AddToCartBtn 
                        item ={item} 
                        handleAddToCart={this.props.handleAddToCart}
                        selectedVariationPrice={this.state.selectedVariationPrice}
                        selectedVariationId={this.state.selectedVariationId}
                        quantity={this.state.quantity}
                        productType={this.state.productType}
                    />
                </div>
                
                <div className="description-div">
                <div>{item.description}</div>
                </div> 
                <AccordianMenu className="accordian-menu" item={item} />
                </div>
                
                
                
            
            </div>
            
            )}
            </div> 
        )
    }
}

export default ProductPage