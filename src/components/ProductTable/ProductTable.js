//import { Button } from 'jodit/types/core/ui'
import React, { useState } from 'react'
import { Table, Loader, Container, Image, Label, Icon, Checkbox, Segment, Header, Grid, Popup, Button } from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'
import {CopyToClipboard} from 'react-copy-to-clipboard'

function AttributeList(props){
    let attributeParse = props.attributesSelected ? JSON.parse( props.attributesSelected) : [] 
    /*console.log("MMMMMMMMMMMMMMMMM: ", props.attributesSelected.map(item => {
        return ({
            id: item.id,
            value: item.value,
        })
    }))*/

    let list = []
    for (let item of attributeParse){
        let attr = props.attributes.find(itemAtr => itemAtr.id === item.id)
        if (item && props.attributes){
            list.push({
                name: attr ? attr.name : "",
                value: item.value
            })
        }
    }
    //console.log(list)
    if (props.attributes) {
    return (
        <div>
            {list.map(item => {
                return (
                    <p>
                        

                        <Label size={"mini"}>
                            {item.name}
                            <Label.Detail>{item.value}</Label.Detail>
                        </Label>
                        
                    </p>
                )
            })}
        </div>
    )}

    return (
        <div></div>
    )
}

export default function ProductTable(props) {

    const [hoveredItem, setHoveredItem] = useState({col:'',id:''})
    const [copiedItem, setCopiedItem] = useState(false)

    function onHoveredItem(e, col, id){
        e.stopPropagation()
        console.log(col)
        console.log(id)
        setHoveredItem({col, id})
    }

    function onOutHoveredItem(e){
        e.stopPropagation()
        setHoveredItem({col: '', id: ''})
        setCopiedItem(false)
    }

    function truncTitle(title){
        let newTitle;
        
        title.length > 25 ? newTitle = title.slice(0,30) + ' ...' : newTitle = title
        
        return newTitle

    }

    if (!props.data) {  

    return (
        
        <Container>

            <Loader active style = {{top:350}} />        
        </Container>
        
    );

    }
    
    if (props.data && props.data.length === 0) {  

        return (
            
            <Container style={{padding: 50}}>    
                    <Segment placeholder>
                    <Header style={{textAlign: 'center'}}>                    
                    Nothing matches your filters
                    </Header>                    
                </Segment>    
            </Container>
            
        );
    
        } 

    console.log("ESTA ES LA DATA: ",props.data)


    return (
        
            <Table style={{fontSize:12}} sortable selectable basic>
        <Table.Header>


            
          <Table.Row >
          <Table.HeaderCell > 
              <Checkbox 
                    toggle 
                    onChange= {(e, data) => props.handleSelectAllProductsInPage(e, data.checked) } //{(e, data) => setChecked(data.checked)}
                    //checked={props.productsSelected.find(itemSelected => itemSelected === item.id ) ? true : false}
                    checked = {props.productsSelectedAll}
                />
            </Table.HeaderCell>
            <Table.HeaderCell >Status</Table.HeaderCell>
            <Table.HeaderCell >Images</Table.HeaderCell>
            <Table.HeaderCell width={2}
                sorted={props.orderColumn.column === 'SKU' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('SKU')}
            >SKU</Table.HeaderCell>
            <Table.HeaderCell width={1}>Source</Table.HeaderCell>
            
            
            <Table.HeaderCell width={2} sorted={props.orderColumn.column === 'titleStore' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('titleStore')}>Title</Table.HeaderCell>
            
            
            <Table.HeaderCell width={2}
                sorted={props.orderColumn.column === 'mpn' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('mpn')}>MPN
            </Table.HeaderCell>
            <Table.HeaderCell width={1}
                /*sorted={props.orderColumn.column === 'brandID' ? props.orderColumn.direction : null}*/
                /*onClick={() => props.handleOrder('brandID')}*/>Brand
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Attributes</Table.HeaderCell>
            <Table.HeaderCell width={1} /*sorted={props.orderColumn.column === 'categoryID' ? props.orderColumn.direction : null}*/
                /*onClick={() => props.handleOrder('categoryID')}*/     
                 >Category</Table.HeaderCell>
            <Table.HeaderCell width={1} /*sorted={props.orderColumn.column === 'subcategoryID' ? props.orderColumn.direction : null}*/
                /*onClick={() => props.handleOrder('subcategoryID')}*/ >SubCategory</Table.HeaderCell>
            <Table.HeaderCell width={1} /*sorted={props.orderColumn.column === 'subcategory2ID' ? props.orderColumn.direction : null}*/
                /*onClick={() => props.handleOrder('subcategory2ID')}*/ >SubCategory 2</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted={props.orderColumn.column === 'priceMSRP' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('priceMSRP')} >MSRP</Table.HeaderCell>
            <Table.HeaderCell sorted={props.orderColumn.column === 'cost' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('cost')}>Cost</Table.HeaderCell>
            {/*<Table.HeaderCell width={1} sorted={props.orderColumn.column === 'createdAt' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('createdAt')}>Created</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted={props.orderColumn.column === 'updatedAt' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('updatedAt')}>Updated</Table.HeaderCell>*/}
                <Table.HeaderCell sorted={props.orderColumn.column === 'createdOn' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('createdOn')}  
                >Created</Table.HeaderCell>
                <Table.HeaderCell sorted={props.orderColumn.column === 'updatedOn' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('updatedOn')}  
                >Updated</Table.HeaderCell>
            
            
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            
            {props.data.map((item) => {
                let category = props.categories.find(itemCat => itemCat.id === item.categoryID )
                let subCategory = props.subCategories.find(itemCat => itemCat.id === item.subcategoryID )
                let subCategory2 = props.subCategories2.find(itemCat => itemCat.id === item.subcategory2ID )
                let brand = props.brands.find(itemBrand => itemBrand.id === item.brandID )
                //console.log(brand)
                //let attributesSelected = item.Attributes ? JSON.parse(item.Attributes) : ""
                //console.log("Atributes Selected: ", attributesSelected)
                
                
                return (
            <Table.Row key={item.id} >
            <Table.Cell >
                 <Checkbox 
                    onChange= {(e, data,id) => props.handleProductSelected(e, data.checked, item.id) } //{(e, data) => setChecked(data.checked)}
                    checked={props.productsSelected.find(itemSelected => itemSelected === item.id ) ? true : false}
                    toggle
                  />
            </Table.Cell>
            {/*<Table.Cell onClick = {()=>props.openForm(item)}>{item.status === 'Active' ? <Icon color="green" name = "circle" /> : <Icon name = "circle" /> }                
            </Table.Cell>*/}

            <Table.Cell onClick = {()=>props.openForm(item)}>{<Popup trigger={item.status === 'Active' ? <Icon color="green" name = "circle" /> : <Icon name = "circle" /> } content={item.status} size='mini' inverted />
 }                
            </Table.Cell>

            
            <Table.Cell onClick = {()=>props.openForm(item)}>
                
                {/*<Image src={item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""} size='mini' />*/}
                <Image src={JSON.parse(item.images).length > 0 ? JSON.parse(item.images)[0].data_url : ""} size='mini' />
            
            </Table.Cell>
            
            {/*<Table.Cell onClick = {()=>props.openForm(item)}>{item.SKU}</Table.Cell>*/}
            
            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'sku',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                        {item.SKU}&nbsp; 
                                    {
                                    hoveredItem.col === 'sku' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={item.SKU}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                                    
                    </div>

                    
                    

                    { item.parentSKU ?
                    <div onMouseEnter={(e) => onHoveredItem(e, 'parentSKU',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)}>                    
                                    
                                    
                                   
                                        <span>
                                            <br></br>
                                    
                                    <Label size={'mini'}>
                                        <Icon name='fork' />
                                        {item.parentSKU}
                                    </Label></span>
                                    
                                    
                                    
                                    {
                                    hoveredItem.col === 'parentSKU' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={item.parentSKU}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div> : ""}

                                

                   



            </Table.Cell>
            
            <Table.Cell onClick = {()=>props.openForm(item)}>
                {item.sourceWarehouse ? <Label color='blue' size={"mini"}>Warehouse</Label> : ''}  
                {item.sourceDropship ? <Label color='orange' size={"mini"}>Dropship</Label> : ''}          
            </Table.Cell>
            
            {/*<Table.Cell onClick = {()=>props.openForm(item)}><Popup basic position='bottom left' flowing='true' trigger={<span>{truncTitle(item.titleStore)}</span>} content={item.titleStore} /></Table.Cell>*/}

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'title',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                        {item.titleStore}&nbsp; 
                                    {
                                    hoveredItem.col === 'title' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={item.titleStore}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'mpn',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                        {item.mpn}&nbsp; 
                                    {
                                    hoveredItem.col === 'mpn' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={item.mpn}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>


            {/*<Table.Cell onClick = {()=>props.openForm(item)}>{brand ? brand.name : ""}</Table.Cell>*/}

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'brand',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                    {brand ? brand.name : ""}&nbsp; 
                                    {
                                    hoveredItem.col === 'brand' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={brand ? brand.name : ""}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>



            <Table.Cell onClick = {()=>props.openForm(item)}><AttributeList attributesSelected = {item.Attributes} attributes = {props.attributes} /></Table.Cell>
            
            {/*<Table.Cell onClick = {()=>props.openForm(item)}>{ 
                    category ? category.name : ""

                }</Table.Cell>*/}

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'category',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                    {category ? category.name : ""}&nbsp; 
                                    {
                                    hoveredItem.col === 'category' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={category ? category.name : ""}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>



                {/*<Table.Cell onClick = {()=>props.openForm(item)}>{ 
                    subCategory ? subCategory.name : ""

                }</Table.Cell>*/}

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'subCategory',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                    {subCategory ? subCategory.name : ""}&nbsp; 
                                    {
                                    hoveredItem.col === 'subCategory' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={subCategory ? subCategory.name : ""}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>



                {/*<Table.Cell onClick = {()=>props.openForm(item)}>{ 
                    subCategory2 ? (subCategory2.id === '3dc30aff-66a5-49fa-9f20-49c76031a994' ? "" : subCategory2.name) : ""

                }</Table.Cell>*/}

            <Table.Cell  onClick = {(e)=>{ e.stopPropagation(); props.openForm(item)} } >
                    <div onMouseEnter={(e) => onHoveredItem(e, 'subCategory2',item.id)} onMouseLeave={(e)=>onOutHoveredItem(e)} >
                    {subCategory2 ? (subCategory2.id === '3dc30aff-66a5-49fa-9f20-49c76031a994' ? "" : subCategory2.name) : ""}&nbsp; 
                                    {
                                    hoveredItem.col === 'subCategory2' && hoveredItem.id === item.id ?
                                    copiedItem === false ?
                                    <Popup inverted flowing='true' trigger={
                                        <CopyToClipboard text={subCategory2 ? (subCategory2.id === '3dc30aff-66a5-49fa-9f20-49c76031a994' ? "" : subCategory2.name) : ""}  >          
                                            <Icon name='copy outline' onClick={(e)=> {e.stopPropagation();setCopiedItem(true);console.log("Copied!!")}}    />
                                        </CopyToClipboard>
                                        } size='mini' content='Copy Text' /> :
                                        <Popup inverted flowing='true' trigger={
                                                <Icon color='green' name='check'  />
                                            } size='mini' content='Copied' />
                                    : null
                                    }
                    </div>
            </Table.Cell>



                <Table.Cell onClick = {()=>props.openForm(item)}> {item.priceMSRP ? '$'+item.priceMSRP : ""}</Table.Cell>
                <Table.Cell onClick = {()=>props.openForm(item)}> {item.cost ? '$'+item.cost : ""}</Table.Cell>
                {/*<Table.Cell onClick = {()=>props.openForm(item)} >{new Date(item._lastChangedAt).toString().split(' GMT')[0]}</Table.Cell>*/}
                {/*<Table.Cell onClick = {()=>props.openForm(item)} >{new Date(item._lastChangedAt).toString().split(' GMT')[0]}</Table.Cell>*/}
                
                {/*<Table.Cell onClick = {()=>props.openForm(item)} ><Popup trigger={<ReactTimeAgo date={item.createdOn} locale="en-US"/>} content={item.createdOn} size='mini' inverted /></Table.Cell>*/}
                <Table.Cell onClick = {()=>props.openForm(item)} ><ReactTimeAgo date={item.createdOn} locale="en-US"/></Table.Cell>
                <Table.Cell onClick = {()=>props.openForm(item)} ><ReactTimeAgo date={item.updatedOn} locale="en-US"/></Table.Cell>
                
                {/*<Table.Cell onClick = {()=>props.openForm(item)} ><Popup trigger={<ReactTimeAgo date={item.createdOn} locale="en-US"/>} content={item.updatedOn} size='mini' inverted /></Table.Cell>*/}

                {/*<Popup trigger={<ReactTimeAgo date={item.createdOn} locale="en-US"/>} content={item.createdOn} size='mini' inverted />*/}

          </Table.Row>
            )
            }

            )}

          </Table.Body>
          </Table>
        
    )
    
    
  }
