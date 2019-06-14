import React from "react"
import {Link, NavLink} from "react-router-dom"
import "./Header.css"
//import logo from "./logo.png"
import {BasketIcon, MediaIcon, LoginIcon, YouTubeIcon, InstagramIcon, HomeIcon, LeafIcon, BinocularsIcon} from '../svgIcons'

const MainNavLink = (props)=> (
    <Link to={props.to} className={props.className} style={{cursor:"pointer", textDecoration:"none", color:"white"}}>{props.linkText}</Link>
)

const MobNavIcon = (props) => (
    <NavLink activeClassName={"is-active"} to={props.to} onClick={props.closeBasketDrawerHandler} className={props.className} style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}>
        {props.Icon}<br/><p>{props.linkText}</p></NavLink>
)


const Header = (props) => (
    <div>
        {/*Header navigation*/}
        <nav className="main-nav" style={{}}>
            <Link to="/home" className="nav-logo"><img src={"https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_scale,f_auto,q_auto:low,w_60/v1559151437/logo_-_white_-png_eftean.png"} alt="eastcott and burgess logo" style={{ alignSelf:"center"}}/></Link>
            <div className="nav-links">
                <MainNavLink to="/home" className="link-home" linkText="Home"/>
                <MainNavLink to="/shop" className="link-shop" linkText="Shop"/>
                <MainNavLink to="/communitea_club" className="link-club" linkText="CommuniTea Club"/>
                <MainNavLink to="/our_story" className="link-story" linkText="Our Story"/>
                <MainNavLink to="/media" className="link-media" linkText="Media"/>

            {/*<Link to="/home" className="link-home" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Home</Link>
            <Link to="/shop" className="link-shop" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Shop</Link>
            <Link to="/communitea_club" className="link-club" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>CommuniTea Club</Link>
            <Link to="/our_story" className="link-story" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Our Story</Link>
            <Link to="/media" className="link-media" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Media</Link>*/}
            </div>
            <div className="social">
                <div style={{fontSize:"15px"}}> <a href="https://www.instagram.com/theteabottega/" target="_blank"><InstagramIcon /></a></div>
                <div style={{fontSize:"15px"}}> <a href="https://www.youtube.com/channel/UCDubbvSBm0EgdzWU1y1cfnw" target="_blank"><YouTubeIcon/></a></div>
            </div> 
                  
            <div className="login-sign"> <a href="#" style={{textDecoration:"none"}}><LoginIcon/>Login</a></div>
             
            <div  className="basket-div" style={{marginRight:"10px" , color:"white", cursor:"pointer", fontSize:"10px", alignSelf:"center", marginLeft:"auto"}} onClick={props.toggleBasketDrawerHandler}><BasketIcon /><span className="badge badge-warning" style={{color:"white" , fontFamily:"verdana", fontSize:"15px"}}>{props.counter}</span></div>
        </nav>
        {/*Mobile Navigation */}
        <nav className="mobile-nav" style={{backgroundColor: "grey",
            boxShadow: "0px 1px 1px 1px rgba(68, 68, 68, 0.2)", color:"white"}}>
            <MobNavIcon 
                to="/home" 
                closeBasketDrawerHandler={props.closeBasketDrawerHandler} 
                className="mob-home" 
                Icon = {<HomeIcon />} 
                linkText="Home">                
            </MobNavIcon>
            <MobNavIcon 
                to="/shop" 
                closeBasketDrawerHandler={props.closeBasketDrawerHandler} 
                className="mob-shop" 
                Icon = {<LeafIcon />} 
                linkText="Shop">                
            </MobNavIcon>
            <MobNavIcon 
                to="/our_story" 
                closeBasketDrawerHandler={props.closeBasketDrawerHandler} 
                className="mob-story" 
                Icon = {<BinocularsIcon />} 
                linkText="Explore">                
            </MobNavIcon>
            <MobNavIcon 
                to="/media" 
                closeBasketDrawerHandler={props.closeBasketDrawerHandler} 
                className="mob-media" 
                Icon = {<MediaIcon />} 
                linkText="Media">                
            </MobNavIcon>
            

            {/*<Link 
                to="/home" 
                onClick={props.closeBasketDrawerHandler} 
                className="mob-home" 
                style={{cursor:"pointer", 
                textDecoration:"none", 
                color:"white", 
                alignSelf:"center"}}>
                    <HomeIcon />
                    <br/>
                    <p>Home</p>
            </Link>
            <Link to="/shop" onClick={props.closeBasketDrawerHandler} className="mob-shop" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><LeafIcon /><br/><p>Shop</p></Link>
            <Link to="/our_story" onClick={props.closeBasketDrawerHandler} className="mob-story" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><BinocularsIcon/><br/><p>Explore</p></Link>
            <Link to="/media" onClick={props.closeBasketDrawerHandler} className="mob-media" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><MediaIcon /><br/><p>Media</p></Link>   */}
            <div  className="mob-basket" style={{marginRight:"10px" , paddingTop:"5px", color:"white", cursor:"pointer", fontSize:"10px", alignSelf:"center"}} onClick={props.toggleBasketDrawerHandler}><BasketIcon />
             <span className="badge badge-warning" style={{color:"white" , fontFamily:"verdana", fontSize:"15px"}}>{props.counter}</span><br/><p>Cart</p></div>
        </nav>
       {/* <nav className="main-nav" style={{}}>
            <Link to="/home" className="nav-logo"><img src={"https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_scale,f_auto,q_auto:low,w_60/v1559151437/logo_-_white_-png_eftean.png"} style={{ alignSelf:"center"}}/></Link>
            <div className="nav-links">
            <Link to="/home" className="link-home" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Home</Link>
            <Link to="/shop" className="link-shop" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Shop</Link>
            <Link to="/communitea_club" className="link-club" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>CommuniTea Club</Link>
            <Link to="/our_story" className="link-story" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Our Story</Link>
            <Link to="/media" className="link-media" style={{cursor:"pointer", textDecoration:"none", color:"white"}}>Media</Link>
            </div>
            <div className="social">
                <div style={{fontSize:"15px"}}> <a href="https://www.instagram.com/theteabottega/" target="_blank"> <i className="fab fa-instagram fa-lg"></i></a></div>
                <div style={{fontSize:"15px"}}> <a href="https://www.youtube.com/channel/UCDubbvSBm0EgdzWU1y1cfnw" target="_blank"> <i className="fab fa-youtube fa-lg"></i></a></div>
                </div>   
                <div className="login-sign"> <a href="#" style={{textDecoration:"none"}}> <i className="far fa-user"></i> Login</a></div>
             
            <div  className="basket-div" style={{marginRight:"10px" , color:"white", cursor:"pointer", fontSize:"10px", alignSelf:"center", marginLeft:"auto"}} onClick={props.toggleBasketDrawerHandler}><i className="fas fa-shopping-cart fa-2x"> <span className="badge badge-warning" style={{color:"white" , fontFamily:"verdana", fontSize:"15px"}}>{props.counter}</span></i></div>
        </nav>
        {/*Mobile Navigation */}
        {/*<nav className="mobile-nav" style={{backgroundColor: "grey",
            boxShadow: "0px 1px 1px 1px rgba(68, 68, 68, 0.2)", color:"white"}}>
            <Link to="/home" className="mob-home" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><i className="fas fa-home"></i><br/><p>Home</p></Link>
            <Link to="/shop" className="mob-shop" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><i className="fas fa-leaf"></i><br/><p>Shop</p></Link>
            <Link to="/our_story" className="mob-story" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><i className="fas fa-binoculars"></i><br/><p>Explore</p></Link>
            <Link to="/media" className="mob-media" style={{cursor:"pointer", textDecoration:"none", color:"white", alignSelf:"center"}}><i className="fas fa-film"></i><br/><p>Media</p></Link>   
            
 
            <div  className="mob-basket" style={{marginRight:"10px" , paddingTop:"5px", color:"white", cursor:"pointer", fontSize:"10px", alignSelf:"center"}} onClick={props.toggleBasketDrawerHandler}><i className="fas fa-shopping-cart fa-2x"> <span className="badge badge-warning" style={{color:"white" , fontFamily:"verdana", fontSize:"15px"}}>{props.counter}</span></i><br/><p>Cart</p></div>
        </nav>*/}
    </div>
)

export default Header