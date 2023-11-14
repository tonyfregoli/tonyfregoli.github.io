var colors = ['#FF5722','#039BE5','#009688','#E91E63','#9C27B0','#D84315'];

$.ajax({
	url:'content/content.json',
	dataType: 'json',
    success: function(data) {
    	initGrid(data);
    }
});

hover = false;

function initGrid(data){

	generateGrid(data);
	generateButtons(data);
	var $grid;
	$('.container').imagesLoaded(function(){

		$grid =  $('#grid').isotope({
		  // options
		  itemSelector: '.grid-item',
		  layoutMode: 'fitRows',
		  masonry: {
      		columnWidth: '.grid-item'
    	  }
		});		
	});


	$('.filter-button-group').on( 'click', 'button', function() {
		$('.filterbutton').removeClass('highlight');
	    var filterValue = $(this).attr('data-filter');
	    $grid.isotope({ filter: filterValue });
	    $(this).addClass('highlight');
	});

}

function generateGrid(data){
	var color = 0;
	var restOfColors = colors;
	
	data.forEach(function(d,i){
		
		var classes = 'col-md-4 col-sm-6 grid-item';
		d.tags.forEach(function(tag){
			classes += ' '+tag.replace(' ','_').toLowerCase();
		});
		var html = '<div id="grid'+i+'" class="'+classes+'"><div class="inner"><img id="image'+i+'" src="'+d.image+'" /><div id="overlay'+i+'" class="overlay">';
		html+='<h3 class="grid-title">'+d.title+'</h3><p class="overlaydesc">'+d.description+'</p>';
		html +='</div></div></div>';

		$('#grid').append(html);

		$('#image'+i).css({"max-width": "100%", "max-height": "auto"});
		
		if(restOfColors.length == 0) {
			restOfColors = colors.toSpliced(color, 1)
		} else if(i != 0) {
			restOfColors.splice(color, 1)
		}
		color = Math.floor((Math.random() * (restOfColors.length-1)));
		$('#overlay'+i).css({'background-color':restOfColors[color]});

		$('#overlay'+i).on('click',function(){
			if($('#overlay'+i).css('opacity')>0.5){
				window.open(d.url, '_blank');
			}
		});

		$('#grid'+i).on("mouseenter", function(){						
        	$('#overlay'+i).fadeIn(400);
    	});

    	$('#grid'+i).on("mouseleave", function(){	
        	$('#overlay'+i).stop().fadeOut(100);
    	});
	});
}

function generateButtons(data){
	var filters = [];
	data.forEach(function(d){
		d.tags.forEach(function(tag){
			if(filters.indexOf(tag)==-1){
				filters.push(tag);
			}
		});
	});

	filters.forEach(function(f){
		var html = '<button class="filterbutton" data-filter=".'+f.replace(' ','_').toLowerCase()+'">'+f+'</button> ';
		$('.filter-button-group').append(html);
	});
}