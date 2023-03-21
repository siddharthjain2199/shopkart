import React from 'react'
import { Card, Button, Col } from 'react-bootstrap';
import styles from './Products.module.css';

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
                <Card className={styles.custom_card}>
                    <Card.Img variant="top" src={individualProduct.url} alt={individualProduct.productName} className={styles.card_image} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className={styles.card_title}>{individualProduct.productName}</Card.Title>
                        
                        <Card.Text className={styles.card_text}>{shortened ? shortText : text}{remainingText}</Card.Text>
                        <div className={`${styles.card_footer} d-flex justify-content-between align-items-center`}>
                            <div className={styles.price}>₹{individualProduct.productPrice}/-</div>
                            <Button variant="warning" className={`${styles.add_to_cart_btn} align-self-stretch`} onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
export default IndividualProduct