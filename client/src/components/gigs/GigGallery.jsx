const GigGallery = ({ images = [] }) => {
    if (!images.length) return null;

    return (
        <img
            src={images[0]}
            alt="gig"
            className="w-full object-fit rounded-xl"
        />
    );
};

export default GigGallery;
