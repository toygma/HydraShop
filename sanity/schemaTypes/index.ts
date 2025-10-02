import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { reviewType } from "./reviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType,productType,reviewType],
};
