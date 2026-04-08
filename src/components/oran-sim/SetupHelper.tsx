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
    <div className="border border-border rounded-xl p-5 bg-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">所需材料</h3>
      <div className="space-y-2.5">
        {checklist.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <CheckCircle2 className={`w-4 h-4 ${item.done ? 'text-primary' : 'text-muted-foreground/30'}`} />
            <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="border border-border rounded-xl p-5 bg-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">本次模拟会生成</h3>
      <div className="space-y-3">
        {outputs.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
            <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="border border-border rounded-xl p-5 bg-card">
      <h3 className="text-sm font-semibold text-foreground mb-3">示例输出</h3>
      <div className="bg-secondary rounded-lg p-4 text-xs text-muted-foreground leading-relaxed font-mono">
        <p className="text-primary mb-1">决策建议: GO</p>
        <p>推荐方向: 长期安全有效</p>
        <p>预测互动量: 128,000 - 156,000</p>
        <p>峰值天: Day 12</p>
        <p>置信度: 78%</p>
      </div>
    </div>
  </div>
);

export default SetupHelper;
