import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

interface ExternalArticleProps {
    id: string,
    type: string
}

const ArticleList = () => {
    const [articleList, setArticleList] = useState<ExternalArticleProps[]>();

    useEffect(() => {
        fetch('http://localhost:8000/article/list')
            .then((resp) => resp.json())
            .then((data) => setArticleList(data))
            .catch((err) => console.error(err.message));
    }, []);


    return (
        <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {
                    articleList?.map((el) => <tr key={el.id}>
                                        <td>
                                            <Link to={`/${el.id}`}>{el.id}</Link>
                                        </td>
                                        <td>{el.type}</td>
                                     </tr>)
                }
              </tbody>
            </Table>
        </Container>
            );
}

export default ArticleList;