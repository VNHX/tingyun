const ip ='http://192.168.1.137'  
module.exports = {
	headerOptions:ip+':8080'+'/apm/application/getAppNameList',
	getTransactionList:ip+':8080'+'/apm/transaction/getTransactionList', //事务-1
	getTransChart:ip+':8080'+'/apm/transaction/getTransChart', //事务-2
	getSpanChart:ip+':8080'+'/apm/transaction/getSpanChart', //事务-3
	getSpanStack:ip+':8080'+'/apm/transaction/getSpanStack', //事务-4
	llll: 'http://192.168.1.137:28080/apm/monitor/addMonitorStrategy.pinpoint', // 策略
	kkkk: 'http://192.168.1.137:28080/apm/getAgentInfoList.pinpoint', //环境
	yyfw: 'http://192.168.1.137:28080/apm/apmResponseTime/chart.pinpoint', //应用服务及其响应时间
	mmsw: 'http://192.168.1.137:28080/apm/apmTransaction/chart.pinpoint', //每秒事务数
	cpu: 'http://192.168.1.137:28080/apm/apmCpuLoad/chart.pinpoint', //CPU 图
	hdxc: 'http://192.168.1.137:28080/apm/apmActiveTrace/chart.pinpoint', //活动线程数
	dttu: 'http://192.168.1.137:28080/apm/apmJvmGc/chart.pinpoint', //堆内存图JVM GC
	rerm: 'http://192.168.1.137:28080/apm/apmJvmGcDetailed/chart.pinpoint', //永久区内存Perm 
	sjxx: 'http://192.168.1.137:28080/apm/apmDataSource/chart.pinpoint', //数据源信息
}