game.Blinky = game.Ghost.extend({
	directionThreshold:3000,
	onCollision:function(obj, res, objA){
		if(res.type==='PLAYER'){
			if(this.superscoreEnabled){
				var that = this;
				game.data.score+=250;
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
		this.oldUpdate+=dt;
		this.setShape(1);

		// change dir everytime when come to junction
		var v;		
		dirs = this.getDirections('both');
		var mydir = this.getDirectionByVelocity(this.vel);

		if(dirs.length>2 || mydir==='none'){
			// in junction				
			switch(mydir){
				case 'left':
				var ind = dirs.indexOf(mydir);
				if(ind>-1)
					dirs.splice(ind,1);
				ind = dirs.indexOf('right');
				if(ind>-1)
					dirs.splice(ind,1);
				break;
				case 'right':
				var ind = dirs.indexOf(mydir);
				if(ind>-1)
					dirs.splice(ind,1);
				ind = dirs.indexOf('left');
				if(ind>-1)
					dirs.splice(ind,1);
				break;
				case 'up':
				var ind = dirs.indexOf(mydir);
				if(ind>-1)
					dirs.splice(ind,1);
				ind = dirs.indexOf('down');
				if(ind>-1)
					dirs.splice(ind,1);
				break;
				case 'down':
				var ind = dirs.indexOf(mydir);
				if(ind>-1)
					dirs.splice(ind,1);
				ind = dirs.indexOf('up');
				if(ind>-1)
					dirs.splice(ind,1);

				break;
				default:break;
			}
			this.lastDirection = this.getDirectionByVelocity(this.vel);
			v = this.getDirectionVelocity(dirs);
			this.vel.x=v.x;
			this.vel.y=v.y;
			this.canChangeDirection = false;
			this.setAnimation();
		}
		
		this.updateMovement();
		this.setShape(0);
		
		this.parent(dt);
		return true;
	}

});