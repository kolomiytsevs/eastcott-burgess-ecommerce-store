import React from 'react'
import localStorage from 'local-storage'

import './Checkout.css'

class CheckoutBtn extends React.Component {
    constructor(){
      super()
      this.state={
        alert:"",
        loading:false
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleSubmit(event){
      const gtag = window.gtag
      event.preventDefault()
      if(localStorage.get('postalCategory')!==null && localStorage.get('postalCategory')!==""){
        this.setState({
          loading:true
        }, ()=> 
        gtag('event', 'initiate checkout', {
            'event_category':`paypal`,
            'event_label':`paypal`
        }))
      //proxy of localhost:5000/pay has been applied in client package.json to avoid CORS issues
      fetch('/api/paypal/pay',{
        method: 'POST',
        body: JSON.stringify({
          items: localStorage.get('added'),
          postalCategory: localStorage.get('postalCategory'),
          productTypeBreakdown: localStorage.get('productTypeBreakdown')
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        return res.json();
    })  
    .then(data => {
      window.location.replace(data.redirectUrl);
      /*this.setState({
        loading:false
      })*/
    }) 
    .catch(err => {
        console.log(err);
    });
    }else{
      this.setState({
        alert: "please enter postage destination"
      })
    }
  
  }
  
    render(){
    return (
      <div>
             <p style={{color:"red", textAlign:"center"}}>{this.state.alert}</p>
             <div className="checkout-div"
              onClick={this.handleSubmit} 
              ><div className={this.state.loading? "hideLoader":"showLoader"}>Checkout</div><i className={this.state.loading? "showLoader":"hideLoader"}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></i>
            </div>
      </div>
    );
    }
  }



export default CheckoutBtn