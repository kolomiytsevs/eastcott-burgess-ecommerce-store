import React from 'react'
import productDB from "../../ProductDB"
import ProductCard from "../../Components/Product Card/ProductCard"
import "./ShopPage.css"
import ProductFilter from "../../Components/Product Filter/ProductFilter"
import {Helmet} from 'react-helmet'

class ShopPage extends React.Component { 
    constructor(props){
        super(props)
        this.state={
            filterArray:"",
        }
        this.filterItems=this.filterItems.bind(this)
        this.handleHomePageCategoryClick = this.handleHomePageCategoryClick.bind(this)
        this.displayFilterCategoryTitle = this.displayFilterCategoryTitle.bind(this)
    }
  
    handleHomePageCategoryClick(){
        if(this.props.location.state!==undefined){
            const {type} = this.props.location.state
            this.setState({
                filterArray:type
            })
        }
    }

    componentWillMount(){
        this.handleHomePageCategoryClick()   //state passed from home page category Links     
    }

    displayFilterCategoryTitle(){
        return this.state.filterArray==""? "Our Teas":this.state.filterArray[0].toUpperCase()+this.state.filterArray.slice(1) +" Tea"
    }

    filterItems(event){
        const {value} = event.target
        const gtag = window.gtag
        this.setState({
            filterArray: value
        },

        gtag('event', `Display ${value!==""? value:"all"} tea`, {
            'event_category':`Filter Products`,
            'event_label':`${value}`
        })

        )
    }
    
    

    render(props){
        return(
            <div style={{textAlign:"center", paddingBottom:"100px"}}>

                <Helmet>
                    <title>Shop Chinese Tea | Eastcott &amp; Burgess | UK</title>
                </Helmet>

                <div className="text-div">
                    <h1 style={{textAlign:"center", marginTop:"60px"}}>     
                        {this.displayFilterCategoryTitle()}
                    </h1>
                    
                    <p className="family-farms">
                        Teas straight from small family tea gardens and&nbsp;the most prized terroirs.&nbsp;
                    </p>
                    <p className="distinguish-tgy">
                        Distinguish a true Zheng Yan from the best Ban Yan. Discover what makes a true Wudong Dancong. Re-discover high mountain Tie Guan Yin.
                    </p>                
                </div>
                <ProductFilter 
                    filterItems={this.filterItems} 
                    filterArray={this.state.filterArray}
                />
                <div className="product-comp" style={{}}>
                {productDB
                    .filter(item => 
                        this.state.filterArray==""? item : item.type==this.state.filterArray)
                    .map(good => 
                        <ProductCard 
                            good={good}  
                            imgUrl= {good.imgUrl} 
                            imgUrl_1={good.imgUrl_1} 
                            key={good.id} 
                            inStock={good.inStock} 
                            productName={good.productName} 
                            handleAddToCart= {this.props.handleAddToCart}  
                            price={(good.price/100)} 
                        />
                    )}  
                </div>
            </div>
        )
    }


}

export default ShopPage