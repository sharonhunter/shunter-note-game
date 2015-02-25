$(document).ready(function() {
	
	//var correctCards = 0;
	//display default game on page load
	$(init);
	
	//shuffle plugin from http://james.padolsey.com/javascript/shuffling-the-dom/
	(function($) {
		$.fn.shuffle = function() {
			var allElems = this.get(),
				getRandom = function(max) {
					return Math.floor(Math.random() * max);
				},
				shuffled = $.map(allElems, function() {
					var random = getRandom(allElems.length),
						randEl = $(allElems[random]).clone(true)[0];
					allElems.splice(random, 1);
					return randEl;
				});
			this.each(function(i) {
				$(this).replaceWith($(shuffled[i]));
			});
			return $(shuffled);
		};
	})(jQuery);

	function setUpDrag() {
		$('#cardPile img').draggable({
			containment: '#card_game_container',
			cursor: 'move',
			snap: '.card_holder',
			stack: '#cardPile div',
			revert: true
		});
		$('#cardSlots img').droppable({
			accept: '#cardPile img',
			drop: handleCardDrop
		});
	}

	function handleCardDrop(event, ui) {
		var slotLetter = $(this).attr('data-title');
		var cardLetter = ui.draggable.attr('data-title');
		if (slotLetter == cardLetter) {
			ui.draggable.addClass('correct').draggable('disable');
			ui.draggable.position({
				of: $(this),
				my: 'left top',
				at: 'left top'
			});
			ui.draggable.draggable('option', 'revert', false);
			$(this).droppable('disable').addClass('green_glow');
			correctCards++;
		}
		if (correctCards == 5) {
			$('#successMessage').show();
			$('#successMessage').animate({
				left: '380px',
				top: '200px',
				width: '400px',
				height: '100px',
				opacity: 1
			});
		}
	}

	function init() {
		$('#cardPile').empty();
		$('#cardSlots').empty();
		$('#defaultCardPile img').clone().appendTo('#cardPile');
		$('#defaultCardSlots img').clone().appendTo('#cardSlots');
		$('#cardPile img').shuffle();
		setUpDrag();
		correctCards = 0;
		//hide success message initially
		$('#successMessage').hide();
		$('#successMessage').css({
			left: '580px',
			top: '250px',
			width: 0,
			height: 0
		});
	}//end of init function

	function lines() {
		$('#cardPile').empty();
		$('#cardSlots').empty();
		$('#linesCardPile img').clone().appendTo('#cardPile');
		$('#linesCardSlots img').clone().appendTo('#cardSlots');
		$('#cardPile img').shuffle();
		setUpDrag();
		correctCards = 0;
		$('#successMessage').hide();
		$('#successMessage').css({
			left: '580px',
			top: '250px',
			width: 0,
			height: 0
		});
	} //end of lines function

	function spaces() {
		$('#cardPile').empty();
		$('#cardSlots').empty();
		$('#spacesCardPile img').clone().appendTo('#cardPile');
		$('#spacesCardSlots img').clone().appendTo('#cardSlots');
		$('#cardPile img').shuffle();
		setUpDrag();
		correctCards = 0;
		$('#successMessage').hide();
		$('#successMessage').css({
			left: '580px',
			top: '250px',
			width: 0,
			height: 0
		});
	} //end of spaces function
	
	$("#default-button").click(init);
				
	$("#lines-button").click(lines);
			
	$("#spaces-button").click(spaces);
});