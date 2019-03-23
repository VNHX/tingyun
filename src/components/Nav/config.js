module.exports = {
	page: [{
		id: '0',
		url: '/server/',
		name: 'Server'
	}, {
		id: '1',
		url: '/server/overview/yyyl',
		name: '概览',
		sonPage: [{
			id: 'yyyl',
			url: '/server/overview/yyyl',
			name: '应用一览'
		}, {
			id: 'gjswyl',
			url: '/server/overview/gjswyl',
			name: '关键事务一览',
		}, {
			id: 'ybp',
			url: '/server/overview/ybp',
			name: '仪表盘'
		}, {
			id: 'swl',
			url: '/server/overview/swl',
			name: '事务流'
		}, {
			id: 'yyjblb',
			url: '/server/overview/yyjblb',
			name: '应用警报列表'
		}, {
			id: 'gjswjblb',
			url: '/server/overview/gjswjblb',
			name: '关键事务警报列表'
		}]
	}, {
		id: '2',
		url: '/server/application/qbhz',
		name: '应用',
		sonPage: [{
			id: 'qbhz',
			url: '/server/application/qbhz',
			name: '情报汇总'
		}, {
			id: 'yytp',
			url: '/server/application/yytp',
			name: '应用拓扑',
		}, {
			id: 'sw',
			url: '/server/application/sw',
			name: '事务'
		}, {
			id: 'sjk',
			url: '/server/application/sjk',
			name: '数据库'
		}, {
			id: 'nosql',
			url: '/server/application/nosql',
			name: 'NoSQL'
		}, {
			id: 'wbyy',
			url: '/server/application/wbyy',
			name: '外部应用'
		}, {
			id: 'mq',
			url: '/server/application/mq',
			name: 'MQ'
		}, {
			id: 'htrw',
			url: '/server/application/htrw',
			name: '后台任务',
		}, {
			id: 'cwl',
			url: '/server/application/cwl',
			name: '错误率'
		}, {
			id: 'xcpx',
			url: '/server/application/xcpx',
			name: '线程剖析'
		}, {
			id: 'yyhj',
			url: '/server/application/yyhj',
			name: '应用环境'
		}, {
			id: 'bb',
			url: '/server/application/bb',
			name: '报表'
		}, {
			id: 'tz',
			url: '/server/application/tz',
			name: '探针'
		}, {
			id: 'demo',
			url: '/server/application/demo',
			name: 'demo'
		},
		{
			id: 'cp',
			url: '/server/application/cp',
			name: '磁盘'
		},{
			id: 'jc',
			url: '/server/application/jc',
			name: '进程'
		},{
			id: 'wl',
			url: '/server/application/wl',
			name: '网络'
		}]
	}, 
	// {
	// 	id: '3',
	// 	url: '/server/affairs/qbhz',
	// 	name: '关键事务',
	// 	sonPage: [{
	// 		id: 'qbhz',
	// 		url: '/server/affairs/qbhz',
	// 		name: '情报汇总'
	// 	}, {
	// 		id: 'st',
	// 		url: '/server/affairs/st',
	// 		name: '视图',
	// 	}]
	// }, 
	{
		id: '3',
		url: '/server/setup/yysz',
		name: '设置',
		sonPage: [{
			id: 'yysz',
			url: '/server/setup/yysz',
			name: '应用设置'
		}, {
			id: 'kzpz',
			url: '/server/setup/kzpz',
			name: '扩展配置',
		}, {
			id: 'gjswsz',
			url: '/server/setup/gjswsz',
			name: '关键事务设置'
		}]
	}, {
		id: '4',
		url: '/server/alarm/jbsz',
		name: '警告',
		sonPage: [{
			id: 'jbsz',
			url: '/server/alarm/jbsz',
			name: '警报设置'
		}, {
			id: 'clsz',
			url: '/server/alarm/clsz',
			name: '策略设置',
		}, {
			id: 'jstd',
			url: '/server/alarm/jstd',
			name: '接收通道'
		}]
	}]
}