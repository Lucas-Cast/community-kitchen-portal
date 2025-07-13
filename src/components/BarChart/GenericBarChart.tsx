'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type GenericBarChartProps = {
  data: Array<{ name: string; value: number }>;
  widthPerItem?: number;
  minWidth?: number;
  height?: string | number;
  barSize?: number;
  barColor?: string;
  truncateLabel?: (label: string) => string;
  xAxisAngle?: number;
  xAxisHeight?: number;
  tickFontSize?: number;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
};

export function GenericBarChart({
  data,
  widthPerItem = 80,
  minWidth = 600,
  height = '100%',
  barSize = 40,
  barColor = '#291fecff',
  truncateLabel = (label: string) => label,
  xAxisAngle = -45,
  xAxisHeight = 100,
  tickFontSize = 12,
  margin = { top: 20, right: 30, left: 20, bottom: 120 },
}: GenericBarChartProps) {
  return (
    <div className="w-full h-[400px] overflow-x-auto">
      <ResponsiveContainer width={Math.max(minWidth, data.length * widthPerItem)} height={height}>
        <BarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={xAxisAngle}
            textAnchor="end"
            height={xAxisHeight}
            tickFormatter={truncateLabel}
            interval={0}
            tick={{ fontSize: tickFontSize }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} barSize={barSize} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}