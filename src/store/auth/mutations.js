
export function SET_USER (state, usuario) {
  console.log('mutacion set_user ', usuario)
  state.usuario = usuario
}

export function SET_OLIMPICO (state, olimpico){
  console.log('mutation set_olimpico', olimpico)
  state.olimpico = olimpico
  console.log(state.olimpico)
}

export function CLEAR_USER (state) {
  state.olimpico = null
  state.usuario = null
  console.log('mutacion clear_user', state.olimpico,  state.olimpico && state.olimpico.value)
}

export function STEP_ACTUAL (state, step) {
  state.stepActual = step
}
