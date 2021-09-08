import axios from "axios"
const HOST = "http://localhost:4000"

const videosActions = {
  getTopVideos: () => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(`${HOST}/api/videos`)
        console.log(res)
        if (!res.data.success) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        //nnada aqui despachar a la home
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
        // nombre de usuario por parametro, que viene por params
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
        // obj mandar
        return { success: false, response: null, error: e.message }
      }
    }
  },

  updateVideo: () => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(`${HOST}/api/video/:videoId`)
        if (!res.data.success) throw new Error(res.data.error)
      } catch (e) {
        // viene un objeto.
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
        // por parametro el id del video que viene del video <- pasar el token
        return { success: false, response: null, error: e.message }
      }
    }
  },

  reportVideo: (videoId, report) => {
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

  toggleLike: (videoId, userLike) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          `${HOST}/api/video/like/${videoId}`,
          userLike
        )
        if (!res.data.success) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        // videoid params, por body userId
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default videosActions
