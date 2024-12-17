import React from 'react'
import { NavLink } from 'react-router-dom'

const SearchContent = ({ routes, catnamesandids, closeModal, Noresultmessage }) => {
    console.log(routes, catnamesandids);
    return (
        <>
            {Noresultmessage ? <li className="p-1 mb-1 bg-hover-light-black rounded px-2" style={{ listStyle: "none" }}>{Noresultmessage}</li>
                : routes ? (
                    <li className="p-1 mb-1 bg-hover-light-black rounded px-2" >
                        <NavLink to={`/${routes}`} onClick={closeModal}>
                            <div style={{ cursor: "pointer" }}>
                                {/* <span className="text-dark fw-semibold d-block">{routes}</span> */}
                                {routes}
                                <span className="fs-4 d-block text-body-secondary">/{routes}</span>
                            </div>
                        </NavLink>
                    </li >) : (<li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                        <NavLink to={`/category/${catnamesandids.catId}`} onClick={closeModal}>
                            <div style={{ cursor: "pointer" }}>
                                {/* <span className="text-dark fw-semibold d-block">{routes}</span> */}
                                {catnamesandids.catName}
                                <span className="fs-4 d-block text-black">{catnamesandids.catName}</span>
                            </div>
                        </NavLink>
                    </li>)
            }
        </>
    )
}

export default SearchContent