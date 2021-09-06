import axios from "axios"

const API_KEY = "RGAPI-a587263e-a3d9-4592-bbbe-e97ff3ab6163"
const HOST = "http://localhost:4000"

const userActions = {
  signUp: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/signup`, userData)
        if (!res.data.success)
          return { success: false, response: null, error: res.data.error }
        localStorage.setItem("token", res.data.response.token)
        dispatch({ type: "LOG_INTO_SYSTEM", payload: res.data.response }) // Agregar type
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  logIn: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/login`, userData)
        if (!res.data.success)
          return { success: false, response: null, error: res.data.error }
        localStorage.setItem("token", res.data.response.token)
        dispatch({ type: "LOG_INTO_SYSTEM", payload: res.data.response }) // "Agregar type" <- lo puse porque lo pusiste vos xd
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  loginLS: (token) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(`${HOST}/api/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.data.success) {
          localStorage.removeItem("token")
          throw new Error(res.data.error)
        }
        dispatch({ type: "LOG_INTO_SYSTEM", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  refresh: (username, userMongoId, isGuest) => {
    // El userMongoId pensamos sacarlo de la URL y linkearlo de alguna forma al boton que despacha esta acción.
    // validar acá.
    return async (dispatch, getState) => {
      try {
        const accountData = await axios.get(
          `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`
        )
        console.log(accountData)
        const { id, profileIconId } = accountData.data
        const rankData = await axios.get(
          `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
        )
        const champs = await axios.get(
          `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${API_KEY}`
        )
        let soloQ =
          rankData.data[0]?.queueType === "RANKED_SOLO_5x5"
            ? { ...rankData.data[0] }
            : { ...rankData.data[1] }
        if (!Object.keys(soloQ).length) {
          soloQ = { tier: "UNRANKED", rank: "" }
        }
        const refreshedData = {
          username,
          division: soloQ.rank,
          rankName: soloQ.tier,
          iconKey: profileIconId,
          topChampionsKeys: champs.data.slice(0, 3).map((c) => c.championId),
          guest: isGuest,
        }
        const res = await axios.put(
          `${HOST}/api/user/${userMongoId}`,
          refreshedData
        )
        console.log("Me llegó la respuesta")
        if (!res.data.success) throw new Error(res.data.error)
        // dispatch()
        console.log("Voy a responder al componente sin errores.")
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  getProfile: (id) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(`${HOST}/api/user/${id}`)
        if (!res.data.success) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default userActions
