<script setup>
import { ref, onBeforeUnmount } from 'vue';
import SidebarItem from './SidebarItem.vue';

const props = defineProps({
	items: {
		type: Array,
		required: true
	}
});

const isDragging = ref(false);
const menuWidth = ref(200);
const initialMouseX = ref(0);
const initialMenuWidth = ref(0);

function updateMenuWidth(newWidth){
	menuWidth.value = newWidth;
};

function handleDrag(e){
	if (isDragging.value) {
		const deltaX = e.clientX - initialMouseX.value;
		const newWidth = initialMenuWidth.value + deltaX;
		updateMenuWidth(newWidth);
	}
};

function stopDrag() {
	isDragging.value = false;
	document.removeEventListener('mousemove', handleDrag);
	document.removeEventListener('mouseup', stopDrag);
};

function startDragging(e){
	isDragging.value = true;
	initialMouseX.value = e.clientX;
	initialMenuWidth.value = menuWidth.value;

	document.addEventListener('mousemove', handleDrag);
	document.addEventListener('mouseup', stopDrag);
};

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', handleDrag);
	document.removeEventListener('mouseup', stopDrag);
});
</script>


<template>
	<div class="left-menu">
		<div :style="{ width: menuWidth + 'px' }">
			<div class="left-navbar-items-wrapper">
				<SidebarItem
					v-for="item in items"
					:key="item.id"
					:item="item"
				/>
			</div>
		</div>
		<div
			ref="resizer"
			class="resizer-rod"
			@mousedown="startDragging"
		>
			<div class="resizer-rod-collapse-arrow"></div>
			<div class="resizer-rod-line"></div>
		</div>
	</div>
</template>



<style>
.left-menu {
	--sidebar-color: #1b2733;
	background: var(--sidebar-color) !important;
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	position: relative;
}

.left-navbar-items-wrapper {
	padding: 8px;
}

.resizer-rod {
	user-select: none;
	position: absolute;
	inset-block: 0px;
	inset-inline-start: 100%;
	height: 100%;
	width: 10px;
	cursor: col-resize;
	z-index: 99999;
}

.resizer-rod:after{
	content: "";
	width: 4px;
	height: 24px;
	border-radius: 4px;
	/* background-color: #32485c; */
	background-color: dodgerblue;
	position: absolute;
	left: 4px;
	top: 50%;
	transform: translateY(-50%);
	user-select: none;
}

.resizer-rod-line {
	display: block;
	width: 2px;
	height: 100%;
	transition: 250ms;
	user-select: none;
}

.resizer-rod:hover .resizer-rod-line {
	background: dodgerblue;
}
</style>