import React from 'react'
import axios from 'axios'
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from '../components/Product/Rating'



const ProductScreen = () => {
  const { id } = useParams()

  const [product, setProduct] = React.useState({})

  React.useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${id}`)
      setProduct(data)
  }
  fetchProduct()
  }, [])


  return (
    <>
      <Link className='btn btn-dark my-3' to="/" >Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>

          <ListGroup.Item variant="flush">
            <h3>{product.name}</h3>
          </ListGroup.Item>

          <ListGroup.Item variant="flush">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>

          <ListGroup.Item variant="flush">
            Price : ${product.price}
          </ListGroup.Item>

          <ListGroup.Item variant="flush">
            Description : ${product.description}
          </ListGroup.Item>

        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Price :
                  </Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status :
                  </Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Button 
              className='btn-block' 
              type='button' 
              disabled = {product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen