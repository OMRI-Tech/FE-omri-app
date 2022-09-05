<template>
  <q-page class="q-pt-md">
    <div class="text-center col-12">
        <q-avatar size="100px">
            <q-img :src="user.avatar"/>
        </q-avatar>
        <br/>
        <q-btn icon="backup" label="Sube una selfie" class="q-mt-sm" rounded color="info"  @click="profilephoto = true" size="sm"/>
    </div>
    <div class="main-container overflow-auto">
      <div class="row">
        <div>
          <q-card class="bg-squares">
            <q-card-section class="q-pa-sm">
              <q-list>
                <q-item-label class="text-h6" header>Datos personales</q-item-label>
                <q-item>
                  <q-item-section>
                    <q-input dense standout v-model="user.name" placeholder="Naranjín" hint="Nombre *"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input dense standout v-model="user.lastname" placeholder="Naranjos" hint="Apellido Paterno *"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input dense standout v-model="user.mother_lastname" placeholder="Del Río" hint="Apellido Materno"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input dense standout type="date" v-model="user.fecha_nacimiento" hint="Fecha de nacimiento *"/>
                  </q-item-section>
                  <q-item-section>
                    <q-input dense standout mask="(###)-###-####" unmasked-value fill-mask autogrow v-model="user.telefono" hint="Teléfono *"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input dense standout v-model="user.email" placeholder="naranjin@gmail.com" hint="Correo *"/>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  class="text-center"
                >
                  <q-item-section>
                    <q-btn no-caps class="full-width bg-primary text-white" label="Guardar cambios" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-separator spaced />
                <q-item-label class="text-h6" header>Datos de olímpico</q-item-label>
                <q-item>
                  <q-item-section>
                    <q-input
                      type="textarea"
                      dense standout
                      v-model="user.acercaDeMi"
                      placeholder="Vengo a aprender programación, me gusta leer y ¿quien para el Fortnite?"
                      hint="Deja que otros sepan algo de ti"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input dense standout v-model="user.omegaup_user" placeholder="NombreDeUsuario" hint="Usuario de OmegaUp"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input
                      dense standout
                      v-model="user.omegaPass"
                      :type="isPwd ? 'password' : 'text'"
                      hint="Contraseña de OmegaUp (muy opcional)"
                      placeholder="Para que no se te pierda">
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                        <q-btn round dense flat icon="add" />
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  class="text-center"
                >
                  <q-item-section>
                    <q-btn no-caps class="full-width bg-primary text-white" label="Guardar cambios" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-separator spaced />
                <q-item-label class="text-h6" header>Datos escolares</q-item-label>
                <q-item>
                  <q-item-section>
                    <q-select
                        autogrow
                        dense standout
                        v-model="product.estado"
                        :options="options.estado"
                        stack-label
                        @filter="filtroestado"
                        placeholder="Escuelita"
                        hint="Escoge un Escuela *"
                        :display-value="`${product.estado && product.estado.label ? product.estado.label : ''}`"
                        :display-value-sanitize="display.estado"
                        :rules="[val => !!val || 'Campo Obligatorio']"
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-select
                        autogrow
                        dense standout
                        v-model="product.estado"
                        :options="options.estado"
                        stack-label
                        @filter="filtroestado"
                        placeholder="Morelos"
                        hint="Escoge un Estado *"
                        :display-value="`${product.estado && product.estado.label ? product.estado.label : ''}`"
                        :display-value-sanitize="display.estado"
                        :rules="[val => !!val || 'Campo Obligatorio']"
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-select
                        autogrow
                        dense standout
                        v-model="product.municipio"
                        :options="options.municipio"
                        stack-label
                        @filter="filtromunicipio"
                        hint="Escoge un Municipio"
                        placeholder="Cuernavaca"
                        :display-value="`${product.municipio && product.municipio.label ? product.municipio.label : ''}`"
                        :display-value-sanitize="display.municipio"
                        :rules="[val => val || 'Campo Obligatorio']"
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-select
                        dense standout
                        autogrow
                        v-model="user.id_grado"
                        :options="opcionesGrado"
                        stack-label
                        hint="Grado escolar"
                        :rules="[val => val || 'Campo Obligatorio']"
                    >
                    </q-select>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  class="text-center"
                >
                  <q-item-section>
                    <q-btn no-caps class="full-width bg-primary text-white" label="Guardar cambios" />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-separator spaced />
                <q-item-label class="text-h6" header>Cambia contraseña</q-item-label>
                <q-item>
                  <q-item-section>
                    Nueva Contraseña
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input type="password" dense outlined round v-model="password.nueva" label="Nueva contraseña" :rules="[val => !!val || 'Campo Obligatorio']"/>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    Confirmación de contrasñea
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input type="password" dense outlined round v-model="password.confirmacion" label="Confirma nueva contraseña" :rules="[val => !!val || 'Campo Obligatorio']"/>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  class="text-center"
                >
                  <q-item-section>
                    <q-btn no-caps class="full-width bg-primary text-white" label="Guardar cambios" />
                  </q-item-section>
                </q-item>

              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn @click="updateProfile" class="text-capitalize bg-info">Actualizar Información</q-btn>
            </q-card-actions>

            <q-form @submit.prevent="ChangePass">

            </q-form>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="profilephoto" persistent>
      <q-card>
        <q-toolbar>
          <!-- <q-avatar>
            <img src="/images/serious.png">
          </q-avatar> -->
          <q-toolbar-title>Sube tu <span class="text-weight-bold">Foto de Perfil</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup @click="newProfilePhoto = '', newProfilePhotoPreview = ''"/>
        </q-toolbar>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col vertical-centro">
              <q-file hint="Sube una imagen mínimo de 150*150px" accept=".jpg, image/*" @rejected="onRejected" @input="cargaArchivo(newProfilePhoto), obtenerArchivo()" color="teal" dense v-model="newProfilePhoto" label="Escoge una imagen">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </div>
            <div v-if="newProfilePhoto != ''" class="col horizontal-centro">
              <img v-if="newProfilePhoto != ''" :src="newProfilePhotoPreview" width="200" height="200" alt="Imagen Miniatura">
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="bg-white text-teal" flat label="Cancelar" v-close-popup @click="newProfilePhoto = '', newProfilePhotoPreview = ''"/>
          <q-btn class="bg-white text-teal" flat label="Cambiar Foto de Perfil" v-close-popup @click="newProfilePhoto = '', newProfilePhotoPreview = '', changeProfilePhoto()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import * as API from 'src/store/Api'
import { LocalStorage } from 'quasar'
import axios from 'axios'

export default defineComponent({
  name: 'Profile',
  setup () {
    const Usuario = LocalStorage.getItem('user_logged')
    console.log('user: ', LocalStorage.getItem('user_logged'))
    const isPwd = ref(true);
    const user = ref(Usuario);
    const opcionesGrado = [
      {value: 1, label: "1ro Primaria"},
      {value: 2, label: "2do Primaria"},
      {value: 3, label: "3ro Primaria"},
      {value: 4, label: "4to Primaria"},
      {value: 5, label: "5to Primaria"},
      {value: 6, label: "6to Primaria"},
      {value: 7, label: "1ro Secundaria"},
      {value: 8, label: "2do Secundaria"},
      {value: 9, label: "3ro Secundaria"},
      {value: 10, label: "1ro Preparatoria"},
      {value: 11, label: "2do Preparatoria"},
      {value: 12, label: "3ro Preparatoria"}
    ];

    return {
      user: {},
      isPwd,
      FotoDePerfil: '',
      newProfilePhotoPreview: '',
      newProfilePhoto: '',
      profilephoto: false,
      user_details: {},
      product: {
        estado: { label: Usuario.estado },
        municipio: { label: Usuario.municipio }
      },
      display: {
        estado: false,
        municipio: false
      },
      options: {
        estado: null,
        municipio: null
      },
      password: {
        nueva: '',
        confirmacion: ''
      },
      opcionesGrado
    }
  },
  methods: {
    onRejected (rejectedEntries) {
      this.$q.notify({
        color: 'negative',
        message: 'El formato seleccionado no es válido',
        avatar: '/images/confused.png'
      })
    },
    changeProfilePhoto () {
      const formData = new FormData()
      formData.append('user_id', this.user.id)
      formData.append('archivo', this.fotoPerfil)

      axios.post('/api/actualiza-foto', formData, {
        headers: {
          'Content-Type': 'multiplat/form-data'
        }
      })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            position: 'top',
            avatar: '/images/happy.png',
            message: 'Foto Actualizada'
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Algo salió mal',
            avatar: '/images/confused.png'
          })
        })
    },
    obtenerArchivo (e) {
      const file = this.newProfilePhoto
      this.fotoPerfil = file
    },
    cargaArchivo (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.newProfilePhotoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    updateProfile () {
      const formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('telefono', this.user.telefono)
      formData.append('omegaup_user', this.user.omegaup_user)
      formData.append('name', this.user.name)
      formData.append('lastname', this.user.lastname)
      formData.append('mother_lastname', this.user.mother_lastname)
      formData.append('colonia', this.user.colonia)
      formData.append('codigo_postal', this.user.codigo_postal)
      formData.append('calle', this.user.calle)
      formData.append('acercaDeMi', this.user.acercaDeMi)
      formData.append('estado', this.product.estado.label)
      formData.append('municipio', this.product.municipio.label)
      formData.append('fecha_nacimiento', this.user.fecha_nacimiento)

      axios.post('/api/update-alumno/' + this.user.id, formData)
        .then(response => {
          LocalStorage.set('user_logged', response.data.data)
          this.$q.notify({
            color: 'positive',
            position: 'center',
            avatar: '/images/happy.png',
            message: 'Perfil Actualizado'
          })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Algo salió mal',
            avatar: '/images/confused.png'
          })
        })
    },
    filtroestado (val, update, abort) {
      axios.post('/api/select2-estado', {
        page: 1,
        q: val
      })
        .then((response) => {
          var opcionesRealesestado = []
          for (let i = 0; i < response.data.data.results.length; i++) {
            opcionesRealesestado[i] = { label: response.data.data.results[i].text, value: response.data.data.results[i].id }
          }
          update(() => {
            this.options.estado = opcionesRealesestado
          })
        })
    },
    filtromunicipio (val, update, abort) {
      axios.post('/api/select2-municipio', {
        page: 1,
        q: val,
        c_estado: this.product.estado.value
      })
        .then((response) => {
          var opcionesRealesmunicipio = []
          for (let i = 0; i < response.data.data.results.length; i++) {
            opcionesRealesmunicipio[i] = { label: response.data.data.results[i].text, value: response.data.data.results[i].id }
          }
          update(() => {
            this.options.municipio = opcionesRealesmunicipio
          })
        })
    },
    ChangePass () {
      if (this.password.nueva === this.password.confirmacion) {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: '¡Solicitud Exitósa!',
          avatar: '/images/happy.png'
        })
      } else {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: '¡Las contraseñas no coinciden!',
          avatar: '/images/confused.png'
        })
        this.password.nueva = null
        this.password.confirmacion = null
      }
    }
  }
})
</script>
