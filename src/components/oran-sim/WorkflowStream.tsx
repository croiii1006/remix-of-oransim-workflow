import { useEffect, useRef } from "react";
import { WorkflowStep, StreamMessage } from "./types";
import {
  CheckSquare, ListChecks, ChevronRight, Loader2, FileText,
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

/* ─── Agent-style step card (matches reference image) ─── */
const StepCard = ({
  step, isSelected, onClick,
}: { step: WorkflowStep; isSelected: boolean; onClick: () => void }) => {
  const Icon = stepIcons[step.id] || Settings2;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
        isSelected ? 'border-primary/40 bg-accent' : 'border-border bg-card hover:bg-secondary/50'
      }`}
    >
      <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{step.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {step.status === 'done'
            ? `已完成${step.id === 2 ? '，已提取三层结构化输入' : step.id === 4 ? '，已生成 24 节点' : step.id === 6 ? '，已生成 5 个群体' : ''}`
            : step.status === 'running' ? '处理中...' : step.description}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-mono text-lg leading-tight text-muted-foreground/60">{String(step.id).padStart(2, '0')}</p>
        {step.status === 'done' && (
          <p className="font-mono text-[10px] text-primary tracking-widest leading-tight">DONE</p>
        )}
        {step.status === 'running' && (
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin ml-auto" />
        )}
      </div>
    </button>
  );
};

/* ─── Message blocks matching reference patterns ─── */
const CheckmarkMessage = ({ content }: { content: string }) => (
  <div className="flex items-start gap-2.5 py-1 animate-fade-in-up">
    <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
    <span className="text-sm text-foreground leading-relaxed">{content}</span>
  </div>
);

const BulletMessage = ({ content }: { content: string }) => (
  <div className="flex items-start gap-2.5 py-1 animate-fade-in-up">
    <span className="text-muted-foreground mt-0.5 flex-shrink-0">•</span>
    <span className="text-sm text-foreground">{content}</span>
  </div>
);

const ActionRow = ({ icon: Icon, label, sublabel, onClick }: {
  icon: React.ElementType; label: string; sublabel?: string; onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 py-3 hover:bg-secondary/40 rounded-lg px-2 transition-colors animate-fade-in-up"
  >
    <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    <span className="text-sm text-foreground">{label}</span>
    {sublabel && <span className="text-sm text-muted-foreground">{sublabel}</span>}
    <ChevronRight className="w-4 h-4 text-muted-foreground/40 ml-auto flex-shrink-0" />
  </button>
);

const SectionHeader = ({ icon: Icon, label, count }: {
  icon: React.ElementType; label: string; count?: string;
}) => (
  <div className="flex items-center gap-2 py-2 animate-fade-in-up">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="text-sm font-medium text-foreground">{label}</span>
    {count && <span className="text-xs text-muted-foreground">{count}</span>}
  </div>
);

/* ─── Setup Summary Card (inline) ─── */
const SetupSummaryBlock = () => (
  <div className="border border-border rounded-xl p-4 bg-card animate-fade-in-up">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
        <Settings2 className="w-5 h-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">海飞丝 · 春季营销模拟预测</p>
        <p className="text-xs text-muted-foreground">60 天 · 抖音、小红书 · 2 个方向</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-secondary rounded-md px-3 py-2">
        <span className="text-muted-foreground">主方向</span>
        <p className="text-foreground mt-0.5">长期安全有效</p>
      </div>
      <div className="bg-secondary rounded-md px-3 py-2">
        <span className="text-muted-foreground">对比方向</span>
        <p className="text-foreground mt-0.5">高压场景头皮稳定在线</p>
      </div>
    </div>
  </div>
);

/* ─── Main WorkflowStream ─── */
const WorkflowStream = ({ steps, messages, currentStep, selectedStep, isComplete, onSelectStep }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const hasSetupSummary = messages.some(m => m.type === 'setup-summary');
  const hasChecklist = messages.some(m => m.type === 'checklist');
  const hasWorkflow = messages.some(m => m.type === 'workflow-group');

  // Steps that are done or running
  const visibleSteps = steps.filter(s => s.status !== 'pending');

  // Regular messages (excluding structural ones)
  const streamMessages = messages.filter(m =>
    !['setup-summary', 'checklist', 'workflow-group'].includes(m.type)
  );

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-3">
      {/* Setup Summary */}
      {hasSetupSummary && <SetupSummaryBlock />}

      {/* Checklist */}
      {hasChecklist && (
        <ActionRow icon={ListChecks} label="编写待办清单" sublabel={`${steps.filter(s => s.status === 'done').length}/${steps.length}`} onClick={() => onSelectStep(0)} />
      )}

      {/* Stream messages interleaved with step cards */}
      {streamMessages.map((msg, i) => {
        const elements: React.ReactNode[] = [];

        // Before this message, check if a new step started — show step card
        if (msg.stepId && msg.type === 'status') {
          const step = steps.find(s => s.id === msg.stepId);
          // Only show step card on first status message for this step
          const isFirstForStep = !streamMessages.slice(0, i).some(
            m => m.stepId === msg.stepId && m.type === 'status'
          );
          if (step && isFirstForStep && hasWorkflow) {
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

        // Render the message itself
        if (msg.type === 'confirmation') {
          elements.push(
            <CheckmarkMessage key={msg.id} content={msg.content} />
          );
        } else if (msg.type === 'complete') {
          elements.push(
            <CheckmarkMessage key={msg.id} content={msg.content} />
          );
        } else if (msg.type === 'system') {
          elements.push(
            <BulletMessage key={msg.id} content={msg.content} />
          );
        } else if (msg.type === 'status') {
          elements.push(
            <div key={msg.id} className="flex items-center gap-2 px-2 py-0.5 animate-fade-in-up">
              <Loader2 className="w-3 h-3 text-primary animate-spin flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{msg.content}</span>
            </div>
          );
        } else if (msg.type === 'warning') {
          elements.push(
            <BulletMessage key={msg.id} content={msg.content} />
          );
        }

        return elements;
      })}
    </div>
  );
};

export default WorkflowStream;
