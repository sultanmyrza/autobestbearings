<template>
  <div style="padding-left:16px; padding-right:16px">
    <v-row align="center" justify="center">
      <v-col lg="4" md="6" sm="10" xs="10">
        <v-form
          ref="form"
          @submit.prevent="submitForm"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-text-field
            v-model="company"
            :counter="30"
            :rules="requiredRules"
            label="Company"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            :counter="30"
            :rules="requiredRules"
            label="Name"
            required
          ></v-text-field>

          <re-captcha @reCaptchaSuccess="onReCaptchaSuccess" />

          <v-btn @click="reset" color="warning" class="mr-4">
            Reset Form
          </v-btn>

          <v-btn
            :disabled="!valid || !reCatpcha"
            @click="submitForm"
            color="success"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReCaptcha from './ReCaptcha.vue'

export default {
  components: { ReCaptcha },
  data: () => ({
    valid: false,
    reCatpcha: true,
    country: '',
    company: '',
    phone: '',
    fax: '',
    subject: '',
    message: '',
    name: '',
    requiredRules: [(v) => !!v || 'required'],
    email: '',
    emailRules: [
      (v) => !!v || 'required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],

    lazy: false
  }),

  methods: {
    onReCaptchaSuccess(success) {
      this.reCatpcha = success === true
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    submitForm() {
      // TODO send email to our server
      this.$emit('submitForm', {
        customerName: this.name,
        companyName: this.company
      })
    }
  }
}
</script>
