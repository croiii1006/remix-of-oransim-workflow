export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'done';
}

export interface StreamMessage {
  id: string;
  type: 'setup-summary' | 'checklist' | 'workflow-group' | 'system' | 'status' | 'confirmation' | 'complete' | 'warning';
  content: string;
  timestamp: string;
  stepId?: number;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 1, title: '创建模拟任务', description: '根据用户输入创建 simulation setup，绑定文件、方向、周期、平台范围', status: 'pending' },
  { id: 2, title: '解析输入材料', description: '从洞察报告与策划方案中提取结构化输入', status: 'pending' },
  { id: 3, title: '确定模拟方向', description: '收敛成本次真正要模拟的问题和范围', status: 'pending' },
  { id: 4, title: '构建语义图谱', description: '提取并连接品牌、卖点、人群等节点关系', status: 'pending' },
  { id: 5, title: '搭建仿真环境', description: '构建可运行的市场环境模型', status: 'pending' },
  { id: 6, title: '生成 Agent 群体与行为参数', description: '生成受众群体并分配行为参数', status: 'pending' },
  { id: 7, title: '设定初始激活策略', description: '选择首波触达方式与扩展逻辑', status: 'pending' },
  { id: 8, title: '并行运行模拟', description: '按时间切片运行仿真，Agent 交互/扩散/衰减', status: 'pending' },
  { id: 9, title: '输出预测报告', description: '将模拟结果收敛为可决策输出', status: 'pending' },
];

export function generateTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export function generateWorkflowMessages(): Omit<StreamMessage, 'id'>[] {
  return [
    { type: 'setup-summary', content: '模拟任务配置已确认', timestamp: '', stepId: 1 },
    { type: 'checklist', content: '编写待办清单 9/9', timestamp: '' },
    { type: 'workflow-group', content: '工作流程', timestamp: '' },
    { type: 'status', content: '正在创建模拟任务…', timestamp: '', stepId: 1 },
    { type: 'system', content: '模拟任务创建完成，已绑定 2 份文件', timestamp: '', stepId: 1 },
    { type: 'status', content: '正在解析洞察报告…', timestamp: '', stepId: 2 },
    { type: 'system', content: '已提取品牌资产、市场趋势、用户画像', timestamp: '', stepId: 2 },
    { type: 'status', content: '正在解析策划方案…', timestamp: '', stepId: 2 },
    { type: 'system', content: '输入材料解析完成，三层结构已建立', timestamp: '', stepId: 2 },
    { type: 'status', content: '正在确定模拟方向与范围…', timestamp: '', stepId: 3 },
    { type: 'system', content: '模拟范围已锁定：2 个方向 × 2 个平台', timestamp: '', stepId: 3 },
    { type: 'confirmation', content: '输入解析与模拟范围已确认，是否继续构建图谱与环境？', timestamp: '' },
    { type: 'status', content: '正在构建语义图谱…', timestamp: '', stepId: 4 },
    { type: 'system', content: '已生成 24 个节点、38 条关系边', timestamp: '', stepId: 4 },
    { type: 'status', content: '正在搭建仿真环境…', timestamp: '', stepId: 5 },
    { type: 'system', content: '平台环境 × 2、时间切片 60 天、衰减模型已就绪', timestamp: '', stepId: 5 },
    { type: 'status', content: '正在生成 Agent 群体…', timestamp: '', stepId: 6 },
    { type: 'system', content: '已生成 5 个 Agent 群体，总计 12,000 模拟用户', timestamp: '', stepId: 6 },
    { type: 'confirmation', content: '图谱、环境、Agent 群体构建完成，是否开始模拟运行？', timestamp: '' },
    { type: 'status', content: '正在设定初始激活策略…', timestamp: '', stepId: 7 },
    { type: 'system', content: '首波激活策略已配置：种子用户 800 人', timestamp: '', stepId: 7 },
    { type: 'status', content: '正在分发第一波内容种子…', timestamp: '', stepId: 8 },
    { type: 'status', content: '正在模拟高意向人群反馈…', timestamp: '', stepId: 8 },
    { type: 'status', content: '正在更新扩圈阈值…', timestamp: '', stepId: 8 },
    { type: 'status', content: '正在计算内容衰减曲线…', timestamp: '', stepId: 8 },
    { type: 'status', content: '正在对比方向 A / B 的生命周期差异…', timestamp: '', stepId: 8 },
    { type: 'system', content: '60 天模拟运行完成', timestamp: '', stepId: 8 },
    { type: 'status', content: '正在生成预测报告…', timestamp: '', stepId: 9 },
    { type: 'system', content: '预测报告已生成', timestamp: '', stepId: 9 },
    { type: 'confirmation', content: '模拟完成，预测报告已就绪', timestamp: '' },
    { type: 'complete', content: '本次品牌营销群体智能预测任务已完成', timestamp: '' },
  ];
}
