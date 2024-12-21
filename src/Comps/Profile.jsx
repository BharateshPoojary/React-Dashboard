import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useRef, useState } from 'react'
import user1 from "../assets/images/profile/user-1.jpg";
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserCreds } from '../slice/userCredsSlice';
import Swal from 'sweetalert2';
import { setLoading } from '@/slice/categorySlice';
import Loader from './Loader';
const Profile = () => {
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.categorySlice);
    // const getUserCreds = () => {
    //     const userCreds = JSON.parse(localStorage.getItem('userCreds'));
    //     return userCreds;
    // }
    // const { userName, mobileNo, password } = getUserCreds();
    const dispatch = useDispatch();
    const userCreds = useSelector(state => state.userCreds);
    const { value } = useSelector(state => state.toggleSlice);
    const { userName, mobileNo, password } = userCreds;
    const usernamevalidationmessage = useRef();
    const mobilenovalidationmessage = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profileName, setProfileName] = useState(userName);
    // console.log(profileName)
    const [profileMobileNo, setProfileMobileNo] = useState(mobileNo);
    const [profilePassword, setProfilePassword] = useState(password);
    const openModal = () => setIsModalVisible(true);
    const handlecloseModal = () => setIsModalVisible(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        // if (userName === "" && mobileNo === "" && password === "") {
        dispatch(setLoading(true))
        setTimeout(() => {
            console.log(userCreds);
            try {
                const { userName, mobileNo, password, success, userId } = JSON.parse(localStorage.getItem("userCreds"));
                dispatch(updateUserCreds({ userName, mobileNo, password, success, userId }))
            } catch (error) {
                navigate('/login');//not able to destructure property which means user is not logged in 
            } finally {
                dispatch(setLoading(false))
            }
        }, 3000);
        // }
    }, [userCreds])
    useEffect(() => {
        console.log("User Creds", userCreds)
        if (userCreds.userName && userCreds.mobileNo && userCreds.password) {
            setProfileName(userCreds.userName);
            setProfileMobileNo(userCreds.mobileNo);
            setProfilePassword(userCreds.password);
        }
    }, [userCreds]);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleFormEdit = async (e) => {
        e.preventDefault();
        const convertedToNumData = Number(profileName);
        console.log(convertedToNumData);
        // return;
        if (!isNaN(convertedToNumData)) {
            usernamevalidationmessage.current.style.color = "red";
            usernamevalidationmessage.current.textContent = "enter a valid name"
            return;
        }
        const convertedtonumData = Number(profileMobileNo);
        mobilenovalidationmessage.current.style.color = "red";
        if (isNaN(convertedtonumData)) {
            mobilenovalidationmessage.current.textContent = "Please enter a valid number";
            console.log("Please enter a valid number");
            return;
        }
        if (profileMobileNo.length > 10 || profileMobileNo.length < 10) {
            mobilenovalidationmessage.current.textContent = "Mobile number must be of  10 digit";
            console.log("Mobile number must be of  10 digit");
            return;
        }
        // const { userId } = getUserCreds();
        const { userId } = userCreds;
        const userData = {
            userId,
            userName: profileName,
            mobileNo: profileMobileNo,
            password: profilePassword
        }
        dispatch(setLoading(true))
        try {
            const response = await axios.post("http://stock.swiftmore.in/mobileApis/userModification.php", userData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            console.log(response.data);
            const { userName, mobileNo, password, success } = response.data;
            dispatch(updateUserCreds({ userName, mobileNo, password, success }));
            const newUserCreds = { userName, mobileNo, password, userId, success };
            localStorage.setItem("userCreds", JSON.stringify(newUserCreds));
            handlecloseModal();//It will make a component re render and new user creds will be displayed
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error editing category");
            console.error("Error fetching data", error.response?.data || error.message);
        } finally {
            dispatch(setLoading(false))
        }

    }
    const deleteModal = async () => {
        const result = await Swal.fire({//wait for promise to resolve
            title: "Are you sure?",
            text: `You want to delete '${userName}' account`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {

            try {
                const response = await axios.get(`http://stock.swiftmore.in/mobileApis/userLogin.php?userName=${profileName}&mobileNo=${profileMobileNo}`);
                if (response.data.success === 1) {
                    await Swal.fire("Deleted!", "account deleted successfully", "success");
                    toast.success("account deleted successfully");
                    localStorage.removeItem("userCreds");
                    navigate("/register");
                } else {
                    toast.error("Error deleting account");
                    await Swal.fire("Error!", "Something went wrong. Please try again.", "error");
                }
            } catch (error) {
                console.error("Error deleting account", error.response?.data || error.message);
                await Swal.fire("Error!", "Something went wrong. Please try again.", "error");
            }
        }
    }
    return (
        <div>

            <div className="body-wrapper-inner" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                <div className="container-fluid  d-flex flex-column align-items-center justify-content-center">
                    <div className="card card-body py-3 h-50 w-100" style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-space-between">
                                    <h4 className="mb-4 mb-sm-0 card-title text-primary" style={value === "moon" ? { color: "white" } : undefined}>User Profile</h4>
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
                    {loading ? (
                        <div className='card ' style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined}>
                            <div className='card-body'>
                                <div className="d-flex  align-items-center" style={{ overflow: "hidden" }}>
                                    <Loader />
                                </div>
                            </div>
                        </div>
                    ) :
                        (<div className="card w-100 " style={value === "moon" ? { backgroundColor: "#1A2537" } : undefined}>
                            <div className="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                                <h5 className=" mb-0 fs-5 text-primary">Profile Details</h5>
                                <ul className="list-unstyled mb-0 d-flex align-items-center" >
                                    <li className="position-relative" data-bs-toggle="tooltip" style={{ cursor: "pointer" }} onClick={openModal} data-bs-placement="top" data-bs-title="Edit">
                                        <a className="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" >
                                            <i className="ti ti-pencil text-primary" ></i>
                                        </a>
                                    </li>
                                    <li className="position-relative" data-bs-toggle="tooltip" style={{ cursor: "pointer" }} onClick={deleteModal} data-bs-placement="top" data-bs-title="Delete">
                                        <a className="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5">
                                            <i className="ti ti-trash text-primary"></i>
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
                                                    <p className="mb-1 fs-4 text-primary" >User Name</p>
                                                    <h6 className="fw-semibold mb-0 fs-5" style={value === "moon" ? { color: "white" } : undefined}>{userName}</h6>
                                                </div>
                                                <div className="col-12 mb-7">
                                                    <p className="mb-1 fs-4 text-primary">Mobile No.</p>
                                                    <h6 className="fw-semibold mb-0 fs-5" style={value === "moon" ? { color: "white" } : undefined}>{mobileNo}</h6>
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
                                                    <h6 className="fw-semibold mb-0 fs-5" name="password" style={value === "moon" ? { color: "white" } : undefined}>
                                                        {showPassword ? password : '●'.repeat(password.length)}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    {isModalVisible && <div id="view" className={`modal ${isModalVisible ? "fade show" : "fade"}`}
                        style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" {...(isModalVisible ? { "aria-modal": true, role: "dialog" } : { "aria-hidden": true })}>
                        <div className="modal-dialog modal-dialog-scrollable modal-lg" >
                            <div className="modal-content" style={value === "moon" ? { backgroundColor: "#1F2A3D" } : undefined} >
                                <div className="modal-body">
                                    <div style={{ display: "flex", justifyContent: "right", alignItems: "right", cursor: "pointer" }}>
                                        <svg onClick={handlecloseModal} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="red" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div className="text-center mt-2 mb-4">
                                        Edit Profile
                                    </div>

                                    <form id="editform" method="post" onSubmit={(e) => handleFormEdit(e)} encType="multipart/form-data"
                                        className="ps-3 pr-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label" style={value === "moon" ? { color: "white" } : undefined} >User Name</label>
                                                    <input type="text" style={value === "moon" ? { color: "white" } : undefined} className="form-control" name="userName" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                                                </div>
                                                <p id="usernamevalidationmessage" ref={usernamevalidationmessage} ></p>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label" style={value === "moon" ? { color: "white" } : undefined} >Mobile No.</label>
                                                    <input type="text" style={value === "moon" ? { color: "white" } : undefined} className="form-control" name="mobileno" value={profileMobileNo} onChange={(e) => setProfileMobileNo(e.target.value)} />
                                                </div>
                                                <p id="mobilenovalidationmessage" ref={mobilenovalidationmessage}></p>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="inputcom" className="form-label" style={value === "moon" ? { color: "white" } : undefined}>Password.</label>
                                                    <input type="text" className="form-control" style={value === "moon" ? { color: "white" } : undefined} name="password" value={profilePassword} onChange={(e) => setProfilePassword(e.target.value)} />
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