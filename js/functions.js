
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // configurar jardim
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // loop de renderização
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var intervalo = 50;
	var angulo = 10;
	var coracao = new Array();
	var temporizadorAnimacao = setInterval(function () {
		var flor = getHeartPoint(angulo);
		var desenhar = true;
		for (var i = 0; i < coracao.length; i++) {
			var p = coracao[i];
			var distancia = Math.sqrt(Math.pow(p[0] - flor[0], 2) + Math.pow(p[1] - flor[1], 2));
			if (distancia < Garden.options.bloomRadius.max * 1.3) {
				desenhar = false;
				break;
			}
		}
		if (desenhar) {
			coracao.push(flor);
			garden.createRandomBloom(flor[0], flor[1]);
		}
		if (angulo >= 30) {
			clearInterval(temporizadorAnimacao);
			showMessages();
		} else {
			angulo += 0.2;
		}
	}, intervalo);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progresso = 0;
			$ele.html('');
			var temporizador = setInterval(function() {
				var atual = str.substr(progresso, 1);
				if (atual == '<') {
					progresso = str.indexOf('>', progresso) + 1;
				} else {
					progresso++;
				}
				$ele.html(str.substring(0, progresso) + (progresso & 1 ? '_' : ''));
				if (progresso >= str.length) {
					clearInterval(temporizador);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var atual = Date();
	var segundos = (Date.parse(atual) - Date.parse(date)) / 1000;
	var dias = Math.floor(segundos / (3600 * 24));
	segundos = segundos % (3600 * 24);
	var horas = Math.floor(segundos / 3600);
	if (horas < 10) {
		horas = "0" + horas;
	}
	segundos = segundos % 3600;
	var minutos = Math.floor(segundos / 60);
	if (minutos < 10) {
		minutos = "0" + minutos;
	}
	segundos = segundos % 60;
	if (segundos < 10) {
		segundos = "0" + segundos;
	}
	var resultado = "<span class=\"digit\">" + dias + "</span> dias <span class=\"digit\">" + horas + "</span> horas <span class=\"digit\">" + minutos + "</span> minutos <span class=\"digit\">" + segundos + "</span> segundos"; 
	$("#elapseClock").html(resultado);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}

// Função para animar pequenos corações subindo
function animarCoracoesSubindo(qtd, cor) {
    for (let i = 0; i < qtd; i++) {
        setTimeout(function() {
            criarCoracaoAnimado(cor);
        }, Math.random() * 1000);
    }
}

function criarCoracaoAnimado(cor, posVW) {
    const coracao = document.createElement('div');
    coracao.innerHTML = '<i class="fas fa-heart"></i>';
    coracao.style.position = 'fixed';
    if (typeof posVW === 'number') {
        coracao.style.left = posVW + 'vw';
    } else {
        coracao.style.left = (10 + Math.random() * 80) + 'vw';
    }
    coracao.style.bottom = '-40px';
    coracao.style.fontSize = (16 + Math.random() * 24) + 'px';
    coracao.style.color = cor;
    coracao.style.opacity = 0.8 + Math.random() * 0.2;
    coracao.style.zIndex = 9999;
    coracao.style.pointerEvents = 'none';
    coracao.style.transition = 'transform 2.5s linear, opacity 2.5s linear';
    document.body.appendChild(coracao);
    setTimeout(function() {
        coracao.style.transform = 'translateY(-90vh) scale(' + (0.8 + Math.random() * 0.6) + ')';
        coracao.style.opacity = 0;
    }, 50);
    setTimeout(function() {
        if (coracao.parentNode) coracao.parentNode.removeChild(coracao);
    }, 2600);
}