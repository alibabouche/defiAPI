"use strict"

$(document).ready(function()
{

	$.get("https://data.iledefrance.fr/api/records/1.0/search/?dataset=liste_des_musees_franciliens&facet=new_name&facet=nomdep",
	function(data)
	{

		for(var i = 0; i < data.records.length; i++)
		{
			$(".listeMusee").append
			(
				"<li><a href='#'><h2 class='title' data-index='"+
				i+"'>"+ 
				data.records[i].fields.nom_du_musee+
				"</h2><span>"+
				data.records[i].fields.ville+
				" "+
				data.records[i].fields.cp+
				"</span></a></li>"
			);
		}
		
	});


	function loadDetails()
		{
			$.get("https://data.iledefrance.fr/api/records/1.0/search/?dataset=liste_des_musees_franciliens&facet=new_name&facet=nomdep",
			function(data)
			{
				var index = $(".title").data("index");
				$(".details").html
				(
					data.records[index]

				)
				console.log(data);
				console.log(index);
			});
		}
		
	$(document).on("click",".title",loadDetails);
	
});