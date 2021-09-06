import axios from "axios"

const API_KEY = "RGAPI-2ba7d276-9e93-4067-ba32-9dbe7b8b5072"

const userActions = {
  signUp: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/signup",
          userData
        )
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
    console.log(userData)
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/login",
          userData
        )
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
  loginLS: () => {
    return async (dispatch, getState) => {
      const token = getState().user.user.token
    }
  },
  refresh: (username, userMongoId) => {
    // El userMongoId pensamos sacarlo de la URL y linkearlo de alguna forma al boton que despacha esta acción.
    // validar acá.
    return async (dispatch, getState) => {
      try {
        const accountData = await axios.get(
          `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`
        )
        const { id, profileIconId } = accountData.data
        const rankData = await axios.get(
          `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
        )
        const champs = await axios.get(
          `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${API_KEY}`
        )
        const soloQ =
          rankData.data[0].queueType === "RANKED_SOLO_5x5"
            ? { ...rankData.data[0] }
            : { ...rankData.data[1] }

        const refreshedData = {
          username,
          division: soloQ.rank,
          rankName: soloQ.tier,
          iconKey: profileIconId,
          topChampionsKeys: champs.data.slice(0, 3).map((c) => c.championId),
        }
        const res = await axios.put(
          `http://localhost:4000/api/user/${userMongoId}`,
          refreshedData
        )
        if (!res.data.success) throw new Error(res.data.error)
        // dispatch()
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
}

export default userActions
