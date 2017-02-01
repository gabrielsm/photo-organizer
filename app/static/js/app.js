const path = require("path");
const fs = require("fs-extra");
const utils = {
	isNull: function(obj) {
		return !utils.isNull(obj);
	},

	notNull: function(obj) {
		if(typeof(obj) === "string") {
			return obj != null && obj != undefined && obj.length > 0;
		}

		return obj != null && obj != undefined;
	},

	whenNotNull: function(obj, callback) {
		if(utils.notNull(obj)) {
			callback();
		}
	}
};

const log = console.log;

const defaultCfg = {
	srcFolder: null,
	trgFolder: null,
	expression: "${YYYY}/${MM}/${DD}/${HH} ${mm} ${ss} - ${originalName}"
};

(function($, nw) {
	let dataPath = nw.App.dataPath;
	let cfgFile = path.join(dataPath, ".config");

	log(`App data path: ${dataPath}`);
	log(`Cfg file: ${cfgFile}`);

	function readConfiguration() {
		debugger;
		log("Reading config file...");

		var cfg;
		if(!fs.existsSync(cfgFile)) {
			log("Config file doesn't exist. Using default config...");
			cfg = defaultCfg;
		}
		else {
			log("Config file exists. reading it...");
			cfg = fs.readJsonSync(cfgFile, {encoding: "UTF-8"});
			log("Found config", cfg);
		}

		utils.whenNotNull(cfg.srcFolder, function() {
			log(`Found srcFolder: ${cfg.srcFolder}`);
			$("input[name='srcFolder']").val(cfg.srcFolder);
		});
		
		utils.whenNotNull(cfg.trgFolder, function() {
			log(`Found trgFolder: ${cfg.trgFolder}`);
			$("input[name='trgFolder']").val(cfg.trgFolder);
		});
		
		utils.whenNotNull(cfg.expression, function() {
			log(`Found expression: ${cfg.expression}`);
			$("input[name='expression']").val(cfg.expression);
		});

		log("Finished reading config.");
	}

	function saveConfiguration() {
		debugger;
		log("Saving config file...");
		var cfg = {
			srcFolder: $("input[name='srcFolder']").val(),
			trgFolder: $("input[name='trgFolder']").val(),
			expression: $("input[name='expression']").val()
		};

		fs.writeJsonSync(cfgFile, cfg, {encoding: "UTF-8"});
		log("Cfg file written.");
	}

	$(document).ready(() => {
		readConfiguration();

		$("input").change(function() {
			saveConfiguration();
		});

		$("#read").click(function() {
			readConfiguration();
		});

		$("#write").click(function(){
			saveConfiguration();
		});
	});
})($, nw);