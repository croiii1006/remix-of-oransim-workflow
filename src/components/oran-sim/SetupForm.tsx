import { useState } from "react";
import { Upload, Plus, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SetupFormProps {
  onSubmit: () => void;
}

const FileUploadBox = ({ label, filled }: { label: string; filled?: string }) => (
  <div className="border border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
        <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {filled ? (
          <p className="text-xs text-primary mt-0.5">{filled}</p>
        ) : (
          <p className="text-xs text-muted-foreground mt-0.5">拖拽文件或点击上传</p>
        )}
      </div>
    </div>
  </div>
);

const platforms = ['抖音', '小红书', '天猫', '京东', '微信'];
const cycles = [7, 14, 30, 60];

const SetupForm = ({ onSubmit }: SetupFormProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['抖音', '小红书']);
  const [selectedCycle, setSelectedCycle] = useState(60);
  const [competitorNoise, setCompetitorNoise] = useState(true);
  const [riskFeedback, setRiskFeedback] = useState(true);
  const [comparisonDirs, setComparisonDirs] = useState(['高压场景头皮稳定在线']);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          ORAN SIM
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          上传洞察报告与策划方案，构建一次品牌营销群体智能预测任务
        </p>
      </div>

      <div className="space-y-5">
        <FileUploadBox label="洞察报告" filled="海飞丝_品牌洞察报告_2024Q4.pdf" />
        <FileUploadBox label="策划方案" filled="海飞丝_春季营销策划方案.pdf" />
        <FileUploadBox label="补充材料（可选）" />

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">模拟周期</label>
          <div className="flex gap-2">
            {cycles.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCycle(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  selectedCycle === c
                    ? 'border-primary bg-accent text-primary'
                    : 'border-border bg-card text-muted-foreground hover:bg-secondary'
                }`}
              >
                {c} 天
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">目标平台</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${
                  selectedPlatforms.includes(p)
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">主方向</label>
          <div className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
            长期安全有效
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">对比方向</label>
          <div className="space-y-2">
            {comparisonDirs.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">{d}</div>
                <button onClick={() => setComparisonDirs(prev => prev.filter((_, j) => j !== i))} className="p-1.5 hover:bg-secondary rounded-md">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setComparisonDirs(prev => [...prev, ''])}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> 添加对比方向
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">启用竞品扰动</span>
            <Switch checked={competitorNoise} onCheckedChange={setCompetitorNoise} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">启用风险反馈</span>
            <Switch checked={riskFeedback} onCheckedChange={setRiskFeedback} />
          </div>
        </div>

        <div className="bg-accent border border-primary/20 rounded-xl px-4 py-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs text-accent-foreground">预计消耗：约 2,400 积分（含 12,000 Agent × 60 天模拟）</span>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full h-11 text-sm font-semibold rounded-xl"
        >
          开始模拟
        </Button>
      </div>
    </div>
  );
};

export default SetupForm;
