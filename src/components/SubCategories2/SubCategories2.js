import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Form } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listSubCategory2s } from '../../graphql/queries'
import { createSubCategory2, updateSubCategory2 } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function SubCategories2() {
  const [chunckSubCategory2s, setChunkSubCategory2s] = useState([])
  const [subCategory2s, setSubCategory2s] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [subCategory2Name, setSubCategory2Name] = useState("")
  const [subCategory2Edit, setSubCategory2Edit] = useState({})
  
   
  
  const addSubCategory2 = async () => {
    try {
        
        const subCategory2 = subCategory2Name
        console.log(subCategory2);
        if (subCategory2s.find(item => item.name.toUpperCase() === subCategory2.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'subCategory2 already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setSubCategory2s([...subCategory2s, {id, name: subCategory2}])        
        await API.graphql(graphqlOperation(createSubCategory2, { input: { id, name: subCategory2 } }))
        fetchSubCategory2s()
        setSubCategory2Name("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'SubCategory2 successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating SubCategory2:', err)
        setSubCategory2Name("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating SubCategory2',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifySubCategory2 = async () => {
    try {
        
        const subCategory2 = subCategory2Edit.name
        const id = subCategory2Edit.id
        console.log("AQUI VA subCategory2S ********")
        console.log(subCategory2s)
        let tempSubCategory2s = [...subCategory2s]
        let index = tempSubCategory2s.findIndex(item => item.id === id)
        tempSubCategory2s[index].name = subCategory2
        setSubCategory2s(tempSubCategory2s)
        console.log("ESTE ES EL subCategory2:",subCategory2)
        console.log("ESTE ES EL ID", id)
        const version = tempSubCategory2s[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const subCategory2Details = {
          id: id,
          name: subCategory2Edit.name,
          _version: version
        };
        await API.graphql(graphqlOperation(updateSubCategory2, { input: subCategory2Details }))
        fetchSubCategory2s()

        setSubCategory2Edit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'SubCategory2 successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating SubCategory2:', err)
        setSubCategory2Edit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating SubCategory2',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateSubCategory2)
).subscribe({
    next: (item) => { 
      fetchSubCategory2s()
      let subCategory2 = item.value.data.onCreateSubCategory2;
      console.log(subCategory2)
       
      console.log("QUE HAY AHORA", subCategory2s)
      
      if (subCategory2s) {
        setSubCategory2s([...subCategory2s, subCategory2 ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateSubCategory2)
).subscribe({
  next: (item) => { 
    fetchSubCategory2s()
    console.log(item)
    let subCategory2Temp = item.value.data.onUpdateSubCategory2;
    console.log(subCategory2Temp)
    let tempSubCategory2s = [...subCategory2s]
    let index = tempSubCategory2s.findIndex(item => item.id === subCategory2Temp.id)
    
    if (tempSubCategory2s) {
      tempSubCategory2s[index] = subCategory2Temp
      setSubCategory2s(tempSubCategory2s)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(subCategory2Name)
      addSubCategory2()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifySubCategory2()
  }

const onPageRendered = async () => {
  fetchSubCategory2s()
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

const getOnlySubCategory2s = async () => {

  try {
    const subCategory2Data = await API.graphql({
      query: listSubCategory2s, 
    
    })      
    
    const subCategory2s = await subCategory2Data.data.listSubCategory2s.items.filter(item => !item._deleted)   
    setSubCategory2s(subCategory2s)
    console.log("esta es una prueba *****", subCategory2s)
    

} catch (err) { console.log(err) }}




const fetchSubCategory2s = async () => {
  try {
      const subCategory2Data = await API.graphql({
        query: listSubCategory2s,
      
      })      
      
      const subCategory2s = await subCategory2Data.data.listSubCategory2s.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", subCategory2s)  
      sortItems(subCategory2s, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkSubCategory2s( sliceIntoChunks(subCategory2s, 10 ))
      setSubCategory2s(subCategory2s)
      console.log("esta es una prueba *****", subCategory2s)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckSubCategory2s === null ? [] : chunckSubCategory2s ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchSubCategory2s() };
    
    
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
      console.log(subCategory2s)
      console.log(orderColumn.direction)
      sortItems(subCategory2s, orderColumn.direction);
      setChunkSubCategory2s( sliceIntoChunks(subCategory2s, 10 ))
      setSubCategory2s(subCategory2s)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setSubCategory2Edit({id: item.id, name: item.name})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempSubCategory2s = subCategory2s.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempSubCategory2s = tempSubCategory2s.length > 0 ? tempSubCategory2s : subCategory2s
         
        
        setChunkSubCategory2s( sliceIntoChunks(tempSubCategory2s, 10 ))
      }
    }
    //console.log(subCategory2Edit.name)
    //console.log(subCategory2Edit.id)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>SubCategories 2</h1>

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
                            Add SubCategory2
                      </Button>}
            >
              <Modal.Header>Add SubCategory 2</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>SubCategory 2 Name</label>
                      <input placeholder='SubCategory2 Name' onChange={e => setSubCategory2Name(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { subCategory2Name === "" ? true : false } onClick={handleSubmit}>
                Add SubCategory 2
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit subCategory 2</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>SubCategory 2 Name</label>
                      <input placeholder='SubCategory2 Name' 
                      value = {subCategory2Edit.name} 
                      onChange={e => setSubCategory2Edit({id: subCategory2Edit.id, name: e.target.value})}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { subCategory2Edit.name === "" ? true : false } onClick={handleUpdate}>
                Save SubCategory 2
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