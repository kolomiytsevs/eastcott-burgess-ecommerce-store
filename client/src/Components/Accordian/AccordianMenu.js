import React from "react"

import "./AccordianMenu.css"


class AccordianMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            categoryExpanded:"",
        }
        this.handleSelection=this.handleSelection.bind(this)
    }
        
        componentWillMount(){
            this.setState({
                categoryExpanded: this.props.item.accordian[0].id
            })
        }

        handleSelection(event){
            let {id} = event.currentTarget.dataset
            this.setState({
                categoryExpanded: id
            })
        }

    render(){
        return(
            <div className="menu">
                <div className="menu-body">
               { /*map each category within the description array to the accordian menu template. The id of each category helps us manage the state and determine which should be open. On click the id gets pushed to the catSelected state and if the state matches uo to the id of the caegory that category will adopt the 'menu-item-selected' className and appear open via css.*/}
                {this.props.item.accordian.map(descriptionCategory => <div key={descriptionCategory.id} data-id={descriptionCategory.id}  onClick={this.handleSelection} className={this.state.categoryExpanded===descriptionCategory.id? "menu-item-selected":"menu-item"}><h4>{descriptionCategory.title}</h4>
                <div className="p">{descriptionCategory.body}</div>
                </div>)}
                
                </div>
            </div>
        )
    }
}

export default AccordianMenu