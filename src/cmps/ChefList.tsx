import React from 'react';
import { Post } from '../types/Post';
import { ChefPreview } from './ChefPreview';
import { Spinner } from './Spinner';

interface ChefListProps {
    posts: Post[];
    isLoading: boolean;
}

export function ChefList({ posts, isLoading }: ChefListProps) {
    return (
        <ul className="chef-list">
            {isLoading ? (
                <Spinner />
            ) : posts.length === 0 ? (
                <p>No posts to display</p>
            ) : (posts.map((post) => (
                <li key={post._id} className="chef-card">
                    <ChefPreview post={post} />
                </li>
            )))}
        </ul>
    );
}
