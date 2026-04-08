import { FileText, CheckCircle2 } from "lucide-react";

const fields = [
  { label: '项目名称', value: '海飞丝 · 春季营销模拟预测' },
  { label: '品牌名称', value: '海飞丝 (Head & Shoulders)' },
  { label: '模拟周期', value: '60 天' },
  { label: '目标平台', value: '抖音、小红书' },
  { label: '主方向', value: '长期安全有效' },
  { label: '对比方向', value: '高压场景头皮稳定在线' },
  { label: '竞品扰动', value: '已启用' },
  { label: '风险反馈', value: '已启用' },
];

const files = [
  '海飞丝_品牌洞察报告_2024Q4.pdf',
  '海飞丝_春季营销策划方案.pdf',
];

const SetupSummary = () => (
  <div className="space-y-4">
    <div className="border border-border rounded-xl p-5 bg-card">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary" /> Setup 摘要
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((f, i) => (
          <div key={i} className="bg-secondary rounded-lg px-3 py-2.5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{f.label}</p>
            <p className="text-sm text-foreground mt-1">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="border border-border rounded-xl p-5 bg-card">
      <h3 className="text-sm font-semibold text-foreground mb-3">上传文件</h3>
      <div className="space-y-2">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">{f}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SetupSummary;
