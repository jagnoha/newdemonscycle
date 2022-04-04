import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import Header from '../Header/Header';
import { Menu, Segment, Grid, Icon, Divider, Container, Tab, Label, Input, Table} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { searchProducts } from '../../graphql/queries'




export default function Home(props) {

  const [products24hrsUpdated, setProducts24hrsUpdated] = useState([])
  const [products7daysUpdated, setProducts7daysUpdated] = useState([])
  const [products31daysUpdated, setProducts31daysUpdated] = useState([])
  const [products90daysUpdated, setProducts90daysUpdated] = useState([])

  const [products24hrsCreated, setProducts24hrsCreated] = useState([])
  const [products7daysCreated, setProducts7daysCreated] = useState([])
  const [products31daysCreated, setProducts31daysCreated] = useState([])
  const [products90daysCreated, setProducts90daysCreated] = useState([])

  const fetchProducts24hrs = async () => {

    let d = new Date()
    
    let date = d.setDate(d.getDate() - 1)

    let productUpdated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          updatedOn: {gt: date},
        },        
    }))

    let productCreated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          createdOn: {gt: date},
        },        
    }))

    setProducts24hrsUpdated(productUpdated.data.searchProducts.total)
    setProducts24hrsCreated(productCreated.data.searchProducts.total)
  }

  const fetchProducts7days = async () => {

    let d = new Date()
    
    let date = d.setDate(d.getDate() - 7)

    let productUpdated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          updatedOn: {gt: date}
        },        
    }))

    let productCreated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          createdOn: {gt: date}
        },        
    }))

    setProducts7daysUpdated(productUpdated.data.searchProducts.total)
    setProducts7daysCreated(productCreated.data.searchProducts.total)
  }

  const fetchProducts31days = async () => {

    let d = new Date()
    
    let date = d.setDate(d.getDate() - 31)

    let productUpdated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          updatedOn: {gt: date}
        },        
    }))

    let productCreated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          createdOn: {gt: date}
        },        
    }))

    setProducts31daysUpdated(productUpdated.data.searchProducts.total)
    setProducts31daysCreated(productCreated.data.searchProducts.total)
  }

  const fetchProducts90days = async () => {

    let d = new Date()
    
    let date = d.setDate(d.getDate() - 90)

    let productUpdated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          updatedOn: {gt: date}
        },        
    }))

    let productCreated = await API.graphql(
      graphqlOperation(searchProducts, {
        filter: { 
          createdOn: {gt: date}
        },        
    }))

    setProducts90daysUpdated(productUpdated.data.searchProducts.total)
    setProducts90daysCreated(productCreated.data.searchProducts.total)
  }

  useEffect(() => {
    fetchProducts24hrs()
    fetchProducts7days()
    fetchProducts31days()
    fetchProducts90days()
  }, [])

  console.log(products24hrsUpdated)
  
  return (
    <div style={divStyle}>
        <SemanticToastContainer position="top-center" />
        <h1>Product Overview</h1>

        <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Last 24 hrs</Table.HeaderCell>
                <Table.HeaderCell>Last 7 days</Table.HeaderCell>
                <Table.HeaderCell>Last 31 days</Table.HeaderCell>
                <Table.HeaderCell>Last 90 days</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Updated Products</Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products24hrsUpdated >= 10000 ? '+10000' : products24hrsUpdated }</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products7daysUpdated >= 10000 ? '+10000' : products7daysUpdated }</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products31daysUpdated >= 10000 ? '+10000' : products31daysUpdated }</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products90daysUpdated >= 10000 ? '+10000' : products90daysUpdated }</span></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Created Products</Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products24hrsCreated >= 10000 ? '+10000' : products24hrsCreated }</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products7daysCreated >= 10000 ? '+10000' : products7daysCreated}</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products31daysCreated >= 10000 ? '+10000' : products31daysCreated}</span></Table.Cell>
                <Table.Cell><span style={{fontSize: 25}}>{products90daysCreated >= 10000 ? '+10000' : products90daysCreated}</span></Table.Cell>
              </Table.Row>
            </Table.Body>
        </Table>

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