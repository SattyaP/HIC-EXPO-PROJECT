const player = {
		core: document.querySelector(".player"),
		barrier: document.querySelector(".player-barrier")
	},
	bot = {
		core: document.querySelector(".bot"),
		barrier: document.querySelector(".bot-barrier")
	},
	player_score = document.querySelector(".player-score"),
	bot_score = document.querySelector(".bot-score"),
	punch_sfx = [new Audio("../assets/SFX/punch.mp3"), new Audio("../assets/SFX/punch2.mp3")];

const view = {
	frontMenu: document.querySelector("#front-menu"),
	modeGame: document.querySelector("#mode-game"),
	game: document.querySelector("#game")
}

const inputUsername = document.getElementById("username");

var body = document.querySelector("body"),
	isOnStart = false;

let userData = {}
let botData = {}

function getStart(choosen = "") {
	if (!isOnStart) {

		isOnStart = true;
		body = document.querySelector("body");
		let bot_val = getBot();
		if (choosen == "rock") {
			henshin("rock", player);
		} else if (choosen == "paper") {
			henshin("paper", player);
		} else if (choosen == "scissors") {
			henshin("scissors", player);
		} else {
			return console.warn("INVALID PARAMS");
		}
		if (choosen != "") {
			henshin(bot_val, bot);
		}
		let scoring = getScores(choosen, bot_val);
		if (scoring == true) {
			userData.score = Number(player_score.textContent) + 1;
			player_score.textContent = userData.score;

			getAnimation(player.core, bot.core, 1000);
		} else if (scoring == false) {
			botData.score = Number(bot_score.textContent) + 1;
			bot_score.textContent = botData.score;
			getAnimation(bot.core, player.core, 1000);
		} else {
			isOnStart = false;
		}

		if (userData.score == 3) {
			Swal.fire({
				icon: 'success',
				title: 'Congratulations!',
				text: 'You Win the Game!',
			})
			
			setTimeout(() => {
				location.reload();
			}, 3000);
		} else if (botData.score == 3) {
			Swal.fire({
				icon: 'error',
				title: 'Game Over!',
				text: 'You Lose the Game! AI Win!',
			})
			
			setTimeout(() => {
				location.reload();
			}, 3000);
		}
	}
}

function getScores(player = "", bot = "") {
	let ord = ["rock", "paper", "scissors"],
		result = false;
	if (player == ord[0] && bot == ord[2]) {
		result = true;
	} else if (player == ord[0] && bot == ord[1]) {
		result = false;
	} else if (player == ord[1] && bot == ord[0]) {
		result = true;
	} else if (player == ord[1] && bot == ord[2]) {
		result = false;
	} else if (player == ord[2] && bot == ord[1]) {
		result = true;
	} else if (player == ord[2] && bot == ord[0]) {
		result = false;
	} else {
		result = "draw";
	}
	return result;
}

function getBot() {
	let order = Math.ceil(Math.random() * 30 * 0.1);
	return order == 1 ? "rock" : order == 2 ? "paper" : "scissors";
}

function classed(to, add = false, value, toggle = false, togglevalue = "") {
	if (toggle) {
		return to.classList.toggle(togglevalue);
	}
	return add ? to.classList.add(value) : to.classList.remove(value);
}

function henshin(value, target) {
	resetBg(target);
	let cr = target.core;
	if (value == "rock") {
		// classed(target.barrier, true, "bg-success");
		classed(cr, true, "fa-hand-rock");
		classed(cr, false, "fa-hand-scissors");
		classed(cr, false, "fa-hand-paper");
	} else if (value == "paper") {
		// classed(target.barrier, true, "bg-danger");
		classed(cr, true, "fa-hand-paper");
		classed(cr, false, "fa-hand-scissors");
		classed(cr, false, "fa-hand-rock");
	} else if (value == "scissors") {
		// classed(target.barrier, true, "bg-primary");
		classed(cr, true, "fa-hand-scissors");
		classed(cr, false, "fa-hand-paper");
		classed(cr, false, "fa-hand-rock");
	}
	setTimeout(() => {
		resetBg(target);
	}, 1100);
}

function resetBg(target) {
	classed(target.barrier, false, "bg-success");
	classed(target.barrier, false, "bg-danger");
	classed(target.barrier, false, "bg-primary");
}

function getAnimation(winner, loser, cd = 0) {
	setTimeout(() => {
		let plusanX = body.clientWidth * 0.3;
		let rotationW = 0,
			loserX = 80;
		if (winner == bot.core) {
			plusanX *= -1;
			rotationW = -90;
			loserX *= -1;
		} else {
			rotationW = 90;
			loserX = 80;
		}
		gsap.to(winner, {
			x: plusanX,
			scale: 1.5,
			ease: Elastic.easeOut,
			duration: 1,
			rotate: rotationW
		});
		punch_sfx[Math.floor(Math.random() * 2)].play();
		gsap.to(winner, {
			x: 0,
			scale: 1,
			ease: Elastic.easeOut,
			duration: 1,
			delay: 0.3,
			rotate: 0
		});
		gsap.to(loser, {
			x: loserX,
			y: -150,
			scale: 0,
			opacity: 0,
			ease: Elastic.easeIn(2.5, 1),
			rotate: -360,
			duration: 0.5,
			delay: 0.1
		});
		gsap.to(loser, {
			x: 0,
			y: 0,
			opacity: 1,
			scale: 1,
			duration: 0.2,
			delay: 1.1
		});
		setTimeout(() => {
			setTimeout(() => {
				isOnStart = false;
			}, 100);
		}, cd);
	}, 10);
}

function modeRoom() {
	if (inputUsername.value == "") {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Username cannot be empty!',
		})
	} else {
		view.frontMenu.classList.add("hidden");
		view.modeGame.classList.remove("hidden");
		updateData("username", inputUsername);
	}
}

function joinRoom() {
	view.modeGame.classList.add("hidden");
	view.game.classList.remove("hidden");
	document.body.style.background = "none";

	document.getElementById("name-player").textContent = userData.username;
	Swal.fire({
		icon: 'success',
		title: 'Welcome to the Game!',
		text: 'Good Luck! 3 rounds to win the game!',
	})
}

function updateData(source, target) {
	userData[source] = target.value;
}