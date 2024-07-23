import { useEffect, useState } from 'react';
import { postService } from '../services/post.service';
import MyPostsList from '../cmps/MyPostsList';
import { Post } from '../types/Post';
import EditPostModal from '../cmps/EditPostModal';

export function MyPostsIndex() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        try {
            const data: Post[] = await postService.getMyPosts();
            setPosts(data);
        } catch (error) {
            console.error("Error loading posts", error);
        } finally {
            setIsLoading(false);
        }
    }

    function handlePostUpdated(updatedPost: Post) {
        console.log("updatedPost:", updatedPost);
        setPosts(prevPosts =>
            prevPosts.map(post => (post._id === updatedPost._id ? updatedPost : post))
        );
        setEditingPost(null); // Ensure editingPost is reset
    }

    async function handleDelete(postId: string) {
        try {
            await postService.remove(postId);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    }

    return (
        <div className='posts-container'>
            <MyPostsList posts={posts} onEdit={setEditingPost} onDelete={handleDelete} isLoading={isLoading} />
            {editingPost && (
                <EditPostModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onPostUpdated={handlePostUpdated}
                />
            )}
        </div>
    );
}
