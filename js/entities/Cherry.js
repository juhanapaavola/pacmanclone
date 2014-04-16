game.Cherry = game.Collectible.extend({
	onCollision:function(obj, res, objA){
		me.game.world.removeChild(this);
		game.data.score+=100;
	}
});