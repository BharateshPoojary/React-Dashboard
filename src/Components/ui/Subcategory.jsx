import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import SubCardComponent from './SubCardComponent.jsx';

const Category = () => {
    const [subCatName, setSubCatName] = useState('');
    const [subCatImage, setSubCatImage] = useState({});
    const [growthPercentage, setGrowthPercentage] = useState('');
    const showImageRef = useRef();
    const [subCategories, setSubCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => setIsModalVisible(true);
    const handlecloseModal = () => setIsModalVisible(false);
    const data = JSON.parse(localStorage.getItem('catId'));
    console.log(data.catId);
    const getSubCategories = async () => {
        try {
            const data = JSON.parse(localStorage.getItem('catId'));
            const response = await axios.get(`http://stock.swiftmore.in/mobileApis/TestCURD_subcategory.php?catId=${data.catId}`);
            console.log(response.data);
            const { subCat } = response.data;
            setSubCategories(subCat || []);//states are asynchronous it takes some time to update
        } catch (error) {
            console.error("Error fetching data", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getSubCategories();
    }, [])
    const showImage = (e) => {
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
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();//It is optional but recommended when including files in a request 
            //When dealing with file uploads (<input type="file">), you cannot directly store the file in a plain JavaScript object. The .files property of a file input is a File object, which needs to be properly encoded for transmission. FormData handles this encoding for you.
            const a = subCatImage;
            console.log(a);
            formData.append('catId', data.catId);
            formData.append('subCatName', subCatName);
            formData.append('subCatImg', subCatImage); // Actual file
            formData.append('growthPercentage', growthPercentage);
            formData.append('action', 'create');
            const addPostResponse = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_subcategory.php", formData
            );
            if (addPostResponse.data) {
                console.log(addPostResponse.data);
                await getSubCategories();
                handlecloseModal();
                // location.reload();
            }
        } catch (error) {
            console.error("Error fetching data", error.response?.data || error.message);
        }
    }
    return (
        <div>
            <div className="body-wrapper-inner">
                <div className="container-fluid" >
                    <div className="card card-body py-3">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-4 mb-sm-0 card-title">Sub Category</h4>
                                    <button type="button" className="btn bg-primary-subtle text-primary"
                                        onClick={openModal} >
                                        <span className="fs-4 me-1">+</span>
                                        Add New Sub Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalVisible &&
                        <>
                            <div id="create" className={`modal ${isModalVisible ? "fade show" : "fade"}`}
                                style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" {...(isModalVisible ? { "aria-modal": true, role: "dialog" } : { "aria-hidden": true })}>
                                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div style={{ display: "flex", justifyContent: "right", alignItems: "right", cursor: "pointer" }}>
                                                <svg onClick={handlecloseModal} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="red" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                            </div>
                                            <div className="text-center mt-2 mb-4">
                                                Create Sub Category
                                            </div>
                                            <form id="createform" onSubmit={(e) => handleFormSubmit(e)} method="post" encType="multipart/form-data" className="ps-3 pr-3">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="inputcom" className="form-label">Name</label>
                                                            <input type="text" className="form-control" id="subcatinput"
                                                                placeholder="Sub Category Here" name="subCatName" onChange={(e) => setSubCatName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="inputcom" className="form-label">Growth
                                                                Percentage (In %)</label>
                                                            <input type="text" className="form-control" id="growthPercentage"
                                                                placeholder="Percentage Here" name="growthPercentage" onChange={(e) => {
                                                                    setGrowthPercentage(e.target.value);
                                                                    e.target.value = e.target.value.match(/^\d*\.?\d*/)[0]
                                                                }}
                                                            />
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
                                                                        name="subCatImg" onChange={(e) => { showImage(e), setSubCatImage(e.target.files[0]) }} required />
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
                        </>}
                    <div className="row" id="subcategories">
                        {subCategories.length > 0 ?
                            subCategories.map((subcategory) => {
                                return (
                                    <div className='col-md-6 col-lg-3' key={subcategory.subCatId}>
                                        <SubCardComponent
                                            getSubCategories={getSubCategories}
                                            catId={data.catId}
                                            subCatId={subcategory.subCatId}
                                            growthPercentage={subcategory.growthPercentage}
                                            subCatImage={subcategory.subCatImg}
                                            subCatName={subcategory.subCatName}
                                        />
                                    </div>)
                            })

                            : (<SubCardComponent emptySubcatMessage={"No subcategories added"} />)}


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Category