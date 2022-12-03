var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM covid_details";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Covid 19 data Management', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'Insert covid Data', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var state_name = request.body.state_name;

	var date_of_record = request.body.date_of_record;

	var no_of_samples = request.body.no_of_samples;

	var no_of_deaths = request.body.no_of_deaths;

	var no_of_positive = request.body.no_of_positive;

	var no_of_negative = request.body.no_of_negative;

	var no_of_discharge = request.body.no_of_discharge;

	var query = `
	INSERT INTO sample_data 
	(state_name, date_of_record, no_of_samples, no_of_deaths, no_of_positive, no_of_negative, no_of_discharge) 
	VALUES ("${state_name}", "${date_of_record}", "${no_of_samples}", "${no_of_deaths}","${no_of_positive}","${no_of_negative}","${no_of_discharge}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			request.flash('success', 'Covid-19 Data Inserted');
			response.redirect("/sample_data");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM covid_details WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('sample_data', {title: 'Edit Covid-19 Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var state_name = request.body.state_name;

	var date_of_record = request.body.date_of_record;

	var no_of_samples = request.body.no_of_samples;

	var no_of_deaths = request.body.no_of_deaths;

	var no_of_positive = request.body.no_of_positive;

	var no_of_negative = request.body.no_of_negative;

	var no_of_discharge = request.body.no_of_discharge;

	var query = `
	UPDATE covid_details 
	SET state_name = "${state_name}", 
	date_of_record = "${date_of_record}", 
	no_of_samples = "${no_of_samples}", 
	no_of_deaths = "${no_of_deaths}",
	no_of_positive = "${no_of_positive}",
	no_of_negative = "${no_of_negative}"  ,
	no_of_discharge = "${no_of_discharge}" 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Covid-19 Data Updated');
			response.redirect('/sample_data');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM covid_details WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Covid-19 Data Deleted');
			response.redirect("/sample_data");
		}

	});

});

module.exports = router;