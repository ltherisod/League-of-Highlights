import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"

const Comment = (props) => {
  const [updateComment, setUpdateComment] = useState(false)
  const deleteHandler = async () => {
    const res = await props.deleteComment(props.comment._id)
    if (res.success) {
      console.log("Comentario eliminado")
    }
    console.log(res.error)
  }
  

  const updateHandler = async () => {
    setUpdateComment(!updateComment)
  }
  const inputHandler = useRef()
  const sendUpdate = async () => {
    const res = await props.updateComment(props.comment._id, inputHandler.current.value)
    if(res.success){
      setUpdateComment(!updateComment)
    }
  }

  const inputUpdateComment = <div>
                                  <input className="" type="text" defaultValue={props.comment.content} ref={inputHandler}></input>
                                  <button onClick={sendUpdate}>ok</button>
                            </div>

  return (
    <div className="commentBox">
      {!updateComment ? <p className="textComment">{`${props.comment.author.username}: ${props.comment.content}`}</p> : inputUpdateComment}
      {props.comment.author._id === props.user._id && (
        <div className="buttonsComment">
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
          <button type="button" onClick={updateHandler}>
            Update
          </button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  deleteComment: videosActions.deleteComment,
  updateComment: videosActions.editComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
