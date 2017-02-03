const appCfg = window.AppConfig;

(function($, angular) {
	const log = console.log;
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
			log(`AQUI ${type}!!!!!!!!!!`);
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
			var targetURL = `review.html?srcFolder=${encodeURIComponent($scope.src.value)}&trgFolder=${encodeURIComponent($scope.trg.value)}`;
			window.location.href = targetURL;
		}
	}

	angular
	.module("app", [])
	.controller("MainController", ["$scope", MainController]);
})($, angular);