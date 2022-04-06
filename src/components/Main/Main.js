import React, { useState, useEffect } from 'react'
import { Route, Routes, Link, useLocation, useNavigate  } from "react-router-dom"
import Home from "../Home/Home"
import Products from "../Products/Products"
import Brands from "../Brands/Brands"
import Header from "../Header/Header"
import { Menu, Segment, Grid, Icon, Divider, Container, Tab, Label, Dropdown, Input, Popup} from 'semantic-ui-react'
import Manufacturers from '../Manufacturers/Manufacturers'
import Categories from '../Categories/Categories'
import Reports from '../Reports/Reports'
import Settings from '../Settings/Settings'
import SubCategories from '../SubCategories/SubCategories'
import SubCategories2 from '../SubCategories2/SubCategories2'
import EbayStoreCategories from '../EbayStoreCategories/EbayStoreCategories'
import Attributes from '../Attributes/Attributes'
import ExportFile from '../ExportFile/ExportFile'
import Amplify, { API, graphqlOperation, Storage, DataStore } from 'aws-amplify'
import { listAttributes, listBrands, listCategories, listSubCategories, listSubCategory2s, listProducts } from '../../graphql/queries'
import aws_exports from '../../aws-exports'

//const Home = () => <h1>Home</h1>;
//const Products = () => <h1>Products</h1>;

const style = {
  opacity: 0.8,
}



export default function Main(props) {

  const [attributes, setAttributes] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [subCategories2, setSubCategories2] = useState([])
  //const [products, setProducts] = useState([]) 
    

    const routes = [
        {
          path: "/",
          main: () => <Home user={props.user} />,          
        },
        {
          path: "/products",
          main: () => <Products />,         
        },
        {
          path: "/brands",
          main: () => <Brands />,          
        },
        {
          path: "/manufacturers",
          main: () => <Manufacturers />,          
        },
        {
          path: "/categories",
          main: () => <Categories />,          
        },                
        {
          path: "/reports",
          main: () => <Reports attributes = {attributes} 
                                brands = {brands} 
                                categories = {categories}
                                subCategories = {subCategories}
                                subCategories2 = {subCategories2}/>,          
        },
        {
          path: "/settings",
          main: () => <Settings />,          
        },
        {
          path: "/subcategories",
          main: () => <SubCategories />,          
        },
        {
          path: "/subcategories2",
          main: () => <SubCategories2 />,          
        },
        {
          path: "/ebaystorecategories",
          main: () => <EbayStoreCategories />,          
        },
        {
          path: "/attributes",
          main: () => <Attributes />,          
        },
        {
          path: "/exportfile",
          main: () => <ExportFile attributes = {attributes} 
                                  brands = {brands} 
                                  categories = {categories}
                                  subCategories = {subCategories}
                                  subCategories2 = {subCategories2}
                                  />,          
        }                   
      ];

      const location = useLocation();
      const navigate = useNavigate()
      const menuItem = location.pathname.split('/')[1]; 
      console.log(location.pathname);

      
      const [activeItem, setActiveItem] = useState(menuItem);

      /*function handleItemClick(item) {          
        setActiveItem(item);
        navigate(`/${item}`)
      }*/

      const handleItemClick = (item) => {
        setActiveItem(item);
        navigate(`/${item}`)
      }
      

      function getTitle(){
        let newTitle = '';
        if (menuItem === ''){
            return 'Dashboard'
        } else if (menuItem === 'products'){
            return 'Products'
        } else if (menuItem === 'brands'){
          return 'Brands'
        } else if (menuItem === 'manufacturers'){
          return 'Manufacturers'
        } else if (menuItem === 'categories'){
          return 'Categories'
        } else if (menuItem === 'subcategories'){
          return 'Subcategories'
        } else if (menuItem === 'subcategories2'){
          return 'Subcategories 2'
        } else if (menuItem === 'ebaystorecategories'){
          return 'eBay Store Categories'          
        } else if (menuItem === 'reports'){
          return 'Reports'
        } else if (menuItem === 'settings'){
          return 'Settings'
        } else if (menuItem === 'attributes'){
          return 'Product Attributes'
        } else if (menuItem === 'exportfile'){
          return 'Export Files'
        } 
        
        return newTitle;
      }

      /*useEffect(() => {
        DataStore.clear()       
        
        
    }, [])*/

      let newTitle = getTitle();

      const fetchAttributes = async () => {
        try {
          const attributesData = await API.graphql({
            query: listAttributes,          
          })
          const attributesTemp = await attributesData.data.listAttributes.items.filter(item => !item._deleted)      
          setAttributes(attributesTemp)
          //console.log("OTROS ATTRIBUTES:", attributes)   
          
      
        } catch (err) { console.log(err) }
    }

    

    const fetchBrands = async () => {
      try {
        const brandsData = await API.graphql({
          query: listBrands,
        })
        
        const brandsTemp = await API.graphql(graphqlOperation(listBrands, { limit: 2000})) 
        const brands = brandsTemp.data.listBrands.items.filter(item => !item._deleted)
      
        //const brands = await brandsData.data.listBrands.items.filter(item => !item._deleted)   
        setBrands(brands)

      } catch (err) { console.log(err) }
  }

  const fetchCategories = async () => {
    try {
      const categoriesData = await API.graphql({
        query: listCategories,
      
      })

      const categorysTemp = await API.graphql(graphqlOperation(listCategories, { limit: 1000})) 
      const categories = categorysTemp.data.listCategories.items.filter(item => !item._deleted)
            
      //const categories = await categoriesData.data.listCategorys.items.filter(item => !item._deleted)      
      setCategories(categories)   
      
  
    } catch (err) { console.log(err) }
  }

  const fetchSubCategories = async () => {
    try {
      const subCategoriesData = await API.graphql({
        query: listSubCategories,
      
      }) 
      
      const subCategorysTemp = await API.graphql(graphqlOperation(listSubCategories, { limit: 1000})) 
      const subCategories = subCategorysTemp.data.listSubCategories.items.filter(item => !item._deleted)
      
      
      //const subCategories = await subCategoriesData.data.listSubCategorys.items.filter(item => !item._deleted)      
      setSubCategories(subCategories)             
  
    } catch (err) { console.log(err) }
  }

  const fetchSubCategories2 = async () => {
    try {
      const subCategoriesData2 = await API.graphql({
        query: listSubCategory2s,
      
      })     
      const subCategories2 = await subCategoriesData2.data.listSubCategory2s.items.filter(item => !item._deleted)      
      setSubCategories2(subCategories2)             
  
    } catch (err) { console.log(err) }
  }
      
    useEffect(() => {
        //fetchProducts()
        fetchAttributes()
        fetchBrands()
        fetchCategories()
        fetchSubCategories()
        fetchSubCategories2()
    }, [])

  return (
    <div>
      


     <Header user={props.user} title = {newTitle} />
      <Grid stretched>
      <Grid.Column width={1}>
        
      <Menu icon vertical pointing borderless={true} fixed={'left'} style = {{top:55}}>
        <Menu.Item
          name='home'
          active={activeItem === ''}          
          onClick={()=>handleItemClick('')}
        >
         <Popup content='Home' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='home' />} />
        </Menu.Item>

        <Menu.Item
          name='products'
          active={activeItem === 'products'}
          onClick={()=>handleItemClick('products')}
        >
          <Popup content='Products' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='tags' />} />
        </Menu.Item>

        <Menu.Item
          name='attributes'
          active={activeItem === 'attributes'}
          onClick={()=>handleItemClick('attributes')}
        >
          <Popup content='Attributes' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='options' />} />
        </Menu.Item>

        <Menu.Item
          name='brands'
          active={activeItem === 'brands'}
          onClick={()=>handleItemClick('brands')}
          
        >
          <Popup content='Brands' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='motorcycle' />} />
         
        </Menu.Item>
        <Menu.Item
          name='manufacturers'
          active={activeItem === 'manufacturers'}
          onClick={()=>handleItemClick('manufacturers')}
        >
          <Popup content='Manufacturers' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='factory' />} />
         
        </Menu.Item>
        

        <Popup content='Categories & SubCategories' position='right center' style={style} offset={[0, 0]} inverted 
        trigger= { <Dropdown item trigger={<Icon size='large' name='sitemap' />}>
        <Dropdown.Menu>
          <Dropdown.Item text='Main Categories' onClick={()=>handleItemClick('categories')} active={activeItem === 'categories'} />
          <Dropdown.Item text='SubCategories' onClick={()=>handleItemClick('subcategories')} active={activeItem === 'subcategories'} />
          <Dropdown.Item text='SubCategories 2' onClick={()=>handleItemClick('subcategories2')} active={activeItem === 'subcategories2'} />
          <Dropdown.Item text='eBay Store Categories' onClick={()=>handleItemClick('ebaystorecategories')} active={activeItem === 'ebaystorecategories'} />
        </Dropdown.Menu>
      </Dropdown> } /> 
        
        

      </Menu>

      <Menu icon vertical pointing borderless={true} fixed={'bottom'} >
      <Menu.Item
          name='exportfile'
          active={activeItem === 'exportfile'}
          onClick={()=>handleItemClick('exportfile')}
        >
         <Popup content='Export Files' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='download' />} />
          
        </Menu.Item>
      <Menu.Item
          name='reports'
          active={activeItem === 'reports'}
          onClick={()=>handleItemClick('reports')}
        >
         <Popup content='Reports' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='table' />} />
          
        </Menu.Item>

        
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}
          onClick={()=>handleItemClick('settings')}
        >
         <Popup content='Settings' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='settings' />} />
          
        </Menu.Item>

        </Menu>
      </Grid.Column>
      <Grid.Column width={15} >
        <Container fluid>
        <Routes>
        {routes.map(({ path, main }) => (
          <Route key={path} path={path} element={main()} />
        ))}
      </Routes>
          
        </Container>
        </Grid.Column>
        </Grid>
 



      
      
      
      
      











      


    </div>
  );
}
