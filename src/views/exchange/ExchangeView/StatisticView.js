import * as React from "react"
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts"
import {PureComponent} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {QuestionMark, OffersSvg, DemandIcon, SupplyIcon, Stream} from "src/images/icons"

const data = [
  {name: "آبان", ["عرضه"]: 40, ["تقاضا"]: 85, ["اعضا"]: 45},
  {name: "مهر", ["عرضه"]: 55, ["تقاضا"]: 40, ["اعضا"]: 52},
  {name: "شهریور", ["عرضه"]: 50, ["تقاضا"]: 37, ["اعضا"]: 60},
  {name: "مرداد", ["عرضه"]: 47, ["تقاضا"]: 25, ["اعضا"]: 55},
  {name: "تیر", ["عرضه"]: 40, ["تقاضا"]: 35, ["اعضا"]: 50},
  {name: "خرداد", ["عرضه"]: 55, ["تقاضا"]: 40, ["اعضا"]: 60},
  {name: "اردیبهشت", ["عرضه"]: 62, ["تقاضا"]: 42, ["اعضا"]: 65},
  {name: "فروردین", ["عرضه"]: 73, ["تقاضا"]: 89, ["اعضا"]: 70},
]

class StatisticView extends PureComponent {
  render() {
    const {translate} = this.props
    return (
        <div className={"statistics-container"}>
          <div className={"statistics-bodies"}>
            <div className={"statistics-header"}>
              <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}
                            containerClass={"svg-container-info-view"}/>
              <span>
                {translate["Activity Report"]}
              </span>
            </div>
            <div className={"statistics-content"}>

              <div className={"statistics-numbers-frame"}>
                <span style={{paddingTop: "4px"}}>
                  <SupplyIcon className={"svg-info-view"} height={"22px"} width={"22px"}/>
                </span>
                <span>
                  <div className={"statistics-number"}> 1372 </div>
                  <div className={"statistics-inactive-text"}> تعداد کل عرضه </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span>
                  <DemandIcon className={"svg-info-view"} height={"28px"} width={"28px"}/>
                </span>
                <span>
                  <div className={"statistics-number"}> 1372 </div>
                  <div className={"statistics-inactive-text"}> تعداد کل تقاضا </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span style={{paddingTop: "3.5px"}}>
                  <Stream svgClass={"svg-info-view"} width="20px" height="20px"/>
                </span>
                <span>
                  <div className={"statistics-number"}> 1372 </div>
                  <div className={"statistics-inactive-text"}> تعداد کل پست ها </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span style={{paddingTop: "1px"}}>
                <OffersSvg svgClass={"svg-info-view"} width="22px" height="22px"/>
                </span>
                <span>
                  <div className={"statistics-number"}> 1372 </div>
                  <div className={"statistics-inactive-text"}> تعداد کل پیشنهاده </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span style={{paddingTop: "4px"}}>
                  <SupplyIcon className={"svg-info-view"} height={"22px"} width={"22px"}/>
                </span>
                <span>
                  <div className={"statistics-number"}> 12 </div>
                  <div className={"statistics-inactive-text"}> پیشنهاد بر عرضه </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span>
                  <DemandIcon className={"svg-info-view"} height={"28px"} width={"28px"}/>
                </span>
                <span>
                  <div className={"statistics-number"}> 8 </div>
                  <div className={"statistics-inactive-text"}> پیشنهاد بر تقاضا </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame"}>
                <span style={{paddingTop: "3.5px"}}>
                  <Stream svgClass={"svg-info-view"} width="20px" height="20px"/>
                </span>
                <span>
                  <div className={"statistics-number"}> 16 </div>
                  <div className={"statistics-inactive-text"}> میانگین نظرات هر پست </div>
                </span>
              </div>

              <div className={"statistics-numbers-frame-off"}/>

            </div>
          </div>
          <div className={"statistics-bodies"}>
            <div className={"statistics-header"}>
              <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}
                            containerClass={"svg-container-info-view"}/>
              <span>
                {translate["Activity Chart"]}
              </span>
            </div>
            <div className={"statistics-chart"}>
              <AreaChart width={620} height={300} data={data}
                         margin={{top: 15, right: 119, left: 10, bottom: 10}}>
                <defs>
                  <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="pink" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="pink" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="yellow" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="yellow" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8c968c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8c968c" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 100"/>
                <XAxis dataKey="name"/>
                {/*<YAxis dataKey={null}/>*/}
                <Tooltip/>
                <Area type='linear' dataKey='عرضه' stackId="3" stroke='#253545' fill='url(#color1)' fillOpacity={0.9}/>
                <Area type='linear' dataKey='تقاضا' stackId="2" stroke='#42ac97' fill='url(#color2)' fillOpacity={0.9}/>
                <Area type='linear' dataKey='اعضا' stackId="1" stroke='#8c968c' fill='url(#color3)' fillOpacity={0.9}/>
              </AreaChart>
            </div>
            <div className={"statistics-footer"}>
              <span className={"primary-color"}>عرضه</span>
              <span className={"secondary-color"}>تقاضا</span>
              <span className={"disable-color"}>اعضا</span>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getMessages(state),
    clientIdentityId: state.auth.client.identity.content,
    // clientType: state.auth.client.user_type,
    // clientId: state.auth.client.user.id,
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators({
//   }, dispatch)
// })
export default connect(mapStateToProps, null)(StatisticView)