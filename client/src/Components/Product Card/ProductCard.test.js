import React from 'react'
import ProductCard from './ProductCard'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('another fake test', ()=>{
    expect(true).toBeTruthy()
})

const ProductCardProps = {
    good:{
        id:"ool_TGY_XZ_a17_caddy",
        imgUrl:"v1558877289/TGY%20ZW/100%20kb/_MG_9698_vuv0kc.jpg",
        imgUrl_1:"v1558877289/TGY%20ZW/100%20kb/_MG_9656_nlqi3v.jpg",
        productName:"Tie Guan Yin Xiao Zheng Autumn 2017",
        price:1623,
        inStock:true,
    },
    id:"ool_TGY_XZ_a17_caddy",
    imgUrl:"v1558877289/TGY%20ZW/100%20kb/_MG_9698_vuv0kc.jpg",
    imgUrl_1:"v1558877289/TGY%20ZW/100%20kb/_MG_9656_nlqi3v.jpg",
    productName:"Tie Guan Yin Xiao Zheng Autumn 2017",
    price:1623/100,
    inStock:true,
    key:"ool_TGY_XZ_a17_caddy",
    handleAddToCart: ()=> {
        console.log("item added to cart")
    }
}

test('yet another fake snapshot test', ()=>{
    const component = renderer.create(
        <Router>
        <ProductCard {...ProductCardProps}/>
        </Router>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
})


test('should show in stock text', ()=>{
    const wrapper = shallow(<ProductCard {...ProductCardProps}/>)
    const text = wrapper.find('h3')
    expect(text.text()).toBe('£ 16.23')
})

/*test('on hover image should change', ()=>{
    const wrapper = shallow(<ProductCard {...ProductCardProps}/>)
    const image = wrapper.find('img')
    image.simulate('mouseover')
    wrapper.update()
    expect(wrapper.state('displayImg')).toBe(`v1558877289/TGY%20ZW/100%20kb/_MG_9656_nlqi3v.jpg`)
    
})

test('on hover image should change', ()=>{
    const wrapper = shallow(<ProductCard {...ProductCardProps}/>)
    const image = wrapper.find('img')
    image.simulate('mouseover')
    expect(image.prop('src')).toBe(`v1558877289/TGY%20ZW/100%20kb/_MG_9656_nlqi3v.jpg`)
    
})*/