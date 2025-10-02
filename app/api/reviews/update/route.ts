"use server";
import { NextRequest, NextResponse } from "next/server";
import { writeClient, client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { reviewId, message, rating } = body;

    if (!reviewId || (!message && !rating)) {
      return NextResponse.json(
        {
          error:
            "reviewId zorunlu, ayrıca en az bir alan (message veya rating) gönderilmeli.",
        },
        { status: 400 }
      );
    }

    const existingReview = await client.fetch(
      `*[_type == "productReview" && _id == $reviewId][0]`,
      { reviewId }
    );

    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]{ slug }`,
      { id: existingReview.product._ref }
    );

    if (!existingReview) {
      return NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
    }

    const patchData: any = {};
    if (message) patchData.message = message;
    if (rating) patchData.rating = rating;

    const updatedReview = await writeClient
      .patch(reviewId)
      .set(patchData)
      .commit();

    if (rating) {
      const productId = existingReview.product._ref;

      const approvedReviewsQuery = `*[_type == "productReview" && product._ref == $productId && isApproved == true]`;
      const allApprovedReviews = await client.fetch(approvedReviewsQuery, {
        productId,
      });

      const totalReviews = allApprovedReviews.length;
      const sumOfRatings = allApprovedReviews.reduce(
        (sum: number, review: any) => sum + review.rating,
        0
      );

      const averageRating = totalReviews > 0 ? sumOfRatings / totalReviews : 0;

      await writeClient
        .patch(productId)
        .set({
          rating: Math.round(averageRating * 10) / 10,
          reviewsCount: totalReviews,
        })
        .commit();
    }

    if (product?.slug?.current) {
      revalidatePath(`/product/${product.slug.current}`);
    }
    return NextResponse.json({
      success: true,
      message: "Yorum başarıyla güncellendi.",
      data: updatedReview,
    });
  } catch (error: any) {
    console.error("Yorum güncelleme hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası: Yorum güncellenemedi." },
      { status: 500 }
    );
  }
}
