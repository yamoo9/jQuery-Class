require.config({

	baseUrl: '../src',

	paths: {
		'qunit'                  : '../libs/qunit/qunit',
		'jquery'                 : '../libs/jquery.min',
		// 'jquery.radioClass'      : 'jquery.radioClass',
		'jquery.radioClass'      : 'amd.jquery.radioClass',
		'jquery.radioClass.test' : '../test/jquery.radioClass.test',
	},

	shim: {
		'qunit': {
			exports: 'QUnit',
		},
		// 'jquery.radioClass': {
		// 	exports: 'jQuery.fn.radioClass',
		// 	deps: ['jquery']
		// },
		'jquery.radioClass.test': {
			deps: [
				'qunit',
				'jquery.radioClass'
			]
		}
	},

	urlArgs : 'ts=' + (new Date()).getTime()

});


require(['jquery.radioClass.test'], function() {

	/**
	 * ------------------------------------
	 * QUnit 비동기 실행
	 * http://api.qunitjs.com/QUnit.start/
	 * http://api.qunitjs.com/QUnit.config/
	 * ------------------------------------
	 */
	// QUnit.config.autostart = false;
	QUnit.start();

	// 템플릿
	var html_template = '';
	html_template += '<li><a href="">야무 한글 로렘입숨.</a></li>';
	html_template += '<li><a href="">흐르는, 고동소리?</a></li>';
	html_template += '<li><a href="">티셔츠, 흐르는?</a></li>';
	html_template += '<li><a href="">설레는, 운동화도.</a></li>';
	html_template += '<li><a href="">청춘, 찬란한.</a></li>';

	// 코드 동적 생성
	$('<ul>',{
		'id': 'after-demo',
		'html': html_template,
		'css': {
			width: '10rem'
		},
		'on': {
			'click': function(e) {
				e.preventDefault();
				$(e.target).radioClass('clicked', 'li');
			}
		}
	})
	.insertAfter('#demo')
	// ul#after-demo > li:nth-child(3)
	.find('li').eq(2)
		// ul#after-demo > li:nth-child(3) > a
		.children('a').trigger('click');

});