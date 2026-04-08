import { useState } from "react";
import { Upload, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SetupFormProps {
  onSubmit: () => void;
}

const FileUploadBox = ({ label, filled }: { label: string; filled?: string }) => (
  <div className="rounded-xl border border-border/30 bg-card/90 px-4 py-3.5 hover:border-border/50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center group-hover:bg-muted/60 transition-colors">
        <Upload className="w-3.5 h-3.5 text-muted-foreground/60" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground/80">{label}</p>
        {filled ? (
          <p className="text-xs text-accent/80 mt-0.5">{filled}</p>
        ) : (
          <p className="text-xs text-muted-foreground/50 mt-0.5">拖拽文件或点击上传</p>
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
    <div className="relative min-h-full flex flex-col items-center justify-start px-6 pt-[100px] pb-8 md:px-8 md:pt-[160px]">
      {/* Hero Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-light tracking-[0.2em] text-foreground">
          ORAN GEN
        </h1>
        <p className="mt-3 text-sm font-light tracking-[0.1em] text-muted-foreground">
          上传洞察报告与策划方案，构建一次品牌营销群体智能预测任务
        </p>
      </div>

      {/* Input Card */}
      <div className="mx-auto max-w-2xl w-full rounded-2xl border border-border/40 bg-card/90 backdrop-blur-sm shadow-sm p-6 space-y-5">
        <FileUploadBox label="洞察报告" filled="海飞丝_品牌洞察报告_2024Q4.pdf" />
        <FileUploadBox label="策划方案" filled="海飞丝_春季营销策划方案.pdf" />
        <FileUploadBox label="补充材料（可选）" />

        <div>
          <label className="text-xs font-light text-muted-foreground/60 mb-2 block tracking-wide">模拟周期</label>
          <div className="flex gap-2">
            {cycles.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCycle(c)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors border ${
                  selectedCycle === c
                    ? 'border-accent/40 bg-accent/8 text-accent/80'
                    : 'border-border/30 bg-card/60 text-muted-foreground hover:bg-muted/20'
                }`}
              >
                {c} 天
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-light text-muted-foreground/60 mb-2 block tracking-wide">目标平台</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-sm transition-colors border ${
                  selectedPlatforms.includes(p)
                    ? 'border-accent/40 bg-accent/8 text-foreground/80'
                    : 'border-border/30 bg-card/60 text-muted-foreground hover:text-foreground/70'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-light text-muted-foreground/60 mb-2 block tracking-wide">主方向</label>
          <div className="rounded-xl border border-border/30 bg-muted/20 px-3 py-2.5 text-sm text-foreground/80">
            长期安全有效
          </div>
        </div>

        <div>
          <label className="text-xs font-light text-muted-foreground/60 mb-2 block tracking-wide">对比方向</label>
          <div className="space-y-2">
            {comparisonDirs.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 rounded-xl border border-border/30 bg-muted/20 px-3 py-2.5 text-sm text-foreground/80">{d}</div>
                <button onClick={() => setComparisonDirs(prev => prev.filter((_, j) => j !== i))} className="p-1.5 hover:bg-muted/20 rounded-lg transition-colors">
                  <X className="w-3.5 h-3.5 text-muted-foreground/50" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setComparisonDirs(prev => [...prev, ''])}
              className="flex items-center gap-1.5 text-xs text-accent/80 hover:text-accent/60 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> 添加对比方向
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/70">启用竞品扰动</span>
            <Switch checked={competitorNoise} onCheckedChange={setCompetitorNoise} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/70">启用风险反馈</span>
            <Switch checked={riskFeedback} onCheckedChange={setRiskFeedback} />
          </div>
        </div>

        <div className="rounded-xl border border-accent/25 bg-accent/8 px-4 py-3 flex items-center gap-2">
          <span className="font-pixel text-[10px] text-accent/80">EST</span>
          <span className="text-xs text-foreground/70">预计消耗：约 2,400 积分（含 12,000 Agent × 60 天模拟）</span>
        </div>

        <button
          onClick={onSubmit}
          className="w-full h-11 text-sm font-medium rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          开始模拟
        </button>
      </div>
    </div>
  );
};

export default SetupForm;
