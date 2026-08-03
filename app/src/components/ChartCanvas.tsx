import { useEffect, useRef } from "react";
import { Chart, type ChartData, type ChartOptions, type ChartType } from "chart.js/auto";

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
