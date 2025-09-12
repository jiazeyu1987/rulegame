export interface StoryTextProps {
  content: string;
  speed?: 'slow' | 'normal' | 'fast';
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export interface ProgressIndicatorProps {
  currentDay: number;
  completedDays: number[];
  totalDays: number;
  onDayClick?: (day: number) => void;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular' | 'calendar';
}

export interface ProvinceData {
  name: string;
  code: string;
  value: number; // 通关人数
  color?: string; // 计算出的颜色
  path: string; // SVG路径数据
  center: [number, number]; // 中心点坐标
  bounds: [[number, number], [number, number]]; // 边界框
}

export interface ChinaMapProps {
  mode: 'selection' | 'display';
  selectedProvince?: string;
  provinceData?: ProvinceData[];
  onProvinceSelect?: (province: string) => void;
  showDataVisualization?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  colorScheme?: 'green-red' | 'blue-orange' | 'purple-yellow';
}

export interface MapInteractionState {
  hoveredProvince: string | null;
  selectedProvince: string | null;
  zoomLevel: number;
  panOffset: [number, number];
  isDragging: boolean;
}