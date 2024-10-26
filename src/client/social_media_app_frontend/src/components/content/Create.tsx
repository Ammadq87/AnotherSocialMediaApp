import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { uiConstants } from "../UIConstants"
import { faImages, faBold, faItalic } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import ContentService from "../../../service/ContentService"

interface ActionItem {
    icon: any,
    hoverText?: string
};

export default function Create() {

    const actionItems: ActionItem[] = [
        {
            icon: faImages,
            hoverText: 'Images'
        },
        {
            icon: faBold,
            hoverText: 'Bold'
        },
        {
            icon: faItalic,
            hoverText: 'Italicize'
        }
    ]

    const [caption, setCaption] = useState("");

    async function createContent() {
        try {
            const response = await ContentService.createPost(caption)
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }

    function handleCaption(text: string) {
        setCaption(text.trim())
    }

    function disablePostBtn() {
        return caption === "" || caption.trim().length === 0;
    }

    return (
        <>
            <div className={uiConstants.div.contentDiv} >
                <textarea
                    name="caption"
                    rows={4}
                    className={uiConstants.text.textArea}
                    onChange={(e) => { handleCaption(e.target.value) }}
                    placeholder="Say something to the world..."
                >
                </textarea>
                <div id="action-center" className="flex justify-between my-2">
                    <div id="actions" className="flex gap-4">
                        {
                            actionItems.map((item, i) => {
                                return (
                                    <div key={i} className="text-lg text-white">
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { createContent() }}
                            disabled={disablePostBtn()}
                            className={disablePostBtn() ? uiConstants.btn.disabledBtn : uiConstants.btn.primaryBtn}>
                            <span>Post</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}