import React, { useEffect, useState } from 'react';
import { getBlogPosts, getComments, getPsychologist } from '../actions/AppActions';
import { BLOG_POSTS_FETCHED, COMMENTS_FETCHED, PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import appStore from '../stores/AppStore';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { BsPencilSquare, BsCalendarPlus, BsChatSquareDots, BsPencil } from 'react-icons/bs';
import jwt_decode from 'jwt-decode';
import { PSYCHOLOGIST } from '../constants/UserTypes';

function PsychologistProfile(props) {
  const [psychologist, setPsychologist] = useState(null);
  const [comments, setComments] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  console.log(JSON.stringify(blogPosts));

  const { id } = useParams();
  console.log("ID: " + id);
  const psychologistId = parseInt(id, 10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.userId);
      setUserType(decodedToken.userType);
    }
  }, []);

  useEffect(() => {
    getPsychologist({ id });
    getComments({ id });
    getBlogPosts({ id });

    const handlePsychologistFetched = (psychologist) => {
      console.log(psychologist);
      setPsychologist(psychologist);
    };

    const handleCommentsFetched = (comments) => {
      setComments(comments);
    };

    const handleBlogPostsFetched = (blogPosts) => {
      console.log("handleBlogPostsFetched");
      setBlogPosts(blogPosts);
    };

    appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
    appStore.on(COMMENTS_FETCHED, handleCommentsFetched);
    appStore.on(BLOG_POSTS_FETCHED, handleBlogPostsFetched);

    return () => {
      appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
      appStore.off(COMMENTS_FETCHED, handleCommentsFetched);
      appStore.off(BLOG_POSTS_FETCHED, handleBlogPostsFetched);
    };
  }, [id]);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4" style={{ width: "95%" }}>
        <Card.Body>
          <h2 className="text-center">Psikolog Profil Sayfası</h2>
          {psychologist ? (
            <>
              <Card.Text>ID: {id}</Card.Text>
              <Card.Text>Ad: {psychologist.name}</Card.Text>
              <Card.Text>Soyad: {psychologist.surname}</Card.Text>
              <Card.Text>Email: {psychologist.email}</Card.Text>
  
              {userId ? (
                userId === psychologistId && userType === PSYCHOLOGIST ? (
                  <div className="d-flex justify-content-center mt-3 mb-3">
                    <Link to={`/psychologist/createBlogPost`} className="mr-3">
                      <Button variant="primary" className="d-flex align-items-center" style={{ margin: '5px' }}>
                        <BsPencilSquare className="mr-1" />
                        Yeni Blog Yazısı Yaz
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center mt-3 mb-3">
                    <Link to={`/createAppointment/${id}`} className="mr-3">
                      <Button variant="primary" className="d-flex align-items-center" style={{ margin: '5px' }}>
                        <BsCalendarPlus className="mr-1" />
                        Randevu Talep Et
                      </Button>
                    </Link>
                    <Link to={`/sendMessage/${id}`} className="mr-3">
                      <Button variant="primary" className="d-flex align-items-center" style={{ margin: '5px' }}>
                        <BsChatSquareDots className="mr-1" />
                        Mesaj Gönder
                      </Button>
                    </Link>
                    <Link to={`/comment/${id}`}>
                      <Button variant="primary" className="d-flex align-items-center" style={{ margin: '5px' }}>
                        <BsPencil className="mr-1" />
                        Yorum Yap
                      </Button>
                    </Link>
                  </div>
                )
              ) : (
                <div className="text-center">
                  <p>Randevu almak için giriş yapmalısınız.</p>
                </div>
              )}
  
              <Card className="mt-3">
                <Card.Body>
                  <h3>Blog Yazıları:</h3>
                  {blogPosts ? (
                    blogPosts.map((blogPost) => (
                      <div key={blogPost.id}>
                        <Link to={`/blogPost/${blogPost.id}`}>
                          <p>{blogPost.title}</p>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>Blog yazısı bulunamadı.</p>
                  )}
                </Card.Body>
              </Card>
  
              <Card className="mt-3">
                <Card.Body>
                  <h3>Yorumlar:</h3>
                  {comments ? (
                    comments.map((comment) => (
                      <Card key={comment.commentId} className="mb-3">
                        <Card.Body>
                          <Card.Text>Ad: {comment.name}</Card.Text>
                          <Card.Text>Soyad: {comment.surname}</Card.Text>
                          <Card.Text>Yorum: {comment.comment_text}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>Yorum bulunamadı.</p>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <p className="text-center">Yükleniyor...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
  
  
}

export default PsychologistProfile;
