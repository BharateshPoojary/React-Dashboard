import React, { useRef } from 'react'
const Cardcomponent = (props) => {
    // const updateRef = useRef();
    const { catName, catId, catImage } = props;
    console.log(catName, catId, catImage)
    return (
        <>
            <div className={`delete${catId}`}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-start">
                            <div className="bg-warning-subtle text-warning d-inline-block px-4 py-3 rounded " > {/* onClick={redirectToSubCat()}  */}
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
            <div id={`view${catId}`} className="modal fade" tabIndex="-1" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center mt-2 mb-4">
                                Edit Category
                            </div>
                            <form id="editform" onSubmit={(e) => handleFormEdit(e, catId)} method="post" enctype="multipart/form-data"
                                className="ps-3 pr-3">
                                <input type="text" name="action" id="editaction" value="update" ref={updateRef} hidden />
                                <input type="text" id={`editcatId${catId}`} name="catId" value={catId} hidden />
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label for="inputcom" className="form-label">Name</label>
                                            <input type="text" className="form-control" id={`editinputcom${catId}`} placeholder="Category Here" name="catName" value={catName} />
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
                                                        id={`editinputGroupFile01${catId}`}
                                                        accept=".png, .jpg,.jpeg,image/*" name="catImg"
                                                        onchange={(e) => showImage(e, catId)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-4">
                                        <div className="mb-3">
                                            <div className="mb-3 d-flex justify-content-center">
                                                <div className="mb-3 d-flex justify-content-center">
                                                    <img style="height: 150px; width: 3.5cm; display:none;" id={`edit_img_url${catId}`} />
                                                    <img style="height: 150px; width: 3.5cm; display:block;" src={catImage} id={`hideimage${catId}`} />
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