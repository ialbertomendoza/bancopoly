var nJugadores = 0; // Número de jugadores
var nombre = '';
var apellidos = ['McPato', 'Scrooge', 'Marley', 'Trump'];
var fotografias = ['maturewoman.svg', 'matureman1.svg', 'malecostume.svg', 'female1.svg'];
var colores = ['#607D8B', '#FF5722', '#303F9F', '#1976D2', '#009688'];
var lJugadores = []; // Lista de jugadores
var jugador = { 
	registra: function(nombre, efectivo){
		if (apellidos.length>0){
			aleatorio = Math.floor(Math.random()*apellidos.length);
			console.log(aleatorio);
			nJugador = {
				nombre : apellidos[aleatorio],
				fotografia : fotografias[aleatorio],
				efectivo : efectivo,
				color : colores[aleatorio]
			};
			lJugadores.push(nJugador);
			$('.jugadores').append('<li class="jugador"><div class="foto"><img src="imagenes/'+nJugador.fotografia+'" alt=""></div><div class="datos-bancarios"><span>'+nJugador.nombre+'</span><br/><span class="efectivo">'+numeral(efectivo).format('$0,0.00')+'</span></div></li>');
			apellidos.splice(aleatorio,1);
			fotografias.splice(aleatorio,1);
			colores.splice(aleatorio,1);
		}
	},
	paga: function(jugadorPaga, monto, jugadorCobra){

	},
	fondo: function(jugadorID){
		efectivo = lJugadores[jugadorID].efectivo;
		$('#efectivo-en-cuenta').text(numeral(efectivo).format('$0,0.00'));
	}
};

var banco = {
	transfiere: function(cantidad, jugador){

	},
	fondo: function(){
		efectivo = lJugadores[0].efectivo+(Math.random() * (100000 - 100) + 1);
		$('#efectivo-banco').text(numeral(efectivo).format('$0,0.00'));
		lJugadores[0].efectivo = efectivo;
	}
};