$ ->
	highlights = new SalesDemoHighlights('cta', 'Call to Action')

	# highlights.link('Call to Action')

class SalesDemoHighlights
	constructor: (el, label) ->
		@el = $(el)
		@selector = '.' + el
		@link label

	page: $('#page').contents()

	cssObj:
		'position': 'relative'
		'top': '20px'
		'transform': 'scale(0.95)'
		'box-shadow': '0 0 100px #000000'
		'transition': 'all 1.0s'

	link: (label) ->
		$('.header .nav').append('<li><a href="#" class="' + @selector + '-link">' + label + '</a></li>')
		@linkClick()

	linkClick: ->
		$(@selector + '-link').on 'click', SalesDemoHighlights.load()

	@load: ->
		$('#page').contents().find(@selector).css(@cssObj)
		console.log 'load'
		false