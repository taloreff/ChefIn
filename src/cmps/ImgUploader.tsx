import React, { useState } from 'react';

interface ImgUploaderProps {
    id: string;
    onUploaded: (file: File) => void;
    className?: string;
}

export function ImgUploader({ id, onUploaded, className }: ImgUploaderProps) {
    const [imgData, setImgData] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    function uploadImg(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.files && ev.target.files[0]) {
            const file = ev.target.files[0];
            setImgData(file);
            onUploaded(file);
            setIsUploading(false);
        }
    }

    function getUploadLabel() {
        if (imgData) return 'Edit Image';
        return isUploading ? 'Uploading....' : 'Upload';
    }

    return (
        <section className={`upload-preview ${className}`}>
            <label className="upload-label" htmlFor={`imgUpload-${id}`}>{getUploadLabel()}</label>
            <input className='file-upload' type="file" onChange={uploadImg} accept="image/*" id={`imgUpload-${id}`} />
            {imgData && <img src={URL.createObjectURL(imgData)} alt="Uploaded" className="uploaded-image" />}
        </section>
    );
}
