import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Form } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listCategories } from '../../graphql/queries'
import { createCategory, updateCategory } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function Categories() {
  const [chunckCategorys, setChunkCategorys] = useState(null)
  const [categorys, setCategorys] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [categoryEdit, setCategoryEdit] = useState({})
  
   
  
  const addCategory = async () => {
    try {
        
        const category = categoryName
        console.log(category);
        if (categorys.find(item => item.name.toUpperCase() === category.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'Category already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setCategorys([...categorys, {id, name: category}])        
        await API.graphql(graphqlOperation(createCategory, { input: { id, name: category } }))
        fetchCategorys()
        setCategoryName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'category successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating Category:', err)
        setCategoryName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Category',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifyCategory = async () => {
    try {
        
        const category = categoryEdit.name
        const id = categoryEdit.id
        console.log("AQUI VA categoryS ********")
        console.log(categorys)
        let tempCategorys = [...categorys]
        let index = tempCategorys.findIndex(item => item.id === id)
        tempCategorys[index].name = category
        setCategorys(tempCategorys)
        console.log("ESTE ES EL category:",category)
        console.log("ESTE ES EL ID", id)
        const version = tempCategorys[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const categoryDetails = {
          id: id,
          name: categoryEdit.name,
          ebayCode: categoryEdit.ebayCode,
          _version: version
        };
        await API.graphql(graphqlOperation(updateCategory, { input: categoryDetails }))
        fetchCategorys()

        setCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'category successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating category:', err)
        setCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating category',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateCategory)
).subscribe({
    next: (item) => { 
      fetchCategorys()
      let category = item.value.data.onCreateCategory;
      console.log(category)
       
      console.log("QUE HAY AHORA", categorys)
      
      if (categorys) {
        setCategorys([...categorys, category ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateCategory)
).subscribe({
  next: (item) => { 
    fetchCategorys()
    console.log(item)
    let categoryTemp = item.value.data.onUpdateCategory;
    console.log(categoryTemp)
    let tempCategorys = [...categorys]
    let index = tempCategorys.findIndex(item => item.id === categoryTemp.id)
    
    if (tempCategorys) {
      tempCategorys[index] = categoryTemp
      setCategorys(tempCategorys)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(categoryName)
      addCategory()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyCategory()
  }

const onPageRendered = async () => {
  fetchCategorys()
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

const getOnlyCategorys = async () => {

  try {
    const categoryData = await API.graphql({
      query: listCategories,
    
    })      
    
    const categorys = await categoryData.data.listCategories.items.filter(item => !item._deleted)   
    setCategorys(categorys)
    console.log("esta es una prueba *****", categorys)
    

} catch (err) { console.log(err) }}




const fetchCategorys = async () => {
  try {
      const categoryData = await API.graphql({
        query: listCategories,
      
      })   
      
      const categorysTemp = await API.graphql(graphqlOperation(listCategories, { limit: 1000})) 
      const categorys = categorysTemp.data.listCategories.items.filter(item => !item._deleted)
      
      
      //const categorys = await categoryData.data.listCategorys.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", categorys)  
      sortItems(categorys, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkCategorys( sliceIntoChunks(categorys, 10 ))
      setCategorys(categorys)
      console.log("esta es una prueba *****", categorys)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckCategorys === null ? [] : chunckCategorys ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchCategorys() };
    
    
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
      console.log(categorys)
      console.log(orderColumn.direction)
      sortItems(categorys, orderColumn.direction);
      setChunkCategorys( sliceIntoChunks(categorys, 10 ))
      setCategorys(categorys)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setCategoryEdit({id: item.id, name: item.name, ebayCode: item.ebayCode})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempCategorys = categorys.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempCategorys = tempCategorys.length > 0 ? tempCategorys : categorys
         
        
        setChunkCategorys( sliceIntoChunks(tempCategorys, 10 ))
      }
    }
    console.log("Name: ", categoryEdit.name)
    console.log("ebayCode: ", categoryEdit.ebayCode)
    console.log("id: ", categoryEdit.id)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>Categories</h1>

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
                            Add Category
                      </Button>}
            >
              <Modal.Header>Add Category</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Category Name</label>
                      <input placeholder='Category Name' onChange={e => setCategoryName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { categoryName === "" ? true : false } onClick={handleSubmit}>
                Add Category
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit Category</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Category Name</label>
                      <input placeholder='Category Name' 
                      value = {categoryEdit.name} 
                      onChange={e => setCategoryEdit({id: categoryEdit.id, name: e.target.value, ebayCode: categoryEdit.ebayCode})}/>
                    </Form.Field>
                    <Form.Field>
                      <label>eBay Category code</label>
                      <input placeholder='eBay Category code' 
                      value = {categoryEdit.ebayCode} 
                      onChange={e => setCategoryEdit({id: categoryEdit.id, name: categoryEdit.name, ebayCode: e.target.value})}/>
                    </Form.Field>                     
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { categoryEdit.name === "" ? true : false } onClick={handleUpdate}>
                Save category
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