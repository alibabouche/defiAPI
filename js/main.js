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

	$(document).on("click",".title",loadDetails);

	function loadDetails(event)
		{
			$.get("https://data.iledefrance.fr/api/records/1.0/search/?dataset=liste_des_musees_franciliens&facet=new_name&facet=nomdep",
			function(data)
			{
				var toFoundIndex = event.target;
				var index = $(toFoundIndex).attr("data-index");
				$(".details").html
				(
					"<h3>"+
					data.records[index].fields.nom_du_musee+
					"</h3><span>Adresse : "+
					data.records[index].fields.adr+
					"</span><br/><span>"+
					data.records[index].fields.cp+" "+
					data.records[index].fields.ville+
					"</span><br/>"
				).fadeTo(1000, 1);

				//si les coordonées existes on les ajoute dans la div details
				if(data.records[index].fields.telephone1 !== undefined)
				{
					$(".details").append
					(
						"<span>Tel : "+
						data.records[index].fields.telephone1+
						"</span><br/>"
					);
				}
				if(data.records[index].fields.periode_ouverture !== undefined)
				{
					$(".details").append
					(
						"<span>Période d'ouverture : "+
						data.records[index].fields.periode_ouverture+
						"</span><br/>"
					);
				}
				if(data.records[index].fields.femeture_annuelle !== undefined)
				{
					$(".details").append
					(
						"<span>Fermeture annuelle : "+
						data.records[index].fields.femeture_annuelle+
						"</span><br/>"
					);
				}
				if(data.records[index].fields.sitweb !== undefined)
				{
					$(".details").append
					(
						"<span>Site Web : <a href='"+
						data.records[index].fields.sitweb+
						"'>"+data.records[index].fields.sitweb+
						"</a></span><br/>"
					);
				}

				$(".map").html
				(
					"<iframe frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=AIzaSyCyz325NW6wuhuzcKFgnMrYeeG4Plm2x4c&q="+
					data.records[index].fields.nom_du_musee+"' allowfullscreen></iframe>"
				);
				console.log(data.records[index].fields.coordonnees_cp);
			});
			//$(".details").show(1000, "swing");
			
			
		}
		
	
	
});