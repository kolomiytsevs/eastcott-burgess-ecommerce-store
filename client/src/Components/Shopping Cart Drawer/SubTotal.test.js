import React from 'react'
import SubTotal from './SubTotal'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('another fake test', ()=>{
    expect(true).toBeTruthy()
})

const SubTotalPropsA = {
    total: 1200/100
}
const SubTotalPropsB = {
    total: 1523/100
}



test('should show in stock text', ()=>{
    const wrapper = shallow(<SubTotal {...SubTotalPropsA}/>)
    const text = wrapper.find('h4')
    expect(text.text()).toBe('Subtotal: £ 12')
})

test('should show in stock text', ()=>{
    const wrapper = shallow(<SubTotal {...SubTotalPropsB}/>)
    const text = wrapper.find('h4')
    expect(text.text()).toBe('Subtotal: £ 15.23')
})