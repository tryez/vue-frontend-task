<script setup>
import { inject, computed } from 'vue';

const props = defineProps({ statusId: Number });
const statuses = inject('statuses');

const status = computed(() => statuses[props.statusId]);
</script>



<template>
    <span class="status-badge" :style="{backgroundColor: status.color}">
        {{ status.name }}
    </span>
</template>


<style scoped>
.status-badge{
    border-radius: 4px;
    padding: 0px 4px;
    white-space: nowrap;
    color: #fff;
}
</style>