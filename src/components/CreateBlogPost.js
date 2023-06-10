import React, { useState } from 'react';
import { BLOG_POST_CREATED } from '../constants/ActionTypes';
import { createBlogPost } from '../actions/PsychologistActions';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import psychologistStore from '../stores/PsychologistStore';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { BsCardHeading, BsCardText } from 'react-icons/bs';

const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const psychologistId = decodedToken.userId;

    useEffect(() => {

        const handleBlogPostCreated = (data) => {
            window.alert(data.message);
            navigate("/psychologists/" + psychologistId);
        }

        psychologistStore.on(BLOG_POST_CREATED, handleBlogPostCreated);

        return () => {
            psychologistStore.off(BLOG_POST_CREATED, handleBlogPostCreated);
        };
    }, [navigate, psychologistId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Gönderim işlemleri burada gerçekleştirilebilir
        createBlogPost({title, content});
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
          <Card className="p-4" style={{width: "95%"}}>
          <h2 className="text-center">Yeni Blog Yazısı</h2>
            <Form onSubmit={handlePostSubmit}>
              <Form.Group>
                <Form.Label>Yazı başlığı:</Form.Label>
                <div className="d-flex align-items-center">
                  <BsCardHeading className="mr-2" />
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Yazı içeriği:</Form.Label>
                <div className="d-flex align-items-center">
                  <BsCardText className="mr-2" />
                  <Form.Control
                    as="textarea"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
              </Form.Group>
              <Button style={{ margin: '5px' }} type="submit">Paylaş</Button>
            </Form>
          </Card>
        </Container>
      );
};

export default CreateBlogPost;
