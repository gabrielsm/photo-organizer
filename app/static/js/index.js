const appCfg = window.AppConfig;

(function($) {
	const log = console.log;
	var cfg = appCfg.get();
	function saveConfiguration() {
		log("Saving config file...");
		cfg.srcFolder = $("input[name='srcFolder']").val();
		cfg.trgFolder = $("input[name='trgFolder']").val();
		appCfg.save(cfg);

		log("Cfg file written.");
	}

	$(document).ready(function() {
		utils.whenNotNull(cfg.srcFolder, function() {
			log(`Found srcFolder: ${cfg.srcFolder}`);
			$("input[name='srcFolder']").val(cfg.srcFolder);
		});
		
		utils.whenNotNull(cfg.trgFolder, function() {
			log(`Found trgFolder: ${cfg.trgFolder}`);
			$("input[name='trgFolder']").val(cfg.trgFolder);
		});

		log("Finished reading config.");
		
		$("input[type='file']").change(function() {
			debugger;
			var name = this.name;
			name = name.replace("Select", "");
			var folder = this.files[0].path;
			$(`input[name='${name}']`).val(folder);
			log(`Changed ${name} value to ${folder}`);
			saveConfiguration();
		});

		$("#write").click(function(evt){
			saveConfiguration();
			evt.stopPropagation();
			return false;
		});
		$("#proceed").css("background-color", "#F00");
		$("#proceed").click(function(evt) {
			debugger;
			evt.stopPropagation();
			let srcFolder = $("input[name='srcFolder']").val();
			let trgFolder = $("input[name='trgFolder']").val();

			let targetURL = "review.html?srcFolder=" + encodeURIComponent(srcFolder) + "&trgFolder=" + encodeURIComponent(trgFolder);
			window.location.href = targetURL;
		});
	});
})($);