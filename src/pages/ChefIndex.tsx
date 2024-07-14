// src/pages/ChefIndex.tsx
import React, { useState, useEffect } from 'react';
import { ChefList } from '../cmps/ChefList';
import { postService } from '../services/post.service';
import { Post } from '../types/Post';

export function ChefIndex() {
    const itemsPerPage = 5;

    const [italianPage, setItalianPage] = useState(0);
    const [frenchPage, setFrenchPage] = useState(0);
    const [italianChefs, setItalianChefs] = useState<Post[]>([]);
    const [frenchChefs, setFrenchChefs] = useState<Post[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const posts = await postService.query({});
                setItalianChefs(posts.filter(post => post.labels.includes('Italian')));
                setFrenchChefs(posts.filter(post => post.labels.includes('French')));
            } catch (error) {
                console.error('Error fetching chefs:', error);
            }
        };

        loadPosts();
    }, []);

    const paginatedItalianChefs = italianChefs.slice(italianPage * itemsPerPage, (italianPage + 1) * itemsPerPage);
    const paginatedFrenchChefs = frenchChefs.slice(frenchPage * itemsPerPage, (frenchPage + 1) * itemsPerPage);

    const handlePageChange = (setPage: React.Dispatch<React.SetStateAction<number>>, page: number, maxPages: number) => {
        if (page < 0) return;
        if (page >= maxPages) return;
        setPage(page);
    };

    return (
        <div className="chef-index">
            <div className="section">
                <h2>Italian</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setItalianPage, italianPage - 1, Math.ceil(italianChefs.length / itemsPerPage))}>&lt;</button>
                    <ChefList posts={paginatedItalianChefs} />
                    <button onClick={() => handlePageChange(setItalianPage, italianPage + 1, Math.ceil(italianChefs.length / itemsPerPage))}>&gt;</button>
                </div>
            </div>
            <div className="section">
                <h2>French</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage - 1, Math.ceil(frenchChefs.length / itemsPerPage))}>&lt;</button>
                    <ChefList posts={paginatedFrenchChefs} />
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage + 1, Math.ceil(frenchChefs.length / itemsPerPage))}>&gt;</button>
                </div>
            </div>
        </div>
    );
}
