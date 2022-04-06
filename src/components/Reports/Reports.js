import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { searchProducts, listBrands, syncProducts, listCategories, listSubCategories, listSubCategory2s, listEbayStoreCategories, listAttributes, getProduct } from '../../graphql/queries'
import { Button, Icon, Label, Grid } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'


export default function Reports(props) {

  const urlBase = 'https://demons-cycle-storage202642-devt.s3.amazonaws.com/public/'

  const [products, setProducts] = useState(null)
  const [productsDemons, setProductsDemons] = useState(null)
  const [productsDropship, setProductsDropship] = useState(null)
  const [processingDemons, setProcessingDemons] = useState(false)
  const [processingDropship, setProcessingDropship] = useState(false)
  const [dataDemons, setDataDemons] = useState([])
  const [dataDropship, setDataDropship] = useState([])

  let headers = [
    { label: "SKU", key: "SKU" },
    { label: "MPN", key: "MPN" },
    { label: "Brand", key: "Brand" },
    { label: "Parent", key: "Parent" },        
    { label: "Title", key: "Title" },
    { label: "Description", key: "Description" },
    { label: "Category", key: "Category" },
    { label: "SubCategory", key: "SubCategory" },
    { label: "Weight", key: "Weight" },
    { label: "Height", key: "Height" },
    { label: "Length", key: "Length" },
    { label: "Width", key: "Width" },
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
    { label: "Price", key: "Price" },
    { label: "Cost", key: "Cost" },
    { label: "MAP", key: "MAP" },
  ];
  

  const handleGenerateReportDemons = async () => {
    try {
        console.log("Generating Report demons")
        setProcessingDemons(true)
        
        const allProducts = await API.graphql(graphqlOperation(syncProducts, {
          limit: 1000,
          filter: {sourceWarehouse: {eq: true}, sourceDropship: {eq: false}, status: {eq: 'Active'}}
        }))
        
        let nextToken = allProducts.data.syncProducts.nextToken
        let products = allProducts.data.syncProducts.items

        while (nextToken) {
          const allProducts = await API.graphql(graphqlOperation(syncProducts, {
            limit: 1000,
            filter: {sourceWarehouse: {eq: true}, sourceDropship: {eq: false}, status: {eq: 'Active'}},
            nextToken: nextToken
          }))
          nextToken = allProducts.data.syncProducts.nextToken
          products = products.concat(allProducts.data.syncProducts.items)
        }

        setProcessingDemons(false)
        setProductsDemons(products)
        let result = []
        
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
          
          //let sourceWarehouse = item.sourceWarehouse ? item.sourceWarehouse : false
          //let sourceDropship = item.sourceDropship ? item.sourceDropship : false
          let attributesParse = item.Attributes ? JSON.parse(item.Attributes) : []

          let product = { 
              SKU: item.SKU, MPN: item.mpn,
              Brand: brandName, Parent: item.parentSKU, Title: title,
              Description: description, Category: categoryName, SubCategory: subCategoryName,
              Weight: Weight, Height: height, Length: length, Width: width,
              Price: MSRP, Cost: item.cost,
              MAP: MAP, Image1: image1, Image2: image2, Image3: image3, Image4: image4, Image5: image5                     
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
              
          }

          result.push(product)
      
      }

      console.log(result)
      setDataDemons(result)


    } catch(error){
      setProcessingDemons(false)
    }
  }

  const handleGenerateReportDropship = async () => {
    try {
        console.log("Generating Report dropship")
        setProcessingDropship(true)
        
        const allProducts = await API.graphql(graphqlOperation(syncProducts, {
          limit: 1000,
          filter: {sourceWarehouse: {eq: false}, sourceDropship: {eq: true}, status: {eq: 'Active'}}
        }))
        
        let nextToken = allProducts.data.syncProducts.nextToken
        let products = allProducts.data.syncProducts.items

        while (nextToken) {
          const allProducts = await API.graphql(graphqlOperation(syncProducts, {
            limit: 1000,
            filter: {sourceWarehouse: {eq: false}, sourceDropship: {eq: true}, status: {eq: 'Active'}},
            nextToken: nextToken
          }))
          nextToken = allProducts.data.syncProducts.nextToken
          products = products.concat(allProducts.data.syncProducts.items)
        }

        setProcessingDropship(false)
        setProductsDropship(products)
        
        let result = []
        
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
          
          //let sourceWarehouse = item.sourceWarehouse ? item.sourceWarehouse : false
          //let sourceDropship = item.sourceDropship ? item.sourceDropship : false
          let attributesParse = item.Attributes ? JSON.parse(item.Attributes) : []

          let product = { 
              SKU: item.SKU, MPN: item.mpn,
              Brand: brandName, Parent: item.parentSKU, Title: title,
              Description: description, Category: categoryName, SubCategory: subCategoryName,
              Weight: Weight, Height: height, Length: length, Width: width,
              Price: MSRP, Cost: item.cost,
              MAP: MAP, Image1: image1, Image2: image2, Image3: image3, Image4: image4, Image5: image5                     
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
              
          }

          result.push(product)
      
      }

      console.log(result)
      setDataDropship(result)


    } catch(error){
      setProcessingDropship(false)
    }
  }

  

    return (
      <div style={divStyle}>
        <SemanticToastContainer position="top-center" />
        <h1>Reports</h1>

        <Grid columns={4} style={{paddingTop: 20}}>
          <Grid.Row>
              <Grid.Column>
                  <Button as='div' labelPosition='right' onClick={()=>handleGenerateReportDemons()} >
                    <Button icon loading={processingDemons ? true : false}>
                      <Icon name='table' />
                      Generate Report
                    </Button>
                    <Label as='a' basic pointing='left'>
                      Demon's Products
                    </Label>
                  </Button>
              </Grid.Column>

              <Grid.Column>
                  <Button as='div' labelPosition='right' onClick={()=>handleGenerateReportDropship()}>
                    <Button icon loading={processingDropship ? true : false}>
                      <Icon name='table' />
                      Generate Report
                    </Button>
                    <Label as='a' basic pointing='left'>
                      Dropship Products
                    </Label>
                  </Button>
              </Grid.Column>
            
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                  {productsDemons ? 
                    
                    <CSVLink
                      separator={";"}
                      enclosingCharacter={`'`} 
                      data={dataDemons} 
                      headers={headers}
                      filename={"report_all_demons_products.csv"}
                      className="btn btn-primary"
                      target="_blank"
                      >
                      Download Report in a CSV File
                  </CSVLink>                    
                    

                  : <span></span>}
              </Grid.Column>

              <Grid.Column>
                {productsDropship ? 
                      
                      <CSVLink
                        separator={";"}
                        enclosingCharacter={`'`} 
                        data={dataDropship} 
                        headers={headers}
                        filename={"report_all_dropship_products.csv"}
                        className="btn btn-primary"
                        target="_blank"
                        >
                        Download Report in a CSV File
                    </CSVLink>                    
                      

                    : <span></span>}
              </Grid.Column>
            
            </Grid.Row>
        </Grid>


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