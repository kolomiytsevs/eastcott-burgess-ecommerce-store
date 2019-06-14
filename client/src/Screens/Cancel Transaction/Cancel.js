import React from 'react'
import localStorage from 'local-storage'
import qs from 'query-string'
import axios from 'axios'

import './Cancel.css'

class Cancel  extends React.Component {
    constructor(){
      super()
      this.state={
        message: ""
      }
      

    }
  
    componentDidMount(){
        //console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token)

        axios.get('/api/paypal/cancel_api')
        .then(res=> {
            
            const message = res.data.message
            this.setState({
                message
            })
        })
        .catch(function (error) {
          console.log(error);
        });

      /*fetch('/cancel',{
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        return res.json()
    })  
    .then(data => {
        this.setState({
            cancelled: data.message
        })
    }) 
    .catch(err => {
        console.log(err)
    })*/
    }
  
    render(){
    return (
      <div className="cancel-div">
            <strong>Payment Cancelation Status:</strong>
            <br />
            {this.state.message}
      </div>
    );
    }
  }



export default Cancel