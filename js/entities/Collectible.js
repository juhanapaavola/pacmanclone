game.Collectible = me.ObjectEntity.extend({
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.gravity=0;
        this.collidable = true;
        this.vel.x=0;
        this.vel.y=0;
	},

	update:function(dt){
		this.updateMovement();
		this.parent(dt);
		return true;
	}
	
});