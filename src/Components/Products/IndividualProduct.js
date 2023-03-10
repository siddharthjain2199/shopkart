import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';

const IndividualProduct = ({ individualProduct, addToCart }) => {
    // console.log(individualProduct);
    const handleAddToCart = () => {
        addToCart(individualProduct);
    }
    const shortened = true;

    const shortText = `${individualProduct.productDetail.substring(0, 50)}...`;
    const remainingText = individualProduct.productDetail.length > 50;
    const text = individualProduct.productDetail;
    return (
        <>
            <Col md={3}>
                <Card className="custom-card">
                    <Card.Img variant="top" src={individualProduct.url} alt={individualProduct.productName} className="card-image" />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="card-title">{individualProduct.productName}</Card.Title>
                        
                        <Card.Text className="card-text">{shortened ? shortText : text}{remainingText}</Card.Text>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <div className="price">₹{individualProduct.productPrice}/-</div>
                            <Button variant="warning" className="add-to-cart-btn align-self-stretch" onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
export default IndividualProduct