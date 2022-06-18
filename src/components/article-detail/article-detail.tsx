import React, { useEffect, useState }  from 'react';
import { useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from 'react-bootstrap';
import parse from 'html-react-parser';

const ArticleDetail = () => {
    const [detail, setDetail] = useState('');
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/article/${params.externalArticleId}`)
            .then((resp) => resp.text())
            .then((data) => {
                setLoading(false);
                if (data) {
                    setDetail(data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error(err.message);
            });
    }, [params.externalArticleId]);

    return (
        <Container>

            <div>
                {(!loading && (detail && parse(detail))) 
                    || (loading && <>Loading details...<Spinner animation="border" variant="primary" /></>) 
                    || (!loading && (!detail || detail === '') && "No article abstract yet. Check back later!")}
            </div>
            <Link to="/">Back to the List</Link>
        </Container>
        );
}

export default ArticleDetail;