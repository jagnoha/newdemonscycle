import React, {useState, useRef, memo} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image, TextArea } from 'semantic-ui-react'
import ImageUploading from 'react-images-uploading'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
/*import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'*/



export default function CreateProductForm(props) {

  const editor = useRef(null)

  let brands = props.brands.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let manufacturers = props.manufacturers.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let categories = props.categories.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let subCategories = props.subCategories.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let subCategories2 = props.subCategories2.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let ebayStoreCategorys = props.ebayStoreCategorys.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  let attributes = props.attributes.map(item => { return {key: item.id, text: item.name, value: item.id } } ).sort( (a,b) => {
    let nameA = a.text.toUpperCase()
    let nameB = b.text.toUpperCase()
    if (nameA < nameB){
      return -1                                      
    }
    if (nameA > nameB){
      return 1
    }
    return 0
  })
  //let statusList = [{key: 1, text: "Active", value: '1'},{key: 0, text: "Draft", value: '0'}]
  const [addImageVisible, setAddImageVisible] = useState(false)

  

  

  /*const config = {
    readonly: false,
    height: 400,
    spellcheck: false,
  };*/

  
  
  //console.log(brands)
  const modules = {
    toolbar: [
      [{ header: ['1','2','3','4','5','6']}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  
  
  return (
    <Form>
                    
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={12}>
                    <Form.Field required>
                      <label>SKU</label>
                      <input placeholder='Product SKU'
                        value = {props.sku}
                        onChange = {props.blockSKU === false ? props.handleSKU : () => console.log("blocked")}
                      />
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Active' onChange={props.handleStatus} checked={props.status === 'Active' ? true : false} />
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={10}>
                    <Form.Field>
                      <label>Parent SKU</label>
                      <input placeholder='Parent SKU' 
                        value = {props.parentSKU}                         
                        //onBlur = {props.handleParentSKU}
                        onChange={props.handleParentSKU }
                        />
                        
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Form.Field>
                      <label>Legacy Id</label>
                      <input placeholder='Legacy Id' 
                        value = {props.legacyId}
                        onChange = {props.handleLegacyId}
                      />
                      </Form.Field>
                      </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={12}>
                    <Segment raised >
                        <Header>Source <span style={{fontSize:0.8,"color":"red"}}>*</span></Header>
                    <Form.Group>
                      <Form.Field control={Checkbox} toggle label='Warehouse' onChange={props.handleSourceWarehouse} checked={props.sourceWarehouse} />
                      <Form.Field control={Checkbox} toggle label='Dropship' onChange={props.handleSourceDropship} checked={props.sourceDropship} />
                    </Form.Group>
                    </Segment>
                    </Grid.Column>
                    <Grid.Column width={4} >
                    <Form.Field>
                      <label>Bin Location</label>
                      <input placeholder='Bin Location' 
                        value = {props.binLocation} 
                        onChange={props.handleBinLocation }/>
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Divider></Divider>
                      

                      
                     
                    <Form.Field>
                      <label>Manufacturer Part Number</label>
                      <input placeholder='Manufacturer Part Number' 
                        value = {props.mpn} 
                        onChange={props.handleMPN }/>
                    </Form.Field>

                    <Grid>
                      <Grid.Row>
                          <Grid.Column width={8}>
                              <Form.Field>
                              <label>Brand</label>
                                <Dropdown placeholder='Select Brand' search searchInput={{ type: 'text' }} selection 
                                  options={brands} 
                                  onChange={props.handleBrand}
                                  value = {props.valueBrand}
                                  //loading
                                  />                       
                              </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <Form.Field>
                              <label>Manufacturer</label>
                                <Dropdown placeholder='Select Manufacturer' search searchInput={{ type: 'text' }} selection 
                                  options={manufacturers} 
                                  onChange={props.handleManufacturer}
                                  value = {props.valueManufacturer}
                                  //loading
                                  />                       
                              </Form.Field>  
                            </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Segment raised >
                    <Header>Images</Header>
                    <ImageUploading
                        multiple
                        value={props.images}
                        onChange={props.handleImages}
                        maxNumber={10}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps
                        }) => (
                          // write your building UI
                          
                          
                          
                          <div>
                            
                             <Card.Group itemsPerRow={6}>
                            {imageList.map((image, index) => (
                              
                              <Card key={index}>
                              <Card.Content>
                              
                              <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                
                                
                              </div>
                              </Card.Content>
                              <Card.Content extra>
                              <div className='ui two buttons'>
                              <Button color='blue' title='Update this Image' icon size={'small'} onClick={() => onImageUpdate(index)}>
                                      <Icon name='edit' />
                                  </Button>
                                  <Button negative title='Remove this Image' icon size={'small'} onClick={() => onImageRemove(index)}>
                                      <Icon name='trash' />
                                  </Button>
                              </div>
                              </Card.Content>

                                  </Card>

                              
                                  
                                  
                                  
                                  
                                  
             
                                
                                
                                
                            
                            
                            
                            ))}
                            </Card.Group>
                            <Divider />
                            <Button
                                content={addImageVisible ? 'Cancel' : 'Add Images'}
                              onClick={() => setAddImageVisible(!addImageVisible)}
                              icon= {addImageVisible ? "cancel" : "add"}
                              primary = {!addImageVisible}
                              negative = {addImageVisible}
                              //icon = {"add"}
                            />
                             <Button basic color='red' icon = {"trash"} onClick={onImageRemoveAll} content={"Remove all images"} />
                           
                            
                            <Transition visible={addImageVisible} animation='scale' duration={500}>
                              
                            <div style={{marginTop:15}}>
                            <Button size={'massive'} onClick={onImageUpload} style={isDragging ? { color: "red" } : null}
                              {...dragProps} fluid>
                                <Icon name='upload'></Icon>
                                Drop files here or click to upload
                               </Button>
                            </div>  
                            </Transition>

                            
                            &nbsp;
                           


                          </div>



                        )}
                    </ImageUploading>


                    </Segment>


                   
                    <Segment raised >
                        <Header>Title</Header>
                    
                        <Form.Field>
                          <label>Store</label>
                          <input placeholder='Store Title' 
                            value = {props.titleStore} 
                            onChange={props.handleTitleStore }
                            />
                            
                        </Form.Field>
                        
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                          <Form.Field>
                          <label>eBay - <span style={{"font-size":"0.9em","color":"gray"}}>({props.ebayChars}/80) chars</span></label>
                          <input placeholder='eBay Title' 
                            value = {props.titleEbay} 
                            onChange={props.handleTitleEbay }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Form.Field>
                          <label>Amazon</label>
                          <input placeholder='Amazon Title' 
                            value = {props.titleAmazon} 
                            onChange={props.handleTitleAmazon }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Description</Header>

                        

                    <Form.Field>
                        <label id="store"><h3>Store</h3></label>
                        {<ReactQuill 
                          theme="snow" 
                          value={props.descriptionStore ? props.descriptionStore : ""} onChange={props.handleDescriptionStore}
                          modules={modules}
                          //scrollingContainer='#store'
                          //readOnly={true}
                          //scrollingContainer
                          //formats={formats}
                          
                        />}

                       

                      </Form.Field>
                        
                        
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                          <Form.Field> 
                        <label><h3>eBay</h3></label>
                        {<ReactQuill 
                          theme="snow" 
                          value={props.descriptionEbay ? props.descriptionEbay : ""} onChange={props.handleDescriptionEbay}
                          modules={modules}
                          //style = {{fontSize: '18px',overflowY: 'visible' }}
                          //formats={formats}
                          
                        />}
                              </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <label><h3>Amazon</h3></label>
                           
                            {<ReactQuill 
                          theme="snow" 
                          value={props.descriptionAmazon ? props.descriptionAmazon : ""} onChange={props.handleDescriptionAmazon}
                          modules={modules}
                            />}
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Bullet Points</Header>
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={4}>
                          <Form.Field>
                          <label>Bullet 1</label>
                          <input placeholder='Bullet point 1' 
                            value = {props.bullet1} 
                            onChange={props.handleBullet1 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Form.Field>
                          <label>Bullet 2</label>
                          <input placeholder='Bullet point 2' 
                            value = {props.bullet2} 
                            onChange={props.handleBullet2 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Form.Field>
                          <label>Bullet 3</label>
                          <input placeholder='Bullet point 3' 
                            value = {props.bullet3} 
                            onChange={props.handleBullet3 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Form.Field>
                          <label>Bullet 4</label>
                          <input placeholder='Bullet point 4' 
                            value = {props.bullet4} 
                            onChange={props.handleBullet4 }/>
                        </Form.Field>
                        </Grid.Column>


                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={5}>
                          <Form.Field>
                          <label>Bullet 5</label>
                          <input placeholder='Bullet point 5' 
                            value = {props.bullet5} 
                            onChange={props.handleBullet5 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <Form.Field>
                          <label>Bullet 6</label>
                          <input placeholder='Bullet point 6' 
                            value = {props.bullet6} 
                            onChange={props.handleBullet6 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Form.Field>
                          <label>Bullet 7</label>
                          <input placeholder='Bullet point 7' 
                            value = {props.bullet7} 
                            onChange={props.handleBullet7 }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={8}>
                    <Form.Field>
                    <label>Category</label>
                      <Dropdown placeholder='Select Category' search searchInput={{ type: 'text' }} selection 
                         options={categories} 
                         onChange={props.handleCategory}
                         value = {props.valueCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                    <label>SubCategory</label>
                      <Dropdown placeholder='Select SubCategory' search searchInput={{ type: 'text' }} selection 
                         options={subCategories} 
                         onChange={props.handleSubCategory}
                         value = {props.valueSubCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                    <Form.Field>
                    <label>SubCategory 2</label>
                      <Dropdown placeholder='Select SubCategory 2' search searchInput={{ type: 'text' }} selection 
                         options={subCategories2} 
                         onChange={props.handleSubCategory2}
                         value = {props.valueSubCategory2}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                    <label>eBay Store Category</label>
                      <Dropdown placeholder='Select eBay Store Category' search searchInput={{ type: 'text' }} selection 
                         options={ebayStoreCategorys} 
                         onChange={props.handleEbayStoreCategory}
                         value = {props.valueEbayStoreCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <Divider></Divider>

                    <Segment raised >
                        <Header>Dimensions</Header>
                        
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Height</label>
                          <input type='number' min="0" step="any" placeholder='Height in inches' 
                            value = {props.height ? props.height : 0} 
                            onChange={props.handleHeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Length</label>
                          <input type='number' min="0" step="any" placeholder='Length in inches' 
                            value = {props.length ? props.length : 0} 
                            onChange={props.handleLength }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Width</label>
                          <input type='number' min="0" step="any" placeholder='Width in inches' 
                            value = {props.width ? props.width : 0} 
                            onChange={props.handleWidth }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Weight</Header>
                        
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Weight</label>
                          <input type='number' min="0" step="any" placeholder='Weight in pounds' 
                            value = {props.weight ? props.weight : 0} 
                            onChange={props.handleWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Dimensional Weight</label>
                          <input type='number' min="0" step="any" placeholder='Dimensional Weight' 
                            value = {props.dimensionalWeight ? props.dimensionalWeight : 0} 
                            onChange={props.handleDimensionalWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Applied Weight</label>
                          <input type='number' min="0" step="any" placeholder='Applied Weight' 
                            value = {props.appliedWeight ? props.appliedWeight : 0} 
                            onChange={props.handleAppliedWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>
                    <Segment raised >
                    <Form.Field>
                          <label>Cost</label>
                          <input type='number' min="0" step="any" placeholder='Cost' 
                            value = {props.cost ? props.cost : 0} 
                            onChange={props.handleCost }/>
                        </Form.Field>
                      </Segment>
                    <Segment raised >
                        <Header>Price</Header>
                        
                        <Grid columns='equal'>
                        
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>MSRP</label>
                          <input type='number' min="0" step="any" placeholder='MSRP' 
                            value = {props.priceMSRP ? props.priceMSRP : 0} 
                            onChange={props.handlePriceMSRP }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>MAP</label>
                          <input type='number' min="0" step="any" placeholder='MAP' 
                            value = {props.priceMAP ? props.priceMAP : 0} 
                            onChange={props.handlePriceMAP }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Store</label>
                          <input type='number' min="0" step="any" placeholder='Store price' 
                            value = {props.priceStore ? props.priceStore : 0} 
                            onChange={props.handlePriceStore }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>eBay</label>
                          <input type='number' min="0" step="any" placeholder='eBay Price' 
                            value = {props.priceEbay ? props.priceEbay : 0} 
                            onChange={props.handlePriceEbay }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Amazon</label>
                          <input type='number' min="0" step="any" placeholder='Amazon price' 
                            value = {props.priceAmazon ? props.priceAmazon : 0} 
                            onChange={props.handlePriceAmazon }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Wholesale Low</label>
                          <input type='number' min="0" step="any" placeholder='Wholesale Low Price' 
                            value = {props.priceWholesaleLow ? props.priceWholesaleLow : 0} 
                            onChange={props.handlePriceWholesaleLow }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Wholesale High</label>
                          <input type='number' min="0" step="any" placeholder='Wholesale High Price' 
                            value = {props.priceWholesaleHigh ? props.priceWholesaleHigh : 0} 
                            onChange={props.handlePriceWholesaleHigh }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Scratch Low</label>
                          <input type='number' min="0" step="any" placeholder='Scratch Low Price' 
                            value = {props.priceScratchLow ? props.priceScratchLow : 0} 
                            onChange={props.handlePriceScratchLow }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Scratch High</label>
                          <input type='number' min="0" step="any" placeholder='Scratch High Price' 
                            value = {props.priceScratchHigh ? props.priceScratchHigh : 0} 
                            onChange={props.handlePriceScratchHigh }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>
                        
                        
                        </Grid>
                    
                    
                    </Segment>

                    <Segment>

                    <Form.Field>
                    <label>Attributes</label>
                      <Dropdown upward fluid multiple selection placeholder='Select Attributes'                           
                         search searchInput={{ type: 'text' }}
                         options={attributes}
                         onChange={props.handleAttributes} 
                         //onChange={props.handleAttributes}
                         value = {props.attributesSelected.map(item => item.id)}
                         /*value = {props.attributesSelected.map( itemAttr => {
                           let value = attributes.find(item => item.key === itemAttr.id) ? attributes.find(item => item.key === itemAttr.id).text : ""
                          return [value]
                         })}*/
                         //loading
                        />                       
                    </Form.Field>
                    {props.attributesSelected.map(itemAttr => 
                          
                          <div key={itemAttr.id}>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={10}>
                          <Form.Field>
                            <label>{attributes.find(item => item.key === itemAttr.id).text}</label>
                            <input id = {itemAttr.id} placeholder={attributes.find(item => item.key === itemAttr.id).text + ' Value'}
                              value = {itemAttr.value} 
                              onChange={props.handleAttributesSelectedValue}
                              />
                          </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={6}>
                            

                                <Checkbox
                                style={{marginTop:30}}
                                  id={itemAttr.id+'.toggle'}
                                  toggle
                                  label='Use as Option'
                                  //onChange={(e, data) => setChecked(data.checked)}
                                  onChange = {props.handleAttributesSelectedCheckbox}
                                  checked={itemAttr.option}
                                />


                          
                          </Grid.Column>
                          </Grid.Row>
                          </Grid>
                          </div>                                        
                    )}

                    </Segment>

                    
                      <Grid>
                        <Grid.Row>
                    <Grid.Column width={12}>
                    <Form.Field>
                      <label>Handle</label>
                      <input placeholder='Handle' 
                        value = {props.handle} 
                        onChange={props.handleHandle }/>
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column style={{marginTop:25}} width={4}>
                        <Button basic size="mini"  color='blue' icon = {"sync"} onClick={props.generateHandle} content={"Generate"} />                           
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>

                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Fitment Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyFitmentTags} 
                        onChange={props.handleShopifyFitmentTags }/>
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Only Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyOnlyTags} 
                        onChange={props.handleShopifyOnlyTags }/>
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                       </Grid>

                       <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Meta Title - <span style={{"font-size":"0.9em","color":"gray"}}>({props.metaTitleChars}/70) chars</span></label>
                      <input placeholder='Shopify Meta Title' 
                        value = {props.shopifyMetaTitle} 
                        onChange={props.handleShopifyMetaTitle }/>
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Meta Description - <span style={{"font-size":"0.9em","color":"gray"}}>({props.metaDescriptionChars}/320) chars</span></label>
                      {/*<input placeholder='Shopify Meta Description' 
                        value = {props.shopifyMetaDescription} 
                    onChange={props.handleShopifyMetaDescription }/>*/}

                      
                        <TextArea value = {props.shopifyMetaDescription} onChange={props.handleShopifyMetaDescription} rows={3} placeholder='Shopify Meta Description' />
                      


                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                       </Grid>

                       

                       
                      
                       
                    

                    
                    
                     
                  </Form>  
  );
  
}

const centerObject = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
}