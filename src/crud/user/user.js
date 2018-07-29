import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN} from "src/consts/data"

export const getUser = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/${userId}/`,
      result: `/users/{id}/-get/getUser/${userId}`,
      token: TOKEN,
    }
  )

  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
    socket.off(`/users/{id}/-get/getUser/${userId}`, func)
  }
  socket.on(`/users/{id}/-get/getUser/${userId}`, func)
}

export const createUser = (data, handleLogin, handleError) => {
  const {username, password, email} = data
  socket.emit(REST_REQUEST, {
    method: 'post',
    url: `${url}/users/`,
    result: 'CREATE_USER',
    data: {
      username,
      password,
      email
    }
  })
  const func = (res) => {
    if (res.id) {
      apiTokenAuth(data)
      handleLogin()
    } else {
      handleError(res)
    }
    socket.off('CREATE_USER', func)
  }
  socket.on('CREATE_USER', func)
}

export const createUserOrgan = (data, handleLogin, handleError) => {
  const {username, password, email} = data
  socket.emit(REST_REQUEST, {
    method: 'post',
    url: `${url}/users/user-organization/`,
    result: 'createUserOrgan',
    data: {
      username,
      password,
      email,
      "organization.username": username,
      "organization.email": email,
      "organization.official_name": `${username}_official`,
    }
  })
  const func = (res) => {
    if (res.id) {
      apiTokenAuth(data)
      handleLogin()
    }else{
      handleError(res)
    }
    socket.off('createUserOrgan', func)
  }
  socket.on('createUserOrgan', func)
}

export const updateUser = (formValues, userId, updateStateForView, hideEdit) => {
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/${userId}/`,
      result: `updateUser-patch-${userId}`,
      token: TOKEN,
      data: {
        "username": formValues.username,
        "first_name": formValues.first_name,
        "last_name": formValues.last_name,
        "email": formValues.email,
      }
    })
  const func = (res) => {
    if (res.detail) {
      return false
    }
    updateStateForView(res)
    hideEdit()
    socket.off(`updateUser-patch-${userId}`, func)
  }
  socket.on(`updateUser-patch-${userId}`, func)
}

export const apiTokenAuth = (data) => {
  const {username, password} = data
  socket.emit(REST_REQUEST, {
    method: "post",
    url: url + "/api-token-auth/",
    result: "apiTokenAuth",
    data: {
      username,
      password
    }
  })
}