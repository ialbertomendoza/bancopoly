$(document).ready(function(){
	$('.jugadores').append('<li class="jugador"><div class="foto"><img src="imagenes/supportmale.svg" alt="" /></div><div class="datos-bancarios"><span>BANCO</span><br/><span class="efectivo" id="efectivo-banco">'+numeral(new Date().getTime()/500).format('$0,0.00')+'</span></div></li>');
	setInterval(function(){ banco.fondo(); }, 100);
	aleatorio = Math.floor(Math.random()*colores.length)
	jBanco = {
		nombre: 'BANCO',
		fotografia: 'supportmale.svg',
		efectivo: new Date().getTime()/500,
		color: colores[aleatorio]
	}
	lJugadores.push(jBanco);
	colores.splice(aleatorio,1);
});

$('#agrega-jugador').on('click', function(){
	nJugadores++;
	if (nJugadores <= 4) jugador.registra('',500000);
	if (nJugadores===2) $('#comienza-juego').removeClass('oculto');
});

$('#comienza-juego').on('click', function(){
	$('#jugadores-creados').remove();
	$('.botones').remove();
	$('#panel-izquierdo').append('<ul class="jugadores"></ul>');

	$.each(lJugadores, function(index, jugador) {
    	$('.jugadores').append('<li class="jugador activo" data-jugador='+index+' data-nombre='+jugador.nombre+' data-color='+jugador.color+'><div class="foto"><img src="imagenes/'+jugador.fotografia+'"/></div><div class="datos-bancarios"><span class="jugador-datos">'+jugador.nombre+'</span><br/><span class="jugador-datos saldo-jugador-'+index+'"></span></div></li>');
	});
});

$('#panel-izquierdo').on('click','.jugador', function(){
	frmUsuario = '<input type="number" id="monto-transferencia"><br/><select name="lista-jugadores" class="lista-jugadores"><option disabled>Jugadores</option></select><br/>';
	jugadorID = $(this).data('jugador');
	jugadorNombre = $(this).data('nombre');
	color = $(this).data('color');
	efectivoActual = lJugadores[jugadorID].efectivo;
	$('#panel-izquierdo').css('background-color',color);
	$('#panel-derecho').html('<h1>'+jugadorNombre+'</h1>');
	$('#panel-derecho').append('<h2 class="efectivo-en-cuenta">'+numeral(efectivoActual).format('$0,0.00')+'</h2>');
	if (jugadorID===0) {
		$('#panel-derecho').append(frmUsuario+'<button class="boton-panel" data-jugador='+jugadorID+'>Transferir</button>');
	} else {
		$('#panel-derecho').append(frmUsuario+'<button class="boton-panel" data-jugador='+jugadorID+'>Pagar</button>');
	}
	$.each(lJugadores, function(index, jugador){
		if (index != jugadorID) $('.lista-jugadores').append('<option value='+index+'>'+jugador.nombre+'</option>');
	});
});

$('#panel-derecho').on('click', '.boton-panel', function(evt){
	montoTransferencia = $('#monto-transferencia').val();
	jugadorTransferencia = $('select[name=lista-jugadores]').val();
	jugadorID = $(this).data('jugador');
	if (montoTransferencia < lJugadores[jugadorID].efectivo && jugadorTransferencia != null && montoTransferencia > 0){
		saldoActual = lJugadores[jugadorID].efectivo;
		saldoRestante = saldoActual - parseInt(montoTransferencia);
		lJugadores[jugadorID].efectivo = saldoRestante;

		$('.saldo-jugador-'+jugadorTransferencia).text(numeral(lJugadores[jugadorTransferencia].efectivo).format('$0,0.00'));
		var $efectivoRecibido = $('.saldo-jugador-'+jugadorTransferencia);
		lJugadores[jugadorTransferencia].efectivo += parseInt(montoTransferencia);

	    var $efectivoEnviado = $('.efectivo-en-cuenta'),
	    value = saldoRestante;
	    evt.preventDefault();
	    i=0;
	    $({saldo: saldoActual}).stop(true).animate({saldo: value}, {
	        duration : 2000,
	        step: function (saldo) {
	        	console.log(saldoActual-saldo);
	        	$efectivoRecibido.text('+ '+numeral(saldoActual-saldo).format('$0,0.00'));
	            $efectivoEnviado.text(numeral(saldo).format('$0,0.00'));
	        }
	    }).promise().done(function () {
	        $efectivoEnviado.text(numeral(value).format('$0,0.00'));
	        setTimeout(function(){$efectivoRecibido.text('');},10000);
	        $('.efectivo-en-cuenta').css('color','#388E3C');
			$('.lista-jugadores').css('color','#000');
	    });

		$(this).prop( "disabled", true );
	} else {
		$('.efectivo-en-cuenta').css('color','#D32F2F');
		$('.lista-jugadores').css('color','#D32F2F');
	}	
});