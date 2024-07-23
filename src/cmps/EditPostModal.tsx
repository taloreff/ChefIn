import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { postService } from '../services/post.service';
import { ImgUploader } from './ImgUploader';

interface EditPostModalProps {
    post: Post;
    onClose: () => void;
    onPostUpdated: (updatedPost: Post) => void;
}

const labelsOptions = ['Italian', 'French', 'Asian', 'Middle-East', 'African'];

function EditPostModal({ post, onClose, onPostUpdated }: EditPostModalProps) {
    const [updatedPost, setUpdatedPost] = useState<Post>(post);

    useEffect(() => {
        setUpdatedPost(post); // Ensure updatedPost is synchronized with the prop
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedPost({ ...updatedPost, [name]: value });
    };

    const handleImgUpload = (file: File) => {
        setUpdatedPost({ ...updatedPost, image: file });
    };

    const handleLabelChange = (label: string) => {
        setUpdatedPost(prevPost => {
            if (prevPost.labels.includes(label)) {
                return { ...prevPost, labels: prevPost.labels.filter(l => l !== label) };
            } else {
                return { ...prevPost, labels: [...prevPost.labels, label] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const savedPost = await postService.save(updatedPost);
            console.log("Post updated successfully", savedPost);
            onPostUpdated(savedPost);
        } catch (error) {
            console.error("Error updating post", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Edit Post</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Image:</label>
                        <ImgUploader id="post-image" onUploaded={handleImgUpload} className="create-post-uploader" />
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
                        <div className="labels-options">
                            {labelsOptions.map(label => (
                                <div key={label} className="label-option">
                                    <input
                                        type="checkbox"
                                        id={label}
                                        checked={updatedPost.labels.includes(label)}
                                        onChange={() => handleLabelChange(label)}
                                    />
                                    <label htmlFor={label}>{label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPostModal;
