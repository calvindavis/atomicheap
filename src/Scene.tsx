import { h, JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import store from "./store";

export default function Scene(): JSX.Element {
	const canvas = useRef<HTMLCanvasElement>(null);
	let ctx: CanvasRenderingContext2D = null;
	let animationFrameId = null;
	let assets = store.getState().assets;

	const render: FrameRequestCallback = (time) => {
		animationFrameId = requestAnimationFrame(render);

		if (ctx === null) {
			ctx = canvas.current.getContext("2d");
		}

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.fillStyle = "white";
		assets.forEach((asset, index) => {
			const size = 10;
			const x = index * (size + size / 2);
			const y = size;

			ctx.fillRect(x, y, size, size);
		});
	};

	store.subscribe(() => {
		assets = store.getState().assets;
	});

	useEffect(() => {
		animationFrameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	});

	return <canvas ref={canvas}></canvas>;
}
