    var palabras = ['PSICOLOGIA', 'COMPLUTENSE', 'UCM', 'SOMOSAGUA', 'LOGOPEDIA', 'GRADO', 'MASTER', 'DOCTORADO', 'MADRID', 'FACULTAD', 'BIBLIOTECA', 'ESTUDIANTE', 'EXITO', 'INVESTIGACION', 'CAFETERIA', 'AMISTAD', 'AMOR', 'BIENVENIDO', 'UNIVERSIDAD']; // Biblioteca de palabras para la adivinanza
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


    function crearBotonesLetras() {
      var letrascontenedor = document.getElementById('letras');
      letrascontenedor.innerHTML = ''; // 使用 .innerHTML 设置新的内容时，它会替换元素原有的内容
      var letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'; // 字符串 letras 其中包含所有的大写字母，包括 Ñ
      for (var i = 0; i < letras.length; i++) { // 使用 for 循环来遍历 letras 字符串中的每个字符
        let letra = letras[i]; // 将当前字符赋值给变量 letra
        const button = document.createElement('button'); // 创建新的 <button> 元素
        button.textContent = letra; //  将按钮的文本内容设置为当前字符，即当前字母
        button.onclick = function() { // 添加一个点击事件处理函数。当按钮被点击时，执行其中的代码块:
          this.disabled = true; // 将当前被点击的按钮设置为禁用状态
          verificarLetra(letra);
        };
		// 将创建好的按钮添加到之前获取到的元素 (letrascontenedor) 中，这样按钮就会被显示在网页上
        letrascontenedor.appendChild(button); // .appendChild() 用于向父元素中添加子元素
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
