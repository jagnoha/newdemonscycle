import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent, Item, Loader, Step, Label, Menu, Confirm, Container} from 'semantic-ui-react'
import { listProducts, productByTypeAndCreatedOn, searchProducts, listBrands, syncProducts, listCategories, listSubCategories, listSubCategory2s, listEbayStoreCategories, listAttributes, getProduct } from '../../graphql/queries'
import aws_exports from '../../aws-exports'
import { CSVLink } from 'react-csv'
import { attachEventProps } from '@aws-amplify/ui-react/lib-esm/react-component-lib/utils'
//import Papa from "papaparse"
import {ExcelToJson} from 'excel-to-json-in-react-js'
import xlsx from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import { createCategory, createSubCategory, createManufacturer, createProduct, updateProduct, createBrand, createSubCategory2, createEbayStoreCategory, createAttribute } from '../../graphql/mutations'
import { DataStore, Predicates, SortDirection } from 'aws-amplify'
import { Product } from '../../models'
import { ConsoleLogger } from '@aws-amplify/core'
import axios from 'axios'
import crypto from 'crypto'

//import Attributes from '../Attributes/Attributes'

Amplify.configure(aws_exports)

/*DataStore.configure({
  maxRecordsToSync: 100000,
  syncPageSize: 1000
})*/


export default function ExportFile(props) {

    const urlBase = 'https://demons-cycle-storage202642-devt.s3.amazonaws.com/public/'

    const [products, setProducts] = useState(null)
    const [JsonData,setJsonData]=useState("")
    const [open, setOpen]=useState(false)
    //const [brands, setBrands] = useState([])
    //const [categories, setCategories] = useState([])
    //const [attributes, setAttributes] = useState([])
    //const [subCategories, setSubCategories] = useState([])
    //const [subCategories2, setSubCategories2] = useState([])    
    const [data, setData] = useState([])
    const [dataMetafields, setDataMetafields] = useState([])
    const [dataReviseEbay, setDataReviseEbay] = useState([])
    

    let headersMetaFields = [
      { label: "productHandle", key: "productHandle" },
      { label: "key", key: "key" },
      { label: "namespace", key: "namespace" },
      { label: "type", key: "type" },
      { label: "value", key: "value" },
    ]

    let headersReviseEbay = [
      { label: "*Action(SiteID=eBayMotors|Country=US|Currency=USD|Version=941)", key: "Action" },
      { label: "ItemID", key: "ItemID" },
      { label: "Category", key: "Category" },
      { label: "Title", key: "Title" },
      { label: "Description", key: "Description" },
      { label: "PicURL", key: "PicURL" },
      { label: "Product:Brand", key: "Brand" },
      { label: "Product:MPN", key: "MPN" },      
    ]    


    let headers = [
        { label: "SKU", key: "SKU" },
        { label: "MPN", key: "MPN" },
        { label: "Source", key: "Source" },
        { label: "Brand", key: "Brand" },
        { label: "BinLocation", key: "BinLocation" },
        { label: "ParentSKU", key: "ParentSKU" },        
        { label: "ItemName", key: "ItemName" },
        { label: "BodyDescription", key: "BodyDescription" },
        { label: "Handle", key: "Handle" },
        { label: "Category", key: "Category" },
        { label: "SubCategory", key: "SubCategory" },
        { label: "SubCategory2", key: "SubCategory2" },
        { label: "Weight", key: "Weight" },
        { label: "Height", key: "Height" },
        { label: "Length", key: "Length" },
        { label: "Width", key: "Width" },
        { label: "ShopifyFitmentTags", key: "ShopifyFitmentTags" },
        { label: "ShopifyOnlyTags", key: "ShopifyOnlyTags" },
        { label: "Image1", key: "Image1" },
        { label: "Image2", key: "Image2" },
        { label: "Image3", key: "Image3" },
        { label: "Image4", key: "Image4" },
        { label: "Image5", key: "Image5" },
        { label: "ApparelGender", key: "ApparelGender" },
        { label: "ApparelMaterial", key: "ApparelMaterial" },        
        { label: "ApparelSize", key: "ApparelSize" },
        { label: "ApparelSizeSegment", key: "ApparelSizeSegment" },
        { label: "ApparelSizeModifier", key: "ApparelSizeModifier" },
        { label: "ApparelStyle", key: "ApparelStyle" },
        { label: "BatteryCode", key: "BatteryCode" },
        { label: "BearingSize", key: "BearingSize" },
        { label: "BoltPattern", key: "BoltPattern" },
        { label: "Bore", key: "Bore" },
        { label: "Compression", key: "Compression" },
        { label: "ContainerSize", key: "ContainerSize" },
        { label: "Diameter", key: "Diameter" },
        { label: "HandlebarBlinkers", key: "HandlebarBlinkers" },
        { label: "HandlebarClampingDiameter", key: "HandlebarClampingDiameter" },
        { label: "HandlebarConfiguration", key: "HandlebarConfiguration" },
        { label: "HandlebarControlColor", key: "HandlebarControlColor" },
        { label: "HandlebarPullback", key: "HandlebarPullback" },
        { label: "HandlebarRise", key: "HandlebarRise" },
        { label: "HandlebarDiameter", key: "HandlebarDiameter" },
        { label: "HandlebarSwitchColor", key: "HandlebarSwitchColor" },
        { label: "HandlebarStyle", key: "HandlebarStyle" },
        { label: "HandlebarWidth", key: "HandlebarWidth" },
        { label: "LensStyle", key: "LensStyle" },
        { label: "LoadRating", key: "LoadRating" },
        { label: "Material", key: "Material" },
        { label: "Pitch", key: "Pitch" },
        { label: "SeatStyle", key: "SeatStyle" },
        { label: "SeatWidthDriver", key: "SeatWidthDriver" },
        { label: "SeatWidthPassenger", key: "SeatWidthPassenger" },
        { label: "Shape", key: "Shape" },
        { label: "Sizing", key: "Sizing" },
        { label: "SpringRate", key: "SpringRate" },
        { label: "SprocketPosition", key: "SprocketPosition" },
        { label: "SprocketTeeth", key: "SprocketTeeth" },
        { label: "SprocketSize", key: "SprocketSize" },
        { label: "Thickness", key: "Thickness" },
        { label: "Speed", key: "Speed" },
        { label: "TireApplication", key: "TireApplication" },
        { label: "TireConstruction", key: "TireConstruction" },
        { label: "TirePly", key: "TirePly" },
        { label: "TireRimOffset", key: "TireRimOffset" },
        { label: "TireSpeedRating", key: "TireSpeedRating" },
        { label: "TireType", key: "TireType" },
        { label: "WheelDiameter", key: "WheelDiameter" },
        { label: "WheelDisc", key: "WheelDisc" },
        { label: "WheelSpokeCount", key: "WheelSpokeCount" },
        { label: "WheelSpokeFinish", key: "WheelSpokeFinish" },
        { label: "WheelWidth", key: "WheelWidth" },
        { label: "OptionName1", key: "OptionName1" },
        { label: "OptionValue1", key: "OptionValue1" },
        { label: "OptionName2", key: "OptionName2" },
        { label: "OptionValue2", key: "OptionValue2" },
        { label: "OptionName3", key: "OptionName3" },
        { label: "OptionValue3", key: "OptionValue3" },
        { label: "OptionName4", key: "OptionName4" },
        { label: "OptionValue4", key: "OptionValue4" },
        { label: "OptionName5", key: "OptionName5" },
        { label: "OptionValue5", key: "OptionValue" },
        { label: "MSRP", key: "MSRP" },
        { label: "Cost", key: "Cost" },
        //{ label: "ListPrice", key: "ListPrice" },
        //{ label: "MyStorePrice", key: "MyStorePrice" },
        //{ label: "SellPrice", key: "SellPrice" },
        //{ label: "UpdateFlag", key: "UpdateFlag" },
        { label: "ShopifyMetaTitle", key: "ShopifyMetaTitle" },
        { label: "ShopifyMetaDescription", key: "ShopifyMetaDescription" },
        { label: "MAP", key: "MAP" },
        { label: "Updated", key: "Updated" },
        
      ];    				
      
      
    /*let dataTemp = [
        { 
            SKU: "Ahmed", MPN: "Tomi", Source: "ah@smthing.co.com", BinLocation: "",
            Brand: "", PartsSKU: "", TuckerSKU: "", WPSSKU: "", ItemName: "",
            BodyDescription: "", Handle: "", Category: "", SubCategory: "",
            SubCategory2: "", Weight: "", Height: "", Length: "", Width:"",
            ShopifyFitmentTags: "", ShopifyOnlyTags: "", Image: "", ApparelGender: "",
            ApparelMaterial: "", ApparelSize: "", ApparelSizeSegment: "", ApparelSizeModifier: "",
            ApparelStyle: "", BatteryCode: "", BearingSize: "", BoltPattern: "", Bore: "",
            Compression: "", ContainerSize: "", Diameter: "", HandlebarBlinkers: "", 
            HandlebarClampingDiameter: "", HandlebarConfiguration: "", HandlebarControlColor: "",
            HandlebarPullback: "", HandlebarRise: "", HandlebarDiameter: "", HandlebarSwitchColor: "",
            HandlebarStyle: "", HandlebarWidth: "", LensStyle: "", LoadRating: "", Material: "",
            Pitch: "", SeatStyle: "", SeatWidthDriver: "", SeatWidthPassenger: "", Shape: "",
            Sizing: "", SpringRate: "", SprocketPosition: "", SprocketTeeth: "", SprocketSize: "",
            Thickness: "", Speed: "", TireApplication: "", TireConstruction: "", TirePly: "",
            TireRimOffset: "", TireSpeedRating: "", TireType: "", WheelDiameter: "", WheelDisc: "",
            WheelSpokeCount: "", WheelSpokeFinish: "", WheelWidth: "", OptionName1: "", OptionValue1: "",
            OptionName2: "", OptionValue2: "", OptionName3: "", OptionValue3: "", OptionName4: "",
            OptionValue4: "", OptionName5: "", OptionValue5: "", MSRP: "", Cost: "", ListPrice: "",
            MyStorePrice: "", SellPrice: "", UpdateFlag: ""
        }
    ]*/

    const onPageRendered = async () => {
        //fetchBrands()
        //fetchCategories()
        //fetchSubCategories()
        //fetchSubCategories2()
        //fetchAttributes()
        //DataStore.clear()
        fetchProducts()
        fetchAllProducts()
       
          
    }

          
    useEffect(() => {
          onPageRendered()
    }, [])

    /*const getProducts = (event, done) => {
        
    }*/

    const fetchAllProducts = async () => {
      try {

        const allProducts = await API.graphql(graphqlOperation(productByTypeAndCreatedOn, {type: "Product", filter: { deleted: { ne: "true" }   } }))
        console.log(allProducts)

      } catch(e) { console.log(e)}
    }

    const fetchProducts = async () => {
        try {
            //fetchAttributes()


            /*let productList = await API.graphql(graphqlOperation(listProducts, {limit: productsByPage }))
            let products = productList.data.listProducts.items.filter(item => !item._deleted)*/
            

            /*const products = await DataStore.query(Product, c => c.updateFlag("eq", 'false')
            //.status("eq", "Active")
            )/*
            .filter(item => !item._deleted)*/

            const listProductsQuery = `query syncProducts {
              syncProducts(filter: {updateFlag: {eq: true}, status: {eq: "Active"}}) {
                items {
                  SKU
                  id
                  titleStore
                  titleEbay
                  _deleted
                  Attributes
                  brandID
                  categoryID
                  cost
                  _version
                  appliedWeight
                  descriptionStore
                  dimensionHeight
                  dimensionLength
                  dimensionWidth
                  dimensionalWeight
                  handle
                  images
                  mpn
                  parentSKU
                  priceStore
                  priceMSRP
                  shopifyFitmentTags
                  shopifyMetaTitle
                  shopifyOnlyTags
                  shopifyMetaDescription
                  sourceDropship
                  sourceWarehouse
                  subcategory2ID
                  subcategoryID
                  weight
                  updateFlag
                  newFlag
                  status        
                }
              }
            }`
          
            const allProducts = await API.graphql(graphqlOperation(listProductsQuery))
            //const products = allProducts ? allProducts.filter(item => !item._deleted) : []
            const products = allProducts.data.syncProducts.items ? allProducts.data.syncProducts.items.filter(item => !item._deleted) : []

            //console.log("ALL PRODUCTS: ", allProducts)


            //const productList = await DataStore.query(Product, c=> c.updateFlag("eq",true).status("eq", 'Active'))
            //const products = productList ? productList.filter(item => !item._deleted) : []
            //console.log("PRODUCTS: " ,products)

            //.filter(item2 => item2.updateFlag) 

            /*const productData = await API.graphql({
              query: listProducts,
            })      
            const products = await productData.data.listProducts.items.filter(item => !item._deleted)*/   
            console.log("PRODUCTS: ",products)
            setProducts(products)

            
            
            let result = [];

            let resultMetaFields = [];

            let resultReviseEbay = [];
            
            let updated = Date.now()

            for (let item of products){
                
                let brand = props.brands.find(itemBrand => itemBrand.id === item.brandID) 
                let brandName = brand ? brand.name : ""
                let title = item.titleStore ? item.titleStore : ""                
                let description = item.descriptionStore ? item.descriptionStore : ""
                let category = props.categories.find(itemCategory => itemCategory.id === item.categoryID)
                let categoryName = category ? category.name : ""
                let subcategory = props.subCategories.find(itemSubCategory => itemSubCategory.id === item.subcategoryID)
                let subCategoryName = subcategory ? subcategory.name : ""
                let subcategory2 = props.subCategories2.find(itemSubCategory2 => itemSubCategory2.id === item.subcategory2ID)
                let subCategory2Name = subcategory2 && subcategory2.id !== '3dc30aff-66a5-49fa-9f20-49c76031a994' ? subcategory2.name : ""
                let height = item.dimensionHeight || item.dimensionHeight > 0 ? item.dimensionHeight : "" 
                let length = item.dimensionLength || item.dimensionLength > 0 ? item.dimensionLength : ""
                let width = item.dimensionWidth || item.dimensionWidth > 0 ? item.dimensionWidth : ""
                let Weight = item.appliedWeight || item.appliedWeight > 0 ? item.appliedWeight : ""
                let image1 = JSON.parse(item.images).length > 0 ? JSON.parse(item.images)[0].data_url :  "" //item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                let image2 = JSON.parse(item.images).length > 1 ? JSON.parse(item.images)[1].data_url :  "" //item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                let image3 = JSON.parse(item.images).length > 2 ? JSON.parse(item.images)[2].data_url :  "" //item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                let image4 = JSON.parse(item.images).length > 3 ? JSON.parse(item.images)[3].data_url :  "" //item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                let image5 = JSON.parse(item.images).length > 4 ? JSON.parse(item.images)[4].data_url :  "" //item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                  
                let MSRP = item.priceMSRP || item.priceMSRP > 0 ? item.priceMSRP : ""
                let MAP = item.priceMAP || item.priceMAP > 0 ? item.priceMAP : ""

                //let listPrice = ""
                //let myStore = item.priceStore ? item.priceStore : ""
                let sourceWarehouse = item.sourceWarehouse ? item.sourceWarehouse : false
                let sourceDropship = item.sourceDropship ? item.sourceDropship : false
                let attributesParse = item.Attributes ? JSON.parse(item.Attributes) : []
                
                

                let product = { 
                    SKU: item.SKU, MPN: item.mpn, 
                    BinLocation: item.binLocation,
                    Brand: brandName, ParentSKU: item.parentSKU, ItemName: title,
                    BodyDescription: description, Handle: item.handle, Category: categoryName, SubCategory: subCategoryName,
                    SubCategory2: subCategory2Name, Weight: Weight, Height: height, Length: length, Width: width,
                    ShopifyFitmentTags: item.shopifyFitmentTags, ShopifyOnlyTags: item.shopifyOnlyTags, MSRP: MSRP, Cost: item.cost, 
                    ShopifyMetaTitle: item.shopifyMetaTitle, ShopifyMetaDescription: item.shopifyMetaDescription,
                    MAP: MAP, Image1: image1, Image2: image2, Image3: image3, Image4: image4, Image5: image5, Updated: updated,                     
                }

                let n = 0
                console.log(attributesParse)
                console.log("TODOS LOS ATTRIBUTES:",props.attributes)
                for (let itemList of attributesParse){
                    n++
                    
                    let attribute = props.attributes.find(itemAttr => itemAttr.id === itemList.id )
                    let name = attribute ? attribute.name : ''
                    console.log("ESTE ES EL NAME: ",name)
                    if (itemList.option){
                        //options.push({name: name, value: itemList.value})
                        product[`OptionName${n}`] = name
                        product[`OptionValue${n}`] = itemList.value
                    }
                    product[`${name.split(' ').join('')}`] = itemList.value

                    /*let productDetails = {
                      id: itemList.id,
                      updateFlag: false,
                      _version: itemList._version,          
                    }
                    await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))*/
                }

                //console.log(product)

                if (sourceWarehouse) {
                    //product.Source = 'DEMONS'
                    result.push({...product, Source: 'DEMONS'})
                }
                if (sourceDropship) {
                    //product.Source = 'DROPSHIP'
                    result.push({...product, Source: 'DROPSHIP'})
                }
                
                if (item.shopifyMetaTitle && item.shopifyMetaTitle.length > 0 ) {
                  resultMetaFields.push({productHandle: item.handle, key: 'title_tag', namespace: 'global', type: 'single_line_text_field', value: item.shopifyMetaTitle})
                }
                if (item.shopifyMetaDescription && item.shopifyMetaDescription.length > 0 ) {
                  resultMetaFields.push({productHandle: item.handle, key: 'description_tag', namespace: 'global', type: 'multi_line_text_field', value: item.shopifyMetaDescription})
                }

                if (!item.newFlag){
                  resultReviseEbay.push({Action: "Revise", ItemID: item.SKU, Category: category.ebayCode, Title: item.titleEbay, Description: description, PicURL: image1,
                  Brand: brandName, MPN: item.mpn })
                }

                //result.push(product)
            
            }
            
            setData(result)
            setDataMetafields(resultMetaFields)
            setDataReviseEbay(resultReviseEbay)
            
      
        } catch (err) { console.log(err) }
    }

    const handleUpdateFlag = async () => {
      console.log("Click!!!!!!!!!!!!!")
      console.log(products)
      for (let item of products){
        let productDetails = {
                      id: item.id,
                      updateFlag: false,
                      newFlag: false,
                      _version: item._version,          
                    }
                    await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
      }
      setProducts([])
      setOpen(false)
    }

    /*const fetchBrands = async () => {
        try {
          const brandsData = await API.graphql({
            query: listBrands,
          })      
          const brands = await brandsData.data.listBrands.items.filter(item => !item._deleted)   
          setBrands(brands)

        } catch (err) { console.log(err) }
    }*/

    /*const fetchAttributes = async () => {
        try {
          const attributesData = await API.graphql({
            query: listAttributes,          
          })
          const attributesTemp = await attributesData.data.listAttributes.items.filter(item => !item._deleted)      
          setAttributes(attributesTemp)
          //console.log("OTROS ATTRIBUTES:", attributes)   
          
      
        } catch (err) { console.log(err) }
    }*/

    /*const fetchCategories = async () => {
        try {
          const categoriesData = await API.graphql({
            query: listCategorys,
          
          })      
          const categories = await categoriesData.data.listCategorys.items.filter(item => !item._deleted)      
          setCategories(categories)   
          
      
        } catch (err) { console.log(err) }
      }*/

      /*

      const fetchSubCategories = async () => {
        try {
          const subCategoriesData = await API.graphql({
            query: listSubCategorys,
          
          })      
          
          const subCategories = await subCategoriesData.data.listSubCategorys.items.filter(item => !item._deleted)      
          setSubCategories(subCategories)             
      
        } catch (err) { console.log(err) }
      }

      const fetchSubCategories2 = async () => {
        try {
          const subCategoriesData2 = await API.graphql({
            query: listSubCategory2s,
          
          })     
          const subCategories2 = await subCategoriesData2.data.listSubCategory2s.items.filter(item => !item._deleted)      
          setSubCategories2(subCategories2)             
      
        } catch (err) { console.log(err) }
      }*/

      const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                //console.log(json);
                handleApplyCategoriesChanges(json)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }


    const updateItems = async (item) => {
      try {
        console.log(item)
        let id = uuidv4()
        let name = item.name
        //let product = products.find(item => item.id === id)
        //let version = product._version
        //let categoryOld = product.categoryID
        //let subCategoryOld = product.subcategoryID
        //let subCategoryOld2 = product.subcategory2ID
        //let ebayStoreCategoryOld = product.ebaystorecategoryID
        
        let itemDetails = {
          id,
          name,
          /*categoryID: editCategoriesSelected.category.checked ? editCategoriesSelected.category.id : categoryOld, 
          subcategoryID: editCategoriesSelected.subCategory.checked ? editCategoriesSelected.subCategory.id : subCategoryOld,
          subcategory2ID: editCategoriesSelected.subCategory2.checked ? editCategoriesSelected.subCategory2.id : subCategoryOld2,
          ebaystorecategoryID: editCategoriesSelected.ebayStoreCategory.checked ? editCategoriesSelected.ebayStoreCategory.id : ebayStoreCategoryOld,
          _version: version,*/          
        }
        await API.graphql(graphqlOperation(createManufacturer, { input: itemDetails }))
        
        
    
      } catch (err) {
        //console.log('error creating Product:', err)
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error updating Categories',
              description: err,              
              time: 2000,              
          });
        }, 200);
      }
    }
    
    const handleApplyCategoriesChanges = (excelFile) => {
      try {
      for (let item of excelFile){
        //console.log(item)
        updateItems(item)
      }
      setTimeout(() => {
        toast({
            type: 'success',
            icon: 'check circle outline',
            size: 'tiny',              
            description: 'Products successfully updated',
            time: 2000,              
        })
      }, 200
      )
      } catch (error) {
        console.log(error)
      }
    }

    const updateProducts = async (item) => {
      try {
        //console.log(item)
        let id = uuidv4()
        
        let itemDetails = {
          id,
          SKU: item.SKU,
          sourceWarehouse: item.sourceWarehouse,
          sourceDropship: item.sourceDropship,
          status: item.status,
          legacyID: item.legacyID,
          mpn: item.mpn,
          Attributes: item.Attributes,
          parentSKU: item.parentSKU,
          brandID: item.brandID,
          manufacturerID: item.manufacturerID,
          categoryID: item.categoryID,
          subcategoryID: item.subcategoryID,
          subcategory2ID: item.subcategory2ID,
          ebaystorecategoryID: item.ebaystorecategoryID,
          binLocation: item.binLocation,
          titleStore: item.titleStore,
          descriptionStore: item.descriptionStore,
          handle: item.handle,
          weight: item.weight,
          dimensionalWeight: item.dimensionalWeight,
          appliedWeight: item.appliedWeight,
          //dimensions: item.dimensions,
          dimensionHeight: item.dimensionHeight,
          dimensionLength: item.dimensionLength,
          dimensionWidth: item.dimensionWidth,
          shopifyFitmentTags: item.shopifyFitmentTags,
          shopifyOnlyTags: item.shopifyOnlyTags,
          //priceMSRP: item.price,
          priceMSRP: item.priceMSRP,
          cost: item.cost,
          shopifyMetaTitle: item.shopifyMetaTitle,
          shopifyMetaDescription: item.shopifyMetaDescription,
        }

          /*categoryID: editCategoriesSelected.category.checked ? editCategoriesSelected.category.id : categoryOld, 
          subcategoryID: editCategoriesSelected.subCategory.checked ? editCategoriesSelected.subCategory.id : subCategoryOld,
          subcategory2ID: editCategoriesSelected.subCategory2.checked ? editCategoriesSelected.subCategory2.id : subCategoryOld2,
          ebaystorecategoryID: editCategoriesSelected.ebayStoreCategory.checked ? editCategoriesSelected.ebayStoreCategory.id : ebayStoreCategoryOld,
          _version: version,*/          
        
        await API.graphql(graphqlOperation(createProduct, { input: itemDetails }))
        
        
    
      } catch (err) {
        console.log('error creating Product:', err)
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error updating Product',
              description: err,              
              time: 2000,              
          });
        }, 200);
      }
    }

    const handleApplyProductsChanges = async (excelFile) => {
      try {
        let n = 0
      for (let item of excelFile.slice(32000,33699)){
        n++
        console.log('********* ',n,' ********')  
        
        let options = []
        let attributesProduct = []

        options.push({name: item.OptionName1, value: item.OptionValue1})
        options.push({name: item.OptionName2, value: item.OptionValue2})
        options.push({name: item.OptionName3, value: item.OptionValue3})
        options.push({name: item.OptionName4, value: item.OptionValue4})
        options.push({name: item.OptionName5, value: item.OptionValue5})


        for (let i of options){
          if (i.name) {
            attributesProduct.push({id: props.attributes.find(item => item.name === i.name) ? props.attributes.find(item => item.name === i.name).id : "ERROR", value: i.value, option: true  })
            //console.log(i.name)
            //console.log(props.attributes.find(item => item.name === i.name).id)
          }
        }

        let attributeList = []
        attributeList.push({name: 'Apparel Gender', value: item.ApparelGender})
        attributeList.push({name: 'Apparel Material', value: item.ApparelMaterial})
        attributeList.push({name: 'Apparel Size', value: item.ApparelSize})
        attributeList.push({name: 'Apparel Size Segment', value: item.ApparelSizeSegment})
        attributeList.push({name: 'Apparel Size Modifier', value: item.ApparelSizeModifier})
        attributeList.push({name: 'Apparel Style', value: item.ApparelStyle})
        attributeList.push({name: 'Battery Code', value: item.BatteryCode})
        attributeList.push({name: 'Bearing Size', value: item.BearingSize})
        attributeList.push({name: 'Bolt Pattern', value: item.BoltPattern})
        attributeList.push({name: 'Bore', value: item.Bore})
        attributeList.push({name: 'Compression', value: item.Compression })
        attributeList.push({name: 'Container Size', value: item.ContainerSize      })
        attributeList.push({name: 'Diameter', value: item.Diameter})
        attributeList.push({name: 'Handlebar Blinkers', value: item.HandlebarBlinkers      })
        attributeList.push({name: 'Handlebar Clamping Diameter', value: item.HandlebarClampingDiameter      })
        attributeList.push({name: 'Handlebar Configuration', value: item.HandlebarConfiguration      })
        attributeList.push({name: 'Handlebar Control Color', value: item.HandlebarControlColor      })
        attributeList.push({name: 'Handlebar Rise', value: item.HandlebarRise      })
        attributeList.push({name: 'Handlebar Pullback', value: item.HandlebarPullback      })
        attributeList.push({name: 'Handlebar Diameter', value: item.HandlebarDiameter      })
        attributeList.push({name: 'Handlebar Switch Color', value: item.HandlebarSwitchColor      })
        attributeList.push({name: 'Handlebar Style', value: item.HandlebarStyle      })
        attributeList.push({name: 'Lens Style', value: item.LensStyle   })
        attributeList.push({name: 'Load Rating', value: item.LoadRating  })
        attributeList.push({name: 'Material', value: item.Material      })
        attributeList.push({name: 'Seat Style', value: item.SeatStyle      })
        attributeList.push({name: 'Seat Width Driver', value: item.SeatWidthDriver   })
        attributeList.push({name: 'Seat Width Passenger', value: item.SeatWidthPassenger     })
        attributeList.push({name: 'Shape', value: item.Shape     })
        attributeList.push({name: 'Sizing', value: item.Sizing    })
        attributeList.push({name: 'Speed', value: item.Speed      })
        attributeList.push({name: 'Spring Rate', value: item.SpringRate})
        attributeList.push({name: 'Sprocket Position', value: item.SprocketPosition   })
        attributeList.push({name: 'Sprocket Teeth', value: item.SprocketTeeth      })
        attributeList.push({name: 'Sprocket Size', value: item.SprocketSize      })
        attributeList.push({name: 'Thickness', value: item.Thickness      })
        attributeList.push({name: 'Tire Application', value: item.TireApplication    })
        attributeList.push({name: 'Tire Construction', value: item.TireConstruction      })
        attributeList.push({name: 'Tire Ply', value: item.TirePly      })
        attributeList.push({name: 'Tire Rim Offset', value: item.TireRimOffset      })
        attributeList.push({name: 'Tire Speed Rating', value: item.TireSpeedRating     })
        attributeList.push({name: 'Tire Type', value: item.TireType    })
        attributeList.push({name: 'Wheel Diameter', value: item.WheelDiameter     })
        attributeList.push({name: 'Wheel Disc', value: item.WheelDisc     })
        attributeList.push({name: 'Wheel Spoke Count', value: item.WheelSpokeCount    })
        attributeList.push({name: 'Wheel Spoke Finish', value: item.WheelSpokeFinish    })
        attributeList.push({name: 'Wheel Width', value: item.WheelWidth      })


        for (let i of attributeList){
          //let errors = []
          if (i.value) {
            attributesProduct.push({id: props.attributes.find(item => item.name === i.name) ? props.attributes.find(item => item.name === i.name).id : "ERROR", value: i.value, option: false  })
            if (!props.attributes.find(item => item.name === i.name)){
              console.log({sku: item.SKU, value: i.value })
            }
            //console.log(i.name)
            //console.log(props.attributes.find(item => item.name === i.name).id)
          }
        }

        //console.log("item sku", item.SKU, " ***************************")
        //console.log(JSON.stringify(attributesProduct))
        let attributesString = JSON.stringify(attributesProduct) ? JSON.stringify(attributesProduct) : ""
        
        //id	SKU	legacyID	mpn	Attributes	parentSKU	source	brandID	manufacturerID	categoryID	subcategoryID	subcategory2ID	ebaystorecategoryID	binLocation	title	
        //description	bulletPoints	images	handle	weight	dimensionalWeight	appliedWeight	dimensions	shopifyFitmentTags	shopifyOnlyTags	price	cost	options	
        //updateFlag	status	shopifyMetaTitle	shopifyMetaDescription

        //SKU	MPN	Source	BinLocation	Brand	BrandID	ManufacturerID	PartsSKU	TuckerSKU	WPSSKU	ItemName	BodyDescription	Handle	Category	CategoryID	
        //SubCategory	SubCategoryID	SubCategory2	SubCategory2ID	Weight	Height	Length	Width	ShopifyFitmentTags	
        //ShopifyOnlyTags	Image	ApparelGender	ApparelMaterial	ApparelSize	ApparelSizeSegment	ApparelSizeModifier	ApparelStyle	BatteryCode	
        //BearingSize	BoltPattern	Bore	Compression	ContainerSize	Diameter	HandlebarBlinkers	HandlebarClampingDiameter	HandlebarConfiguration	
        //HandlebarControlColor	HandlebarPullback	HandlebarRise	HandlebarDiameter	HandlebarSwitchColor	HandlebarStyle	HandlebarWidth	LensStyle	LoadRating	
        //Material	Pitch	SeatStyle	SeatWidthDriver	SeatWidthPassenger	Shape	Sizing	Speed	SpringRate	SprocketPosition	SprocketTeeth	SprocketSize	
        //Thickness	TireApplication	TireConstruction	TirePly	TireRimOffset	TireSpeedRating	TireType	WheelDiameter	WheelDisc	WheelSpokeCount	WheelSpokeFinish
        //	WheelWidth	OptionName1	OptionValue1	OptionName2	OptionValue2	OptionName3	OptionValue3	OptionName4	OptionValue4	OptionName5	
        //OptionValue5	MSRP	Cost	ListPrice	MyStorePrice	SellPrice	UpdateFlag

        let product = {
          SKU: item.SKU,
          legacyID: "",
          mpn: item.MPN,
          Attributes: attributesString ? attributesString : '',
          parentSKU: item.BinLocation ? item.BinLocation: '',
          //source: {"warehouse":  item.Source === 'DEMONS' ? true : false ,"dropship": item.Source === 'DROPSHIP' ? true : false},
          sourceWarehouse: item.Source === 'DEMONS' ? true : false,
          sourceDropship: item.Source === 'DROPSHIP' ? true : false,
          brandID: item.BrandID ? item.BrandID : '',
          manufacturerID: item.ManufacturerID ? item.ManufacturerID : "" ,
          categoryID: item.CategoryID ? item.CategoryID : undefined,
          subcategoryID: item.SubCategoryID ? item.SubCategoryID : undefined,
          subcategory2ID: item.SubCategory2ID ? item.SubCategory2ID : undefined,
          ebaystorecategoryID: undefined,
          binLocation: '',
          //title: { store: item.ItemName ? item.ItemName : '' },
          titleStore: item.ItemName ? item.ItemName : '', 
          descriptionStore: item.BodyDescription ? item.BodyDescription : '',
          //description: { store: item.BodyDescription ? item.BodyDescription : ''},
          handle: item.Handle ? item.Handle : '',
          weight: item.Weight ? item.Weight : 0,
          dimensionalWeight: item.Weight ? item.Weight : 0,
          appliedWeight: item.Weight ? item.Weight : 0,
          //dimensions: {height: item.Height ? item.Height : 0, length: item.Length ? item.Length : 0, width: item.Width ? item.Width : 0},
          dimensionHeight: item.Height ? item.Height : 0,
          dimensionLength: item.Length ? item.Length : 0,
          dimensionWidth: item.Width ? item.Width : 0,          
          shopifyFitmentTags: item.ShopifyFitmentTags ? item.ShopifyFitmentTags : '',
          shopifyOnlyTags: item.ShopifyOnlyTags ? item.ShopifyOnlyTags : '',
          //price: {"MSRP": item.MSRP ? item.MSRP : 0},
          priceMSRP: item.MSRP ? item.MSRP : 0,
          cost: item.Cost ? item.Cost : 0,
          status: 'Active',
          shopifyMetaTitle: '',
          shopifyMetaDescription: ''
        }

        console.log(product)


        //}

        await updateProducts(product)
      }
      setTimeout(() => {
        toast({
            type: 'success',
            icon: 'check circle outline',
            size: 'tiny',              
            description: 'Products successfully updated',
            time: 2000,              
        })
      }, 200
      )
      } catch (error) {
        console.log(error)
      }
    }
    
    const readUploadNewProducts = (e) => {
      e.preventDefault();
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = xlsx.utils.sheet_to_json(worksheet);
              //console.log(json);
              handleApplyProductsChanges(json)
          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
  }

  const updateItem = async (item) => {
    try {
      //console.log(item.id)
      //console.log(item._version)

      let productDetails = {
        id: item.id,
        sourceDropship: item.source ? item.source.dropship : '',
        sourceWarehouse: item.source ? item.source.warehouse : '',
        titleStore: item.title ? item.title.store : '',
        titleEbay: item.title ? item.title.ebay : '',
        titleAmazon: item.title ? item.title.amazon : '',
        descriptionStore: item.description ? item.description.store : '',
        descriptionEbay: item.description ? item.description.ebay : '',
        descriptionAmazon: item.description ? item.description.amazon : '',
        priceMSRP: item.price ? item.price.MSRP : 0,
        dimensionHeight: item.dimensions ? item.dimensions.height : 0,
        dimensionLength: item.dimensions ? item.dimensions.length : 0,
        dimensionWidth: item.dimensions ? item.dimensions.width : 0,
        _version: item._version
      }
      console.log("=================", productDetails, "========================")
      await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
      



    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateFields = async () => {
    //let productsTemp = await API.graphql(graphqlOperation(listProducts, {limit: 1000, nextToken: tokenLeft }))
    let productsTemp = await API.graphql(graphqlOperation(listProducts, {limit: 1000 }))
    let productList = productsTemp.data.listProducts.items   
    let token = productsTemp.data.listProducts.nextToken
    console.log("ESSSSSSSSSSTE ES EL TOKEN: ", token)
    
    while (token) {

      let productsPart = await API.graphql(graphqlOperation(listProducts, {limit: 1000, nextToken: token }))
      token = productsPart.data.listProducts.nextToken
      productList = productList.concat(productsPart.data.listProducts.items)

    }

    console.log(productList.length)
    
    let n = 33500
    //console.log(productsTemp)
    try {

      for (let item of productList.slice(0,5)){
        n++
        console.log(n)
        updateItem(item)
      }

    } catch(error) {
      console.log(error)
    }
  }

  const readUploadUpdate = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            //console.log(json);
            handleUpdateFieldsFromExcel(json)
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

const updateFields = async (item) => {
  try {
    let itemDetails = {
      id: item.id,     
      appliedWeight: item.appliedWeight,
      Attributes: item.Attributes,
      brandID: item.brandID,
      bulletPoints: item.bulletPoints,
      categoryID: item.categoryID,
      cost: item.cost,
      descriptionAmazon: item.descriptionAmazon,
      descriptionEbay: item.descriptionEbay,
      descriptionStore: item.descriptionStore,
      dimensionalWeight: item.dimensionalWeight,
      dimensionHeight: item.dimensionHeight,
      dimensionLength: item.dimensionLength,
      dimensionWidth: item.dimensionWidth,
      legacyID: item.legacyID,
      manufacturerID: item.manufacturerID,
      mpn: item.mpn,
      parentSKU: item.parentSKU,
      priceAmazon: item.priceAmazon,
      priceEbay: item.priceEbay,
      priceMAP: item.priceMAP,
      priceMSRP: item.priceMSRP,
      priceScratchHigh: item.priceScratchHigh,
      priceScratchLow: item.priceScratchLow,
      priceStore: item.priceStore,
      priceWholesaleHigh: item.priceWholesaleHigh,
      priceWholesaleLow: item.priceWholesaleLow,
      shopifyFitmentTags: item.shopifyFitmentTags,
      shopifyMetaDescription: item.shopifyMetaDescription,
      shopifyMetaTitle: item.shopifyMetaTitle,
      shopifyOnlyTags: item.shopifyOnlyTags,
      SKU: item.SKU,
      sourceDropship: item.sourceDropship,
      sourceWarehouse: item.sourceWarehouse,
      subcategory2ID: item.subcategory2ID,
      subcategoryID: item.subcategoryID,
      titleAmazon: item.titleAmazon,
      titleEbay: item.titleEbay,
      titleStore: item.titleStore,
      weight: item.weight,
      handle: item.handle,
      status: item.status,
      //code: item.code, 
      //_version: item.version
    }
    console.log("=================", itemDetails, "========================")
    let result = await API.graphql(graphqlOperation(createProduct, { input: itemDetails }))
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

const updateHandlebar = async (item) => {
  try {
    //console.log(item.id)
    //console.log(item._version)

    let productDetails = {
      id: item.id,
      /*sourceDropship: item.source ? item.source.dropship : '',
      sourceWarehouse: item.source ? item.source.warehouse : '',
      titleStore: item.title ? item.title.store : '',
      titleEbay: item.title ? item.title.ebay : '',
      titleAmazon: item.title ? item.title.amazon : '',
      descriptionStore: item.description ? item.description.store : '',
      descriptionEbay: item.description ? item.description.ebay : '',
      descriptionAmazon: item.description ? item.description.amazon : '',
      priceMSRP: item.price ? item.price.MSRP : 0,
      dimensionHeight: item.dimensions ? item.dimensions.height : 0,
      dimensionLength: item.dimensions ? item.dimensions.length : 0,
      dimensionWidth: item.dimensions ? item.dimensions.width : 0,*/
      handle: item.handle, 
      _version: item.version
    }
    console.log("=================", productDetails, "========================")
    let result = await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
    console.log(result)



  } catch (error) {
    console.log(error)
  }
}

const readUploadUpdateImages = (e) => {
  e.preventDefault();
  if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          //console.log(json);
          handleUpdateImages(json)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
  }
}

const updateImages = async (itemList) => {
  try {
    let tempList = []
    for (const item of itemList) {
        
      

      console.log("ESTE ES EL TIPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:", item.SKU)

      if (item.image) {
        let name = item.image.split('/')[item.image.split('/').length-1].split('?')[0]
        const res = await axios.get(item.image, {responseType: 'arraybuffer'})
        let type = res.headers['content-type']
          let file = res.data          
          const result = await Storage.put(name, file, {
            level: "public",
            contentType: type,
          })
          //let type = 'image/jpeg'
          tempList.push({data_url: urlBase + name, file: {type: type, name: name}})
      
      }
      if (item.variant_image && item.variant_image !== item.image) {
        let name = item.variant_image.split('/')[item.variant_image.split('/').length-1].split('?')[0]
        const res = await axios.get(item.variant_image, {responseType: 'arraybuffer'})
        let type = res.headers['content-type']
          let file = res.data          
          const result = await Storage.put(name, file, {
            level: "public",
            contentType: type,
          })
          //let type = 'image/jpeg'
          tempList.push({data_url: urlBase + name, file: {type: type, name: name}})        
      }
      
    }

    //images: JSON.stringify(imageList),
    
    let product = await API.graphql(
      graphqlOperation(searchProducts, {
        
        filter: {SKU: { eq: itemList[0].SKU }},
        
    }))

    let id = product.data.searchProducts.items[0].id
    let version = product.data.searchProducts.items[0]._version       
    
    const productDetails = {
      id: id,
      images: JSON.stringify(tempList),
      _version: version
    };
    await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
    
    //console.log(JSON.stringify(tempList))


      //console.log("=================", itemDetails, "========================")
      //let result = await API.graphql(graphqlOperation(createProduct, { input: itemDetails }))
      //console.log(result)
      /*for (let item of itemList) {
        console.log(item.SKU)
        console.log(item.variant_image)
        console.log(item.image)
      }*/
      //console.log(tempList)  
      //console.log(item)
  } catch (error) {
      console.log(error)
  }
}


const handleUpdateImages = async (excelFile) => {
  /*let url = 'https://cdn.shopify.com/s/files/1/0338/9682/4876/products/28891013_600x.jpg'
  const res = await axios.get(url, {responseType: 'arraybuffer'})
  
  let type = res.headers['content-type']
  let file = res.data
  console.log(file)
  const result = await Storage.put('testbueno8.jpg', file, {
    level: "public",
    contentType: type,
  })*/
  try {

    let n = 1
    let oldSKU = ""
    
    let itemList = []    

      for (let item of excelFile.slice(50556,50823)){
        console.log(" **************** ",n++," *************")
        //console.log(item)
        console.log("***************************************")       
        if (item.SKU){
          itemList = []
          //console.log("** NO VACIO **")
          oldSKU = item.SKU
          itemList.push(item)
        } else {
          //console.log("******* VACIO ******")
          itemList.push({SKU: oldSKU, variant_image: item.variant_image, image: item.image })
        }

        if (oldSKU === item.SKU){
          //console.log(itemList)
          await updateImages(itemList)

        }
        /*console.log("ITEM.SKU: ", item.SKU) 
        console.log("OLDITEM.SKU: ", oldItem.SKU)
       

        if (item.SKU && item.SKU !== oldItem.SKU){
          await updateImages(itemList)
          itemList = []
        }   

      
        
        if (item.SKU){
          oldItem = {...item}
          itemList.push(item)
        } else {
          itemList.push(oldItem)
        }*/

         

        
        /*console.log("item.SKU: ", item.SKU)
        console.log("oldItem.SKU: ", oldItem.SKU)*/
            

      }

    } catch(error) {
      console.log(error)
    }

}

  const handleUpdateFieldsFromExcel = async (excelFile) => {
    /*let productsTemp = await API.graphql(graphqlOperation(listProducts, {limit: 1000 }))
    let productList = productsTemp.data.listProducts.items   
    let token = productsTemp.data.listProducts.nextToken
    console.log("ESSSSSSSSSSTE ES EL TOKEN: ", token)*/
    
    /*const productList = await DataStore.query(Product, c=> c.sourceWarehouse("eq", true),{
      //page: 2,
      //limit: 500,
    })*/

    //const productList = await DataStore.query(Product, Predicates.ALL)

    //const products = productList ? productList.filter(item => !item._deleted) : []

    /*while (token) {

      let productsPart = await API.graphql(graphqlOperation(listProducts, {limit: 1000, nextToken: token }))
      token = productsPart.data.listProducts.nextToken
      productList = productList.concat(productsPart.data.listProducts.items)

    }*/

    //console.log(productList.length)
    //console.log(products[0])
    
    //let n = 0
    try {
      /*let productsTemp = await API.graphql(graphqlOperation(listProducts, {limit: 1000 }))
      let productList = productsTemp.data.listProducts.items   
      let token = productsTemp.data.listProducts.nextToken
      console.log("ESSSSSSSSSSTE ES EL TOKEN: ", token)
      let n = 0
      while (token) {

        let productsPart = await API.graphql(graphqlOperation(listProducts, {limit: 1000, nextToken: token }))
        token = productsPart.data.listProducts.nextToken
        productList = productList.concat(productsPart.data.listProducts.items)
  
      }*/
      let n = 1

      

      for (let item of excelFile.slice(30100,30324)){
        console.log(" **************** ",n++," *************")
        //console.log(item.SKU)
        console.log(" ***********************************")
        

        /*const listProductsQuery = `query syncProducts {
          syncProducts(filter: {SKU: {eq: "${item.SKU}"}}) {
            items {
              id,
              handle,
              _version        
            }
          }
        }`*/
      
        //const allProducts = await API.graphql(graphqlOperation(listProductsQuery))
        
        //let product = allProducts.data.syncProducts.items[0]
        //let id = item.id
        //let version = product._version 
        //let name = item.name
        //let code = item.code
        //let options = item.options
        //console.log({ id, handle, version })
        //await updateHandlebar({ id, handle, version })
        //await updateFields({ id, options, version })
        //await updateFields({ id, name })
        await updateFields(item)

      
      }
      /*console.log("***************************************")
      for (let item of excelFile.slice(0,1)){
        const productItem = await DataStore.query(Product, c=> c.SKU("eq", item.SKU))
        console.log(productItem)
        n++
        //let id = '0' //productList[0].id
        console.log(n)
        //console.log( product.id + ' - ' + item.SKU + ' - ' + ' - ' + item.handle)
        //updateHandlebar(item)
      }*/
      //const productItem = await DataStore.query(Product, c=> c.SKU("eq", item.SKU))
      //console.log(productItem)
      /*let filter = {
        'SKU': {
          eq: '126051'
        }
      }

      const oneProduct = await API.graphql({ query: listProducts, variables: { filter: filter }})
      ConsoleLogger.LOG_LEVEL(oneProduct)*/

    } catch(error) {
      console.log(error)
    }
  }

  if (!products) {  

    return (
        
        <Container>

            <Loader active style = {{top:350}} />        
        </Container>
        
    )
  }
      
      
  
    return (

      <div>  

       
        
        <div style={divStyle}>
        <SemanticToastContainer position="top-center" />
        <h1>Export Files</h1>
        
        <div><Menu compact>
          <Menu.Item as='a'>
            <Icon name='tag' /> Modified products
              {products && products.length > 0 ? 
              <Label color='teal' floating>
                {products.length}
              </Label>
              : ""
              }
          
          </Menu.Item>
          <Menu.Item as='a' onClick={() => setOpen(true)}>
            <Icon name='erase' color="red" />Reset
          </Menu.Item>  
        </Menu></div>
        <Confirm
          open={open}
          header='Warning! - Clean registry of modified products'
          content='If you have already downloaded the latest product change files, you can clean the registry and start with a new list'
          onCancel={()=>setOpen(false)}
          onConfirm={() => handleUpdateFlag()}
        />

        <Step.Group>
          <Step disabled={!(products && products.length > 0)}>
            <Icon name='download' />
            <Step.Content>
                <Step.Title>Flxpoint</Step.Title>
              <Step.Description>
                <CSVLink
                      separator={";"}
                      enclosingCharacter={`'`} 
                      data={data} 
                      headers={headers}
                      filename={"flxpoint_export_file.csv"}
                      className="btn btn-primary"
                      target="_blank"
                      //onClick={() => handleUpdateFlag()}
                      >
                      Download CSV File to update Feed in FlxPoint
                  </CSVLink>
              </Step.Description>
            </Step.Content>
          </Step>
          <Step disabled={!(products && products.length > 0)}>
            <Icon name='download' />
            <Step.Content>
              <Step.Title>Shopify Metafields</Step.Title>
              <Step.Description>
                <CSVLink
                      separator={";"}
                      enclosingCharacter={`'`} 
                      data={dataMetafields} 
                      headers={headersMetaFields}
                      filename={"shopify_metafields_export_file.csv"}
                      className="btn btn-primary"
                      target="_blank"
                      //onClick={() => handleUpdateFlag()}
                      >
                      Download CSV File to update Metafields in Shopify
                  </CSVLink>
              </Step.Description>
            </Step.Content>
          </Step>
          <Step disabled={!(products && products.length > 0)}>
            <Icon name='download' />
            <Step.Content>
              <Step.Title>eBay File Exchange</Step.Title>
              <Step.Description>
              <CSVLink
                      separator={";"}
                      enclosingCharacter={`'`} 
                      data={dataReviseEbay} 
                      headers={headersReviseEbay}
                      filename={"ebay_FileExchange_revise_file.csv"}
                      className="btn btn-primary"
                      target="_blank"
                      //onClick={() => handleUpdateFlag()}
                      >
                      Download CSV File to Update listings on Ebay using File Exhange
                  </CSVLink>                
                </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
       
      </div>    
      {/*<Button onClick={()=>handleUpdateImages()}>Upload Images</Button>*/}

      {/*<label htmlFor="upload">Update images</label><br></br>
          <input
              type="file"
              name="upload"
              id="upload"
              onChange={readUploadUpdateImages}
            />*/}

      </div>
    
    );
    
  }

  const divStyle = {
    margin: '3em'
  };

  const paginationStyle = {
    display: "flex",
          justifyContent: "center",
          alignItems: "center"
  }