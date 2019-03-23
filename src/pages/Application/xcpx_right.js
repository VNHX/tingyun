import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import { Icon } from 'antd';
import './xcpx_right.css';
import myAjax from 'pages/functionalCom/myAjax.js';
import { Z_ASCII } from 'zlib';
const ajax=myAjax.myAjax;
class Xcpx_right extends Component{  
	componentWillMount() {
        this.props.willMount(this.props.id);
        console.log(this.props.id,'sasdas')
    }
    componentDidMount() {
        this.props.init();
    }
    
    render() {
    	let {sw_back,dispaly1,disLeft}=this.props;
        return (
            <div className='wbyy_content_right_block'>
                <div className='wbyy_content_right_block_chart'>
                    <div className="back" onClick={()=>sw_back()}><Icon type="rollback" />返回</div>
                    <div style={{width:'100%',marginTop:'10px'}}></div>
                    <div>
                    <table style={{width:'100%',marginTop:'10px'}}>
            <thead>
                <tr>
                    <th>时间{dispaly1.startDate}剩余:{dispaly1.duration}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td >类型:{dispaly1.types}</td>
                <td>
                {
                    disLeft && disLeft.map((val,i)=>{
                        console.log(i,'sds')
                        return(
                            <div key={i}>
                                <span>{val.name}</span>
                            </div>
                        )
                    })
                }    
                </td> 
                </tr>
            </tbody>
        </table>
                    </div>
                </div>
            </div>
       
        )
    }
}
const mapStateToProps = (state) => {
    return {
        id:state.vars.id,
        dispaly1:state.vars.dispaly1,
        disLeft:state.vars.disLeft,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:(id)=>{
            let obj9={ //查看线程剖析结果
                type: 'get',
                url: 'apm/thread/view.pinpoint',
                data: 'id='+id,
                dataType: 'json',
            }
            ajax(obj9,callback9);
            function callback9(data){
                // console.log(data,'ss')
                console.log('查看线程剖析结果',JSON.parse(data.obj.treeData));
                dispatch(actions.setVars('dispaly1',data.obj))
                // children() 方法返回返回被选元素的所有直接子元素。
                function transData(a, idStr, pidStr, chindrenStr){    
                    var r = [], hash = {}, id = idStr, pId = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;    
                    for(; i < len; i++){    
                        hash[a[i][id]] = a[i];    
                    }    
                    for(; j < len; j++){    
                        var aVal = a[j], hashVP = hash[aVal[pId]];    
                        if(hashVP){    
                            !hashVP[children] && (hashVP[children] = []);    
                            hashVP[children].push(aVal);    
                        }else{    
                            r.push(aVal);    
                        }    
                    }    
                    return r;    
                }    
                var jsonData = JSON.parse(data.obj.treeData);    
                var jsonDataTree = transData(jsonData, 'id', 'pId', 'chindren');    
                dispatch(actions.setVars('disLeft',jsonDataTree))
                console.log(jsonDataTree,'树形');   
            };
    	},
    	init:()=>{
    	},
        sw_back:()=>{
            dispatch(actions.setVars('xcpx_right',false))
        },
      
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Xcpx_right);