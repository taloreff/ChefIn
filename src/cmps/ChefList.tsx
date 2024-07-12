import React from 'react';
import { Chef } from '../types/Chef';

interface ChefListProps {
    chefs: Chef[];
}

export function ChefList({ chefs }: ChefListProps) {
    return (
        <ul className="chef-list">
            {chefs.map((chef) => (
                <li key={chef._id} className="chef-card">
                    <div className="chef-header">
                        <div className="header-info">
                            <img className="profile-pic" src={chef.profileImgUrl} alt={"profilepic"} />
                            <h4>{chef.username}</h4>
                        </div>
                        <h2>{chef.title}</h2>
                    </div>
                    <img className="chef-image" src={chef.image} alt={"kitchen"} />
                    <p className='chef-desc'>{chef.description}</p>
                </li>
            ))}
        </ul>
    );
}
