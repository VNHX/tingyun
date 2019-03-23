import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from 'actions';
import 'pages/functionalCom/header.css';
import TimeDrag from 'pages/functionalCom/timeDrag.js';
import myAjax from 'pages/functionalCom/myAjax.js';
const ajax=myAjax.myAjax2;
import Las from 'pages/functionalCom/as.js';
import { DatePicker, Select, Icon } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

class Header extends Component{  
	componentWillMount() {
        let {}=this.props;
        this.props.willMount();
    }
    componentDidMount() {
        let {}=this.props;
        this.props.init();
    }
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
    render() {
    	let {headerOptions,headerOptionsID,handleChange,handleChange2,headerFlag,optionData,slide,slideFlag='left',showSlide,showSlideFlag=false,qwe}=this.props;
        return (
            <div>
                <div className='second_header'>
                    {
                        optionData=='more' && <Select
                            showSearch
                            style={{ width: 200 }}
                            defaultValue={headerOptions && headerOptions.AppNameList[0].appName}
                            onChange={handleChange2}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                        {
                            headerOptions && headerOptions.AppNameList.map((value)=>{
                                return(
                                    <Option key={value} value={value.agentId}>{value.appName}</Option>
                                )
                            })
                        }
                        </Select>
                    }
                    {
                        optionData=='less' && <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Filter/encodingFilter"
                            onChange={handleChange}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="Filter/encodingFilter">Filter/encodingFilter</Option>
                            <Option value="URI/wordpress/index.php">URI/wordpress/index.php</Option>
                        </Select>
                    }
                	
                    { headerFlag && <span className='time' onClick={()=>showSlide(showSlideFlag)}>最近30分钟<span className='icon'><Icon type="caret-down" /></span></span>}
                    {
                        showSlideFlag && <div className='timeCom'>
                            <div className='title'>
                                <span>选择时间</span><span onClick={()=>showSlide(showSlideFlag)} className='close'></span>
                            </div>
                            <div className='slide'>
                                <span>指定时间</span>
                                <span className='big' onClick={()=>slide(slideFlag)}>
                                    <span className={slideFlag=='left' ? 'left':'right'}></span>
                                </span>
                                <span>最近</span>
                            </div>
                            {
                                slideFlag=='right' && 
                                <div style={{height:'350px'}}>
                                    <RangePicker
                                      showTime={{ format: 'HH:mm' }}
                                      format="YYYY-MM-DD HH:mm"
                                      placeholder={['开始时间', '结束时间']}
                                      onChange={this.onChange}
                                      onOk={this.onOk}>
                                    </RangePicker>
                                </div>
                            }                        
                            {
                                slideFlag=='left' && 
                                <div style={{height:'100px',paddingLeft:'30px',paddingTop:'25px'}}>
                                    <TimeDrag/>
                                </div>
                            }                       
                        </div>
                    }
            	</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        slideFlag:state.vars.slideFlag,
        showSlideFlag:state.vars.showSlideFlag,
        headerOptions:state.vars.headerOptions,
        headerOptionsID:state.vars.headerOptionsID
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	willMount:()=>{
    	},
    	init:()=>{
            $.ajax({
                async:true,
                type:'get',
                url:Las.headerOptions,
                data:'',
                dataType:'json',
                contentType:'application/json',
                success:function(sdData){
                        console.log(sdData,'成功');
                        dispatch(actions.setVars('headerOptions',sdData));
                        dispatch(actions.setVars('headerOptionsID',sdData.AppNameList[0].redisAndMysql));//默认选中ID
                },
                error:function(data){
                    console.log("失败",data)
                }
            })
    	},
    	handleChange:(value)=>{
            console.log(`${value}`,'ssssssssss');
        },
        handleChange2:(value)=>{
            console.log(`${value}`,'ssssssssss');
            dispatch(actions.setVars('headerOptionsID',`${value}`));
        },
        slide:(slideFlag)=>{
            if(slideFlag=='left'){
                dispatch(actions.setVars('slideFlag','right'))
            }else{
                dispatch(actions.setVars('slideFlag','left'))
            }
        },
        showSlide:(showSlideFlag)=>{
            dispatch(actions.setVars('showSlideFlag',!showSlideFlag))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
