import React from 'react'
import {Link} from "react-router-dom"
import {Helmet} from 'react-helmet'

import "./Home.css"
import GramFeed from '../../Components/Instafeed/InstaFeed'
import SubscribeForm from '../../Components/Subscribe Form/SubscribeForm';


const gtag = window.gtag


const Home = () => (
    
    <div style={{marginTop:"70px"}}>
        <Helmet>
            <title>Chinese Loose Leaf Tea | Eastcott &amp; Burgess | Order Online UK</title>
            <meta name="description" content="The Eastcott and Burgess Tea Bottega offers premium loose leaf teas, custom blends, and rare whole leaf pure teas. Carefully sourced from around the world."></meta>
            <meta property="og:description" content="The Eastcott and Burgess Tea Bottega offers premium loose leaf teas, custom blends, and rare whole leaf pure teas. Carefully sourced from around the world."></meta>
        </Helmet>
        <div className="container" style={{display:"flex", justifyContent:"center", textAlign:"center", margin:"15px auto 15px auto"}}>
            <h3 style={{fontWeight:"lighter", fontSize:"22px"}}>Devoted to discovering the most complex flavours.</h3>
        </div>
        <div className="container main-container" style={{display:"flex", flexDirection:"column", borderRadius:"5px",justifyContent:"flex-start", height:"350px", backgroundImage:`url(https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,dpr_auto,f_auto,g_west,h_400,q_auto:low,w_1000,x_0,y_2157/v1558605303/picking_tea_kvm4d9.jpg)`, backgroundSize:"cover", padding:"0px", opacity:"1"}}>
            <div className="cat-container" style={{display:"flex", height:"auto", alignSelf:"flex-start", backgroundColor:"rgba(255, 255, 255, 0.836)", flexWrap:"wrap", justifyContent:"center", fontWeight:600, width:"100%"}}>
                <Link to={{
                    pathname:'/shop',
                    state:{
                        type:'black'
                    }
                }} className="category_btn" style={{textAlign:"center", alignSelf:"center",  padding:"10px"}} onClick={()=>gtag('event', 'category click', {
                    'event_category':'feature box navigation',
                    'event_label':'black tea'
                })}>Black Tea</Link>
                <Link to={{
                    pathname:'/shop',
                    state:{
                        type:'oolong'
                    }
                }} className="category_btn" style={{textAlign:"center", alignSelf:"center", padding:"10px"}} onClick={()=>gtag('event', 'category click', {
                    'event_category':'feature box navigation',
                    'event_label':'oolong tea'
                })}>Oolong</Link>
                <Link to={{
                    pathname:'/shop',
                    state:{
                        type:'white'
                    }}} className="category_btn" style={{textAlign:"center", alignSelf:"center", padding:"10px"}} onClick={()=>gtag('event', 'category click', {
                    'event_category':'feature box navigation',
                    'event_label':'white tea'
                })}>White Tea</Link>
                <Link to={{
                    pathname:'/shop',
                    state:{
                        type:'tisane'
                    }
                }} className="category_btn" style={{textAlign:"center", alignSelf:"center", padding:"10px"}} onClick={()=>gtag('event', 'category click', {
                    'event_category':'feature box navigation',
                    'event_label':'tisane tea'
                })}>Tisane</Link>
                <Link to={{
                    pathname:'/shop',
                    state:{
                        type:'green'
                    }}} className="category_btn" style={{textAlign:"center", alignSelf:"center", padding:"10px"}} onClick={()=>gtag('event', 'category click', {
                    'event_category':'feature box navigation',
                    'event_label':'green tea'
                })}>Green Tea</Link>
            </div>
            <div className="container bottombar" style={{display:"flex", height:"auto", alignSelf:"flex-end", flexWrap:"wrap", justifyContent:"flex-end", marginTop:"auto", padding:"0px"}}>
                <Link to="/shop" className="shop-btn" id="shop-btn" style={{textAlign:"center", alignSelf:"center", flex:"1", padding:"15px", borderRadius:"0px 0px 0px 5px"}} onClick={()=>gtag('event', 'shop click', {
                    'event_category':'feature box navigation',
                    'event_label':'shop button'
                })}
                >SHOP</Link>
                <Link to="/our_story" className="explore_btn" style={{textAlign:"center", alignSelf:"center", padding:"15px", flex:"1", borderRadius:"0px 0px 5px 0px"}} onClick={()=>gtag('event', 'explore click', {
                    'event_category':'feature box navigation',
                    'event_label':'explore button'
                })}>EXPLORE</Link>

            </div>
        </div>

        <div className="container" style={{display:"flex", justifyContent:"center", textAlign:"center", margin:"20px auto 20px auto"}}>
            <h1 style={{fontSize:"22px", fontStyle:"italic", fontWeight:"normal"}}>Chinese teas from the most prized terroirs. Sourced directly from family gardens in 2018.</h1>
        </div>
        <div className="container subscribe-container" style={{display:"flex", flexDirection:"column", borderRadius:"5px",justifyContent:"center",  backgroundImage:`url(https://res.cloudinary.com/eastcott-and-burgess/image/upload/f_auto,q_auto:low/v1558960663/ae507e_46d368c57b5c4dfb977db0fc1fd6938e_mv2_zm6m5a.webp)`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover", padding:"20px", textAlign:"center"}}>
            <h4 style={{textShadow: "0px 0px 8px black"}}>LET'S STAY IN TOUCH.</h4>
            <p>Be the first to hear about our giveaways, special offers, and of course, to follow our tea journey.</p>
            <SubscribeForm />
        </div>
        <GramFeed />
    </div>
)

export default Home