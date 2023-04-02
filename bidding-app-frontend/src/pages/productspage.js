import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await axios.get('http://localhost:9090/logout', { withCredentials: true });
      navigate('/');
    } catch (error) {
      navigate('/');
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:9090/api/v1/product' , { withCredentials: true })
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4">Products</h1>
        </Col>
        <Col className="text-right">
          <Button color="primary" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col key={product.id} md="4" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{product.name}</CardTitle>
                {product.lastBid ? <CardText>Last bid: {product.lastBid} TL</CardText> : <CardText>Starting bid: {product.startingBid} TL</CardText>}
                <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-5">
        <Col className="text-right">
          <Link to="/create-product" className="btn btn-lg btn-primary">Create a Product</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
