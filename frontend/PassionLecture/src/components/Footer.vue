<template>
  <footer>
    <p>Développeurs</p>
    <ul>
      <a href="mailto:Alban.Segalen@passion.lecture"> <li>Alban Segalen &nbsp;</li> </a>
      <a href="mailto:Antoine.Fabre@passion.lecture"> <li>Antoine Fabre &nbsp;</li> </a>
      <a href="mailto:Mateo.Thode@passion.lecture"> <li>Mateo Thode</li> </a>
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
