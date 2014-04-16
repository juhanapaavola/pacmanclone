game.TunnelBase = me.ObjectEntity.extend({
	player:null,
	init:function(x,y,settings){
		this.parent(x,y,settings);
		this.player = me.game.world.getChildByProp('name','Pacman')[0];
	}
});