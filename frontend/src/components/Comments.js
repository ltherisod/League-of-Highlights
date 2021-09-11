import React, { useState } from "react"
import { connect } from "react-redux"
import Comment from "../components/Comment"
import videosActions from "../redux/actions/videosActions"
import toast from 'react-hot-toast'

const Comments = (props) => {
  const [content, setContent] = useState("")

  const addCommentHandler = async () => {
    if (!content) return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-black flex`}
        style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
      >
        <img style={{ width: "60px", height: "60px"}}
          className="h-4 w-4 rounded-full"
          src="https://i.postimg.cc/9Q6BYPNR/varusfacepalm.png"
          alt=""
        />
        <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
          empty field!
        </p>
      </div>
    ))
    try{
      const res = await props.addComment(props.video._id, content)
      if (res.success) {
        setContent('')
        return false
      }else{
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/g2dLtyDR/logOut.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              {res.error}
            </p>
          </div>
        ))
      }
    }catch(error){
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
        >
          <img style={{ width: "60px", height: "60px"}}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            {error}
          </p>
        </div>
      ))
      props.history.push('/error')
    }
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
            value={content}
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
