import MyPostsPreview from '../cmps/MyPostsPreview';
import { Post } from '../types/Post';
import { Spinner } from './Spinner';
import { FaRegSadTear } from 'react-icons/fa';

interface MyPostsListProps {
    posts: Post[];
    isLoading: boolean;
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
}

function MyPostsList({ posts, isLoading, onEdit, onDelete }: MyPostsListProps) {
    return (
        <>
            <h1 className='myposts-title'>My Posts</h1>
            <div className="posts-grid">
                {isLoading ? (
                    <Spinner />
                ) : posts.length === 0 ? (
                    <div className="no-posts">
                        <FaRegSadTear size={50} />
                        <p>No posts to display</p>
                        <p>It looks like you haven't created any posts yet.</p>
                    </div>
                ) : (
                    posts.map(post => (
                        <MyPostsPreview
                            key={post._id}
                            post={post}
                            onEdit={() => onEdit(post)}
                            onDelete={() => onDelete(post._id!)}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default MyPostsList;
