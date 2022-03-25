import React, {useState} from 'react'
import { Button, Popup, Grid, Divider, Icon, Label } from 'semantic-ui-react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
//import HeaderMenu from '../HeaderMenu/HeaderMenu'


/*export default function UserIcon(props) {
    const [modalStatus, setModalStatus] = useState(false);
    let initials = `${props.user[0].toUpperCase()}${props.user[props.user.length - 1].toUpperCase()}`;

  return (
    <>
        <Button 
            color='olive' circular
            onClick={() => setModalStatus( true )}
        >
            {initials}
        </Button>
        <Modal
            //size={size}
            open={modalStatus}
            onClose={() => setModalStatus( false )}
        >
            <p>{props.user}</p>
        </Modal>
    </>
  );
  
}*/



export default function UserIcon(props) {
    const [modalStatus, setModalStatus] = useState(false);
    //let initials = `${props.user[0].toUpperCase()}${props.user[props.user.length - 1].toUpperCase()}`;
    let initials = props.user;
    

    /*async function onSignOutClick() {
        await Auth.signOut({ global: true })
            .then(data => console.log("Bueno"))
            .catch(err => console.log(err));
       }*/
    

  return (
    <>
        <Popup position='bottom right' size='large' wide trigger={<Button icon='user' circular color='olive' content={initials} />} on='click'>
            
            <Grid columns='equal'>
                <Grid.Column width={12}>                    
                    <Label>
                        <Icon name='user' /> {props.user}
                    </Label>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Icon link name='edit' />
                </Grid.Column>
            </Grid>
            
            <Divider />
            <AmplifySignOut />

        </Popup>
        
    </>
  );
  
}