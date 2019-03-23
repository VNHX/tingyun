//报表
import actions from "actions";
import "pages/Application/bb.css";
import Header from "pages/functionalCom/Header.js";
import myAjax from "pages/functionalCom/myAjax.js";
import React, { Component } from "react";
import { connect } from "react-redux";
const ajax = myAjax.myAjax;
class Bb extends Component {
  componentWillMount() {
    this.props.willMount();
  }
  componentDidMount() {
    this.props.init();
  }

  render() {
    let {
      bb_tab_flag = "swbb",
      bb_body1,
      bb_body2,
      bb_body3,
      bb_body4,
      shuju,
      sj
    } = this.props;
    return (
      <div className="bb" id="bb">
        <Header headerFlag={false} optionData={"more"} />
        <div className="bb_tab">
          <span
            className={bb_tab_flag == "swbb" ? "active" : ""}
            onClick={() => bb_body1()}
          >
            事务报表
          </span>
          {/* <span className={bb_tab_flag=='gjswbb'? 'active':''} onClick={()=>bb_body2()}>关键事务报表</span> */}
          <span
            className={bb_tab_flag == "sjkbb" ? "active" : ""}
            onClick={() => bb_body3()}
          >
            数据库报表
          </span>
          <span
            className={bb_tab_flag == "nosql" ? "active" : ""}
            onClick={() => bb_body4()}
          >
            NoSQL报表
          </span>
        </div>
        <div className="bb_body">
          <div className="bb_body1_header">
            <span>实例名称:</span>
            <select>
              <option>所有实例</option>
              <option>ucd-ty-app-demo-1:18080</option>
              <option>dell-goruntime:8080</option>
              <option>10.10.46.144:8080</option>
            </select>
            <span>时间: </span>
            <span>
              <input type="checkbox" />
              今天
            </span>
            <span>
              <input type="checkbox" />
              昨天
            </span>
            <span>
              <input type="checkbox" />
              一周
            </span>
          </div>
          {bb_tab_flag &&
            bb_tab_flag == "swbb" &&
            shuju &&
            shuju.map((value, i) => {
              return (
                <div className="bb_body1">
                  <div style={{ height: "50px" }} />
                  <div className="clk">
                    <span style={{ width: "15%" }}>事务</span>
                    <span style={{ width: "10%" }}>时间</span>
                    <span style={{ width: "10%" }}>平均响应时间</span>
                    <span style={{ width: "10%" }}>最长响应时间</span>
                    <span style={{ width: "10%" }}>最短响应时间</span>
                    <span style={{ width: "10%" }}>吞吐率</span>
                    <span style={{ width: "10%" }}>错误率</span>
                    <span style={{ width: "10%" }}>次数</span>
                    <span style={{ width: "10%" }}>Apdex</span>
                  </div>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr key={i}>
                        <td rowSpan="4">{value.transactionUrl}</td>
                      </tr>
                      <tr>
                        {value.list.map((value, i) => {
                          console.log(i, "s");
                          return (
                            <tr key={i}>
                              <td style={{ width: "10%" }}>{value.timeType}</td>
                              <td style={{ width: "10%" }}>
                                {value.avgResponseTime}
                              </td>
                              <td style={{ width: "10%" }}>
                                {value.maxResponseTime}
                              </td>
                              <td style={{ width: "10%" }}>
                                {value.minResponseTime}
                              </td>
                              <td style={{ width: "10%" }}>
                                {value.statisticsSectionTime}
                              </td>
                              <td style={{ width: "10%" }}>
                                {value.statisticsTime}
                              </td>
                              <td style={{ width: "10%" }}>
                                {value.invokeCount}
                              </td>
                              <td style={{ width: "10%" }}>{value.apdex}</td>
                            </tr>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          {bb_tab_flag && bb_tab_flag == "gjswbb" && (
            <div className="bb_body2">
              <div style={{ height: "50px" }} />
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>关键事务</th>
                    <th>时间</th>
                    <th>平均响应时间</th>
                    <th>最长响应时间</th>
                    <th>吞吐率</th>
                    <th>错误率</th>
                    <th>不满意次数</th>
                    <th>Apdex</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="4">JSP/index.jsp</td>
                    <td>今日</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>昨日</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>7日内</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>7日前</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {bb_tab_flag &&
            bb_tab_flag == "sjkbb" &&
            sj &&
            sj.map((val, k) => {
              return (
                <div className="bb_body3">
                  <div style={{ height: "50px" }} />
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>数据库</th>
                        <th>时间</th>
                        <th>平均响应时间</th>
                        <th>最长响应时间</th>
                        <th>吞吐率</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={k}>
                        <td rowSpan="4">{val.rpcWithSqlMsg}</td>
                      </tr>
                      {val.list.map((val, k) => {
                        return (
                          <tr key={k}>
                            <td>{val.timeType}</td>
                            <td>{val.statisticsSectionTime}</td>
                            <td>{val.statisticsTime}</td>
                            <td>{val.throughput}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          {bb_tab_flag && bb_tab_flag == "nosql" && (
            <div className="bb_body4">
              {/* <div className='bb_body1_header'>
                    		<span>实例名称:</span>
                    		<select>
                    			<option>所有实例</option>
                    			<option>ucd-ty-app-demo-1:18080</option>
                    			<option>dell-goruntime:8080</option>
                    			<option>10.10.46.144:8080</option>
                    		</select>
                    		<span>时间: </span>
                    		<span><input type='checkbox' />今天</span>
                    		<span><input type='checkbox' />昨天</span>
                    		<span><input type='checkbox' />7日内</span>
                    		<span><input type='checkbox' />7日前</span>
                    		<span></span>
                    	</div> */}
              <div style={{ height: "50px" }} />
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Memcached</th>
                    <th>时间</th>
                    <th>平均响应时间</th>
                    <th>最长响应时间</th>
                    <th>吞吐率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="4">JSP/index.jsp</td>
                    <td>今日</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>昨日</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>7日内</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>7日前</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    bb_tab_flag: state.vars.bb_tab_flag,
    shuju: state.vars.shuju,
    sj: state.vars.sj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    willMount: () => {
      let obj = {
        //报表事务
        type: "get",
        url: "apm/transactionForm.pinpoint",
        data: "",
        dataType: "json"
      };
      ajax(obj, cakklo);
      function cakklo(data) {
        // console.log(data,'报表事务')
        dispatch(actions.setVars("shuju", data.objectList));
      }
      let obj1 = {
        // 事务报表
        type: "get",
        url: "apm/databaseForm.pinpoint",
        data: "",
        dataType: "json"
      };
      ajax(obj1, cakklo1);
      function cakklo1(data) {
        console.log(data, "事务报表");
        dispatch(actions.setVars("sj", data.objectList));
      }
    },
    /** */
    // ctrl+alt+t
    /*  */
    /*  */
    /*  */

    init: () => {
      let height = $("#bb").css("height");
      $("#secondTree").css("height", height);
      add;
      function add(a, b) {
        let result = a + b;
        return result;
      }
    },
    bb_body1: () => {
      dispatch(actions.setVars("bb_tab_flag", "swbb"));
    },
    bb_body2: () => {
      dispatch(actions.setVars("bb_tab_flag", "gjswbb"));
    },
    bb_body3: () => {
      dispatch(actions.setVars("bb_tab_flag", "sjkbb"));
    },
    bb_body4: () => {
      dispatch(actions.setVars("bb_tab_flag", "nosql"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bb);
