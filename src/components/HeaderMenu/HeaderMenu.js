import React, { useState } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import UserIcon from '../UserIcon/UserIcon';
//import Auth from '@aws-amplify/auth';

export default function HeaderMenu(props) {
    
    const [activeItem, setActiveItem] = useState('');
    //const [user, setUser] = useState(null);
  
    
    
  return (
    <div>      
      <Menu>
        <Menu.Item>
          <Image size='tiny' src='https://cdn.shopify.com/s/files/1/0338/9682/4876/files/demoncycle-logo-red_130x.png?v=1594169278' />
        </Menu.Item>
        <Menu.Item
          name='title' 
          
        >
          <h3>{props.title}</h3>
        </Menu.Item>

        
        <Menu.Menu position='right'>
        
            
          <Menu.Item
            name='username'
            //active={activeItem === 'help'}
            //onClick={() => setActiveItem( 'help' )}
    
          >
            <UserIcon user = {props.user} />   
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>  
  );
  
}