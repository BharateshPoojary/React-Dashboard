import React, { useRef, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
const Cardcomponent = (props) => {
    const { catName, catId, catImage } = props;
    console.log(catName, catId, catImage)
    const deleteCardRef = useRef();
    const updateImgRef = useRef();
    const hideImgRef = useRef();
    const [updateCatName, setUpdateCatName] = useState(catName);
    const [updateCatImg, setUpdateCatImg] = useState({})
    const showImage = (e) => {
        console.log(e.target.files[0]);
        //e.target.files .files is required to get the img information in object
        if (e.target.files && e.target.files[0]) {
            const filereader = new FileReader();
            filereader.readAsDataURL(e.target.files[0]);//It starts reading the selected file asynchronously.This is used to convert the file to base 64 url for  required if you want to display the selected file (image) in the browser as a preview
            filereader.onload = (e) => {//When the file is successfully read:
                updateImgRef.current.style.display = "block";
                updateImgRef.current.src = e.target.result;
                console.log(e.target.result);
                hideImgRef.current.style.display = "none";
            }
        } else {
            updateImgRef.current.style.display = "none";
        }
    }
    const handleFormEdit = async (e, catId) => {//during update we have to pass some thing unique so that the function will get to know 
        //specifcally which form to update 
        try {
            e.preventDefault();
            const formData = new FormData();//It is optional but recommended when including files in a request 
            //When dealing with file uploads (<input type="file">), you cannot directly store the file in a plain JavaScript object. The .files property of a file input is a File object, which needs to be properly encoded for transmission. FormData handles this encoding for you.
            const a = updateCatImg;
            console.log(a);
            formData.append('catName', updateCatName);
            const name = updateCatName;
            console.log(name);
            formData.append('catImg', updateCatImg); // Actual file
            formData.append('action', 'update');
            formData.append('catId', catId);
            const editPostResponse = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_category.php", formData
            );
            if (editPostResponse.data) {
                console.log(editPostResponse.data);
                location.reload();
            }
        } catch (error) {
            console.error("Error fetching data", error.response?.data || error.message);
        }
    }
    const redirectToSubCat = (catId) => {
        console.log(catId);
        localStorage.setItem("catId", JSON.stringify({ catId }));

    }
    const handleDelete = async (catId, catName) => {
        console.log(catId, catName);
        const result = await Swal.fire({//wait for promise to resolve
            title: "Are you sure?",
            text: `You want to delete '${catName}' category!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                const formData = new FormData();
                formData.append("catId", catId);
                formData.append("action", "delete");
                // const deletedata={catId,action:'delete'}
                const response = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_category.php", formData);
                if (response.data.success === 1) {
                    await Swal.fire("Deleted!", "Category has been deleted.", "success");
                    // Remove the deleted category from the DOM
                    // $(`.sa-confirm[data-id='${catId}']`).closest(".col-md-6.col-lg-3").remove();
                    deleteCardRef.current.remove();
                    location.reload();
                } else {
                    await Swal.fire("Error!", "Something went wrong. Please try again.", "error");
                }
            } catch (error) {
                console.error("Error fetching data", error.response?.data || error.message);
                await Swal.fire("Error!", "Something went wrong. Please try again.", "error");
            }
        }
    }

    return (
        <>
            <div ref={deleteCardRef}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-start">
                            <div className="bg-warning-subtle text-warning d-inline-block px-4 py-3 rounded " onClick={() => redirectToSubCat(catId)}  >
                                <img src={catImage} className="rounded img-fluid" />
                            </div>
                            <div className="ms-auto">
                                <div className="dropdown dropstart">
                                    <div className="link text-dark no-border"
                                        style={{ cursor: 'pointer' }}
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ti ti-dots fs-7"></i>
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                        <li>
                                            <div className="dropdown-item no-border"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#view${catId}`}>Edit</div>
                                        </li>
                                        <li>
                                            <div className="dropdown-item sa-confirm"
                                                onClick={() => handleDelete(catId, catName)}>Delete</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4 className="card-title">{catName}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id={`view${catId}`} className="modal fade" tabIndex="-1" aria-modal="true" role="dialog" >
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center mt-2 mb-4">
                                Edit Category
                            </div>
                            <form id="editform" onSubmit={(e) => handleFormEdit(e, catId)} method="post" encType="multipart/form-data"
                                className="ps-3 pr-3">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="inputcom" className="form-label">Name</label>
                                            <input type="text" className="form-control" placeholder="Category Here" name="catName" value={updateCatName} onChange={(e) => setUpdateCatName(e.target.value)} />
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
                                                        accept=".png, .jpg,.jpeg,image/*" name="catImg"
                                                        onChange={(e) => { showImage(e, catId); setUpdateCatImg(e.target.files[0]) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-4">
                                        <div className="mb-3">
                                            <div className="mb-3 d-flex justify-content-center">
                                                <div className="mb-3 d-flex justify-content-center">
                                                    <img style={{ height: "150px", width: "3.5cm", display: "none" }} ref={updateImgRef} />
                                                    <img style={{ height: "150px", width: "3.5cm", display: "block" }} src={catImage} ref={hideImgRef} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <button className="btn btn-rounded bg-info-subtle text-info" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cardcomponent