"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface Props {
  label?: string;
  error?: any;
  form: any;
  name: string;
  className?: string;
  rows?: number;
}

const FormTextarea = ({
  name,
  label,
  error,
  form,
  className,
  rows = 5,
}: Props) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={label}
              rows={rows}
              {...field}
              className={cn(
                `
                min-h-[100px] 
                resize-y 
                border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-50
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                rounded-lg shadow-sm
                transition duration-200
                hover:border-gray-400 dark:hover:border-gray-500
                

                ${
                  error
                    ? "border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
                    : ""
                }
                `,
                className
              )}
            />
          </FormControl>
          <FormMessage className="mt-1 text-sm text-red-600" />
        </FormItem>
      )}
    />
  </div>
);

export default FormTextarea; 
