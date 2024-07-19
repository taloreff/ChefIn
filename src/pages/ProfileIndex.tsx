import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import { ImgUploader } from '../cmps/ImgUploader';
import placeholderAvatar from '../assets/imgs/avatar.webp'
import { AppState } from '../types/AppState';
import { useSelector } from 'react-redux';

export function ProfileIndex() {
    const [user, setUser] = useState({});
    const loggedinUser = useSelector((state: AppState) => state.userModule.user);


    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        if (loggedinUser) {
            const userData = await userService.getById(loggedinUser._id);
            setUser(userData);
        }
    }

    function handleImgUpload(id: string, imgUrl: string) {
        setUser({ ...user, profilePicUrl: imgUrl });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    async function handleSave() {
        try {
            await userService.update(user);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile');
        }
    }

    return (
        <div className="myprofile-page">
            <div className="myprofile-header">
                <div className="myprofile-pic-container">
                    <img
                        src={user.profilePicUrl || placeholderAvatar}
                        alt="Profile"
                        className="myprofile-pic"
                    />
                    <ImgUploader id={user._id} onUploaded={handleImgUpload} />
                </div>
                <h2>{user.username}</h2>
            </div>
            <div className="myprofile-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={user.email} name="email" disabled />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={user.username}
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSave} className="save-button">
                    Save
                </button>
            </div>
        </div>
    );
}