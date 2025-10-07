import supabase from "../utils/supabase"

export interface TaskType {
  id?: string,
  created_at: number,
  name: string,
  description?: string,
  due_date?: number,
  task_status: number
}

export const TaskStatusList = ["To do", "In progress", "Verifying", "Done"]

export const getTask = async () => {
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) {
    throw new Error(error.message)
  }
  return { data: data as TaskType[] }
}

export const deleteTask = async (taskId: number) => {
  const { error } = await supabase
    .from("task")
    .delete()
    .eq("id", taskId)

  return { error }
}

export const updateTask = async (task: TaskType) => {
  if (!task.id) {
    return { data: null as TaskType | null, error: new Error("Task id is required for update") }
  }

  const { data, error } = await supabase
    .from("task")
    .update({
      name: task.name,
      description: task.description ?? null,
      due_date: task.due_date ?? null,
      task_status: task.task_status,
      created_at: task.created_at
    })
    .eq("id", task.id)
    .select()
    .single()

  return { data: data as TaskType | null, error }
}

export const createTask = async (task: TaskType) => {
  const { data, error } = await supabase
    .from("task")
    .insert({
      name: task.name,
      description: task.description ?? null,
      due_date: task.due_date ?? null,
      task_status: task.task_status,
      created_at: task.created_at
    })
    .select()
    .single()

  return { data: data as TaskType | null, error }
}
