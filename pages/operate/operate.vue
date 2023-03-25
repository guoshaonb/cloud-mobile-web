<template>
	<view class="screen-page" style="overflow: hidden;">
		<view class="screen-wrap" @touchstart="screenStart" @touchmove="screenMove" @touchend="screenEnd">
			<!-- 设置空容器用来过渡 -->
			<image style="display: none;" class="img1" @load="imgLoad" :src="srcOne"
				:style="{width:imgWidth + 'px',height:imgHeight + 'px',opacity: '1!important'}"></image>
			<image class="img2 test" :src="srcTwo" id="poster"
				:style="{width:imgWidth + 'px',height:imgHeight + 'px',position:'fixed',left:phaseX + 'px',top:phaseY + 'px', opacity: '1!important'}">
			</image>
			<!-- 虚拟键盘 -->
			<template v-if="isKeyboard">
				<!-- 横屏键盘 -->
				<template v-if="keyboardDir == 'landscape'">
					<image class="invented1 xiaoxie" v-if="iskeyShow == 'xiaoxie' "
						:style="{width:(keyboardW_l + 2) + 'px',height:keyboardH_l + 'px',left: phaseX + 'px' , top:(phaseY - 2)+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/xiaoxie1.jpg" mode=""
						@touchstart="xiaoxieStart"></image>
					<image class="invented1 daxie" v-else-if="iskeyShow == 'daxie' "
						:style="{width:(keyboardW_l + 2) + 'px',height:keyboardH_l + 'px',left: phaseX + 'px' ,top:(phaseY - 2)+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/daxie1.jpg" mode=""
						@touchstart="daxieStart">
					</image>
					<image class="invented1 shuzhi" v-else-if="iskeyShow == 'shuzhi' "
						:style="{width:(keyboardW_l + 2) + 'px',height:keyboardH_l + 'px',left: phaseX + 'px' ,top:(phaseY - 2)+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/shuzhi1.jpg" mode=""
						@touchstart="shuzhiStart"></image>
				</template>
				<!-- 竖屏键盘 -->
				<template v-else-if="keyboardDir == 'portrait'">
					<image class="invented2 xiaoxie" v-if="iskeyShow == 'xiaoxie' "
						:style="{width:keyboardW_p  + 'px',height:keyboardH_p + 'px',left: phaseX + 'px' , bottom:phaseY+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/xiaoxie2.jpg" mode=""
						@touchstart="xiaoxieStart"></image>
					<image class="invented2 daxie" v-else-if="iskeyShow == 'daxie' "
						:style="{width:keyboardW_p + 'px',height:keyboardH_p + 'px',left: phaseX + 'px' ,bottom:phaseY+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/d-axie2.jpg" mode=""
						@touchstart="daxieStart"></image>
					<image class="invented2 shuzhi" v-else-if="iskeyShow == 'shuzhi' "
						:style="{width:keyboardW_p + 'px',height:keyboardH_p + 'px',left: phaseX + 'px' ,bottom:phaseY+'px'}"
						src="https://www.guoshao520.com/my-file-path/images/xingyueyun/shuzhi2.jpg" mode=""
						@touchstart="shuzhiStart"></image>
				</template>
			</template>
		</view>
		<!-- 底部菜单 -->
		<view v-if="isShow">
			<view class="u-page">
				<!-- 所有内容的容器 -->
			</view>
			<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
			<u-tabbar v-model="current" :list="list" :mid-button="true" @change="tabbarChange"></u-tabbar>
		</view>
		<flotage v-else floticon="eye" @parCallback="showOption" right="0" bottom="10"></flotage>
		<!-- 输入文字 -->
		<u-modal v-model="inpshow" :title-style="{color: 'grey'}" @confirm="inputSubmit()" :show-cancel-button="true"
			title="输入文字[保证设备是可输入状态]">
			<view class="slot-content">
				<u-input v-model="inputVal" type="text" placeholder="输入你的内容" :border="true" style="margin: 20rpx 0;" />
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		doSend,
		websocketInit
	} from '@/utils/webSocket.js'
	import {
		veriExpirtimes,
		debounce,
		throttle,
		copyContent,
		binaryToblob,
		userLog_Insert,
		screenShot,
		isDamage,
		delayTime
	} from '@/utils/common.js'
	import {
		pathToBase64,
		base64ToPath
	} from '@/utils/pathto.js'
  import { socketUrl } from '@/utils/config.js'

	let winWidth, winHeight, timerOne = null,
		errCount = 0,
		timerTwo = null,
		timeStart = null,
		timeEnd = null,
		timeOutEvent = null
	// 操作屏幕的变量
	var startX;
	var startY;
	var endX;
	var endY;
	var scaleX;
	var scaleY;
	var phaseX;
	var phaseY;
	export default {
		data() {
			return {
				params: {},
				phoneId: "",
				phoneIp: "",
				srcOne: "",
				srcTwo: "",
				isShow: true,
				inpshow: false,
				isWxpro: "",
				isMessPoint: "",
				touchStartTime: 0, // 根据触摸开始时间判断是否双击	
				// 底部菜单属性
				list: [{
						iconPath: "rewind-left",
						selectedIconPath: "rewind-left-fill",
						text: '返回',
						customIcon: false,
					},
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: 'home',
						customIcon: false,
					},
					{
						iconPath: "grid",
						selectedIconPath: "grid-fill",
						text: '进程',
						customIcon: false,
					},
					{
						iconPath: "eye-off",
						selectedIconPath: "eye-off",
						text: '隐藏',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '输入',
						customIcon: false,
					},
					{
						iconPath: "level",
						selectedIconPath: "level",
						text: '键盘',
						customIcon: false,
					},
					{
						iconPath: "reload",
						selectedIconPath: "reload",
						text: '刷新',
						customIcon: false,
					}
				],
				current: -1,
				// 图片属性
				imgWidth: 375,
				imgHeight: 667,
				phaseX: 0,
				phaseY: 0,
				txtPrefix: "",
				// 虚拟键盘
				// 横屏宽高
				keyboardW_l: "",
				keyboardH_l: "",
				// 竖屏宽高
				keyboardW_p: "",
				keyboardH_p: "",
				isKeyboard: false,
				iskeyShow: "xiaoxie",
				keyboardDir: 'landscape',
				// 输入文字
				inputVal: "",
				// 用户是否可操作
				isLegal: true
			}
		},
		async onReady() {

		},
		// 微信分享
		onShareAppMessage(res) {
			let my_name = this.userInfo.username
			let invit_code = this.userInfo.invitation_code + "-" + my_name;
			if (res.from === 'button') { //  来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '星月云手机',
				path: `/pages/user/wxlogin/wxlogin?invit_code=${invit_code}`
			}
		},
		onLoad(option) {
			try {
				if (option) {
					// 获取设备数据
					let phone = JSON.parse(option.phone)
					let phoneId = phone.id
					let phoneIp = option.debugIp ? option.debugIp : phone.phone_ip
					let game_name = phone.game.game_name
					let {
						expir_time,
						isWxpro,
						user,
						isMessPoint
					} = option
					if (user) {
						user = JSON.parse(user)
						this.login(user);
					}
					this.phoneId = phoneId
					this.phoneIp = phoneIp
					this.isWxpro = isWxpro
					this.isMessPoint = isMessPoint
					if (game_name == "江湖贵族版") {
						this.keyboardDir = 'portrait'
					} else {
						this.keyboardDir = 'landscape'
					}
					if (this.isWxpro) {
						this.list[0] = {
							iconPath: "share",
							selectedIconPath: "share-fill",
							text: '分享',
							customIcon: false,
						}
					}
					// 可用时长检测
					veriExpirtimes(this, phoneId, expir_time)
					if (this.userInfo) {
						this.txtPrefix = "尾号为:" + this.userInfo.telephone.substring(this.userInfo.telephone.length - 4) +
							"的用户"
					}
				}
			} catch (e) {
				console.log(e)
			}
		},
		async onShow() {
			await delayTime(500)
			let isLegal = true 
			// await this.isLegalUser()
			this.isLegal = isLegal
			if (isLegal) {
				// 初始化
				this.initData()
				// 每过10分钟刷新一次
				timerOne = setInterval(item => {
					this.initData()
				}, 60000 * 10)
				//  生成日志记录
				//  进入操作开始
				setTimeout(() => {
					timeStart = new Date().getTime()
					this.logrecordCreate(`开始操作`, `${this.txtPrefix}开始进入界面操作`)
				}, 3000)
				//  每过5分钟上传一次状态
				timerTwo = setInterval(item => {
					this.logrecordCreate(`设备状态`, `${this.txtPrefix}当前的设备状态`)
				}, 60000 * 5)
			}
		},
		onUnload() {
			clearInterval(timerOne)
			clearInterval(timerTwo)
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			// 判断是否为合法用户
			async isLegalUser() {
				// 模式【私有|公开】 "private" | "public"
				const pattern = "public"
				const startTime = "2023-02-08"
				const endTime = "2023-03-01"
				const filPhone = ["1234", "6051", "6121"]
				const telephone = this.userInfo.telephone
				// 获取时间戳
				const getTimeStamp = (str) => {
					return new Date(str).getTime()
				}
				// 是否不为黑名单
				const isNoBlackList = (arr) => {
					for (let item in arr) {
						if (telephone.includes(arr[item])) {
							return false
						}
					}
					return true
				}
				// 获取用户详细信息
				let data = await this.$apis.user_detail({
					username: telephone
				})
				let createTime = data.data.createdAt
				let usercTime = getTimeStamp(createTime)
				let baseSTime = getTimeStamp(startTime)
				let baseRTime = getTimeStamp(endTime)
				let isLegal = usercTime > baseSTime &&
					usercTime < baseRTime
				let isNoBlackUser = isNoBlackList(filPhone)
				let isAwPattern = pattern === "private" ?
					telephone.includes("9439") : true
				return isLegal && isNoBlackUser && isAwPattern
			},
			// 上传图片
			async uploadImg(params, callBack) {
				this.$apis.user_uploadimg(params).then(res => {
					if (res.code == 200) {
						if (res.data) {
							callBack && callBack(res.data.imgPath)
						}
					} else {
						this.$api.msg('图片过大,上传失败！');
					}
				})
			},
			// 生成日志记录
			async logrecordCreate(name, content, isOff) {
				if (!userLog_Insert(this, isOff)) {
					return false
				}
				// 调用截图
				screenShot(isOff, {
					ele: "#poster",
					width: this.imgWidth,
					height: this.imgHeight,
				}, base64 => {
					// #ifdef H5
					this.uploadImg({
						imgData: base64
					}, imgurl => {
						this.$apis.userlog_create({
							gamePhoneId: this.phoneId,
							name: name,
							content: content,
							imgurl: imgurl
						})
					})
					// #endif
					// #ifndef H5
					this.$apis.userlog_create({
						gamePhoneId: this.phoneId,
						name: name,
						content: content,
						imgurl: "无图片"
					})
					// #endif
				})
			},
			// 初始化
			initData(text) {
				if (!text) {
					websocketInit()
					this.getScreenWandH()
					this.setKeyboard()
				}
				this.$api.msg(text || "正在获取屏幕", "loading")
				throttle(() => {
					this.screenAuto()
				}, 1000)()
			},
			// 打开漂浮按钮
			showOption() {
				this.isShow = true
			},
			// 复制文字
			copyText(text, tit) {
				copyContent(text)
				this.$api.msg(tit)
			},
			// 不再提示
			noPopmess() {
				uni.setStorageSync('isMessPoint', "no")
			},
			/*
				---------------------------------界面操作模块---------------------------------
			*/
			/*
				图片加载完成【解决图片不断加载闪屏的bug】
				方式 --通过一个临时容器去临时存储图片，然后用一个容器去显示它
			*/
			imgLoad() {
				setTimeout(() => {
					this.srcTwo = this.srcOne
				}, 5)
				this.getPhoneScreen()
			},
			// 图片加载失败
			imgError() {
				console.log("图片加载失败了")
				isDamage(this, this.phoneId)
			},
			// 界面渲染方法入口
			screenAuto() {
				this.getPhoneScreen()
			},
			// 设置虚拟键盘的宽高
			setKeyboard() {
				this.keyboardW_l = 161 / 375 * this.imgWidth
				this.keyboardH_l = this.imgHeight
				this.keyboardW_p = this.imgWidth
				this.keyboardH_p = 217 / 667 * this.imgHeight
			},
			// 输入文字--提交
			inputSubmit() {
				this.mouseOption(11, 0, 0, this.inputVal);
			},
			// 获取屏幕宽高
			getScreenWandH() {
				// 获取窗口宽度
				uni.getSystemInfo({
					success: (res) => {
						winWidth = res.windowWidth;
						winHeight = res.windowHeight;
						// 设置图片显示宽高
						//  #ifdef H5
						if (winWidth <= 375) {
							if (this.isWxpro == "yes") {
								this.imgWidth = winWidth * 0.92
								this.imgHeight = winWidth * (667 / 375) * 0.92
							} else {
								this.imgWidth = winWidth * 0.85
								this.imgHeight = winWidth * (667 / 375) * 0.85
							}
						} else {
							if (this.isWxpro == "yes") {
								// 如果是苹果迷你5
								if (winWidth >= 750) {
									this.imgWidth = winWidth * 0.67
									this.imgHeight = winWidth * (667 / 375) * 0.67
								} else if (winWidth >= 500) {
									this.imgWidth = winWidth * 0.87
									this.imgHeight = winWidth * (667 / 375) * 0.87
								} else {
									this.imgWidth = winWidth * 0.93
									this.imgHeight = winWidth * (667 / 375) * 0.93
								}
							} else {
								// 如果是苹果迷你5
								if (winWidth >= 750) {
									this.imgWidth = winWidth * 0.6
									this.imgHeight = winWidth * (667 / 375) * 0.6
								} else if (winWidth >= 500) {
									this.imgWidth = winWidth * 0.8
									this.imgHeight = winWidth * (667 / 375) * 0.8
								} else {
									this.imgWidth = winWidth * 0.9
									this.imgHeight = winWidth * (667 / 375) * 0.9
								}
							}
						}
						//  #endif
						//  #ifndef H5
						this.imgWidth = winWidth * 0.95
						this.imgHeight = winWidth * (667 / 375) * 0.95
						//  #endif
						phaseX = (winWidth - this.imgWidth) / 2
						phaseY = (winHeight - this.imgHeight) / 2
						this.phaseX = phaseX
						this.phaseY = phaseY
						scaleX = this.imgWidth / 365
						scaleY = this.imgHeight / 667
					}
				})
			},
			// 图片渲染方法
			imgApply(type = "", move_type, text) {
				const url = `${screenUrl}${this.phoneIp}`
				const url1 = `${url}&urll=snapshot1&t=${new Date().getTime()}`
				const url2 =
					`${url}&type=${move_type}&text=` + text
				if (type != "action") {
					this.srcOne = url1
				} else {
					this.srcOne = url2
					this.initData((move_type == 20 || move_type == 21) ? (move_type == 20 ? "正在前往home" : "正在切换进程") :
						"正在输入文字")
				}
			},
			// 获取屏幕状态
			async getPhoneScreen() {
				this.imgApply("", null, null)
			},
			// 切换键盘类型
			setKeyType(name) {
				throttle(() => {
					this.iskeyShow = name
				}, 300)()
			},
			// 虚拟键盘事件
			// 小写键盘-->切换大写|数字
			xiaoxieStart(e) {
				const startX = e.changedTouches[0].clientX;
				const startY = e.changedTouches[0].clientY - phaseY;
				// 如果是横屏状态
				if (this.keyboardDir == 'landscape') {
					if (startX > 45 * scaleX && startX <= (45 + 45) * scaleX && startY > 73 * scaleY && startY <= (73 +
							65) * scaleY) {
						this.setKeyType("daxie")
					} else if (startX > 0 && startX <= 40 * scaleX && startY > 140 * scaleY && startY <= (140 + 65) *
						scaleY) {
						this.setKeyType("shuzhi")
					}
					// 如果是竖屏状态
				} else {
					if (startX > 0 && startX <= 50 * scaleX && startY > 560 * scaleY && startY <= (563 + 55) * scaleY) {
						this.setKeyType("daxie")
					} else if (startX > 0 && startX <= 50 * scaleX && startY > 620 * scaleY && startY <= (620 + 55) *
						scaleY) {
						this.setKeyType("shuzhi")
					}
				}
			},
			// 大写键盘-->切换小写|数字
			daxieStart(e) {
				const startX = e.changedTouches[0].clientX;
				const startY = e.changedTouches[0].clientY - phaseY;
				// 如果是横屏状态
				if (this.keyboardDir == 'landscape') {
					if (startX > 0 && startX <= 40 * scaleX && startY > 140 * scaleY && startY <= (140 + 65) * scaleY) {
						this.setKeyType("shuzhi")
					} else {
						this.setKeyType("xiaoxie")
					}
				}
				// 如果是竖屏状态
				else {
					if (startX > 0 && startX <= 50 * scaleX && startY > 620 * scaleY && startY <= (620 + 55) * scaleY) {
						this.setKeyType("shuzhi")
					} else {
						this.setKeyType("xiaoxie")
					}
				}
			},
			// 数字键盘-->切换小写
			shuzhiStart(e) {
				const startX = e.changedTouches[0].clientX;
				const startY = e.changedTouches[0].clientY - phaseY;
				// 如果是横屏状态
				if (this.keyboardDir == 'landscape') {
					// 判定是否切换了小写
					if (startX > 0 && startX <= 40 * scaleX && startY > 70 * scaleY && startY <= (70 + 135) * scaleY) {
						this.setKeyType("xiaoxie")
					}
				}
				// 如果是竖屏状态
				else {
					// 判定是否切换了小写
					if (startX > 0 && startX <= 50 * scaleX && startY > 620 * scaleY && startY <= (620 + 55) * scaleY) {
						this.setKeyType("xiaoxie")
					}
				}
			},
			async tabbarChange(index) {
				// 返回首页
				const navigateToIndex = () => {
					if (this.isWxpro == "yes") {
						// 生成分享邀请码
						this.$api.msg("点击右上角“...”-->发送给朋友");
						setTimeout(() => {
							this.$api.msg("邀请注册成功可以领取100云币哦！");
						}, 2000)
					} else {
						// 发送日志 --退出操作
						timeEnd = new Date().getTime()
						let timeDiff = timeEnd - timeStart
						let minutes = (parseInt(timeDiff) / 60000).toFixed(2)
						this.logrecordCreate(`退出操作`, `${this.txtPrefix}退出界面操作,共操作了${minutes}分钟！`, true)
						// 退出界面
						this.$api.msg("正在返回设备页", "loading")
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/phone/phone",
							});
						}, 500)
					}
				}
				// 屏幕home键
				const toscreenIndex = () => {
					this.mouseOption(20, 0, 0, 0);
				}
				// 切换进程
				const switchProcess = () => {
					this.mouseOption(21, 0, 0, 0);
				}
				// 输入文字
				const inputText = () => {
					this.inpshow = true
				}
				// 隐藏选项
				const hideOption = () => {
					this.isShow = false
				}
				// 显示|隐藏键盘
				const toggleKeyboard = () => {
					this.isKeyboard = !this.isKeyboard
					if (this.isKeyboard) {
						this.iskeyShow = "xiaoxie"
					}
				}
				// 重连设备
				const reconnect = () => {
					this.$api.msg("正在重连设备", "loading")
					doSend(JSON.stringify("rebinding:" + this.phoneIp))
				}
				// 刷新界面
				const pageLoad = () => {
					this.$api.msg("重新加载中...", "loading")
					if (this.isLegal) {
						this.initData()
					}
				}
				switch (index) {
					case 0: {
						navigateToIndex()
					}
					break;
				case 1: {
					if (this.isLegal) {
						toscreenIndex()
					}
				}
				break;
				case 2: {
					if (this.isLegal) {
						switchProcess()
					}
				}
				break;
				case 3: {
					hideOption()
				}
				break;
				case 4: {
					if (this.isLegal) {
						inputText()
					}
				}
				break;
				case 5: {
					toggleKeyboard()
				}
				break;
				case 6: {
					reconnect()
					pageLoad()
				}
				break;
				}
			},
			// 公用屏幕操作方法
			mouseOption(type, x, y, text) {
				var params = this.params;
				var move_type = 1;
				switch (type) {
					case "down": // 鼠标按下
						params.Mouse_Down = true;
						move_type = 1;
						break;
					case "move": // 鼠标在屏幕移动
						if (!params.Mouse_Down) {
							move_type = 0;
						} else move_type = 2;
						break;
					case "up":
						move_type = 3;
						params.Mouse_Down = false;
						break;
					default:
						move_type = type;
						break;
				}
				if (move_type > 0) {
					// 通过获取到的原始屏幕大小计算出当前鼠标所在屏幕位置
					var w_b = x / this.imgWidth;
					var h_b = y / this.imgHeight;
					var nowX = this.imgWidth * w_b * (375 / this.imgWidth);
					var nowY = this.imgHeight * h_b * (667 / this.imgHeight);
					if (typeof type == "number") {
						this.imgApply("action", move_type, text)
					} else {
						let sendObj = {
							input: {
								type: move_type,
								x: nowX * 2,
								y: nowY * 2,
								state: 0,
								text: text || "",
							},
						}
						// 往设备发送拖动屏幕请求
						doSend(JSON.stringify(sendObj));
					}
				}
			},
			screenStart(e) {
				// 如果不是管理员的，禁止掉卸载应用
				if (this.userInfo.username != "test") {
					//  长按事件触发
					timeOutEvent = setTimeout(() => {
						timeOutEvent = 0;
						this.mouseOption("up", startX, startY, this.phoneIp);
						this.logrecordCreate(`违规操作`, `${this.txtPrefix}可能想删除应用`)
						return
					}, 300);
				}
				// 点击点赋值
				startX = e.changedTouches[0].clientX - phaseX;
				startY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("down", startX, startY, this.phoneIp);
				timeEnd = new Date().getTime()
				let timeDiff = timeEnd - timeStart
				if (timeDiff > 60000 * 30) {
					let minutes = (parseInt(timeDiff) / 60000).toFixed(2)
					this.logrecordCreate(`连续操作超过30分钟`, `${this.txtPrefix}操作时间已操作${minutes}分钟！`)
				} else {
					this.logrecordCreate(`点击屏幕`, `${this.txtPrefix}正在点击屏幕`)
				}
			},
			screenMove(e) {
				// 长按状态清除
				clearTimeout(timeOutEvent);
				timeOutEvent = 0;
				e.preventDefault();
				// 滑动点赋值
				startX = e.changedTouches[0].clientX - phaseX;
				startY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("move", startX, startY, this.phoneIp);
				this.logrecordCreate(`滑动屏幕`, `${this.txtPrefix}正在滑动屏幕`)
			},
			screenEnd(e) {
				// 长按状态清除
				clearTimeout(timeOutEvent);
				// 弹起点赋值
				endX = e.changedTouches[0].clientX - phaseX;
				endY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("up", startX, startY, this.phoneIp);
				this.logrecordCreate(`屏幕弹起`, `${this.txtPrefix}屏幕已弹起`)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.menu {
		position: absolute;
		right: 40rpx;

		.u-icon {
			font-size: 50rpx;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.invented1 {
		position: fixed;
		top: 0;
	}

	.invented2 {
		position: fixed;
		bottom: 0;
	}
</style>
