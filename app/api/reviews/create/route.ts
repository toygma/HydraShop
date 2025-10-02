// app/api/reviews/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeClient, client } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zorunlu alanları daha okunaklı ve güvenilir kontrol etme
    const {
      userName,
      userEmail,
      message,
      rating,
      productId,
      userImageUrl, // Clerk'ten gelen kullanıcı resmi URL'si eklendi
    } = body;

    // Validasyon: userId ve userImageUrl de zorunlu (giriş yapmış kullanıcı)
    if (
      !userName ||
      !userEmail ||
      !message ||
      !rating ||
      !productId ||
      !userImageUrl // Yeni kontrol eklendi
    ) {
      return NextResponse.json(
        { error: "Tüm kullanıcı, ürün ve yorum alanları zorunludur" },
        { status: 400 }
      );
    }

    // if (userEmail) {
    //   return NextResponse.json(
    //     { error: "Daha önce yorum yapmıştın." },
    //     { status: 400 }
    //   );
    // }

    // Yorum oluşturulacak belge (doc)
    const doc = {
      _type: "productReview",
      product: {
        _ref: productId,
        _type: "reference",
      },
      name: userName,
      email: userEmail,
      rating: rating,
      message: message,
      userImageUrl: userImageUrl, // Kullanıcı resmi kaydediliyor
      isApproved: false, // Moderasyon için varsayılan olarak Onaylanmamış
      // Sanity otomatik olarak _createdAt ekler, manuel eklemeye gerek yok
    };

    // 1. Yeni Yorumu Kaydet
    const reviewResult = await writeClient.create(doc);

    // --- Ürün İstatistiklerini Güncelleme ---

    // 2. Ortalama puanı ve sayıyı hesaplamak için YALNIZCA ONAYLANMIŞ yorumları çek
    const approvedReviewsQuery = `*[_type == "productReview" && product._ref == $productId && isApproved == true]`;
    const allApprovedReviews = await client.fetch(approvedReviewsQuery, {
      productId: productId,
    });

    const totalReviews = allApprovedReviews.length;

    // Puan hesaplama: Yeni yorum onaylanmadığı için HESAPLAMAYA DAHİL DEĞİLDİR.
    const sumOfRatings = allApprovedReviews.reduce(
      (sum: number, review: any) => sum + review.rating,
      0
    );

    const averageRating = totalReviews > 0 ? sumOfRatings / totalReviews : 0;

    // 3. Ürünü Güncelle
    await writeClient
      .patch(productId)
      .set({
        // Puanı tek ondalık basamağa yuvarla (örneğin 4.2)
        rating: Math.round(averageRating * 10) / 10,
        reviewsCount: totalReviews, // Sadece onaylanmış yorum sayısı
      })
      .commit();

    return NextResponse.json({
      success: true,
      message:
        "Yorumunuz başarıyla gönderildi ve moderasyon sonrası yayınlanacaktır.",
      data: reviewResult,
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        numberOfApprovedReviews: totalReviews,
      },
    });
  } catch (error: any) {
    console.error("Yorum oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası: Yorum gönderilemedi." },
      { status: 500 }
    );
  }
}
