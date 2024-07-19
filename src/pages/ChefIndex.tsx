import React, { useState, useEffect } from 'react';
import { ChefList } from '../cmps/ChefList';
import { postService } from '../services/post.service';
import { Post } from '../types/Post';
import CreatePostModal from '../cmps/CreatePostModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

export function ChefIndex() {
    const itemsPerPage = 5;

    const [italianPage, setItalianPage] = useState(0);
    const [frenchPage, setFrenchPage] = useState(0);
    const [italianChefs, setItalianChefs] = useState<Post[]>([]);
    const [frenchChefs, setFrenchChefs] = useState<Post[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

    function handlePostCreated(newPost: Post) {
        if (newPost.labels.includes('Italian')) {
            setItalianChefs(prevPosts => [...prevPosts, newPost]);
        } else if (newPost.labels.includes('French')) {
            setFrenchChefs(prevPosts => [...prevPosts, newPost]);
        }
    }

    return (
        <div className="chef-index">
            <div className="section">
                <h2>Italian</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setItalianPage, italianPage - 1, Math.ceil(italianChefs.length / itemsPerPage))}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <ChefList posts={paginatedItalianChefs} />
                    <button onClick={() => handlePageChange(setItalianPage, italianPage + 1, Math.ceil(italianChefs.length / itemsPerPage))}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div className="section">
                <h2>French</h2>
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage - 1, Math.ceil(frenchChefs.length / itemsPerPage))}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <ChefList posts={paginatedFrenchChefs} />
                    <button onClick={() => handlePageChange(setFrenchPage, frenchPage + 1, Math.ceil(frenchChefs.length / itemsPerPage))}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            {isCreateModalOpen && (
                <CreatePostModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onPostCreated={handlePostCreated}
                />
            )}
            <button
                className="fab"
                onClick={() => setIsCreateModalOpen(true)}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
