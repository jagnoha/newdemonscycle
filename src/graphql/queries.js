/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubCategory2 = /* GraphQL */ `
  query GetSubCategory2($id: ID!) {
    getSubCategory2(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSubCategory2s = /* GraphQL */ `
  query ListSubCategory2s(
    $filter: ModelSubCategory2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategory2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubCategory2s = /* GraphQL */ `
  query SyncSubCategory2s(
    $filter: ModelSubCategory2FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubCategory2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEbayStoreCategory = /* GraphQL */ `
  query GetEbayStoreCategory($id: ID!) {
    getEbayStoreCategory(id: $id) {
      id
      name
      code
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listEbayStoreCategories = /* GraphQL */ `
  query ListEbayStoreCategories(
    $filter: ModelEbayStoreCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEbayStoreCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        code
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEbayStoreCategories = /* GraphQL */ `
  query SyncEbayStoreCategories(
    $filter: ModelEbayStoreCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEbayStoreCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        code
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getManufacturer = /* GraphQL */ `
  query GetManufacturer($id: ID!) {
    getManufacturer(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listManufacturers = /* GraphQL */ `
  query ListManufacturers(
    $filter: ModelManufacturerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManufacturers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncManufacturers = /* GraphQL */ `
  query SyncManufacturers(
    $filter: ModelManufacturerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncManufacturers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBrand = /* GraphQL */ `
  query GetBrand($id: ID!) {
    getBrand(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listBrands = /* GraphQL */ `
  query ListBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBrands = /* GraphQL */ `
  query SyncBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBrands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSubCategory = /* GraphQL */ `
  query GetSubCategory($id: ID!) {
    getSubCategory(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSubCategories = /* GraphQL */ `
  query ListSubCategories(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubCategories = /* GraphQL */ `
  query SyncSubCategories(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAttribute = /* GraphQL */ `
  query GetAttribute($id: ID!) {
    getAttribute(id: $id) {
      id
      name
      type
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAttributes = /* GraphQL */ `
  query ListAttributes(
    $filter: ModelAttributeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttributes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAttributes = /* GraphQL */ `
  query SyncAttributes(
    $filter: ModelAttributeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttributes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      SKU
      legacyID
      mpn
      type
      Attributes
      parentSKU
      brandID
      manufacturerID
      categoryID
      subcategoryID
      subcategory2ID
      ebaystorecategoryID
      sourceDropship
      sourceWarehouse
      images
      handle
      bulletPoints
      weight
      dimensionalWeight
      appliedWeight
      status
      updateFlag
      binLocation
      titleStore
      titleEbay
      titleAmazon
      descriptionStore
      descriptionEbay
      descriptionAmazon
      dimensionHeight
      dimensionLength
      dimensionWidth
      priceMSRP
      priceMAP
      priceStore
      priceEbay
      priceAmazon
      priceWholesaleLow
      priceWholesaleHigh
      priceScratchLow
      priceScratchHigh
      cost
      shopifyFitmentTags
      shopifyMetaDescription
      shopifyMetaTitle
      shopifyOnlyTags
      deleted
      createdOn
      updatedOn
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndUpdatedOn = /* GraphQL */ `
  query ProductByTypeAndUpdatedOn(
    $type: String!
    $updatedOn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndUpdatedOn(
      type: $type
      updatedOn: $updatedOn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndCreatedOn = /* GraphQL */ `
  query ProductByTypeAndCreatedOn(
    $type: String!
    $createdOn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndCreatedOn(
      type: $type
      createdOn: $createdOn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndPrice = /* GraphQL */ `
  query ProductByTypeAndPrice(
    $type: String!
    $priceMSRP: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndPrice(
      type: $type
      priceMSRP: $priceMSRP
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndCost = /* GraphQL */ `
  query ProductByTypeAndCost(
    $type: String!
    $cost: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndCost(
      type: $type
      cost: $cost
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndSKU = /* GraphQL */ `
  query ProductByTypeAndSKU(
    $type: String!
    $SKU: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndSKU(
      type: $type
      SKU: $SKU
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const productByTypeAndMPN = /* GraphQL */ `
  query ProductByTypeAndMPN(
    $type: String!
    $mpn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByTypeAndMPN(
      type: $type
      mpn: $mpn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const searchProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: [SearchableProductSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableProductAggregationInput]
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        type
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        sourceDropship
        sourceWarehouse
        images
        handle
        bulletPoints
        weight
        dimensionalWeight
        appliedWeight
        status
        updateFlag
        binLocation
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        cost
        shopifyFitmentTags
        shopifyMetaDescription
        shopifyMetaTitle
        shopifyOnlyTags
        deleted
        createdOn
        updatedOn
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
