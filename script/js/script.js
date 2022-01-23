function start() { // Inicio da função start()

	$("#start").hide();
	
	$("#backgroundGame").append("<div id='player' class='anima1' ></div>");
	$("#backgroundGame").append("<div id='enemy1' class='anima2'></div>");
	$("#backgroundGame").append("<div id='enemy2'></div>");
	$("#backgroundGame").append("<div id='friend' class='anima3'></div>");
    $("#backgroundGame").append("<div id='score'></div>");
    $("#backgroundGame").append("<div id='energy'></div>");

    var game = {};
    
    game.timer = setInterval(loop, 30);
    
    function loop() {
        moveBackground();
        movePlayer();
        moveEnemy();
        moveEnemy2();
        moveFriend();
        collision();
        scoreList();
        energy();
    }

    var startEnergy = 3;

    var speed = 5;

    var score = 0;

    var saved = 0; 

    var losted = 0;

    var canShoot = true;

    var endGame = false;

    var positionY = parseInt(Math.random() * 334);

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

    function scoreList() {
	
        $("#score").html("<h2> Pontos: " + score + " Salvos: " + saved + " Perdidos: " + losted + "</h2>");
        
    }

    function movePlayer() {

        if (game.keypressed[KEY.W]) {
            var topo = parseInt($("#player").css("top"));
            $("#player").css("top",topo-10);
            if (topo<=0) {		
                $("#player").css("top",topo+10);
            }
        }
        
        if (game.keypressed[KEY.S]) {
            var topo = parseInt($("#player").css("top"));
            $("#player").css("top",topo+10);
            if (topo>=434) {	
                $("#player").css("top",topo-10);       
            }
        }
        
        if (game.keypressed[KEY.D]) {
            shoot();
        }
    
    }
    
    function moveBackground(){
        esquerda = parseInt($("#backgroundGame").css("background-position"));
        $("#backgroundGame").css("background-position", esquerda - 1)
        
    }

    function moveEnemy() {

        positionX = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left",positionX-speed);
        $("#enemy1").css("top",positionY);
            
            if (positionX<=0) {
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",positionY);
                
            }
    }

    function moveEnemy2() {
        positionX = parseInt($("#enemy2").css("left"));
	    $("#enemy2").css("left",positionX-3);
				
		if (positionX<=0) {
			
		$("#enemy2").css("left",775);
					
		}
    }

    function moveFriend() {
	
        positionX = parseInt($("#friend").css("left"));
        $("#friend").css("left",positionX+1);
                    
            if (positionX>906) {
                
                $("#friend").css("left",0);
                score=score+100;
                velocidade=velocidade+0.3;
                        
            }
    
    }
    function shoot() {
	
        if (canShoot==true) {
            
            canShoot = false;
        
            topo = parseInt($("#player").css("top"))
            positionX= parseInt($("#player").css("left"))
            shootX = positionX + 190;
            topoShoot=topo+37;
            $("#backgroundGame").append("<div id='bullet'></div");
            $("#bullet").css("top",topoShoot);
            $("#bullet").css("left",shootX);
            
            var bulletTime =window.setInterval(executeShot, 30);
        
        } 
     
        function executeShot() {
            positionX = parseInt($("#bullet").css("left"));
            $("#bullet").css("left",positionX+15); 
    
            if (positionX>900) {            
                window.clearInterval(bulletTime);
                bulletTime=null;
                $("#bullet").remove();
                canShoot=true;   
            }
        }
    }

    function collision() {
        var collision1 = ($("#player").collision($("#enemy1")));
        var collision2 = ($("#player").collision($("#enemy2")));
        var collision3 = ($("#bullet").collision($("#enemy1")));
        var collision4 = ($("#bullet").collision($("#enemy2")));
        var collision5 = ($("#player").collision($("#friend")));
        var collision6 = ($("#enemy2").collision($("#friend")));
        
        if (collision1.length>0) {
            
            startEnergy--

            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X,enemy1Y);


            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",positionY);
        }
        if (collision2.length>0) {

            startEnergy--
	
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X,enemy2Y);
                    
            $("#enemy2").remove();
                
            repositionEnemy2();
                
        }
        if (collision3.length>0) {
		
            score=score+50;
		
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
                
            explosion1(enemy1X,enemy1Y);
            $("#bullet").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#enemy1").css("left",694);
            $("#enemy1").css("top",posicaoY);
                
        }
        if (collision4.length>0) {
		
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();
        
            explosion2(enemy2X,enemy2Y);
            $("#bullet").css("left",950);
            
            repositionEnemy2();
                
        }
        if (collision5.length>0) {
            
            saved = saved +1 
            repositionFriend();
            $("#friend").remove();
        }
        if (collision6.length>0) {
	    
            losted + 1
            friendX = parseInt($("#friend").css("left"));
            friendY = parseInt($("#friend").css("top"));
            explosion3(friendX,friendY);
            $("#friend").remove();
            repositionFriend();      
        }

    }
    function explosion1(enemy1X,enemy1Y) {

        $("#backgroundGame").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(../assets/imgs/explosao.png)");
        var div=$("#explosion1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({width:200, opacity:0}, "slow");
        
        var explosionTime=window.setInterval(removesExplosion, 1000);
        
        function removesExplosion() {
            
            div.remove();
            window.clearInterval(explosionTime);
            explosionTime=null;
            
        }
            
    }
    function explosion2(enemy2X,enemy2Y) {
	
        $("#backgroundGame").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(../assets/imgs/explosao.png)");
        var div2=$("#explosion2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var explosionTime2=window.setInterval(removesExplosion2, 1000);
        
        function removesExplosion2() {
            
            div2.remove();
            window.clearInterval(explosionTime2);
            explosionTime2=null;
            
        }
            
    }
    function repositionEnemy2() {
	
        var collisionTime4=window.setInterval(reposition4, 5000);
            
            function reposition4() {
                window.clearInterval(collisionTime4);
                collisionTime4=null;
                    
                    if (endGame==false) {
                    
                        $("#backgroundGame").append("<div id=enemy2></div");
                    
                    }
                    
                }
    }

    function repositionFriend() {
	
        var friendTime=window.setInterval(reposition6, 6000);
        
            function reposition6() {
            window.clearInterval(friendTime);
            friendTime=null;
            
            if (endGame==false) {
            
                $("#backgroundGame").append("<div id='friend' class='anima3'></div>");
            
            }
            
        }
        
    }
    function explosion3(friendX,friendY) {
        $("#backgroundGame").append("<div id='explosion3' class='anima4'></div");
        $("#explosion3").css("top",friendY);
        $("#explosion3").css("left",friendX);
        var explosionTime3=window.setInterval(resetExplosion3, 1000);
        function resetExplosion3() {
        $("#explosion3").remove();
        window.clearInterval(explosionTime3);
        explosionTime3=null;
                
        }
    
    }
    function energy() {
	
		if (startEnergy==3) {
			
			$("#energy").css("background-image", "url(../assets/imgs/energia3.png)");
		}
	
		if (energiaAtual==2) {
			
			$("#energy").css("background-image", "url(../assets/imgs/energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energy").css("background-image", "url(../assets/imgs/energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energy").css("background-image", "url(../assets/imgs/energia0.png)");
			
			gameOver()
		}
	
	}

    function gameOver() {
        endGame=true;
        
        window.clearInterval(game.timer);
        game.timer=null;
        
        $("#player").remove();
        $("#enemy1").remove();
        $("#enemy2").remove();
        $("#friend").remove();
        
        $("#backgroundGame").append("<div id='end'></div>");
        
        $("#end").html("<h1> Game Over </h1><p>Sua pontuação foi: " + score + "</p>" + "<div id='reset' onClick=resetGame()><h3>Jogar Novamente</h3></div>");
    }
    function resetGame() {
        $("#end").remove();
        start();
    }
}    
