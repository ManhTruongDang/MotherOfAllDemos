// Word cloud: https://www.zingchart.com/docs/chart-types/wordcloud/
var myConfig = {
	type: 'wordcloud',
	options: {
		//text: full_text_for_word_cloud,
		//minLength: 4,
		//ignore: ['establish','this'],
		"words": [
			{
			  "text": "GreatBarrierReef",
			  "count": 21
			},
			{
			  "text": "australia",
			  "count": 20
			},			
			{
			  "text": "barrier",
			  "count": 19
			},
			{
			  "text": "Reef",
			  "count": 18
			},
			{
			  "text": "snorkeling",
			  "count": 18
			},
			{
			  "text": "coral",
			  "count": 17
			},
			{
			  "text": "tropics",
			  "count": 17
			},
			{
			  "text": "sea",
			  "count": 16
			},
			{
			  "text": "nemo",
			  "count": 15
			},
			{
			  "text": "barrier",
			  "count": 14
			},
			{
			  "text": "turtles",
			  "count": 13
			},
			{
			  "text": "Cairn",
			  "count": 12
			},
			{
			  "text": "travel",
			  "count": 11
			},
			{
			  "text": "scuba",
			  "count": 10
			},
			{
			  "text": "diving",
			  "count": 9
			},
			{
			  "text": "paradise",
			  "count": 8
			},
			{
			  "text": "experience",
			  "count": 7
			},
			{
			  "text": "ocean",
			  "count": 6
			},
			{
			  "text": "nature",
			  "count": 5
			},
			{
			  "text": "trip",
			  "count": 4
			},
			{
			  "text": "port",
			  "count": 3
			},
			{
			  "text": "boats",
			  "count": 2
			},
			{
			  "text": "beautiful",
			  "count": 1
			},		
		],
		colorType: 'palette',
		palette: ['#E91E63','#2196F3','#4CAF50','#FFC107','#00BCD4','#673AB7','#8BC34A'],
		
		rotate: true,
		aspect: 'spiral', //'flow-center', 'flow-top', 'spiral',   
		
		style: {
		  fontFamily: 'Kranky',	
		  hoverState: {
			alpha: 1,
			backgroundColor: '#2196F3',
			borderRadius: 3,
			fontColor: 'white',
			textAlpha: 1,
		  },
		  
		  /*
		  tooltip: {
			visible: true,
			text: '%text: %hits',
			
			alpha: 0.9,
			backgroundColor: '#E91E63',
			borderColor: 'none',
			borderRadius: 3,
			fontColor: 'white',
			fontFamily: 'Courier',
			textAlpha: 1
		  }
		  */
		}
	}
		
};					
zingchart.render({
  id: 'word_cloud',
  data: myConfig,
  height: 400,
  width: '100%'
});

var network;
var allNodes;
var allEdges;
var highlightActive = false;

var nodesDataset;
var edgesDataset;

function redrawAll() {
    var container = document.getElementById('word_graph');
    var options = {
        height: '100%',
        nodes: {
            shape: 'circle',
            scaling: {
                min: 10,
                max: 30,
                label: {
                    min: 8,
                    max: 30,
                    drawThreshold: 2,
                    maxVisible: 20
                }
            },
            font: {
                size: 12,
                face: 'Tahoma'
            }			
        },
        edges: {
            width: 1,
            color: {
                inherit: 'source'
            },
            smooth: {
                type: 'continuous'
            }
        },
        interaction: {
            tooltipDelay: 200,
            hideEdgesOnDrag: false
        },		
		physics: {
			// enabled: true,
			// barnesHut:{
			// 	gravitationalConstant: 1,
			// },
			
			// stabilization: {
			// 	iterations: 0
			// },	
			
			
			// barnesHut: {
			// 	gravitationalConstant: 10,
			// 	centralGravity: 0.05,
			// 	//centralGravity: 0,
			// 	avoidOverlap: 1				
			// },
			solver: 'barnesHut',
			minVelocity: 0.75
						
		},
			
    };    
	// provide data in the normal fashion
	var jsonData = {
		"edges": [{"from": 106, "label": 103, "to": 136}, {"from": 106, "label": 14, "to": 147}, {"from": 106, "label": 117, "to": 232}, {"from": 106, "label": 18, "to": 310}, {"from": 106, "label": 13, "to": 379}, {"from": 106, "label": 34, "to": 388}, {"from": 106, "label": 283, "to": 580}, {"from": 106, "label": 3, "to": 647}, {"from": 106, "label": 14, "to": 700}, {"from": 106, "label": 16, "to": 894}, {"from": 106, "label": 45, "to": 1025}, {"from": 106, "label": 125, "to": 1047}, {"from": 106, "label": 20, "to": 1110}, {"from": 106, "label": 12, "to": 1176}, {"from": 106, "label": 42, "to": 1179}, {"from": 106, "label": 6, "to": 1345}, {"from": 106, "label": 3, "to": 1354}, {"from": 136, "label": 11, "to": 147}, {"from": 136, "label": 68, "to": 232}, {"from": 136, "label": 3, "to": 310}, {"from": 136, "label": 7, "to": 379}, {"from": 136, "label": 30, "to": 388}, {"from": 136, "label": 172, "to": 580}, {"from": 136, "label": 2, "to": 647}, {"from": 136, "label": 7, "to": 700}, {"from": 136, "label": 8, "to": 894}, {"from": 136, "label": 15, "to": 1025}, {"from": 136, "label": 306, "to": 1047}, {"from": 136, "label": 22, "to": 1110}, {"from": 136, "label": 8, "to": 1176}, {"from": 136, "label": 41, "to": 1179}, {"from": 136, "label": 5, "to": 1354}, {"from": 147, "label": 5, "to": 232}, {"from": 147, "label": 43, "to": 580}, {"from": 147, "label": 2, "to": 700}, {"from": 147, "label": 16, "to": 1025}, {"from": 147, "label": 12, "to": 1047}, {"from": 147, "label": 3, "to": 1176}, {"from": 147, "label": 3, "to": 1179}, {"from": 232, "label": 5, "to": 310}, {"from": 232, "label": 3, "to": 379}, {"from": 232, "label": 24, "to": 388}, {"from": 232, "label": 186, "to": 580}, {"from": 232, "label": 2, "to": 647}, {"from": 232, "label": 6, "to": 700}, {"from": 232, "label": 7, "to": 894}, {"from": 232, "label": 37, "to": 1025}, {"from": 232, "label": 76, "to": 1047}, {"from": 232, "label": 12, "to": 1110}, {"from": 232, "label": 5, "to": 1176}, {"from": 232, "label": 20, "to": 1179}, {"from": 310, "label": 57, "to": 379}, {"from": 310, "label": 58, "to": 388}, {"from": 310, "label": 34, "to": 553}, {"from": 310, "label": 112, "to": 580}, {"from": 310, "label": 47, "to": 647}, {"from": 310, "label": 50, "to": 700}, {"from": 310, "label": 57, "to": 894}, {"from": 310, "label": 4, "to": 1025}, {"from": 310, "label": 68, "to": 1047}, {"from": 310, "label": 58, "to": 1176}, {"from": 310, "label": 28, "to": 1179}, {"from": 310, "label": 35, "to": 1279}, {"from": 310, "label": 57, "to": 1345}, {"from": 310, "label": 54, "to": 1354}, {"from": 379, "label": 58, "to": 388}, {"from": 379, "label": 34, "to": 553}, {"from": 379, "label": 78, "to": 580}, {"from": 379, "label": 47, "to": 647}, {"from": 379, "label": 49, "to": 700}, {"from": 379, "label": 58, "to": 894}, {"from": 379, "label": 65, "to": 1047}, {"from": 379, "label": 8, "to": 1110}, {"from": 379, "label": 61, "to": 1176}, {"from": 379, "label": 25, "to": 1179}, {"from": 379, "label": 35, "to": 1279}, {"from": 379, "label": 59, "to": 1345}, {"from": 379, "label": 54, "to": 1354}, {"from": 388, "label": 34, "to": 553}, {"from": 388, "label": 131, "to": 580}, {"from": 388, "label": 45, "to": 647}, {"from": 388, "label": 50, "to": 700}, {"from": 388, "label": 57, "to": 894}, {"from": 388, "label": 5, "to": 1025}, {"from": 388, "label": 95, "to": 1047}, {"from": 388, "label": 26, "to": 1110}, {"from": 388, "label": 60, "to": 1176}, {"from": 388, "label": 40, "to": 1179}, {"from": 388, "label": 34, "to": 1279}, {"from": 388, "label": 58, "to": 1345}, {"from": 388, "label": 55, "to": 1354}, {"from": 553, "label": 34, "to": 580}, {"from": 553, "label": 34, "to": 647}, {"from": 553, "label": 33, "to": 700}, {"from": 553, "label": 34, "to": 894}, {"from": 553, "label": 34, "to": 1047}, {"from": 553, "label": 34, "to": 1176}, {"from": 553, "label": 34, "to": 1279}, {"from": 553, "label": 34, "to": 1345}, {"from": 553, "label": 34, "to": 1354}, {"from": 580, "label": 53, "to": 647}, {"from": 580, "label": 82, "to": 700}, {"from": 580, "label": 79, "to": 894}, {"from": 580, "label": 90, "to": 1025}, {"from": 580, "label": 282, "to": 1047}, {"from": 580, "label": 56, "to": 1110}, {"from": 580, "label": 82, "to": 1176}, {"from": 580, "label": 132, "to": 1179}, {"from": 580, "label": 35, "to": 1279}, {"from": 580, "label": 62, "to": 1345}, {"from": 580, "label": 62, "to": 1354}, {"from": 647, "label": 46, "to": 700}, {"from": 647, "label": 47, "to": 894}, {"from": 647, "label": 49, "to": 1047}, {"from": 647, "label": 46, "to": 1176}, {"from": 647, "label": 12, "to": 1179}, {"from": 647, "label": 35, "to": 1279}, {"from": 647, "label": 46, "to": 1345}, {"from": 647, "label": 45, "to": 1354}, {"from": 700, "label": 49, "to": 894}, {"from": 700, "label": 3, "to": 1025}, {"from": 700, "label": 59, "to": 1047}, {"from": 700, "label": 49, "to": 1176}, {"from": 700, "label": 23, "to": 1179}, {"from": 700, "label": 34, "to": 1279}, {"from": 700, "label": 49, "to": 1345}, {"from": 700, "label": 44, "to": 1354}, {"from": 894, "label": 68, "to": 1047}, {"from": 894, "label": 2, "to": 1110}, {"from": 894, "label": 58, "to": 1176}, {"from": 894, "label": 27, "to": 1179}, {"from": 894, "label": 35, "to": 1279}, {"from": 894, "label": 58, "to": 1345}, {"from": 894, "label": 53, "to": 1354}, {"from": 1025, "label": 16, "to": 1047}, {"from": 1025, "label": 2, "to": 1110}, {"from": 1025, "label": 7, "to": 1179}, {"from": 1047, "label": 24, "to": 1110}, {"from": 1047, "label": 66, "to": 1176}, {"from": 1047, "label": 71, "to": 1179}, {"from": 1047, "label": 35, "to": 1279}, {"from": 1047, "label": 57, "to": 1345}, {"from": 1047, "label": 57, "to": 1354}, {"from": 1110, "label": 2, "to": 1176}, {"from": 1110, "label": 6, "to": 1179}, {"from": 1176, "label": 29, "to": 1179}, {"from": 1176, "label": 35, "to": 1279}, {"from": 1176, "label": 59, "to": 1345}, {"from": 1176, "label": 54, "to": 1354}, {"from": 1179, "label": 25, "to": 1345}, {"from": 1179, "label": 21, "to": 1354}, {"from": 1279, "label": 35, "to": 1345}, {"from": 1279, "label": 34, "to": 1354}, {"from": 1345, "label": 54, "to": 1354}],
		"nodes": [{"id": 580, "label": "greatbarrierreef"}, {"id": 1047, "label": "reef"}, {"id": 106, "label": "australia"}, {"id": 136, "label": "barrier"}, {"id": 388, "label": "diving"}, {"id": 232, "label": "cairns"}, {"id": 310, "label": "coral"}, {"id": 1179, "label": "snorkeling"}, {"id": 1176, "label": "snorkel"}, {"id": 894, "label": "nemo"}, {"id": 379, "label": "dive"}, {"id": 700, "label": "island"}, {"id": 1345, "label": "tropics"}, {"id": 1354, "label": "turtles"}, {"id": 647, "label": "holiday"}, {"id": 1025, "label": "queensland"}, {"id": 1279, "label": "tern"}, {"id": 553, "label": "giantclam"}, {"id": 1110, "label": "scuba"}, {"id": 147, "label": "beautiful"}]
	};
	nodesDataset = new vis.DataSet(jsonData.nodes);
	edgesDataset = new vis.DataSet(jsonData.edges);
	var data = {nodes:nodesDataset, edges:edgesDataset};

	network = new vis.Network(container, data, options);
	// get a JSON object
	// get a JSON object
	allNodes = nodesDataset.get({returnType:"Object"});
	allEdges = edgesDataset.get({returnType:"Object"});

	network.on("click", neighbourhoodHighlight);
	network.on("doubleClick", dbclick);
}
var to_be_zoomed_in = 1;
function neighbourhoodHighlight(params) {
	// console.log('clicked');
    // if something is selected:
    if (params.nodes.length > 0) {
        highlightActive = true;
        var i,j;
        var selectedNode = params.nodes[0];

        // mark all nodes as hard to read.
        for (var nodeId in allNodes) {
        	// console.log('1');
            allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
            if (allNodes[nodeId].hiddenLabel === undefined) {
                allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                allNodes[nodeId].label = undefined;
            }
        }
        for(var edgeId in allEdges){
            if(allEdges[edgeId].hiddenLabel === undefined){
                allEdges[edgeId].hiddenLabel = allEdges[edgeId].label;
                allEdges[edgeId].label = undefined;
            }
        }

        var connectedNodes = network.getConnectedNodes(selectedNode);
        var connectedEdges = network.getConnectedEdges(selectedNode);

        // all first degree nodes get a different color and their label back
        for (i = 0; i < connectedNodes.length; i++) {
            allNodes[connectedNodes[i]].color = 'rgba(51, 204, 51,0.75)';
            if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
                allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
                allNodes[connectedNodes[i]].hiddenLabel = undefined;
            }
        }
        // all first degree edges
        for (i = 0; i < connectedEdges.length; i++) {
            if (allEdges[connectedEdges[i]].hiddenLabel !== undefined) {
                allEdges[connectedEdges[i]].label = allEdges[connectedEdges[i]].hiddenLabel;
                allEdges[connectedEdges[i]].hiddenLabel = undefined;
            }
        }


        // set the color for the main(clicked) node
        allNodes[selectedNode].color = 'rgba(255, 51, 0, 0.75)';
        if (allNodes[selectedNode].hiddenLabel !== undefined) {
        	console.log('2');
            allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
            allNodes[selectedNode].hiddenLabel = undefined;
        }
    }
        else if (highlightActive === true) {
        	// console.log('3');
            // reset all nodes
            for (var nodeId in allNodes) {
                allNodes[nodeId].color = undefined;
                // if (allNodes[nodeId].hiddenLabel !== undefined) {
                //     // allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                //     allNodes[nodeId].hiddenLabel = undefined;
                // }
            }
            for (var edgeId in allEdges) {
                allEdges[edgeId].color = undefined;
                if (allEdges[edgeId].hiddenLabel !== undefined) {
                    allEdges[edgeId].label = allEdges[edgeId].hiddenLabel;
                    allEdges[edgeId].hiddenLabel = undefined;
                }
            }
            highlightActive = false
        }

    // transform the object into an array
    var nodeUpdateArray = [];
    for (nodeId in allNodes) {
        if (allNodes.hasOwnProperty(nodeId)) {
            nodeUpdateArray.push(allNodes[nodeId]);
        }
    }
    nodesDataset.update(nodeUpdateArray);
    var edgeUpdateArray = [];
    for (edgeId in allEdges) {
        if (allEdges.hasOwnProperty(edgeId)) {
            edgeUpdateArray.push(allEdges[edgeId]);
        }
    }
    edgesDataset.update(edgeUpdateArray);
}

var dbclick = function(){
    if( to_be_zoomed_in == 1 ){
        // Zoom in
        var op = {
            scale: 2,
            direction: '+',
            duration: 1000
            // position: position
        }
        network.moveTo(op);
        to_be_zoomed_in = 0;
    }
    else {
        // Zoom out
        var op = {
            scale: 1,
            direction: '-',
            // position: position
        }
        network.moveTo(op);
        to_be_zoomed_in = 1;
    }
}


redrawAll();
/*
network.fit({
	"nodes": [580,1047,106,136,388,232,310,1179,1176,894,379,700,1345,1354,647,1025,1279,553,1110,147]
});
*/