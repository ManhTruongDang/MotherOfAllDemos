var first_time = 0;	

// Code for the 1st pie chart 
// var counts = json;
counts = {
	"scenic": 225,
	"air_tours": 50,
	"surface_tours": 80,
	"undersea_tours": 431,
	"activities": 23,
	"general": 344
};
count_tmp = counts;
var sub_categories = [];
var counters = [];
sub_categories = ["scenic", "air_tours", "surface_tours", "undersea_tours", "activities", "general"];
counters =       [225,            50,          69,              353,             23,         344]; 
var data = [{
	values: counters,
	labels: sub_categories.map(t => category_formatted[t]),
	type: 'pie',
	sort: false
}];
var layout = {
	title: 'Number of tweets across categories',
	titlefont:{
		size: 15
	},
	height: 400,
	width: 500                              
};
Plotly.newPlot('categories', data, layout);                            
var text_to_show_total_number_of_tweets = "Total number of tweets: 966"; // Total tweets != sum of tweets in each category because each tweet can be about several categories
//$("#title_of_categories_chart").text(text_to_show_total_number_of_tweets);

// Code for the table
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
$("#data_table").empty();
$('#data_table').DataTable( {
	//data: tweeted,
	data: tweet_data,
	searching: false,
	columns: [
		{ title: "Tweet" },
		{ title: "Sub-categories" },
		{ title: "Sentiment score" }                                    
	],               
	columnDefs: [{ 
		render: function ( data, type, row ) {                                        
			return '<p style = "text-align:center">' + data.map(t => sub_category_formatted[t]) + '</p>';
			//return data;
		},
		targets: 1 // Sub-categories                                   
	}, {
		render: function ( sentiment_score, type, row ) {                                        
			if (sentiment_score >= 0.5){
				return '<p class = "Positive_comment">' + sentiment_score + '</p>';
			}
			else if (sentiment_score <= -0.5){
				return '<p class = "Negative_comment">' + sentiment_score + '</p>';
			}
			else {
				return '<p class = "Neutral_comment">' + sentiment_score + '</p>';
			}
		},
		targets: 2 // Sentiment score
		
	}]                                    
}); 
/*
$("#stacked_bar_chart").empty();                            
var positives = [];
var negatives = [];
var neutrals = [];
var list_of_sub_categories = [];
tweet_data.forEach(function (entry){                                
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
for (let i = 0; i < positives.length; i++){
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
var layout = {
	title: 'Distribution of positive, negative and neutral comments (%)',
	barmode: 'stack',
	yaxis: {range: [0, 100]}
};
Plotly.newPlot('stacked_bar_chart', stacked_data, layout);
*/
// Change table and charts when click on category

$('.Category').click(function() {
	/*
	if (first_time === 0){
		first_time = 1;
		// On the first click (which is made automatically to be on Scenic), 
		// generate HTML for the chart on the right
		$("#column_10").append('<div class="hn-charts row"><div class="col-md-12" style="padding:0"><div class="box"><div class="box-header with-border"><h3 class="box-title"><p id = "stacked_bar_chart_header"></p></h3>									<div class="box-tools pull-right"><button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button></div></div><div class="box-body hs_functional_module" id="map-canvas" ><div id = "stacked_bar_chart_for_sub_categories" class = "display" width= "100%"></div></div></div></div>	</div>	 ');
	}
	*/	
	var category_name = this.id;
	var filtered_data = [];		
	var total_number_of_tweets_in_selected_category = 0;	
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
			total_number_of_tweets_in_selected_category++;
			data_element.push(entry[0]);
			//data_element.push(entry[1]);
			data_element.push(sub_categories_to_be_added);
			data_element.push(entry[2]);                                   
			filtered_data.push(data_element);
		}
	});	
	var category_info = {
		"scenic":{
			"submarine_creature": 137, 
			"beach": 37, 
			"island": 38, 
			"forest": 3,
			"valley": 1,
			"waterfall": 1
		},
		"air_tours":{
			"scenic_flight_tour": 43, 
			"sky_diving": 7 
		},
		"surface_tours":{
			"sailing": 10, 
			"cruise": 26, 
			"boat_tour": 33, 
			"whale_watching": 4, 
			"jet_tour": 2, 
			"fishing_charter": 3 
		},
		"undersea_tours":{
			"snorkeling_tour": 208,
			"scuba_diving": 223	
		},
		"activities":{
			"hiking": 3, 
			"swimming": 16,
			"horse_riding": 1,
			"surfing": 3 
		}
	};
			
	/*
	fetch(this.id + ".json")
		.then(response => response.json())
		.then(function (json){
	*/		
			json = category_info[category_name];
			var counts = json;
			var sub_category_list = [];
			var counters = [];
			for (var property in  counts) {
				if (counts.hasOwnProperty(property)){
					console.log(property);
					console.log(counts[property]);					
					if (counts[property] > 0){
						sub_category_list.push(property);
						counters.push(counts[property]);
				    }
				}
			}
			console.log("HIHIHEHE");
			//console.log(counters);
			//console.log(sub_category_list);
			var data = [{
				values: counters,
				labels: sub_category_list.map(t => sub_category_formatted[t]),
				type: 'pie',
				sort: false			
			}];
			var title_str_for_layout = 'Number of tweets across sub-categories (';
			title_str_for_layout += category_formatted[category_name];
			title_str_for_layout += ')';
			var layout = {
				// title: 'Distribution of sub-categories',
				title: title_str_for_layout,
				titlefont:{
					size: 15
				},
				height: 400,
				width: 500                           
			};
			Plotly.newPlot('sub_categories', data, layout);			
			
			var text_to_show_total_number_of_tweets_in_selected_category = "There are ";
			text_to_show_total_number_of_tweets_in_selected_category += total_number_of_tweets_in_selected_category;
			text_to_show_total_number_of_tweets_in_selected_category += " tweets that contain '";
			text_to_show_total_number_of_tweets_in_selected_category += category_formatted[category_name];
			text_to_show_total_number_of_tweets_in_selected_category += "' keyword";
			//$("#title_of_sub_categories_chart").text(text_to_show_total_number_of_tweets_in_selected_category);
		//});		
	

	$('#data_table').dataTable().fnClearTable();
	$('#data_table').dataTable().fnAddData(
			filtered_data
	);		

	/*
	$("#stacked_bar_chart_for_sub_categories").empty(); 
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
			 
	Plotly.newPlot('stacked_bar_chart_for_sub_categories', stacked_data, layout);
	*/
}); 

				
// Ha Nguyen's code here
$(document).ready(function(){	
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
	// Default is Scenic
	$("#scenic").click();
});
