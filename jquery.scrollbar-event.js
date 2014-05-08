// jquery.scrollbar-event 201403*pike
// http://stackoverflow.com/questions/2175992/detect-when-window-vertical-scrollbar-appears/22571956#22571956
// https://gist.github.com/OrganicPanda/8222636
// trigger 'scrollbar' event on the top window
// on resize, also if scrollbars appear

$(document).ready(function() {
	
	$('<iframe id="scrollbar-listener"></iframe>').css({
		'position'			: 'fixed',
		'width'				: '100%',
		'height'			: 0, 
		'bottom'			: 0,
		'border'			: 0,
		'background-color'	: 'transparent'
	}).on('load',function() {
		var vsb		= (document.body.scrollHeight > document.body.clientHeight);
		var timer 	= null;
		var throttle = function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				var vsbnew = (document.body.scrollHeight > document.body.clientHeight);
				if (vsbnew) {
					if (!vsb) {
						$(top.window).trigger('scrollbar',[true]);
						vsb=true;
					}
				} else {
					if (vsb) {
						$(top.window).trigger('scrollbar',[false]);
						vsb=false;
					}
				}
			}, 100);
		}
		if (this.contentWindow.addEventListener) {
			this.contentWindow.addEventListener('resize', throttle);
		} else {
			// suspecting this to hang ie<9
			// and i dont need it there
			// this.contentWindow.attachEvent('onresize', throttle);
		}
	}).appendTo('body');
});