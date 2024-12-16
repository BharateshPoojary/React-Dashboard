import React from 'react'
import { NavLink } from 'react-router-dom'

const SearchContent = ({ routes, categories, closeModal }) => {

    return (
        <>
            <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                <NavLink to={`/${routes}`} onClick={closeModal}>
                    <div style={{ cursor: "pointer" }}>
                        {/* <span className="text-dark fw-semibold d-block">{routes}</span> */}
                        {routes}
                        <span className="fs-2 d-block text-body-secondary">/{routes}</span>
                    </div>
                </NavLink>
            </li>
            <li className="p-1 mb-1 bg-hover-light-black rounded px-2">
                <NavLink to={`/${routes}`} onClick={closeModal}>
                    <div style={{ cursor: "pointer" }}>
                        {/* <span className="text-dark fw-semibold d-block">{routes}</span> */}
                        {categories}
                        <span className="fs-2 d-block text-body-secondary">{categories}</span>
                    </div>
                </NavLink>
            </li>
        </>
    )
}

export default SearchContent