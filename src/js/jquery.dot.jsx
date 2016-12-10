import { Stage } from './Stage';
import { Oekaki } from './Oekaki';

$.fn.dot = function(options) {
	const $el = $(this)
	const $mini = $('.mini')

	const stage = new Stage($el)
	const mini = new Stage($mini);
	mini.changePxSize({
		pxWidth: 2,
		pxHeight: 2,
	})
	mini.changeSize({
		width: 32,
		height: 32
	})

	const search = window.location.search.substring(1,window.location.search.length)
	const inflateSearch = inflate(search);

	if(window.location.search) {
		stage.changeLayers({layers:
			JSON.parse(decodeURI(inflateSearch.replace(/%23/g,'#')))
		})
		mini.changeLayers({layers:
			JSON.parse(decodeURI(inflateSearch.replace(/%23/g,'#')))
		})
	}

	const miniOekaki = new Oekaki({
		stage: mini
	})
	const oekaki = new Oekaki({
		stage,
		drawingFunction: () => {
			mini.changeLayers({layers: stage.layers})
			miniOekaki.load()

			//console.log(new RGBColor(oekaki.color));
			//console.log('test');
		}
	});

	oekaki.load()
	miniOekaki.load()

	oekaki.setDrawEvent()

	if(window.location.search) {
		oekaki.changeHistory(JSON.parse(localStorage['draw']))
		//oekaki.repeat({});
	}

	$('.save').on('click', (e) => {
		oekaki.save()
	});

	$('.repeat').on('click', (e) => {
		oekaki.changeHistory(JSON.parse(localStorage['draw']))
		oekaki.repeat({})
	});

	$('.num').on('keyup', (e) => {
		stage.setLayer({layerNum: parseInt(e.target.value)})
		stage.setLayer({layerNum: parseInt(e.target.value)})
	});

	$('.addLayer').on('click', (e) => {
		stage.createNewLayer()
		$('.num').val(stage.layerNum)
	});


	$('.eraser').on('click', (e) => {
		oekaki.changeFillStyle({fillStyle: oekaki.fillStyle ? '' : oekaki.color})
	});
	$('.color').on('keyup', (e) => {
		console.log($('.color').val());

		const color = $('.color').val();

		oekaki.changeColor({color})
		oekaki.changeFillStyle({fillStyle: color})
	});
}