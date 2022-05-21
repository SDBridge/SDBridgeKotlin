;(function(window) {
    if(window.hookConsole){
        console.log("hook Console have already finished.");
        return ;
    }
    let printObject = function (obj) {
        let output = "";
        if (obj === null) {
            output += "null";
        }
        else  if (typeof(obj) == "undefined") {
            output += "undefined";
        }
        else if (typeof obj ==='object'){
            output+="{";
            for(let key in obj){
                let value = obj[key];
                output+= "\""+key+"\""+":"+"\""+value+"\""+",";
            }
            output = output.substr(0, output.length - 1);
            output+="}";
        }
        else {
            output = "" + obj;
        }
        return output;
    };
    console.log("start hook Console.");
    window.console.log = (function (oriLogFunc,printObject) {
        window.hookConsole = 1;
        return function (str) {
            oriLogFunc.call(window.console, str);
            for (let i = 0; i < arguments.length; i++) {
                const obj = arguments[i];
                if (obj instanceof Promise){
                    const promiseString = "This is a javascript Promise.";
                    window.consolePipe.receiveConsole(promiseString);
                } else if(obj instanceof Date){
                    const dateString =  obj.getTime().toString();
                    window.consolePipe.receiveConsole(dateString);
                } else if(obj instanceof Array){
                    let arrayString = '[' + obj.toString() + ']';
                    window.consolePipe.receiveConsole(arrayString);
                }
                else{
                    const objs = printObject(obj);
                    window.consolePipe.receiveConsole(objs);
                }
            }
        }
    })(window.console.log,printObject);
    console.log("end hook Console.");
})(window);
