import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listAttributes } from '../../graphql/queries'
import { createAttribute, updateAttribute } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function Attributes() {
  const [chunckAttributes, setChunkAttributes] = useState(null)
  const [attributes, setAttributes] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [attributeName, setAttributeName] = useState("")
  const [attributeEdit, setAttributeEdit] = useState({})
  
   
  
  const addAttribute = async () => {
    try {
        
        const attribute = attributeName
        console.log(attribute);
        if (attributes.find(item => item.name.toUpperCase() === attribute.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'attribute already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setAttributes([...attributes, {id, name: attribute}])        
        await API.graphql(graphqlOperation(createAttribute, { input: { id, name: attribute } }))
        fetchAttributes()
        setAttributeName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'attribute successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating attribute:', err)
        setAttributeName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating attribute',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifyAttribute = async () => {
    try {
        
        const attribute = attributeEdit.name
        const id = attributeEdit.id
        console.log("AQUI VA attributeS ********")
        console.log(attributes)
        let tempAttributes = [...attributes]
        let index = tempAttributes.findIndex(item => item.id === id)
        tempAttributes[index].name = attribute
        setAttributes(tempAttributes)
        console.log("ESTE ES EL attribute:",attribute)
        console.log("ESTE ES EL ID", id)
        const version = tempAttributes[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const attributeDetails = {
          id: id,
          name: attributeEdit.name,
          _version: version
        };
        await API.graphql(graphqlOperation(updateAttribute, { input: attributeDetails }))
        fetchAttributes()

        setAttributeEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'attribute successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating attribute:', err)
        setAttributeEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating attribute',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateAttribute)
).subscribe({
    next: (item) => { 
      fetchAttributes()
      let attribute = item.value.data.onCreateAttribute;
      console.log(attribute)
       
      console.log("QUE HAY AHORA", attributes)
      
      if (attributes) {
        setAttributes([...attributes, attribute ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateAttribute)
).subscribe({
  next: (item) => { 
    fetchAttributes()
    console.log(item)
    let attributeTemp = item.value.data.onUpdateAttribute;
    console.log(attributeTemp)
    let tempAttributes = [...attributes]
    let index = tempAttributes.findIndex(item => item.id === attributeTemp.id)
    
    if (tempAttributes) {
      tempAttributes[index] = attributeTemp
      setAttributes(tempAttributes)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(attributeName)
      addAttribute()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyAttribute()
  }

const onPageRendered = async () => {
  fetchAttributes()
  subscriptionCreate()
  subscriptionUpdate()
  
};



  useEffect(() => {
    onPageRendered()
    
}, [])


const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const getOnlyattributes = async () => {

  try {
    const attributeData = await API.graphql({
      query: listAttributes,
    
    })      
    
    const attributes = await attributeData.data.listAttributes.items.filter(item => !item._deleted)   
    setAttributes(attributes)
    console.log("esta es una prueba *****", attributes)
    

} catch (err) { console.log(err) }}




const fetchAttributes = async () => {
  try {
      const attributeData = await API.graphql({
        query: listAttributes,
      
      })      
      
      const attributes = await attributeData.data.listAttributes.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", attributes)  
      sortItems(attributes, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkAttributes( sliceIntoChunks(attributes, 10 ))
      setAttributes(attributes)
      console.log("esta es una prueba *****", attributes)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckAttributes === null ? [] : chunckAttributes ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchAttributes() };
    
    
    const sortItems = (list, direction) => {
      if (direction === 'descending'){
        list.sort(function(a, b) {
          let nameA = a.name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
      } else {
        list.sort(function(a, b) {
          let nameA = a.name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
      }

      console.log(list)
      console.log(direction)

    }
    
    const handleOrderColumn = (column) => {
      console.log(column);
      setOrderColumn({column: column, direction: orderColumn.direction === 'descending' ? 'ascending' : 'descending' })
      console.log(attributes)
      console.log(orderColumn.direction)
      sortItems(attributes, orderColumn.direction);
      setChunkAttributes( sliceIntoChunks(attributes, 10 ))
      setAttributes(attributes)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setAttributeEdit({id: item.id, name: item.name})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempAttributes = attributes.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempAttributes = tempAttributes.length > 0 ? tempAttributes : attributes
         
        
        setChunkAttributes( sliceIntoChunks(tempAttributes, 10 ))
      }
    }
    console.log(attributeEdit.name)
    console.log(attributeEdit.id)
    console.log("Este es el attribute:",attributeEdit)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>Attributes</h1>

        <Grid>
          <Grid.Column width={12}>
          <Input
                icon='search'
                iconPosition='left'
                placeholder='Search...'
                fluid = {true}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                value={search}             
                //floated='left'
              />
          </Grid.Column>
          <Grid.Column width={4}>
          
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button floated='right'
                            icon
                            labelPosition='left'
                            primary                            
                            size='small'> 
                            <Icon name='plus' /> 
                            Add attribute
                      </Button>}
            >
              <Modal.Header>Add attribute</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>attribute Name</label>
                      <input placeholder='attribute Name' onChange={e => setAttributeName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { attributeName === "" ? true : false } onClick={handleSubmit}>
                Add attribute
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit attribute</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>attribute Name</label>
                      <input placeholder='attribute Name' 
                      value = {attributeEdit.name} 
                      onChange={e => setAttributeEdit({id: attributeEdit.id, name: e.target.value})}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { attributeEdit.name === "" ? true : false } onClick={handleUpdate}>
                Save attribute
              </Button>
 
              </Modal.Actions>
            </Modal>

          </Grid.Column>          
        </Grid>

        
        <SimpleTable data = {dataChunks[activePage - 1]} handleOrder = {handleOrderColumn} orderColumn = {orderColumn} openForm = {handleOpenEditForm} />
         <div style = {paginationStyle}>
          <Pagination
              activePage={activePage}
              boundaryRange={1}
              ellipsisItem='...'
              firstItem='<<'
              lastItem='>>'
              siblingRange={1}
              totalPages={ dataChunks.length }
              onPageChange={handlePaginationChange}              
            />
            
            </div>

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