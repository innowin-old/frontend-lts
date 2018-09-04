const success = (state, action) => {
	const {data} = action.payload
	return {
		...state,
		list: {
			...state.list,
			[data.id]:{...data},
		}
	}
}

const error = (state, action) => {

}

const base = (state, action) => {

}

const getExchangeByExId = {
  base,
  error,
  success
}

export default getExchangeByExId