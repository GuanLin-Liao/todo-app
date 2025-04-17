export interface Task {
    id:string;
    name: string;
    description?: string;
    is_completed:boolean;
    created_at:string;
    updated_at:string;
}