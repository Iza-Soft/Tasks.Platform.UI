interface WorkSpace {
  id: number;
  name: string;
  total_task_count: number;
  bgcolor: string;
  created_at: string;
  updated_at: string;
  not_started_task_count: number;
  in_progress_task_count: number;
  completed_task_count: number;
  progress: number;
}

export default WorkSpace;
