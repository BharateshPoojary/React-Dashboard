import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import profilebg from "../../assets/images/backgrounds/profilebg.jpg";
import user1 from "../../assets/images/profile/user-1.jpg";
import { NavLink } from 'react-router-dom';
const Profile = () => {
    return (
        <div>
            <div className="body-wrapper-inner">
                <div className="container-fluid">
                    <div className="card card-body py-3">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-space-between">
                                    <h4 className="mb-4 mb-sm-0 card-title">User Profile</h4>
                                    <nav aria-label="breadcrumb" className="ms-auto">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item d-flex align-items-center">
                                                <NavLink className="text-muted text-decoration-none d-flex" to="/">
                                                    <Icon icon="solar:home-2-line-duotone" className="fs-6"></Icon>
                                                </NavLink>
                                            </li>
                                            <li className="breadcrumb-item" aria-current="page">
                                                <span className="badge fw-medium fs-2 bg-primary-subtle text-primary">
                                                    User Profile
                                                </span>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card overflow-hidden">
                        <div className="card-body p-0">
                            <img src={profilebg} alt="matdash-img" className="img-fluid" />
                            <div className="row align-items-center">
                                <div className="col-lg-4 order-lg-1 order-2">
                                    <div className="d-flex align-items-center justify-content-around m-4">
                                        <div className="text-center">
                                            <i className="ti ti-file-description fs-6 d-block mb-2"></i>
                                            <h4 className="mb-0 fw-semibold lh-1">938</h4>
                                            <p className="mb-0 ">Posts</p>
                                        </div>
                                        <div className="text-center">
                                            <i className="ti ti-user-circle fs-6 d-block mb-2"></i>
                                            <h4 className="mb-0 fw-semibold lh-1">3,586</h4>
                                            <p className="mb-0 ">Followers</p>
                                        </div>
                                        <div className="text-center">
                                            <i className="ti ti-user-check fs-6 d-block mb-2"></i>
                                            <h4 className="mb-0 fw-semibold lh-1">2,659</h4>
                                            <p className="mb-0 ">Following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-n3 order-lg-2 order-1">
                                    <div className="mt-n5">
                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                            <div className="d-flex align-items-center justify-content-center round-110">
                                                <div className="border border-4 border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden round-100">
                                                    <img src={user1} alt="matdash-img" className="w-100 h-100" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h5 className="mb-0">David McMichael</h5>
                                            <p className="mb-0">Designer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 order-last">
                                    <ul className="list-unstyled d-flex align-items-center justify-content-center justify-content-lg-end my-3 mx-4 pe-4 gap-3">
                                        <li>
                                            <a className="d-flex align-items-center justify-content-center btn btn-primary p-2 fs-4 rounded-circle" width="30" height="30">
                                                <i className="ti ti-brand-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="btn btn-secondary d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle" >
                                                <i className="ti ti-brand-dribbble"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="btn btn-danger d-flex align-items-center justify-content-center p-2 fs-4 rounded-circle" >
                                                <i className="ti ti-brand-youtube"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <button className="btn btn-primary text-nowrap">Add To Story</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile