(function($, angular) {
	const appCfg = window.AppConfig;
	const log = console.log;
	const fs = require("fs-extra");

	var cfg = appCfg.get();

	var mainController;

	function saveCfg() {
		appCfg.save(cfg);
	}

	$(document).ready(function() {
		$("input[type='file']").change(function(){
			var name = this.name;
			var type = name.substring(0, 3);
			var val = this.files[0].path;
			mainController.change(type, val);
		});
	});

	function MainController($scope){
		mainController = this;

		this.change = function (type, val) {
			$scope[type].value = val;
			$scope[type].hasValue = utils.notNull(val);
			$scope[type].change = false;

			cfg[`${type}Folder`] = val;
			saveCfg();
			$scope.$apply();
		}

		function init(type) {
			log(`Inicializando ${type}...`);
			var val = cfg[`${type}Folder`];

			$scope[type] = {
				value: val,
				hasValue: utils.notNull(val),
				change: false
			};

			log(`${type} inicializado.`, $scope[type]);
		}

		["src", "trg"].forEach(t => init(t));

		$scope.proceed = function() {

			var src = $scope.src.value;
			var trg = $scope.trg.value;

			if(utils.isNull(src) || utils.isNull(trg)) {
				alert("Por favor, selecione as pastas origem e destino.");
				return;
			}

			if(src == trg) {
				alert("As pastas origem e destino não devem ser a mesma.");
				return;
			}

			if(!fs.existsSync(src)) {
				alert("A pasta origem não existe.");
				return;
			}

			var srcStat = fs.lstatSync(src);
			if(!srcStat.isDirectory()) {
				alert("A pasta origem não é um diretório.");
				return;
			}

			if(fs.existsSync(trg)) {
				var trgStat = fs.lstatSync(trg);
				if(!trgStat.isDirectory()) {
					alert("A pasta destino existe e não é um diretório.");
					return;
				}
			}

			window.location.href = "review.html";
		}
	}

	angular
		.module("app", [])
		.controller("MainController", ["$scope", MainController]);
})($, angular);