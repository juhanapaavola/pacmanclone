game.Ghost = me.ObjectEntity.extend({
	layer:{},
	oldUpdate:0,
	directionThreshold:5000,
	pauseVel:null,
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.gravity = 0;
		var box = new me.Rect(new me.Vector2d(0,0),32,32);
		this.addShape(box);

		this.shapes[0].pos.x=3;
		this.shapes[0].pos.y=1;
		this.shapes[0].width=26;
		this.shapes[0].height=28;
		
		this.collidable = true;
		this.layer = me.game.currentLevel.getLayerByName("background");
		this.superscoreEnabled = false;
		this.pauseEnabled = false;
		this.dead = false;

		this.renderable.addAnimation("left",[3]);
		this.renderable.addAnimation("right",[7]);
		this.renderable.addAnimation("left_dead",[0]);
		this.renderable.addAnimation("right_dead",[4]);
		this.renderable.addAnimation("right_eatable",[5,6],200);
		this.renderable.addAnimation("left_eatable",[1,2],200);
		this.renderable.setCurrentAnimation("right");
		
		me.event.subscribe('/player/superscore',this.superscore.bind(this));
		me.event.subscribe('/pause',this.pause.bind(this));
	},

	pause:function(enable){
		this.pauseEnabled = enable;
		if(enable){
			this.pauseVel = this.vel;			
		}else{
			if(this.pauseVel!==null){
				this.vel = this.pauseVel;
			}
		}
	},

	superscore:function(enable){
		this.superscoreEnabled = enable;
		this.setAnimation();
	},

	isValidTile:function(x,y){
		if(x%32!==0 && y%32!==0)
			return false;

		if(this.layer.getTile(x,y)!==null){
			var tile = this.layer.getTile(x,y);
			var props = tile.tileset.TileProperties;
			if(props[props.length-1].type.toLowerCase()==='background' && tile.pos.x===x && tile.pos.y===y){
				return true;
			}
		}
		return false;
	},

	getDirections:function(towhere){
		var dirs = [];

		if(!isNaN(this.layer.getTileId(this.pos.x-32,this.pos.y))){
			if(towhere==='hor' || towhere==='both'){
				if(this.isValidTile(this.pos.x-32,this.pos.y)){
					dirs.push('left');
				}
			}			
		}
		if(!isNaN(this.layer.getTileId(this.pos.x+32,this.pos.y))){
			if(towhere==='hor' || towhere==='both'){
				if(this.isValidTile(this.pos.x+32,this.pos.y)){
					dirs.push('right');
				}
			}			
		}
		if(!isNaN(this.layer.getTileId(this.pos.x,this.pos.y-32))){
			if(towhere==='ver' || towhere==='both'){
				if(this.isValidTile(this.pos.x,this.pos.y-32)){
					dirs.push('up');
				}
			}			
		}
		if(!isNaN(this.layer.getTileId(this.pos.x,this.pos.y+32))){
			if(towhere==='ver' || towhere==='both'){
				if(this.isValidTile(this.pos.x,this.pos.y+32)){
					dirs.push('down');
				}
			}
		}
		return dirs;
	},

	getDirectionVelocity:function(dirs){
		var max = dirs.length-1;
		var min = 0;
		var vel = {x:0,y:0};
		dir = dirs[Math.floor(Math.random() * (max - min + 1)) + min];
		if(dir==='left' && this.pos.y%32===0){
			vel.x=-2;
		}
		if(dir==='right' && this.pos.y%32===0){
			vel.x=2;
		}
		if(dir==='up' && this.pos.x%32===0){
			vel.y=-2;
		}
		if(dir==='down' && this.pos.x%32===0){
			vel.y=2;
		}
		return vel;
	},

	getDirectionByVelocity:function(vel){
		if(vel.x<0) return 'left';
		if(vel.x>0) return 'right';
		if(vel.y<0) return 'up';
		if(vel.y>0) return 'down';		
		return 'none';	
	},

	setAnimation:function(){
		if(this.vel.x<0){
			if(this.dead){
				this.renderable.setCurrentAnimation("left_dead");
			}else if(this.superscoreEnabled){				
				this.renderable.setCurrentAnimation("left_eatable");
			}else{
				this.renderable.setCurrentAnimation("left");
			}
		}else{
			if(this.dead){
				this.renderable.setCurrentAnimation("right_dead");
			}else if(this.superscoreEnabled){
				this.renderable.setCurrentAnimation("right_eatable");
			}else{
				this.renderable.setCurrentAnimation("right");					
			}
		}
		if(this.vel.y<0){
			if(this.dead){
				this.renderable.setCurrentAnimation("left_dead");
			}
		}else{
			if(this.dead){
				this.renderable.setCurrentAnimation("right_dead");
			}
		}
	},

	onCollision:function(obj, res, objA){
		if(!this.superscoreEnabled){
			me.event.publish('/pause/all',[true]);	
		}	
	},

	onDestroyEvent:function(){
		me.event.unsubscribe('/player/superscore');
		me.event.unsubscribe('/pause');	
	}
});