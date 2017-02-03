$("#tree").fancytree({
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

$(document).ready(() => {
			debugger;
	let search = window.location.search;
	let extractParamRegex = /srcFolder=([^&]+)&trgFolder=(.*)/;
	let res = extractParamRegex.exec(search);
	var srcFolder = decodeURIComponent(res[1]);
	var trgFolder = decodeURIComponent(res[2]);

	$(".aa").html(`Search: ${search};<br>
	Src: ${srcFolder}<br>
	Trg: ${trgFolder}
	`);
});