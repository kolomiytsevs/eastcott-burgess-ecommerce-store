import React from 'react'
import CountryList from './CountryList'
import localStorage from 'local-storage'
import './ShippingSelect.css'

import {ShippingContext} from '../../App'

class ShippingSelect extends React.Component{
    constructor(){
        super()
        this.state={
            selectedDestination:"",
            destinationCategory:"",
            postageCost:0,


        }
        this.handleInputChange=this.handleInputChange.bind(this)
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this)
       
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        localStorage.get('count')? 
        this.setState({
            selectedDestination: localStorage.get('selectedDestination'),
            destinationCategory: localStorage.get('postalCategory')
        }): 
        this.setState({
            count: 0
        })
      }
    
        componentWillMount(){
            this.hydrateStateWithLocalStorage()            
        }

        

        /*selectRelevantPostagePrice(destinationCategory){
            const {productTypeBreakdown} = this.state
            let postageCost
            switch(destinationCategory){
                case "rest-of-world":
                    postageCost = 11.6                
                break

                case "eu":                
                    postageCost = 8.2                
                break

                case "uk":
                    if(productTypeBreakdown.sample<10 && productTypeBreakdown.caddy<1 && productTypeBreakdown.pouch<1){                        
                        postageCost = 1.8                        
                    }else{                        
                        postageCost = 3.6                        
                    }
                
                break

                case "":                
                    postageCost = 0                
                break

                default:
                    postageCost = 0
            }

            this.setState({
                postageCost: postageCost
            })
            
        }*/

        componentDidMount(){

            this.props.selectRelevantPostagePrice(this.state.destinationCategory)
            
        }

    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        },
        ()=>{
            let postalCategory = this.state.selectedDestination
            this.setState({
                destinationCategory: CountryList[postalCategory]
            },
            ()=> {
                localStorage.set("selectedDestination", this.state.selectedDestination)
                localStorage.set("postalCategory", this.state.destinationCategory)

                this.props.selectRelevantPostagePrice(this.state.destinationCategory)
            }
            )
            
        }
        )      
    }

    render(){
        return(
            <ShippingContext.Consumer>
                {postageCost => (

            <div className="shipping-select">
                <form>
                    <select 
                    value={this.state.selectedDestination}
                    name="selectedDestination"
                    onChange={this.handleInputChange}
                    >
                        {Object.keys(CountryList).map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </form>
                <h4>+ P&amp;P: £ {postageCost}</h4>
            </div>
                )}
            </ShippingContext.Consumer>
        )
    }
}

export default ShippingSelect