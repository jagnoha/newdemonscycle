import React from 'react'
import Header from '../Header/Header';
import { Menu, Segment, Grid, Icon, Divider, Container, Tab, Label, Input} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'



export default function Home(props) {
  
  return (
    <div style={divStyle}>
        <SemanticToastContainer position="top-center" />
        <h1>Dashboard</h1>
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