import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { 
  Card,
  CardBody,
  CardSubtitle, 
  CardText, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  ListGroup, 
  ListGroupItem, 
  Row,
  Container,
  Col
} from 'reactstrap';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () =>
{
  const { id } = useParams();
  const [ product, setProduct ] = useState( null );
  const [ bids, setBids ] = useState( [] );
  const [ bidAmount, setBidAmount ] = useState( null );
  const [ lastBid, setLastBid ] = useState( null );
  const [ error, setError ] = useState( null );

  useEffect( () =>
  {
    axios.get( `http://localhost:9090/api/v1/product/${ id }`, { withCredentials: true } )
      .then( response =>
      {
        setProduct( response.data );
        setLastBid( response.data[ 0 ] );
        if ( response.data[ 0 ] !== null )
        {
          axios.get( `http://localhost:9090/api/v1/bid/${ id }`, { withCredentials: true } )
            .then( response =>
            {
              setBids( response.data );
              if ( response.data.length > 0 )
              {
                setLastBid( response.data[ 0 ] );
              }
            } )
            .catch( error => console.log( error ) );
        }
      } )
      .catch( error => console.log( error ) );
  }, [ id ] );

  const handleBidSubmit = ( event ) =>
  {
    event.preventDefault();
    if ( !bidAmount || isNaN( bidAmount ) )
    {
      setError( 'Please enter a valid bid amount.' );
      return;
    }
    if ( lastBid && bidAmount <= lastBid.amount )
    {
      setError( `Bid amount must be greater than ${ lastBid.amount }.` );
      return;
    }
    if ( bidAmount < product.startingBid )
    {
      setError( `Bid amount must be greater than or equal to ${ product.startingBid }.` );
      return;
    }
    axios.post( `http://localhost:9090/api/v1/bid`, {
      amount: bidAmount,
      product: {
        id: id
      }
    }, { withCredentials: true } )
      .then( response =>
      {
        setLastBid( response.data );
        setBids( [ ...bids, response.data ] );
        setError( null );
        setBidAmount( null );
      } )
      .catch( error => console.log( error ) );
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="12" sm="10" md="8" lg="6">
            { product ? (
            <Card className="mb-5">
              <CardBody>
                <h3 className="text-center mb-4">{ product.name }</h3>
                <CardText>{ product.description }</CardText>
                <CardSubtitle>Last Bid: { lastBid && `${ lastBid.amount } TL by ${ lastBid.user.username } on ${ new Date( lastBid.timestamp ).toLocaleString() }` }</CardSubtitle>
                <ListGroup className="mb-3">
                  { bids.map( ( bid ) => (
                    <ListGroupItem key={ bid.id }>{ bid.amount } TL by { bid.user.username } on { new Date( bid.timestamp ).toLocaleString() }</ListGroupItem>
                  ) ) }
                </ListGroup>
                <Form onSubmit={ handleBidSubmit }>
                  <FormGroup>
                    <Label for="bidAmount">Bid Amount:</Label>
                    <Input type="number" id="bidAmount" value={ bidAmount || '' } onChange={ ( e ) => setBidAmount( e.target.value ) } />
                  </FormGroup>
                  <Button type="submit" className="btn-primary">Place Bid</Button>
                </Form>
                { error && <p
                  style={ { color: 'red' } }>{ error }</p> }
                <p className="mt-3"><Link to="/products">Return to Products</Link></p>
              </CardBody>
            </Card>
          ) : (
            <p>Loading...</p>
          ) } 
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;