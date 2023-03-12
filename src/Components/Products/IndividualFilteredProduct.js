import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';

export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart = () => {
        addToCart(individualFilteredProduct);
    }
    const shortened = true;

    const shortText = `${individualFilteredProduct.productDetail.substring(0, 50)}...`;
    const remainingText = individualFilteredProduct.productDetail.length > 50;
    const text = individualFilteredProduct.productDetail;

    return (
        <div>
            <Col md={3}>
                <Card className="custom-card">
                    <Card.Img variant="top" src={individualFilteredProduct.url} alt={individualFilteredProduct.productName} className="card-image" />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="card-title">{individualFilteredProduct.productName}</Card.Title>   
                        <Card.Text className="card-text">{shortened ? shortText : text}{remainingText}</Card.Text>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <div className="price">₹{individualFilteredProduct.productPrice}/-</div>
                            <Button variant="warning" className="add-to-cart-btn align-self-stretch" onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div> 
    )
}