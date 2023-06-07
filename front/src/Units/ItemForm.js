import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
//import { addItem, changeItem} from '../Redux/itemsSlice'
import FileBase from 'react-file-base64'
import {ItemContext} from '../Context/Contexts'
import {OpenContext} from '../Context/Contexts'

const initialState = {title: '', description: '', price: '', category: 'seed', photo: ''}

export const ItemForm = () => {
	
	const {items, addItem, updateItem, currentId, setCurrentId} = React.useContext(ItemContext)
	
	const {itemForm, closeItemForm} = React.useContext(OpenContext)
	
	const ref = React.useRef()
	const dispatch = useDispatch()
	const [source, setSource] = React.useState(initialState)
  
    const currItem = items.find((item) => item._id === currentId)
    
    React.useEffect(()=>{
		
	       	   if(currItem)setSource(currItem)
								 
	       },[currItem])
	       
    const reset =()=> {	
		setCurrentId(null)
		setSource(initialState)
		ref.current.reset()
		}
		
	const handSubmit =(e)=> {
		e.preventDefault()
		if(!currentId){addItem(source)
		}else{updateItem(currentId, source)
		 }
		 console.log(source)
		reset()
		closeItemForm()
		}
	
	const handChange =(e)=> setSource({...source, [e.target.name]: e.target.value})
	
	const sText = {'fontSize':'28px'}
	const sButton = {'fontSize':'20px', 'margin':'5px'}
	
	 return(
	 <section style={{'display': !itemForm ?'none':'block',
		              'textAlign':'center'}}>
	 <h1 style={{'fontSize':'32px'}}>Item</h1>
	<form style={sText} ref={ref}>
	 <label>Title:</label>
	 <input name='title' 
	 value={source.title||''}    
	 onChange={handChange}
	 style={sButton}/><br/>
	 
	 <label>Description:</label>
	 <input name='description'
	 value={source.description||''} 
	 onChange={handChange}
	 style={sButton}/><br/>
	 
	 <label>Price:</label>
	 <input name='price'
	 value={source.price||''} 
	 onChange={handChange}
	 style={sButton}/><br/>
	 
	 <label>Category:</label>
	 <select name='category'
	         value={source.category}
	         onChange={handChange}
	         style={sButton}>
	 <option value='seed'>seed</option>
	 <option value='soil'>soil</option>
	 <option value='pesticide'>pesticide</option>
	 </select><br/>
	 
	 <label>Photo:</label>
      <FileBase          
                         style={sButton}
                         type="file"
                         multiple={false}
                         onDone={({base64})=>setSource({
                            ...source, photo: base64})}/><br/>
                            
	 <button onClick={handSubmit}>Save</button>
	 <button onClick={closeItemForm}>CloseForm</button>
	</form>
	 </section>
	 )
	}
