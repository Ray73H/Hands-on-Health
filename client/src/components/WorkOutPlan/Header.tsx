import React, { useState } from "react";
import "./css/Header.css";
import logo from "../../logos/small_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const { logout } = useAuth();

    const handleLogoClick = () => {
        setShowDropdown((prevState) => !prevState);
    };

    const handleLogout = () => {
        setShowDropdown(false);
        logout();
        navigate("/login");
    };

    return (
        <div className="header">
            <div className="header-title" onClick={() => navigate("/")}>
                Hands on Health
            </div>
            <div className="header-logo">
                <img src={logo} alt="Logo" onClick={handleLogoClick} style={{ cursor: "pointer" }} />
            </div>
            {showDropdown && (
                <div className="dropdown-menu">
                    <div onClick={handleLogout} className="dropdown-item">
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
