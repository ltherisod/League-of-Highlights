import axios from "axios"

const API_KEY = "RGAPI-65efe354-ab45-4796-934a-be85e2d7268d"
const HOST = "http://localhost:4000"

const championsActions = {
  getChampionsRotation: () => {
    return async () => {
      try {
        const championsRotationKeys = await axios.get(
          `https://la2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
        )
        const res = await axios.post(
          `${HOST}/api/championsKeys`,
          { keysArray: championsRotationKeys.data.freeChampionIds }
        )
        if (!res.data.response) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getAllChampions : () => {
    return async () => {
      try {
        const res = await axios.get(`${HOST}/api/champions`)
        if (!res.data.response) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  }
}

export default championsActions
