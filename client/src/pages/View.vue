<template>
<Loading v-show="isLoading"/>
	<div class="detail_inner" v-show="!isLoading">

		<div class="detail_header">
			<div class="detail_title">
				<span>{{ getUserInfo($route.params.id, Info.name) }}</span> 님에게 전달된 편지를 확인해보세요!
			</div>
			<router-link to="/"><div class="detail_link"></div></router-link>
		</div>

		<div class="list">
			<div v-for="( post, i ) in posts" 
				:key="i" 
				class="item"
				@click="rotate($event, post.readYn, post._id, (this.$route.path).slice(-7))"
			>
  			<Paper :post="post" @deleteCard="onClickDelete($event)"/>
			</div>
		</div>

		<div class="list_empty" :class="{active : noData}">
			<span class="text">전달된 편지가</span>
			<span class="text">없습니다 T.T</span>
			<router-link class="link" :to="{path: `/write/${ $route.params.id }`}">
				<div class="link_text">{{ getUserInfo($route.params.id, Info.name) }}님에게 편지 쓰러 가기</div>
			</router-link >
		</div>

		<Modal
			v-if="isModal"
			:isModal="isModal"
			:onModalHandler="onModalHandler"
			:message="['삭제하시겠습니까?']"
			:deleteModal='true'
			@deleteCard='deleteCard'
		 />

	</div>
</template>

<script>
import axios from 'axios';
import { gsap } from "gsap";
import { apiUrl } from '../utils/data.js';
import { mapState } from 'vuex';
import mixin from '../utils/mixin'
import Paper from '../components/Paper.vue';
import Loading from '../components/Loading.vue';
import Modal from '../components/Modal.vue';
import { Info } from '../utils/data.js'

export default {
	name : 'ViewPage',
  mixins: [mixin],
  components: {
    Paper,
		Loading,
		Modal,
  },
	data(){
		return {
			posts : [],
			Info: Info,
      isLoading: true,
			noData: false,
			isModal: false,
			deleteId: '',
		}
	},
  methods: {
		getItems(){
			axios.get(apiUrl + this.$route.path)
      .then( results => {
        this.posts = results.data;

				if( this.posts.length === 0 ){
					this.noData = true;

					gsap.to(".list_empty .text", {
						y: 10,
						duration: 0.5,
						yoyo: true,
						repeat: -1,
					});
				}else {
					//gsap 애니메이션
					window.dispatchEvent(new Event('resize'));

					gsap.killTweensOf('.item'); 

					this.$nextTick(function () {

						const items = gsap.utils.toArray('.item');

						items.forEach( el => {
							gsap.timeline({ 
								scrollTrigger:{
									trigger: el,
									start: "top bottom",
									end: "center bottom",
									scrub: 1.5,
								},
							})
							.fromTo(el, { y: 80, opacity: 0 }, { y: 0, opacity: 1 });
						});
					})
				}
      })
			.catch((err) => console.log('Error!', err));
		},
		rotate(e, readYn, id, memberId) {
			const target = e.currentTarget;
			if( target.classList.contains('is-rotate') ){
				target.classList.remove('is-rotate');
			}else {
				target.classList.add('is-rotate');
			}

			if( !readYn ){
				const noti = target.querySelector('.noti');
				if( noti.classList.contains('badge') ){
					noti.classList.remove('badge');
				}

				axios({
					url: apiUrl + '/update/' + id,
					method: "PUT",
					data: {
						memberId: memberId,
					},
				})
				.then( results => {
				})
			}
		},
		//카드 삭제
		deleteCard(){
			axios.delete(apiUrl + '/delete/' + this.deleteId)
			.then((res) => {
			})
			.catch((err) => console.log(err));

			setTimeout(() => {
				this.getItems();
			}, 500)
		},
    onClickDelete(id) {
      this.isModal = true;
			this.deleteId = id;
    },
    onModalHandler(isOpen, value) {
      this.isModal = isOpen;
    },
	},
  computed: {
    ...mapState(['peopleInfoList', 'sheetHeaderList']),
  },
  created (){
		this.getItems();
  },
	mounted() {
    if (this.peopleInfoList.length > 0) {
      this.isLoading = false;
    }
	},
  watch: {
    peopleInfoList(value) {
      this.isLoading = false;
    },
  },
}
</script>

<style scoped lang="scss">
	.detail_inner {
		padding: 30px 0;
	}
	.detail_header {
		position: relative;
		width: 100%;
	}
	.detail_title {
		padding-right: 30px;
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 20px;
		span {
			color: #ff627c;
		}
	}
	.detail_link {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		width: 24px;
		height: 24px;
		background: url(../assets/img/ico-home.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		cursor: pointer;
		z-index: 1;
	}
	.list {
		font-size: 0;
		margin: 0 -10px;
		padding: 30px 0;
	}
	.item {
		display: inline-block;
		width: calc(33.333% - 20px);
		position: relative;
		margin: 10px;
		border-radius: 8px;
		font-size: 0;
		vertical-align: top;
		position: relative;
		-webkit-perspective: 1000px;
		perspective: 1000px;
		cursor: pointer;
	}
  .list_empty {
		display: none;
    margin: 180px 0;
    text-align: center;
    font-size: 20px;
		&.active {
			display: block;
		}
		.text {
			display: block;
			transform: skew(-10deg);
			min-width: 10px;
			min-height: 10px;
			position: relative;
  		font-size: 42px;
			font-weight: bold;
			line-height: 47px;
			letter-spacing: 2px;
		}
		.link {
			display: inline-block;
			margin-top: 40px;
    	transform: skew(-10deg);
			.link_text {
				color: #000;
				transition: 0.3s;
				&:hover {
					transform: scale(1.2);
				}
			}
		}
  }

	@include tablet {
		.item {
			width: 100%;
			margin: 10px 0;
		}
	}
</style>
