game.Pacman = me.ObjectEntity.extend({
	layer:{},

	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.gravity = 0;
		this.renderable.addAnimation("right",[0,1,2,3,4,5],50);
		this.renderable.addAnimation("left",[6,7,8,9,10,11],50);
		this.renderable.setCurrentAnimation("right");		
		var box = new me.Rect(new me.Vector2d(0,0),5,5);
		this.addShape(new me.Rect(new me.Vector2d(0,0),5,5));
		this.setShape(0); 
		
		this.shapes[0].pos.x=0;
		this.shapes[0].pos.y=0;
		this.shapes[0].width=32;
		this.shapes[0].height=32;
		
		this.collidable = true;
		this.layer = me.game.currentLevel.getLayerByName("foreground");
	},

	update:function(dt){
		this.updateMovement();
		me.game.world.collide(this,true);
		
		if (me.input.isKeyPressed('left')) {
			this.renderable.setCurrentAnimation("left");
			var tid = parseInt(this.layer.getTileId(this.pos.x-32,this.pos.y),10);
			if(this.pos.y%32===0 && isNaN(tid)){
				this.vel.x=-game.data.playerSpeed;
				this.vel.y=0;				
			}
        } else if (me.input.isKeyPressed('right')) {
        	this.renderable.setCurrentAnimation("right");
        	var tid = parseInt(this.layer.getTileId(this.pos.x+32,this.pos.y),10);
        	if(this.pos.y%32===0 && isNaN(tid)){
        		this.vel.x=game.data.playerSpeed;
        		this.vel.y=0;
        	}        		
        } else if (me.input.isKeyPressed('up')) {
        	var tid = parseInt(this.layer.getTileId(this.pos.x,this.pos.y-32),10);
        	if(this.pos.x%32===0 && isNaN(tid)){
            	this.vel.y = -game.data.playerSpeed;
            	this.vel.x=0;        		
        	}
        } else if (me.input.isKeyPressed('down')) {
        	var tid = parseInt(this.layer.getTileId(this.pos.x,this.pos.y+32),10);
        	if(this.pos.x%32===0 && isNaN(tid)){
        		this.vel.y = game.data.playerSpeed;
        		this.vel.x=0;        		
        	}
        }
		
		this.parent(dt);
		return true;
	}
});