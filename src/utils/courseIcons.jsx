import {
  FiCpu,
  FiLayers,
  FiBarChart2,
  FiTerminal,
  FiCode,
  FiCloud,
  FiSettings,
  FiShield,
  FiCoffee,
  FiTarget,
  FiSliders,
  FiPieChart,
} from 'react-icons/fi';

const iconMap = {
  'artificial-intelligence': { icon: FiCpu, color: 'blue' },
  'machine-learning': { icon: FiLayers, color: 'indigo' },
  'data-science': { icon: FiBarChart2, color: 'emerald' },
  'python': { icon: FiTerminal, color: 'amber' },
  'full-stack': { icon: FiCode, color: 'blue' },
  'aws': { icon: FiCloud, color: 'orange' },
  'devops': { icon: FiSettings, color: 'purple' },
  'cyber-security': { icon: FiShield, color: 'red' },
  'java': { icon: FiCoffee, color: 'amber' },
  'digital-marketing': { icon: FiTarget, color: 'teal' },
  'embedded-systems': { icon: FiSliders, color: 'emerald' },
  'r-programming': { icon: FiPieChart, color: 'blue' },
};

const colorClasses = {
  blue:    { bg: 'bg-blue-50 border-blue-100',    text: 'text-blue-600' },
  indigo:  { bg: 'bg-indigo-50 border-indigo-100',  text: 'text-indigo-600' },
  emerald: { bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-600' },
  amber:   { bg: 'bg-amber-50 border-amber-100',   text: 'text-amber-600' },
  orange:  { bg: 'bg-orange-50 border-orange-100',  text: 'text-orange-600' },
  purple:  { bg: 'bg-purple-50 border-purple-100',  text: 'text-purple-600' },
  red:     { bg: 'bg-rose-50 border-rose-100',     text: 'text-rose-600' },
  teal:    { bg: 'bg-teal-50 border-teal-100',    text: 'text-teal-600' },
};

export function getCourseIconData(courseId) {
  const match = iconMap[courseId] || { icon: FiCode, color: 'blue' };
  const colors = colorClasses[match.color] || colorClasses.blue;
  return {
    Icon: match.icon,
    bgClass: colors.bg,
    textClass: colors.text,
  };
}
