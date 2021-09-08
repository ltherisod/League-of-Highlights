import axios from "axios"
import { useEffect, useState } from "react"

// useEffect(() => {
//   const postData = async () => {
//     const res = await axios.get(
//       "http://ddragon.leagueoflegends.com/cdn/11.17.1/data/en_US/profileicon.json"
//     )
//     const keys = Object.keys(res.data.data)
//     keys.forEach((key) => {
//       if (parseInt(key) >= 4000) {
//         axios.post("http://localhost:4000/api/icons", {
//           riotKey: res.data.data[key].id,
//           image: `http://ddragon.leagueoflegends.com/cdn/11.17.1/img/profileicon/${key}.png`,
//         })
//       }
//     })
//   }
//   postData()
// }, [])
// const res = await axios.get(
//   "http://ddragon.leagueoflegends.com/cdn/11.17.1/data/en_US/champion.json"
// )
//   if (champ) {
//     champ.name
//   }

//   champ?.name
// const keys = Object.keys(res.data.data)
// const data = res.data.data
// keys.map((key) =>
//   axios.post("http://localhost:4000/api/champions", {
//     name: data[key].name,
//     title: data[key].title,
//     tags: data[key].tags,
//     riotKey: data[key].key,
//     image: "a",
//   })
// )

// keys.map((key) =>
//   axios.put(`http://localhost:4000/api/champions/${key}`, {
//     avatar: `http://ddragon.leagueoflegends.com/cdn/11.17.1/img/champion/${key}.png`,
//   })
// )

const FormTest = () => {
  const [step, setStep] = useState(1)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    icon: "",
    topChampions: [],
    rank: "",
    division: "",
    guest: "",
  })

  const inputHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }
  const submitHandler = async () => {
    if (step === 2) {
      const res = await axios.get(
        `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${newUser.username}?api_key=RGAPI-d0732bcc-ebfc-4b19-925f-9263198c2b0d`
      )
      const userId = res.data.id
      const res2 = await axios.get(
        `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=RGAPI-d0732bcc-ebfc-4b19-925f-9263198c2b0d`
      )
      const res3 = await axios.get(
        `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${userId}?api_key=RGAPI-d0732bcc-ebfc-4b19-925f-9263198c2b0d`
      )
      setNewUser({
        ...newUser,
        rank: res2.data[1]?.tier,
        division: res2.data[1]?.rank,
        icon: res.data.profileIconId,
        guest: false,
        topChampions: res3.data.slice(0, 3).map((c) => c.championId),
      })
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
      {step === 1 && (
        <div>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            placeholder="name"
          />
          <input
            type="text"
            onChange={inputHandler}
            name="email"
            placeholder="email"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={newUser.password}
            name="password"
            placeholder="password"
          />
          <button type="button" onClick={() => setStep(2)}>
            Continue
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={inputHandler}
            placeholder="Riot username"
          />
          <button type="button" onClick={submitHandler}>
            Register with Riot username
          </button>
          <button type="button" onClick={() => setStep(3)}>
            I don't have Riot account!
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <input type="text" placeholder="Choose Icon" />
          <button onClick={submitHandler}>Register</button>
        </div>
      )}
    </div>
  )
}

export default FormTest
