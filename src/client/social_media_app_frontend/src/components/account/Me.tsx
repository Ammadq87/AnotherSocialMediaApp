import AboutMe from "./AboutMe";
import MyPosts from "./MyPosts";

export default function Me() {
    return (
        <>
            <div className="my-4 grid grid-cols-1 gap-4 rounded-md">
                <AboutMe />
                <MyPosts />
            </div>
        </>
    )
}