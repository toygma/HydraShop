"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ReviewFormData, reviewSchema } from "@/validation/review.schema";
import FormInput from "@/components/inputs/FormInput";
import StarRatings from "react-star-ratings";
import { ProductReview } from "@/sanity.types";

type EditingCommentProps = {
  commentId: string;
  onSuccess: () => void;
  review: ProductReview;
};

const EditingComment = ({
  commentId,
  onSuccess,
  review,
}: EditingCommentProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      message: review.message || "",
      rating: review.rating || 0,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const handleUpdate = async (data: ReviewFormData) => {
    setLoading(true);
    const apiData = {
      reviewId: commentId,
      message: data.message,
      rating: data.rating,
    };
    try {
      const response = await fetch("/api/reviews/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Yorum güncellenmedi");
      }

      toast.success("Your comment has been successfully updated.");
      form.reset(data); // mevcut değerleri koru
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.message || "Comment could not be updated. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col gap-2"
      >
        <FormInput
          name="message"
          label="Your Message"
          error={errors.message}
          form={form}
          type="text"
        />

        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <StarRatings
              rating={field.value}
              starRatedColor="#facc15"
              starEmptyColor="#e5e7eb"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              name="rating"
              changeRating={(newRating) => field.onChange(newRating)}
            />
          )}
        />

        <Button
          disabled={loading}
          loading={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Update
        </Button>
      </form>
    </Form>
  );
};

export default EditingComment;
