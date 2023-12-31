import * as ShaderAPI from '@ts/shaderAPI';
//import { gpuShader} from '@ts/gpuShader';
import { gpuShaderFFT } from './gpuShaderFFT';

export class Object3D {
	costructor() {
		this.construct();
	}

	protected position: number[] = [0.0, 0.0, 0.0];
	protected rotation: number[] = [0.0, 0.0, 0.0];
	protected scale: number[] = [0.0, 0.0, 0.0];

	protected vertexArray: Float32Array = ShaderAPI.Plane.vertexArray;
	protected indexArray: Int32Array = ShaderAPI.Plane.indexArray;

	public gpuShader: gpuShaderFFT = new gpuShaderFFT();
	private device: GPUDevice | null = null;
	private canvasFormat: GPUTextureFormat | null = null;

	protected construct() {}

	public initializeMaterial(device: GPUDevice, canvasFormat: GPUTextureFormat) {
		this.device = device;
		this.canvasFormat = canvasFormat;
		this.gpuShader.initialize(this.device, this.canvasFormat, this.vertexArray, this.indexArray);
	}

	public update(): void {
		if (this.device) {
			this.gpuShader.update(this.device);
		}
	}
}
