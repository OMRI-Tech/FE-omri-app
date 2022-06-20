# OMRI App (fe-omri-app)

_This a programming training app, aimed to help OMRI's students learng the magic world of programming._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

## Pre-requisitos 📋

  * Node.js => 12.22.1 Puedes descargarlo en el siguiente [enlace](https://nodejs.org/es/download/)
  * Yarn => 1.21.1 Para más información visita el [sitio oficial](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
  * Quasar => 3.2.6 Para más información visita el [sitio oficial](https://quasar.dev/quasar-cli/installation)
   * Cordova => 10.0.0 Para más información visita el [sitio oficial](https://cordova.apache.org/#getstarted)

### Instalación de dependencias y SSL 🔧

```bash
# ~/project
yarn && yarn run make:ssl
```

## Comandos principales ⚙️

_Estos comandos son los que principalmente se ocupan, para más información visita la [documentación oficial](https://v1.quasar.dev/quasar-cli/commands-list#introduction)_

_Spa_

```bash
# Modo Desarrollo
quasar dev
# ó
quasar d

# Hacer build para producción
quasar build
# ó
quasar b
```

_Cordova_

```bash
# Modo Desarrollo
quasar dev -m cordova [android|ios]
# ó
quasar d -m [android|ios]

# Hacer build para producción
quasar build -m cordova [android|ios]
# ó
quasar b -m cordova [android|ios]

```