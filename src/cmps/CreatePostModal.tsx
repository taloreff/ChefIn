import React, { useState } from 'react';
import { Post } from '../types/Post';
import { postService } from '../services/post.service';
import { ImgUploader } from './ImgUploader';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { AppState } from '../types/AppState';

interface CreatePostModalProps {
    onClose: () => void;
    onPostCreated: (newPost: Post) => void;
}

const labelsOptions = ['Italian', 'French', 'Asian', 'Middle-East', 'African'];

function CreatePostModal({ onClose, onPostCreated }: CreatePostModalProps) {
    const [newPost, setNewPost] = useState<Post>(postService.getDefaultPost());
    const loggedinUser = useSelector((state: AppState) => state.userModule.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleImgUpload = (id: string, imgUrl: string) => {
        setNewPost({ ...newPost, image: imgUrl });
    };

    const handleLabelChange = (label: string) => {
        setNewPost(prevPost => {
            if (prevPost.labels.includes(label)) {
                return { ...prevPost, labels: prevPost.labels.filter(l => l !== label) };
            } else {
                return { ...prevPost, labels: [...prevPost.labels, label] };
            }
        });
    };

    const handleWhatsIncludedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost({ ...newPost, whatsIncluded: e.target.value.split('\n').map(item => item.trim()) });
    };

    const handlePlaceSelect = async (place: any) => {
        console.log(place);  // Log the place object to inspect its structure

        if (place && place.value && place.value.place_id) {
            try {
                const details = await postService.getPlaceDetails(place.value.place_id);
                console.log(details);  // Log the place details to inspect its structure
                if (details.result) {
                    setNewPost({
                        ...newPost,
                        meetingPoint: {
                            address: place.label,
                            lat: details.result.geometry.location.lat,
                            lng: details.result.geometry.location.lng,
                        },
                        userId: loggedinUser?._id || '',
                        username: loggedinUser?.username || '',
                        profileImgUrl: loggedinUser?.profileImgUrl || '',
                    });
                } else {
                    console.error("Fetched place details do not have the expected structure:", details);
                }
            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        } else {
            console.error("Selected place does not have the expected structure:", place);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const savedPost = await postService.save(newPost);
            onPostCreated(savedPost);
            onClose();
        } catch (error) {
            console.error("Error creating post", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content create-post-modal">
                <div className="modal-header">
                    <h2 className="modal-title">Create New Post</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label>Image:</label>
                        <ImgUploader id="post-image" onUploaded={handleImgUpload} className="create-post-uploader" />
                    </div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={newPost.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={newPost.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Overview:</label>
                        <textarea name="overview" value={newPost.overview} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Labels:</label>
                        <div className="labels-options">
                            {labelsOptions.map(label => (
                                <div key={label} className="label-option">
                                    <input
                                        type="checkbox"
                                        id={label}
                                        checked={newPost.labels.includes(label)}
                                        onChange={() => handleLabelChange(label)}
                                    />
                                    <label htmlFor={label}>{label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>What's Included (one item per line):</label>
                        <textarea name="whatsIncluded" value={newPost.whatsIncluded.join('\n')} onChange={handleWhatsIncludedChange} />
                    </div>
                    <div className="form-group">
                        <label>Meeting Point:</label>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyB24fmoFy0PfYJeqW1F7Ida3Ok3IlwDZUw"
                            selectProps={{
                                value: newPost.meetingPoint.address
                                    ? { label: newPost.meetingPoint.address, value: { lat: newPost.meetingPoint.lat, lng: newPost.meetingPoint.lng } }
                                    : null,
                                onChange: handlePlaceSelect,
                            }}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-button">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePostModal;