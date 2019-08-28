import { Message } from 'element-ui'
export function ErrorMessage (msg) {
  Message({
    message: msg,
    type: 'error'
  })
}
export function InfoMessage (msg) {
  Message({
    message: msg,
    type: 'info'
  })
}
