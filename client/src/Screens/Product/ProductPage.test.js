import React from 'react'
import ProductPage, {ThumbnailImg, AddToCartBtn} from './ProductPage'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })


const match = { params: { id: "ool_DC_YS_s18_20g_pouch" } }

describe('Product Page Image Component', ()=>{
    
    const wrapper = shallow(<ProductPage match={match}/>)
    const classInstance = wrapper.instance()
    const urlProp = 'v1558890072/MLX%20DC/_MG_1103_j3i.jpg'
    const mainImage = wrapper.find('.main-product-img').at(1)

    test('initial image url', ()=>{
        expect(wrapper.state('mainProductImg')).toBe('v1558890072/MLX%20DC/_MG_1103_j3irfu.jpg')
        expect(mainImage.prop('src')).toBe('https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_550,q_auto,e_sharpen:90,w_400/v1558890072/MLX%20DC/_MG_1103_j3irfu.jpg')
    })

    it('should change mainProductImg state to clicked img', ()=>{
        
        classInstance.handleThumbnailImgClick(urlProp)
        const newState = classInstance.state.mainProductImg
        expect(newState).toBe(urlProp)
    })
    
    it('should update main image to clicked/passed url', ()=>{
        const mainImage = wrapper.find('.main-product-img').at(1)
        classInstance.handleThumbnailImgClick(urlProp)
        expect(mainImage.prop('src')).toBe(`https://res.cloudinary.com/eastcott-and-burgess/image/upload/c_fill,f_auto,h_550,q_auto,e_sharpen:90,w_400/${urlProp}`)
    })

})

describe('Thumbnail Img Component', ()=>{
    
    let mockFunc = jest.fn()
    const ThumbnailProps = {
        productName:'Ya Shi Dan Cong',
        imgUrl: 'v189/image.jpg',
        handleThumbnailImgClick: mockFunc
    }
    const wrapper = shallow(<ThumbnailImg {...ThumbnailProps}/>)
    const img = wrapper.find('img')
    
    test('thumbnail click should trigger handleThumbnailImgClick func', ()=>{
        img.simulate('click')
        const callback = mockFunc.mock.calls[0][0]
        expect(callback).toBe(ThumbnailProps.imgUrl)
    })

    test('thumbnail should display alt text', ()=>{
        expect(img.prop('alt')).toBe(ThumbnailProps.productName)
    })
    
})

describe('Add to Cart Button Component', ()=>{
    let mockFunc = jest.fn()
    let AddToCartProps = {
        item:{
           productName: 'Ya Shi Dan Cong',
           imgUrl: 'ya-shi-dancong.jpg',
           inStock:true

        },
        handleAddToCart: mockFunc,
        selectedVariationPrice:1200,
        selectedVariationId:'ool_DC_YS_s18_20g_pouch',
        quantity:2,
        productType:'caddy'
    }
    let AddToCartPropsOutOfStock = {
        item:{
           productName: 'Ya Shi Dan Cong',
           imgUrl: 'ya-shi-dancong.jpg',
           inStock:false

        },
        handleAddToCart: mockFunc,
        selectedVariationPrice:1200,
        selectedVariationId:'ool_DC_YS_s18_20g_pouch',
        quantity:2,
        productType:'caddy'
    }

    
    it('should render inStock button', ()=>{
        const wrapper = shallow(<AddToCartBtn {...AddToCartProps} />)
        const button = wrapper.find('button')
        expect(button.text()).toContain('Add to Basket')
    })

    it('should render Out of Stock button', ()=>{
        const wrapper = shallow(<AddToCartBtn {...AddToCartPropsOutOfStock} />)
        const button = wrapper.find('button')
        expect(button.text()).toContain('Out of Stock')
    })

    it('should not contain in stock', ()=>{
        const wrapper = shallow(<AddToCartBtn {...AddToCartPropsOutOfStock} />)
        const button = wrapper.find('button')
        expect(button.text()).not.toContain('Add to Cart')  
    })
    
    test('on add to basket handle event should be triggered',  ()=>{
        const wrapper = shallow(<AddToCartBtn {...AddToCartProps} />)
        const button = wrapper.find('button')
        const {productName, imgUrl, inStock} = AddToCartProps.item
        const {selectedVariationId, selectedVariationPrice, quantity, productType} = AddToCartProps
        button.simulate('click')
        const callback = mockFunc.mock.calls[0]
        expect(callback).toEqual([productName, imgUrl, selectedVariationPrice/100, selectedVariationId, quantity, productType])
    })
    
})