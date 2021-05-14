import React from 'react';
import { IoCaretDownCircle } from "react-icons/io5";



import './TopBar.css';

const AVATARURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNVLeR4T4DCVvjwOndi-8v_ER99MUZR8qJQ&usqp=CAUZ";

export const TopBar = ({user}) => {
    return (
        <div className="topbar">
            <h1 className="topbar__title">Messages</h1>
            <div className="topbar__user-profile">
                <img src={AVATARURL} alt="avatar" className="topbar__user-profile__avatar"/>
                <span className="topbar__user-profile__name">{user.firstName}</span>
                <IoCaretDownCircle className="topbar__user-profile__dropdown"/>
            </div>
        </div>
    )
}
