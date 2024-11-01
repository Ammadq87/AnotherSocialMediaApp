import { isAuthenticated } from "../../lib/utils"
import { uiConstants } from "../components/UIConstants"
import Create from "../components/content/Create";

export default function Feed() {
    if (!isAuthenticated()) {
        window.location.href = '/auth/login'
        return;
    }

    return (
        <>
            <div id="container" className={uiConstants.div.centerFeed}>
                <div id="feed_container">
                    <Create />
                </div>
            </div>
        </>
    )
}