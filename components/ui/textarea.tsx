import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, label, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="ml-1 text-danger">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "rounded-xl border border-input bg-white px-4 py-2.5 text-base text-foreground transition-colors placeholder:text-muted-foreground",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
            "resize-none",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        {helperText && !error && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

// ส่งออกทั้งสองชื่อเพื่อป้องกัน Build Error ใน Next.js
export const Textarea = TextArea;
