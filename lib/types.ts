export type Role = 'Backend Engineer' | 'Frontend Engineer' | 'Fullstack Engineer' | 'Systems Engineer' | 'Data Engineer' | 'DevOps Engineer' | 'Security Engineer';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type DrillType = 'spot_assumptions' | 'rank_failures' | 'predict_scaling' | 'choose_tradeoffs';

export interface User {
    id: string;
    email: string;
    full_name: string;
    is_admin: boolean;
    selected_role: Role | null;
    selected_level: Difficulty | null;
    created_at: string;
    last_login: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    role: Role;
    difficulty: Difficulty;
    estimated_time_minutes: number;
    scenario: string;
    prompts: string[];
    created_at: string;
}

export interface ResponseScore {
    clarity: number;
    constraints_awareness: number;
    trade_off_reasoning: number;
    failure_anticipation: number;
    simplicity: number;
}

export interface TaskResponse {
    id: string;
    user_id: string;
    task_id: string;
    assumptions: string;
    architecture: string;
    architecture_data?: string;
    architecture_image?: string;
    trade_offs: string;
    failure_scenarios: string;
    submitted_at: string;
    score: number;
    score_breakdown: ResponseScore;
    ai_feedback?: string;
    ai_unlocked_at?: string;
}

export interface Drill {
    id: string;
    title: string;
    drill_type: DrillType;
    question: string;
    options: string[];
    correct_answer?: string;
    explanation?: string;
    created_at: string;
}

export interface ProgressStats {
    user_id: string;
    total_tasks_completed: number;
    current_streak: number;
    longest_streak: number;
    last_activity_date: string;
    total_score: number;
    average_score: number;
}

// Subscription types
export type SubscriptionPlan = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'cancelled' | 'on_hold' | 'expired';

export interface Subscription {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    current_period_end?: string;
}

export interface UsageLimits {
    plan: SubscriptionPlan;
    tasks_used: number;
    tasks_limit: number;
    can_submit_task: boolean;
    drills_used_today: number;
    drills_limit: number;
    can_submit_drill: boolean;
}

export interface CheckoutResponse {
    checkout_url: string;
    payment_link: string;
}

// API error with upgrade requirement
export interface UpgradeRequiredError {
    message: string;
    upgrade_required: boolean;
    error_code: 'TASK_LIMIT_EXCEEDED' | 'DRILL_LIMIT_EXCEEDED';
}
