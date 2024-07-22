import React, { useState, useEffect } from 'react';
import { ChefList } from '../cmps/ChefList';
import { postService } from '../services/post.service';
import { Post } from '../types/Post';
import CreatePostModal from '../cmps/CreatePostModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const ITEMS_PER_PAGE = 5;
const CUISINES = ['Italian', 'French', 'Asian', 'Middle-East', 'African'];

export function ChefIndex() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [pages, setPages] = useState<Record<string, number>>(
        CUISINES.reduce((acc, cuisine) => ({ ...acc, [cuisine]: 0 }), {})
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        try {
            const posts = await postService.query({});
            setAllPosts(posts);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setIsLoading(false);
        }
    }

    const handlePageChange = (cuisine: string, change: number) => {
        setPages(prevPages => {
            const newPage = prevPages[cuisine] + change;
            const filteredPosts = allPosts.filter(post => post.labels.includes(cuisine));
            const maxPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

            if (newPage < 0 || newPage >= maxPages) return prevPages;

            return { ...prevPages, [cuisine]: newPage };
        });
    };

    const handlePostCreated = (newPost: Post) => {
        setAllPosts(prevPosts => [...prevPosts, newPost]);
    };

    const getPostsForCuisine = (cuisine: string) => {
        const filteredPosts = allPosts.filter(post => post.labels.includes(cuisine));
        const startIndex = pages[cuisine] * ITEMS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    };

    return (
        <div className="chef-index">
            {CUISINES.map(cuisine => {
                const postsForCuisine = getPostsForCuisine(cuisine);
                if (postsForCuisine.length === 0) return null;

                return (
                    <div key={cuisine} className="section">
                        <h2>{cuisine}</h2>
                        <div className="pagination-controls">
                            <button onClick={() => handlePageChange(cuisine, -1)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <ChefList posts={postsForCuisine} isLoading={isLoading} />
                            <button onClick={() => handlePageChange(cuisine, 1)}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                );
            })}
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
