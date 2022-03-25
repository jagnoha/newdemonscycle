import React from 'react'
import { Table, Loader, Container } from 'semantic-ui-react'


export default function EbayCategoriesTable(props) {

    if (!props.data) {  

    return (
        
        <Container>

            <Loader active style = {{top:350}} />        
        </Container>
        
    );

    } 

    return (
        
            <Table sortable celled selectable>
        <Table.Header>


            
          <Table.Row >
            <Table.HeaderCell 
                sorted={props.orderColumn.column === 'name' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('name')}
            >Name</Table.HeaderCell>
            <Table.HeaderCell>Category number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            
            {props.data.map((item) => 
            
            <Table.Row key={item.id} onClick = {()=>props.openForm(item)}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.code}</Table.Cell>
          </Table.Row>
            
            )}

          </Table.Body>
          </Table>
        
    )
    
    
  }
