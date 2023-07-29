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

export function dameDatosNivel(state) {
  return state.level
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
    ], [
      {
        step: 1,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/457622403?h=5444647cb6&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: '¿Cómo está dividida la página?'
      },
      {
        step: 2,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/462381780?h=1c04bd6056&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Cómo crear una cuenta en OmegaUp.com'
      }, {
        step: 3,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/465533480?h=059e5ec2b7&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Cómo hacer envios en OmegaUp - Karelbug'
      }, {
        step: 4,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/457623262?h=30d13f0ca3&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Ubicando a Karel'
      }, {
        step: 5,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/461004718?h=bb5e111f65&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Elementos del mundo de karel'
      }, {
        step: 6,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/461531132?h=2649f6f0b6&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Creando y guardando mundos'
      }, {
        step: 7,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/461111162?h=fdf4509619&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Acciones de karel con Karen'
      }, {
        step: 8,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/462458829?h=a787f3d0ec&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Sensores de paredes'
      }
      // https://vimeo.com/464449540/bb1d6fb9c5 	Sensores de zumbadores
      // https://vimeo.com/464450253/0f7e51e463 	Decisiones
      // https://vimeo.com/464035466/5d9019ba80 	Bucle: iterate
      // ////  vt.temario_id>=46 and vt.temario_id <=46
    ], [
      {
        step: 1,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/464449540?h=bb1d6fb9c5&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Sensores de zumbadores'
      },
      {
        step: 2,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/464450253?h=0f7e51e463&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Decisiones'
      },
      {
        step: 3,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/464035466?h=5d9019ba80&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Bucle: iterate'
      },
      {
        step: 4,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/464057914?h=3812eae77c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Bucle: while'
      },
      {
        step: 5,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/467745841?h=05feb6b7ac&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'La receta para resolver problemas'
      },
      {
        step: 6,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/467748233?h=b0ea28a733&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Paso 1 y 2: Leer y hacer casos'
      },
      {
        step: 7,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/467752068?h=527e9e50fb&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Paso 3: Idea de solución'
      },
      {
        step: 8,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/467755446?h=35fc064241&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Paso 4: Programar solución'
      }
    ], [
      {
        step: 1,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/472899066?h=a9f92e45e4&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Definir funciones'
      }, {
        step: 2,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/472900406?h=80363bbaa8&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Funciones usando sensores de brújula'
      }, {
        step: 3,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/473704553?h=2c79679369&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Funciones: comeTodo y dejaTodo'
      }, {
        step: 4,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/473705728?h=8158885906&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Funciones: caminaConGasolina y caminaEnZumbadores'
      }, {
        step: 5,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/473710786?h=cdf6881de6&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Funciones: aTope y rectangulo.'
      }, {
        step: 6,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/473701788?h=e7ec3f5a43&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Pila de llamadas'
      }, {
        step: 7,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/473727030?h=caf5b6dfdb&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Recursión en la vida cotidiana'
      }, {
        step: 8,
        tipo: 'video',
        icon: 'hexa',
        url: 'https://player.vimeo.com/video/474102515?h=f787137b94&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        title: 'Freno de la recursión'
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
      ], [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/457494524?h=b52e3c1d89&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: '¿Cómo está dividida la página?'
        }, {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/461530650?h=c39a7fd1cc&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Elementos del mundo'
        }, {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/461531132?h=2649f6f0b6&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Creando y guardando mundos'
        }, {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/461423439?h=0abc62997c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Acciones de karel'
        },
        {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/462381780?h=1c04bd6056&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Cómo crear una cuenta en OmegaUp.com'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/465533480?h=059e5ec2b7&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Cómo hacer envios en OmegaUp - Karelbug'
        },
        {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/462202282?h=52c37d1731&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Sensores'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/464022609?h=cabf47834e&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Condicionales'
        }
        // https://vimeo.com/464035466/5d9019ba80 	Bucle: iterate
        // https://vimeo.com/464057914/3812eae77c 	Bucle: while
        // vt.temario_id>=47 and vt.temario_id <=48
      ], [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/464035466?h=5d9019ba80&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Bucle: iterate'
        },
        {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/464057914?h=3812eae77c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Bucle: while'
        },
        {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/470793965?h=8360a7697e&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones | Función aTope'
        },
        {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/470816519?h=5b4d3d7357&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones con orientaciones'
        },
        {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/470837732?h=9c2a47e1aa&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones con zumbadores'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/463283054?h=58eaeb85fd&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Método de resolución de problemas'
        },
        {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/466915115?h=5886bbb31c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Análisis: Un beeper en casa'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473701788?h=e7ec3f5a43&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Pila de llamadas'
        }
      ], [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/463281084?h=d76b720d22&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Cómo crear cuenta en Karelotitlán y hacer envíos'
        }, {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473705728?h=8158885906&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones: caminaConGasolina y caminaEnZumbadores'
        }, {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473710786?h=cdf6881de6&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones: aTope y rectangulo.'
        }, {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473727030?h=caf5b6dfdb&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Recursión en la vida cotidiana'
        }, {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/474102515?h=f787137b94&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Freno de la recursión'
        }, {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/474107788?h=93d1b8890b&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Contar casillas hasta llegar a pared'
        }, {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/479353725?h=3bbf437abe&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Usando el freno de la recursión'
        }, {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/479375776?h=ce96efab5f&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Sacando área sumando'
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
          title: 'Introducción a Blockly'
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
      ],
      [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/462381780?h=1c04bd6056&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Cómo crear una cuenta en OmegaUp.com'
        },
        {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/441074309?h=43ef2ba1f0&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Lectura y escritura'
        },
        {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/459545471?h=05f455e567&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Introducción a Aritmética en Variables'
        },
        {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/441093105?h=cc10795165&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Aritmética en Variables'
        },
        {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/460994439?h=7d875d8136&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Condicionales - Parte 1 de 2'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/441127390?h=270dc59d47&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Condicionales - Parte 2 de 2'
        },
        {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/461983717?h=dc5d1b8860&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Cómo hacer envios en OmegaUp - Solo salida'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/450132660?h=0d0a29ba34&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Método de resolución de problemas'
        }
        /// se tienen vt.temario_id>=38 and vt.temario_id <=41
        // https://vimeo.com/450137466/3d70ff4965 	Lectura - Pizzas
        // https://vimeo.com/450180467/a0245e6d9e 	Análisis - Pizzas
      ], [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/450137466?h=3d70ff4965&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Lectura - Pizzas'
        },
        {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/450180467?h=a0245e6d9e&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Análisis - Pizzas'
        },
        {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/450181011?h=e30b46f817&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Resolución - Pizzas'
        },
        {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/439572603?h=b7af36a0a8&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'While'
        },
        {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/450131254?h=2e379bf1eb&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Resolución de problema acomoda el número'
        },
        {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/471844010?h=ef39c37cee&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'For'
        },
        {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473463888?h=9066fcc423&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Implementación de for'
        },
        {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/439557917?h=50be67ce06&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Fibonacci y sistemas de numeración'
        }
      ], [
        {
          step: 1,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/469623118?h=df28c5be2e&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Números primos, sumatoria y Fibonacci'
        }, {
          step: 2,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/467106886?h=f46c46185c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Combinatoria'
        }, {
          step: 3,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/470433097?h=242662cad2&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Introducción a funciones'
        }, {
          step: 4,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/470025072?h=02cfaeea27&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Funciones en Blockly'
        }, {
          step: 5,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/473714773?h=04f8270516&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Introducción a arreglos'
        }, {
          step: 6,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/441146024?h=a7cc2c486c&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Invertir un arreglo'
        }, {
          step: 7,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/461041453?h=a1e7821ea5&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Codeblocks'
        }, {
          step: 8,
          tipo: 'video',
          icon: 'hexa',
          url: 'https://player.vimeo.com/video/452678843?h=89fb557c13&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
          title: 'Ordenamiento'
        }
      ]
    ]
    return nivelesPrepa
  }

  return nivelesPrimaria;
}
