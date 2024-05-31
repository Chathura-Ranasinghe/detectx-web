import { DetectedObject } from "@tensorflow-models/coco-ssd";

// mirrored, predictions, canvasRef.current?.getContext('2d')
export function drawOnCanvas(
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined
) {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox } = detectedObject;
    
    if (name !== "person") return; // Only draw for "person" class

    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();

      // styling
      ctx.fillStyle = "#FF0F0F"; // Set color for "person"
      ctx.globalAlpha = 0.4;

      if (mirrored) {
        ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8);
      } else {
        ctx.roundRect(x, y, width, height, 8);
      }

      // draw stroke or fill
      ctx.fill();

      // text styling
      ctx.font = "12px Courier New";
      ctx.fillStyle = 'black';
      ctx.globalAlpha = 1;

      if (mirrored) {
        ctx.fillText("Human Detected", ctx.canvas.width - x - width + 10, y + 20);
      } else {
        ctx.fillText("Human Detected", x + 10, y + 20);
      }
    }
  });
}