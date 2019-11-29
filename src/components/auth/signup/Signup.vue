<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template slot="label">
          {{ $t('auth.agree') }}
          <span class="link">{{ $t('auth.termsOfUse') }}</span>
        </template>
      </va-checkbox>
      <router-link
        class="ml-1 link"
        :to="{name: 'recover-password'}"
      >{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
import PouchDB from 'pouchdb'
import PouchAuth from 'pouchdb-authentication'
PouchDB.plugin(PouchAuth)

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      userdb: {},
    }
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.agreedToTermsErrors = this.agreedToTerms
        ? []
        : ['You must agree to the terms of use to continue']
      if (!this.formReady) {

      } else {
        this.userdb
          .signup(this.email, this.password)
          .then(response => {
            console.log('Signup response', response)
            this.userdb
              .login(this.email, this.password)
              .then(response => {
                this.$store.commit('updateUser', response.name)
                this.$router.push({ name: 'dashboard' })
              })
              .catch(err => {
                if (err.name === 'unauthorized' || err.name === 'forbidden') {
                  alert('Invalid username')
                  console.log('Login error', err)
                } else {
                  console.log('Login err', err)
                }
              })
          })
          .catch(err => {
            if (err.name === 'conflict') {
              alert('This name already exists.')
            } else if (err.name === 'forbidden') {
              console.log('Forbidden err', err)
            } else {
              console.log('Signup err', err)
            }
          })
      }
      //  this.$router.push({ name: "dashboard" });
    },
  },
  computed: {
    formReady () {
      return !(
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.agreedToTermsErrors.length
      )
    },
  },

  created () {
    this.userdb = new PouchDB(
      'https://4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix:2d0f75eae437887122aec87b1225ad19a294f459beeb0a20fd69fb333cee4d4a@4f241480-c3c9-41c6-bb2e-98fd4cfe269e-bluemix.cloudantnosqldb.appdomain.cloud/userdb',
      {
        skip_setup: true,
        ajax: {
          timeout: 60000,
        },
      }
    )
  },
}
</script>

<style lang="scss">
</style>
