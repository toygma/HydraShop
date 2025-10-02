"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import StarRatings from "react-star-ratings";

interface FormRatingProps {
  label: string;
  form: any;
  name: string;
  error: any;
}

const FormRating = ({ label, form, name, error }: FormRatingProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <StarRatings
                rating={field.value || 0}
                changeRating={(newRating: number) => field.onChange(newRating)}
                starRatedColor="#facc15"
                starEmptyColor="#e5e7eb"
                numberOfStars={5}
                starDimension="24px"
                starSpacing="3px"
                name={name}
              />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {field.value > 0 ? field.value.toFixed(1) : "0.0"}
              </span>
            </div>
          </FormControl>
          {error && <FormMessage className="mt-1 text-sm text-red-600" />}
        </FormItem>
      )}
    />
  );
};

export default FormRating;
