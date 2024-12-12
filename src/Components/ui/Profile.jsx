import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import user1 from "../../assets/images/profile/user-1.jpg";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Profile = () => {
    const getUserCreds = () => {
        const userCreds = JSON.parse(localStorage.getItem('userCreds'));
        return userCreds;
    }
    const { userName, mobileNo, password } = getUserCreds();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profileName, setProfileName] = useState(userName);
    const [profileMobileNo, setProfileMobileNo] = useState(mobileNo);
    const [profilePassword, setProfilePassword] = useState(password);
    const openModal = () => setIsModalVisible(true);
    const handlecloseModal = () => setIsModalVisible(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleFormEdit = async (e) => {
        e.preventDefault();
        const { userId } = getUserCreds();
        const userData = {
            userId,
            userName: profileName,
            mobileNo: profileMobileNo,
            password: profilePassword
        }
        const response = await axios.post("http://stock.swiftmore.in/mobileApis/userModification.php", userData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        console.log(response.data);
        const { userName, mobileNo, password } = response.data;
        const newUserCreds = { userName, mobileNo, password, userId };
        localStorage.setItem("userCreds", JSON.stringify(newUserCreds));
        handlecloseModal();//It will make a component re render and new user creds will be displayed
        toast.success("Profile updated successfully");
    }
    return (
        <div>
            <div className="body-wrapper-inner ">
                <div className="container-fluid  d-flex flex-column align-items-center justify-content-center">
                    <div className="card card-body py-3 h-50 w-100">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-space-between">
                                    <h4 className="mb-4 mb-sm-0 card-title text-primary">User Profile</h4>
                                    <nav aria-label="breadcrumb" className="ms-auto">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item d-flex align-items-center">
                                                <NavLink className="text-muted text-decoration-none d-flex" to="/">
                                                    <Icon icon="solar:home-2-line-duotone" className="fs-6"></Icon>
                                                </NavLink>
                                            </li>
                                            <li className="breadcrumb-item" aria-current="page">
                                                <span className="badge fw-medium fs-2 bg-primary-subtle text-primary ">
                                                    User Profile
                                                </span>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-100 ">
                        <div className="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                            <h5 className=" mb-0 fs-5 text-primary">Profile Details</h5>
                            <ul className="list-unstyled mb-0 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={openModal}>
                                <li className="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
                                    <a className="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" >
                                        <i className="ti ti-pencil text-primary" ></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="position-relative overflow-hidden">
                            <div className="position-relative">
                                <div className="chat-box email-box mh-n100 p-9" >
                                    <div className="chat-list chat active-chat " >
                                        <div className="mb-7 pb-1 d-flex align-items-center justify-content-center">
                                            <img src={user1} alt="user" width="100" height="100" className="rounded-circle" />
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-7 ">
                                                <p className="mb-1 fs-4 text-primary">User Name</p>
                                                <h6 className="fw-semibold mb-0 fs-5">{userName}</h6>
                                            </div>
                                            <div className="col-12 mb-7">
                                                <p className="mb-1 fs-4 text-primary">Mobile No.</p>
                                                <h6 className="fw-semibold mb-0 fs-5">{mobileNo}</h6>
                                            </div>
                                            <div className="col-12 mb-7">
                                                <div className='d-flex'>
                                                    <p className="mb-1 fs-4 text-primary">Password</p>
                                                    <button
                                                        onClick={togglePasswordVisibility}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            marginLeft: "10px"
                                                        }}
                                                    >
                                                        {showPassword ? '😃' : '😌'}
                                                    </button>
                                                </div>
                                                <h6 className="fw-semibold mb-0 fs-5" name="password">
                                                    {showPassword ? password : '●'.repeat(password.length)}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalVisible && <div id="view" className={`modal ${isModalVisible ? "fade show" : "fade"}`}
                        style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" {...(isModalVisible ? { "aria-modal": true, role: "dialog" } : { "aria-hidden": true })}>
                        <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div style={{ display: "flex", justifyContent: "right", alignItems: "right", cursor: "pointer" }}>
                                        <svg onClick={handlecloseModal} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="red" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="text-center mt-2 mb-4">
                                        Edit Category
                                    </div>

                                    <form id="editform" method="post" onSubmit={(e) => handleFormEdit(e)} encType="multipart/form-data"
                                        className="ps-3 pr-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label">User Name</label>
                                                    <input type="text" className="form-control" name="userName" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label">Mobile No.</label>
                                                    <input type="text" className="form-control" name="mobileno" value={profileMobileNo} onChange={(e) => setProfileMobileNo(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label">Password.</label>
                                                    <input type="text" className="form-control" name="password" value={profilePassword} onChange={(e) => setProfilePassword(e.target.value)} />
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
                </div>
            </div>
        </div>
    )
}

export default Profile