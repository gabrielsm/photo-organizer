(function($, angular, nw){
	const appCfg = AppConfig;
	const nPath = require("path");
	const fs = require("fs");

	function Node(localName, parentNode, isDir) {
		let children = [];
		let thisNode = this;
		let myParent = parentNode;

		return {
			toString: function() {
				var str = "/";

				if(myParent) {
					str = myParent.toString() + str;
				}

				return str + localName;
			},

			addChild: function(node) {
				if(!isDir) {
					throw `Não é possível adicionar um nó filho a um nó folha. Nó: ${thisNode.toString()}`;
				}

				children.push(node);
				node.setParentNode(thisNode);
			},

			getLocalName: function() {
				return localName;
			},

			getChild: function(locName) {
				var filteredChildren = children.filter(function(child, id) {
					return child.getLocalName() == locName;
				});

				if(filteredChildren.length == 0) {
					return null;
				}
				else {
					return filteredChildren[0];
				}
			},

			getChildWithPath: function(path) {

				if(!isDir) {
					throw "Tentando obter filhos de um nó folha";
				}

				var splitedPath;
				if(typeof(path) === "string") {
				 	splitedPath = path.split("/");
				}
				else if(typeof(path) === "array") {
					splitedPath = path;
				}
				else {
					throw `Tipo de objeto path ilegal. Esperado string ou array. Obtido: ${typeof(path)}`;
				}

				var curLocalName = splitedPath[0];
				var child = thisNode.getChild(curLocalName);
				if(child == null) {
					return null;
				}

				if(splitedPath.length == 1) {
					return child;
				}

				splitedPath = splitedPath.splice(1);
				return child.getChildWithPath(splitedPath);
			},

			setParentNode: function(parentNode) {
				myParent = parentNode;
			},

			insertNodeRecursively: function(node, parentPath) {
				var splitedPath;
				if(typeof(parentPath) === "string") {
				 	splitedPath = parentPath.split("/");
				}
				else if(typeof(parentPath) === "array") {
					splitedPath = parentPath;
				}
				else {
					throw `Tipo de objeto path ilegal. Esperado string ou array. Obtido: ${typeof(path)}`;
				}

				var curLocalName = splitedPath[0];
				var child = thisNode.getChild(curLocalName);
				if(child == null) {
					// not created path found. create a new node now.
					child = new Node(curLocalName, thisNode, true);
					thisNode.addChild(child);
				}

				if(splitedPath.length == 1) {
					child.addChild(node);
				}
				else {
					splitedPath = splitedPath.splice(1);
					child.insertNodeRecursively(node, splitedPath);
				}
			}
		};
	}


	// img files 
	let imgFilesPat = /.*\.(jpe?g|png)$/;

	// videos files
	let videoFilesPat = /.*\.(mp4|mov)$/;

	function isImg(filePath) {
		return imgFilesPat.test(nPath.basename(filePath));
	}

	function isVideo(filePath) {
		return videoFilesPat.test(nPath.basename(filePath));
	}


	function isFile(filePath) {
		return fs.lstatSync(filePath).isFile();
	}

	function MainController($scope) {
		let cfg = appCfg.get();
		let srcFolder = cfg.srcFolder;
		let trgFolder = cfg.trgFolder;


		// list files
		let inputFiles = fs.readdirSync(srcFolder);
		
		$scope.cfg = cfg;
		$scope.recalculate = function() {
			let expression = $scope.cfg.expression;

			inputFiles.forEach(filePath => {
				let fileFullPath = nPath.join(srcFolder, filePath);
				if(isFile(fileFullPath)) {
					if(isVideo(fileFullPath)) {
						console.log(`File ${nPath.basename(fileFullPath)} is a video.`);
					}
					else if (isImg(fileFullPath)) {
						console.log(`File ${nPath.basename(fileFullPath)} is an image.`);
					}
					else {
						console.log(`File ${nPath.basename(fileFullPath)} is neither a video nor an image.`);
					}
				}
				else {
					console.log(`${nPath.basename(fileFullPath)} is not a file.`);
				}
			});

		}

		$scope.recalculate();
	}

	angular
		.module("review", [])
		.controller("MainController", ["$scope", MainController]);
})($, angular, nw);

/*
$(".tree").fancytree({
			activeVisible: true, // Make sure, active nodes are visible (expanded)
			aria: false, // Enable WAI-ARIA support
			autoActivate: true, // Automatically activate a node when it is focused using keyboard
			autoCollapse: false, // Automatically collapse all siblings, when a node is expanded
			autoScroll: true, // Automatically scroll nodes into visible area
			clickFolderMode: 3, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
			checkbox: true, // Show checkboxes
			debugLevel: 2, // 0:quiet, 1:normal, 2:debug
			disabled: false, // Disable control
			focusOnSelect: false, // Set focus when node is checked by a mouse click
			escapeTitles: false, // Escape `node.title` content for display
			generateIds: false, // Generate id attributes like <span id='fancytree-id-KEY'>
			idPrefix: "ft_", // Used to generate node id´s like <span id='fancytree-id-<key>'>
			icon: true, // Display node icons
			keyboard: true, // Support keyboard navigation
			keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath()
			minExpandLevel: 1, // 1: root node is not collapsible
			quicksearch: true, // Navigate to next node by typing the first letters
			rtl: false, // Enable RTL (right-to-left) mode
			selectMode: 3, // 1:single, 2:multi, 3:multi-hier
			tabindex: 0, // Whole tree behaves as one single control
			titlesTabbable: true, // Node titles can receive keyboard focus
			tooltip: false, // Use title as tooltip (also a callback could be specified)
			source: [
				{title: "Node 1", key: "1"},
				{title: "Folder 2", key: "2", folder: true, children: [
					{title: "Node 2.1", key: "3"},
					{title: "Node 2.2", key: "4"}
				]}
			]
		});

*/