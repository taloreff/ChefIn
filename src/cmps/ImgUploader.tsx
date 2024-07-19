import React, { useState } from 'react';
import { uploadService } from '../services/upload.service';

interface ImgUploaderProps {
    id: string;
    onUploaded: (id: string, imgUrl: string) => void;
}

export function ImgUploader({ id, onUploaded }: ImgUploaderProps) {
    const [imgData, setImgData] = useState<{ imgUrl: string | null, width?: number, height?: number }>({ imgUrl: null });
    const [isUploading, setIsUploading] = useState(false);

    async function uploadImg(ev: React.ChangeEvent<HTMLInputElement>) {
        setIsUploading(true);
        const { secure_url, height, width } = await uploadService.uploadImg(ev);
        setImgData({ imgUrl: secure_url, width, height });
        setIsUploading(false);
        onUploaded(id, secure_url);
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Edit Image';
        return isUploading ? 'Uploading....' : 'Upload';
    }

    return (
        <section className="upload-preview">
            <label className="upload-label" htmlFor={`imgUpload-${id}`}>{getUploadLabel()}</label>
            <input className='file-upload' type="file" onChange={uploadImg} accept="image/*" id={`imgUpload-${id}`} />
        </section>
    );
}
