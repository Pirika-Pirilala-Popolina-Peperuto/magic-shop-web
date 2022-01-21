<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img alt="Workflow" class="mx-auto h-12 w-auto" src="https://i.imgur.com/MDYUATR.webp">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <input name="remember" type="hidden" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label class="sr-only" for="name">Name</label>
            <input
              id="name" v-model="name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="name" placeholder="Your Name"
              required
              type="text"
            >
          </div>
          <div>
            <label class="sr-only" for="address">Address</label>
            <input
              id="address" v-model="address" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="address" placeholder="Address"
              required
              type="text"
            >
          </div>
          <div>
            <label class="sr-only" for="email-address">Email address</label>
            <input
              id="email-address" v-model="email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="email" placeholder="Email address"
              required
              type="email"
            >
          </div>
          <div>
            <label class="sr-only" for="password">Password</label>
            <input
              id="password" v-model="password" autocomplete="current-password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="password"
              placeholder="Password"
              required
              type="password"
            >
          </div>
          <div>
            <label class="sr-only" for="password2">Password confirm</label>
            <input
              id="password2" v-model="password2" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="password2" placeholder="Confirm Password"
              required
              type="password"
            >
          </div>
        </div>

        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            @click.prevent="signup"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                aria-hidden="true" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
            Sign up
          </button>
          <router-link to="/login">
            <b>Login</b>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get } from '@vueuse/core'
import swal from 'sweetalert'
import { addNewUser, isUserExist } from '~/api'
import { useIsLogin } from '~/composables/checkLoggedin'
import { isValidEmail } from '~/utils/email'

const isLogin = useIsLogin()
if (isLogin) location.replace('/')

const name = ref<string>('')
const email = ref<string>('')
const address = ref<string>('')
const password = ref<string>('')
const password2 = ref<string>('')

const signup = async() => {
  if (!(get(name).trim().length)
      || !(get(email).trim().length)
      || !(get(address).trim().length)
      || !(get(password).length)) {
    await swal({
      title: '😡😡😡😡😡😡😡',
      text: 'Please give more data!',
      icon: 'error',
    })
    return
  }

  if (!isValidEmail(get(email))) {
    await swal({
      title: '🥺🥺🥺🥺🥺🥺🥺',
      text: 'Not an email!',
      icon: 'warning',
    })
    return
  }

  if (get(password) !== get(password2)) {
    password.value = ''
    password2.value = ''
    await swal({
      title: '🥺🥺🥺🥺🥺🥺🥺',
      text: 'password not match!',
      icon: 'warning',
    })
    return
  }

  const exist = await isUserExist(get(email))
  // eslint-disable-next-line no-alert
  if (exist) {
    await swal({
      title: 'Oh No!',
      text: 'account already exist!',
      icon: 'warning',
    })
  }
  else {
    await addNewUser(get(name), get(address), get(email), get(password2))
    await swal({
      title: 'Done.',
      text: 'Successfully created an account!!',
      icon: 'success',
    })
    location.replace('/login')
  }
}
</script>

<style lang="scss">
.st0 {
  fill: none;
  stroke: currentColor;
  stroke-width: 20;
  stroke-linecap: round;
  stroke-miterlimit: 3;
}
</style>
