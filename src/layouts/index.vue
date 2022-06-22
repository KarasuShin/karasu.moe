<template>
  <header px-6 py-4 shadow-md shadow-light-400 dark:shadow-black fixed t-0 l-0 w-full select-none>
    <nav flex>
      <div flex-1>
        <router-link to="/" h="32px" inline-block>
          <img src="/logo-dark.svg" h-full dark:block hidden>
          <img src="/logo.svg" h-full dark:hidden block>
        </router-link>
      </div>
      <div inline-flex items-center gap-4 text-xl>
        <button icon-btn @click="toggleDark()">
          <div dark:i-carbon-moon i-carbon-sun />
        </button>
        <a
          icon-btn i-carbon-logo-github
          rel="noreferrer"
          href="https://github.com/karasushin"
          target="_blank"
          title="GitHub"
        />
      </div>
    </nav>
  </header>
  <main font-sans p="x-4 t-64px" text="center gray-700 dark:gray-200" container mx-auto>
    <router-view />
  </main>
</template>

