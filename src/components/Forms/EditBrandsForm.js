import React, {useState} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image } from 'semantic-ui-react'


export default function EditBrandsForm(props) {
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
    
  
  return (
    <Form>
        <Grid>
            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>Brand</label>
                      <Dropdown placeholder='Select Brand' search searchInput={{ type: 'text' }} selection 
                         options={brands} 
                         onChange={props.handleBrandSelectedBulk}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleBrandSelectedBulkChecked} /*checked={}*/ />   
                   
            </Grid.Column>


            
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={13}>
            <Form.Field>
                    <label>Manufacturer</label>
                      <Dropdown placeholder='Select Manufacturer' search searchInput={{ type: 'text' }} selection 
                         options={manufacturers} 
                         onChange={props.handleManufacturerSelectedBulk}
                         //onChange={props.handleCategory}
                         //value = {props.valueCategory}
                        />                       
                    </Form.Field>
            </Grid.Column>
            <Grid.Column width={3}>
            
                    <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleManufacturerSelectedBulkChecked} /*onChange={} checked={}*/ />   
                   
            </Grid.Column>
            </Grid.Row>

        </Grid>
    </Form>
  );
  
}