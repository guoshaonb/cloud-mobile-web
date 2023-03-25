import http from '@/utils/request.js'
const apiList = {
	/**
	 * 接口地址
	 */
	
	// 微信登录
	wxLogin: (data) => {
		return http.request({
			url: '/user/login',
			method: 'POST',
			data
		})
	}
}

export default apiList
