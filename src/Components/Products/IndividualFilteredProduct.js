import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';
import styles from './Products.module.css';

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
                <Card className={styles.custom_card}>
                    <Card.Img variant="top" src={individualFilteredProduct.url} alt={individualFilteredProduct.productName} className={styles.card_image} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className={styles.card_title}>{individualFilteredProduct.productName}</Card.Title>   
                        <Card.Text className={styles.card_text}>{shortened ? shortText : text}{remainingText}</Card.Text>
                        <div className={`${styles.card_footer} d-flex justify-content-between align-items-center`}>
                            <div className={styles.price}>₹{individualFilteredProduct.productPrice}/-</div>
                            <Button variant="warning" className={`${styles.add_to_cart_btn} align-self-stretch`} onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div> 
    )
}