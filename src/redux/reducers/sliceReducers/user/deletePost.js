import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {postOwnerId, postOwnerType, postId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousPost = (state.list[postOwnerId] && state.list[postOwnerId].posts) || defaultObject2

  if (postOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedPosts = previousPost.content.filter(id => id !== postId);
    return {
      ...state,
      list: {
        ...state.list,
        [postOwnerId]: {
          ...state.list[postOwnerId],
          posts: {
            ...previousPost,
            content: [...newDeletedPosts],
            isLoading: false,
            error: null
          }
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}