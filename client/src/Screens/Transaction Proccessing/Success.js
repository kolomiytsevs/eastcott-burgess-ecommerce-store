import React from 'react'
import qs from 'query-string'
import './Success.css'
import localStorage from 'local-storage'

class Success extends React.Component {
    constructor(){
      super()
      this.state={
        message: "",
        loading:false
      }

    }
  
    componentDidMount(){
        console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }))
        console.log(this.props.location.search)
      this.setState({
        loading:true
      })  
      fetch(`/api/paypal/success_api${this.props.location.search}`,{
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
        this.setState({
            message: data.message
        })
    })
    .then( ()=>{this.setState({
      loading:false
    })}
      
    ) 
    .catch(err => {
        console.log(err);
    });
    }
  
    render(){
    return (
      <div className="success-container">
            <strong>Transaction Page</strong>
            <br />
            <i className={this.state.loading? "showLoader":"hideLoader"}><div>Please dont't leave this page until transaction has gone through</div><div className="lds-ring-b"><div></div><div></div><div></div><div></div></div></i>
            {this.state.message}
      </div>
    );
    }
  }



export default Success