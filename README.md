# OMRI App (fe-omri-app)

_This a programming training app, aimed to help OMRI's students learng the magic world of programming._
## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

## Pre-requisitos 📋

  * Node.js => 12.22.1 Puedes descargarlo en el siguiente [enlace](https://nodejs.org/es/download/)
  * Yarn => 1.21.1 Para más información visita el [sitio oficial](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
  * Quasar => 3.2.6 Para más información visita el [sitio oficial](https://quasar.dev/quasar-cli/installation)
   * Cordova => 10.0.0 Para más información visita el [sitio oficial](https://cordova.apache.org/#getstarted)
   * Mkcert => 1.4.3 Para más información visita el [sitio oficial](https://words.filippo.io/mkcert-valid-https-certificates-for-localhost/)

   **Nota:** Si trabajas en MacOs, deberás de tener instalado cocapods y ios-deploy
   * iOs-deploy => 1.11.4 Para más información visita el [sitio oficial](https://github.com/ios-control/ios-deploy)


### Instalación de dependencias 🔧

```bash
# ~/project
yarn run install:project
```

## Comandos principales ⚙️

_Estos comandos son los que principalmente se ocupan, para más información visita la [documentación oficial](https://v1.quasar.dev/quasar-cli/commands-list#introduction)_

_Spa_

```bash
# ~/project

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
# ~/project

# Modo Desarrollo
quasar dev -m cordova [android|ios]
# ó
quasar d -m [android|ios]

# Hacer build para producción
quasar build -m cordova [android|ios]
# ó
quasar b -m cordova [android|ios]

```
