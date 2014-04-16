game.SuperScore = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.gravity = 0;
		this.addShape(new me.Rect(new me.Vector2d(0,0),5,5));
		this.setShape(0); 
		this.shapes[0].pos.x=7;
		this.shapes[0].pos.y=8;
		this.shapes[0].width=19;
		this.shapes[0].height=16;
		this.collidable = true;
	},

	update:function(dt){
		return true;
	},

	onCollision:function(obj, res, objA){
		if(res.type === 'PLAYER'){
			me.event.publish('/player/superscore',[true]);
			me.timer.setTimeout(function(){
				me.event.publish('/player/superscore',[false]);
			},8000,true);	

			me.event.publish('/pause',[true]);
			me.timer.setTimeout(function(){
				me.event.publish('/pause',[false]);
			},300,true);

			me.game.world.removeChild(this);
			game.data.score+=50;
		}
	}
});