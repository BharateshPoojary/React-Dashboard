import React from 'react'

const Category = () => {
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
                </div>
            </div>
            <div id="create" className="modal fade" tabindex="-1" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-center mt-2 mb-4">
                                Create Category
                            </div>
                            <form id="createform" onSubmit="handleFormSubmit(event)" method="post"
                                enctype="multipart/form-data" className="ps-3 pr-3">

                                <input type="text" id="action" name="action" value="create" hidden />

                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label for="inputcom" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="catinput"
                                                placeholder="Category Here" name="catName" />
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
                                                        name="catImg" onchange="showImage(this, 'img_url');" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-4">
                                        <div className="mb-3">
                                            <div className="mb-3 d-flex justify-content-center">
                                                <img style="height: 150px; width: 3.5cm; display:none"
                                                    id="img_url" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <button className="btn btn-rounded bg-info-subtle text-info " type="submit">
                                        Sumbit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Category