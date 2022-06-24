<template>
  <div class="fullscreen">
    <div class="items-center back">
      <img src="~assets/img/cloud-up.png" class="cloud-up" />
      <img src="~assets/img/cloud-down.png" class="cloud-down" />
      <div class="top-img-section">
        <img src="~assets/img/card.png" class="letter" />
      </div>
      <div class="bottom-img-section">
        <img src="~assets/img/bell.png" class="bell" />
        <img src="~assets/img/phone.png" class="phone" />
      </div>
      <div class="fixed-center card">
        <div rounded flat class="text-center">
          <div class="q-ma-xs">
            <p class="title-account q-mt-md">Crear una cuenta</p>
            <q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img src="~assets/logos/facebook.png" />
              </q-icon>
            </q-btn>
            <q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img src="~assets/logos/google.png" />
              </q-icon>
            </q-btn>
          </div>
          <p class="title-account or">- OR -</p>
          <q-form class="form-register" align="center" @submit.prevent="">
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
            <q-btn
              rounded
              class="q-ma-md full-width button-submit text-button"
              type="submit"
              >Crear cuenta</q-btn
            >
          </q-form>
          <p class="title-account q-mt-xs login">
            ¿Ya tienes una cuenta?
            <a href="/#/registrarse" class="href"> Inicia sesión </a>
          </p>
        </div>
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
  min-width: 100%;
  min-height: 100%;
}
.card {
  background: #ffffff;
  border-radius: 23.76px;
  margin: 5px 0px;
  min-width: 90%;
  max-height: 550px;
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
  bottom: 10%;
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
  margin-top: 3%;
  width: 65%;
  max-height: 50px;
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
.button-submit {
  background: #003f54;
  box-shadow: 0px 4px 31px rgba(227, 227, 227, 0.25);
  border-radius: 53px;
  color: #ffffff;
}
.top-img-section {
  position: absolute;
  top: 0%;
  height: 18%;
  width: 100%;
}
.bottom-img-section {
  position: absolute;
  bottom: 0%;
  height: 15%;
  width: 100%;
}
.letter {
  height: 60%;
  margin-left: 10%;
  margin-top: 10px;
}
.bell {
  height: 30%;
  margin-top: 5%;
  margin-left: 45%;
  vertical-align: top;
}
.phone {
  height: 60%;
  margin-left: 10%;
  vertical-align: top;
  margin-top: 5%;
}
.or {
  margin-top: 1.5%;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
}
.form-register {
  margin-left: 19%;
  margin-right: 18%;
}
.login {
  font-size: 13px;
  font-weight: 300;
}
.href {
  font-weight: 600;
}
</style>
