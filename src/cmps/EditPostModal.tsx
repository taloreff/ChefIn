import React, { useState } from 'react';
import { Post } from '../types/Post';
import { postService } from '../services/post.service';
import { ImgUploader } from './ImgUploader';

interface EditPostModalProps {
    post: Post;
    onClose: () => void;
}

function EditPostModal({ post, onClose }: EditPostModalProps) {
    const [updatedPost, setUpdatedPost] = useState<Post>(post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedPost({ ...updatedPost, [name]: value });
    };

    const handleImgUpload = (id: string, imgUrl: string) => {
        setUpdatedPost({ ...updatedPost, image: imgUrl });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postService.save(updatedPost);
            onClose();
        } catch (error) {
            console.error("Error updating post", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Image:</label>
                        <ImgUploader id="post-image" onUploaded={handleImgUpload} />
                    </div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={updatedPost.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={updatedPost.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Overview:</label>
                        <textarea name="overview" value={updatedPost.overview} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Labels:</label>
                        <input type="text" name="labels" value={updatedPost.labels.join(', ')} onChange={(e) => setUpdatedPost({ ...updatedPost, labels: e.target.value.split(', ') })} />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPostModal;
