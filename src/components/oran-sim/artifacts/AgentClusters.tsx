import { Users } from "lucide-react";

const clusters = [
  { name: '高意向核心人群', weight: '15%', intent: '高', activity: '高', interaction: '0.35', share: '0.18', comment: '0.22', ignore: '0.25', platform: '抖音 60% / 小红书 40%', influence: '8.2' },
  { name: '泛兴趣扩圈人群', weight: '30%', intent: '中', activity: '中高', interaction: '0.20', share: '0.12', comment: '0.15', ignore: '0.53', platform: '抖音 70% / 小红书 30%', influence: '5.5' },
  { name: '价格敏感观望人群', weight: '25%', intent: '低', activity: '中', interaction: '0.10', share: '0.05', comment: '0.08', ignore: '0.77', platform: '抖音 50% / 小红书 50%', influence: '3.1' },
  { name: '情绪传播型用户', weight: '15%', intent: '中', activity: '极高', interaction: '0.28', share: '0.32', comment: '0.25', ignore: '0.15', platform: '抖音 80% / 小红书 20%', influence: '9.0' },
  { name: '成分/专业判断型用户', weight: '15%', intent: '高', activity: '低', interaction: '0.15', share: '0.08', comment: '0.35', ignore: '0.42', platform: '小红书 75% / 抖音 25%', influence: '7.8' },
];

const AgentClusters = () => (
  <div className="space-y-4">
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

    {clusters.map((c, i) => (
      <div key={i} className="rounded-xl border border-border/20 p-4 bg-card/90">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-normal text-foreground/80 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-accent/80" />
            {c.name}
          </h4>
          <span className="text-xs text-accent/80 font-mono">{c.weight}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['意向层级', c.intent], ['活跃度', c.activity],
            ['互动阈值', c.interaction], ['分享概率', c.share],
            ['评论概率', c.comment], ['忽略概率', c.ignore],
            ['影响力分', c.influence], ['平台亲和', c.platform],
          ].map(([label, value], j) => (
            <div key={j} className="rounded-xl bg-muted/20 px-2.5 py-1.5">
              <span className="text-muted-foreground/60">{label}</span>
              <p className="text-foreground/70 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default AgentClusters;
