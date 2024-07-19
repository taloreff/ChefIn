import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Post } from '../types/Post';
import Avatar from '../assets/imgs/avatar.webp';
import { userService } from '../services/user.service';

interface ChefPreviewProps {
    post: Post;
}

export function ChefPreview({ post }: ChefPreviewProps) {
    const [user, setUser] = useState<{ username: string, profileImgUrl: string } | null>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userData = await userService.getById(post.userId);
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    return (
        <div className="chef-preview">
            <Link to={`/post/${post._id}`} >
                <div className="chef-header">
                    <div className="header-info">
                        <img className="profile-pic" src={user?.profileImgUrl || Avatar} alt="profilepic" />
                        <h4>{user?.username}</h4>
                    </div>
                    <h2>{post.title}</h2>
                </div>
                <img className="chef-image" src={post.image} alt="kitchen" />
                <p className='chef-desc'>{post.description}</p>
            </Link>
        </div>
    );
}
