import React, { useEffect, useState } from 'react';
import { postService } from '../services/post.service';
import MyPostsList from '../cmps/MyPostsList';
import { Post } from '../types/Post';

export function MyPostsIndex() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function loadPosts() {
            try {
                const data: Post[] = await postService.getMyPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error loading posts", error);
            }
        }

        loadPosts();
    }, []);

    return (
        <div className='posts-container'>
            <MyPostsList posts={posts} />
        </div>
    );
}
