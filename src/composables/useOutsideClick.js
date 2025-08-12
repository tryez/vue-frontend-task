import { onMounted, onBeforeUnmount } from 'vue'

export default function useOutsideClick(refEl, isActiveRef, callback) {
  let mouseDownTarget = null

  const onMouseDown = (e) => {
    mouseDownTarget = e.target
  }

  const onMouseUp = (e) => {
    const el = refEl.value
    if (!el || !isActiveRef.value) return

    if (
      !el.contains(e.target) &&
      !el.contains(mouseDownTarget) &&
      e.button === 0
    ) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
  })
}