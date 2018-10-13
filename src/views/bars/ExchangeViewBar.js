import React, {Component} from "react"
import PropTypes from "prop-types"
import {DefaultExchangeIcon} from "../../images/icons"
import {VerifyWrapper} from "../common/cards/Frames"
import {BadgesCard, TagsBox} from "./SideBar"
import exchangeActions from "src/redux/actions/exchangeActions"
import {getExchange, getExchangeMembers,} from "../../crud/exchange/exchange"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ExchangeIcon} from "src/images/icons"
import {getExchangePostsByPostType, getExchangePostsHasProduct} from "../../crud/post/exchangePost"
import ExchangeMembershipActions from "../../redux/actions/commonActions/exchangeMembershipActions"
import {DefaultUserIcon} from "src/images/icons"


class ExchangeViewBar extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      exchange: {},
      demandCount: 0,
      supplyCount: 0,
      productCount: 0,
      badgesImgUrl: [],
      tags: [],
      members: [],
      membersViewSide: false,
      isLoading: true,
      error: null,
    }
    this.follow = this.follow.bind(this)
  }

  _MockData = () => {
    this._test()
    const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}]
    const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"]
    this.setState({...this.state, tags: tags, badgesImgUrl: badges})
  }

  _getExchange = (exchangeId) => {
    var self = this
    const handleResult = (res) => {
      this.setState({...this.state, exchange: res, loading: true})
      // TODO mohsen: socket.emit of badges
      // TODO mohsen: socket.emit of tags
      getExchangeMembers(exchangeId, (err) => {
      }, (identities) => {
        var members = []
        var j = 0
        //callback hell 201 requests just to get user names and profile Media TODO amir
        // TODO amir: tell backend to fix this mess
        for (var i = 0; i < identities.length; i++) {
          var member = identities[i].exchange_identity_related_identity
          members.push(member) //todo add profile media to identity_user
          j = j + 1
          if (j >= identities.length) {
            self.setState({...self.state, members: members, loading: false})
          }
        }
      })
    }
    getExchange(exchangeId, handleResult)
  }

  _getCounts = (exchangeId) => {
    const handleCountProduct = (res) => this.setState({...this.state, productCount: res.length, isLoading: false})
    const handleCountSupply = (res) => this.setState({...this.state, supplyCount: res.length},
        () => getExchangePostsHasProduct(exchangeId, handleCountProduct))
    const handleCountDemand = (res) => this.setState({...this.state, demandCount: res.length},
        () => getExchangePostsByPostType(exchangeId, "supply", handleCountSupply))
    getExchangePostsByPostType(exchangeId, "demand", handleCountDemand)
  }

  _handleMembersClick = (e) => {
    this.setState({...this.state, membersViewSide: !this.state.membersViewSide})
  }

  follow() {
    this.props.actions.follow({identityId: this.props.currentUserIdentity, exchangeIdentity: this.props.data.id})
  }

  componentDidMount() {
    const {actions, exchangeId} = this.props
    const {getExchangeByExId} = actions
    getExchangeByExId(exchangeId)
    // getExchangeMembersByExId (exchangeId)
    // getExchangeMembershipByExchangeId ({exchangeId})
    // this._getExchange(exchangeId)
    // this._getCounts(exchangeId)
    this._getCounts(exchangeId)
  }

  componentDidUpdate(prevProps) {
    const {exchanges, exchangeId} = this.props
    if (exchanges && exchanges.list && exchanges.list[exchangeId]) {
      // this.setState({...this.state,exchange :exchanges.list[exchangeId]})
    }
  }

  render() {
    const {exchange, badgesImgUrl, demandCount, supplyCount, productCount, tags, members, isLoading, error} = this.state
    const {translate, exchanges, exchangeId} = this.props
    const currentExchange = exchanges.list[exchangeId]
    console.log("CUREX")
    console.log(currentExchange)
    // const currentExchange = exchanges.list[exchangeId].exchange.content
    // let membersView = members.map((val, idx) => (
    //     <div className="" key={idx}>
    //       <span>{val.username || val.name}</span>
    //       <img alt={"."} src={val.profile_media || "#"}> </img>
    //     </div>)
    // )
    if (currentExchange)
      return (
          <VerifyWrapper isLoading={false} error={error}>
            <div className="-sidebar-child-wrapper col">
              <div className="align-items-center flex-column">
                {this.state.membersViewSide ?
                    <i className="fa fa-arrow-left menuBottom" onClick={this._handleMembersClick.bind(this)}> </i>
                    :
                    <i className="fa fa-ellipsis-v menuBottom"> </i>
                }
                {
                  currentExchange.exchange_image !== null ?
                      <img className="rounded-circle exchangeViewBarImg" alt={translate["Exchange Picture"]}
                           src={currentExchange.exchange_image.file}/>
                      :
                      <DefaultUserIcon width={"100px"} height={"100px"}
                                       className={"rounded-circle exchangeViewBarImg"}/>
                }
                <div className="exchangeName">
                  <ExchangeIcon/>
                  <div>
                    <span className="fontSize-15px">{translate["Exchange"]}: </span>
                    <span>{currentExchange.name === "" ? "بدون نام" : currentExchange.name}</span>
                  </div>
                </div>
                <span
                    className="-grey1 fontSize-13px description-right-bar">{currentExchange.description === "" ? "بدون توضیحات" :
                    currentExchange.description}</span>
              </div>
              {/*
               {this.state.membersViewSide ?
               <div className="numbersSection flex-column pl-3">
               <div className="">
               <span>اعضا:</span>
               <span>{currentExchange.members_count}</span>
               </div>
               {membersView}
               </div>
               :
               */}
              <div className="numbersSection flex-column pl-3">
                <div className="">
                  <span>اعضا:</span>
                  <span>{currentExchange.members_count}</span>
                </div>
                <div className="">
                  <span>عرضه:</span>
                  <span>{supplyCount}</span>
                </div>
                <div className="">
                  <span>تقاضا:</span>
                  <span>{demandCount}</span>
                </div>
                <div className="">
                  <span>محصول عرضه شده:</span>
                  <span>{productCount}</span>
                </div>
              </div>

              {
                (badgesImgUrl.length > 0) ? (
                    <div className="flex-wrap pb-3">
                      <BadgesCard badgesImgUrl={badgesImgUrl}/>
                    </div>
                ) : ("")
              }
              {
                (tags.length > 0) ? (
                    <div className="flex-wrap pb-3">
                      <TagsBox tags={tags}/>
                    </div>) : ("")
              }
              <div className="row mr-0 ml-0 pb-3 exchangeViewSidebarBottom flex-wrap justify-content-around">
                <div className="pb-2">
                  <button
                      type="button"
                      className="btn btn-outline-secondary btn-block sidebarBottom">ارسال پیام به کارگزار
                  </button>
                </div>
                {!currentExchange.exchange ? <div className="pb-2">
                  <button
                      type="button"
                      className="btn btn-outline-secondary btn-block sidebarBottom"
                      onClick={this.follow}>درخواست عضویت
                  </button>
                </div> : <div className="pb-2">
                  <button
                      type="button"
                      className="btn btn-outline-secondary btn-block sidebarBottom">عضو شده
                  </button>
                </div>}
              </div>
            </div>

          </VerifyWrapper>
      )
    else return (
        <VerifyWrapper isLoading={true} error={false}/>
    )
  }
}

const StateToProps = (state, props) => ({
  translate: state.intl.messages,
  router: state.router,
  exchanges: state.exchanges,
  currentUserIdentity: state.auth.client.identity.content,
})
const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getExchangeMembershipByExchangeId: ExchangeMembershipActions.getExchangeMembershipByExchangeId,
    getExchangeByExId: exchangeActions.getExchangeByExId,
    follow: exchangeActions.createExchangeMembership,
  }, dispatch)
})

export default connect(StateToProps, DispatchToProps)(ExchangeViewBar)
