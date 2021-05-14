import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

import { FriendList } from '../FriendList/FriendList';


import './Sidebar.css';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__search">
                <input className="sidebar__search-input"  placeholder="Search" />
                <IoSearchOutline className="sidebar__search-icon" />
            </div>
            <FriendList/>
        </div>
    )
}
