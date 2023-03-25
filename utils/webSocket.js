import { urlObj } from '@/utils/config.js'
let socketOpen = false;

//发消息方法
const doSend = (message) => {
	if (socketOpen) {
		uni.sendSocketMessage({
			data: message
		});
	} 
}

const websocketInit = () => {
	//建立连接
	uni.connectSocket({
		url: urlObj.socketUrl
	});
	//连接错误
	uni.onSocketError(function(res) {
		console.log('WebSocket连接打开失败，请检查！');
	});
	//打开了连接
	uni.onSocketOpen(function() {
		console.log('WebSocket连接已打开！');
		socketOpen = true;
	});
	//关闭连接
	uni.onSocketClose(function(res) {
		console.log('WebSocket 已关闭！');
		websocketInit() //重新连接
	});
	//接受消息
	uni.onSocketMessage(function(res) {
		console.log('收到服务器内容：' + res.data);
	});
}

module.exports = {
	doSend,
	websocketInit
}
