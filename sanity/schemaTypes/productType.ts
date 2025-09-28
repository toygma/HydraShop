import { TrolleyIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "price",
      title: "Base Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0.01),
    }),
    defineField({
      name: "salePrice",
      title: "Sale Price (Optional)",
      type: "number",
    }),

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "New Arrivals", value: "new" },
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
          { title: "T-Shirts", value: "t-shirt" },
          { title: "Streetwear", value: "streetwear" },
          { title: "Accessories", value: "accessories" },
          { title: "Featured", value: "featured" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "color", type: "string", title: "Color" }),
            defineField({ name: "size", type: "string", title: "Size" }),
            defineField({ name: "sku", type: "string", title: "SKU" }),
            defineField({
              name: "stockQuantity",
              type: "number",
              title: "Stock Quantity",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewsCount",
      title: "Number of Reviews",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "productFlags",
      title: "Product Flags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "New Arrival", value: "new" },
          { title: "Limited Edition", value: "limited" },
          { title: "Best Seller", value: "best-seller" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `Price: $${subtitle}`,
        media: image,
      };
    },
  },
});
