import React, {useState} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image } from 'semantic-ui-react'


export default function EditCategoriesForm(props) {
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
  
  return (
    <Form>
        <Grid>
            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>Category</label>
                      <Dropdown placeholder='Select Category' search searchInput={{ type: 'text' }} selection 
                         options={categories} 
                         onChange={props.handleCategorySelectedBulk}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleCategorySelectedBulkChecked} /*checked={}*/ />   
                   
            </Grid.Column>


            
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>SubCategory</label>
                      <Dropdown placeholder='Select SubCategory' search searchInput={{ type: 'text' }} selection 
                         options={subCategories} 
                         onChange={props.handleSubCategorySelectedBulk}
                         //onChange={props.handleCategory}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleSubCategorySelectedBulkChecked} /*onChange={} checked={}*/ />   
                   
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>SubCategory 2</label>
                      <Dropdown placeholder='Select SubCategory 2' search searchInput={{ type: 'text' }} selection 
                         options={subCategories2} 
                         onChange={props.handleSubCategory2SelectedBulk}
                         //onChange={props.handleCategory}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleSubCategory2SelectedBulkChecked} /*onChange={} checked={}*/ />   
                   
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>eBay Store Category</label>
                      <Dropdown placeholder='Select eBay Store Category' search searchInput={{ type: 'text' }} selection 
                         options={ebayStoreCategorys} 
                         onChange={props.handleEbayStoreCategorySelectedBulk}

                         
                         //onChange={props.handleCategory}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleEbayStoreCategorySelectedBulkChecked} /*onChange={} checked={}*/ />   
                   
            </Grid.Column>
            </Grid.Row>
        </Grid>
    </Form>
  );
  
}