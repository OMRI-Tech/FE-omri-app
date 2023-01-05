
export function SET_USER (state, usuario) {
  state.usuario = usuario
}

export function SET_OLIMPICO (state, obj){
  state.olimpico = obj.levels
  state.level = obj.level
  console.log('mutation set olimpico', state.olimpico, state.level)
}

export function CLEAR_USER (state) {
  state.olimpico = null
  state.usuario = null
  state.statusPago = null
}

export function STEP_ACTUAL (state, step) {
  state.stepActual = step
}

export function SET_STATUS_PAGO (state, pago) {
  state.statusPago = pago
}
