// ----------------------- START HIDE CURSOR ------------------------------------
$(function () {
	let timer;
	let fadeInBuffer = false;
	$(document).mousemove(function () {
		if (!fadeInBuffer && timer) {
			clearTimeout(timer);
			timer = 0;
			$("html").css({
				cursor: "",
			});
		} else {
			$("*").css({
				cursor: "default",
			});
			fadeInBuffer = false;
		}
		timer = setTimeout(function () {
			$("*").css({
				cursor: "none",
			});
			fadeInBuffer = true;
		}, 5000); // time 5 seconds
	});
	$("*").css({
		cursor: "default",
	});
});
// ------------------------ END HIDE CURSOR -------------------------------------

// ------------------------- START NAV BAR --------------------------------------
$(".expandHome").mouseover(function () {
	$(".sub-home").css({
		display: "block",
	});
});
$(".subnavbtn").mouseover(function () {
	$(".sub-home").css({
		display: "none",
	});
});

$("#trapezoid")
	.mouseleave(function () {
		$("#trapezoid").css({
			"margin-top": "-53px",
		});
		$(".sub-home").css({
			display: "none",
		});
	})
	.mouseenter(function () {
		$("#trapezoid").css({
			"margin-top": "0px",
		});
	});
// --------------------------- END NAV BAR ---------------------------------------

// ------------------------ GLOBAL VARIABLES -------------------------------------
const camButton = document.querySelector("#camipBtn"),
	camInput = document.querySelector("#cam-ip"),
	engineButton = document.querySelector("#engineipBtn"),
	engineInput = document.querySelector("#engine-ip"),
	leftIndicator = document.querySelector("#leftIndicator"),
	rightIndicator = document.querySelector("#rightIndicator"),
	cmdLink = document.querySelector("#cmd-ip"),
	carHorn = document.querySelector("#carHorn"),
	brakeSound = document.querySelector("#brake"),
	ToggleScreenBtn = document.querySelector("#changeIcon");
// ------------------------ GLOBAL VARIABLES -------------------------------------

//-------------------------- GETTING CAM IP --------------------------------------
// pressed cam input field
function camipClicked() {
	camButton.style.backgroundColor = "red";
}

// pressed cam icon
function getcamIp() {
	camButton.style.backgroundColor = "#ffd607";
	camInput.blur();
	document.body.style.backgroundImage = "url('assets/img/camPreloader.gif')";

	// wait 9.3 sec then execute the function
	setTimeout(function () {
		//for invalid input the second one will load
		document.body.style.backgroundImage =
			'url("' + camInput.value + '/video"' + '), url("assets/img/error.png")';
	}, 6500);
}

// pressed enter key cam field
camInput.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		camButton.click();
	}
});
//-------------------------- GETTING CAM IP --------------------------------------

//------------------------- GETTING ENGINE IP ------------------------------------
// pressed engine input field
function engineipClicked() {
	engineButton.style.backgroundColor = "red";
}

// pressed engine icon
function getengineIp() {
	engineButton.style.backgroundColor = "#ffd607";
	engineInput.blur();
}

// pressed enter key engine field
engineInput.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		engineButton.click();
	}
});
//------------------------- GETTING ENGINE IP ------------------------------------

//--------------------- START TOOGLE FULL SCREEN ---------------------------------
function toggleScreen() {
	if (ToggleScreenBtn.className === "fas fa-expand-arrows-alt") {
		ToggleScreenBtn.className = "fas fa-compress-arrows-alt";
		openFullscreen();
	} else {
		ToggleScreenBtn.className = "fas fa-expand-arrows-alt";
		closeFullscreen();
	}
}

function openFullscreen() {
	const elem = document.documentElement;

	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
}

function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
}
//---------------------- END TOOGLE FULL SCREEN ----------------------------------

// ----------------------- START KEY LISTENER ------------------------------------
let cmd,
	keys = [];
window.addEventListener(
	"keydown",
	function (e) {
		// keyDown not work in ipInput Field
		if (event.target.matches('[type="url"]')) {
			return;
		}
		// -----------------------------------------
		keys[e.keyCode] = e.keyCode;
		let keysArray = getNumberArray(keys);
		cmd = keysArray;
		// passing key value to controller()
		controller();
	},
	false
);

window.addEventListener(
	"keyup",
	function (e) {
		// keyUp not work in ipInput Field
		if (event.target.matches('[type="url"]')) {
			return;
		}
		// -----------------------------------------
		keys[e.keyCode] = false;
		cmd = "STOP" + getNumberArray(keys);
		// passing key value to controller()
		controller();
	},
	false
);

function getNumberArray(arr) {
	let newArr = new Array();
	for (let i = 0; i < arr.length; i++) {
		if (typeof arr[i] == "number") {
			newArr[newArr.length] = arr[i];
		}
	}
	return newArr;
}
// ----------------------- END KEY LISTENER ------------------------------------

// ----------------------- START CONTROLLER ------------------------------------
function controller() {
	// view recieved key values
	// console.log(cmd);

	// getting cmd(to string) as command
	const command = cmd.toString();

	// _____________FORWARD____________
	// --------ArrowUp / KeyW---------
	if (
		command == "38" ||
		command == "STOP38" ||
		command == "87" ||
		command == "STOP87"
	) {
		// action
		sendToCar("/f");
	}

	// ____________BACKWARD____________
	// ------ArrowDown / KeyS---------
	if (
		command == "40" ||
		command == "STOP40" ||
		command == "83" ||
		command == "STOP83"
	) {
		// action
		sendToCar("/b");
	}

	// ___________WHEEL-LEFT___________
	// ------ArrowLeft / KeyA---------
	if (
		command == "37" ||
		command == "STOP37" ||
		command == "65" ||
		command == "STOP65"
	) {
		leftIndicator.style.opacity = "1.0";
		// action
		sendToCar("/left");
	}

	// ___________WHEEL-RIGHT__________
	// -----ArrowRight / KeyD---------
	if (
		command == "39" ||
		command == "STOP39" ||
		command == "68" ||
		command == "STOP68"
	) {
		rightIndicator.style.opacity = "1.0";
		// action
		sendToCar("/right");
	}

	// ___________FORWARD-LEFT_________
	// --Arrow[Up + Left] / Key[W + A]--
	if (
		command == "37,38" ||
		command == "65,87" ||
		command == "38,65" ||
		command == "37,87"
	) {
		leftIndicator.style.opacity = "1.0";
		// action
		sendToCar("/l");
	}

	// ___________FORWARD-RIGHT________
	// --Arrow[Up + Right] / Key[W + D]--
	if (
		command == "38,39" ||
		command == "68,87" ||
		command == "38,68" ||
		command == "39,87"
	) {
		rightIndicator.style.opacity = "1.0";
		// action
		sendToCar("/r");
	}

	// __________BACKWARD-LEFT_________
	// --Arrow[Down + Left] / Key[S + A]--
	if (
		command == "37,40" ||
		command == "65,83" ||
		command == "40,65" ||
		command == "37,83"
	) {
		// action
		sendToCar("/bl");
	}

	// __________BACKWARD-RIGHT________
	// --Arrow[Down + Right] / Key[S + D]--
	if (
		command == "39,40" ||
		command == "68,83" ||
		command == "40,68" ||
		command == "39,83"
	) {
		// action
		sendToCar("/br");
	}

	// ______________STOP______________
	// -----------All KeyUP---------
	if (command == "STOP") {
		// action
		sendToCar("/s");
	}

	// __________EMERGENCY-BRAKE________
	// --------------SpaceBar----------
	if (command == "32") {
		brakeSound.play();

		leftIndicator.style.color = "#DC3545";
		rightIndicator.style.color = "#DC3545";
		leftIndicator.style.opacity = "1.0";
		rightIndicator.style.opacity = "1.0";

		// action
		sendToCar("/s");
	}

	// ______________H-O-R-N____________
	// ---------------KeyH-------------
	if (command == "72") {
		carHorn.play();

		// action
		sendToCar("/ho");
	}
}
// ----------------------- END CONTROLLER ------------------------------------

// --------------------- SEND COMMAND TO CAR ---------------------------------
function sendToCar(carCmd) {
	cmdLink.href = engineInput.value + carCmd;
	cmdLink.click();
	return;
}
// --------------------- SEND COMMAND TO CAR ---------------------------------

//------------------------- START KEY UP -------------------------------------
window.addEventListener("keyup", function (event) {
	// ___________WHEEL-RIGHT__________
	// -----ArrowRight / KeyD---------
	if (event.code == "ArrowLeft" || event.code == "KeyA") {
		leftIndicator.style.opacity = "0.2";
	}

	// __________BACKWARD-RIGHT________
	// --Arrow[Down + Right] / Key[S + D]--
	if (event.code == "ArrowRight" || event.code == "KeyD") {
		rightIndicator.style.opacity = "0.2";
	}

	// ______________HORN-OFF____________
	// ---------------KeyH-------------
	if (event.code == "KeyH") {
		carHorn.pause();
		carHorn.currentTime = 0;

		// action
		sendToCar("/hf");
	}

	// ______________SPACEBAR____________
	if (event.code == "Space") {
		brakeSound.pause();
		brakeSound.currentTime = 0;
		leftIndicator.style.color = "#ffd607";
		rightIndicator.style.color = "#ffd607";
		leftIndicator.style.opacity = "0.2";
		rightIndicator.style.opacity = "0.2";

		// action
		sendToCar("/s");
	}
});
//----------------------- END KEY UP -------------------------------------
