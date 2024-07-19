import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import { ImgUploader } from '../cmps/ImgUploader';
import placeholderAvatar from '../assets/imgs/avatar.webp';
import { AppState } from '../types/AppState';
import { useSelector } from 'react-redux';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

export function ProfileIndex() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
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
        if (user) {
            setUser({ ...user, profileImgUrl: imgUrl });
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (user) {
            setUser({ ...user, [name]: value });
        }
    }

    async function handleSave() {
        try {
            if (user) {
                await userService.update(user);
                navigate('/')
            }
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile');
        }
    }

    if (!user) return null; // Return null or a loading indicator if user data is not loaded

    return (
        <div className='myprofile-container'>
            <div className="myprofile-page">
                <div className="myprofile-header">
                    <div className="myprofile-pic-container">
                        <img
                            src={user.profileImgUrl || placeholderAvatar}
                            alt="Profile"
                            className="myprofile-pic"
                        />
                        <ImgUploader id={user._id} onUploaded={handleImgUpload} className="profile-uploader" />
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
        </div>

    );
}
