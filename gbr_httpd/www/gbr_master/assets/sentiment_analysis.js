var first_time = 0;	

$("#stacked_bar_chart").empty();                            
var positives = [];
var negatives = [];
var neutrals = [];
// var list_of_sub_categories = [];
var list_of_categories = [];
var tweet_data = [];		
var tweeted = [];
json.forEach(function (entry){	
	var data_array = [];
	data_array.push(entry["Tweet"]);                                
	data_array.push(entry["Sub_categories"]);                               
	data_array.push(entry["Sentiment_score"]);
	tweet_data.push(data_array);
	//tweeted.push(data_array);
});
console.log("Nguyen Dinh Ha(nguyenha1.08112@gmail.com),Dang Manh Truong (dangmanhtruong@gmail.com), Tran Duc Long(duclong.pfiev@gmail.com)");
tweet_data.forEach(function (entry){                                
	var subs = entry[1];
	var sentiment_score = entry[2];
	var category_array = subs.map(t => sub_category_to_category[t]);
	category_array = Array.from(new Set(category_array)); 
	category_array.forEach(function (category){
		if (!list_of_categories.includes(category)){
			list_of_categories.push(category);
			positives.push(0);
			negatives.push(0);
			neutrals.push(0);  
		}
		var idx = list_of_categories.indexOf(category);
		if (sentiment_score >= 0.5){
			positives[idx]++;
		}
		else if (sentiment_score <= -0.5){
			negatives[idx]++;
		}
		else {
			neutrals[idx]++;
		}		
	});
	/*
	subs.forEach(function (sub_category){
		if (!list_of_sub_categories.includes(sub_category)){
			list_of_sub_categories.push(sub_category);
			positives.push(0);
			negatives.push(0);
			neutrals.push(0);                                        
		}
		var idx = list_of_sub_categories.indexOf(sub_category);
		if (sentiment_score >= 0.5){
			positives[idx]++;
		}
		else if (sentiment_score <= -0.5){
			negatives[idx]++;
		}
		else {
			neutrals[idx]++;
		}
	});
	*/
});
for (let i = 0; i < positives.length; i++){
	let sum_all = positives[i] + negatives[i] + neutrals[i];
	positives[i] = positives[i]*100 / sum_all;
	negatives[i] = negatives[i]*100 / sum_all;
	neutrals[i] = neutrals[i]*100 / sum_all;
}
//list_of_sub_categories = list_of_sub_categories.map(
//		t => sub_category_formatted[t]);
list_of_categories = list_of_categories.map(
		t => category_formatted[t]);
var negative_bar = {
	x: list_of_categories,
	y: negatives,
	name: 'Negatives',
	type: 'bar'
};
var positive_bar = {
	x: list_of_categories,
	y: positives,
	name: 'Positives',
	type: 'bar'
};
var neutral_bar = {
	x: list_of_categories,
	y: neutrals,
	name: 'Neutrals',
	type: 'bar'
};                            
var stacked_data = [neutral_bar,negative_bar,positive_bar];
var layout = {
	title: 'Distribution of positive, negative and neutral comments (%)',
	barmode: 'stack',
	yaxis: {range: [0, 100]}
};
Plotly.newPlot('stacked_bar_chart', stacked_data, layout);

// Change table and charts when click on category
$('.Category').click(function() {
//category_list.forEach(function(entry){
	/*
	if (first_time === 0){
		first_time = 1;
		// On the first click (which is made automatically to be on Scenic), 
		// generate HTML for the chart on the right
		$("#column_10").append('<div class="hn-charts row"><div class="col-md-12" style="padding:0"><div class="box"><div class="box-header with-border"><h3 class="box-title"><p id = "stacked_bar_chart_header"></p></h3>									<div class="box-tools pull-right"><button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button></div></div><div class="box-body hs_functional_module" id="map-canvas" ><div id = "stacked_bar_chart_for_sub_categories" class = "display" width= "100%"></div></div></div></div>	</div>	 ');
	}
	*/
	var category_name = this.id;
	//var category_name = entry;
	fetch(this.id + ".json")
		.then(response => response.json())
		.then(function (json){
			var counts = json;		
		});		
		
	var filtered_data = [];		
	tweet_data.forEach(function (entry){			
		var sub_category_list = entry[1];
		var sub_categories_to_be_added = [];
		var data_element = [];
		var q = 0;
		sub_category_list.forEach(function (sub_category){
			if (category_types[category_name].includes(sub_category)){
				q = 1;
				sub_categories_to_be_added.push(sub_category);
			}
		});
		if (q===1){
			data_element.push(entry[0]);
			//data_element.push(entry[1]);
			data_element.push(sub_categories_to_be_added);
			data_element.push(entry[2]);                                   
			filtered_data.push(data_element);
		}
	});	
	 
	//$("#stacked_bar_chart_for_sub_categories").empty(); 
	var positives = [];
	var negatives = [];
	var neutrals = [];
	var list_of_sub_categories = [];
	filtered_data.forEach(function (entry){                                
		var subs = entry[1];
		var sentiment_score = entry[2];
		subs.forEach(function (sub_category){
			if (!list_of_sub_categories.includes(sub_category)){
				list_of_sub_categories.push(sub_category);
				positives.push(0);
				negatives.push(0);
				neutrals.push(0);                                        
			}
			var idx = list_of_sub_categories.indexOf(sub_category);
			if (sentiment_score >= 0.5){
				positives[idx]++;
			}
			else if (sentiment_score <= -0.5){
				negatives[idx]++;
			}
			else {
				neutrals[idx]++;
			}
		});
	});
	 
	for (var i = 0; i < positives.length; i++){
		let sum_all = positives[i] + negatives[i] + neutrals[i];
		positives[i] = positives[i]*100 / sum_all;
		negatives[i] = negatives[i]*100 / sum_all;
		neutrals[i] = neutrals[i]*100 / sum_all;
	} 
	list_of_sub_categories = list_of_sub_categories.map(
			t => sub_category_formatted[t]);
	var negative_bar = {
		x: list_of_sub_categories,
		y: negatives,
		name: 'Negatives',
		type: 'bar'
	};
	var positive_bar = {
		x: list_of_sub_categories,
		y: positives,
		name: 'Positives',
		type: 'bar'
	};
	var neutral_bar = {
		x: list_of_sub_categories,
		y: neutrals,
		name: 'Neutrals',
		type: 'bar'
	};                            
	var stacked_data = [neutral_bar,negative_bar,positive_bar];
	var title_str = 'Distribution of positive, negative and neutral comments (sub-categories of ';
	title_str += category_formatted[category_name];
	title_str += ')(%)';
	var layout = {
		//title: 'Distribution of positive, negative and neutral comments (%)',
		title: title_str,
		barmode: 'stack',
		yaxis: {range: [0, 100]}
	};          			 
	//Plotly.newPlot('stacked_bar_chart_for_sub_categories', stacked_data, layout);
	//id_plot = 'stacked_bar_chart_for_sub_categories_of_';
	//id_plot += category_name;
	id_plot = 'stacked_bar_chart_for_sub_categories_of_selected_category';
	Plotly.newPlot(id_plot, stacked_data, layout);
}); 
					
// Ha Nguyen's code here

$(document).ready(function(){	
	/*
    $('#myBut').click(function(){
        $('.myTable').toggle('slow');
		$('#myBut').text(function (){
			if ($('#myBut').text() === 'Show tweets'){
				return 'Hide tweets';
			}
			else {
				return 'Show tweets';
			}
		});
    });
	*/
	// Default is Scenic
	$("#scenic").click();
});
