(function(nw) {
	const path = require("path");
	const fs = require("fs-extra");
	const log = console.log;

	const defaultCfg = {
		srcFolder: null,
		trgFolder: null,
		expression: "${YYYY}/${MM}/${DD}/${HH} ${mm} ${ss} - ${originalName}"
	};

	window.AppConfig = (function(){
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

			log("Finished reading config.");

			return cfg;
		}

		function saveConfiguration(cfg) {
			debugger;
			log("Saving config file...");
			fs.writeJsonSync(cfgFile, cfg, {encoding: "UTF-8"});
			log("Cfg file written.");
		}

		return {
			get: readConfiguration,
			save: saveConfiguration
		}
	})();
})(nw);