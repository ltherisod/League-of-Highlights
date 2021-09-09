import "./UploadVideo.css"

const UploadVideo = () => {
    return (
        <>
            <div className="videoForm">
                <h3>Upload your video</h3>
                <form>
                    <input type="text" name="title" placeholder="Title of your video" />
                    <input type="text" name="url" placeholder="url of your video" />
                    <select>
                        <option>Choose your champion</option>
                    </select>
                    <input type="text" name="tags" placeholder="hashtag" />
                    <input type="text" name="tags" placeholder="hashtag" />
                </form>
                <button>Upload</button>
            </div>
        </>
        )

}

export default UploadVideo