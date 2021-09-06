import axios from "axios"

const API_KEY = "RGAPI-a587263e-a3d9-4592-bbbe-e97ff3ab6163"
const HOST = "http://localhost:4000"

const championsActions = {
  getChampionsRotation: () => {
    return async () => {
      try {
        const championsRotationKeys = await axios.get(
          `https://la2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`
        )
        const res = await axios.post(
          "http://localhost:4000/api/championsKeys",
          { keysArray: championsRotationKeys.data.freeChampionIds }
        )
        if (!res.data.response) throw new Error(res.data.error)
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default championsActions
