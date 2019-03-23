 const ip ='http://192.168.1.137:8080'  
module.exports = {
	myAjax: function(obj, callback) {
		$.ajax({
			url: ip+'/apm/transaction/' + obj.url,
			data: obj.data,
			dataType: obj.dataType,
			type: obj.type,
			timeout: 10000,
			async: false,
			success: function(data) {
				if (data.success) {
					callback(data)
				} else {
					// alert(data.errMsg)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus == 'timeout') {
					// alert('请求超时')
				}
			}
		})
	},
	myAjax2: function(obj, callback) {
		$.ajax({
			url:ip+'/apm/application/'+ obj.url,
			data: obj.data,
			dataType: obj.dataType,
			type: obj.type,
			timeout: 10000,
			async: false,
			success: function(data) {
				if (data.success) {
					callback(data)
				} else {
					// alert(data.errMsg)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus == 'timeout') {
					// alert('请求超时')
				}
			}
		})
	}
}

// 192.168.1.153:8082   测试
// http://192.168.1.105:8080/  数据库