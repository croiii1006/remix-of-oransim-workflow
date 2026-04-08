import { useState, useCallback, useRef, useEffect } from "react";
import { StreamMessage, WORKFLOW_STEPS, WorkflowStep, generateWorkflowMessages, generateTimestamp } from "./types";
import SetupForm from "./SetupForm";
import SetupHelper from "./SetupHelper";
import WorkflowStream from "./WorkflowStream";
import RightPanel from "./RightPanel";
import { ArrowLeft, X } from "lucide-react";

const OranSimPage = () => {
  const [mode, setMode] = useState<'setup' | 'workflow'>('setup');
  const [steps, setSteps] = useState<WorkflowStep[]>(WORKFLOW_STEPS.map(s => ({ ...s })));
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(1);
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = useCallback(() => {
    setMode('workflow');
    setMessages([]);
    setCurrentStep(0);
    setSelectedStep(1);
    setIsComplete(false);
    setSteps(WORKFLOW_STEPS.map(s => ({ ...s })));

    const msgTemplates = generateWorkflowMessages();
    let idx = 0;

    const pushNext = () => {
      if (idx >= msgTemplates.length) {
        setIsComplete(true);
        return;
      }
      const tpl = msgTemplates[idx];
      const msg: StreamMessage = { ...tpl, id: String(idx), timestamp: generateTimestamp() };
      setMessages(prev => [...prev, msg]);

      if (tpl.stepId) {
        setCurrentStep(tpl.stepId);
        setSelectedStep(tpl.stepId);
        setSteps(prev =>
          prev.map(s => ({
            ...s,
            status: s.id < tpl.stepId! ? 'done' : s.id === tpl.stepId
              ? (tpl.type === 'system' && idx + 1 < msgTemplates.length && msgTemplates[idx + 1]?.stepId !== tpl.stepId ? 'done' : 'running')
              : 'pending',
          }))
        );
      }

      idx++;
      const delay = tpl.type === 'confirmation' ? 1200 : tpl.type === 'status' ? 600 : 400;
      timerRef.current = setTimeout(pushNext, delay);
    };

    timerRef.current = setTimeout(pushNext, 500);
  }, []);

  useEffect(() => {
    if (isComplete) {
      setSteps(prev => prev.map(s => ({ ...s, status: 'done' })));
    }
  }, [isComplete]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleBack = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMode('setup');
    setMessages([]);
    setCurrentStep(0);
    setIsComplete(false);
    setSteps(WORKFLOW_STEPS.map(s => ({ ...s })));
  };

  const currentStepData = steps.find(s => s.id === selectedStep);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 min-h-0 border-r border-border/20 flex flex-col h-full">
        {mode === 'setup' ? (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <SetupForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/20 flex-shrink-0">
              <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="text-xs">返回</span>
              </button>
            </div>
            <WorkflowStream
              steps={steps}
              messages={messages}
              currentStep={currentStep}
              selectedStep={selectedStep}
              isComplete={isComplete}
              onSelectStep={setSelectedStep}
            />
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-1/2 min-h-0 overflow-hidden flex flex-col h-full">
        {mode === 'setup' ? (
          <>
            <div className="px-5 py-3 border-b border-border/20">
              <span className="text-xs font-light tracking-[0.1em] text-muted-foreground/60">模拟引导</span>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
              <SetupHelper />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/20 flex-shrink-0">
              <span className="text-sm font-normal text-foreground/80">
                {selectedStep === 0 ? '编写待办清单' : currentStepData?.title || ''}
              </span>
              <button className="p-1 hover:bg-muted/20 rounded-lg transition-colors">
                <X className="w-3.5 h-3.5 text-muted-foreground/50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
              <RightPanel step={selectedStep} completedSteps={steps.filter(s => s.status === 'done').map(s => s.id)} />
            </div>

            {/* Bottom Step Tabs */}
            <div className="flex border-t border-border/20 flex-shrink-0">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`flex-1 py-2.5 text-center border-r border-border/20 last:border-r-0 transition-colors ${
                    step.id === selectedStep
                      ? 'bg-card'
                      : 'bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <p className={`font-mono text-sm ${step.id === selectedStep ? 'text-foreground/80' : 'text-muted-foreground/60'}`}>
                    {String(step.id).padStart(2, '0')}
                  </p>
                  {step.status === 'done' && (
                    <p className="font-pixel text-[8px] text-accent/80 tracking-widest mt-0.5">DONE</p>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OranSimPage;
