import axios from `axios`

const HOST = "http://localhost:4000"

const videosActions = {

	getTopVideos: () => {
		return async (dispatch, getState) => {
			try {
				const response = axios.get(`${HOST}/api/videos`)
				if(!response.data.success) throw new Error()
 			
			}catch(e){ //nnada aqui despachar a la home

			}
		}	
	},

	getUserVideos: () => {
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.get(`${HOST}/api/videos/:username`)
			}catch(e){ // nombre de usuario por parametro, que viene por params

			}
		}	
	},

	addVideo: () => {
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.post(`${HOST}/api/videos`)
			}catch(e){ // obj mandar

			}
		}	
	},

	updateVideo: () =>{
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.put(`${HOST}/api/video/:videoId`)
			}catch(e){ // viene un objeto. 

			}
		}	
	},

	deleteVideo: () => {
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.delete(`${HOST}/api/video/:videoId`)
			}catch(e){ // por parametro el id del video que viene del video <- pasar el token

			}
		}	
	},
	
	reportVideo: () =>{
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.post(`${HOST}/api/video/report/:videoId`)
			}catch(e){ // el id del usuario que lo reporta y contenido

			}
		}	// puede reportar todas las veces pero va  allegar uno, no le avisemos por hijo de puta
	},

	toggleLike: () =>{
		return async (dispatch, getState) => {
			try {
				const topVideos = axios.post(`${HOST}/api/video/like/:videoId`)
			}catch(e){ // videoid params, por body userId

			}
		}	
	}


}



// addVideo  necesitamos el nombre del campeon, la persona que lo publica, el titulo que le pone
// tenemos que pasarle el id del usuario, 



