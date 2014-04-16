game.Pinky = game.Ghost.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
	},

	onCollision:function(obj, res, objA){
		if(res.type==='PLAYER'){
			if(this.superscoreEnabled){
				var that = this;
				game.data.score+=100;
				this.dead = true;
				this.setAnimation();
				me.timer.setTimeout(function(){
					that.dead=false;
					that.setAnimation();
				},2000,true);
			}else{
				this.parent(obj,res,objA);
			}			
		}
	},

	update:function(dt){
		if(this.pauseEnabled)
			return;

		var dirs = this.getDirections('both');
		
		this.setShape(1);
		if(this.vel.x===0 && this.vel.y===0){
			var v = this.getDirectionVelocity(dirs);
			this.vel.x=v.x;
			this.vel.y=v.y;
			this.setAnimation();
		}
		this.updateMovement();
		this.setShape(0);
		this.parent(dt);
		return true;
	}

});
