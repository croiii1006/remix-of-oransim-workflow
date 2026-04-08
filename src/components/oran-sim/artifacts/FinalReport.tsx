import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";

const SummaryCard = ({ title, icon: Icon, children, accent }: { title: string; icon: React.ElementType; children: React.ReactNode; accent?: string }) => (
  <div className="border border-border rounded-xl p-5 bg-card">
    <h4 className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${accent || 'text-primary'}`} />
      {title}
    </h4>
    {children}
  </div>
);

const FinalReport = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 gap-4">
      <SummaryCard title="策划决策" icon={CheckCircle2}>
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1.5 rounded-lg bg-accent text-primary text-lg font-bold">GO</span>
          <div>
            <p className="text-sm text-foreground">推荐推进「长期安全有效」方向</p>
            <p className="text-xs text-muted-foreground mt-0.5">置信度 78% · 建议 Day 1 启动</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-secondary rounded-lg px-3 py-2">
            <span className="text-muted-foreground">推荐方向</span>
            <p className="text-primary mt-0.5">长期安全有效</p>
          </div>
          <div className="bg-secondary rounded-lg px-3 py-2">
            <span className="text-muted-foreground">保留方向</span>
            <p className="text-foreground mt-0.5">高压场景（延后 20 天）</p>
          </div>
          <div className="bg-secondary rounded-lg px-3 py-2">
            <span className="text-muted-foreground">下一步</span>
            <p className="text-foreground mt-0.5">确认 KOL 名单 → 内容生产</p>
          </div>
          <div className="bg-secondary rounded-lg px-3 py-2">
            <span className="text-muted-foreground">决策置信度</span>
            <p className="text-primary mt-0.5">78%</p>
          </div>
        </div>
      </SummaryCard>

      <SummaryCard title="方向性指标" icon={TrendingUp}>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['预测总互动量', '128,000 - 156,000'],
            ['互动提升幅度', '+35% ~ +52%'],
            ['峰值天', 'Day 12'],
            ['衰减天', 'Day 28'],
            ['置信度', '78%'],
          ].map(([label, value], i) => (
            <div key={i} className="bg-secondary rounded-lg px-3 py-2">
              <span className="text-muted-foreground">{label}</span>
              <p className="text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </SummaryCard>

      <SummaryCard title="关键解释" icon={AlertTriangle} accent="text-amber-500">
        <div className="space-y-2 text-xs">
          {[
            { q: '哪些人群会响应', a: '情绪传播型用户最先响应（Day 2-5），高意向核心紧随（Day 3-8）' },
            { q: '哪些平台先放大', a: '抖音起量快（Day 3 起），小红书长尾效应更强（Day 15+）' },
            { q: '哪个方向起量快但早衰', a: '「高压场景」Day 8 达峰，但 Day 20 后快速衰减' },
            { q: '哪个方向续航更稳', a: '「长期安全有效」峰值较晚（Day 12）但衰减缓慢，Day 45 仍有 35% 热度' },
            { q: '主要风险点', a: '化学成分争议可能在 Day 10-15 被竞品放大，需备好应对内容' },
          ].map((item, i) => (
            <div key={i} className="bg-secondary rounded-lg px-3 py-2.5">
              <p className="text-primary font-medium mb-0.5">{item.q}</p>
              <p className="text-foreground/80 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </SummaryCard>
    </div>

    <Tabs defaultValue="spread" className="w-full">
      <TabsList className="bg-secondary border border-border w-full justify-start">
        <TabsTrigger value="spread" className="text-xs">扩散路径</TabsTrigger>
        <TabsTrigger value="audience" className="text-xs">人群贡献</TabsTrigger>
        <TabsTrigger value="lifecycle" className="text-xs">生命周期</TabsTrigger>
        <TabsTrigger value="direction" className="text-xs">方向建议</TabsTrigger>
        <TabsTrigger value="risk" className="text-xs">风险提示</TabsTrigger>
      </TabsList>

      <TabsContent value="spread">
        <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
          <p className="text-foreground">种子投放（Day 1-3）→ 算法推荐放大（Day 4-7）→ 社交裂变（Day 8-14）→ 搜索回流（Day 15-30）→ 长尾复访（Day 31-60）</p>
          <p className="text-muted-foreground">抖音贡献 62% 早期曝光，小红书贡献 55% 后期搜索回流</p>
        </div>
      </TabsContent>
      <TabsContent value="audience">
        <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
          <p className="text-foreground">情绪传播型用户贡献 38% 的分享量，是扩散核心驱动力</p>
          <p className="text-foreground">高意向核心人群贡献 45% 的深度互动（评论、收藏、加购）</p>
          <p className="text-foreground">专业判断型用户虽少但评论质量高，对搜索 SEO 有间接提升</p>
        </div>
      </TabsContent>
      <TabsContent value="lifecycle">
        <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
          <p className="text-foreground">方向 A 生命周期：起量 Day 5 → 峰值 Day 12 → 拐点 Day 28 → Day 45 仍有 35% 热度</p>
          <p className="text-foreground">方向 B 生命周期：起量 Day 3 → 峰值 Day 8 → 拐点 Day 18 → Day 30 热度低于 15%</p>
          <p className="text-primary">建议：方向 A 为主力，方向 B 作为 Day 20 后的接力内容</p>
        </div>
      </TabsContent>
      <TabsContent value="direction">
        <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
          <p className="text-primary font-medium">推荐策略：先 A 后 B，交叉投放</p>
          <p className="text-foreground">Day 1-20：主推「长期安全有效」，预算占比 65%</p>
          <p className="text-foreground">Day 15-60：引入「高压场景」，预算占比 35%</p>
          <p className="text-foreground">预计组合效果比单一方向提升 22%</p>
        </div>
      </TabsContent>
      <TabsContent value="risk">
        <div className="border border-border rounded-xl p-4 bg-card text-xs space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-foreground">Day 10-15 存在竞品利用「化学成分」话题进行负面引导的风险</p>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-foreground">小红书平台对「功效宣称」审核趋严，需确保内容合规</p>
          </div>
          <p className="text-primary">建议：提前准备 3-5 条成分科普备用内容，设置风险词监控</p>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default FinalReport;
