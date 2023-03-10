import React, { useEffect, useState } from 'react'
import { storage } from '../../Config/Config';

export const CarouselImages = () => {
    const [carouselImages, setCarouselImages] = useState([]);
  useEffect(() => {
    const storageRef = storage.ref();
    const carouselRef = storageRef.child('carousel');
  
    carouselRef.listAll().then((result) => {
      const images = [];
  
      result.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          images.push(url);
  
          if (images.length === result.items.length) {
            setCarouselImages(images);
          }
        });
      });
    });
  }, []);
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {carouselImages.map((image, index) => (
          <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : 'false'} aria-label={`Slide ${index + 1}`}></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carouselImages.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} width={1296} height={388}/>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
