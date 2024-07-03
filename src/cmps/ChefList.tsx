import React from 'react';
import { Chef } from '../types/Chef';

interface ChefListProps {
    chefs: Chef[];
    onUpdateChef: (chef: Chef) => void;
}

export function ChefList({ chefs, onUpdateChef }: ChefListProps) {
    return (
        <ul className="chef-list">
            {chefs.map((chef) => (
                <li key={chef.id} className="chef-card">
                    <img src={chef.image} alt={chef.name} />
                    <h3>{chef.name}</h3>
                    <p>{chef.bio}</p>
                    <button onClick={() => onUpdateChef(chef)}>Update</button>
                </li>
            ))}
        </ul>
    );
}
