import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listBrands } from '../../graphql/queries'
import { createBrand, updateBrand } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
import * as subscriptions from '../../graphql/subscriptions';
import { v4 as uuidv4 } from 'uuid'


export default function Brands() {
  const [chunckBrands, setChunkBrands] = useState(null)
  const [brands, setBrands] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [brandName, setBrandName] = useState("")
  const [brandEdit, setBrandEdit] = useState({})
  
   
  
  const addBrand = async () => {
    try {
        
        const brand = brandName
        console.log(brand);
        if (brands.find(item => item.name.toUpperCase() === brand.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'Brand already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setBrands([...brands, {id, name: brand}])        
        await API.graphql(graphqlOperation(createBrand, { input: { id, name: brand } }))
        fetchBrands()
        setBrandName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'Brand successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error creating brand:', err)
        setBrandName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating brand',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifyBrand = async () => {
    try {
        
        const brand = brandEdit.name
        const id = brandEdit.id
        console.log("AQUI VA BRANDS ********")
        console.log(brands)
        let tempBrands = [...brands]
        let index = tempBrands.findIndex(item => item.id === id)
        tempBrands[index].name = brand
        setBrands(tempBrands)
        console.log("ESTE ES EL BRAND:",brand)
        console.log("ESTE ES EL ID", id)
        const version = tempBrands[index]._version
        console.log("ESTE ES LA VERSION", version)
        
        const brandDetails = {
          id: id,
          name: brandEdit.name,
          _version: version
        };
        await API.graphql(graphqlOperation(updateBrand, { input: brandDetails }))
        fetchBrands()

        setBrandEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'Brand successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating brand:', err)
        setBrandEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating brand',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateBrand)
).subscribe({
    next: (item) => { 
      fetchBrands()
      let brand = item.value.data.onCreateBrand;
      console.log(brand)
       
      console.log("QUE HAY AHORA", brands)
      
      if (brands) {
        setBrands([...brands, brand ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateBrand)
).subscribe({
  next: (item) => { 
    //fetchBrands()
    console.log(item)
    let brandTemp = item.value.data.onUpdateBrand;
    console.log(brandTemp)
    let tempBrands = [...brands]
    let index = tempBrands.findIndex(item => item.id === brandTemp.id)
    
    if (tempBrands) {
      tempBrands[index] = brandTemp
      setBrands(tempBrands)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(brandName)
      addBrand()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyBrand()
  }

const onPageRendered = async () => {
  fetchBrands()
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

const getOnlyBrands = async () => {

  try {
    const brandData = await API.graphql({
      query: listBrands,
    
    })      
    
    const brands = await brandData.data.listBrands.items.filter(item => !item._deleted)   
    setBrands(brands)
    console.log("esta es una prueba *****", brands)
    

} catch (err) { console.log(err) }}




const fetchBrands = async () => {
  try {
      const brandData = await API.graphql({
        query: listBrands,
      
      })
      
      const brandsTemp = await API.graphql(graphqlOperation(listBrands, { limit: 2000})) 
      const brands = brandsTemp.data.listBrands.items.filter(item => !item._deleted)
      
      
      //const brands = await brandData.data.listBrands.items.filter(item => !item._deleted)   
      console.log("QUE TENEMOS AQUI:", brands)  
      sortItems(brands, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkBrands( sliceIntoChunks(brands, 10 ))
      setBrands(brands)
      console.log("esta es una prueba *****", brands)
      subscriptionUpdate()
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckBrands === null ? [] : chunckBrands ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchBrands() };
    
    
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
      console.log(brands)
      console.log(orderColumn.direction)
      sortItems(brands, orderColumn.direction);
      setChunkBrands( sliceIntoChunks(brands, 10 ))
      setBrands(brands)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setBrandEdit({id: item.id, name: item.name})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempBrands = brands.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempBrands = tempBrands.length > 0 ? tempBrands : brands
         
        
        setChunkBrands( sliceIntoChunks(tempBrands, 10 ))
      }
    }
    console.log(brandEdit.name)
    console.log(brandEdit.id)

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>Brands</h1>

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
                            Add Brand
                      </Button>}
            >
              <Modal.Header>Add Brand</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Brand Name</label>
                      <input placeholder='Brand Name' onChange={e => setBrandName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { brandName === "" ? true : false } onClick={handleSubmit}>
                Add Brand
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit Brand</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Brand Name</label>
                      <input placeholder='Brand Name' 
                      value = {brandEdit.name} 
                      onChange={e => setBrandEdit({id: brandEdit.id, name: e.target.value})}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive disabled = { brandEdit.name === "" ? true : false } onClick={handleUpdate}>
                Save Brand
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