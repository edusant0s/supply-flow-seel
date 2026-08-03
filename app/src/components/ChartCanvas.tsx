import { useEffect, useRef } from "react";
import { Chart, type ChartData, type ChartOptions, type ChartType } from "chart.js/auto";

export type DataLabelsOptions = {
  color?: string;
  formatter?: (value: number, index: number) => string;
};

const dataLabelsPlugin = {
  id: "sfDataLabels",
  afterDatasetsDraw(chart: Chart) {
    const options = (chart.options.plugins as Record<string, unknown> | undefined)?.sfDataLabels as DataLabelsOptions | undefined;
    if (!options) return;
    const ctx = chart.ctx;
    const chartType = (chart.config as unknown as { type?: string }).type;
    const isRadial = chartType === "doughnut" || chartType === "pie";
    const isHorizontal = (chart.options as { indexAxis?: string }).indexAxis === "y";

    ctx.save();
    ctx.font = "700 11px Arial, sans-serif";

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.hidden) return;
      meta.data.forEach((element, index) => {
        const raw = (dataset.data as unknown[])[index];
        const value = typeof raw === "number" ? raw : undefined;
        if (value === undefined || value === null || value === 0) return;
        const text = options.formatter ? options.formatter(value, index) : String(Math.round(value));
        const position = (element as unknown as { tooltipPosition: () => { x: number; y: number } }).tooltipPosition();

        if (isRadial) {
          ctx.fillStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(10,46,61,0.55)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeText(text, position.x, position.y);
          ctx.fillText(text, position.x, position.y);
        } else if (isHorizontal) {
          ctx.fillStyle = options.color || "#0a2e3d";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(text, position.x + 8, position.y);
        } else {
          ctx.fillStyle = options.color || "#0a2e3d";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(text, position.x, position.y - 6);
        }
      });
    });
    ctx.restore();
  },
};

Chart.register(dataLabelsPlugin);

export function ChartCanvas({
  type,
  data,
  options,
  height = 240,
}: {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<ChartType, unknown, unknown> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const config = {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: "easeOutQuart" },
        ...options,
      },
    };
    chartRef.current = new Chart(canvasRef.current, config as never);
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    chart.data = data as never;
    if (options) chart.options = { ...chart.options, ...options } as never;
    chart.update();
  }, [data, options]);

  return (
    <div style={{ position: "relative", height, width: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
