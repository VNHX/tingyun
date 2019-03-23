//应用拓扑
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/Application/Yytptu.css';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax = myAjax.myAjax
class Yytp extends Component{  
	componentWillMount() {
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {}=this.props;
        return (
            <div id="mynetwork">

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        init:()=>{
            let obj={  //事务报表
                type: 'get',
                url: 'apm/getTopoGraph.pinpoint' ,
                data: '',
                dataType: 'json'
            };
            ajax(obj,cakklo);
            function  cakklo(data){
                var nodes = null;
                var edges = null;
                    // draw()
                    // function draw() {
                       
                    // }
                console.log(data,'拓扑图')
                var edges=data.obj.edgeList;
                var nodes=data.obj.nodeList
                console.log(edges,'连接的节点')
                console.log(nodes,'生成的节点')
                var data = {
                    nodes: nodes,
                    edges: edges
                    };
                var container = document.getElementById('mynetwork');
                                    var options = {
                            nodes: {
                                size:35,
                                color: {
                                    border: '#34baff',//节点边框颜色
                                    background: 'transparent',
                                    highlight: {//节点选中时状态颜色
                                      border: '#f44336',
                                    },
                                }
                            },
                            interaction: {
                                selectConnectedEdges:true,//选择节点后是否显示连接线
                                hoverConnectedEdges:true,//鼠标滑动节点后是否显示连接线
                            },
                            edges: {
                                shadow:true,//连接线阴影配置
                                smooth: true,//是否显示方向箭头
                                arrows: {
                                        from : true 
                                        },//箭头指向from节点
                                font: {
                                    color:'#051882'
                                }
                            }
                    };
                    console.log(options,'设置拓扑图')
                    //初始化拓扑图
                  var  network = new vis.Network(container, data, options);
                    console.log(network,'初始化拓扑图')
            }
           
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Yytp);