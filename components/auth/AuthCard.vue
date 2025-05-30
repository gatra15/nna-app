<template>
  <div>
    <section class="bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 hover:text-indigo-600">
          <img class="w-20 h-20 mr-4 transition-transform duration-300 transform hover:scale-110" :src="logo"
            alt="logo" />
          <!-- <p class="text-3xl font-bold text-gray-900">NDC</p> -->
        </a>
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <slot />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import backgroundImage from '~/assets/images/background/background.jpg'
import logo from '~/assets/images/nna.png'
</script>

<style scoped>
/* Optional styling for the background and section */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}
</style>
