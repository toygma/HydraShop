// schemas/reviewType.ts

import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const reviewType = defineType({
  name: "productReview",
  title: "Product Review",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),

    // --- Formdan Gelen Veriler ---

    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "name",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "email",
      title: "Reviewer Email",
      type: "string",
      validation: (Rule) => Rule.email(),
      readOnly: true,
    }),

    defineField({
      name: "userImageUrl", 
      title: "User Image",
      type: "string", 
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "message",
      title: "Review Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),

    // --- moderatör ---

    defineField({
      name: "isApproved",
      title: "Approved for Display",
      type: "boolean",
      description: "Check to approve and display the review publicly.",
      initialValue: false,
    }),

    defineField({
      name: "createdAt",
      title: "Submitted At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 1,
      },
      readOnly: true,
      initialValue: new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "message",
      rating: "rating",
      productName: "product.name",
      isApproved: "isApproved",
    },
    prepare(selection) {
      const { title, subtitle, rating, productName, isApproved } = selection;
      const status = isApproved ? "✅ Approved" : "❌ Waiting";
      return {
        title: `${title} (${rating} ⭐) - ${status}`,
        subtitle: `Product: ${
          productName || "Loading..."
        } | Review: ${subtitle?.substring(0, 50)}...`,
      };
    },
  },
});
