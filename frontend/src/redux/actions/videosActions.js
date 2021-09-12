import axios from "axios"
const HOST = "https://leagueofhighlights.herokuapp.com"

const videosActions = {
  getTopVideos: () => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(`${HOST}/api/videos`)
        if (!res.data.success) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },

  getUserVideos: (username) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(`${HOST}/api/videos/${username}`)
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "GET_VIDEOS_USER", payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  addVideo: (video) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/videos`, video)
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "ADD_VIDEO", payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  deleteVideo: (videoId, token) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.delete(`${HOST}/api/video/${videoId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "DELETE_VIDEO", payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },

  reportVideo: (videoId, report) => {
    // report = { author: userId, content: 'String' }
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          `${HOST}/api/video/report/${videoId}`,
          report
        )
        if (!res.data.success) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        // el id del usuario que lo reporta y contenido
        return { success: false, response: null, error: e.message }
      }
    } // puede reportar todas las veces pero va  allegar uno, no le avisemos por hijo de puta
  },

  toggleLike: (videoId, userId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/video/like/${videoId}`, {
          userId,
        })
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "TOGGLE_LIKE", payload: { videoId, userId } })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },

  addComment: (videoId, content) => {
    return async (dispatch, getState) => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.put(
          `${HOST}/api/video/comments/${videoId}`,
          { content, type: "createComment" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) {
          dispatch({ type: "ADD_COMMENT", payload: res.data.response })
          return { success: true, response: res.data.response, error: null }
        }
        throw new Error(res.data.error)
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  editComment: (commentId, newContent) => {
    return async (dispatch, getState) => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.put(
          `${HOST}/api/video/comments/${commentId}`,
          { content: newContent, type: "updateComments" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) {
          dispatch({
            type: "UPDATE_COMMENT",
            payload: { ...res.data.response, commentId, newContent },
          })
          return { success: true, response: res.data.response }
        }
        throw new Error(res.data.error)
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  deleteComment: (commentId) => {
    return async (dispatch, getState) => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.put(
          `${HOST}/api/video/comments/${commentId}`,
          { commentId, type: "deleteComment" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) {
          dispatch({
            type: "DELETE_COMMENT",
            payload: { videoId: res.data.response._id, commentId },
          })
          return { success: true, response: res.data.response, error: null }
        }
        throw new Error(res.data.error)
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getReportedVideos: () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`${HOST}/api/video/reports`)
        if (res.data.success) {
          return { success: true, response: res.data.response, error: null }
        }
        throw new Error(res.data.error)
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  dismissVideoReport: (id) => {
    return async (dispatch) => {
      try {
        const res = await axios.put(
          `${HOST}/api/dismiss/video/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (res.data.success) {
          return { success: true, response: res.data.response, error: null }
        }
        throw new Error(res.data.error)
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default videosActions
