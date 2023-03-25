<template>
	<view class="screenPage" style="overflow: hidden;">
		<view class="content"></view>
		<view class="screen-wrap" @touchstart="screenStart" @touchmove="screenMove" @touchend="screenEnd">
			<!-- 设置空容器用来过渡 -->
			<image style="display: none;" class="img1" @load="imgLoad" :src="srcOne"
				:style="{width:imgWidth + 'px',height:imgHeight + 'px',opacity: '1!important'}"></image>
			<image class="img2" :src="srcTwo" id="poster"
				:style="{width:imgWidth + 'px',height:imgHeight + 'px',position:'fixed',left:phaseX + 'px',top:phaseY + 'px', opacity: '1!important'}">
			</image>
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
		doSend,
		websocketInit
	} from '@/utils/webSocket.js'
	import {
		urlObj
	} from '@/utils/config.js'
	import {
		debounce,
		throttle,
		isDamage,
		delayTime
	} from '@/utils/common.js'
	import list from '@/utils/tabbar.js'
	let winWidth, winHeight
	// 操作屏幕的变量
	let startX;
	let startY;
	let endX;
	let endY;
	let scaleX;
	let scaleY;
	let phaseX;
	let phaseY;

	export default {
		data() {
			return {
				params: {},
				phoneIp: "",
				srcOne: "",
				srcTwo: "",
				isShow: true,
				inpshow: false,
				isWxpro: "",
				isMessPoint: "",
				// 底部菜单
				list: list,
				current: -1,
				// 图片属性
				imgWidth: 375,
				imgHeight: 667,
				phaseX: 0,
				phaseY: 0,
				// 输入文字
				inputVal: ""
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			const linkUrl = `http://guoshao520.natapp1.cc/cloud-mobile/index.html`
			uni.redirectTo({
				url: `/pages/webview/webview?url=${encodeURIComponent(linkUrl)}`
			})
			// #endif
		},
		onShow() {
			// #ifndef APP-PLUS
			this.initData()
			// #endif
		},
		methods: {
			// 初始化
			async initData(sendText) {
				try {
					if (!sendText) {
						websocketInit()
						this.getScreenWH()
					}
					const phoneIp = await this.getPhoneIp()
					this.phoneIp = phoneIp
					await delayTime(500)
					this.screenAuto(sendText)
				} catch (e) {
					console.log(e)
				}
			},
			async getPhoneIp() {
				return new Promise((resolve, reject) => {
					const tStamp = new Date().getTime()
					const preUrl = 'http://guoshao520.natapp1.cc'
					const apiUrl = `${!location.href.includes('guoshao') 
						? '/guoshao' : preUrl}/cloud-mobile/phoneIp.txt?t=${tStamp}`
					uni.request({
						url: apiUrl,
						success: (res) => {
							resolve(res.data)
						},
						fail: (res) => {
							console.log('get失败');
						}
					});
				})
			},
			// 打开漂浮按钮
			showOption() {
				this.isShow = true
			},
			/*
				---------------------------------界面操作模块---------------------------------
			*/
			/*
				图片加载完成【解决图片不断加载闪屏的bug】
				方式 --通过一个临时容器去临时存储图片，然后用一个容器去显示它
			*/
			imgLoad() {
				this.srcTwo = this.srcOne
				this.getPhoneScreen()
			},
			// 图片加载失败
			imgError() {
				isDamage(this, this.phone_id)
			},
			// 界面渲染方法入口
			screenAuto(text) {
				this.getPhoneScreen()
				this.$api.msg(text || "正在加载中", "loading")
			},
			// 输入文字--提交
			inputSubmit() {
				this.mouseOption(11, 0, 0, this.inputVal);
			},
			// 获取屏幕宽高
			getScreenWH() {
				//  获取窗口宽度
				uni.getSystemInfo({
					success: (res) => {
						winWidth = res.windowWidth;
						winHeight = res.windowHeight;
						// 设置图片显示宽高
						//  #ifdef H5
						if (winWidth <= 375) {
							if (this.isWxpro === "yes") {
								this.imgWidth = winWidth * 0.92
								this.imgHeight = winWidth * (667 / 375) * 0.92
							} else {
								this.imgWidth = winWidth * 0.85
								this.imgHeight = winWidth * (667 / 375) * 0.85
							}
						} else {
							if (this.isWxpro === "yes") {
								// 如果是苹果迷你5
								if (winWidth >= 750) {
									this.imgWidth = winWidth * 0.67
									this.imgHeight = winWidth * (667 / 375) * 0.67
								} else if (winWidth >= 500) {
									this.imgWidth = winWidth * 0.87
									this.imgHeight = winWidth * (667 / 375) * 0.87
								} else {
									this.imgWidth = winWidth * 0.95
									this.imgHeight = winWidth * (667 / 375) * 0.95
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
									this.imgWidth = winWidth * 0.92
									this.imgHeight = winWidth * (667 / 375) * 0.92
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
				const url = `${urlObj.screenUrl}${this.phoneIp}&urll=`
				const url1 =
					`${url}snapshot1&t=${new Date().getTime()}`
				const url2 =
					`${url}event&type=${move_type}&state=0&text=` + text
				if (type != "action") {
					this.srcOne = url1
				} else {
					this.srcOne = url2
					this.initData((move_type == 20 || move_type == 21) ? (move_type == 20 ? "正在前往home" : "正在切换进程") : "正在输入文字")
				}
			},
			// 获取屏幕状态
			async getPhoneScreen() {
				this.imgApply("", null, null)
			},
			tabbarChange(index) {
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
					this.initData()
				}

				switch (index) {
					case 0: {
						toscreenIndex()
					}
					break;
					case 1: {
						switchProcess()
					}
					break;
					case 2: {
						hideOption()
					}
					break;
					case 3: {
						inputText()
					}
					break;
					case 4: {
						reconnect()
						pageLoad()
					}
					break;
				}
			},
			// 公用屏幕操作方法
			mouseOption(type, x, y, text) {
				let params = this.params;
				let move_type = 1;
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
					let w_b = x / this.imgWidth;
					let h_b = y / this.imgHeight;
					let nowX = this.imgWidth * w_b * (375 / this.imgWidth);
					let nowY = this.imgHeight * h_b * (667 / this.imgHeight);
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
				// 点击点赋值
				startX = e.changedTouches[0].clientX - phaseX;
				startY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("down", startX, startY, this.phoneIp);
			},
			screenMove(e) {
				e.preventDefault();
				// 滑动点赋值
				startX = e.changedTouches[0].clientX - phaseX;
				startY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("move", startX, startY, this.phoneIp);
			},
			screenEnd(e) {
				// 弹起点赋值
				endX = e.changedTouches[0].clientX - phaseX;
				endY = e.changedTouches[0].clientY - phaseY;
				this.mouseOption("up", startX, startY, this.phoneIp);
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
</style>
