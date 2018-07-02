import {SOCKET,REST_URL} from "./URLS"
import {REST_REQUEST} from "./Events"
import client from './client'
import {eventChannel} from 'redux-saga'

let token = client.getToken()

const createSocketChannel = (resultName) => {
	return eventChannel(emit => {
		const resultHandler = res => { emit(res)}
		SOCKET.on(resultName,resultHandler)
		return () =>	SOCKET.off(resultName,resultHandler)
	})
}

const query = (url, resultName, query = "") => {
	return new Promise((resolve,reject)=>{
		SOCKET.emit(REST_REQUEST, {
			method: 'get',
			url: REST_URL + '/' + url+'/'+ query,
			result: resultName,
			token
		})
		SOCKET.on(resultName,(res)=>{
			if(res.detail){
				reject(res)
			}
			resolve(res)
		})
	})
}

const get = (url , resultName) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL + '/' + url+'/',
		result: resultName,
		token
	})
}

const post = (url , resultName ,data) => {
	SOCKET.emit(REST_REQUEST, {
		method: 'post',
		url: REST_URL+'/'+url+'/',
		result: resultName,
		data,
		token
	})
}

const api = {
	createSocketChannel,
	get,
	post,
	query
}
export default api