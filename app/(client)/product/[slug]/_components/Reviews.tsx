"use client";

import FormRating from "@/components/inputs/RatingInput";
import FormTextarea from "@/components/inputs/TextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Product, ProductReview } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { ReviewFormData, reviewSchema } from "@/validation/review.schema";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

interface ReviewsProps {
  product: Product;
}
const Reviews = ({ product }: ReviewsProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [Loading, setLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      message: "",
      rating: 0,
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const query = `*[_type == "productReview" && product._ref == $productId && isApproved == true] | order(_createdAt desc)`;
        const response = await client.fetch(query, { productId: product._id });
        setReviews(response);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product._id]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ReviewFormData) => {
    const apiData = {
      ...data,
      productId: product._id,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImageUrl: user?.imageUrl,
    };
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Yorum gönderilemedi");
      }

      toast.success(
        "Your comment has been successfully submitted. It will be published after approval."
      );

      form.reset();
    } catch (error: any) {
      toast.error(
        error.message || "Comment could not be sent. Please try again."
      );
    }
  };

  return (
    <div className="border-t w-full container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col">
        <h1 className="font-bold tracking-tight text-3xl mb-6 pb-4 border-b border-gray-200">
          {reviews.length} Reviews ({product.name} ) For
        </h1>

        {reviews.map((review) => (
          <div className="flex flex-col sm:flex-row items-start gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition duration-300 rounded-lg p-3 -m-3">
            <div className="flex flex-col items-center min-w-[100px]">
              <Image
                src={`https://robohash.org/${review._id}?set=set4&bgset=&size=400x400`}
                alt={`${review.name} profile`}
                width={80}
                height={80}
                className="rounded-full w-20 h-20 object-cover shadow-md"
              />
            </div>

            {/* Yorum İçeriği */}
            <div className="flex-1 flex flex-col gap-2 w-full">
              {/* İsim, Tarih ve Rating (Tek Satırda) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                {/* İsim ve Tarih (Mobil için Resmin altında) */}
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <p className="font-semibold text-gray-800 text-lg sm:text-base">
                    {review.name}
                  </p>
                  <span className="text-gray-400 text-xs hidden sm:inline">
                    •
                  </span>
                  <p className="text-xs text-gray-500 hidden sm:inline-block">
                    {review.createdAt}
                  </p>
                </div>

                <div className="flex items-center">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="#facc15"
                    starEmptyColor="#e5e7eb"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 pt-1">
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* Yorum Metni */}
              <p className="mt-1 text-gray-700 leading-relaxed">
                {review.message}
              </p>
            </div>
          </div>
        ))}
        <div>
          {user ? (
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-12 flex flex-col gap-4"
              >
                <div>
                  <FormRating
                    name="rating"
                    label="Rate the Product"
                    error={errors.rating}
                    form={form}
                  />
                </div>
                <FormTextarea
                  name="message"
                  label="Your Message"
                  error={errors.message}
                  form={form}
                />
                <div>
                  <Button
                    type="submit"
                    variant={"default"}
                    className="cursor-pointer"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-4">
              <h1 className="text-2xl font-semibold tracking-wider leading-relaxed">
                Please log in to comment.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
