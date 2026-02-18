const Avatar = ({ src, size = 32 }) => {
    return (
        <img
            src={src || "/avatar.png"}
            alt="avatar"
            className="rounded-full object-cover"
            style={{ width: size, height: size }}
        />
    );
}
export default Avatar;