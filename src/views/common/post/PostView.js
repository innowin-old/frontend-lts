// @flow
import * as React from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"

import {DefaultUserIcon} from "src/images/icons"
import {CategoryTitle, VerifyWrapper} from "src/views/common/cards/Frames"
import connect from "react-redux/es/connect/connect"
import {getMessages} from "../../../redux/selectors/translateSelector"
import {bindActionCreators} from "redux"
import PostActions from "../../../redux/actions/commonActions/postActions"
import type {postType} from "../../../consts/flowTypes/common/post"
import type {paramType} from "../../../consts/flowTypes/paramType"
import constants from "../../../consts/constants"
import type {identityType} from "../../../consts/flowTypes/user/basicInformation"
import type {fileType} from "../../../consts/flowTypes/common/fileType"
import PostSendIcon from "../../../images/common/postSend_svg"
import FileActions from "../../../redux/actions/commonActions/fileActions"
import CommentActions from "../../../redux/actions/commonActions/commentActions"
import {userCommentsSelector} from "src/redux/selectors/common/comment/postCommentsSelector"
import type {commentType} from "../../../consts/flowTypes/common/comment"
import PostHeader from "./PostHeader"
import PostType from "./PostType"
import PostFooter from "./PostFooter"
import PostComments from "./PostComments"
import {Confirm} from "../cards/Confirm"

type postExtendedViewProps = {
  actions: {
    setPostViewer: Function,
    getPostViewerCount: Function,
    getPost: Function,
    getFile: Function,
    getCommentsByParentId: Function,
    createComment: Function,
    deleteComment: Function,
    deletePost: Function,
  },
  match: {
    params: {
      id: string,
    },
    url: string,
  },
  translate: { [string]: string },
  post: postType,
  postRelatedIdentityImage?: fileType,
  postIdentity: identityType,
  param: paramType,
  userImage?: fileType,
  userImageId: number,
  extendedView: boolean,
  showEdit?: Function,
  comments: Array<commentType>,
  commentParentType: string,
}
type postViewState = {
  menuToggle: boolean,
  confirm: boolean,
}

class PostView extends React.Component<postExtendedViewProps, postViewState> {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postIdentity: PropTypes.object.isRequired,
    param: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    postRelatedIdentityImage: PropTypes.object,
    userImage: PropTypes.object,
    extendedView: PropTypes.bool.isRequired,
    showEdit: PropTypes.func,
    comments: PropTypes.array.isRequired,
  }
  commentTextField: ?HTMLInputElement

  constructor(props) {
    super(props)
    this.state = {menuToggle: false, confirm: false}
    this.commentTextField = null
  }

  componentDidMount() {
    const {extendedView} = this.props
    if (extendedView) {
      const {actions, match} = this.props
      const {params, url} = match
      const {getPost, getPostViewerCount, setPostViewer, getCommentsByParentId} = actions
      const postId = +params.id

      const isUser = !url.includes("org")
      const postOwnerType = isUser ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
      const spliced = url.split("/")
      const postOwnerId = +spliced[2]

      getPost({postId, postOwnerType, postOwnerId})
      setPostViewer(postId, getPostViewerCount)
      getCommentsByParentId({parentId: postId, commentParentType: constants.COMMENT_PARENT.POST})
    }
    else {
      this._getViewerCount()
    }
    document.addEventListener("click", this._handleClickOutMenuBox)
  }

  componentDidUpdate(prevProps) {
    const {userImageId, actions} = this.props
    const {getFile} = actions
    if (!prevProps.userImageId && prevProps.userImageId !== userImageId) {
      getFile(userImageId)
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this._handleClickOutMenuBox)
  }

  openMenu = (e) => {
    e.preventDefault()
    const {post, actions} = this.props
    const {setPostViewer, getPostViewerCount} = actions
    const postId = post.id
    setPostViewer(postId, getPostViewerCount)

    this.setState({...this.state, menuToggle: !this.state.menuToggle})
  }

  _handleClickOutMenuBox = (e: any) => {
    if (!e.target.closest("#sidebar-post-menu-box") && !e.target.closest(".post-menu-bottom")) {
      this.setState({...this.state, menuToggle: false})
    }
  }

  _getViewerCount = () => {
    const {post, actions} = this.props
    const {getPostViewerCount} = actions
    const postId = post.id
    getPostViewerCount(postId)
  }

  createComment = (commentTextField) => {
    if (commentTextField && commentTextField.value) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id}
      createComment({formValues, parentId: post.id, commentParentType})
      commentTextField.value = ""
    }
  }

  replyComment = (comment, commentTextField) => {
    if (commentTextField && commentTextField.value) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id, comment_replied: comment.id}
      createComment({formValues, parentId: post.id, commentParentType})
    }
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _delete = () => {
    const {actions, post} = this.props
    const {deletePost} = actions
    const postParent = post.post_parent
    const postIdentityUserId = post.post_identity.identity_user && post.post_identity.identity_user.id
    const postIdentityOrganId = post.post_identity.identity_organization && post.post_identity.identity_organization.id
    const postParentType = (postParent && postParent.child_name) || null
    const postParentId = (postParent && postParent.id) || null
    const postOwnerId = postIdentityUserId || postIdentityOrganId
    const postOwnerType = postIdentityUserId ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    deletePost({postId: post.id, postOwnerId, postOwnerType, postParentId, postParentType})
  }

  deleteComment = (comment) => {
    const {actions, post, commentParentType} = this.props
    const {deleteComment} = actions
    deleteComment({commentId: comment.id, parentId: post.id, commentParentType})
  }

  render() {
    const {post, translate, postIdentity, postRelatedIdentityImage, userImage, extendedView, showEdit, comments} = this.props
    const {menuToggle, confirm} = this.state
    let postDescription, postPicture
    if (post) {
      postDescription = post.post_description
      postPicture = post.post_picture
    }

    return (
        confirm
            ? <div className={extendedView ? "post-view-container remove-post-container" : "remove-post-container"}>
              <Confirm cancelRemoving={this._cancelConfirm} remove={this._delete}/>
            </div>
            : post ?
            <VerifyWrapper isLoading={false} error={false} className="-itemWrapperPost">
              {extendedView &&
              <CategoryTitle
                  title={translate["Single post"]}
              />
              }
              <div className={extendedView && "post-view-container"}>
                {
                  post.post_type !== constants.POST.POST_TYPE.POST &&
                  <PostType translate={translate} post={post}/>
                }
                <PostHeader post={post} translate={translate} postIdentity={postIdentity}
                            postRelatedIdentityImage={postRelatedIdentityImage} showEdit={showEdit}
                            extendedView={extendedView}/>
                <div className="post-content">
                  {postDescription}
                </div>
                {postPicture ?
                    <div className={"post-image-container"}>
                      <img src={postPicture.file} width={"100%"} alt={"عکس پست"} className={"post-image"}/>
                    </div> : null}
                <PostFooter post={post} postIdentity={postIdentity} translate={translate} extendedView={extendedView}
                            menuToggle={menuToggle} openMenu={this.openMenu}
                            deletePost={this._showConfirm}
                />
                {extendedView &&
                <div className='add-comment'>
                  <div className="-img-col">
                    {!userImage
                        ? (<DefaultUserIcon/>)
                        : (<img className="rounded-circle" src={userImage.file} alt=""/>)
                    }
                  </div>
                  <input className='add-comment-text-field' placeholder={translate["Send comment"]}
                         ref={c => this.commentTextField = c}/>
                  <button onClick={() => this.createComment(this.commentTextField)} className='send-comment pulse'>
                    <PostSendIcon/>
                  </button>
                </div>
                }
                {extendedView && comments.length > 0 &&
                <PostComments comments={comments} translate={translate}
                              replyComment={(comment) => this.replyComment(comment, this.commentTextField)}
                              deleteComment={this.deleteComment}/>
                }
              </div>
            </VerifyWrapper>
            : ""

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {extendedView} = ownProps
  if (extendedView) {
    const {params} = ownProps.match
    const postId = +params.id
    const post = state.common.post.list[postId]
    const postIdentity = post && post.post_identity
    const postImageId = post && post.post_related_identity_image
    const prevUserImageId = (state.auth.organization && state.auth.organization.organization_logo) || state.auth.client.profile.profile_media

    return {
      translate: getMessages(state),
      param: state.param,
      post: post,
      postIdentity: state.identities.list[postIdentity],
      postRelatedIdentityImage: state.common.file.list[postImageId],
      userImageId: prevUserImageId,
      userImage: state.common.file.list[prevUserImageId],
      comments: userCommentsSelector(state, ownProps),
    }
  }
  else {
    const {post} = ownProps
    const postIdentity = post && post.post_identity
    return {
      postIdentity: postIdentity,
      postRelatedIdentityImage: post.post_related_identity_image,
      translate: getMessages(state),
    }
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostViewerCount: PostActions.getPostViewerCount,
    setPostViewer: PostActions.setPostViewer,
    getPost: PostActions.getPost,
    deletePost: PostActions.deletePost,
    getFile: FileActions.getFile,
    getCommentsByParentId: CommentActions.getCommentsByParentId,
    createComment: CommentActions.createComment,
    deleteComment: CommentActions.deleteComment,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostView)
