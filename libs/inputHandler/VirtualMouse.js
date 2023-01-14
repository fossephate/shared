import { ControllerState, MouseState } from "./DeviceStates.js";
import { AxisSettings } from "./VirtualController.js";
const restPos = 0;

import { clamp } from "shared/libs/utils.js";

export class VirtualMouse {
	constructor() {
		this.canvas = null;
		this.ctx = null;
		this.canvasRatio = 1;

		this.cstate = new ControllerState();
		this.mstate = new MouseState();

		this.btnMap = {
			0: "left",
			1: "middle",
			2: "right",
		};

		this.mouseMoveTimer = null;
		this.changed = false;
		this.exception = false;
		this.inCanvas = false;

		this.settings = {
			enabled: false,
			realMode: false,
			relativeMode: false,

			axes: [
				// new AxisSettings(0.08, 0, 0), // 15
				// new AxisSettings(0.08, 0, 0),
				new AxisSettings(0.0006, 0, 0),
				new AxisSettings(0.0006, 0, 0),
				new AxisSettings(0.05, 0, 0),
			],

			map: {
				buttons: ["zr", "x", "zl"],
			},
		};
	}

	onPointerLockChange = () => {
		if (document.pointerLockElement == null) {
			this.toggle(false);
		}
	};

	drawCircle = (x, y) => {
		x = Math.round(x * this.canvas.width);
		y = Math.round(y * this.canvas.height);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();
		this.ctx.fillStyle = "#000";
		this.ctx.arc(x, y, 6, 0, 2 * Math.PI, true);
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.fillStyle = "#FFF";
		this.ctx.arc(x, y, 4, 0, 2 * Math.PI, true);
		this.ctx.fill();
	};

	getMouseInput1 = (event) => {
		if (this.settings.relativeMode) {
			// on mouse stop:
			clearTimeout(this.mouseMoveTimer);
			this.mouseMoveTimer = setTimeout(() => {
				this.changed = true;
				this.cstate.axes[2] = restPos;
				this.cstate.axes[3] = restPos;
			}, 80);
		}

		if (this.settings.relativeMode) {
			let x = restPos + event.movementX * this.settings.axes[0].sensitivity;
			let y = restPos - event.movementY * this.settings.axes[1].sensitivity;
			this.mstate.dx = clamp(x, -1, 1);
			this.mstate.dy = clamp(y, -1, 1);
			this.cstate.axes[2] = this.mstate.dx;
			this.cstate.axes[3] = this.mstate.dy;

			this.mstate.x += x;
			this.mstate.y -= y * this.canvasRatio;
		} else {
			let rect = this.canvas.getBoundingClientRect();
			let x = (event.clientX - rect.left) / rect.width;
			let y = (event.clientY - rect.top) / rect.height;
			this.mstate.x = x;
			this.mstate.y = y;
		}

		// console.log(event);
		// console.log(event.clientX, event.clientY);
		// console.log(event.pageX, event.pageY);
		// console.log(event.x, event.y);
		// console.log(event.screenX, event.screenY);
		// console.log(event.offsetX, event.offsetY);
		// console.log(event.layerX, event.layerY);

		this.changed = true;

		this.mstate.x = clamp(this.mstate.x, 0, 1);
		this.mstate.y = clamp(this.mstate.y, 0, 1);

		// this.drawCircle(this.mstate.x, this.mstate.y);

		// if (this.mstate.x === 0 || this.mstate.x === 1) {
		// this.exitCanvas();
		// }
	};

	getMouseInput2 = (event) => {
		this.changed = true;
		let pressed = event.type == "mousedown" ? 1 : 0;
		this.cstate.buttons[this.settings.map.buttons[event.which - 1]] = pressed;
		let which = this.btnMap[event.which - 1];
		this.mstate.btns[which] = pressed;

		if (this.inCanvas && which === "right" && pressed) {
			event.preventDefault();
		}
	};

	getMouseInput3 = (event) => {
		this.changed = true;
		this.mstate.scroll -= (event.deltaY * this.settings.axes[2].sensitivity);
		event.preventDefault();
	};

	init = (canvas) => {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.canvasRatio = this.canvas.width / this.canvas.height;
		window.ctx = this.ctx;
		window.canvas = this.canvas;
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
		document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
	};

	toggle = (state) => {
		if (!this.canvas) {
			console.log("canvas not set!");
			return;
		}

		this.settings.enabled = state;

		if (state) {
			if (this.settings.relativeMode) {
				this.canvas.requestPointerLock();
				document.addEventListener("pointerlockchange", this.onPointerLockChange, false);
			} else {
				this.canvas.addEventListener("mouseenter", this.enterCanvas, false);
				this.canvas.addEventListener("mouseleave", this.exitCanvas, false);
			}

			this.enterCanvas();
		} else {
			this.exitCanvas();

			clearTimeout(this.mouseMoveTimer);
			this.cstate.axes[2] = restPos;
			this.cstate.axes[3] = restPos;
			setTimeout(() => {
				this.settings.enabled = false;
			}, 1000);
		}
	};

	enterCanvas = () => {
		this.inCanvas = true;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.settings.enabled) {
			document.getElementById("picture").style = "background: #FF000060";
		}
		document.addEventListener("mousemove", this.getMouseInput1, false);
		document.addEventListener("mousedown", this.getMouseInput2, false);
		document.addEventListener("mouseup", this.getMouseInput2, false);

		if (!this.settings.relativeMode) {
			this.canvas.addEventListener("wheel", this.getMouseInput3, { passive: false });
			this.canvas.addEventListener("contextmenu", this.handleContextMenu, false);
		}
	};

	exitCanvas = () => {
		this.inCanvas = false;
		clearTimeout(this.mouseMoveTimer);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		document.getElementById("picture").style = "";
		document.removeEventListener("mousemove", this.getMouseInput1);
		document.removeEventListener("mousedown", this.getMouseInput2);
		document.removeEventListener("mouseup", this.getMouseInput2);

		if (!this.settings.relativeMode) {
			this.canvas.removeEventListener("wheel", this.getMouseInput3);
			this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
		} else {
			document.removeEventListener("pointerlockchange", this.onPointerLockChange);
			document.exitPointerLock();
		}
	};

	handleContextMenu = (event) => {
		event.preventDefault();
	};

	destroy = () => {
		this.exitCanvas();
	};

	getControllerState = () => {
		return this.cstate.getState();
	};

	getState = () => {
		// return this.mstate.getState();
		if (this.mstate.scroll !== 0) {
			this.exception = true;
		} else {
			this.exception = false;
		}
		this.mstate.dScroll = this.mstate.scroll;
		this.mstate.scroll = 0;
		return this.mstate;
	};
}
