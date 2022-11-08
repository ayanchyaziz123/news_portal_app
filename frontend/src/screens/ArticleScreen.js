import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Row, Col, Image, ListGroup, Button, Card, Form, Modal } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listArticleDetails, createArticleReview } from '../actions/articleAction';
import { ARTICLE_CREATE_REVIEW_RESET } from '../constants/articleConstants'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useSpeechSynthesis } from 'react-speech-kit';



const baseURL = "http://127.0.0.1:8000/api/articles/";

function ArticleScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(null)
    // const [predictPrice, setPredict_price] = useState(null);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const dispatch = useDispatch()
    const { speak } = useSpeechSynthesis();

    const articleDetails = useSelector(state => state.articleDetails)
    const { loading, error, article, reviews } = articleDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const articleReviewCreate = useSelector(state => state.articleReviewCreate)
    const {
        loading: loadingArticleReview,
        error: errorArticleReview,
        success: successArticleReview,



    } = articleReviewCreate

    const article_id = article ? article._id : null;
    var total = article && article.review && article.review.length > 0 ? article.review.reduce((accum, item) => accum + item.rating, 0) : 0;

    useEffect(() => {
        if (successArticleReview) {
            setRating(0)
            setComment('')
            dispatch({ type: ARTICLE_CREATE_REVIEW_RESET })
        }

        dispatch(listArticleDetails(match.params.id))

    }, [dispatch, match, successArticleReview, reviews])

    const addToCartHandler = () => {
        console.log("article Ids", match.params.id)
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createArticleReview(
            match.params.id, {
            rating,
            comment
        }
        ))
    }
    console.log("Article ", article);
    console.log("proD ", article);
    return (
        <div>



            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={8}>


                                    <Image style={{ maxHeight: '400px' }} src={`http://localhost:4000/${article.image}`} alt={article.name} fluid rounded />

                                    <Card className="p-2 mt-4 border border-white">
                                        <div>Description: {ReactHtmlParser(article.description)}</div>
                                    </Card>
                                    <button onClick={() => speak({ text: article.description })}>Speak</button>
                                    <diV className="mt-5 mb-5">

                                    </diV>

                                    <diV className="mt-5 mb-5">

                                    </diV>
                                </Col>






                                <Col md={4}>
                                    <h4>Related news</h4>
                                    <Card className='p-2'>
                                        <Row>
                                            <Col md={8}>
                                                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a d</p>
                                            </Col>
                                            <Col md={4}>
                                                <Link to={`/article/${article._id}`}>
                                                    <Card.Img src={`http://localhost:4000/${article.image}`} />
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card>

                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    

                                    <Card className="p-2 border border-white">
                                        <h4>Reviews</h4>
                                        {reviews && reviews.length === 0 && <Message variant='info' size="sm">No Reviews</Message>}

                                        <ListGroup variant='flush'>
                                            {reviews && reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.user.firstName}</strong>
                                                    <Rating value={review.rating} color='#f8e825' />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}

                                            <ListGroup.Item>
                                                <h4>Write a review</h4>

                                                {loadingArticleReview && <Loader />}
                                                {successArticleReview && <Message variant='success'>Review Submitted</Message>}
                                                {errorArticleReview && <Message variant='danger'>{errorArticleReview}</Message>}

                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                                size="sm"
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>

                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Review</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                size="sm"
                                                            ></Form.Control>
                                                        </Form.Group>

                                                        <Button
                                                            disabled={loadingArticleReview}
                                                            type='submit'
                                                            variant='primary'
                                                            size="sm"
                                                            className='btn btn-success'
                                                        >
                                                            Submit
                                                        </Button>

                                                        {/* <Button 
                                                      variant='info' size='sm'> add
                                                    </Button> */}

                                                    </Form>
                                                ) : (
                                                    <Message size="sm" variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                    <Link to='/' className='btn btn-primary my-3  btn-sm'>Go Back</Link>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}

export default ArticleScreen
