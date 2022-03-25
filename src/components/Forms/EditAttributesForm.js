import React, {useState} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image } from 'semantic-ui-react'


export default function EditAttributesForm(props) {
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
  
  return (
    <Form>
        
            
                    <Form.Field>
                    <label>Attributes</label>
                      <Dropdown upward placeholder='Attributes' fluid multiple selection placeholder='Select Attributes'                           
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

                    
           
    </Form>
  );
  
}