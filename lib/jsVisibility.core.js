/*
 * simple wrapper for Page Visibility API
 * 	
 * @Package: jsVisibility.js
 * @Author: Mostafazs ( http://github.com/mostafazs )
 * @License: GPL 2.0 ( https://www.gnu.org/licenses/gpl-2.0.html )
 * @Version: 0.1
 */
/*
 * @ToDo
 * -when a user change page , thn after a period of time a function run and when page visibility is true 
 * we can stop that function
 * -when a user change a page , then video playback pause 
 * -when a user change page , then ajax requests and sends become inactive until user switch to page
 * 	
 * @What Happened That I Create this Project?
 * i need a method,way,... anythings that show me my last used actions on 
 * Wordpress Developers Shortcuts Firefox addon , then because of Page Visibility API
 * 	i decide to create this script
 * 
 * -and many other works that you can learn by reading book of JavaScript Developers 3nd Edition page 441 
 * ( https://gist.github.com/objectfoo/4144898#file-eventutil-js ) also analyze this site -->
 * https://pib724.com/webbank/login.html
*/
/*
 * @Help Complete later
*/

/*	@Author Author of JavaScript Web Development 3nd Edition
	@Copyright GPL 2.0
*/
var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    
    getButton: function(event){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    
    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    
    },
    
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    
    getWheelDelta: function(event){
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};



/*
	@para ShowFunction : function for showing on page visibility change
	HideFunction : function for show after return to page
	ShowMillisecond: after what millisecond first function run?
	HideMillisecond: after what millisecond second function run?
	@since 0.1
	@package jsVisibility
*/
function jsVisibility(ShowFunction,HideFunction,ShowMillisecond,HideMillisecond){
	
	function isHiddenSupport(){
			return typeof (document.hidden || document.msHidden || document.webkitHidden) != "undefined";
	}
	if(isHiddenSupport == false) {
		//no support
		console.log("No API Support");
	}
	else{
		
		function handleVisibilityChange(){
                
            if (document.hidden || document.msHidden || document.webkitHidden){
				var timeout1 = setTimeout(ShowFunction,ShowMillisecond);
				//clearTimeout(timeout1);
            } else
			{
				//ToDo:you can add a handler that, when mouse move other page, hide ads quickly
				var timeout2 = setTimeout(HideFunction,HideMillisecond);
            }
            
        }
		//Browser Support
		EventUtil.addHandler(document, "msvisibilitychange", handleVisibilityChange);
        EventUtil.addHandler(document, "webkitvisibilitychange", handleVisibilityChange);
        EventUtil.addHandler(document, "mozvisibilitychange", handleVisibilityChange);
		
		
	}
	
}