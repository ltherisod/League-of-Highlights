import React from "react"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"

const Comment = (props) => {
  console.log(props)
  const deleteHandler = async () => {
    const res = await props.deleteComment(props.comment._id)
    if (res.success) {
      console.log("Comentario eliminado")
    }
    console.log(res.error)
  }

  const updateHandler = async () => {
    console.log("Auch")
  }
  return (
    <div>
      <p className="text-white">{`${props.comment.author.username}: ${props.comment.content}`}</p>
      {props.comment.author._id === props.user._id && (
        <>
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
          <button type="button" onClick={updateHandler}>
            Update
          </button>
        </>
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
  updateComment: videosActions.updateVideo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
