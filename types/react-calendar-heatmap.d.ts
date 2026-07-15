declare module "react-calendar-heatmap" {
  import * as React from "react";

  export interface HeatmapValue {
    date: string;
    count: number;
  }

  export interface HeatmapProps {
    startDate: Date;
    endDate: Date;
    values: HeatmapValue[];
    classForValue?: (value?: HeatmapValue) => string;
    tooltipDataAttrs?: (value?: HeatmapValue) => Record<string, string>;
    showWeekdayLabels?: boolean;
    showMonthLabels?: boolean;
    gutterSize?: number;
  }

  const CalendarHeatmap: React.ComponentType<HeatmapProps>;
  export default CalendarHeatmap;
}
