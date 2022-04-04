import React, {useState} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image } from 'semantic-ui-react'


export default function EditPricesForm(props) {
    
    
  
  return (
    <Form>
        <Grid>
            <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                            <label>Cost</label>
                            <input type='number' min="0" step="any" placeholder='Cost' 
                                value = {props.cost ? props.cost : 0}
                                onChange={props.handleCostBulk} 
                            />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handleCostBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>
                
                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                            <label>MSRP</label>
                            <input type='number' min="0" step="any" placeholder='MSRP' 
                                value = {props.priceMSRP ? props.priceMSRP : 0}
                                onChange={props.handlePriceMSRPBulk} 
                            />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceMSRPBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>MAP</label>
                          <input type='number' min="0" step="any" placeholder='MAP' 
                            value = {props.priceMAP ? props.priceMAP : 0} 
                            onChange={props.handlePriceMAPBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceMAPBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Store</label>
                          <input type='number' min="0" step="any" placeholder='Store price' 
                            value = {props.priceStore ? props.priceStore : 0} 
                            onChange={props.handlePriceStoreBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceStoreBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>eBay</label>
                    <input type='number' min="0" step="any" placeholder='eBay Price' 
                            value = {props.priceEbay ? props.priceEbay : 0} 
                            onChange={props.handlePriceEbayBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceEbayBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Amazon</label>
                          <input type='number' min="0" step="any" placeholder='Amazon price' 
                            value = {props.priceAmazon ? props.priceAmazon : 0} 
                            onChange={props.handlePriceAmazonBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceAmazonBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Wholesale Low</label>
                          <input type='number' min="0" step="any" placeholder='Wholesale Low Price' 
                            value = {props.priceWholesaleLow ? props.priceWholesaleLow : 0} 
                            onChange={props.handlePriceWholesaleLowBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceWholesaleLowBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Wholesale High</label>
                          <input type='number' min="0" step="any" placeholder='Wholesale High Price' 
                            value = {props.priceWholesaleHigh ? props.priceWholesaleHigh : 0} 
                            onChange={props.handlePriceWholesaleHighBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceWholesaleHighBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Scratch Low</label>
                          <input type='number' min="0" step="any" placeholder='Scratch Low Price' 
                            value = {props.priceScratchLow ? props.priceScratchLow : 0} 
                            onChange={props.handlePriceScratchLowBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceScratchLowBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Grid.Column width={13}>
                    <Form.Field>
                    <label>Scratch High</label>
                          <input type='number' min="0" step="any" placeholder='Scratch High Price' 
                            value = {props.priceScratchHigh ? props.priceScratchHigh : 0} 
                            onChange={props.handlePriceScratchHighBulk }/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={3}>                
                        <Form.Field style={{marginTop:30}} control={Checkbox} toggle label='Apply' onChange={props.handlePriceScratchLowBulkChecked} /*checked={}*/ />   
                </Grid.Column>
                </Grid.Row>



        </Grid>
    </Form>
  );
  
}