import { LocalStorage } from 'quasar'

export function isLogged (state) {
  return LocalStorage.getItem('user_logged') !== null
}

export function user (state) {
  return LocalStorage.getItem('user_logged')
}

export function avatar (state) {
  return LocalStorage.getItem('avatar')
}

export function vidas (state) {
  return LocalStorage.getItem('vidas')
}

export function dameProgreso() {
  return LocalStorage.getItem('niveles')
}

export function dameNiveles () {
  const niveles = [
    [
      {
        step: 1,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/441107206?h=924c0bb369&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Introducción a la OMRI'
      },
      {
        step: 2,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/729802210?h=22ac93c185&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Las computadoras'
      },
      {
        step: 3,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/770141338?h=d2b120479f&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Archivos y carpetas'
      },
      {
        step: 4,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/770141362?h=6811575b82&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Atajos del teclado'
      }
    ]
  ]
  return niveles;
}
