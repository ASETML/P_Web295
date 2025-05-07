<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }"><h2>Passion Lecture</h2></RouterLink>
      <div>
        <RouterLink :to="{ name: 'search' }"><p class="link">Recherche</p></RouterLink>
        <RouterLink :to="{ name: 'inscription' }"><p class="link">Inscription</p></RouterLink>
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
  align-items: center;
  padding: 0.5rem 2rem;
}

nav div {
  display: flex;
  flex-direction: row;
  gap: 2rem; /* Ajoute de l'espace entre les liens */
}

.link {
  color: #ffffff;
  cursor: pointer;
}

h2 {
  font-family: 'Major Mono Display', monospace;
  color: #ffffff;
  margin: 0;
}
</style>
