import React from 'react'
import { Link } from "react-router-dom";
import { Post } from '../types/Post';

interface ChefPreviewProps {
    post: Post;
}

export function ChefPreview({ post }: ChefPreviewProps) {
    return (
        <div className="chef-preview">
            <Link to={`/post/${post._id}`} >
                <div className="chef-header">
                    <div className="header-info">
                        <img className="profile-pic" src={post.profileImgUrl} alt={"profilepic"} />
                        <h4>{post.username}</h4>
                    </div>
                    <h2>{post.title}</h2>
                </div>
                <img className="chef-image" src={post.image} alt={"kitchen"} />
                <p className='chef-desc'>{post.description}</p>
            </Link>
        </div>
    )
}
