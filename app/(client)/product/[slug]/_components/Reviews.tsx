"use client";

import FormInput from "@/components/inputs/FormInput";
import FormRating from "@/components/inputs/RatingInput";
import FormTextarea from "@/components/inputs/TextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { client } from "@/sanity/lib/client";
import { ReviewFormData, reviewSchema } from "@/validation/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

const dummyReview = {
  userName: "utku toygun bektaşoğlu",
  date: "23.12.2005",
  rating: 4.2,
  comment:
    "Bu ayakkabılar harika! Tam beklediğim gibi. Hem çok rahat hem de görsel olarak çok şık duruyor. Kesinlikle tavsiye ederim.",
  userImage: "",
};
interface ReviewsProps {
  productId: string;
}
const Reviews = ({ productId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [Loading, setLoading] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      rating: 0,
    },
  });

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const query = `*[_type == "productReview" && product._ref == $productId && isApproved == true] | order(_createdAt desc)`;

        const response = await client.fetch(query, { productId });
        setReviews(response);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ReviewFormData) => {
    const doc = {
      _type: "productReview",
      product: {
        _ref: productId,
        _type: "reference",
      },
      name: data.name,
      email: data.email,
      rating: data.rating,
      message: data.message,
      isApproved: false,
      _createdAt: new Date().toISOString(),
    };

    try {
      await client.create(doc);
      toast.success(
        "Yorumunuz başarıyla gönderildi. Onaylandıktan sonra yayınlanacaktır."
      );
    } catch (error: any) {
      console.error("Yorum gönderilirken hata:", error);
      toast.error("Yorum gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="border-t w-full container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col">
        <h1 className="font-bold tracking-tight text-3xl mb-6 pb-4 border-b border-gray-200">
          Gray Shoes İçin 1 Yorum
        </h1>

        <div className="flex flex-col sm:flex-row items-start gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition duration-300 rounded-lg p-3 -m-3">
          <div className="flex flex-col items-center min-w-[100px]">
            <Image
              src={dummyReview.userImage}
              alt={`${dummyReview.userName} profili`}
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
                  {dummyReview.userName}
                </p>
                <span className="text-gray-400 text-xs hidden sm:inline">
                  •
                </span>
                <p className="text-xs text-gray-500 hidden sm:inline-block">
                  {dummyReview.date}
                </p>
              </div>

              <div className="flex items-center">
                <StarRatings
                  rating={dummyReview.rating}
                  starRatedColor="#facc15"
                  starEmptyColor="#e5e7eb"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 pt-1">
                  {dummyReview.rating}
                </span>
              </div>
            </div>

            {/* Yorum Metni */}
            <p className="mt-1 text-gray-700 leading-relaxed">
              {dummyReview.comment}
            </p>
          </div>
        </div>
        <div>
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
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  label="Your Name"
                  error={errors.name}
                  form={form}
                  type="text"
                  className="w-full bg-transparent"
                />
                <FormInput
                  name="email"
                  label="Your Email"
                  error={errors.email}
                  form={form}
                  type="text"
                  className="w-full bg-transparent"
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
                >
                  Send
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
