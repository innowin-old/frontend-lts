const SUCCESS = {
  USERNAME_CHECK: "USERNAME_CHECK_SUCCESS",
  EMAIL_CHECK: "EMAIL_CHECK_SUCCESS",
  CREATE_USER_PERSON: "CREATE_USER_PERSON_SUCCESS",
  CREATE_USER_ORGAN: "CREATE_USER_ORGAN_SUCCESS",
  GET_USER_BY_USER_ID: "GET_USER_BY_USER_ID_SUCCESS",
  GET_PROFILE_BY_USER_ID: "GET_PROFILE_BY_USER_ID_SUCCESS",
  GET_EDUCATIONS_BY_USER_ID: "GET_EDUCATIONS_BY_USER_ID_SUCCESS",
  GET_USER_IDENTITY: "GET_USER_IDENTITY_SUCCESS",
  UPDATE_USER_BY_USER_ID: "UPDATE_USER_BY_USER_ID_SUCCESS",
  UPDATE_PROFILE_BY_PROFILE_ID: "UPDATE_PROFILE_BY_PROFILE_ID_SUCCESS",
  SET_PROFILE_MEDIA: 'SET_PROFILE_MEDIA_SUCCESS',
  GET_USERS: "GET_USERS_SUCCESS",
  GET_ALL_USERS: "GET_ALL_USERS_SUCCESS",
  PASSWORD_RESET_BY_SMS_REQUEST: 'PASSWORD_RESET_BY_SMS_REQUEST_SUCCESS',
  PASSWORD_RESET_BY_SMS_CHECK_CODE: 'PASSWORD_RESET_BY_SMS_CHECK_CODE_SUCCESS',
  PASSWORD_RESET_BY_SMS: 'PASSWORD_RESET_BY_SMS_SUCCESS',
  PASSWORD_RECOVERY_BY_EMAIL: 'PASSWORD_RECOVERY_BY_EMAIL_SUCCESS',
  SEARCH_USER: 'SEARCH_USER_SUCCESS',
}

const ERROR = {
  USERNAME_CHECK: "USERNAME_CHECK_ERROR",
  EMAIL_CHECK: "EMAIL_CHECK_ERROR",
  CREATE_USER_PERSON: "CREATE_USER_PERSON_ERROR",
  CREATE_USER_ORGAN: "CREATE_USER_ORGAN_ERROR",
  GET_USER_BY_USER_ID: "GET_USER_BY_USER_ID_ERROR",
  GET_PROFILE_BY_USER_ID: "GET_PROFILE_BY_USER_ID_ERROR",
  GET_EDUCATIONS_BY_USER_ID: "GET_EDUCATIONS_BY_USER_ID_ERROR",
  GET_USER_IDENTITY: "GET_USER_IDENTITY_ERROR",
  UPDATE_USER_BY_USER_ID: "UPDATE_USER_BY_USER_ID_ERROR",
  UPDATE_PROFILE_BY_PROFILE_ID: "UPDATE_PROFILE_BY_PROFILE_ID_ERROR",
  GET_USERS: 'GET_USERS_ERROR',
  GET_ALL_USERS: "GET_ALL_USERS_ERROR",
  PASSWORD_RESET_BY_SMS_REQUEST: 'PASSWORD_RESET_BY_SMS_REQUEST_ERROR',
  PASSWORD_RESET_BY_SMS_CHECK_CODE: 'PASSWORD_RESET_BY_SMS_CHECK_CODE_ERROR',
  PASSWORD_RESET_BY_SMS: 'PASSWORD_RESET_BY_SMS_ERROR',
  PASSWORD_RECOVERY_BY_EMAIL: 'PASSWORD_RECOVERY_BY_EMAIL_ERROR',
  SEARCH_USER: 'SEARCH_USER_ERROR',
}

const BASE = {
  USERNAME_CHECK: "USERNAME_CHECK",
  EMAIL_CHECK: "EMAIL_CHECK",
  CREATE_USER_PERSON: "CREATE_USER_PERSON",
  CREATE_USER_ORGAN: "CREATE_USER_ORGAN",
  GET_USER_BY_USER_ID: "GET_USER_BY_USER_ID",
  GET_PROFILE_BY_USER_ID: "GET_PROFILE_BY_USER_ID",
  GET_EDUCATIONS_BY_USER_ID: "GET_EDUCATIONS_BY_USER_ID",
  GET_USER_IDENTITY: "GET_USER_IDENTITY",
  UPDATE_USER_BY_USER_ID: "UPDATE_USER_BY_USER_ID",
  UPDATE_PROFILE_BY_PROFILE_ID: "UPDATE_PROFILE_BY_PROFILE_ID",
  SET_PROFILE_MEDIA: 'SET_PROFILE_MEDIA',
  GET_USERS: 'GET_USERS',
  GET_ALL_USERS: 'GET_ALL_USERS',
  ADD_SKILL_ID_TO_USER: 'USER@ADD_SKILL_ID_TO_USER_REQUEST',
  PASSWORD_RESET_BY_SMS_REQUEST: 'PASSWORD_RESET_BY_SMS_REQUEST',
  PASSWORD_RESET_BY_SMS_CHECK_CODE: 'PASSWORD_RESET_BY_SMS_CHECK_CODE',
  PASSWORD_RESET_BY_SMS: 'PASSWORD_RESET_BY_SMS',
  RESET_RECOVERY_PASSWORD_REDUX_STATE: 'RESET_RECOVERY_PASSWORD_REDUX_STATE',
  PASSWORD_RECOVERY_BY_EMAIL: 'PASSWORD_RECOVERY_BY_EMAIL',
  SEARCH_USER: 'SEARCH_USER',
  RESET_SEARCH_USER: 'RESET_SEARCH_USER'
}


export default {
  SUCCESS,
  ERROR,
  BASE
}