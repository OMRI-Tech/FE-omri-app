export function lessons (state) {
  return state
}

export const lessonByRoute = (state) => (route) => {
  const crudSL = route.lesson.toLowerCase().split('-')
  const theme = route.theme
  const subTheme = crudSL[0]
  const lesson = parseInt(crudSL[1])

  console.groupCollapsed('Datos para entrar a la lección')
  console.log('Tema -> ', route.theme)
  console.log('SubTema -> ', crudSL[0])
  console.log('Lección -> ', crudSL[1])
  console.groupEnd()

  const component = state[theme][subTheme].length >= lesson - 1 ? state[theme][subTheme][lesson-1] : undefined

  return component !== undefined ? component : state.notFound
}
