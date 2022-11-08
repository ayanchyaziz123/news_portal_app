import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listArticles, deleteArticle, createArticle } from '../actions/articleAction'
import { ARTICLE_CREATE_RESET } from '../constants/articleConstants'
import AdminSideBar from '../admin_components/AdminSideBar'

function ArticleListScreen({ history, match }) {

    const dispatch = useDispatch()

    const articleList = useSelector(state => state.articleList)
    const { loading, error, articles, pages, page } = articleList

    const articleDelete = useSelector(state => state.articleDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = articleDelete

    const articleCreate = useSelector(state => state.articleCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, article: createdArticle } = articleCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: ARTICLE_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }


        if (successCreate) {
            history.push(`/admin/article/${createdArticle._id}/edit`)
        } else {
            dispatch(listArticles(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdArticle, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this article?')) {
            dispatch(deleteArticle(id))
        }
    }

    const createArticleHandler = () => {
        dispatch(createArticle())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Articles Screen</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3 btn-sm' onClick={createArticleHandler}>
                        <i className='fas fa-plus'></i> Create Article
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col md={3}>
                    <AdminSideBar/>
                </Col>
                <Col md={9}>
               

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>CATEGORY</th>
                                
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {articles.map(article => (
                                        <tr key={article._id}>
                                            <td>{article._id}</td>
                                            <td>{article.title}</td>
                                            <td>{article.description}</td>
                                            <td>{article.category && article.category.name}</td>
                                            <td>{article.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/article/${article._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(article._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    )}
                     </Col>
                     </Row>
        </div>
    )
}

export default ArticleListScreen