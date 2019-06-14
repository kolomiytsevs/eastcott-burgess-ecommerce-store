import React from "react"
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import localStorage from 'local-storage'


import Home from './Screens/Home/Home'
import ShopPage from "./Screens/Shop/ShopPage"
import Header from "./Components/Nav/Header"
import BasketDrawer from "./Components/Shopping Cart Drawer/BasketDrawer"
import "./App.css"
import ProductPage from "./Screens/Product/ProductPage"
import FourOFour from './Screens/404/FourOFour'
import Media from './Screens/Media/Media'
import OurStory from './Screens/Our Story/OurStory'
import CommuniTeaClub from "./Screens/CommuniTea Club/CommuniTeaClub";
import Cancel from './Screens/Cancel Transaction/Cancel'
import Success from './Screens/Transaction Proccessing/Success'

export const ShippingContext = React.createContext()



class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            count:0,
            added:[],
            total:0,
            productTypeBreakdown:{
                pouch:0,
                caddy:0,
                sample:0
            },
            postageCost:0,
            basketDrawerOpen:false,
            destinationCategory:""
        }
        this.handleAddToCart=this.handleAddToCart.bind(this)
        this.addItemToBasket=this.addItemToBasket.bind(this)
        this.handleRemoveFromBasket=this.handleRemoveFromBasket.bind(this)
        this.toggleBasketDrawerHandler=this.toggleBasketDrawerHandler.bind(this)
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.closeBasketDrawerHandler = this.closeBasketDrawerHandler.bind(this)
        this.setLocalStorage = this.setLocalStorage.bind(this)
        this.isItemAlreadyInBasket = this.isItemAlreadyInBasket.bind(this)
        this.updateItemQuantity = this.updateItemQuantity.bind(this)
        this.updateBasketTotal = this.updateBasketTotal.bind(this)
        this.updateBasketContentCount = this.updateBasketContentCount.bind(this)
        this.removeItemFromBasket = this.removeItemFromBasket.bind(this)
        this.updateBasketProductTypes = this.updateBasketProductTypes.bind(this)
        this.selectRelevantPostagePrice = this.selectRelevantPostagePrice.bind(this)
    }

 

    hydrateStateWithLocalStorage() {
    // for all items in state
        localStorage.get('count')? 
        this.setState({
            count: localStorage.get('count'),
            added: localStorage.get('added'),
            total: localStorage.get('total'),
            productTypeBreakdown: localStorage.get('productTypeBreakdown')

        }): 
        this.setState({
            count: 0
        })
    }

    componentDidMount(){
        this.hydrateStateWithLocalStorage()
        this.selectRelevantPostagePrice()
        
    }
    
    setLocalStorage(localStorageKey){
        const value = this.state[`${localStorageKey}`]
        localStorage.set(`${localStorageKey}`, value)        
    }

    updateBasketTotal(){
        this.setState(prevState=>{
            const calculateBasketTotal = 
            prevState.added
                .reduce((acc, item)=> acc=acc+(item.qty*item.price), 0)
                .toFixed(2)

            return {total: calculateBasketTotal}
        }, 
        ()=>{this.setLocalStorage("total")})
    }

    
    updateBasketProductTypes(prodType){
        
        this.setState(prevState =>{

            let typeTotal = prevState.added
            .reduce((acc, item) => 
                item.productType===prodType? 
                    acc+=item.qty:acc, 0
            )

            return prevState.productTypeBreakdown[prodType] = typeTotal
        },
        ()=>{this.setLocalStorage("productTypeBreakdown")}
        )
    }

    selectRelevantPostagePrice(destinationCategory){
        const {productTypeBreakdown} = this.state
        this.setState({
            destinationCategory : destinationCategory
        })

        this.setState(prevState => {
            let postageCost
        switch(destinationCategory){
            case "rest-of-world":
                if(productTypeBreakdown.sample<6 && productTypeBreakdown.caddy +  productTypeBreakdown.pouch<3){                        
                    postageCost = 9.12                       
                }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <5){  
                    postageCost = 11.6                        
                }else{
                    postageCost = 21.89
                }               
            break

            case "eu":                
            if(productTypeBreakdown.sample<9 && productTypeBreakdown.caddy +  productTypeBreakdown.pouch<3){                        
                postageCost = 5.1                       
            }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <10){  
                postageCost = 8.2                        
            }else{
                postageCost = 13.9
            }                
            break

            case "uk":
                if(productTypeBreakdown.sample<10 && productTypeBreakdown.caddy<1 && productTypeBreakdown.pouch<1){                        
                    postageCost = 1.8                        
                }else if (productTypeBreakdown.caddy+productTypeBreakdown.pouch<22){  
                    postageCost = 3.6                        
                }else{
                    postageCost = 8.1
                }
            
            break

            case "":                
                postageCost = 0                
            break

            default:
                postageCost = 0
        }

            return prevState.postageCost = postageCost
        }
            
        )
        
    }

    updateBasketContentCount(){
        this.setState(prevState=>{
            const productsAdded = prevState.added.reduce((acc, item)=> acc=acc+item.qty, 0)
            return {count: productsAdded}
        }, 
        ()=>{this.setLocalStorage("count")})
    }

    removeItemFromBasket(id){
        this.setState(prevState=>{
            const filterRemove = prevState.added.filter(item=> item.id!==id)
            return {added: filterRemove}
        }, 
        ()=>{this.setLocalStorage("added")})
    }

    //Remove Items from basket
    handleRemoveFromBasket(id, productType){
        const gtag = window.gtag
        gtag('event', 'remove from basket', {
            'event_category':`${id}`,
            'event_label':`${id}`
        })
        
        this.removeItemFromBasket(id)
        this.updateBasketTotal()
        this.updateBasketContentCount()       
        this.updateBasketProductTypes(productType)
        this.selectRelevantPostagePrice(this.state.destinationCategory)
    }


    isItemAlreadyInBasket(id){
       return this.state.added.reduce((acc,elem)=>elem.id===id? acc=true:acc, false )
    }

    addItemToBasket(productName,imgUrl, price, id, quantity, productType){
        this.setState(prevState=> {
            return {
            added: prevState.added.concat({productName,imgUrl, price, id, qty:quantity, productType})
            }},
            ()=>{this.setLocalStorage("added")}
        )
    }

    updateItemQuantity(id, quantity){
        this.setState(prevState=> {
            return prevState.added.map(item=>{
                if(item.id===id){
                item.qty = item.qty+quantity
                } 
                return item               
            })},
            ()=>{this.setLocalStorage("added")}
            )
    }



    //Add Item to Basket handling- changes basket counter, BasketDrawer, total    
    handleAddToCart(productName, imgUrl, price, id, quantity, productType){
        const gtag = window.gtag
        gtag('event', 'add to basket', {
            'event_category':`${productName}`,
            'event_label':`${productName}`
        })
        
        if(this.isItemAlreadyInBasket(id))
            {   
                this.updateItemQuantity(id, quantity) 
                
            }else{
                this.addItemToBasket(productName,imgUrl, price, id, quantity, productType )                               
            }

        this.updateBasketTotal()
        
        this.updateBasketContentCount()  
        
        this.updateBasketProductTypes(productType)
        this.selectRelevantPostagePrice(this.state.destinationCategory)
          
    }
    
    //open and close basket drawer
    toggleBasketDrawerHandler() {
        const gtag = window.gtag
        
            this.setState((prevState) => {
         return {basketDrawerOpen: !prevState.basketDrawerOpen}
        }, 
        
        ()=>gtag('event', `${this.state.basketDrawerOpen? "open":"close"} basket menu`, {
            'event_category':`basket navigation`,
            'event_label':`toggle basket drawer`
        }))
    }

    closeBasketDrawerHandler() {
        this.setState(
    {basketDrawerOpen: false}
    )
}
    
    
    
    render(){
        
        return(
            <Router>
            <div>
            {/*ever present header menu (basket) and the basketDrawer - BasketContentArra*/}
                <Header 
                counter={this.state.count} 
                toggleBasketDrawerHandler={this.toggleBasketDrawerHandler} 
                closeBasketDrawerHandler = {this.closeBasketDrawerHandler}
                />
                <ShippingContext.Provider value={this.state.postageCost}>
                <BasketDrawer 
                added={this.state.added} 
                handleRemoveFromBasket={this.handleRemoveFromBasket} 
                total={this.state.total} 
                basketDrawerOpen={this.state.basketDrawerOpen} 
                toggleBasketDrawerHandler={this.toggleBasketDrawerHandler}
                selectRelevantPostagePrice={this.selectRelevantPostagePrice}
                />
                </ShippingContext.Provider>

                <Switch>
                <Route exact path="/shop" render={(props)=>{
                {/*use the location prop to pass down information stored in a Link which is then used by the filter compontent - if you click on black tea Link on home page, it takes you to shop and filters the products based ont he prop*/}       
                    return(
                    <ShopPage location={this.props.location} handleAddToCart={this.handleAddToCart} {...props}/>
            
                    )
                }} />

                <Route path="/shop/:id" render={(props)=>{
                    return(
                    <ProductPage handleAddToCart={this.handleAddToCart}  {...props} />
                    )
                 }} />

                 <Route path="/cancel" render={(props)=>{
                     return (
                         <Cancel location={this.props.location}  {...props}/>
                     )
                 }}/>
                 <Route path="/success" render={(props)=>{
                     return (
                         <Success location={this.props.location}  {...props}/>
                     )
                 }}/>
                
                <Route path="/home" render={()=>{
                    return(
                    <Home />
                    )
                }} />
                
                <Route path="/media" render={()=>{
                    return(
                    <Media />
                    )
                }} />
                
                <Route path="/communitea_club" render={()=>{
                    return(
                    <CommuniTeaClub />
                    )
                }} />
                
                <Route path="/our_story" render={()=>{
                    return(
                    <OurStory />
                    )
                }} />

                <Route path="/" exact render={()=>{
                    return(
                    <Home />
                    )
                }} />
                
                <Route path="*" render={()=>{
                    return(
                    <FourOFour />
                    )
                }} />
                </Switch>
                
            </div>
            </Router>                
        )
    }
}

export default App