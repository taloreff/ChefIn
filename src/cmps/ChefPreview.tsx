import React from 'react'
import { Link } from "react-router-dom";

export function ChefPreview({ chef, onUpdateChef }) {
    return (
        <div className="chef-preview">
            <Link to={`/chef/${chef._id}`} target="_blank" >
                <img src={chef.image} alt="" />
                <h3>{chef.name}</h3>
                <p>{chef.bio}</p>
            </Link>
        </div>
    )
}
