import React, { useRef, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '../slice/subCatSlice';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


const SubCardcomponent = (props) => {
    const { loading } = useSelector(state => state.categorySlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { value } = useSelector(state => state.toggleSlice);
    const { catId, subCatName, subCatId, subCatImage, getSubCategories, growthPercentage, emptySubcatMessage, getSpecificSubCategories, searchcatid, subcatid } = props;
    console.log(subCatName, subCatId, subCatImage, growthPercentage);
    console.log("CatId", catId);
    console.log("subcatId", subCatId);
    const deleteCardRef = useRef();
    const updateImgRef = useRef();
    const hideImgRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [updateSubCatName, setupdateSubCatName] = useState(subCatName);
    const [updateSubCatGrowthPercentage, setupdateSubCatGrowthPercentage] = useState(growthPercentage);
    const [updateSubCatImg, setupdateSubCatImg] = useState({})
    const openModal = () => setIsModalVisible(true);
    const handlecloseModal = () => setIsModalVisible(false);
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
    const handleFormEdit = async (e, subCatId) => {//during update we have to pass some thing unique so that the function will get to know 
        //specifcally which form to update 
        try {
            e.preventDefault();
            const formData = new FormData();//It is optional but recommended when including files in a request 
            //When dealing with file uploads (<input type="file">), you cannot directly store the file in a plain JavaScript object. The .files property of a file input is a File object, which needs to be properly encoded for transmission. FormData handles this encoding for you.
            const a = updateSubCatImg;
            console.log(a);
            formData.append('subCatName', updateSubCatName);
            const name = updateSubCatName;
            console.log(name);
            formData.append('subCatImg', updateSubCatImg); // Actual file
            formData.append('action', 'update');
            formData.append('catId', catId);//Optional
            formData.append('growthPercentage', updateSubCatGrowthPercentage)
            formData.append('subCatId', subCatId);
            const editPostResponse = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_subcategory.php", formData
            );
            if (editPostResponse.data) {
                console.log(editPostResponse.data);
                // location.reload();
                if (catId) {
                    await getSubCategories();
                    dispatch(fetchSubCategories());//This will make an api call where all new and updated data will be retrieve from DB and this updated data will be reflected in search bar as well
                } else {
                    await getSpecificSubCategories();
                    dispatch(fetchSubCategories());
                }
                handlecloseModal();
                toast.success("Subcategory edited successfully");
            }
        } catch (error) {
            toast.error("Error editing subcategory");
            console.error("Error fetching data", error.response?.data || error.message);
        }
    }
    const handleDelete = async (subCatId, subCatName) => {
        console.log(subCatId, subCatName);
        const result = await Swal.fire({//wait for promise to resolve
            title: "Are you sure?",
            text: `You want to delete '${subCatName}' category!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                const formData = new FormData();
                formData.append("subCatId", subCatId);
                formData.append("action", "delete");
                const response = await axios.post("http://stock.swiftmore.in/mobileApis/TestCURD_subcategory.php", formData);

                if (response.data.success === 1) {
                    await Swal.fire("Deleted!", "Category has been deleted.", "success");
                    toast.success("Subcategory deleted successfully");
                    await getSubCategories();
                    dispatch(fetchSubCategories());
                    if (searchcatid && subcatid) {
                        navigate("/subcategory", { replace: true });
                        window.history.pushState(null, '', `/subcategory/${searchcatid}`);//It will make the url like this without navigating to it 
                    }
                } else {
                    toast.error("Error deleting subcategory");
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
            {loading ? (
                <div className='card ' style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                    <div className='card-body'>
                        <div className="d-flex  align-items-center" style={{ overflow: "hidden" }}>
                            <Loader />
                        </div>
                    </div>
                </div>
            ) :
                (emptySubcatMessage ? (
                    <h2 style={value === "moon" ? { color: "white" } : undefined}>{emptySubcatMessage}</h2>
                ) : (
                    <div ref={deleteCardRef}>
                        <div className="card" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="card-body">
                                <div className="d-flex align-items-start">
                                    <div className="bg-warning-subtle text-warning d-inline-block px-4 py-3 rounded">
                                        <img src={subCatImage} className="rounded img-fluid" />
                                    </div>
                                    <div className="ms-auto">
                                        <div className="dropdown dropstart">
                                            <div className="link text-dark no-border"
                                                style={{ cursor: 'pointer' }}
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="ti ti-dots fs-7" style={value === "moon" ? { color: "white" } : undefined}></i>
                                            </div>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                                                <li>
                                                    <div className="dropdown-item no-border"
                                                        style={value === "moon" ? { color: "rgb(134, 163, 212)" } : undefined}
                                                        onClick={openModal}
                                                    >Edit</div>
                                                </li>
                                                <li>
                                                    <div className="dropdown-item sa-confirm"
                                                        style={value === "moon" ? { color: "rgb(134, 163, 212)" } : undefined}
                                                        onClick={() => handleDelete(subCatId, subCatName)}>Delete</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="card-title" style={value === "moon" ? { color: "white" } : undefined}>{subCatName}</h4>
                                        <h6 className="text-muted">{growthPercentage}%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )
            }

            {isModalVisible && <div id="view" className={`modal ${isModalVisible ? "fade show" : "fade"}`}
                style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" {...(isModalVisible ? { "aria-modal": true, role: "dialog" } : { "aria-hidden": true })}>
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                        <div className="modal-body">
                            <div style={{ display: "flex", justifyContent: "right", alignItems: "right", cursor: "pointer" }}>
                                <svg onClick={handlecloseModal} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="red" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                            <div className="text-center mt-2 mb-4">
                                Edit Category
                            </div>
                            <form id="editform" onSubmit={(e) => handleFormEdit(e, subCatId)} method="post" encType="multipart/form-data"
                                className="ps-3 pr-3">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="inputcom" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Name</label>
                                            <input style={value === "moon" ? { color: "white" } : undefined} type="text" className="form-control" placeholder="Category Here" name="subCatName" value={updateSubCatName} onChange={(e) => setupdateSubCatName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label htmlFor="inputcom" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Growth
                                                Percentage (In %)</label>
                                            <input type="text" className="form-control"
                                                style={value === "moon" ? { color: "white" } : undefined}
                                                placeholder="Percentage Here" name="growthPercentage"
                                                value={updateSubCatGrowthPercentage} onChange={(e) => {
                                                    setupdateSubCatGrowthPercentage(e.target.value);
                                                    e.target.value = e.target.value.match(/^\d*\.?\d*/)[0];
                                                }} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Select File</label>
                                            <div className="input-group flex-nowrap">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={value === "moon" ? { backgroundColor: "#1F2A3D", color: "white" } : undefined}>Upload</span>
                                                </div>
                                                <div className="custom-file">
                                                    <input type="file" className="form-control"
                                                        accept=".png, .jpg,.jpeg,image/*" name="catImg"
                                                        onChange={(e) => { showImage(e, subCatId); setupdateSubCatImg(e.target.files[0]) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-4">
                                        <div className="mb-3">
                                            <div className="mb-3 d-flex justify-content-center">
                                                <div className="mb-3 d-flex justify-content-center" style={value === "moon" ? { backgroundColor: "white" } : undefined}>
                                                    <img style={{ height: "150px", width: "3.5cm", display: "none" }} ref={updateImgRef} />
                                                    <img style={{ height: "150px", width: "3.5cm", display: "block" }} src={subCatImage} ref={hideImgRef} />
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
            </div>}

        </>
    )
}

export default SubCardcomponent