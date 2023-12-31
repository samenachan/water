import '@css/style.css';
import { Scene } from '@ts/scene';
import { Canvas } from '@ts/canvas';
import {GUI} from '@ts/gui';

const canvas: Canvas = new Canvas('canvas');
const gui: GUI = new GUI();

// initialize
if (canvas) {
	Scene.initialize();
	await canvas.initializeRenderingContexts();
	for (const object of Scene.getObjects()) {
		object.initializeMaterial(canvas.webGPU?.device as GPUDevice, canvas.webGPU?.canvasFormat as GPUTextureFormat);
	}
}

// update
function animationFramePromise(): Promise<number> {
	return new Promise<number>((resolve) => {
		globalThis.requestAnimationFrame(resolve);
	});
}

let prevTime = Date.now();
while (canvas) {
	await animationFramePromise();
	const deltaTime = Date.now() - prevTime;
	prevTime = Date.now();

	Scene.update(deltaTime);
	canvas.update();
	gui.update();
}
