import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (startingBid < 1) {
      setError('Starting bid must be at least 1');
      return;
    }
    try {
      await axios.post('http://localhost:9090/api/v1/product', {
        name,
        description,
        startingBid
      }, { withCredentials: true });
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="12" sm="10" md="8" lg="6">
          <h3 className="text-center mb-4">Create a new product</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="startingBid">Starting bid</Label>
              <Input type="number" id="startingBid" value={startingBid} onChange={(event) => setStartingBid(event.target.value)} required />
            </FormGroup>
            <Button color="primary" type="submit">
              Create Product
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
          <p className="mt-3"><Link to="/products">Return to Products</Link></p>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPage;
