// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SubCategory2, EbayStoreCategory, Manufacturer, Brand, SubCategory, Category, Attribute, Product } = initSchema(schema);

export {
  SubCategory2,
  EbayStoreCategory,
  Manufacturer,
  Brand,
  SubCategory,
  Category,
  Attribute,
  Product
};