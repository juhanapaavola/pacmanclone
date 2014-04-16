game.TunnelLeft = game.TunnelBase.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.shapes[0].width = 10;
	},
	onCollision:function(obj, res, objA){
		if(res.type==='PLAYER' && this.player.vel.x<0){			
			this.player.pos.x=me.game.currentLevel.width-32;
		}
	}
});