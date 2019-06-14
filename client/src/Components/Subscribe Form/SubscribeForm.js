import React from 'react'

class SubscribeForm extends React.Component {
    constructor(props){
        super()
        this.state={
            email:''
        }
        this.handleSubscribe=this.handleSubscribe.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
    }

    handleSubscribe(event){
        //event.preventDefault()
        fetch('/signup',{
        method: 'POST',
        body: JSON.stringify({
            email: this.state.email
        }),
        headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            return res.json();
        })  
        .catch(err => {
            console.log(err);
        })
    }
    
    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        })        
    }
    
    render(){
        return(
        <form onSubmit={this.handleSubscribe}>
            <div style={{flexWrap:"wrap"}}>
               <input className="form-textbox" type="email" value={this.state.email} name="email" id="email" placeholder="email address" onChange={this.handleInputChange}/>
               <input type="submit" value="subscribe" className="subscribe-btn"/>
            </div>
        </form>
        )
    }
}


export default SubscribeForm