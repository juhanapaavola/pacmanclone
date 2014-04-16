
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		playerSpeed:4, // 1,2,4,8... modulus of 32
		level:1,
		lives:3
	},

	Collectibles:['cherry'],
	CollectibleData:{
		SpawnTimeout:10000,
		Timeout:3000
	},
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 1024, 768, true, 'auto',true)) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
	me.debug.renderHitBox = true;
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.READY, new game.LevelStartScreen());
		me.state.set(me.state.GAME_END, new game.GameOverScreen());
		me.state.set(me.state.TITLE, new game.TitleScreen());
		me.state.transition("fade", "#000000", 250);

		me.pool.register("Pacman",game.Pacman);
		me.pool.register("score",game.Score);
		me.pool.register("superscore",game.SuperScore);
		me.pool.register("pinky",game.Pinky,true);
		me.pool.register("blinky",game.Blinky,true);
		me.pool.register("inky",game.Inky,true);
		me.pool.register("clyde",game.Clyde,true);
		me.pool.register('tunnelleft',game.TunnelLeft);
		me.pool.register('tunnelright',game.TunnelRight);
		me.pool.register('cherry',game.Cherry,true);

		me.input.bindKey(me.input.KEY.LEFT, "left");
    	me.input.bindKey(me.input.KEY.RIGHT, "right");
    	me.input.bindKey(me.input.KEY.UP,'up');
    	me.input.bindKey(me.input.KEY.DOWN,'down');
		me.input.bindKey(me.input.KEY.ENTER, "enter");

		// Start the game.
		me.state.change(me.state.TITLE);
	}
};

me.sys.fps=30;
