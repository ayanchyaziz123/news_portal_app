import {
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,

    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_FAIL,

    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,

    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_CREATE_RESET,

    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET,

    ARTICLE_CREATE_REVIEW_REQUEST,
    ARTICLE_CREATE_REVIEW_SUCCESS,
    ARTICLE_CREATE_REVIEW_FAIL,
    ARTICLE_CREATE_REVIEW_RESET,

    ARTICLE_TOP_REQUEST,
    ARTICLE_TOP_SUCCESS,
    ARTICLE_TOP_FAIL,

    ARTICLE_OFFER_REQUEST,
    ARTICLE_OFFER_SUCCESS,
    ARTICLE_OFFER_FAIL,

    ARTICLE_COUPON_REQUEST,
    ARTICLE_COUPON_SUCCESS,
    ARTICLE_COUPON_FAIL

} from '../constants/articleConstants'


export const couponListReducer = (state = { copuns: [] }, action) =>{
    switch(action.type){
        case ARTICLE_COUPON_REQUEST:
            console.log('log with' , action.type)
            return {loading: true, coupons: []}
        case ARTICLE_COUPON_SUCCESS:
            console.log('log with', action.type)
            return{
                loading: false,
                coupon_redemptions: action.payload.coupon_redemptions,
                coupons: action.payload.coupons

            }   
        case ARTICLE_COUPON_FAIL:
            console.log('log with', action.type)
            return {
                loading: false,
                error: action.payload

            } 
        default:
            return state
            
    }
}

export const articleListReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ARTICLE_LIST_REQUEST:
            return { loading: true, articles: [] }

        case ARTICLE_LIST_SUCCESS:
            return {
                loading: false,
                articles: action.payload.articles,
                topProducts: action.payload.topProducts,
                categories: action.payload.categories,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case ARTICLE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const articleDetailsReducer = (state = { article: {}, reviews: [], categories: [] }, action) => {
    switch (action.type) {
        case ARTICLE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case ARTICLE_DETAILS_SUCCESS:
            return { loading: false, 
                     article: action.payload.article,
                     reviews: action.payload.reviews,
                     categories: action.payload.categories
            }

        case ARTICLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_DELETE_REQUEST:
            return { loading: true }

        case ARTICLE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case ARTICLE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const articleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_CREATE_REQUEST:
            return { loading: true }

        case ARTICLE_CREATE_SUCCESS:
            return { loading: false, success: true, article: action.payload.article, categories: action.payload.categories}

        case ARTICLE_CREATE_FAIL:
            return { loading: false, error: action.payload.error }

        case ARTICLE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const articleUpdateReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case ARTICLE_UPDATE_REQUEST:
            return { loading: true }

        case ARTICLE_UPDATE_SUCCESS:
            return { loading: false, success: true, article: action.payload.article, categories: action.payload.categories }

        case ARTICLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case ARTICLE_UPDATE_RESET:
            return { article: {} }

        default:
            return state
    }
}



export const articleReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case ARTICLE_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case ARTICLE_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case ARTICLE_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const articleTopRatedReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ARTICLE_TOP_REQUEST:
            return { loading: true, articles: [] }

        case ARTICLE_TOP_SUCCESS:
            return { loading: false, articles: action.payload, }

        case ARTICLE_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const articleOfferRatedReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ARTICLE_OFFER_REQUEST:
            return { loading: true, articles: [] }

        case ARTICLE_OFFER_SUCCESS:
            return { loading: false, articles: action.payload.articles, }

        case ARTICLE_OFFER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

