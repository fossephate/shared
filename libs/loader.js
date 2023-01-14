

export class LoadWheel {

	constructor() {

	}

	drawCircle = (x, y, radius, start, end, color) => {
		this.context.lineWidth = 6;
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.context.arc(x, y, radius, start, end, false);
		this.context.stroke();
	};

	stepLoadScreen = () => {
		window.time += 1;

		this.context.clearRect(0, 0, this.graphicsCanvas.width, this.graphicsCanvas.height);

		for (let i = 0; i < 3; i++) {
			let start = window.offsets[i];
			let end = window.offsets[i] + (Math.PI * 2) / 3;
			this.drawCircle(640, 360, window.radi[i], start, end, window.colors[i]);
		}

		let baseSpeed = Math.PI / 50;

		// window.offsets[0] += baseSpeed;
		// window.offsets[1] += baseSpeed * (3 / 4);
		// window.offsets[2] += baseSpeed * (3 / 2);

		window.offsets[0] += baseSpeed;
		window.offsets[1] += baseSpeed * (3 / 2);
		window.offsets[2] += baseSpeed * (3 / 4);
	};

	startLoadScreen = () => {
		// this.drawCircle(640, 360, 200, 0, Math.PI, "#000");

		window.offsets = [0, 0, 0];
		window.radi = [125, 100, 75];
		window.colors = ["#3498db", "#e74c3c", "#f9c922"];
		window.time = 0;

		this.loadTimer = setInterval(this.stepLoadScreen, 20);
	};

	stopLoadScreen = () => {};
}