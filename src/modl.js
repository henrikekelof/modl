/*global */

// Adding custom JavaScript and CSS modules to be lazy loaded once
// no matter how many times they're added.

var MODL = MODL || {};

(function (version, root, modules) {
	
	"use strict";
	
	// Add new property to modules for each new module.
    //
    // Add a single file as a string and multiple files as an array of strings.
    //
    // Example:
    //
    //    example:
    //        [root + '/Assets/min/example.min.js' + build,
    //        root + '/Assets/modules/example/example.min.css' + build],
    //    example2:
    //        root + '/Assets/min/example2.min.js' + build
    //
    // Don't forget to add root and build.


    modules = {
		module1: 
			'module1.js',
		module2:
			['module2.js',
			'module2.css'],
		module3:
			'module3.js',
		module4:
			'module4.js',
		module5:
			'module5.js',
		module6:
			'module6.js',
		module7:
			'module7.js',
		module8:
			'module8.js',
		module9:
			'module9.js'
    };

    // STOP EDITING HERE!

	MODL = (function (doc) {
	
		var modulesToLoad = {},
			modulesLength = 0,
			add,
			get,
			load,
			appendModules,
			isArray,
			i;

		isArray = function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		};
	
	    add = function (mods) {
	        if (typeof mods === 'string') {
	            if (!modulesToLoad[mods]) {
	                modulesToLoad[mods] = true;
	                modulesLength += 1;
	            }
	        } else {
	            for (i = 0; i < mods.length; i += 1) {
	                if (!modulesToLoad[mods[i]]) {
	                    modulesToLoad[mods[i]] = true;
	                    modulesLength += 1;
	                }
	            }
	        }
	    };
	
	    get = function () {
	        if (modulesLength > 0) {
	            return modulesToLoad;
	        }
	        return;
	    };
	    
	    load = function () {
	    
	        var modulesAdded = get(),
		        files = [],
		        mods = modules || {},
		        mod;
			
		    if (modulesAdded) {
		        
		        for (mod in modulesAdded) {
		            if (modulesAdded.hasOwnProperty(mod) && mods.hasOwnProperty(mod)) {
		                files.push(mods[mod]);
		            }
		        }
		
		        appendModules(files);
		
			}
	
		    
	    };
	    
	    appendModules = function (files) {
		    
		    if (!isArray(files)) {
		        return;
		    }
		    
		    var stylesheetRegEx = /\.css$|\.css\?/,
		        scriptRegEx = /\.js$|\.js\?/,
		        container = doc.createElement('div'),
		        addScript,
		        addStylesheet,
		        addFile,
		        addModule,
		        version = (MODL.version) ? '?v=' + MODL.version : '',
		        root = MODL.root || '',
		        i,
		        j;
		
		    container.setAttribute('id', 'SYM-modules');
		
		    addScript = function (file) {
		        var s = doc.createElement('script');
		        s.src = root + file + version;
		        s.async = true;
		        container.appendChild(s);
		    };
		    
		    addStylesheet = function (file) {
		        var lnk = doc.createElement('link');
		        lnk.rel = 'stylesheet';
		        lnk.type = 'text/css';
		        lnk.href = root + file + version;
		        container.appendChild(lnk);
		    };
		
		    addFile = function (file) {
		        if (scriptRegEx.test(file)) {
		            addScript(file);
		        } else if (stylesheetRegEx.test(file)) {
		            addStylesheet(file);
		        }
		    };
		
		    addModule = function (mod) {
		        var k,
		            l;
		        if (typeof mod === 'string') {
		            addFile(mod);
		        } else if (isArray(mod)) {
		            for (k = 0, l = mod.length; k < l; k += 1) {
		                if (typeof mod[k] === 'string') {
		                    addFile(mod[k]);
		                }
		            }
		        }
		    };
		
		    for (i = 0, j = files.length; i < j; i += 1) {
		        addModule(files[i]);
		    }
		
		    doc.body.appendChild(container);
			    
	    };
	
	    return {
	        add: add,
	        get: get,
	        load: load,
	        version: version,
	        root: root
	    };
	
	}(document));
		
	
}(MODL.version, MODL.root, MODL.modules));
