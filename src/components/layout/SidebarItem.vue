<template>
	<div>
		<router-link
			:class="['sidebar-item', 'text-overflow', isActive(item.path) ? 'active' : '']"
			:to="item.path"
		>
			{{ item.name }}
		</router-link>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
	item: {
		type: Object,
		required: true
	}
});

const route = useRoute();

const isActive = (path) => {
	return route.path === path;
};
</script>

<style scoped lang="scss">
.sidebar-item {
	border-radius: 4px;
	cursor: pointer;
	margin-bottom: 2px;
	padding: 6px 8px;
	color: #fff;
	text-decoration: none;
	width: 100%;
	height: 100%;
	display: block;
	box-sizing: border-box;

	&:hover {
		background: #263747;
	}
	&.active{
		background: #32485c;
	}
}
</style>