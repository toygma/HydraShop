import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  error: any;
  form: any;
  name: string;
  type: string;
  className?: string;
}

const FormInput = ({ name, label, error, form, type, className }: Props) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={label}
              {...field}
              className={cn(
                `bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 
                  dark:bg-gray-700 dark:text-white ${
                    error
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-tertiary focus:border-tertiary"
                  }`,
                className
              )}
            />
          </FormControl>
          <FormMessage className="mt-2 text-sm text-red-500" />
        </FormItem>
      )}
    />
  </div>
);
export default FormInput;
