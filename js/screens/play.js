game.PlayScreen = me.ScreenObject.extend({
	running:false,
	hasCollectible:false,
	collectibleObject:null,
	totalScores:null,
	HUD:null,
	hasResetEvent:false,

	onResetEvent: function() {
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		me.levelDirector.loadLevel("level");
		this.running=true;
		this.spawnCollectible(game.CollectibleData.SpawnTimeout);

		this.totalScores = me.game.world.getChildByProp('type','SCORE').length;
		this.totalScores += me.game.world.getChildByProp('type','SUPERSCORE').length;
		this.hasResetEvent = false;

		me.event.subscribe('/player/score',this.removeScore.bind(this));
		me.event.subscribe('/player/superscore',this.removeScore.bind(this));
		me.event.subscribe('/pause/all',this.pauseAll.bind(this));
		game.data.lives--;
	},

	pauseAll:function(){
		if(!this.hasResetEvent){
			this.hasResetEvent = true;
			if(game.data.lives>0){
				me.state.change(me.state.READY);
			}else{
				me.state.change(me.state.GAME_END);				
			}
		}
	},

	removeScore:function(){
		this.totalScores--;
		if(this.totalScores>0){
				
		}else{
			game.data.level++;
			me.state.change(me.state.READY);
		}
	},

	spawnCollectible:function(collectibleTimeout){
		me.timer.setTimeout(this.doSpawnCollectible.bind(this),collectibleTimeout,true);
	},
	
	doSpawnCollectible:function(){
		if(this.running){
			var max = game.Collectibles.length-1;
			var min = 0;
			var val = Math.floor(Math.random() * (max - min + 1)) + min;
			if(this.hasCollectible){
				// remove
				this.hasCollectible = false;
				if(this.collectibleObject!==null && this.collectibleObject!=='undefined'){
					me.game.world.removeChild(this.collectibleObject);
				}					
				this.spawnCollectible(game.CollectibleData.SpawnTimeout);
			}else{
				// add new
				var x = 12*32;
				var y = 18*32;
				var set = {image:'cherry_32',spriteheight:32,spritewidth:32,width:32,height:32};
				this.collectibleObject = me.pool.pull(game.Collectibles[val],x,y,set);
				me.game.world.addChild(this.collectibleObject,10);
				this.hasCollectible = true;
				this.spawnCollectible(game.CollectibleData.Timeout);
			}
		}
	},
	
	onDestroyEvent: function() {
		me.game.world.removeChild(this.HUD);
		this.running=false;
		me.event.unsubscribe('/score/remove');
		me.event.unsubscribe('/pause/all');
	}
});
