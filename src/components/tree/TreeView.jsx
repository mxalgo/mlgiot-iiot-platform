import React, { useState } from 'react';
import {
  Building, Factory, Layers, Gauge, Settings, Cpu, Activity,
  Wrench, Zap, Droplets, Wind, ChevronRight, ChevronDown,
  Thermometer, Waves, FlaskConical
} from 'lucide-react';
import { cn, getStatusDotColor } from '../../lib/utils';

// Icon mapping by node type AND name hints
function getNodeIcon(node) {
  if (node.type === 'Organization') return Building;
  if (node.type === 'Plant') return Factory;
  if (node.type === 'Unit') return Layers;
  if (node.type === 'KPI') return Gauge;
  if (node.type === 'Device') {
    const n = node.name.toLowerCase();
    if (n.includes('vibration') || n.includes('monitor')) return Activity;
    if (n.includes('temp')) return Thermometer;
    if (n.includes('pressure') || n.includes('transm')) return Gauge;
    if (n.includes('flow')) return Waves;
    if (n.includes('power') || n.includes('meter')) return Zap;
    if (n.includes('gateway') || n.includes('plc') || n.includes('rtu')) return Cpu;
    return Cpu;
  }
  if (node.type === 'Parameter') return Activity;
  if (node.type === 'Asset') {
    const n = node.name.toLowerCase();
    if (n.includes('pump')) return Droplets;
    if (n.includes('compress')) return Wind;
    if (n.includes('furnace') || n.includes('heater')) return Thermometer;
    if (n.includes('column') || n.includes('distill') || n.includes('reactor')) return FlaskConical;
    if (n.includes('fan') || n.includes('tower')) return Wind;
    return Settings;
  }
  return Settings;
}

// Derive status from node for dots
function getNodeStatus(node) {
  if (node.status) return node.status;
  if (node.type === 'Parameter') return node.status || 'Normal';
  if (node.type === 'Device') return 'Online';
  return null;
}

const TreeNode = ({ node, level = 0, onSelect, selectedId }) => {
  const [expanded, setExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedId;
  const Icon = getNodeIcon(node);
  const status = getNodeStatus(node);
  const dotColor = status ? getStatusDotColor(status) : null;

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren) setExpanded(p => !p);
    onSelect(node);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${level * 14 + 8}px` }}
        className={cn(
          'group flex items-center space-x-2 py-1.5 pr-3 cursor-pointer rounded-lg mx-1.5 mb-0.5 transition-all duration-150',
          isSelected
            ? 'bg-blue-600 text-white shadow-sm'
            : 'hover:bg-slate-100 text-slate-700'
        )}
      >
        {/* Chevron */}
        <span className={cn('w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center', isSelected ? 'text-white/70' : 'text-slate-400')}>
          {hasChildren
            ? (expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />)
            : <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />}
        </span>

        {/* Icon */}
        <Icon className={cn('w-3.5 h-3.5 flex-shrink-0', isSelected ? 'text-white' : 'text-slate-500')} />

        {/* Name */}
        <span className={cn('text-xs flex-1 truncate leading-tight', isSelected ? 'font-semibold text-white' : 'font-medium')} title={node.name}>
          {node.name}
        </span>

        {/* Status dot */}
        {dotColor && !isSelected && (
          <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColor, status === 'Running' || status === 'Online' || status === 'Normal' ? 'animate-pulse' : '')} />
        )}

        {/* Count badge */}
        {hasChildren && !isSelected && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 flex-shrink-0 ml-1">
            {node.children.length}
          </span>
        )}
        {hasChildren && isSelected && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/20 text-white flex-shrink-0 ml-1">
            {node.children.length}
          </span>
        )}
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function TreeView({ data, onSelect, selectedId }) {
  if (!data?.length) return null;
  return (
    <div className="py-2 overflow-y-auto h-full">
      {data.map(node => (
        <TreeNode key={node.id} node={node} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  );
}
