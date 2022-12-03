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

export function dameProgreso(state) {
  return state.olimpico
}

export function dameStepActual(state) {
  return state.stepActual
}

export function inscripcionPagada(state) {
  if (state.statusPago == null) {
    return false;
  } else {
    if (state.statusPago.cargos && state.statusPago.cargos.length) {
      if(state.statusPago.cargos[0].pagado == 1){
        return true;
      }
      if (state.statusPago.cargos[0].pagos && state.statusPago.cargos[0].pagos.length){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

export function dameDatosDePago(state) {
  return state.statusPago;
}

export function dameNiveles () {
  const nivelesPrimaria = [
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
      },
      {
        step: 5,
        tipo: 'leccion',
        icon: 'triangle',
        lesson: '/lessons/karel/1/1'
      },
      {
        step: 6,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/457622242?h=39f145bc64&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: '¿Qué es Karelbug?'
      },
      {
        step: 7,
        tipo: 'leccion',
        icon: 'triangle',
        lesson: '/lessons/karel/1/2'
      },
      {
        step: 8,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/457622403?h=a34a7c6236&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: '¿Cómo ingresar a Karelbug?'
      }
    ]
  ]
  if(LocalStorage.getItem('user_logged').posible_paquete.paquete_id == 2){ // secun
    const nivelesSecundaria = [
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
        },
        {
          step: 5,
          tipo: 'leccion',
          icon: 'triangle',
          lesson: '/lessons/karel/1/1'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/457481823?h=1682a99a83&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: '¿Qué es Karelbug?'
        },
        {
          step: 7,
          tipo: 'leccion',
          icon: 'triangle',
          lesson: '/lessons/karel/1/2'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/457487301?h=45957d7b38&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: '¿Cómo ingresar a Karelbug?'
        }
      ]
    ]
    return nivelesSecundaria
  }
  if(LocalStorage.getItem('user_logged').posible_paquete.paquete_id == 3){ // prepa
    const nivelesPrepa = [
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
        },
        {
          step: 5,
          tipo: 'leccion',
          icon: 'triangle',
          lesson: '/lessons/c/1/1'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/440799692?h=6f2b2d3536&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Introducción a la OMRI'
        },
        {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/729830428?h=c822fc38de&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Tutorial de Blockly'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/457931220?h=a4c9228a91&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Variables'
        }
      ]
    ]
    return nivelesPrepa
  }

  return nivelesPrimaria;
}
