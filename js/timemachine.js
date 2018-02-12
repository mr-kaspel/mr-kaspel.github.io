'use strict';

/*Скрыть колонку*/
function hidingСolumn(){
	var qt = document.getElementById('table').children;
	for(var j = 1; j < qt.length; j++){
			qt[j].children[1].style.visibility = 'hidden';
			qt[j].children[2].style.visibility = 'hidden';
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
		let hr = data.getHours() - rm[0].split(':')[0] + +rm[1].split(':')[0],
				min = data.getMinutes() - rm[0].split(':')[1] + +rm[1].split(':')[1],
				sec = data.getSeconds() - rm[0].split(':')[2] + +rm[1].split(':')[2];
		return hr + ":" + min + ":" + sec;
	}
var tabind = 1;
	this.editTable = function(click) {
		if(click > 1){
			//Создаем клон последней строки в таблице с данными
			let coll = document.getElementById('table').children,
					clon = coll[coll.length - 1].cloneNode(true);
			clon.children[3].innerHTML = document.getElementById('hr').innerHTML + ':' + document.getElementById('min').innerHTML;
			clon.children[2].children[0].value = 1;
			clon.children[1].children[0].value = '';
			clon.children[0].children[0].checked = 0;
			clon.tabIndex = tabind;
			tabind++;

			return coll[coll.length - 1].parentNode.insertBefore(clon, coll[coll.length - 1].nextSibling);
		}
	}

	this.saveTable = function(isif) {
		let qt = document.getElementById('table').children,
				textDump = '',
				textDump_two = ' ';

		//if (click == 1) textDump = localStorage.getItem('tableDump');
		
		for(var i = 1; i < qt.length; i++) {
			let b = qt[i].children[3].innerHTML,
					a = qt[i].children[2].children[0].value,
					c = qt[i].children[1].children[0].value;
			textDump += c.replace(/ /ig, "&") + ";" + a + ";" + b + "/";
			textDump_two += c + "	" + a + "	" + b + "	\n";
		}

		console.log(click);

		if(isif){
			var input = document.getElementById('copy-value');
			input.value = textDump_two;
			event.preventDefault();
			input.select();
			document.execCommand('copy');
			//input.value = "Количество";
		}

		opt.dataSaveStorage('tableDump', textDump)
	}

	this.drawingTable = function() {
		let data = localStorage.getItem('tableDump');
		if(data) {
			document.getElementById('press').innerHTML = "^&";
			var coll = document.getElementById('table').children,
					row = data.split('/');
				row.pop();
				//console.log(row);
				
				for(let i = 0; i < row.length; i++) {
					var clon = coll[coll.length - 1].cloneNode(true);

					clon.children[1].children[0].value = row[i].split(';')[0].replace(/&/ig, " ");
					clon.children[2].children[0].value = row[i].split(';')[1];
					clon.children[3].innerHTML = row[i].split(';')[2];
					coll[coll.length - 1].parentNode.insertBefore(clon, coll[coll.length - 1].nextSibling);
					clon.tabIndex = tabind;
					tabind++;
				}
				/*
				Удалить первую строку таблицы, 
				необходимо прежде исправить сохранение таблицы
				*/
			document.getElementById('table').children[1].remove();
			return;
		}
		document.getElementById('press').innerHTML = "press space";
		return false;
	}

	this.dataSaveStorage = function(name, facts) {
		try {
			localStorage.setItem(name, facts)
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alart(">5mb");
			}
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

	this.timer = function() {
		var sec = 0,
				min = 0,
				hr = 0;
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
				return click = 1;
			}

			/*Запись в локальное хранилище + проверка на переполнение*/
			/*Только вот на секунду отстает*/
			opt.dataSaveStorage('dateDump', opt.realTime() + opt.timerTime());

			return document.getElementById('sec').innerHTML = sec,
			document.getElementById('min').innerHTML = min,
			document.getElementById('hr').innerHTML = hr;
		}, 1000);
	}

	this.calculateAmount = function() {
		let elem = document.getElementById('table').children,
				sumH = 0,
				sumM = 0,
				sum = 0,
				j = [];

		for(let i = 1; i < elem.length; i++) {
			if(elem[i].children[0].children[0].checked == 1) {

				j.push(i);
				sumH += +elem[i].children[3].innerHTML.split(':')[0];
				sumM += +elem[i].children[3].innerHTML.split(':')[1];
			}
		}
		sum = sumH + ':' + sumM;
		elem[j[0]].children[3].innerHTML = sum;
		elem[j[0]].children[0].children[0].checked = 0;

		for(let i = 1; i < j.length; i++) {
			elem[j[i]].remove();
		}
		opt.saveTable();
	}

	this.pressengCombinations = function(fn) {
		let codes = [].slice.call(arguments, 1),
				press = {};

		document.onkeydown = function(e) {
			e = e || window.event;
			press[e.keyCode] = true;

			for(let i = 0; i < codes.length; i++) {
				if(!press[codes[i]]) {
					return;
				}
			}
			press = {};
			fn();
		};
		document.onkeyup = function(e) {
			e = e || window.event;
			delete press[e.keyCode];
		};
	}
}

var opt = new tuning();

if(!opt.checkCookies('pampam')) {
	//opt.clearStorage();
	var date = new Date(new Date().getTime() + 60 * 1000); //57 600 000мс 
	document.cookie = "pampam=value; path=/; expires=" + date.toUTCString();
}

/*Провека данных в хранилище*/
let dateTime = localStorage.getItem('dateDump');
if(dateTime) {
	console.log("Time since last visit + recorded time: " + opt.timePassed(dateTime));
}

/*Проверка в локальном хранилище параметров*/
let optio = localStorage.getItem('options');
if(optio) {
	if(optio.indexOf('true') !== -1) {
		hidingСolumn();
		document.getElementById('check').checked = 1;
	}
}

if(opt.drawingTable()) {
	opt.drawingTable();
}

var click = 0;

opt.pressengCombinations(
	function() {
		click ++;
		if(click >= 1){
			opt.timer();
			/*Задержка для определение новых узлов*/
			setTimeout(function() {
				opt.saveTable();
			}, 500);
		}
		opt.editTable(click);
		console.log("number pressing: " + click);
	},
	(function() {
		return "Z".charCodeAt(0);
	})(),
	(function() {
		return "X".charCodeAt(0);
	})()
);

/* Кнопка меню*/
document.getElementById('point').addEventListener('click', function(){
	opt.menuButton();
});

/* Чистка таблицы и Local Storage*/
document.getElementById('clear').addEventListener('click', function(){
	localStorage.removeItem('dateDump');
	localStorage.removeItem('tableDump');
	opt.clearStorage();
	console.log('Значение из хранилища, с ключем dateDump, отчищено!');
});

document.getElementById('copy').addEventListener('click', function() {
	opt.saveTable(true);
});

/*Скрываем первый столбец*/
document.getElementById('check').addEventListener('click', function() {
	var qt = document.getElementById('table').children;
	if(document.getElementById('check').checked) {
		hidingСolumn();
		opt.dataSaveStorage('options', 'true');
		return;
	}
	for(var j = 1; j < qt.length; j++){
			qt[j].children[1].style.visibility = '';
			qt[j].children[2].style.visibility = '';
		}
		opt.dataSaveStorage('options', 'false');
		return;
});

document.getElementById('copy').addEventListener('click', function() {
	let ele = document.getElementById('message');
	ele.classList.toggle('open');
	setTimeout(function() {
		ele.classList.remove('open');
	}, 1000);
});

var summ = document.getElementById('sum');

summ.addEventListener('click', function() {
	summ.style.display = 'none';
	opt.calculateAmount();
});

document.getElementById('table').addEventListener('click', function() {
	let elem = document.getElementById('table').children,
			a = 0;

	for(let i = 1; i < elem.length; i++) {
		if(elem[i].children[0].children[0].checked == true) {
			a++;
		}
	}
	if(a >= 2) {
				summ.style.display = 'inline-block'
			} else {
				summ.style.display = 'none';
				a = 0;
			}
});

var aelem;

function activElemtn() {
	aelem = document.activeElement
	return aelem;
}

document.body.addEventListener('contextmenu', function(e) {
	e = e || window.event;
	e.preventDefault();

	activElemtn();
	var cont = document.getElementById('contextmenu');

	if(aelem.parentNode.parentNode.className == 'row' || aelem.className == 'row') {
		cont.style.left = e.clientX - 1 + 'px';
		cont.style.top = e.clientY - 20 + 'px';
		document.getElementById('delet').style.display = '';
		cont.style.display = "block";
	} else {
		cont.style.left = e.clientX - 1 + 'px';
		cont.style.top = e.clientY - 20 + 'px';
		document.getElementById('delet').style.display = 'none';
		cont.style.display = "block";
	}
});

document.getElementById('delet').addEventListener('click', function() {
	if(aelem.parentNode.parentNode.className == 'row') {
		aelem.parentNode.parentNode.remove();
		document.getElementById('contextmenu').style.display = 'none';
	}
	if( aelem.className == 'row') {
		document.getElementById('contextmenu').style.display = 'none';
		aelem.remove();
	}
});

document.getElementById('help').addEventListener('click', function() {
	let button = document.getElementById('nav-menu');
	button.classList.toggle('on');
	button.style.display = 'block';
	document.getElementById('point').classList.toggle('open');
});

document.body.addEventListener('click', function() {
	document.getElementById('contextmenu').style.display = 'none';
});