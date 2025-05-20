<template>
  <footer>
    <p>Développeurs</p>
    <ul>
      <li>Alban Segalen &nbsp;</li>
      <li>Antoine Fabre &nbsp;</li>
      <li>Mateo Thode</li>
    </ul>
    <a class="gitmoji" href="https://gitmoji.dev">
      <img
        src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
        alt="Gitmoji"
      />
    </a>
  </footer>
</template>
<style scoped>
footer {
  background-color: #272727;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
li,
p {
  color: white;
}
</style>
