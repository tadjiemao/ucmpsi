    var palabras = ['PSICOLOGIA', 'COMPLUTENSE', 'UCM', 'SOMOSAGUA', 'LOGOPEDIA', 'GRADO', 'MASTER', 'DOCTORADO', 'MADRID', 'FACULTAD', 'BIBLIOTECA', 'ESTUDIANTE', 'EXITO', 'INVESTIGACION', 'CAFETERIA', 'AMISTAD', 'AMOR', 'BIENVENIDO']; // Biblioteca de palabras para la adivinanza
    var palabraAAdivinada = '';
    var palabraAdivinada = '';
    var intentos = 6;  // 6 intentos restantes
    var intervaloTiempoRestante;
    var segundos = 60; // 60 segundos de tiempo limitado
	var video = document.getElementById('logroVideo');
	var dogHome = document.getElementById('dog-home');
    var blackHole = document.getElementById('black-hole');
    var animacion = document.querySelector('.animacion');
	

    function iniciarJuego() { // Función para iniciar juego
      clearInterval(intervaloTiempoRestante);
      segundos = 60;
      palabraAAdivinada = palabras[Math.floor(Math.random() * palabras.length)];
      palabraAdivinada = '_'.repeat(palabraAAdivinada.length).split('').join(' ');
      document.getElementById('palabra-a-adivinar').textContent = palabraAdivinada;
      document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
      crearBotonesLetras();
      intervaloTiempoRestante = setInterval(actualizarTemporizador, 1000);
      document.getElementById('botonReiniciar').style.display = 'inline-block';
      document.getElementById('botonIniciar').style.display = 'none';
      document.getElementById('ahorcado-imagen').src = 'img/ahorcado1.png';
	  
	  dogHome.style.display = 'none';
      blackHole.style.display = 'none';
      animacion.style.display = 'none';
    }


    function reiniciarJuego() { // Función para reiniciar juego
      clearInterval(intervaloTiempoRestante);
      intentos = 6;
      segundos = 60;
      document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
      document.getElementById('temporizador').textContent = 'Tiempo restante: 60 seg';
      document.getElementById('resultado').textContent = '';
      document.getElementById('palabra-a-adivinar').textContent = 'Pulse [Iniciar el juego] para iniciar el juego';
      document.getElementById('botonReiniciar').style.display = 'none';
      document.getElementById('botonIniciar').style.display = 'inline-block';
      document.getElementById('ahorcado-imagen').src = 'img/ahorcado0.png';
	  var letrasButtons = document.querySelectorAll('#letras button');
      letrasButtons.forEach(button => {
        button.style.display = 'none';
		
	  dogHome.style.display = 'block';
      blackHole.style.display = 'block';
      animacion.style.display = 'block';
	  video.style.display = 'none';
      });
    }


    function actualizarTemporizador() { // Función para actualizar temporizador
      segundos--;
      document.getElementById('temporizador').textContent = `Tiempo restante: ${segundos} seg`;
      if (segundos === 0) { 
        clearInterval(intervaloTiempoRestante);
        tiempoExpirado();
      }
    }


    function tiempoExpirado() { // Función para el agotado del tiempo
      document.getElementById('resultado').textContent = '¡Perdiste! No has completado el juego a tiempo.';
      document.getElementById('fracasoSonido').play();
      inhabilitarBotonesLetras();
    }


    function verificarLetra(letra) { // Función para verificar las letras
      if (palabraAAdivinada.includes(letra)) {
        for (var i = 0; i < palabraAAdivinada.length; i++) {
          if (palabraAAdivinada[i] === letra) {
            palabraAdivinada = palabraAdivinada.substr(0, i * 2) + letra + palabraAdivinada.substr(i * 2 + 1);
          }
        }
        document.getElementById('palabra-a-adivinar').textContent = palabraAdivinada;
        verificarVictoria();
      } else {
        intentos--;
        document.getElementById('intentos').textContent = `Intentos restantes: ${intentos}`;
        cambiosImagenes();
      }
    }


    function cambiosImagenes() { // Función para alternar imagenes y verificar el fracaso
      var ahorcadoImage = document.getElementById('ahorcado-imagen');
      if (intentos > 0) {
        ahorcadoImage.src = `img/ahorcado${7 - intentos}.png`;
        verificarVictoria();
      } else {
        ahorcadoImage.src = 'img/ahorcado0.png';
        document.getElementById('resultado').textContent = '¡Perdiste! La palabra era: ' + palabraAAdivinada;
        document.getElementById('fracasoSonido').play();
		clearInterval(intervaloTiempoRestante);
        inhabilitarBotonesLetras();
      }
    }


function crearBotonesLetras() { // Función para crear botones de letras
  var letrascontenedor = document.getElementById('letras');
  letrascontenedor.innerHTML = '';
  for (var i = 0; i < 27; i++) {
    let letra;
    if (i === 14) { // Insertar la letra Ñ después de la N (índice 14 para mantener el orden)
      letra = 'Ñ';
    } else if (i < 14) {
      letra = String.fromCharCode(65 + i); // Letras A-N
    } else {
      letra = String.fromCharCode(64 + i); // Letras O-Z ajustadas por la posición de Ñ
    }
    const button = document.createElement('button');
    button.textContent = letra;
    button.onclick = function() {
      this.disabled = true;
      verificarLetra(letra);
    };
    letrascontenedor.appendChild(button);
  }
}


    function verificarVictoria() { // Función para verificar la victoria
      if (palabraAdivinada === palabraAAdivinada.split('').join(' ')) {
        document.getElementById('resultado').textContent = '¡Ganaste!';
        document.getElementById('logroSonido').play();
        clearInterval(intervaloTiempoRestante);
        segundos = 60;
        inhabilitarBotonesLetras();
      
	    var video = document.getElementById('logroVideo');
        video.style.display = 'block';
        video.play();
	  }
    }


    function inhabilitarBotonesLetras() { // Función para bloquear botones de letras
      var buttons = document.querySelectorAll('#letras button');
      buttons.forEach(button => {
        button.disabled = true;
      });
    }
	
	
	// Cuando termine de reproducir vídeo , lo oculte
    video.addEventListener('ended', function() {
    video.style.display = 'none';
    });
