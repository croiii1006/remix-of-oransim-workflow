import { CheckCircle2, FileText, BarChart3, Users, Network } from "lucide-react";

const checklist = [
  { label: '品牌洞察报告（PDF/DOCX）', done: true },
  { label: '营销策划方案（PDF/DOCX）', done: true },
  { label: '选择模拟周期', done: true },
  { label: '选择目标平台', done: true },
  { label: '填写主方向 & 对比方向', done: true },
  { label: '补充材料（可选）', done: false },
];

const outputs = [
  { icon: FileText, label: '结构化输入解析', desc: '品牌资产、用户画像、营销策划' },
  { icon: Network, label: '语义图谱', desc: '品牌-卖点-人群-平台关系网络' },
  { icon: Users, label: 'Agent 群体模型', desc: '5+ 细分人群行为参数' },
  { icon: BarChart3, label: '模拟预测报告', desc: 'GO/HOLD/STOP 决策建议' },
];

const SetupHelper = () => (
  <div className="space-y-6">
    <div className="rounded-xl border border-border/20 p-5 bg-card/90">
      <h3 className="text-sm font-normal text-foreground/80 mb-4">所需材料</h3>
      <div className="space-y-2.5">
        {checklist.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <CheckCircle2 className={`w-3.5 h-3.5 ${item.done ? 'text-accent/80' : 'text-muted-foreground/30'}`} />
            <span className={`text-sm ${item.done ? 'text-foreground/70' : 'text-muted-foreground/50'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-border/20 p-5 bg-card/90">
      <h3 className="text-sm font-normal text-foreground/80 mb-4">本次模拟会生成</h3>
      <div className="space-y-3">
        {outputs.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20">
            <div className="w-7 h-7 rounded-lg bg-card border border-border/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <item.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-sm text-foreground/80">{item.label}</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-border/20 p-5 bg-card/90">
      <h3 className="text-sm font-normal text-foreground/80 mb-3">示例输出</h3>
      <div className="rounded-xl bg-muted/20 p-4 text-xs leading-relaxed font-mono space-y-0.5">
        <p className="text-accent/80 mb-1">决策建议: GO</p>
        <p className="text-foreground/70">推荐方向: 长期安全有效</p>
        <p className="text-foreground/70">预测互动量: 128,000 - 156,000</p>
        <p className="text-foreground/70">峰值天: Day 12</p>
        <p className="text-foreground/70">置信度: 78%</p>
      </div>
    </div>
  </div>
);

export default SetupHelper;
