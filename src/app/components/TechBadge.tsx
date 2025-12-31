import { LucideIcon } from 'lucide-react';

interface TechBadgeProps {
  name: string;
  Icon: LucideIcon;
  category: 'primary' | 'secondary';
}

export function TechBadge({ name, Icon, category }: TechBadgeProps) {
  const bgColor = category === 'primary' ? 'bg-indigo-100 border-indigo-300' : 'bg-gray-100 border-gray-300';
  const textColor = category === 'primary' ? 'text-indigo-700' : 'text-gray-700';
  
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${bgColor} ${textColor}`}>
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </div>
  );
}
