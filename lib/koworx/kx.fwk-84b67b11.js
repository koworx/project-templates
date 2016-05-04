!function(){"use strict";angular.module("kx.cfg",[])}(),function(){"use strict";function n(n){n.decorator("$exceptionHandler",e)}function e(n,e){return function(t,o){e.handleException("exceptionHandler","Unexpected",t,o)&&n(t,o)}}angular.module("kx.ex",["kx.log"]).config(n),n.$inject=["$provide"],e.$inject=["$delegate","exceptionManager"]}(),function(){"use strict";angular.module("kx.fwk",["kx.cfg","kx.ex","kx.nav"])}(),function(){"use strict";angular.module("kx.log",[])}(),function(){"use strict";angular.module("kx.msg",["kx.cfg","kx.log"])}(),function(){"use strict";angular.module("kx.nav",["ngRoute","kx.ex"])}(),function(){"use strict";function n(){this.values={},this.$get=function(){return{values:this.values}}}angular.module("kx.cfg").provider("globalConfig",n)}(),function(){"use strict";function n(){this.values={},this.handlers=[],this.policies=[],this.$get=function(){return{values:this.values,handlers:this.handlers,policies:this.policies}}}angular.module("kx.ex").provider("exceptionConfig",n)}(),function(){"use strict";function n(n){function e(e,t,o,r){return n.handlers.forEach(function(n){n.handleException(e,t,o,r)}),"Error"===t}var t={handleException:e};return t}angular.module("kx.ex").factory("exceptionManager",n),n.$inject=["exceptionConfig"]}(),function(){"use strict";function n(){function n(){}var e={handleException:n};return e}function e(n,e){var t=n.get("exceptionPolicy");t.handlers=[],e.policies.push(t)}angular.module("kx.ex").factory("exceptionPolicy",n).run(e),e.$inject=["$injector","exceptionConfig"]}(),function(){"use strict";function n(n,e){function t(t,o,r,i){var a=e.values.appErrorPrefix||"",u=r.correlationId;return u?n.error(a+t+"{"+u+"}",r.name,r.number+" : "+r.message+" caused by "+i,r):n.error(a+t,r.name,r.number+" : "+r.message+" caused by "+i,r),"Error"===o}var o={handleException:t};return o}function e(n,e){var t=n.get("logExceptionHandler");e.handlers.push(t)}angular.module("kx.ex").factory("logExceptionHandler",n).run(e),n.$inject=["loggingManager","exceptionConfig"],e.$inject=["$injector","exceptionConfig"]}(),function(){"use strict";function n(n,e,t,o,r,i,a,u,c){var l={$q:n,$http:e,$timeout:t,$location:o,$routeParams:r,centralHub:i,loggingManager:a,exceptionManager:u,filter:c};return l}angular.module("kx.fwk").factory("core",n),n.$inject=["$q","$http","$timeout","$location","$routeParams","centralHub","loggingManager","exceptionManager","filter"]}(),function(){"use strict";function n(n){function e(e,t,o,r){n.error(a()+" - ERR ["+e+"] "+t+":"+o,r)}function t(e,t,o,r){n.warn(a()+" - WRN ["+e+"] "+t+":"+o,r)}function o(e,t,o,r){n.info(a()+" - SCX ["+e+"] "+t+":"+o,r)}function r(e,t,o,r){n.info(a()+" - INF ["+e+"] "+t+":"+o,r)}function i(e,t,o,r){n.log(a()+" - LOG ["+e+"] "+t+":"+o,r)}function a(){return(new Date).toUTCString()}var u={error:e,warning:t,success:o,info:r,log:i};return u}function e(n,e){var t=n.get("angularLogger");e.handlers.push(t)}angular.module("kx.log").factory("angularLogger",n).run(e),n.$inject=["$log"],e.$inject=["$injector","loggingConfig"]}(),function(){"use strict";function n(){this.values={},this.handlers=[],this.$get=function(){return{values:this.values,handlers:this.handlers}}}angular.module("kx.log").provider("loggingConfig",n)}(),function(){"use strict";function n(n){function e(e,t,o,r){n.handlers.forEach(function(n){n.error(e,t,o,r)})}function t(e,t,o,r){n.handlers.forEach(function(n){n.warning(e,t,o,r)})}function o(e,t,o,r){n.handlers.forEach(function(n){n.success(e,t,o,r)})}function r(e,t,o,r){n.handlers.forEach(function(n){n.info(e,t,o,r)})}function i(e,t,o,r){n.handlers.forEach(function(n){n.log(e,t,o,r)})}var a={error:e,warning:t,success:o,info:r,log:i};return a}angular.module("kx.log").factory("loggingManager",n),n.$inject=["loggingConfig"]}(),function(){"use strict";function n(n,e,t,o){function r(){return e.$broadcast.apply(e,arguments)}function i(e,i){return t.log(i,"controller activation","starting...",""),r(o.values.appBusyEvent,{controllerId:i}),n.all(e).then(function(n){var e={controllerId:i};r(o.values.ctrlReadyEvent,e),r(o.values.appReadyEvent,{controllerId:i})})}var a={activateController:i,$broadcast:r};return a}angular.module("kx.msg").factory("centralHub",n),n.$inject=["$q","$rootScope","loggingManager","globalConfig"]}(),function(){"use strict";function n(){this.values={},this.$get=function(){return{values:this.values}}}angular.module("kx.nav").provider("routingConfig",n)}(),function(){"use strict";function n(n,e,t,o,r){function i(n){n.forEach(function(n){n.config.resolve=angular.extend(n.config.resolve||{},r.values.resolveAlways),s.when(n.url,n.config)}),s.otherwise({redirectTo:"/home"})}function a(){var n=[];for(var e in t.routes)if(t.routes.hasOwnProperty(e)){var o=t.routes[e],r=!!o.title;r&&n.push(o)}return n}function u(){c(),l()}function c(){e.$on("$routeChangeError",function(e,t,r,i){if(!g){f.errors++,g=!0;var a=t&&(t.title||t.name||t.loadedTemplateUrl)||"unknown target",u="Error routing to "+a+". "+(i.msg||"");o.warning("Routing",null,u,[t]),n.path("/")}})}function l(){e.$on("$routeChangeSuccess",function(n,t,o){f.changes++,g=!1;var i=r.values.appTitle+" "+(t.title||"");e.pageTitle=i})}var s=r.values.$routeProvider,g=!1,f={errors:0,changes:0},d={routeCounts:f,configureRoutes:i,getRoutes:a};return u(),d}angular.module("kx.nav").factory("routingManager",n),n.$inject=["$location","$rootScope","$route","loggingManager","routingConfig"]}(),angular.module("kx.fwk").run(["$templateCache",function(n){n.put("ex/exceptionTemplate.html","<div class=important><span class=col-sm-4></span><span class=col-sm-4></span><span class=col-sm-4></span></div>"),n.put("log/loggerTemplate.html","<div class=important><div class=col-sm-4></div><div class=col-sm-4></div><div class=col-sm-4></div></div>")}]);