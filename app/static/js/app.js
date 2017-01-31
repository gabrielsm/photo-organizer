const path = require("path");
const fs = require("fs-extra");
const $ = require("jquery");
const utils = {
	isNull: function(obj) {
		if(typeof(obj) === "string") {
			return obj != null && obj != undefined && obj.length > 0;
		}

		return obj != null && obj != undefined;
	},

	notNull: function(obj) {
		return !isNull(obj);
	},

	whenNotNull: function(obj, callback) {
		if(notNull(obj)) {
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

	function readConfiguration() {
		var cfg;
		if(!fs.existsSync(cfgFile)) {
			fs.writeFileSync(cfgFile, JSON.stringify(defaultCfg), {encoding: "UTF-8"});
			cfg = defaultCfg;
		}
		else {
			cfg = fs.readJsonSync(cfgFile, {encoding: "UTF-8"});
		}

		utils.whenNotNull(cfg.srcFolder, () => {
			$("input[name='srcFolder']").val(cfg.srcFolder);
		});
		
		utils.whenNotNull(cfg.trgFolder, () => {
			$("input[name='trgFolder']").val(cfg.trgFolder);
		});
		
		utils.whenNotNull(cfg.expression, () => {
			$("input[name='expression']").val(cfg.expression);
		});
	}

	function saveConfiguration() {
		var cfg = {
			srcFolder: $("input[name='srcFolder']").val(),
			trgFolder: $("input[name='trgFolder']").val(),
			expression: $("input[name='expression']").val()
		};

		fs.writeJsonSync(cfgFile, cfg, {encoding: "UTF-8"});
	}

	$(document).ready(() => {
		readConfiguration();

		$("input").change(function() {
			saveConfiguration();
		});
	});
})($, nw);