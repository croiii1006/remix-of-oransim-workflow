import { useState } from "react";

const nodeTypes: Record<string, string> = {
  brand: 'hsl(152, 60%, 48%)',
  direction: 'hsl(200, 60%, 50%)',
  audience: 'hsl(280, 50%, 55%)',
  platform: 'hsl(25, 80%, 55%)',
  competitor: 'hsl(0, 60%, 55%)',
  risk: 'hsl(45, 80%, 50%)',
  behavior: 'hsl(160, 50%, 45%)',
  problem: 'hsl(320, 50%, 55%)',
};

const legend = [
  { type: '品牌', color: nodeTypes.brand },
  { type: '卖点方向', color: nodeTypes.direction },
  { type: '人群', color: nodeTypes.audience },
  { type: '平台', color: nodeTypes.platform },
  { type: '竞品', color: nodeTypes.competitor },
  { type: '风险点', color: nodeTypes.risk },
  { type: '行为目标', color: nodeTypes.behavior },
  { type: '用户问题', color: nodeTypes.problem },
];

const nodes = [
  { id: 1, label: '海飞丝', type: 'brand', x: 340, y: 160 },
  { id: 2, label: '长期安全有效', type: 'direction', x: 180, y: 80 },
  { id: 3, label: '高压场景稳定', type: 'direction', x: 500, y: 80 },
  { id: 4, label: '头屑反复', type: 'problem', x: 140, y: 200 },
  { id: 5, label: '成分安全', type: 'problem', x: 540, y: 200 },
  { id: 6, label: '年轻白领', type: 'audience', x: 220, y: 300 },
  { id: 7, label: '大学生', type: 'audience', x: 460, y: 300 },
  { id: 8, label: '抖音', type: 'platform', x: 120, y: 350 },
  { id: 9, label: '小红书', type: 'platform', x: 560, y: 350 },
  { id: 10, label: '清扬', type: 'competitor', x: 80, y: 130 },
  { id: 11, label: 'Spes', type: 'competitor', x: 600, y: 130 },
  { id: 12, label: '化学争议', type: 'risk', x: 340, y: 360 },
  { id: 13, label: '搜索提升', type: 'behavior', x: 340, y: 270 },
];

const edges = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 10 }, { from: 1, to: 11 },
  { from: 2, to: 4 }, { from: 3, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 },
  { from: 6, to: 8 }, { from: 7, to: 9 }, { from: 1, to: 12 }, { from: 1, to: 13 },
  { from: 4, to: 6 }, { from: 5, to: 7 }, { from: 6, to: 13 }, { from: 7, to: 13 },
];

const nodeDetails: Record<number, { type: string; role: string; relations: number; source: string }> = {
  1: { type: '品牌', role: '核心主体', relations: 6, source: '洞察报告' },
  2: { type: '卖点方向', role: '主方向', relations: 3, source: '策划方案' },
  3: { type: '卖点方向', role: '对比方向', relations: 3, source: '策划方案' },
};

const KnowledgeGraph = () => {
  const [selected, setSelected] = useState<number | null>(1);
  const selectedNode = nodes.find(n => n.id === selected);
  const detail = selected ? nodeDetails[selected] : null;

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-xl p-4 bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">知识图谱</h3>
        <div className="bg-secondary rounded-lg overflow-hidden" style={{ height: 400 }}>
          <svg width="100%" height="100%" viewBox="0 0 680 420">
            {edges.map((e, i) => {
              const from = nodes.find(n => n.id === e.from)!;
              const to = nodes.find(n => n.id === e.to)!;
              return (
                <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="hsl(0,0%,82%)" strokeWidth={1} />
              );
            })}
            {nodes.map(n => {
              const color = nodeTypes[n.type];
              const isSelected = n.id === selected;
              return (
                <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                  <circle cx={n.x} cy={n.y} r={isSelected ? 22 : 18} fill={color} opacity={isSelected ? 1 : 0.75} />
                  {isSelected && <circle cx={n.x} cy={n.y} r={26} fill="none" stroke={color} strokeWidth={2} opacity={0.3} />}
                  <text x={n.x} y={n.y + 36} textAnchor="middle" fill="hsl(0,0%,40%)" fontSize={10}>{n.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {legend.map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] text-muted-foreground">{l.type}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedNode && (
        <div className="border border-border rounded-xl p-5 bg-card">
          <h3 className="text-sm font-semibold text-foreground mb-3">节点详情 — {selectedNode.label}</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-secondary rounded-lg px-3 py-2">
              <span className="text-muted-foreground">节点类型</span>
              <p className="text-foreground mt-0.5">{detail?.type || selectedNode.type}</p>
            </div>
            <div className="bg-secondary rounded-lg px-3 py-2">
              <span className="text-muted-foreground">语义角色</span>
              <p className="text-foreground mt-0.5">{detail?.role || '关联节点'}</p>
            </div>
            <div className="bg-secondary rounded-lg px-3 py-2">
              <span className="text-muted-foreground">关联关系数</span>
              <p className="text-foreground mt-0.5">{detail?.relations || edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length}</p>
            </div>
            <div className="bg-secondary rounded-lg px-3 py-2">
              <span className="text-muted-foreground">来源文件</span>
              <p className="text-foreground mt-0.5">{detail?.source || '洞察报告'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
