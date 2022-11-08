import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form, ListGroup } from 'react-bootstrap'
import Article from '../components/Article'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listArticles } from '../actions/articleAction'
import Category from '../components/Category'





function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const articleList = useSelector(state => state.articleList)


    const { error, loading, articles, page, pages, } = articleList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listArticles(keyword))

    }, [dispatch, keyword])

    return (
        <div>


    



            <h5 className="mb-3 text-center">{keyword ? 'search results' : 'Recent news'}</h5>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div className="pt-3">
                        <Row className='="p-2 bg-white'>
                           
                            <Col md={12}>


                                <Row>

                                    {articles.map(article => (
                                        <Col className="m-0 p-0" key={article._id} sm={12} md={6} lg={6} xl={6} >
                                            <Article article={article} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate page={page} pages={pages} keyword={keyword} />
                            </Col>
                        </Row>

                    </div>
            }

        </div>

    )
}

export default HomeScreen
