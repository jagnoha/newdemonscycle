import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SubCategory2MetaData = {
  readOnlyFields;
}

type EbayStoreCategoryMetaData = {
  readOnlyFields;
}

type ManufacturerMetaData = {
  readOnlyFields;
}

type BrandMetaData = {
  readOnlyFields;
}

type SubCategoryMetaData = {
  readOnlyFields;
}

type CategoryMetaData = {
  readOnlyFields;
}

type AttributeMetaData = {
  readOnlyFields;
}

type ProductMetaData = {
  readOnlyFields;
}

export declare class SubCategory2 {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<SubCategory2>);
  static copyOf(source: SubCategory2, mutator: (draft: MutableModel<SubCategory2>) => MutableModel<SubCategory2> | void): SubCategory2;
}

export declare class EbayStoreCategory {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<EbayStoreCategory>);
  static copyOf(source: EbayStoreCategory, mutator: (draft: MutableModel<EbayStoreCategory>) => MutableModel<EbayStoreCategory> | void): EbayStoreCategory;
}

export declare class Manufacturer {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<Manufacturer>);
  static copyOf(source: Manufacturer, mutator: (draft: MutableModel<Manufacturer>) => MutableModel<Manufacturer> | void): Manufacturer;
}

export declare class Brand {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<Brand>);
  static copyOf(source: Brand, mutator: (draft: MutableModel<Brand>) => MutableModel<Brand> | void): Brand;
}

export declare class SubCategory {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<SubCategory>);
  static copyOf(source: SubCategory, mutator: (draft: MutableModel<SubCategory>) => MutableModel<SubCategory> | void): SubCategory;
}

export declare class Category {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<Category>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

export declare class Attribute {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<Attribute>);
  static copyOf(source: Attribute, mutator: (draft: MutableModel<Attribute>) => MutableModel<Attribute> | void): Attribute;
}

export declare class Product {
  readonly id: string;
  readonly SKU?: string | null;
  readonly legacyID?: string | null;
  readonly mpn?: string | null;
  readonly type?: string | null;
  readonly Attributes?: string | null;
  readonly parentSKU?: string | null;
  readonly brandID?: string | null;
  readonly manufacturerID?: string | null;
  readonly categoryID?: string | null;
  readonly subcategoryID?: string | null;
  readonly subcategory2ID?: string | null;
  readonly ebaystorecategoryID?: string | null;
  readonly sourceDropship?: boolean | null;
  readonly sourceWarehouse?: boolean | null;
  readonly images?: string | null;
  readonly handle?: string | null;
  readonly bulletPoints?: string | null;
  readonly weight?: number | null;
  readonly dimensionalWeight?: number | null;
  readonly appliedWeight?: number | null;
  readonly status?: string | null;
  readonly updateFlag?: boolean | null;
  readonly binLocation?: string | null;
  readonly titleStore?: string | null;
  readonly titleEbay?: string | null;
  readonly titleAmazon?: string | null;
  readonly descriptionStore?: string | null;
  readonly descriptionEbay?: string | null;
  readonly descriptionAmazon?: string | null;
  readonly dimensionHeight?: number | null;
  readonly dimensionLength?: number | null;
  readonly dimensionWidth?: number | null;
  readonly priceMSRP?: number | null;
  readonly priceMAP?: number | null;
  readonly priceStore?: number | null;
  readonly priceEbay?: number | null;
  readonly priceAmazon?: number | null;
  readonly priceWholesaleLow?: number | null;
  readonly priceWholesaleHigh?: number | null;
  readonly priceScratchLow?: number | null;
  readonly priceScratchHigh?: number | null;
  readonly cost?: number | null;
  readonly shopifyFitmentTags?: string | null;
  readonly shopifyMetaDescription?: string | null;
  readonly shopifyMetaTitle?: string | null;
  readonly shopifyOnlyTags?: string | null;
  readonly deleted?: boolean | null;
  readonly createdOn: string;
  readonly updatedOn: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}