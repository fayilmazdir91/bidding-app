import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/register", formValues);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="12" sm="10" md="8" lg="6">
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={formValues.username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary" block>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="12" sm="10" md="8" lg="6" className="text-center">
          Already have an account? <Link to="/">Login</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;