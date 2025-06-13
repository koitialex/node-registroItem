const frases = [
  "Registre os seus itens para se organizar melhor",
  "Nova update: chase the skies. Lançamento dia 17/06",
  "Herobrine foi removido "
]
const elemento = document.getElementById("troca-frase");
const fraseAleatoria = frases[Math.floor(Math.random()* frases.length)];
elemento.textContent = fraseAleatoria;