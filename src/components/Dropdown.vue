<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { throttle } from '@/shared/utils/functions.js'

const props = defineProps({
  options: Array,
  value: [String, Number, null],
  searchable: Boolean,
  searchValue: String,
  selectRef: Object,
})

const emit = defineEmits(['select', 'close', 'update:searchValue'])

const containerRef = ref(null)
const optionsRef = ref(null)
const openAbove = ref(false)
const inputRef = ref(null)

function handleResize() {
  
  const dropdownRect = containerRef.value?.getBoundingClientRect()
  const selectRect = props.selectRef?.getBoundingClientRect()

  console.log('resize called', props.selectRef)
  console.log('dropdownRect', dropdownRect)

  if (!dropdownRect || !selectRect) return

  openAbove.value = window.innerHeight - selectRect.bottom < dropdownRect.height
}

const throttledResize = throttle(handleResize, 150)

onMounted(async () => {
  await nextTick()
  handleResize()

  
  if (props.searchable) {
    inputRef?.value?.focus()
  } else {
    optionsRef.value?.focus()
  }

  window.addEventListener('resize', throttledResize)
  window.addEventListener('scroll', throttledResize, { passive: true })
})


onUnmounted(() => {
  window.removeEventListener('resize', throttledResize)
  window.removeEventListener('scroll', throttledResize)
})

function handleEnter(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    const active = optionsRef.value.querySelector('.active-option')
    if (active) {
      const val = active.dataset.selectValue
      const text = active.dataset.selectText
      emit('select', val, text)
      emit('close')
    }
  }
}

function handleArrowKeys(e) {
  const $options = optionsRef.value
  const $active = $options.querySelector('.active-option')
  const $selected = $options.querySelector('.selected-option')

  const cycleNext = (el, dir) => {
    if (!el) return null
    if (dir === 'down') {
      return el.nextElementSibling || $options.firstElementChild
    } else {
      return el.previousElementSibling || $options.lastElementChild
    }
  }

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()

    let next
    if (!$active && $selected) {
      next = cycleNext($selected, e.key === 'ArrowDown' ? 'down' : 'up')
    } else if (!$active) {
      next = e.key === 'ArrowDown' ? $options.firstElementChild : $options.lastElementChild
    } else {
      $active.classList.remove('active-option')
      next = cycleNext($active, e.key === 'ArrowDown' ? 'down' : 'up')
    }

    next?.classList.add('active-option')
  }
}

function handleKeyDown(e) {
  handleArrowKeys(e)
  handleEnter(e)
}

function selectOption(option) {
  emit('select', option.value, option.text)
  emit('close')
}

const filteredOptions = computed(() => {
  if (props.searchable && props.searchValue) {
    return props.options.filter((opt) =>
      opt.text.toLowerCase().includes(props.searchValue.toLowerCase())
    )
  }
  return props.options
})
</script>

<template>
  <div
    ref="containerRef"
    class="styled-dropdown"
    :style="{ [openAbove ? 'bottom' : 'top']: '100%' }"
  >
    <input
      v-if="props.searchable"
      ref="inputRef"
      class="dropdown-input"
      type="text"
      placeholder="search"
      :value="props.searchValue"
      @input="e => emit('update:searchValue', e.target.value)"
      @keydown="handleKeyDown"
    />
    <div
      ref="optionsRef"
      class="options"
      tabindex="0"
      @keydown="handleKeyDown"
    >
      <div
        v-for="(option, index) in filteredOptions"
        :key="index"
        class="option"
        :class="{
          'selected-option': props.value === option.value,
          'active-option': props.searchable && index === 0
        }"
        :data-select-value="option.value"
        :data-select-text="option.text"
        @click="() => selectOption(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">

$active-option-color: limegreen;
$border-focus: limegreen;


.styled-dropdown {
  color: $active-option-color;
  font-weight: 500;
  position: absolute;
  min-width: 100%;
  background: #2c2c2c;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 10px 0px;
  outline: none;
  z-index: 2;
}

.options {
  outline: none;
}

.option {
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #3b3b3b;
  }

  &.active-option {
    background: #3b3b3b;
  }

  &.selected-option {
    background: #444444;
  }

  &.active-option:hover,
  &.active-option.selected-option {
    background: #545454;
  }

  &.selected-option:hover {
    background: #545454;
  }
}

.dropdown-input {
  width: 100%;
  border: 1px solid transparent;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: rgb(18 18 18);

  &:focus {
    outline: none;
    border: 1px solid $border-focus;
    background-clip: padding-box;
  }
}
</style>