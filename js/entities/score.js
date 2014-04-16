game.Score = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.gravity = 0;
		this.addShape(new me.Rect(new me.Vector2d(0,0),5,5));
		this.setShape(0); 
		this.shapes[0].pos.x=11;
		this.shapes[0].pos.y=11;
		this.shapes[0].width=10;
		this.shapes[0].height=10;
		this.collidable = true;
	},

	update:function(dt){
		return true;
	},

	onCollision:function(obj, res, objA){
		if(res.type === 'PLAYER'){
			me.game.world.removeChild(this);
			game.data.score+=10;
			me.event.publish('/player/score');
		}
	}
});