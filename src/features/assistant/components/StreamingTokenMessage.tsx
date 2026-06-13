import { Bot } from "lucide-react";

interface StreamingTokenMessageProps {
  content: string;
}

export function StreamingTokenMessage({ content }: StreamingTokenMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full bg-brand-100 p-1.5 shrink-0">
        <Bot size={13} className="text-brand-600" />
      </div>
      <div className="flex-1 rounded-xl rounded-tl-none bg-navy-50 border border-navy-100 px-3 py-2.5 max-w-[80%]">
        <p className="text-sm text-navy-800 whitespace-pre-wrap leading-relaxed">{content}</p>
        <span className="inline-block w-1.5 h-4 bg-brand-500 ml-0.5 animate-pulse" />
      </div>
    </div>
  );
}
