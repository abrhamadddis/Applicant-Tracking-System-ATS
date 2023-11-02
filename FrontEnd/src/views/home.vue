<template>
    <div>   
            <!-- Hero section-->
    <section id="hero">
      <!--flex container-->
      <div
        class="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:spacey-0"
      >
        <!--left item-->
        <div class="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1
            class="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left"
          >
            Bring Everyone Together To Build Better Products
          </h1>
          <p class="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Manage makes it simple for software teams to plan day-to-day tasks
            while keeping the larger team goals in view
          </p>
          <div class="flex justify-center md:justify-start">
            <a
              href="#"
              class="md:block p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-brightRedLight"
            >
              Get started
            </a>
          </div>
        </div>
        <!--image-->
        <div class="md:w-1/2">
          <img class="mb-15" src="src\assets\header-image.jpg" alt="illustration-img" />
        </div>
      </div>
    </section>
    </div>
</template>

<script>
    export default {
        name: 'home'
    }
</script>

<style lang="scss" scoped>

</style>