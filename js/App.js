"use strict";

// Init App
var myApp = new Framework7({
    modalTitle: 'Grupo Cometa',
    // Enable Material theme
    material: true,
    precompileTemplates: true,
    template7Pages: true
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});

var appUrl = 'http://201.88.1.145/2015/api/', push = null;