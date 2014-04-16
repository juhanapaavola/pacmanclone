game.TitleScreen = me.ScreenObject.extend({
	container:{},
	onResetEvent: function() {
		this.container = new game.TitleScreen.Container();
		me.game.world.addChild(this.container);
	},

	onDestroyEvent: function() {
		me.game.world.removeChild(this.container);
	}
});

game.TitleScreen.Container = me.ObjectContainer.extend({

	init: function() {
		this.parent();
		this.isPersistent = false;
		this.collidable = false;
		this.z = Infinity;
		this.name = "TitleScreen";
		var settings = {
			image:'title',
			width:512,
			height:297,
			spriteheight:297,
			spritewidth:512
		};
		var x = (me.game.viewport.width/2)-(settings.width/2);
		var y = 50;
		this.addChild(new game.TitleScreen.ImageItem(x,y,settings));

		var msg = 'MOVE WITH';
		x = (me.game.viewport.width/2)-((msg.length*32)/2);
		y+=settings.height+32;
		this.addChild(new game.TitleScreen.TextItem(x,y,msg));

		settings = {
			image:'arrowleft',
			width:64,
			height:64,
			spriteheight:64,
			spritewidth:64
		};
		x = (me.game.viewport.width/2)-(4*settings.width)/2;
		y+=32;
		this.addChild(new game.TitleScreen.ImageItem(x,y,settings));
		x+=settings.width;
		settings.image='arrowup';
		this.addChild(new game.TitleScreen.ImageItem(x,y,settings));
		x+=settings.width;
		settings.image='arrowright';
		this.addChild(new game.TitleScreen.ImageItem(x,y,settings));
		x+=settings.width;
		settings.image='arrowdown';
		this.addChild(new game.TitleScreen.ImageItem(x,y,settings));


		msg = 'PRESS ENTER TO PLAY';
		x = (me.game.viewport.width/2)-((msg.length*32)/2);
		y+=settings.height+20;
		this.addChild(new game.TitleScreen.TextItem(x,y,msg));

		msg = '2014 - JUHANA PAAVOLA';
		x = (me.game.viewport.width/2)-((msg.length*32)/2);
		y=me.game.viewport.height-64;
		this.addChild(new game.TitleScreen.TextItem(x,y,msg));

		msg = 'JUHANA.PAAVOLA@GMAIL.COM';
		x = (me.game.viewport.width/2)-((msg.length*32)/2);
		y=me.game.viewport.height-32;
		this.addChild(new game.TitleScreen.TextItem(x,y,msg));
	},

	update:function(dt){
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.READY);
        }
		return false;
	}
});


game.TitleScreen.ImageItem = me.ObjectEntity.extend({	
	init: function(x, y,settings) {
		this.parent(x,y,settings); 
		this.floating = true;
	},

	update : function (dt) {
		return false;
	}
});

game.TitleScreen.TextItem = me.Renderable.extend({	
	init: function(x, y, text) {
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.floating = true;
		this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.text = text;
	},

	update : function () {
		return false;
	},

	draw : function (context) {
		this.font.draw (context, this.text, this.pos.x, this.pos.y);
	}

});