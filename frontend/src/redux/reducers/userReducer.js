const userReducer= (state = {user: null}, 
action) => {
	switch(action.type){
		case 'SING_UP':
			return{

			}
		case 'LOG_IN':
			return{

			}
			
		default:
			return state	
	}
}

export default userReducer