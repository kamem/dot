//ユーザーエージェントにより判別
const userAgent = navigator.userAgent;
userAgent.match(/iPhone OS (\w+){1,3}/g);
userAgent.match(/CPU OS (\w+){1,3}/g);

//iPhone iPad のiOSを判別
const osVar=(RegExp.$1.replace(/_/g, '')+'00').slice(0,3);

//ユーザーエージェント判別 配列
export const UA = {
	iPhone : userAgent.search(/iPhone/) !== -1,
	iPad : userAgent.search(/iPad/) !== -1,
	Android : ((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1),
	AndroidTab : (userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)),
	Android3_2 : userAgent.search(/Android 3.2/) !== -1,
	iOS5_less : ((userAgent.search(/iPhone/) !== -1) || (userAgent.search(/iPad/) !== -1)) && (osVar < 500),
	other : !(
	(userAgent.search(/iPhone/) !== -1) ||
	(userAgent.search(/iPad/) !== -1) ||
	(((userAgent.search(/Android/) !== -1) && (userAgent.search(/Mobile/) !== -1)) && (userAgent.search(/SC-01C/) == -1)) ||
	((userAgent.search(/Android/) !== -1) && ((userAgent.search(/Mobile/) == -1) || (userAgent.search(/SC-01C/) !== -1)))
	)
};

//モバイル判別
export const isMobile = UA.iPhone || UA.iPad || UA.Android || UA.AndroidTab;

//イベント判別
export const EVENT_TYPE = {
	touchStart: isMobile ? 'touchstart' : 'mousedown',
	touchEnd: isMobile ? 'touchend' : 'mouseup',
	touchMove: isMobile ? 'touchmove' : 'mousemove'
};