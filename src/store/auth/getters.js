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
      ]
    ]
    return nivelesPrepa
  }

  return nivelesPrimaria;
}
