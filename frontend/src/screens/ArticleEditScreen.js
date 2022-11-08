import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { Label, Input, FormText, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listArticleDetails, updateArticle } from '../actions/articleAction'
import { ARTICLE_UPDATE_RESET } from '../constants/articleConstants'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



function ArticleEditScreen({ match, history }) {

    const articleId = match.params.id

   const [category, setCategory] = useState('');
    const [catId, setCatId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [isPublished, setIs_published] = useState(null);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');

    const dispatch = useDispatch()

    const articleDetails = useSelector(state => state.articleDetails)
    const { error, loading, article, categories } = articleDetails

    const articleUpdate = useSelector(state => state.articleUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = articleUpdate

    const handleCategory = (e) =>{
        setCatId(e.target.value);
        const cat = categories.find(cat => cat._id === e.target.value);
        setCategory(cat.name);
      
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ARTICLE_UPDATE_RESET })

            history.push('/admin/articlelist')
        } else {
            const flag = article && article._id && article._id === articleId ? 'yes' : 'no';
            console.log(typeof article._id, ' ', typeof articleId)
            if (!article.title || flag === 'no') {
                dispatch(listArticleDetails(articleId))
            } else {
                setTitle(article.title);
                setDescription(article.description)
                setContent(article.content);
                setId(article._id);
                setImage(article.image);
                setCatId(article.category ? article.category._id : null)
                setCategory(article.category ? article.category.name : null)
                setAuthor(article.author && article.author);
                setIs_published(article.isPublished && article.isPublished);
            }
        }



    }, [dispatch, article, articleId, history, successUpdate, categories])

    const submitHandler = (e) => {
        const data = {
            id: id,
            category: category,
            author: author,
            title: title,
            description: description,
            content: content,
            isPublished: isPublished,
            
        }
        e.preventDefault()
        dispatch(updateArticle(data, article._id))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('article_id', id)


        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:4000/api/article/imageUpload', formData, config)
            setImage(data.image)
            console.log("data ", data);


        } catch (error) {

        }
    }

    return (
        <div>
            <Link to='/admin/articlelist'>
                Go Back
            </Link>
            {/* <h1>Edit Article</h1> */}
            <Row>
                <Col md={3}>
                    <Image src={`http://localhost:4000/${image}`} width={200}
                        height={200} rounded />
                    <Form.Group controlId='image'>
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            onChange={uploadFileHandler}
                        >

                        </Form.File>
                    </Form.Group>
                </Col>
                <Col md={8}>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                        : (

                            <Form onSubmit={submitHandler}>


                                <FormGroup>
                                <Label for="exampleSelect">Current category : {category}</Label>
                                <br></br>
                                    <Label for="exampleSelect">Select A category</Label>
                                    <Input type="select" name="select" id="exampleSelect" onChange={handleCategory}>
                                    <option>none</option>
                                        {
                                            categories && categories.map((val, ind)=>{
                                                return(
                                                    <>
                                                     <option value={val._id}>{val.name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                       
                                    </Input>
                                </FormGroup>

                                <Form.Group controlId='author'>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control

                                        type='name'
                                        placeholder='Enter author'
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='name'>
                                    <Form.Label>title</Form.Label>
                                    <Form.Control

                                        type='name'
                                        placeholder='Enter name'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control

                                        type='name'
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='content'>
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter content'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='content'>
                                    <Form.Label>isPublished</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter content'
                                        value={isPublished}
                                        onChange={(e) => setIs_published(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                



                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>

                            </Form>
                        )}
                </Col>

            </Row>
        </div>

    )
}

export default ArticleEditScreen