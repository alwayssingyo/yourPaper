<template>

	<!-- 카드 앞면 --> 
	<div class="card front"		
		:class="[post.theme ? post.theme : randomThemeF(), post.font]"
	>
		<!-- particle: 파티클 명, mode: write / paper -->
		<ParticleContainer v-if="post.particle" :particle="post.particle" mode="paper"/>

		<div class="front_title">{{ post.title }}</div>
		<div class="noti" :class="{badge : !post.readYn}"></div> 
	</div>
	<!-- 카드 뒷면 --> 
	<div class="card back"
		:class="[post.theme ? post.theme : randomThemeB(), post.font]"
	>
		<div class="card_value custom_scroll">
			<span>{{ post.detail }}</span>
		</div>
		<div class="card_bottom">
			<div class="card_writer"><span>From.</span> {{ post.writerName }}</div>
			<div class="card_date">{{ post.date.slice(0,10) }}</div>
		</div>
		<button class="card_delete" @click="$emit('deleteCard', post._id)"></button>
	</div>

</template>

<script>
import { custom, apiUrl } from '../utils/data.js';
import ParticleContainer from './Particle/ParticleContainer.vue';

let themeIndex = '';

export default {
  name: 'Paper',
	emits: ['deleteCard'],
  props: {
    post: Object
  },
  data() {
    return {
      theme: [...custom.theme, ...custom.background],
    }
  },
	components: {
		ParticleContainer,
	},
  methods: {
		//랜덤테마 생성
		randomThemeF(){
			themeIndex = Math.floor(Math.random() * this.theme.length);
			return this.theme[themeIndex];
		},
		randomThemeB() {
			return this.theme[themeIndex];
		},
  }
}
</script>

<style scoped lang="scss">

  @include theme;
  @include background;
  @include particle;
  @include font;
	@include scroll;
	.card {
		overflow: hidden;
		position: relative;
		transition: transform 0.6s;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		min-height: 500px;
		max-height: 500px;
		border-radius: 8px;
		overflow: hidden;
		&.front {
			display: inline-block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transform: rotateY(0deg);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			z-index: 2;
		}
		&.back {
			display: inline-block;
			width: 100%;
			height: 100%;
			padding: 24px 24px 100px 24px;
			transform: rotateY(180deg);
			z-index: -1;
			font-size: 18px;
			* {
				color: inherit;
			}
		}
		.inner {
			position: relative;
			widows: 100%;
			height: 100%;
		}
	}
	.item {
		&.is-rotate {
      .card.front {
        transform: rotateY(-180deg);
        z-index: -1;
      }
      .card.back {
        transform: rotateY(0deg);
        z-index: 2;
      }
		}
	}
	.front_title {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		padding: 0 15px;
		font-size: 21px;
		text-align: center;
		z-index: 3;
		color: inherit;
	}
	.badge {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 18px;
		height: 18px;
		border-radius: 100%;
		background-color: rgb(255, 85, 0);
		z-index: 2;
	}
	.card_value {
		display: inline-block;
		width: 100%;
		height: 100%;
		min-height: 320px;
		max-height: 320px;
		overflow-y: auto;
		span {
			overflow-y: hidden;
			white-space: pre-line;
		}
	}
	.card_bottom {
		position: absolute;
		bottom: 24px;
		right: 24px;
		text-align: right;
	}
	.card_writer {
		font-size: 18px;
		span {
			font-weight: bold;
		}
	}
	.card_date {
		margin-top: 8px;
	}
	.card_delete {
		position: absolute;
		bottom: 20px;
		left: 20px;
		width: 24px;
		height: 30px;
    background: url(../assets/img/ico-delete.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
		z-index: 99;
	}

</style>
