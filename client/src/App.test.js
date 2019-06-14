/*
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

import React from 'react';
import App from './App'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })


describe('App Component handleAddToCart Breakdown', ()=>{
  let wrapper
  
  const AddToCart_YS = {    
    productName_ys: 'Ya Shi Dan Cong',
    imgUrl_ys: 'ya-shi-dancong.jpg',
    price_ys:1200,
    id_ys:'ool_DC_YS_s18_20g_pouch',
    quantity_ys:2,
    productType_ys:'caddy'
}
  const AddToCart_MLX = {    
    productName_mlx: 'Mi Lan Xiang',
    imgUrl_mlx: 'mi-lan-xiang.jpg',
    price_mlx:1400,
    id_mlx:'ool_DC_MLX_s18_20g_pouch',
    quantity_mlx:3,
    productType_mlx:'caddy'
  }
  beforeEach(()=>{
    wrapper = mount(<App />)
  })

  const {productName_ys, imgUrl_ys, price_ys, id_ys, quantity_ys, productType_ys} = AddToCart_YS
  const {productName_mlx, imgUrl_mlx, price_mlx, id_mlx, quantity_mlx, productType_mlx} = AddToCart_MLX

  it('should use addItemToBasket to update added state with passed props', ()=>{

    const classInstance = wrapper.instance()
    
    classInstance.addItemToBasket(productName_ys, imgUrl_ys, price_ys, id_ys, quantity_ys, productType_ys)
    const newState = classInstance.state.added[0]
    expect(newState).toEqual({"id": id_ys, "imgUrl": imgUrl_ys, "price": price_ys, "productName": productName_ys, "productType": productType_ys, "qty": quantity_ys})
  })
  
  it('should trigger remove from basket', ()=>{

    const classInstance = wrapper.instance()

    classInstance.addItemToBasket(productName_ys, imgUrl_ys, price_ys, id_ys, quantity_ys, productType_ys)
    classInstance.addItemToBasket(productName_mlx, imgUrl_mlx, price_mlx, id_mlx, quantity_mlx, productType_mlx)
    const newState = classInstance.state.added
    expect(newState.length).toEqual(2)
    classInstance.removeItemFromBasket(id_ys)
    const updatedState = classInstance.state.added
    expect(updatedState.length).toEqual(1)
  })

})