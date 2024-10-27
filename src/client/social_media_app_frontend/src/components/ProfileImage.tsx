import { getAttributeFromToken } from "../../lib/utils";

interface ProfileImageProps {
    size: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ProfileImage({ size }: ProfileImageProps) {
    const userID = getAttributeFromToken("userID");

    const sizeClass = {
        sm: 'w-10',
        md: 'w-20',
        lg: 'w-32',
        xl: 'w-40',
    }[size];

    return (
        <img
            className={`${sizeClass} border rounded-full`}
            src="https://avatarfiles.alphacoders.com/150/150277.jpg"
            alt=""
        />
    );
}