import { uploadImage } from "../../services/uploadService";
import { useState } from "react";

const ImageUploader = ({ images = [], setImages }) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const res = await uploadImage(file);

        if (res.data.url) {
            setImages([...images, res.data.url]);
        }
        setUploading(false);
    };

    return (
        <div className="space-y-3">

            <input type="file" onChange={handleUpload} />

            {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
            )}

            <div className="flex gap-2 flex-wrap">
                {images.filter(Boolean).map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        className="h-20 w-20 rounded object-cover border"
                    />
                ))}
            </div>

        </div>
    );
};

export default ImageUploader;
