<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }"><h2>Passion Lecture</h2></RouterLink>
      <div>
        <RouterLink :to="{ name: 'search' }"><p class="link">Recherche</p></RouterLink>
        <RouterLink :to="{ name: 'connexion' }"><p class="link">Icon</p></RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');

nav {
  background-color: #272727;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

nav div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.link {
  color: #ffffff;
}

.major-mono-display-regular {
  font-family: 'Major Mono Display', monospace;
  font-weight: 400;
  font-style: normal;
}

h2 {
  font-family: 'Major Mono Display';
  color: #ffffff;
}
</style>
