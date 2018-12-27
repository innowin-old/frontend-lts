import {createSelector} from 'reselect'

const getAllUsers = (state) => {
  let allUsers = state.users.list
  delete allUsers[state.auth.client.organization ? state.auth.client.organization.id : state.auth.client.user.id]
  if (state.users.search)
    return Object.values(allUsers).filter(user => user.profile && (user.profile.content.profile_user.username.includes(state.users.search) || user.profile.content.profile_user.first_name.includes(state.users.search) || user.profile.content.profile_user.last_name.includes(state.users.search)))
  else return allUsers
}

export const getUsers = createSelector(
    getAllUsers,
    user => user
)