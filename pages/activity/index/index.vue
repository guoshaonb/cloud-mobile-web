<template>
	<view>
		<template>
			<u-card :title="title" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="consult u-body-item u-flex u-border-bottom u-col-between u-p-t-0" v-for="(room, key) in roomList"
					 :key="room.roomId" @click="onSelectRoom(room)">
						<view class="u-body-item-title u-line-3"><text class="consult-tittop">[{{room.name}}]</text>{{room.content}}
							<text class="consult-label animat">☛{{room.linktit}}</text>
						</view>
						<image :src="room.imgUrl" mode="aspectFill"></image>
					</view>
				</view>
			</u-card>
		</template>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		formatDateTime, imgUrl
	} from '@/utils/common.js'
	
	// 在页面中定义插屏广告
	let interstitialAd = null
	export default {
		data() {
			return {
				roomList: [{
						roomId: "001",
						name: "天天幸运大轮盘",
						content: "参与幸运大轮盘,即可获得大量奖励哦,去试下你的欧皇之气吧！",
						linktit: "点我进入",
						imgUrl: "http://guoshao-service.test.upcdn.net/file-path/images/extract-iphone14.png"
					},
				],
				nickname: '',
				selectedAvatar: {
					imgUrl: '',
					id: ''
				},
				selectedRoom: {
					roomId: null,
					roomName: '',
				},
				//内容属性
				title: '参与活动,可领取大量奖励哦！',
				subTitle: '',
				thumb: 'http://guoshao-service.test.upcdn.net/file-path/images/activity.png',
				isShow: false
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(){
	
		},
		onShow() {
			Object.assign(this.$data, this.$options.data());
			setTimeout(() => {
				// 在适合的场景显示插屏广告
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}, 2000)
		},
		methods: {
			//弹出帮助窗口
			showOption() {
				if (this.isShow) {
					this.isShow = false
					setTimeout(() => {
						this.isShow = true
					}, 200)
				} else {
					this.isShow = true
				}
			},
			onInputUserName(event) { // 输入用户名
				this.nickname = event.target.value;
			},
			onSelectAvatar(avtar) { //选择头像
				this.selectedAvatar = avtar;
			},
			onSelectRoom(room) { 
				uni.navigateTo({
					url: "/pages/activity/lottery/lottery"
				})
			}
		}
	}
</script>

<style>
	@import "@/static/css/chat_index.css";
</style>
