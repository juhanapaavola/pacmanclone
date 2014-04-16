game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		this.parent();
		this.isPersistent = true;
		this.collidable = false;
		this.z = Infinity;
		this.name = "HUD";
		this.addChild(new game.HUD.ScoreItem(0, 0));
		this.addChild(new game.HUD.LevelItem(0,0));
		this.addChild(new game.HUD.LivesItem(0,0));
	},
	onDestroyEvent: function() {
		for(var i=0;i<this.children.length;i++){
			me.game.world.removeChild(this.children[i]);
		}
		
	}
});


game.HUD.ScoreItem = me.Renderable.extend({	
	init: function(x, y) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.score = -1;
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
	},

	update : function () {
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	draw : function (context) {		
		var w = this.score.toString().length*32;
		context.fillStyle='#000';
		context.fillRect(this.pos.x+40, this.pos.y, w, 32);		
		this.font.draw (context, this.score, this.pos.x+40, this.pos.y);
	}

});

game.HUD.LevelItem = me.Renderable.extend({	
	init: function(x, y) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.level = -1;
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
	},

	update : function () {
		if (this.level !== game.data.level) {	
			this.level = game.data.level;
			return true;
		}
		return false;
	},

	draw : function (context) {		
		var msg = 'LEVEL '+this.level.toString();
		w = msg.length*32;
		var x = (me.game.viewport.width-40);
		this.font.draw(context, msg, x, this.pos.y);
	}

});

game.HUD.LivesItem = me.Renderable.extend({	
	init: function(x, y) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.lives = -1;
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
	},

	update : function () {
		if (this.lives !== game.data.lives) {	
			this.lives = game.data.lives;
			return true;
		}
		return false;
	},

	draw : function (context) {		
		var count = this.lives+1;
		var msg = 'LIVES '+count.toString();
		w = msg.length*32;
		var x = (me.game.viewport.width/2-w/2);
		this.font.draw(context, msg, x, this.pos.y);
	}

});