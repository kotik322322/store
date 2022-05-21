import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from '../components/Product/Rating'
import { listProductDetails } from '../store/actionCreators/productAC'
import Loader from "../components/Loader/Loader"
import Message from "../components/Message/Message"



const ProductScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [qty, setQty] = React.useState(0)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails


  React.useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }


  return (
    <>
      <Link className='btn btn-dark my-3' to="/" >Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col> Qty</Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>

                        {[...Array(product.countInStock).keys()].map(x => (
                          <option kye={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>)}

    </>
  )
}

export default ProductScreen