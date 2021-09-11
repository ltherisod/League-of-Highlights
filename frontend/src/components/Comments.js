import React, { useState } from "react"
import { connect } from "react-redux"
import Comment from "../components/Comment"
import videosActions from "../redux/actions/videosActions"

const Comments = (props) => {
  const [content, setContent] = useState("")
  const addCommentHandler = async () => {
    if (!content) return false
    const res = await props.addComment(props.video._id, content)
    console.log(res)
    if (res.success) {
      return false
    }
    console.log(res.error)
  }
  return (
    <>
      <div className="comment">
          { props.video.comments.length === 0 ?
          <div className="noComments">
            <p>Would you like to post the first comment?</p>
            <img src="https://i.postimg.cc/MT8wXJsr/minion.png" alt=""/>
          </div> :          
          props.video.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
        <div className="inputComment">
          <input
            className="inputCom"
            type="text"
            placeholder="Leave a comment."
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="addComment" onClick={addCommentHandler}>Add comment</button>
        </div>
      </>
  )
}

const mapDispatchToProps = {
  addComment: videosActions.addComment,
}

export default connect(null, mapDispatchToProps)(Comments)
