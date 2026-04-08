import { useEffect, useRef } from "react";
import { WorkflowStep, StreamMessage } from "./types";
import {
  CheckSquare, ListChecks, ChevronRight, Loader2, 
  Settings2, Cpu, Target, Network, Box, Users, Zap, Play, BarChart3
} from "lucide-react";

const stepIcons: Record<number, React.ElementType> = {
  1: Settings2, 2: Cpu, 3: Target, 4: Network,
  5: Box, 6: Users, 7: Zap, 8: Play, 9: BarChart3,
};

interface Props {
  steps: WorkflowStep[];
  messages: StreamMessage[];
  currentStep: number;
  selectedStep: number;
  isComplete: boolean;
  onSelectStep: (step: number) => void;
}

const StepCard = ({
  step, isSelected, onClick,
}: { step: WorkflowStep; isSelected: boolean; onClick: () => void }) => {
  const Icon = stepIcons[step.id] || Settings2;
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-3 transition-all cursor-pointer ${
        isSelected ? 'bg-sidebar border-border/20' : 'bg-sidebar border-border/20 hover:bg-muted/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-muted-foreground/60" />
          </div>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-sm font-semibold text-foreground">{step.title}</span>
          </div>
          <p className="text-xs leading-relaxed mt-1 text-muted-foreground/60">
            <span className="mr-1">└</span>
            {step.status === 'done'
              ? `已完成${step.id === 2 ? '，已提取三层结构化输入' : step.id === 4 ? '，已生成 24 节点' : step.id === 6 ? '，已生成 5 个群体' : ''}`
              : step.status === 'running' ? '处理中...' : step.description}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          <span className="font-pixel text-lg font-medium text-[#3d3d3d]">{String(step.id).padStart(2, '0')}</span>
          {step.status === 'done' && (
            <span className="font-pixel text-[12px] tracking-widest text-emerald-500">DONE</span>
          )}
          {step.status === 'running' && (
            <span className="font-pixel text-[13px] tracking-wider inline-flex gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-block w-[6px] h-[6px] bg-emerald-500"
                  style={{
                    animation: 'pixel-blink 1.2s step-end infinite',
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

const CheckmarkMessage = ({ content }: { content: string }) => (
  <div className="flex items-start gap-2.5 py-1 animate-fade-in-up">
    <CheckSquare className="w-3.5 h-3.5 text-accent/80 mt-0.5 flex-shrink-0" />
    <span className="text-sm text-foreground/70 leading-relaxed">{content}</span>
  </div>
);

const BulletMessage = ({ content }: { content: string }) => (
  <div className="flex items-start gap-2.5 py-1 animate-fade-in-up">
    <span className="text-muted-foreground/40 mt-0.5 flex-shrink-0 text-xs">•</span>
    <span className="text-sm text-foreground/70">{content}</span>
  </div>
);

const ActionRow = ({ icon: Icon, label, sublabel, onClick }: {
  icon: React.ElementType; label: string; sublabel?: string; onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 py-3 hover:bg-muted/20 rounded-xl px-3 transition-colors animate-fade-in-up"
  >
    <Icon className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
    <span className="text-sm text-foreground/80">{label}</span>
    {sublabel && <span className="text-xs text-muted-foreground/60">{sublabel}</span>}
    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 ml-auto flex-shrink-0" />
  </button>
);

const SetupSummaryBlock = () => (
  <div className="rounded-xl border border-border/20 bg-muted/20 px-4 py-3 flex items-center gap-4 flex-wrap text-sm animate-fade-in-up">
    <div className="flex items-center gap-2">
      <Settings2 className="w-3.5 h-3.5 text-muted-foreground/50" />
      <span className="text-xs text-foreground/70">海飞丝 · 春季营销模拟预测</span>
    </div>
    <span className="inline-flex h-5 items-center rounded-full bg-foreground/5 border border-border/30 px-2 text-[10px] text-foreground/70">
      60天
    </span>
    <span className="inline-flex h-5 items-center rounded-full bg-foreground/5 border border-border/30 px-2 text-[10px] text-foreground/70">
      抖音 · 小红书
    </span>
    <span className="inline-flex h-5 items-center rounded-full bg-accent/8 border border-accent/25 px-2 text-[10px] text-accent/80">
      2 个方向
    </span>
  </div>
);

const WorkflowStream = ({ steps, messages, currentStep, selectedStep, isComplete, onSelectStep }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const hasSetupSummary = messages.some(m => m.type === 'setup-summary');
  const hasChecklist = messages.some(m => m.type === 'checklist');

  const streamMessages = messages.filter(m =>
    !['setup-summary', 'checklist', 'workflow-group'].includes(m.type)
  );

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6 pb-[60px]">
      <div className="max-w-3xl mx-auto space-y-3">
        {hasSetupSummary && <SetupSummaryBlock />}

        {hasChecklist && (
          <ActionRow icon={ListChecks} label="编写待办清单" sublabel={`${steps.filter(s => s.status === 'done').length}/${steps.length}`} onClick={() => onSelectStep(0)} />
        )}

        {/* Connector line */}
        {hasChecklist && streamMessages.length > 0 && (
          <div className="flex justify-center">
            <div className="w-px h-5 border-l border-dashed border-border/40" />
          </div>
        )}

        {streamMessages.map((msg, i) => {
          const elements: React.ReactNode[] = [];

          if (msg.stepId && msg.type === 'status') {
            const step = steps.find(s => s.id === msg.stepId);
            const isFirstForStep = !streamMessages.slice(0, i).some(
              m => m.stepId === msg.stepId && m.type === 'status'
            );
            if (step && isFirstForStep) {
              // Add connector line between steps
              if (i > 0) {
                elements.push(
                  <div key={`line-${step.id}`} className="flex justify-center">
                    <div className="w-px h-5 border-l border-dashed border-border/40" />
                  </div>
                );
              }
              elements.push(
                <StepCard
                  key={`step-${step.id}`}
                  step={step}
                  isSelected={step.id === selectedStep}
                  onClick={() => onSelectStep(step.id)}
                />
              );
            }
          }

          const stepDone = msg.stepId ? steps.find(s => s.id === msg.stepId)?.status === 'done' : false;

          if (msg.type === 'confirmation' || msg.type === 'complete') {
            elements.push(<CheckmarkMessage key={msg.id} content={msg.content} />);
          } else if (msg.type === 'system') {
            elements.push(<BulletMessage key={msg.id} content={msg.content} />);
          } else if (msg.type === 'status') {
            elements.push(
              <div key={msg.id} className="flex items-center gap-2 px-3 py-0.5 animate-fade-in-up">
                {stepDone ? (
                  <CheckSquare className="w-3 h-3 text-accent/50 flex-shrink-0" />
                ) : (
                  <Loader2 className="w-3 h-3 text-accent/60 animate-spin flex-shrink-0" />
                )}
                <span className="text-xs text-muted-foreground/60">{msg.content}</span>
              </div>
            );
          } else if (msg.type === 'warning') {
            elements.push(<BulletMessage key={msg.id} content={msg.content} />);
          }

          return elements;
        })}
      </div>
    </div>
  );
};

export default WorkflowStream;
