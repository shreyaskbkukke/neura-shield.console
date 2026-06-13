export type {
  ConversationThread,
  ConversationMessage,
  Citation,
  ToolTrace,
  AssistantDraft,
} from "@/stores/assistantStore";

export interface ConversationDetail {
  thread_id: string;
  user_id: string;
  title: string | null;
  language: string;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  messages: import("@/stores/assistantStore").ConversationMessage[];
}

export interface ConversationExport {
  export_id: string;
  thread_id: string;
  status: string;
  file_name: string | null;
  message_count: number;
  citation_count: number;
  created_at: string;
}
