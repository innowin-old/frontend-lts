import constants from "../../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {data, parentId, commentParentType} = action.payload
  const previousPost = state.list[parentId] || {comments: []}
  if (commentParentType === constants.COMMENT_PARENT.POST) {
    const arrayOfCommentId = data.map(comment => comment.id)
    return {
      ...state,
      list: {
        ...state.list,
        [parentId]: {
          ...previousPost,
          // comments: previousPost.comments
          //     ? [...new Set([...previousPost.comments, ...arrayOfCommentId])]
          //     : arrayOfCommentId,
          comments: arrayOfCommentId,
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