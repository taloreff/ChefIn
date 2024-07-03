import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../assets/imgs/hamburger_menu.png";
import userIcon from "../assets/imgs/user_icon.png";

export function UserActions() {
    const [showUserActionModal, setShowUserActionModal] = useState(false);
    const userActionsModalRef = useRef(null);

    useEffect(() => {

        const handleEscapeKeyPress = (event) => {
            if (event.key === "Escape") {
                setShowUserActionModal(false);
            }
        };

        function handleClickOutside(event) {
            if (
                userActionsModalRef.current &&
                !userActionsModalRef.current.contains(event.target) &&
                !event.target.classList.contains("user-actions-container")
            ) {
                setShowUserActionModal(false);
            }
        }

        document.addEventListener("keydown", handleEscapeKeyPress);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEscapeKeyPress);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function toggleUserActionModal() {
        setShowUserActionModal(
            (prevShowUserActionModal) => !prevShowUserActionModal
        );
    }

    async function handleLogoutClick() {
        try {
            //   await logout()
            console.log("logging out...")
            setShowUserActionModal(false);
        } catch (err) {
            console.log('Cannot logout')
        }
    }

    return (
        <div className="user-actions-container" onClick={toggleUserActionModal}>
            <img
                className="hamburger-menu-icon"
                src={hamburgerIcon}
                alt="hamburger-menu-icon"
            />
            <img
                className="user-icon"
                src={userIcon}
                alt="user-icon"
            />
            <div
                ref={userActionsModalRef}
                className={`user-actions-modal ${showUserActionModal ? "" : "hidden"
                    }`}
            >
                <div>
                    <Link to={"/posts"} className="user-action">
                        My posts
                    </Link>
                    <div className="hr"></div>
                    <Link to={"/profile"} className="user-action">
                        My profile
                    </Link>
                    <div className="hr"></div>
                    <a href="#" className="user-action" onClick={handleLogoutClick}>
                        Log out
                    </a>
                </div>
            </div>
        </div>
    );
}
