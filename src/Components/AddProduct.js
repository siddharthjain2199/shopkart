import React, { useState } from 'react'
import { fs, storage } from '../Config/Config';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDetail, setProductDetail] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const [productImage, setProductImage] = useState(null);

    const [imageError, setImageError] = useState('')
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
   
    const types = ['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImage=(e)=>{
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if(selectedFile&&types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('');
            } else {
                setProductImage(null);
                setImageError('Please select a valid image file type (png or jpg)');
            }
        } else {
         console.log('Please select your file')   
        }
    }

    const handleAddProduct = (e)=>{
        e.preventDefault();
        // console.log(productName,productDetail,productPrice);
        // console.log(productImage);
        const uploadTask = storage.ref(`product-images/${productImage.name}`).put(productImage);
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(progress);
        },(error)=>{
            setUploadError(error.message)
        },()=>{
            storage.ref(`product-images`).child(productImage.name).getDownloadURL().then((url)=>{
                fs.collection('Products').add({
                    productName,
                    productDetail,
                    productPrice: Number(productPrice),
                    url
                }).then(()=>{
                    setSuccessMsg('Product added Successfully');
                    setProductName('');
                    setProductDetail('');
                    setProductPrice('');
                    document.getElementById('productimage').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 3000);
                }).catch((error)=>{
                    setUploadError(error.message);
                })
            })
        })
    }

  return (
    <>
     {successMsg&&
     <div className='alert alert-success alert-dismissible fade show'>
                        {successMsg}
                    </div>}
    <div className="container">
        <br/><br/>
     <h1>Add Product</h1>
     <form onSubmit={handleAddProduct}>
        <div className="mb-3">
            <label htmlFor="productname" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="productname" placeholder="Product name" onChange={(e)=>setProductName(e.target.value)} value={productName}/>
        </div>
        <div className="mb-3">
            <label htmlFor="productdetail" className="form-label">Product Detail</label>
            <input type="text" className="form-control" id="productdetail" placeholder="Product detail" onChange={(e)=>setProductDetail(e.target.value)} value={productDetail}/>
        </div>
        <div className="mb-3">
            <label htmlFor="productprice" className="form-label">Product Price</label>
            <input type="text" className="form-control" id="productprice" placeholder="Product price" onChange={(e)=>setProductPrice(e.target.value)} value={productPrice}/>
        </div>
        <div className="mb-3">
            <label htmlFor="productimage" className="form-label">Product Image</label>
            <input type="file" className="form-control" id="productimage" placeholder="Product image" onChange={handleProductImage}/>
        </div>
        {imageError&&<div className='alert alert-danger alert-dismissible fade show'>
                        {imageError}
                    </div>}
        <div className="mb-3">
            <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
     </form>
     {uploadError&&<div className='alert alert-danger alert-dismissible fade show'>
                        {uploadError}
                    </div>}
     </div>
    </>
  )
}

export default AddProduct