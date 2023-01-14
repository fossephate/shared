

export default class LoadCircle {

	constructor(canvas) {

		this.time = 0;
		this.progress = 0;
		this.speed = Math.PI / 24;

		this.timer = null;

		this.centerX = 0;
		this.centerY = 0;

		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		
		this.offsets = [0, 0, 0];
		this.radi = [120, 100, 80];
		this.colors = ["#3498db", "#e74c3c", "#f9c922"];


	}

	drawCircle = (x, y, radius, start, end, color) => {
		this.context.lineWidth = 6;
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.context.arc(x, y, radius, start, end, false);
		this.context.stroke();
	};

	step = () => {
		this.time += 0.05;

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = 0; i < 3; i++) {
			let start = this.offsets[i];
			let end = this.offsets[i] + (Math.PI * 2) / 3;
			this.drawCircle(this.centerX, this.centerY, this.radi[i], start, end, this.colors[i]);
		}

		// this.offsets[0] += this.speed;
		// this.offsets[2] += this.speed * (3 / 4);
		// this.offsets[1] += this.speed * (3 / 2);

		this.offsets[0] += this.speed;
		this.offsets[1] += this.speed + (this.speed * (3 / 4));
		this.offsets[2] += this.speed + (this.speed * (3 / 2));

		if (this.time > 1000 * 60 * 5) {
			this.offsets = [0, 0, 0];
		}
	};

	start = (centerX, centerY) => {
		// this.drawCircle(640, 360, 200, 0, Math.PI, "#000");

		this.centerX = centerX;
		this.centerY = centerY;
		this.time = 0;
		this.timer = setInterval(this.step, 50);
	};

	stop = () => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		clearInterval(this.timer);
	};
}