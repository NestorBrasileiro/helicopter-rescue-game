function start() { // Inicio da função start()

	$("#start").hide();
	
	$("#backgroundGame").append("<div id='player' class='anima1' ></div>");
	$("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
	$("#backgroundGame").append("<div id='enemy2'></div>");
	$("#backgroundGame").append("<div id='friend' class='anima3'></div>");

    var game = {};
    
    game.timer = setInterval(loop, 30);
    
    function loop() {
        moveBackground();
        movePlayer();
    }
    
    var KEY = {
        W: 87,
        S: 83,
        D: 68
        }
    
    game.keypressed = [];
    
    $(document).keydown(function(e){
        game.keypressed[e.which] = true;
    });
        
        
    $(document).keyup(function(e){
        game.keypressed[e.which] = false;
    });

    function movePlayer() {
        
        if (game.keypressed[KEY.W]) {
            var topo = parseInt($("#player").css("top"));
            $("#player").css("top",topo-10);
        }
        
        if (game.keypressed[KEY.S]) {
            var topo = parseInt($("#player").css("top"));
            $("#player").css("top",topo+10);	
        }
        
        if (game.keypressed[KEY.D]) {
            //Chama função Disparo	
        }
    
    }
    
    function moveBackground(){
        esquerda = parseInt($("#backgroundGame").css("background-position"));
        $("#backgroundGame").css("background-position", esquerda - 1)
        
    }
}    
