import axios from 'axios'
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

    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,

    ARTICLE_CREATE_REVIEW_REQUEST,
    ARTICLE_CREATE_REVIEW_SUCCESS,
    ARTICLE_CREATE_REVIEW_FAIL,


    ARTICLE_TOP_REQUEST,
    ARTICLE_TOP_SUCCESS,
    ARTICLE_TOP_FAIL,

    ARTICLE_OFFER_REQUEST,
    ARTICLE_OFFER_SUCCESS,
    ARTICLE_OFFER_FAIL,

    ARTICLE_COUPON_REQUEST,
    ARTICLE_COUPON_SUCCESS,
    ARTICLE_COUPON_FAIL

} from '../constants/articleConstants';

export const listCoupons = () => async (dispatch) => {
    try{
        dispatch({type: ARTICLE_COUPON_REQUEST})

        const { data } = await axios.get(`/api/articles/coupons/`)

        dispatch(
            {
                type: ARTICLE_COUPON_SUCCESS,
                payload: data

            }
        )
    }
    catch(error)
    {
        dispatch({
            type: ARTICLE_COUPON_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}

export const listArticles = (keyword = '') => async (dispatch) => {
    console.log("Hello world..")
    try {
        dispatch({ type: ARTICLE_LIST_REQUEST })
        const { data } = await axios.get(`http://localhost:4000/api/article${keyword}`)

        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopArticles = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_TOP_REQUEST })

        const { data } = await axios.get(`/api/article/top/`)

        dispatch({
            type: ARTICLE_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listOfferArticles = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_OFFER_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/article/offerArticle`)

        dispatch({
            type: ARTICLE_OFFER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_OFFER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listArticleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/article/getArticle/${id}`)

        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteArticle = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo ? userInfo.token : null}`
            }
        }

        const { data } = await axios.delete(
            `http://localhost:4000/api/article/deleteArticle/${id}`,
            config
        )

        dispatch({
            type: ARTICLE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createArticle = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo ? userInfo.token : null}`
            }
        }

        const { data } = await axios.post(
            `http://localhost:4000/api/article/createArticle`,
            {},
            config
        )
        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateArticle = (article, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo ?  userInfo.token : null}`
            }
        }

        const { data } = await axios.put(
            `http://localhost:4000/api/article/updateArticle/${id}/`,
            article,
            config
        )
        dispatch({
            type: ARTICLE_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ARTICLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createArticleReview = (articleId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://localhost:4000/api/article/${articleId}/createReview`,
            review,
            config
        )
        dispatch({
            type: ARTICLE_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}