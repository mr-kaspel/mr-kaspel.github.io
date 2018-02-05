'use strict';
//console.log(new Date().getSeconds());
var click = 0;


/*Скрыть колонку*/
function hidingСolumn(){
	var qt = document.getElementById('table').children;
	for(var j = 1; j < qt.length; j++){
			qt[j].children[0].style.visibility = 'hidden';
		}
}

/*Основная функция*/
function tuning(){
	let data = new Date();
	this.realTime = function() {
		let data = new Date();
		return data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds() + ";";
	}

	this.timerTime = function() {
		return document.getElementById('hr').innerHTML + ":" + document.getElementById('min').innerHTML + ":" + document.getElementById('sec').innerHTML + ";";
	}

	this.timePassed = function(rm) {
		rm = rm.split(';');
		let hr = data.getHours() - rm[0].split(':')[0] + +rm[1].split(':')[0];
		let min = data.getMinutes() - rm[0].split(':')[1] + +rm[1].split(':')[1];
		let sec = data.getSeconds() - rm[0].split(':')[2] + +rm[1].split(':')[2];
		return hr + ":" + min + ":" + sec;
	}

	this.editTable = function(click) {
		if(click > 1){
			//Создаем клон последней строки в таблице с данными
			var coll = document.getElementById('table').children;
			var clon = coll[coll.length - 1].cloneNode(true);
			clon.children[1].innerHTML = document.getElementById('hr').innerHTML + ':' + document.	getElementById('min').innerHTML;
			clon.children[0].innerHTML = 1;
			return coll[coll.length - 1].parentNode.insertBefore(clon, coll[coll.length - 1].nextSibling);
		}
	}

	this.clearStorage = function() {
		return localStorage.clear();
	}

	this.checkCookies = function(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : false;
	}

	this.menuButton = function() {
		let button = document.getElementById('point');
		button.classList.toggle('open');
		document.getElementById('nav-menu').classList.toggle('on');
		if(button.className.lastIndexOf('open') !== -1) {
			return document.getElementById('nav-menu').style.display = "block";
		}
		return document.getElementById('nav-menu').style.display = "";
	}
}

var opt = new tuning();

if(opt.checkCookies('pampam')) { //изменить на !
	opt.clearStorage();
	var date = new Date(new Date().getTime() + 60 * 1000); //57 600 000мс 
	document.cookie = "pampam=value; path=/; expires=" + date.toUTCString();
}


/*Провека данных в хранилище*/
let dateTime = localStorage.getItem('dateDump');
if(dateTime) {
	console.log(opt.timePassed(dateTime));
}

/*Проверка в локальном хранилище параметров*/
let optio = localStorage.getItem('options');
if(optio) {
	if(optio.indexOf('true') !== -1) {
		hidingСolumn();
		document.getElementById('check').checked = 1;
	}
}

/*Отслеживаем все нажатия*/
document.body.addEventListener('keydown', function(e) {
	e = e || window.event;
	let keyup = e.keyCode;
	if(keyup == 17) {
		if (keyup === 32) {
			console.log('ye');
		}
	}
	//убрать 123
	if(keyup !== 123 && keyup !== 116) e.preventDefault();

	if(keyup === 32) {
		click ++;
		var sec = 0,
				min = 0,
				hr = 0;

		if(click === 1){
			var settime = setInterval(function() {
				if (sec < 60) sec++;
				if (sec === 60) {
					min++;
					sec = 0;
				}
				if(min == 60) {
					hr++;
					min = 0;
					sec = 0;
				}
				if(click > 1) {
					clearInterval(settime);
					return click = 0;
				}
				document.getElementById('sec').innerHTML = sec;
				document.getElementById('min').innerHTML = min;
				document.getElementById('hr').innerHTML = hr;

				/*Запись в локальное хранилище + проверка на переполнение*/
				try {
					localStorage.setItem('dateDump', opt.realTime() + opt.timerTime());
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						alert('>5mb');
					}
				} 
			}, 1000);
		}
		opt.editTable(click);
	}
});


/* Кнопка меню*/
document.getElementById('point').addEventListener('click', function(){
	opt.menuButton();
});

/* Чистка таблицы и Local Storage*/
document.getElementById('clear').addEventListener('click', function(){
	localStorage.removeItem('dateDump');
	//localStorage.clear();
	console.log('Значение из хранилища, с ключем dateDump, отчищено!');
});

/*Скрываем первый столбец*/
document.getElementById('check').addEventListener('click', function() {
	var qt = document.getElementById('table').children;
	if(document.getElementById('check').checked) {
		hidingСolumn();
		localStorage.setItem('options', 'true');
		return;
	}
	for(var j = 1; j < qt.length; j++){
			qt[j].children[0].style.visibility = '';
		}
		localStorage.setItem('options', 'false');
		return;
});