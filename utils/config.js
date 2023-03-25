// 项目环境 生产"produce" || 本地"development"
const NODE_ENV = "produce"
let baseUrl, socketUrl, screenUrl, imgUrl

//不同环境的请求地址
if (NODE_ENV == "produce") {
	socketUrl = `wss://www.guoshao520.com/socket/`
	baseUrl = `https://www.guoshao520.com/xingyue/api/v1`
	imgUrl = `https://www.guoshao520.com/images/profile/`
	screenUrl = `${baseUrl}/phoneall/screen?ip=`
} else {
	socketUrl = `ws://guoshao520.natapp1.cc/socket/`
	baseUrl = `http://guoshao520.natapp1.cc/xingyue/api/v1`
	imgUrl = `http://guoshao520.natapp1.cc/images/profile/`
	screenUrl = `${baseUrl}/phoneall/screen?ip=`
}

export {
	imgUrl,
	baseUrl,
	socketUrl,
	screenUrl
}
