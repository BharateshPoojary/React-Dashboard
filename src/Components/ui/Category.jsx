import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Cardcomponent from "../Cardcomponent.jsx"
const Category = () => {
    const inputCreateRef = useRef();
    const [catName, setCatName] = useState('');
    const [catImage, setCatImage] = useState({});
    const showImageRef = useRef();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://stock.swiftmore.in/mobileApis/TestCURD_category.php');
                const { Cat } = response.data;
                setCategories(Cat);
            } catch (error) {
                console.error("Error fetching data", error.response?.data || error.message);
            }
        }
        getCategories();
    }, [])

    const showImage = (e, hideimgId = 0) => {
        console.log(e.target.files[0]);
        //e.target.files .files is required to get the img information in object
        if (e.target.files && e.target.files[0]) {
            const filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0]);//It starts reading the selected file asynchronously.This is used to convert the file to base 64 url for  required if you want to display the selected file (image) in the browser as a preview
            filereader.onload = (e) => {//When the file is successfully read:
                showImageRef.current.style.display = "block";
                showImageRef.current.src = e.target.result;
                console.log(e.target.result);
            }
        } else {
            showImageRef.current.style.display = "none";
        }
        if (hideimgId != 0) {
            const hideImage = document.getElementById(`hideimage${hideimgId}`);
            hideImage.style.display = "none";
        }
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();//It is optional but recommended when including files in a request 
            //When dealing with file uploads (<input type="file">), you cannot directly store the file in a plain JavaScript object. The .files property of a file input is a File object, which needs to be properly encoded for transmission. FormData handles this encoding for you.
            const a = catImage;
            console.log(a);
            formData.append('catName', catName);
            formData.append('catImg', catImage); // Actual file
            formData.append('action', inputCreateRef.current.defaultValue);
            const addPostResponse = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_category.php", formData
            );
            if (addPostResponse.data) {
                console.log(addPostResponse.data);
                location.reload();
            }
        } catch (error) {
            console.error("Error fetching data", error.response?.data || error.message);
        }
    }
    return (
        <div>
            <div className="body-wrapper-inner">
                <div className="container-fluid">
                    <div className="card card-body py-3">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-4 mb-sm-0 card-title">Category</h4>
                                    <button type="button" className="btn bg-primary-subtle text-primary"
                                        data-bs-toggle="modal" data-bs-target="#create">
                                        <span className="fs-4 me-1">+</span>
                                        Add New Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="create" className="modal fade" tabIndex="-1" aria-modal="true" role="dialog">
                        <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="text-center mt-2 mb-4">
                                        Create Category
                                    </div>
                                    <form id="createform" onSubmit={(e) => handleFormSubmit(e)} method="post" encType="multipart/form-data" className="ps-3 pr-3">
                                        <input type="text" id="action" name="action" defaultValue={'create'} hidden ref={inputCreateRef} />
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="catinput"
                                                        placeholder="Category Here" name="catName" onChange={(e) => setCatName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Select File</label>
                                                    <div className="input-group flex-nowrap">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Upload</span>
                                                        </div>
                                                        <div className="custom-file">
                                                            <input type="file" className="form-control"
                                                                id="inputGroupFile01" accept=".png, .jpg,.jpeg,image/*"
                                                                name="catImg" onChange={(e) => { showImage(e), setCatImage(e.target.files[0]) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xxl-4">
                                                <div className="mb-3">
                                                    <div className="mb-3 d-flex justify-content-center">
                                                        <img style={{
                                                            height: "150px", width: "3.5cm", display: "none"
                                                        }}
                                                            id="img_url" ref={showImageRef}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 text-center">
                                            <button className="btn btn-rounded bg-info-subtle text-info" type="submit">
                                                Sumbit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="categories">
                        {categories.map((category) => {
                            return (
                                <div className='col-md-6 col-lg-3' key={category.catId}>
                                    <Cardcomponent
                                        catId={category.catId}
                                        catImage={category.catImg}
                                        catName={category.catName}
                                    />
                                </div>)
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Category