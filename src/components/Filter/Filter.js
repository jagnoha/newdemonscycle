import { filenameToContentType } from '@aws-amplify/core'
import React, { useState, useEffect }from 'react'
import { Button, Icon, Popup, Dropdown, Grid, GridRow, GridColumn, Segment, Divider, Form, Input, Label } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'

export default function Filter(props) {
    
    const [checkedOR, setCheckedOR] = useState(true)
    const [filterList, setFilterList] = useState([])
    const [filterItem, setFilterItem] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [filterFormOpen, setFilterFormOpen] = useState(false)
    const [secondaryOption, setSecondaryOption] = useState(null)
    const [valueFilter, setValueFilter] = useState('')
    const [field, setField] = useState('')
    const [type, setType] = useState('')
    const [ formField, setFormField ] = useState('')
    const [ openFormField, setOpenFormField ] = useState(false)
    const [ readyToApply, setReadyToApply ] = useState(false)

    
        const filterOptions = [
        { key: 'Amazon Price',text: 'Amazon Price',value: 'Amazon Price', type: 'numberOptions' },
        //{ key: 'Attribute',text: 'Attribute',value: 'Attribute', type:'attributeList' },
        { key: 'Brand',text: 'Brand',value: 'Brand', type:'brandList' },
        { key: 'Category',text: 'Category',value: 'Category', type:'categoryList' },
        { key: 'Cost',text: 'Cost',value: 'Cost', type: 'numberOptions' },
        { key: 'Description',text: 'Description',value: 'Description', type: 'textOptions' },
        { key: 'eBay Category Store',text: 'ebay Category Store',value: 'eBay Category Store', type:'ebayCategoryList' },
        { key: 'eBay Price',text: 'eBay Price', value: 'eBay Price', type: 'numberOptions' },
        { key: 'Manufacturer',text: 'Manufacturer', value: 'Manufacturer', type: 'manufacturerList' },
        { key: 'MPN',text: 'MPN',value: 'MPN', type: 'textOptions' },
        { key: 'MSRP',text: 'MSRP',value: 'MSRP', type: 'numberOptions' },
        { key: 'Source',text: 'Source',value: 'Source', type: 'sourceOptions' },
        { key: 'Status',text: 'Status',value: 'Status', type: 'statusOptions' },
        { key: 'Store Price',text: 'Store Price',value: 'Store Price', type: 'numberOptions' },
        { key: 'SubCategory',text: 'SubCategory',value: 'SubCategory', type: 'subCategoryList' },
        { key: 'SubCategory2',text: 'SubCategory2',value: 'SubCategory2', type: 'subCategoryList2' },
        { key: 'SKU',text: 'SKU',value: 'SKU', type: 'textOptions' },
        { key: 'parentSKU',text: 'parentSKU',value: 'parentSKU', type: 'textOptions' },
        { key: 'Title',text: 'Title',value: 'Title', type: 'textOptions' },
        
    ]

    const sourceOptions = [
        { key: 'Warehouse',text: 'Warehouse', value: 'Warehouse' },
        { key: 'Dropship',text: 'Dropship', value: 'Dropship' },
    ]

    const statusOptions = [
        { key: 'Active',text: 'Active', value: 'Active' },
        { key: 'Draft',text: 'Draft', value: 'Draft' },
    ]

    const numberOptions = [
        { key: 'Equals',text: 'Equals', value: 'eq' },
        { key: 'Does not Equal',text: 'Does not Equal',value: 'ne' },
        //{ key: 'Empty',text: 'Empty',value: 'Empty' },
        //{ key: 'Not Empty',text: 'Not Empty',value: 'Not Empty' },
        { key: 'Greater Than',text: 'Greater Than',value: 'gt' },
        { key: 'Greater Than Or Equal To',text: 'Greater Than Or Equal To',value: 'ge' },
        { key: 'Less Than',text: 'Less Than',value: 'lt' },
        { key: 'Less Than Or Equal To',text: 'Less Than Or Equal To',value: 'le' },
    ]

    const textOptions = [
        { key: 'Exact Match',text: 'Exact Match', value: 'eq' },
        { key: 'Contains',text: 'Contains',value: 'matchPhrase' },
        { key: 'Starts With',text: 'Starts With',value: 'matchPhrasePrefix' },
        //{ key: 'Ends With',text: 'Ends With',value: 'Ends With' },
        //{ key: 'Empty',text: 'Empty',value: 'Empty' },
        //{ key: 'Not Empty',text: 'Not Empty',value: 'exists' },
        //{ key: 'Does Not Contain',text: 'Does Not Contain',value: 'ne' },
        
    ]

    const brandList = props.brands.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })

      const manufacturerList = props.manufacturers.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })

      const categoryList = props.categories.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })

      const subCategoryList = props.subCategories.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })

      const subCategoryList2 = props.subCategories2.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })

    const ebayCategoryList = props.ebayStoreCategorys.map(item => {
        return (
            { key: item.id, text: item.name, value: item.name }
        )
    }).sort( (a,b) => {
        let nameA = a.text.toUpperCase()
        let nameB = b.text.toUpperCase()
        if (nameA < nameB){
          return -1                                      
        }
        if (nameA > nameB){
          return 1
        }
        return 0
      })


      
    
    

    const handleFilterOptions = (e, data) => {
        //console.log(e.target)
        const value = data.value
        setReadyToApply(false)
        setOpenFormField(false)
        console.log(value)
        setField(value)
        let typeTemp = filterOptions.find(item => item.key === value).type
        console.log(type)
        setType(typeTemp)
        
        if (typeTemp === 'numberOptions') {
            setSecondaryOption(numberOptions)
        } else if (typeTemp === 'textOptions') {
            setSecondaryOption(textOptions)
        } else if (typeTemp === 'sourceOptions'){
            setSecondaryOption(sourceOptions)
        } else if (typeTemp === 'statusOptions'){
            setSecondaryOption(statusOptions)
        } else if (typeTemp === 'brandList'){
            setSecondaryOption(brandList)
        } else if (typeTemp === 'manufacturerList'){
            setSecondaryOption(manufacturerList)
        } else if (typeTemp === 'categoryList'){
            setSecondaryOption(categoryList)
        } else if (typeTemp === 'subCategoryList'){
            setSecondaryOption(subCategoryList)
        } else if (typeTemp === 'subCategoryList2'){
            setSecondaryOption(subCategoryList2)
        } else if (typeTemp === 'ebayCategoryList'){
            setSecondaryOption(ebayCategoryList)
        }
        else {
            setSecondaryOption(null)
        }
        
    }

    const handleSecondaryFilterOptions = (data) => {
        let textTemp = data.options.find(item => item.value === data.value)
        let text = textTemp && textTemp.text ? textTemp.text : ''
        console.log("**********************", text)
        //.filter(item => item.value === data.value).text)
        const value = data.value
        const key = data.id
        setReadyToApply(false)
        setOpenFormField(false)
        console.log(value)

        let id = uuidv4()

        if (value === 'Empty'){
            //setFilterList([...filterList, {id, field: field, comparation: value, value: 'Empty' }])
            setFilterItem({id, field: field, comparation: value, value: 'Empty', text: text })
            setReadyToApply(true)
        } else if (value === 'Not Empty'){
            //setFilterList([...filterList, {id, field: field, comparation: value, value: 'Not Empty' }])
            setFilterItem({id, field: field, comparation: value, value: 'Not Empty', text: text })
            setReadyToApply(true)            
        } else if (value === 'Warehouse' || value === 'Dropship'){
            setFilterItem({id, field: field, comparation: 'eq', value: value, text: 'is' })
            setReadyToApply(true) 
        } else if (field === 'Brand' || field === 'Manufacturer' || field === 'Category' || field === 'SubCategory' || field === 'SubCategory2' || field === 'eBay Category Store'){
            setFilterItem({id, field: field, comparation: 'eq', value: value, text: 'is' })
            setReadyToApply(true)
        } else if (field === 'Status'){
            setFilterItem({id, field: field, comparation: 'eq', value: value, text: 'is' })
            setReadyToApply(true)     
        } else {
            //setFilterList([...filterList, {id, field: field, comparation: value }])
            setFilterItem({id, field: field, comparation: value, text: text })
            setOpenFormField(true)
        }

        /*let type = filterOptions.find(item => item.key === value).type
        console.log(type)
        if (type === 'numberOptions') {
            setSecondaryOption(numberOptions)
        } else if (type === 'textOptions') {
            setSecondaryOption(textOptions)
        } else {
            setSecondaryOption(null)
        }*/
        
    }

    const secondaryDropList = (option) => {
        return (
            <Segment>
            <Dropdown
                    style={{marginLeft: 10}}
                        placeholder='-- Select a Field --'
                        //fluid
                        selection
                        options={option}
                        search
                        onChange={ /*(e,{value}) => console.log(value)*/ (e,data) => handleSecondaryFilterOptions(data)}
                    />
            </Segment>
        )
    }

    const handleValueComparationField = (evt) => {
        let value = evt.target.value
        console.log(value)

        if (value.length > 0){
            setReadyToApply(true)
        }

        setFilterItem( (values) => ({
          ...values, value  
        }))
    }

    const handleAddFilter = () => {
        setFilterList([...filterList, filterItem])
        props.handleFilterList([...filterList, filterItem])
        setCheckedOR(!checkedOR)
        setOpenPopup(false)
        //setFilterList([])
        setFilterItem(null)
        setFilterFormOpen(false)
        setSecondaryOption(null)
        setField('')
        setType('')
        setReadyToApply(false)
        setFormField('')
        setOpenFormField(false)
    }

    const valueComparationField = () => {
        return (
        <Segment>
                <Input placeholder='' type ={type === 'numberOptions' ? 'number' : 'text'} onChange = {(e) => handleValueComparationField(e)} />        
        </Segment>
        )  
    }

    const handleCloseFilter = () => {
        setCheckedOR(!checkedOR)
        //setFilterList([])
        setFilterItem(null)
        setFilterFormOpen(false)
        setSecondaryOption(null)
        setField('')
        setType('')
        setReadyToApply(false)
        setFormField('')
        setOpenFormField(false)
        setOpenPopup(false)
    }

    const handleDeleteItem = (id) => {
        console.log(id)
        setFilterList(filterList.filter(item => item.id !== id))

        props.handleFilterList(filterList.filter(item => item.id !== id))
    }

    

    const filterListTags = () => {
        
        let test = filterList.map(item => {
            return (
            <Label color='blue' key={item.id}>
                <Icon name='delete' onClick = {()=>handleDeleteItem(item.id)} /> {`${item.field} ${item.text}
                ${   (item.comparation !== 'Empty' && item.comparation !== 'Not Empty') ? item.value : '' }`}
            </Label>
            )
        })

        return (test)
        
        
        
            
    }

    console.log(filterList)
    console.log(filterItem)
    //console.log(manufacturerList_test)
    //console.log

    return (
    
    <span>
        
    <span style={{marginLeft: 20, marginRight: 5}}>Filters</span>
    <span>
              
            <Popup
            //style = {{backgroundColor: 'whitesmoke'}}
            hoverable={false}
            open = {openPopup}
            onOpen={()=>setOpenPopup(true)}
            //wide={true}
            offset={[-10, 0]}
            position='bottom left'
            //onClick={()=>setFilterFormOpen(!filterFormOpen)}
            onClose={() => handleCloseFilter()} //          ()=>setCheckedOR(!checkedOR)}
            //inverted
            //disabled={filterFormOpen}
            content={
                
                    <>
                     <Segment.Group horizontal>
                     <Segment secondary> 
                     
                    <Dropdown
                        
                        placeholder='-- Select a Field --'
                        //fluid
                        selection
                        options={filterOptions}
                        search
                        onChange={(e, data) => handleFilterOptions(e, data)}
                    />
                    </Segment>
                    
                    {console.log(checkedOR)}
                    
                    { secondaryOption ? secondaryDropList(secondaryOption) : ""}
                    { /*console.log("ddsds: ", secondaryOption)*/ }

                    { openFormField ? valueComparationField() : ""}
                    
                    
                    <Segment>
                    <Button 
                        onClick = {()=>handleAddFilter()}
                        disabled = {!readyToApply} primary style={{marginLeft: 10}}>Add</Button>
                    </Segment>
                    
                        
                    
                    </Segment.Group>
                    

                    </>
                    
                    
                
                }
                on='click'
                //positionFixed
                trigger={<Icon onClick = {()=>setCheckedOR(!checkedOR)} name={checkedOR ? 'plus square' : 'caret square up'} />}            
            />
           
           
    </span>
    <span style={{marginLeft: 10}}>
    
    { filterList.length > 0 ? filterListTags() : '' } 
    
    
    
    </span>
   
     
    </span>
  );
  
}