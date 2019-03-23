import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/functionalCom/timeDrag.css';

class TimeDrag extends Component{  
	componentWillMount() {
        this.props.willMount();
    }
    componentDidMount() {
        this.props.init();
    }
    render() {
    	let {dragTime}=this.props;
        let arr=['30m','1H','6H','12H','1D','3D','7D','14D','1M','2M','3M'];
        return (
            <div id='dragDiv' className='dragDiv'>
                <div className='all'>
                    <div className='bgDiv' id='bgDiv'></div>
                    <div id='dragBlock' className='dragBlock'></div>
                </div>
                <div className='axis'>
                    <div className='vertical'>
                        <span>|</span><span>|</span>
                        <span>|</span><span>|</span>
                        <span>|</span><span>|</span>
                        <span>|</span><span>|</span>
                        <span>|</span><span>|</span>
                        <span>|</span>
                    </div>
                    <span>30m</span><span>1H</span>
                    <span>6H</span><span>12H</span>
                    <span>1D</span><span>3D</span>
                    <span>7D</span><span>14D</span>
                    <span>1M</span><span>2M</span>
                    <span>3M</span>
                </div>
                {/* <div className='sz'> 设置</div> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dragTime:state.vars.dragTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
    		
    	},
    	init:()=>{
    		function dragFunction(id,arr){
                var time='30m';//选中X坐标
                var timeNum;
                
                var dragBlock = document.getElementById('dragBlock');  
                dragBlock.onmousedown=function(e){//鼠标按下
                    var e = e || window.event; //兼容ie浏览器
                    var diffX = e.clientX - dragBlock.offsetLeft; 
                    if(typeof dragBlock.setCapture!='undefined'){ //ie bug 
                        dragBlock.setCapture();  
                    }
                    document.onmousemove = function(e) {  
                        var e = e || window.event;  
                        var left=e.clientX-diffX; 
                        left=(left/45).toFixed(0)*45;
                        timeNum=(left/45).toFixed(0);
                        if(left<0){  
                            left=0;  
                        }else if(left >450){  
                            left = 450;  
                        } 
                        dragBlock.style.left = left-5+ 'px';
                        $("#bgDiv").css('width', left+'px')              
                    };
                    document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动  
                        this.onmousemove = null;  
                        this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                        //修复低版本ie bug 
                        console.log('time',arr[timeNum]) 
                        dispatch(actions.setVars('dragTime',arr[timeNum]));
                        if(typeof dragBlock.releaseCapture!='undefined'){  
                            dragBlock.releaseCapture();  
                        }  
                    }; 
                }
            }
            var arr=['30m','1H','6H','12H','1D','3D','7D','14D','1M','2M','3M'];
            dragFunction('dragDiv',arr);
    	}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeDrag);
