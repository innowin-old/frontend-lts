// @flow
import * as React from "react"
import {Component} from "react"
import TopBar from "../bars/TopBar"
import ChatBar from "../bars/ChatBar"
import PropTypes from "prop-types"
import ExchangeViewBar from "../bars/ExchangeViewBar"
import ExchangePosts from "./ExchangeView/posts/index"
import Exchange_Tabs from "./ExchangeView/Exchange_Tabs"
import {bindActionCreators} from "redux"
import ExchangeMembershipActions from "../../redux/actions/commonActions/exchangeMembershipActions"
import exchangeActions from "../../redux/actions/exchangeActions"
import connect from "react-redux/es/connect/connect"
import postActions from "../../redux/actions/commonActions/postActions"
import {Helmet} from "react-helmet"
import constants from "../../consts/constants"
import {getMessages} from "../../redux/selectors/translateSelector"

type PropsExchangeView = {|
  match: { params: Object },
  handleSignOut: Function,
  actions: any,
|}

class ExchangeView extends Component <PropsExchangeView> {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    let exchangeId = +parseInt(this.props.match.params.id, 10)
    const {actions} = this.props
    actions.getExchangeByExId(exchangeId)
    actions.getPostsByExIdLimitOffset({postParentId: exchangeId, limit: 20, offset: 0})
  }

  render() {
    // const {translate} = this.props
    const {params} = this.props.match
    const exchangeId = +params.id
    const widthOfRightBar = "col-md-2 col-sm-1"
    // const title = `${translate['InnoWin']} - ${translate['Exchange']}`
    // const description = `${translate['Exchange']}`
    return (
        <div className='all-exchanges-parent'>
          {/*<TopBar collapseClassName={widthOfRightBar}/>*/}
          {/*
           <Helmet>
           <title>{title}</title>
           <meta name="description" content={description}/>

           <meta property="og:title" content={title}/>
           <meta property="og:description" content={description}/>

           <meta property="twitter:title" content={title}/>
           <meta property="twitter:description" content={description}/>
           </Helmet>
           */}
          <main className={"exchange-page"}>
            <div className={`exchange-view-sidebar`}>
              <ExchangeViewBar exchangeId={exchangeId}/>
            </div>
            <Exchange_Tabs exchangeId={exchangeId}/>
          </main>
        </div>
    )
  }
}

const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeByExId: exchangeActions.getExchangeByExId,
    getPostsByExIdLimitOffset: postActions.filterPostsByPostParentLimitOffset,

    // editExchange: exchangeActions.editExchange,
    // deleteExchange: exchangeActions.deleteExchange,
    // getAllExchanges: exchangeActions.getAllExchanges,
    // follow: ExchangeMembershipActions.createExchangeMembership,
    // unFollow: ExchangeMembershipActions.deleteExchangeMembership,
    // getExchangeMembershipByExchangeId: ExchangeMembershipActions.getExchangeMembershipByExchangeId,
    // getExchangeMembershipByMemberIdentity: ExchangeMembershipActions.getExchangeMembershipByMemberIdentity,
  }, dispatch)
})

// const mapStateToProps = state => {
//   return {
//     translate: getMessages(state),
//   }
// }

export default connect(null, DispatchToProps)(ExchangeView)