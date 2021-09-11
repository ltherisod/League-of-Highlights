import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import { FiTrash2, FiEdit2, FiCheck } from "react-icons/fi"
import toast,{ Toaster } from "react-hot-toast"

const Comment = (props) => {
  const [updateComment, setUpdateComment] = useState(false)
  const deleteHandler = async () => {
    const res = await props.deleteComment(props.comment._id)
    if (res.success) {
      return (
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              Comment deleted
            </p>
          </div>
        ))
      )
    }
    console.log(res.error)
  }

  const confirm = () => {
    return (
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "15px 20px", borderRadius: "35px"}}
        >
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            Delete comment? 
          </p>
          <button onClick={deleteHandler} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            Yes
          </button>
          <button onClick={() => toast.dismiss(t.id)} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            No
          </button>
        </div>
      ))
      
    )
    }

  const updateHandler = async () => {
    setUpdateComment(!updateComment)
  }
  const inputHandler = useRef()
  const sendUpdate = async () => {
    const res = await props.updateComment(
      props.comment._id,
      inputHandler.current.value
    )
    if (res.success) {
      setUpdateComment(!updateComment)
    }
  }

  const inputUpdateComment = (
    <div className="inputUpDate">
      <input
        className="inputComEdit"
        type="text"
        defaultValue={props.comment.content}
        ref={inputHandler}
      ></input>
      <button onClick={sendUpdate}>
        <FiCheck className="ok" />
      </button>
    </div>
  )
  return (
    <div className="commentBox">
      {!updateComment ? (
        <p className="textComment">{`${props.comment.author?.username}: ${props.comment.content}`}</p>
      ) : (
        inputUpdateComment
      )}
      {props.comment.author._id === props.user._id && (
        <div className="buttonsComment">
          <button type="button" onClick={confirm}>
            <FiTrash2 className="delete" />
          </button>
          <button type="button" onClick={updateHandler}>
            <FiEdit2 className="upDate" />
          </button>
        </div>
      )}
      {/* <Toaster 
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,}}
        toastOptions={{
          duration: 1500,
      }}/> */}
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
