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
      ctx.strokeStyle = "#FF0F0F"; // Set color for "person"
      ctx.lineWidth = 2; // Set the line width for the boundary box

      if (mirrored) {
        ctx.rect(ctx.canvas.width - x - width, y, width, height);
      } else {
        ctx.rect(x, y, width, height);
      }

      // draw stroke
      ctx.stroke();

      // text styling
      ctx.font = "12px Courier New";
      ctx.fillStyle = 'black';

      if (mirrored) {
        ctx.fillText(name, ctx.canvas.width - x - width + 10, y + 20);
      } else {
        ctx.fillText(name, x + 10, y + 20);
      }
    }
  });
}
