game.LevelStartScreen = me.ScreenObject.extend({
	container:{},
	timerId:null,
	onResetEvent: function() {
		this.container = new game.LevelStartScreen.Container();
		me.game.world.addChild(this.container);
		if(this.timerId!==null){
			me.timer.clearTimeout(this.timerId);
		}

        this.timerId = me.timer.setTimeout(function(){
            me.state.change(me.state.PLAY);
        },1500,true);
	},

	onDestroyEvent: function() {
		me.game.world.removeChild(this.container);
		if(this.timerId!==null){
			me.timer.clearTimeout(this.timerId);
		}
	}
});

game.LevelStartScreen.Container = me.ObjectContainer.extend({

	init: function() {
		this.parent();
		this.isPersistent = true;
		this.collidable = false;
		this.z = Infinity;
		this.name = "LevelStartScreen";
		this.addChild(new game.LevelStartScreen.TextItem(0, 0));
	},
	update:function(dt){
		if (me.input.isKeyPressed('enter')) {
			me.state.change(me.state.PLAY);
        }
		return false;
	}
});


game.LevelStartScreen.TextItem = me.Renderable.extend({	
	init: function(x, y) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
	},

	update : function () {
		return false;
	},

	draw : function (context) {
		var msg = 'LEVEL START';
		var x = (me.game.viewport.width-((msg.length)*32))/2;
		var y = (me.game.viewport.height/2)-64;
		this.font.draw (context, msg, x, y);
		msg = 'GET READY';

		x = (me.game.viewport.width-((msg.length)*32))/2;
		y = (me.game.viewport.height/2);
		this.font.draw (context, msg, x, y);
	}

});