<template>
	<view class="container">
		<!-- 空白页 -->
		<!-- 		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view> -->
		<view>
			<view class="phone-list">
				<block v-for="(item, index) in phoneList" :key="item.id">
					<view class="phone-item" :class="{'b-b': index !== phoneList.length-1}">
						<!-- v-if="item && item.show" -->
						<view class="image-wrapper">
							<image :src="phoneSreen(item)" @click="imgPreview(item)"></image>
						</view>
						<view class="item-right">
							<text class="id">云游戏ID：{{item.id}}</text>
							<text class="game-name">游戏名称：{{item.game.game_name}}</text>
							<text class="phone-remarks">设备备注：{{item.phone_remarks}}</text>
							<text class="expiration-date">到期时间：<text>{{item.expiration_date}}</text></text>
							<u-button class="add-timer" type="warning" plain size="mini" @click="addTimer(item)">
								<u-icon class="phone-add-icon" name="red-packet-fill"></u-icon>
								<text :style="{position:'relative',top:isWeixin ? '2rpx' : '1rpx'}">看广告,增加时长</text>
							</u-button>
							<view class="item-right-edit">
								<u-button type="primary" plain size="medium"
									@click="updremarksOpen(item)">
									<u-icon name="edit-pen"></u-icon><text
										:style="{position:'relative',top:isWeixin ? '4rpx' : '0'}">编辑备注</text>
								</u-button>
								<u-button type="success" plain size="medium"
									@click="getIntoOperate(item)">
									<u-icon name="home-fill"></u-icon><text
										:style="{position:'relative',top:isWeixin ? '4rpx' : '0'}">进入操作</text>
								</u-button>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				isWeixin: false,
				cartList: [],
				phoneList: [{
					id: 1,
					game: {
						game_name: "天龙八部"
					},
					expiration_date: "2024-03-25"
				}, ]
			};
		},
		onLoad() {
			this.loadData();
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData() {
				let list = await this.$api.json('cartList');
				let cartList = list.map(item => {
					item.checked = true;
					return item;
				});
				this.cartList = cartList;
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			// 渲染屏幕
			phoneSreen(row) {
				const imgUrl = "https://d-image.i4.cn/i4web/image/upload/20200820/1597890144433014185.jpg"
				return imgUrl
			},
			// 图片预览
			imgPreview() {

			},
			// 编辑备注
			updRemarksOpen() {

			},
			// 进入操作
			getIntoOperate() {
				this.$api.msg('正在进入操作', "loading");
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/operate/operate'
					})
				}, 1000)
			}
		}
	}
</script>

<style lang='scss'>
	@import "@/static/css/phone.scss";
</style>
