<script setup>
import { ref, computed, watch } from 'vue'
import Dropdown from './Dropdown.vue'
import useOutsideClick from '@/composables/useOutsideClick'
// import Icon from '@/shared/components/Icon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue';
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue';

const props = defineProps({
  label: String,
  options: Array,
  searchable: Boolean,
  // defaultValue: Number,
  // onChange: Function,
})

const emit = defineEmits([
  'select:updated',
]);

const isDropdownOpen = ref(false)
const value = ref(null)
const text = ref(props.label ?? "")
const searchValue = ref('')

const selectRef = ref(null)
// const inputRef = ref(null)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function clearSelection() {
  console.log('clear selection')
  value.value = null
  text.value = props.label;
  isDropdownOpen.value = false
  searchValue.value = ''
  // props.onChange(null)
  emit('select:updated', null);
}

function handleSelect(newVal, newText) {
  value.value = newVal
  text.value = newText;
  emit('select:updated', newVal)
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    toggleDropdown()
  }
}

function handleClearKeyDown(event) {
  if (event.key === 'Enter') {
    clearSelection()
  }
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function updateSearchValue(val){
    searchValue.value = val
}

useOutsideClick(selectRef, isDropdownOpen, () => {
  isDropdownOpen.value = false
  searchValue.value = ''
})


// watch(() => props.modelValue, (newVal) => {
//   value.value = newVal

//   const foundOption = props.options?.find(opt => opt.value === newVal)
//   text.value = foundOption ? foundOption.text : props.label ?? ''
// })


</script>

<template>
  <div
    ref="selectRef"
    :class="['styled-select', { 'is-value-selected': value, 'is-open': isDropdownOpen }]"
  >
    <div
      class="value-container"
      tabindex="0"
      @click="toggleDropdown"
      @keydown="handleKeyDown"
    >
      <span class="styled-label">{{ text }}</span>
      <span v-if="!value" class="clear-icon">
        <!-- <Icon type="down-arrow" width="14" class="arrow-icon" /> -->
        <DownArrowIcon class="arrow-icon" />
      </span>
    </div>

    <span
      v-if="value"
      class="clear-icon"
      tabindex="0"
      @click="clearSelection"
      @keydown="handleClearKeyDown"
    >
      <!-- <Icon type="close" width="14" /> -->
      <CloseIcon />
    </span>

    <Dropdown
      v-if="isDropdownOpen"
      :options="props.options"
      :value="value"
      :searchable="props.searchable"
      :searchValue="searchValue"
      :selectRef="selectRef"
      
      @select="handleSelect"
      @close="closeDropdown"
      @update:searchValue="updateSearchValue"
    />
  </div>
</template>

<style scoped lang="scss">

$border-color: rgba(222, 222, 227, 0.4);
$active-option-color: limegreen;
$border-focus: limegreen;
$border-focus-width: 2px;

// Styles
.styled-select {
  position: relative;

  &.is-value-selected .styled-label {
    color: $active-option-color;
  }

  &.is-open .arrow-icon {
    transform: rotate(180deg);
  }
}

.styled-label {
  color: #fff;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clear-icon {
  position: absolute;
  right: 6px;
  top: 50%;
  cursor: pointer;

  width: 24px;
  height: 24px;
  border-radius: 4px;
  transform: translateY(-50%);

  &:hover{
      background-color: rgba(83, 83, 95, 0.48);
  }
  &:active{
      background-color: rgba(83, 83, 95, 0.7);
  }
}

.value-container {
  height: 34px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  // padding: 10px 38px 10px 20px;
  padding: 4px 38px 4px 10px;
  white-space: nowrap;
  cursor: pointer;

  border: 1px solid transparent;
  box-shadow: inset 0 0 0 1px $border-color;
  user-select: none;
  background-color: transparent;
  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;

  &:hover {
    outline: none;
    box-shadow: inset 0 0 0 $border-focus-width $border-color;
    border: 1px solid $border-color;
    background-clip: padding-box;
    background-color: rgba(1, 1, 1, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px $border-focus, inset 0 0 0 $border-focus-width $border-focus;
    border: 1px solid $border-focus;
    background-clip: padding-box;
    background-color: rgba(1, 1, 1, 0.2);
  }
}
</style>