// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {FrameCard, CategoryTitle, VerifyWrapper, ListGroup} from "src/views/common/cards/Frames"
import {ProfileInfoEditForm, UserInfoEditForm, ResearchInfoEditForm, EducationInfoEditForm} from "./Forms"
import {UserInfoItemWrapper, UserInfoView, ProfileInfoView, ResearchInfoView, EducationInfoView} from "./Views"
import {getUserResearches} from "src/crud/user/research"
import {getUserEducations} from "src/crud/user/education"
import {userInfoIcon, researchIcon, educationIcon} from "src/images/icons"
import {getUser} from "src/crud/user/user"
import {getProfile} from "src/crud/user/profile"
import {
  userType,
  userProfileType,
  userEducationType,
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"


//UserInfo flowTypes
type UserInfoProps = {
  userId: number,
  translate: {}
}
type UserInfoState = {
  user: userType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class UserInfo extends React.Component<UserInfoProps, UserInfoState> {

  constructor(props: UserInfoProps) {
    super(props)
    this.state = {user: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userType): void => {
    this.setState({...this.state, user: res, isLoading: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, (): void => {
        getUser(userId, (res: userType): void =>
          this.setState({...this.state, user: res, isLoading: false})
        )
      }
    )
  }

  render() {
    const {translate} = this.props
    const {user, edit, isLoading, error} = this.state
    return (

      <VerifyWrapper isLoading={isLoading} error={error}>

        {
          (edit) ? (
            <UserInfoItemWrapper icon={userInfoIcon}>
              <UserInfoEditForm
                user={user}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <UserInfoView user={user} translate={translate} showEdit={this._showEdit}/>
          )
        }
      </VerifyWrapper>
    )
  }
}


//ProfileInfo flowTypes
type ProfileInfoProps = {
  userId: number,
  translate: {}
}
type ProfileInfoState = {
  profile: userProfileType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class ProfileInfo extends React.Component<ProfileInfoProps, ProfileInfoState> {
  constructor(props: ProfileInfoProps) {
    super(props)
    this.state = {profile: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userProfileType): void => {
    this.setState({...this.state, profile: res, isLoading: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, (): void => {
      getProfile(userId, (res: userProfileType): void => this.setState({...this.state, profile: res, isLoading: false}))
    })
  }

  render() {
    const {translate} = this.props
    const {profile, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={userInfoIcon}>
              <ProfileInfoEditForm
                profile={profile}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <ProfileInfoView profile={profile} showEdit={this._showEdit} translate={translate}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


//EducationInfo flowTypes

type EducationInfoProps = {
  education: userEducationType,
  translate: {}
}
type EducationInfoState = {
  education: userEducationType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class EducationInfo extends React.Component<EducationInfoProps, EducationInfoState> {
  constructor(props: EducationInfoProps) {
    super(props)
    this.state = {education: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userEducationType, error: boolean, isLoading: boolean): void => {
    this.setState({...this.state, education: res, error: error, isLoading: isLoading})
  }

  componentDidMount() {
    this.setState({...this.state, education: this.props.education})
  }

  render() {
    const {translate} = this.props
    const {education, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={educationIcon}>
              <EducationInfoEditForm
                education={education}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <EducationInfoView education={education} showEdit={this._showEdit} translate={translate}/>
          )
        }
      </VerifyWrapper>
    )
  }
}


//EducationsInfo flowTypes
type EducationsInfoProps = {
  userId: number,
  translate: {}
}
type EducationsInfoState = {
  educations: (userEducationType)[],
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class EducationsInfo extends React.Component<EducationsInfoProps, EducationsInfoState> {
  constructor(props: EducationsInfoProps) {
    super(props)
    this.state = {educations: [], error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, (): void => {
      getUserEducations(userId, (res: (userEducationType)[]): void => {
        this.setState({...this.state, educations: res, isLoading: false})
      })
    })
  }

  render() {
    const {translate} = this.props
    const {educations} = this.state
    const Educations = educations.map((education, index) => {
      return <EducationInfo education={education} key={index + "EducationsInfo"} translate={translate}/>
    })
    return (
      <div>
        {Educations}
      </div>
    )
  }
}


//ResearchInfo flowTypes
type ResearchInfoProps = {
  research: userResearchType,
  translate: {}
}
type ResearchInfoState = {
  research: userResearchType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class ResearchInfo extends React.Component<ResearchInfoProps, ResearchInfoState> {
  constructor(props: ResearchInfoProps) {
    super(props)
    this.state = {research: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userResearchType, error: boolean, isLoading: boolean): void => {
    this.setState({...this.state, research: res, error: error, isLoading: isLoading})
  }

  componentDidMount() {
    this.setState({...this.state, research: this.props.research})
  }


  render() {
    const {translate} = this.props
    const {research, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          (edit) ? (
            <UserInfoItemWrapper icon={researchIcon}>
              <ResearchInfoEditForm
                research={research}
                hideEdit={this._hideEdit}
                updateStateForView={this._updateStateForView}
                translate={translate}
              />
            </UserInfoItemWrapper>
          ) : (
            <ResearchInfoView research={research} showEdit={this._showEdit} translate={translate}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


//ResearchesInfo flowTypes
type ResearchesInfoProps = {
  userId: number,
  translate: {}
}
type ResearchesInfoState = {
  researches: (userResearchType)[],
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class ResearchesInfo extends React.Component<ResearchesInfoProps, ResearchesInfoState> {
  constructor(props: ResearchesInfoProps) {
    super(props)
    this.state = {researches: [], error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = (): void => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = (): void => {
    this.setState({...this.state, edit: false})
  }

  componentDidMount() {
    const {userId} = this.props
    this.setState({...this.state, isLoading: true}, (): void => {
      getUserResearches(userId, (res: (userResearchType)[]): void => {
        this.setState({...this.state, researches: res, isLoading: false})
      })
    })
  }

  render() {
    const {translate} = this.props
    const {researches} = this.state
    const Researches = researches.map((research, index) => {
      return <ResearchInfo research={research} key={index + "ResearchesInfo"} translate={translate}/>
    })
    return (
      <div>
        {Researches}
      </div>
    )
  }
}


//UserBasicInformation flowTypes
type UserBasicInformationProps = {
  userId: number,
  translate: { [string]: string }
}

export class UserBasicInformation extends React.Component<UserBasicInformationProps> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
  }

  render() {
    const {userId, translate} = this.props
    return (
      <div>
        <CategoryTitle
          title={translate['Basic information']}
        />
        <FrameCard>
          <ListGroup>
            <UserInfo {...{userId}} translate={translate}/>
            <ProfileInfo {...{userId}} translate={translate}/>
            <EducationsInfo {...{userId}} translate={translate}/>
            <ResearchesInfo {...{userId}} translate={translate}/>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

const mapStateToProps = state => ({translate: getMessages(state)})
export default connect(
  mapStateToProps
)(UserBasicInformation)

