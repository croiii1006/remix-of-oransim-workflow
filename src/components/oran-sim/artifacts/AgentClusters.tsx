import { Users } from "lucide-react";

const clusters = [
  { name: '高意向核心人群', weight: 15, intent: '高', activity: '高', interaction: 0.35, share: 0.18, comment: 0.22, ignore: 0.25, platform: '抖音 60% / 小红书 40%', influence: 8.2 },
  { name: '泛兴趣扩圈人群', weight: 30, intent: '中', activity: '中高', interaction: 0.20, share: 0.12, comment: 0.15, ignore: 0.53, platform: '抖音 70% / 小红书 30%', influence: 5.5 },
  { name: '价格敏感观望人群', weight: 25, intent: '低', activity: '中', interaction: 0.10, share: 0.05, comment: 0.08, ignore: 0.77, platform: '抖音 50% / 小红书 50%', influence: 3.1 },
  { name: '情绪传播型用户', weight: 15, intent: '中', activity: '极高', interaction: 0.28, share: 0.32, comment: 0.25, ignore: 0.15, platform: '抖音 80% / 小红书 20%', influence: 9.0 },
  { name: '成分/专业判断型用户', weight: 15, intent: '高', activity: '低', interaction: 0.15, share: 0.08, comment: 0.35, ignore: 0.42, platform: '小红书 75% / 抖音 25%', influence: 7.8 },
];

const intentColor: Record<string, string> = { '高': 'bg-accent', '中': 'bg-accent/50', '低': 'bg-muted-foreground/40' };
const activityColor: Record<string, string> = { '极高': 'bg-accent', '高': 'bg-accent/70', '中高': 'bg-accent/50', '中': 'bg-muted-foreground/40', '低': 'bg-muted-foreground/25' };

const MiniBar = ({ value, max = 1, color = 'bg-accent' }: { value: number; max?: number; color?: string }) => (
  <div className="w-full h-2 rounded-full bg-border/30">
    <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
  </div>
);

const PlatformBar = ({ platform }: { platform: string }) => {
  const parts = platform.split(' / ');
  const values = parts.map(p => {
    const match = p.match(/(\d+)%/);
    return { name: p.replace(/\s*\d+%/, '').trim(), pct: match ? parseInt(match[1]) : 50 };
  });
  return (
    <div className="mt-1.5 space-y-1">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground/50 w-10 shrink-0">{v.name}</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted/30">
            <div className={`h-full rounded-full ${i === 0 ? 'bg-accent/50' : 'bg-foreground/20'}`} style={{ width: `${v.pct}%` }} />
          </div>
          <span className="text-[10px] text-muted-foreground/50 w-7 text-right">{v.pct}%</span>
        </div>
      ))}
    </div>
  );
};

const LevelDot = ({ level, colorMap }: { level: string; colorMap: Record<string, string> }) => (
  <div className="flex items-center gap-1.5 mt-1">
    <div className={`w-2 h-2 rounded-full ${colorMap[level] || 'bg-muted-foreground/20'}`} />
    <span className="text-foreground/70">{level}</span>
  </div>
);

const AgentClusters = () => (
  <div className="space-y-4">
    {/* Summary stats */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: '总 Agent 数', value: '12,000' },
        { label: '模拟轮次', value: '60' },
        { label: '种子用户', value: '800' },
      ].map((s, i) => (
        <div key={i} className="rounded-xl border border-border/20 p-4 text-center bg-card/90">
          <p className="text-lg font-light text-accent/80">{s.value}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Weight distribution overview */}
    <div className="rounded-xl border border-border/20 p-4 bg-card/90">
      <p className="text-xs text-muted-foreground/60 mb-3">人群权重分布</p>
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {clusters.map((c, i) => (
          <div
            key={i}
            className="h-full rounded-full first:rounded-l-full last:rounded-r-full transition-all"
            style={{
              width: `${c.weight}%`,
              backgroundColor: `hsl(28, 85%, ${48 + i * 8}%)`,
            }}
            title={`${c.name} ${c.weight}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5">
        {clusters.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(28, 85%, ${48 + i * 8}%)` }} />
            {c.name} {c.weight}%
          </div>
        ))}
      </div>
    </div>

    {/* Cluster cards */}
    {clusters.map((c, i) => (
      <div key={i} className="rounded-xl border border-border/20 p-4 bg-card/90">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-normal text-foreground/80 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-accent/80" />
            {c.name}
          </h4>
          <span className="text-xs text-accent/80 font-mono">{c.weight}%</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
          {/* Intent & Activity with dots */}
          <div>
            <span className="text-muted-foreground/60">意向层级</span>
            <LevelDot level={c.intent} colorMap={intentColor} />
          </div>
          <div>
            <span className="text-muted-foreground/60">活跃度</span>
            <LevelDot level={c.activity} colorMap={activityColor} />
          </div>

          {/* Probability bars */}
          <div>
            <span className="text-muted-foreground/60">互动阈值</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground/70 w-7">{c.interaction}</span>
              <div className="flex-1"><MiniBar value={c.interaction} color="bg-accent/50" /></div>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground/60">分享概率</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground/70 w-7">{c.share}</span>
              <div className="flex-1"><MiniBar value={c.share} max={0.4} color="bg-accent/40" /></div>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground/60">评论概率</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground/70 w-7">{c.comment}</span>
              <div className="flex-1"><MiniBar value={c.comment} max={0.4} color="bg-accent/40" /></div>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground/60">忽略概率</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground/70 w-7">{c.ignore}</span>
              <div className="flex-1"><MiniBar value={c.ignore} color="bg-muted-foreground/30" /></div>
            </div>
          </div>

          {/* Influence score */}
          <div>
            <span className="text-muted-foreground/60">影响力分</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-foreground/70 font-medium">{c.influence}</span>
              <div className="flex-1"><MiniBar value={c.influence} max={10} color="bg-accent/60" /></div>
            </div>
          </div>

          {/* Platform affinity */}
          <div>
            <span className="text-muted-foreground/60">平台亲和</span>
            <PlatformBar platform={c.platform} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AgentClusters;
