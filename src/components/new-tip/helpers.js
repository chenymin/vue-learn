export function removeElement (el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
    el.parentNode.removeChild(el)
  }
}

export function createAbsoluteElement (el) {
  const root = document.createElement('div')
  root.style.position = 'absolute'
  root.style.left = '0px'
  root.style.top = '0px'
  const wrapper = document.createElement('div')
  root.appendChild(wrapper)
  wrapper.appendChild(el)
  document.body.appendChild(root)
  return root
}
