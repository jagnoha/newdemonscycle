import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Form } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listSubCategories } from '../../graphql/queries'
import { createSubCategory, updateSubCategory } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function SubCategories() {
  const [chunckSubCategorys, setChunkSubCategorys] = useState(null)
  const [subCategorys, setSubCategorys] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [subCategoryName, setSubCategoryName] = useState("")
  const [subCategoryEdit, setSubCategoryEdit] = useState({})
  
   
  
  const addSubCategory = async () => {
    try {
        
        const subCategory = subCategoryName
        console.log(subCategory);
        if (subCategorys.find(item => item.name.toUpperCase() === subCategory.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'subCategory already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setSubCategorys([...subCategorys, {id, name: subCategory}])        
        await API.graphql(graphqlOperation(createSubCategory, { input: { id, name: subCategory } }))
        fetchSubCategorys()
        setSubCategoryName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'SubCategory successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating SubCategory:', err)
        setSubCategoryName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating SubCategory',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifySubCategory = async () => {
    try {
        
        const subCategory = subCategoryEdit.name
        const id = subCategoryEdit.id
        console.log("AQUI VA subCategoryS ********")
        console.log(subCategorys)
        let tempSubCategorys = [...subCategorys]
        let index = tempSubCategorys.findIndex(item => item.id === id)
        tempSubCategorys[index].name = subCategory
        setSubCategorys(tempSubCategorys)
        console.log("ESTE ES EL subCategory:",subCategory)
        console.log("ESTE ES EL ID", id)
        const version = tempSubCategorys[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const subCategoryDetails = {
          id: id,
          name: subCategoryEdit.name,
          _version: version
        };
        await API.graphql(graphqlOperation(updateSubCategory, { input: subCategoryDetails }))
        fetchSubCategorys()

        setSubCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'SubCategory successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating SubCategory:', err)
        setSubCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating SubCategory',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateSubCategory)
).subscribe({
    next: (item) => { 
      fetchSubCategorys()
      let subCategory = item.value.data.onCreateSubCategory;
      console.log(subCategory)
       
      console.log("QUE HAY AHORA", subCategorys)
      
      if (subCategorys) {
        setSubCategorys([...subCategorys, subCategory ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateSubCategory)
).subscribe({
  next: (item) => { 
    fetchSubCategorys()
    console.log(item)
    let subCategoryTemp = item.value.data.onUpdateSubCategory;
    console.log(subCategoryTemp)
    let tempSubCategorys = [...subCategorys]
    let index = tempSubCategorys.findIndex(item => item.id === subCategoryTemp.id)
    
    if (tempSubCategorys) {
      tempSubCategorys[index] = subCategoryTemp
      setSubCategorys(tempSubCategorys)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(subCategoryName)
      addSubCategory()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifySubCategory()
  }

const onPageRendered = async () => {
  fetchSubCategorys()
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

const getOnlySubCategorys = async () => {

  try {
    const subCategoryData = await API.graphql({
      query: listSubCategories,
    
    })      
    
    const subCategorys = await subCategoryData.data.listSubCategories.items.filter(item => !item._deleted)   
    setSubCategorys(subCategorys)
    console.log("esta es una prueba *****", subCategorys)
    

} catch (err) { console.log(err) }}




const fetchSubCategorys = async () => {
  try {
      const subCategoryData = await API.graphql({
        query: listSubCategories,
        limit: 10,
      })      
      const subCategorysTemp = await API.graphql(graphqlOperation(listSubCategories, { limit: 1000})) 
      const subCategorys = subCategorysTemp.data.listSubCategories.items.filter(item => !item._deleted)
      //const subCategorys = await subCategoryData.data.listSubCategorys.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", subCategorys.length)  
      sortItems(subCategorys, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkSubCategorys( sliceIntoChunks(subCategorys, 10 ))
      setSubCategorys(subCategorys)
      console.log("esta es una prueba *****", subCategorys)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckSubCategorys === null ? [] : chunckSubCategorys ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchSubCategorys() };
    
    
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
      console.log(subCategorys)
      console.log(orderColumn.direction)
      sortItems(subCategorys, orderColumn.direction);
      setChunkSubCategorys( sliceIntoChunks(subCategorys, 10 ))
      setSubCategorys(subCategorys)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setSubCategoryEdit({id: item.id, name: item.name})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempSubCategorys = subCategorys.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempSubCategorys = tempSubCategorys.length > 0 ? tempSubCategorys : subCategorys
         
        
        setChunkSubCategorys( sliceIntoChunks(tempSubCategorys, 10 ))
      }
    }
    console.log(subCategoryEdit.name)
    console.log(subCategoryEdit.id)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>SubCategories</h1>

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
                            Add SubCategory
                      </Button>}
            >
              <Modal.Header>Add SubCategory</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>SubCategory Name</label>
                      <input placeholder='SubCategory Name' onChange={e => setSubCategoryName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { subCategoryName === "" ? true : false } onClick={handleSubmit}>
                Add SubCategory
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit subCategory</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>SubCategory Name</label>
                      <input placeholder='SubCategory Name' 
                      value = {subCategoryEdit.name} 
                      onChange={e => setSubCategoryEdit({id: subCategoryEdit.id, name: e.target.value})}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { subCategoryEdit.name === "" ? true : false } onClick={handleUpdate}>
                Save SubCategory
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