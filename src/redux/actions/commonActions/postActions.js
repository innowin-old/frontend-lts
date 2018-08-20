import types from './types'

export const filterPostsByPostParentLmitOffset = ({parentId , postType , limit , offset}) => ({
	type: types.POST.FILTER_POSTS_BY_POST_PARENT_LIMIT_OFFSET,
	payload: {parentId , postType , limit , offset}
})