import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    couponListReducer,
    articleListReducer,
    articleDetailsReducer,
    articleDeleteReducer,
    articleCreateReducer,
    articleUpdateReducer,
    articleReviewCreateReducer,
    articleTopRatedReducer,
    articleOfferRatedReducer
    
} from './reducers/articleReducers'

import { cartReducer } from './reducers/cartReducers'


import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userDetailsReducerByAdmin,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

import{
    contactCreateReducer,
} from './reducers/contactReducer'

const reducer = combineReducers({
    couponList: couponListReducer,
    articleList: articleListReducer,
    articleDetails: articleDetailsReducer,
    articleDelete: articleDeleteReducer,
    articleCreate: articleCreateReducer,
    articleUpdate: articleUpdateReducer,
    articleReviewCreate: articleReviewCreateReducer,
    articleTopRated: articleTopRatedReducer,
    articleOfferRated: articleOfferRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDetailsAdmin: userDetailsReducerByAdmin,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,

    contactCreate: contactCreateReducer,


})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store