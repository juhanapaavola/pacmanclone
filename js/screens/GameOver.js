game.GameOverScreen = me.ScreenObject.extend({
	container:{},
	timerId:null,
	onResetEvent: function() {
		var score = game.data.score;
		this.container = new game.GameOverScreen.Container(score);
		me.game.world.addChild(this.container);
       	game.data.score = 0;
       	game.data.level = 0;
       	game.data.lives = 3;
		if(this.timerId!==null){
			me.timer.clearTimeout(this.timerId);
		}

        this.timerId = me.timer.setTimeout(function(){
            me.state.change(me.state.TITLE);
        },1500,true);
	},

	onDestroyEvent: function() {
		me.game.world.removeChild(this.container);
		if(this.timerId!==null){
			me.timer.clearTimeout(this.timerId);
		}
	}
});

game.GameOverScreen.Container = me.ObjectContainer.extend({

	init: function(score) {
		this.parent();
		this.isPersistent = true;
		this.collidable = false;
		this.z = Infinity;
		this.name = "GameOverScreen";
		this.addChild(new game.GameOverScreen.TextItem(0, 0,score));
	},
	update:function(dt){
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.TITLE);
        }
		return false;
	}
});


game.GameOverScreen.TextItem = me.Renderable.extend({	
	score:0,
	init: function(x, y,score) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.score = score;
	},

	update : function () {
		return false;
	},

	draw : function (context) {
		var msg = 'GAME OVER';
		var x = (me.game.viewport.width-((msg.length)*32))/2;
		var y = (me.game.viewport.height/2)-64;
		this.font.draw (context, msg, x, y);
		msg = 'SCORE '+this.score;

		x = (me.game.viewport.width-((msg.length)*32))/2;
		y = (me.game.viewport.height/2);
		this.font.draw (context, msg, x, y);
	}

});