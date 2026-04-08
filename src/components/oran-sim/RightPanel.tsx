import SetupSummary from "./artifacts/SetupSummary";
import ParsedInputs from "./artifacts/ParsedInputs";
import SimScope from "./artifacts/SimScope";
import KnowledgeGraph from "./artifacts/KnowledgeGraph";
import EnvironmentModel from "./artifacts/EnvironmentModel";
import AgentClusters from "./artifacts/AgentClusters";
import ActivationStrategy from "./artifacts/ActivationStrategy";
import SimMonitor from "./artifacts/SimMonitor";
import FinalReport from "./artifacts/FinalReport";
import Checklist from "./artifacts/Checklist";

const RightPanel = ({ step, completedSteps }: { step: number; completedSteps?: number[] }) => {
  switch (step) {
    case 0: return <Checklist completedSteps={completedSteps || []} />;
    case 1: return <SetupSummary />;
    case 2: return <ParsedInputs />;
    case 3: return <SimScope />;
    case 4: return <KnowledgeGraph />;
    case 5: return <EnvironmentModel />;
    case 6: return <AgentClusters />;
    case 7: return <ActivationStrategy />;
    case 8: return <SimMonitor />;
    case 9: return <FinalReport />;
    default: return <SetupSummary />;
  }
};

export default RightPanel;
