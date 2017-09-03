"use strict"

$(document).ready(function(){

	$.get("https://data.iledefrance.fr/api/records/1.0/search/?dataset=liste_des_musees_franciliens&facet=new_name&facet=nomdep",
			function(data){
			
			console.log(data);
		});


});