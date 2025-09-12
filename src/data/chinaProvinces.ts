import { ProvinceData } from '../types/map';

export const CHINA_PROVINCES = [
  {
    name: '北京',
    code: 'BJ',
    path: 'M380,120 L390,115 L395,125 L385,130 Z',
    center: [387.5, 122.5],
    bounds: [[380, 115], [395, 130]]
  },
  {
    name: '上海',
    code: 'SH',
    path: 'M420,200 L430,195 L435,205 L425,210 Z',
    center: [427.5, 202.5],
    bounds: [[420, 195], [435, 210]]
  },
  {
    name: '广东',
    code: 'GD',
    path: 'M350,280 L380,270 L390,290 L360,300 Z',
    center: [370, 285],
    bounds: [[350, 270], [390, 300]]
  },
  {
    name: '江苏',
    code: 'JS',
    path: 'M410,180 L440,175 L445,195 L415,200 Z',
    center: [427.5, 187.5],
    bounds: [[410, 175], [445, 200]]
  },
  {
    name: '浙江',
    code: 'ZJ',
    path: 'M430,190 L450,185 L455,205 L435,210 Z',
    center: [442.5, 197.5],
    bounds: [[430, 185], [455, 210]]
  },
  {
    name: '山东',
    code: 'SD',
    path: 'M390,140 L420,135 L425,155 L395,160 Z',
    center: [407.5, 147.5],
    bounds: [[390, 135], [425, 160]]
  },
  {
    name: '河南',
    code: 'HN',
    path: 'M360,160 L390,155 L395,175 L365,180 Z',
    center: [377.5, 167.5],
    bounds: [[360, 155], [395, 180]]
  },
  {
    name: '湖北',
    code: 'HB',
    path: 'M350,180 L380,175 L385,195 L355,200 Z',
    center: [367.5, 187.5],
    bounds: [[350, 175], [385, 200]]
  },
  {
    name: '湖南',
    code: 'HN2',
    path: 'M340,200 L370,195 L375,215 L345,220 Z',
    center: [357.5, 207.5],
    bounds: [[340, 195], [375, 220]]
  },
  {
    name: '江西',
    code: 'JX',
    path: 'M400,200 L420,195 L425,215 L405,220 Z',
    center: [412.5, 207.5],
    bounds: [[400, 195], [425, 220]]
  },
  {
    name: '安徽',
    code: 'AH',
    path: 'M380,170 L410,165 L415,185 L385,190 Z',
    center: [397.5, 177.5],
    bounds: [[380, 165], [415, 190]]
  },
  {
    name: '福建',
    code: 'FJ',
    path: 'M430,210 L450,205 L455,225 L435,230 Z',
    center: [442.5, 217.5],
    bounds: [[430, 205], [455, 230]]
  },
  {
    name: '广西',
    code: 'GX',
    path: 'M320,240 L350,235 L355,255 L325,260 Z',
    center: [337.5, 247.5],
    bounds: [[320, 235], [355, 260]]
  },
  {
    name: '海南',
    code: 'HI',
    path: 'M330,290 L345,285 L350,305 L335,310 Z',
    center: [340, 297.5],
    bounds: [[330, 285], [350, 310]]
  },
  {
    name: '四川',
    code: 'SC',
    path: 'M300,180 L340,175 L345,205 L305,210 Z',
    center: [322.5, 192.5],
    bounds: [[300, 175], [345, 210]]
  },
  {
    name: '重庆',
    code: 'CQ',
    path: 'M320,190 L340,185 L345,205 L325,210 Z',
    center: [332.5, 197.5],
    bounds: [[320, 185], [345, 210]]
  },
  {
    name: '贵州',
    code: 'GZ',
    path: 'M310,210 L340,205 L345,225 L315,230 Z',
    center: [327.5, 217.5],
    bounds: [[310, 205], [345, 230]]
  },
  {
    name: '云南',
    code: 'YN',
    path: 'M280,220 L320,215 L325,245 L285,250 Z',
    center: [302.5, 232.5],
    bounds: [[280, 215], [325, 250]]
  },
  {
    name: '西藏',
    code: 'XZ',
    path: 'M220,200 L280,195 L285,235 L225,240 Z',
    center: [252.5, 217.5],
    bounds: [[220, 195], [285, 240]]
  },
  {
    name: '青海',
    code: 'QH',
    path: 'M260,160 L300,155 L305,185 L265,190 Z',
    center: [282.5, 172.5],
    bounds: [[260, 155], [305, 190]]
  },
  {
    name: '甘肃',
    code: 'GS',
    path: 'M280,140 L330,135 L335,175 L285,180 Z',
    center: [307.5, 157.5],
    bounds: [[280, 135], [335, 180]]
  },
  {
    name: '宁夏',
    code: 'NX',
    path: 'M320,140 L340,135 L345,155 L325,160 Z',
    center: [332.5, 147.5],
    bounds: [[320, 135], [345, 160]]
  },
  {
    name: '陕西',
    code: 'SX',
    path: 'M340,160 L370,155 L375,185 L345,190 Z',
    center: [357.5, 172.5],
    bounds: [[340, 155], [375, 190]]
  },
  {
    name: '新疆',
    code: 'XJ',
    path: 'M200,100 L280,95 L285,165 L205,170 Z',
    center: [242.5, 132.5],
    bounds: [[200, 95], [285, 170]]
  },
  {
    name: '内蒙古',
    code: 'NM',
    path: 'M320,100 L420,95 L425,145 L325,150 Z',
    center: [372.5, 122.5],
    bounds: [[320, 95], [425, 150]]
  },
  {
    name: '黑龙江',
    code: 'HL',
    path: 'M420,80 L460,75 L465,125 L425,130 Z',
    center: [442.5, 102.5],
    bounds: [[420, 75], [465, 130]]
  },
  {
    name: '吉林',
    code: 'JL',
    path: 'M410,110 L450,105 L455,135 L415,140 Z',
    center: [432.5, 122.5],
    bounds: [[410, 105], [455, 140]]
  },
  {
    name: '辽宁',
    code: 'LN',
    path: 'M400,130 L430,125 L435,155 L405,160 Z',
    center: [417.5, 142.5],
    bounds: [[400, 125], [435, 160]]
  },
  {
    name: '河北',
    code: 'HB2',
    path: 'M370,130 L400,125 L405,155 L375,160 Z',
    center: [387.5, 142.5],
    bounds: [[370, 125], [405, 160]]
  },
  {
    name: '山西',
    code: 'SX2',
    path: 'M350,140 L380,135 L385,165 L355,170 Z',
    center: [367.5, 152.5],
    bounds: [[350, 135], [385, 170]]
  },
  {
    name: '天津',
    code: 'TJ',
    path: 'M390,125 L405,120 L410,140 L395,145 Z',
    center: [400, 132.5],
    bounds: [[390, 120], [410, 145]]
  }
];

// 色彩映射算法
export const COLOR_SCHEMES = {
  'green-red': {
    min: '#22c55e', // 绿色 - 最少通关人数
    max: '#dc2626', // 红色 - 最多通关人数
    interpolate: (value: number, min: number, max: number) => {
      const ratio = (value - min) / (max - min);
      const r = Math.round(34 + (220 - 34) * ratio);
      const g = Math.round(197 + (38 - 197) * ratio);
      const b = Math.round(94 + (38 - 94) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    }
  },
  'blue-orange': {
    min: '#3b82f6', // 蓝色
    max: '#f97316', // 橙色
    interpolate: (value: number, min: number, max: number) => {
      const ratio = (value - min) / (max - min);
      const r = Math.round(59 + (249 - 59) * ratio);
      const g = Math.round(130 + (115 - 130) * ratio);
      const b = Math.round(246 + (22 - 246) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    }
  },
  'purple-yellow': {
    min: '#a855f7', // 紫色
    max: '#eab308', // 黄色
    interpolate: (value: number, min: number, max: number) => {
      const ratio = (value - min) / (max - min);
      const r = Math.round(168 + (234 - 168) * ratio);
      const g = Math.round(85 + (179 - 85) * ratio);
      const b = Math.round(247 + (8 - 247) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
};

// 计算省份颜色
export const calculateProvinceColor = (
  value: number,
  minValue: number,
  maxValue: number,
  colorScheme: keyof typeof COLOR_SCHEMES = 'green-red'
): string => {
  if (minValue === maxValue) return COLOR_SCHEMES[colorScheme].min;
  return COLOR_SCHEMES[colorScheme].interpolate(value, minValue, maxValue);
};