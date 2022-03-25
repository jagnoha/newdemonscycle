import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listManufacturers } from '../../graphql/queries'
import { createManufacturer, updateManufacturer } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function Manufacturers() {
  const [chunckManufacturers, setChunckManufacturers] = useState(null)
  const [manufacturers, setManufacturers] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [manufacturerName, setManufacturerName] = useState("")
  const [manufacturerEdit, setManufacturerEdit] = useState({})
  
   
  
  const addManufacturer = async () => {
    try {
        
        const manufacturer = manufacturerName
        console.log(manufacturer);
        if (manufacturers.find(item => item.name.toUpperCase() === manufacturer.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'Manufacturer already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }

        

        let id = uuidv4()
        setManufacturers([...manufacturers, {id, name: manufacturer}])        
        await API.graphql(graphqlOperation(createManufacturer, { input: { id, name: manufacturer } }))
        fetchManufacturers()
        setManufacturerName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'Manufacturer successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating Manufacturer:', err)
        setManufacturerName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Manufacturer',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifymanufacturer = async () => {
    try {
        
        const manufacturer = manufacturerEdit.name
        const id = manufacturerEdit.id
        console.log("AQUI VA manufacturers ********")
        console.log(manufacturers)
        let tempManufacturers = [...manufacturers]
        let index = tempManufacturers.findIndex(item => item.id === id)
        tempManufacturers[index].name = manufacturer
        setManufacturers(tempManufacturers)
        console.log("ESTE ES EL manufacturer:",manufacturer)
        console.log("ESTE ES EL ID", id)
        const version = tempManufacturers[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const manufacturerDetails = {
          id: id,
          name: manufacturerEdit.name,
          _version: version
        };
        await API.graphql(graphqlOperation(updateManufacturer, { input: manufacturerDetails }))
        fetchManufacturers()

        setManufacturerEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'manufacturer successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating manufacturer:', err)
        setManufacturerEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating manufacturer',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateManufacturer)
).subscribe({
    next: (item) => { 
      fetchManufacturers()
      let manufacturer = item.value.data.onCreateManufacturer;
      console.log(manufacturer)
       
      console.log("QUE HAY AHORA", manufacturers)
      
      if (manufacturers) {
        setManufacturers([...manufacturers, manufacturer ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateManufacturer)
).subscribe({
  next: (item) => { 
    fetchManufacturers()
    console.log(item)
    let manufacturerTemp = item.value.data.onUpdateManufacturer;
    console.log(manufacturerTemp)
    let tempManufacturers = [...manufacturers]
    let index = tempManufacturers.findIndex(item => item.id === manufacturerTemp.id)
    
    if (tempManufacturers) {
      tempManufacturers[index] = manufacturerTemp
      setManufacturers(tempManufacturers)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(manufacturerName)
      addManufacturer()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifymanufacturer()
  }

const onPageRendered = async () => {
  fetchManufacturers()
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

const getOnlymanufacturers = async () => {

  try {
    const manufacturerData = await API.graphql({
      query: listManufacturers,
    
    })      
    
    const manufacturers = await manufacturerData.data.listManufacturers.items.filter(item => !item._deleted)   
    setManufacturers(manufacturers)
    console.log("esta es una prueba *****", manufacturers)
    

} catch (err) { console.log(err) }}




const fetchManufacturers = async () => {
  try {
      const manufacturerData = await API.graphql({
        query: listManufacturers,
      
      })
      
      const manufacturersTemp = await API.graphql(graphqlOperation(listManufacturers, { limit: 2000})) 
      const manufacturers = manufacturersTemp.data.listManufacturers.items.filter(item => !item._deleted)
      
      //const manufacturers = await manufacturerData.data.listManufacturers.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", manufacturers)  
      sortItems(manufacturers, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunckManufacturers( sliceIntoChunks(manufacturers, 10 ))
      setManufacturers(manufacturers)
      console.log("esta es una prueba *****", manufacturers)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckManufacturers === null ? [] : chunckManufacturers ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchManufacturers() };
    
    
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
      console.log(manufacturers)
      console.log(orderColumn.direction)
      sortItems(manufacturers, orderColumn.direction);
      setChunckManufacturers( sliceIntoChunks(manufacturers, 10 ))
      setManufacturers(manufacturers)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setManufacturerEdit({id: item.id, name: item.name})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempManufacturers = manufacturers.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempManufacturers = tempManufacturers.length > 0 ? tempManufacturers : manufacturers
         
        
        setChunckManufacturers( sliceIntoChunks(tempManufacturers, 10 ))
      }
    }
    console.log(manufacturerEdit.name)
    console.log(manufacturerEdit.id)
    console.log(manufacturerName)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>Manufacturers</h1>

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
                            Add Manufacturer
                      </Button>}
            >
              <Modal.Header>Add Manufacturer</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Manufacturer Name</label>
                      <input placeholder='Manufacturer Name' onChange={e => setManufacturerName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { manufacturerName === "" ? true : false } onClick={handleSubmit}>
                Add manufacturer
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit Manufacturer</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Manufacturer Name</label>
                      <input placeholder='Manufacturer Name' 
                      value = {manufacturerEdit.name} 
                      onChange={e => setManufacturerEdit({id: manufacturerEdit.id, name: e.target.value})}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { manufacturerEdit.name === "" ? true : false } onClick={handleUpdate}>
                Save manufacturer
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