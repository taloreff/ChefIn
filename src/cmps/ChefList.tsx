import React from 'react';
import { Post } from '../types/Post';
import { ChefPreview } from './ChefPreview';

interface ChefListProps {
    posts: Post[];
}

export function ChefList({ posts }: ChefListProps) {
    return (
        <ul className="chef-list">
            {posts.map((post) => (
                <li key={post._id} className="chef-card">
                    <ChefPreview post={post} />
                </li>
            ))}
        </ul>
    );
}
