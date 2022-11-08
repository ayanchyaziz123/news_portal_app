import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({ article }) {
    var total = article && article.review && article.review.length > 0 ? article.review.reduce((accum, item) => accum + item.rating, 0) : 0;
    return (
        <div className="card my-2 p-2">

            <Row>
                <Col md="7">
                <Card.Body >
                <Link to={`/article/${article._id}`} >
                    <Card.Title as="div" >
                        <strong >{article.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" >
                    <div className="my-3">
                        <Rating value={total/article.review.length} text={`${article.review.length} comments`} color={'#f8e825'} />
                    </div>
                </Card.Text>

            </Card.Body>
                </Col>
                <Col md="4">
                    <Link to={`/article/${article._id}`}>
                        <Card.Img src={`http://localhost:4000/${article.image}`} className="img-fluid ps rounded mx-auto d-block" />
                    </Link>
                </Col>

            </Row>
        </div>
    )
}

export default Product
