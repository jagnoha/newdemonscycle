import React, {useState} from 'react'
import { Form, Checkbox, GridRow, CardContent } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion, Transition, Button, Card, Image } from 'semantic-ui-react'

export default function FindReplaceForm(props) {

    return (
        <Form>
            <Grid>
            <Grid.Row>
            <Grid.Column width={8}>
            <Form.Field>
            <label>Find</label>
            <input placeholder='Text to Find' 
                value = {props.findText}
                onChange = {props.handleFindText}
            />
            </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
            <Form.Field>
            <label>Replace</label>
            <input placeholder='Text to Replace' 
                value = {props.replaceText}
                onChange = {props.handleReplaceText}
            />
            </Form.Field>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </Form>
    )


}