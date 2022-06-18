<template>
  <div class="fullscreen">
    <div class="absolute-center back" style="min-width: 100%; min-height: 100%">
      <div class="fixed-center card" style="min-width: 90%; min-height: 62%">
        <q-card rounded flat class="text-center">
          <div class="q-ma-xs">
            <p class="title-account" style="margin-top: 10px">
              Crear una cuenta
            </p>
            <q-btn rounded flat class="button" style="max-height: 50px">
              <p class="text-button">Registrate con</p>
              <img src="~assets/logos/facebook.png" style="height: 25px" />
            </q-btn>
            <q-btn rounded flat class="button" style="max-height: 50px">
              <p class="text-button">Registrate con</p>
              <img src="~assets/logos/google.png" style="height: 25px" />
            </q-btn>
          </div>
          <p
            class="title-account"
            style="
              margin-top: 3px;
              font-weight: 600;
              font-size: 17px;
              line-height: 21px;
            "
          >
            - OR -
          </p>
          <q-form
            style="margin-left: 15%; margin-right: 15%"
            align="center"
            @submit.prevent=""
          >
            <q-input
              dense
              v-model="user.name"
              class="q-mb-sm text-button"
              label="Nombre completo"
              color="teal"
            ></q-input>
            <q-input
              dense
              v-model="user.email"
              class="q-my-sm text-button"
              label="Correo electrónico"
              color="teal"
            ></q-input>
            <q-input
              dense
              v-model="user.password"
              class="q-my-sm text-button"
              label="Contraseña"
              color="teal"
            ></q-input>
            <q-btn rounded color="teal" class="q-ma-md full-width" type="submit"
              >Crear cuenta</q-btn
            >
          </q-form>
          <p>
            ¿Ya tienes una cuenta?
            <router-link to="/registrarse">Inicia sesión</router-link>
          </p>
        </q-card>
      </div>
      <div class="">
        <img src="~assets/img/cloud-up.png" class="cloud-up" />
        <img src="~assets/img/cloud-down.png" class="cloud-down" />
        <img src="~assets/img/bell.png" class="img-1" />
        <img src="~assets/img/card.png" class="img-2" />
        <img src="~assets/img/phone.png" class="img-3" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const user = reactive({
      name: "",
      email: "",
      password: "",
    });
    return { user };
  },
};
</script>

<style scoped>
.back {
  background: linear-gradient(180deg, #d2fdfd 42.74%, #ecffef 93.06%);
  box-shadow: 0px 4px 31px rgba(227, 227, 227, 0.25);
}
.card {
  background: #ffffff;
  border-radius: 23.76px;
  margin: 5px 0px;
}
.img-1 {
  position: absolute;
  top: 12%;
  left: 15%;
  height: 5%;
}
.img-2 {
  position: absolute;
  top: 80%;
  left: 20%;
  height: 15%;
}
.img-3 {
  position: absolute;
  top: 80%;
  left: 60%;
  height: 10%;
}
.cloud-up {
  position: absolute;
  top: 10%;
  left: 0.5%;
  width: 99%;
  height: 20%;
}
.cloud-down {
  position: absolute;
  top: 77%;
  left: 0.5%;
  width: 99%;
  height: 20%;
}
.title-account {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 21.6px;
  line-height: 32px;
  text-align: center;
  color: #1a5951;
}
.button {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 12px rgba(194, 194, 194, 0.25);
  border-radius: 23.76px;
  margin-top: 1%;
  width: 65%;
}
.text-button {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12.96px;
  line-height: 19px;
  text-align: center;
  color: #657674;
  vertical-align: bottom;
  margin-right: 10px;
  margin-top: 13px;
}
.text-input {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
}
</style>
