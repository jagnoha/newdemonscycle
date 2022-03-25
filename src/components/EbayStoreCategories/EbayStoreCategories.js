import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listEbayStoreCategories } from '../../graphql/queries'
import { createEbayStoreCategory, updateEbayStoreCategory } from '../../graphql/mutations'
import EbayCategoriesTable from '../EbayCategoriesTable/EbayCategoriesTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function EbayStoreCategories() {
  const [chunckEbayStoreCategorys, setChunkEbayStoreCategorys] = useState(null)
  const [ebayStoreCategorys, setEbayStoreCategorys] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [ebayStoreCategoryForm, setEbayStoreCategoryForm] = useState({name:'', code:''})
  const [ebayStoreCategoryEdit, setEbayStoreCategoryEdit] = useState({id:'', name:'', code:''})
  
   
  
  const addEbayStoreCategory = async () => {
    try {
        
        const ebayStoreCategory = ebayStoreCategoryForm
        console.log(ebayStoreCategoryForm);
        if (ebayStoreCategorys.find(item => item.name.toUpperCase() === ebayStoreCategory.name.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'Ebay Store Category already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setEbayStoreCategorys([...ebayStoreCategorys, {id, name: ebayStoreCategoryForm.name, code: ebayStoreCategoryForm.code }])        
        await API.graphql(graphqlOperation(createEbayStoreCategory, { input: { id, name: ebayStoreCategoryForm.name, code: ebayStoreCategoryForm.code } }))
        fetchEbayStoreCategorys()
        setEbayStoreCategoryForm({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'Ebay Store Category successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating Ebay Store Category:', err)
        setEbayStoreCategoryForm({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Ebay Store Category',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifyEbayStoreCategory = async () => {
    try {
        
        const ebayStoreCategory = ebayStoreCategoryEdit.name
        const id = ebayStoreCategoryEdit.id
        console.log("AQUI VA EbayStoreCategoryS ********")
        console.log(ebayStoreCategorys)
        let tempEbayStoreCategorys = [...ebayStoreCategorys]
        let index = tempEbayStoreCategorys.findIndex(item => item.id === id)
        tempEbayStoreCategorys[index].name = ebayStoreCategory
        setEbayStoreCategorys(tempEbayStoreCategorys)        
        const version = tempEbayStoreCategorys[index]._version        
        
        const ebayStoreCategoryDetails = {
          id: id,
          name: ebayStoreCategoryEdit.name,
          code: ebayStoreCategoryEdit.code,
          _version: version
        };
        await API.graphql(graphqlOperation(updateEbayStoreCategory, { input: ebayStoreCategoryDetails }))
        fetchEbayStoreCategorys()

        setEbayStoreCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',              
              size: 'tiny',              
              description: 'Ebay Store Category successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating Ebay Store Category:', err)
        setEbayStoreCategoryEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Ebay Store Category',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateEbayStoreCategory)
).subscribe({
    next: (item) => { 
      fetchEbayStoreCategorys()
      let ebayStoreCategory = item.value.data.onCreateEbayStoreCategory;
      console.log(ebayStoreCategory)
       
      console.log("QUE HAY AHORA", ebayStoreCategorys)
      
      if (ebayStoreCategorys) {
        setEbayStoreCategorys([...ebayStoreCategorys, ebayStoreCategory ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateEbayStoreCategory)
).subscribe({
  next: (item) => { 
    fetchEbayStoreCategorys()
    console.log(item)
    let ebayStoreCategoryTemp = item.value.data.onUpdateEbayStoreCategory;
    console.log(ebayStoreCategoryTemp)
    let tempEbayStoreCategorys = [...ebayStoreCategorys]
    let index = tempEbayStoreCategorys.findIndex(item => item.id === ebayStoreCategoryTemp.id)
    
    if (tempEbayStoreCategorys) {
      tempEbayStoreCategorys[index] = ebayStoreCategoryTemp
      setEbayStoreCategorys(tempEbayStoreCategorys)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(ebayStoreCategoryForm)
      addEbayStoreCategory()
      setEbayStoreCategoryForm({name:'', code:''})
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyEbayStoreCategory()
    setEbayStoreCategoryEdit({id:'', name:'', code:''})
  }

const onPageRendered = async () => {
  fetchEbayStoreCategorys()
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

const getOnlyEbayStoreCategorys = async () => {

  try {
    const ebayStoreCategoryData = await API.graphql({
      query: listEbayStoreCategories,
    
    })      
    
    const ebayStoreCategorys = await ebayStoreCategoryData.data.listEbayStoreCategories.items.filter(item => !item._deleted)   
    setEbayStoreCategorys(ebayStoreCategorys)
    console.log("esta es una prueba *****", ebayStoreCategorys)
    

} catch (err) { console.log(err) }}




const fetchEbayStoreCategorys = async () => {
  try {
      const ebayStoreCategoryData = await API.graphql({
        query: listEbayStoreCategories,
      
      })      
      
      const ebayStoreCategorys = await ebayStoreCategoryData.data.listEbayStoreCategories.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", ebayStoreCategorys)  
      sortItems(ebayStoreCategorys, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkEbayStoreCategorys( sliceIntoChunks(ebayStoreCategorys, 10 ))
      setEbayStoreCategorys(ebayStoreCategorys)
      console.log("esta es una prueba *****", ebayStoreCategorys)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckEbayStoreCategorys === null ? [] : chunckEbayStoreCategorys ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchEbayStoreCategorys() };
    
    
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
      console.log(ebayStoreCategorys)
      console.log(orderColumn.direction)
      sortItems(ebayStoreCategorys, orderColumn.direction);
      setChunkEbayStoreCategorys( sliceIntoChunks(ebayStoreCategorys, 10 ))
      setEbayStoreCategorys(ebayStoreCategorys)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setEbayStoreCategoryEdit({id: item.id, name: item.name, code: item.code})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempEbayStoreCategorys = ebayStoreCategorys.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempEbayStoreCategorys = tempEbayStoreCategorys.length > 0 ? tempEbayStoreCategorys : ebayStoreCategorys
         
        
        setChunkEbayStoreCategorys( sliceIntoChunks(tempEbayStoreCategorys, 10 ))
      }
    }

    const handleName = (evt) => {
        evt.persist();
        setEbayStoreCategoryForm((values) => ({
            ...values,
            name: evt.target.value,
        }));

    }

    const handleCode = (evt) => {
        evt.persist();
        setEbayStoreCategoryForm((values) => ({
            ...values,
            code: evt.target.value,
        }));
    }

    const handleEditName = (evt) => {
        evt.persist();
        setEbayStoreCategoryEdit((values) => ({
            ...values,
            name: evt.target.value,
        }));

    }

    const handleEditCode = (evt) => {
        evt.persist();
        setEbayStoreCategoryEdit((values) => ({
            ...values,
            code: evt.target.value,
        }));
    }

    console.log("************************** ",ebayStoreCategoryForm)
    //console.log(ebayStoreCategoryEdit.id)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>eBay Store Categories</h1>

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
                            Add Ebay Store Category
                      </Button>}
            >
              <Modal.Header>Add Ebay Store Category</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Category Name</label>
                      <input placeholder='Ebay Store Category Name' 
                      value = {ebayStoreCategoryForm.name} onChange={ (e) => handleName(e) }  />

                    </Form.Field>
                    <Form.Field>
                      <label>Category Number</label>
                      <input placeholder='Ebay Store Category Number' 
                      value = {ebayStoreCategoryForm.code} onChange={ (e) => handleCode(e) }/>
                    </Form.Field>                     
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive 
              disabled = { (ebayStoreCategoryForm.name === "" || ebayStoreCategoryForm.code === "") ? true : false } onClick={handleSubmit}>
                Add Ebay Store Category
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit Ebay Store Category</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Category Name</label>
                      <input placeholder='Ebay Store Category Name' 
                      value = {ebayStoreCategoryEdit.name} 
                      onChange={ (e) => handleEditName(e) }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Category Number</label>
                      <input placeholder='Ebay Store Category Number' 
                      value = {ebayStoreCategoryEdit.code} 
                      onChange={ (e) => handleEditCode(e) }/>
                    </Form.Field>                        
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive 
              disabled = { (ebayStoreCategoryEdit.name === "" || ebayStoreCategoryEdit.code === "") ? true : false } onClick={handleUpdate}>
                Save ebay Store Category
              </Button>
 
              </Modal.Actions>
            </Modal>

          </Grid.Column>          
        </Grid>

        
        <EbayCategoriesTable data = {dataChunks[activePage - 1]} handleOrder = {handleOrderColumn} orderColumn = {orderColumn} openForm = {handleOpenEditForm} />
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