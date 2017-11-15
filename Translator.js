// Send a whispered message to all the players that speak a certain language
on("chat:message",function(msg){
	var args    = msg.content.split(/\s+/);
	if( msg.type !== "api" || args[0] != "!translate" ) {
		return;
	}
    if( args.length < 3 ) {
	    //printHelp
	    return;
	}
	sendMessage = function(message, who) {
		sendChat('', (who ? ('/w "'+who+'" ') : '') + //'<div style="padding:1px 3px;border: 1px solid #8B4513;background: #eeffee; color: #8B4513; font-size: 80%;">'+
			message
			//+'</div>'
		);
	};
	var lang = args[1];
	            
    var tokens = findObjs({ type: 'graphic', subtype: 'token', pageid: Campaign().get("playerpageid"), layer: "objects" });
    tokens.forEach(function(token) {
        var character = getObj("character",token.get("represents"));
        if( character ) {
            var languages = findObjs({ type:"attribute", characterid:character.id, name:"prolanguages" })[0];
            if( languages ) {
                languages = languages.get("current");
                if(  languages.toLowerCase().includes(lang.toLowerCase()) || languages.toLowerCase().includes("all") ){
                    var message = msg.content.substring(12+lang.length);
                    sendMessage(message,character.get("name"));
                }
            }
        }
    });

});