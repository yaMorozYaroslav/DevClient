import React from 'react'
import decode from 'jwt-decode'
import {useSelector, useDispatch} from 'react-redux'

import {AuthForm} from './AuthForm'
import {ItemForm} from './ItemForm'

import {setData, logout} from '../Redux/authSlice'



export const TheBar =({currentId, setCurrentId})=> {
	const dispatch = useDispatch()
	
	const [opened, setOpened] = React.useState({item: false, auth: false})
	
	const authData = useSelector(state => state.auth.authData)
	const profile = JSON.parse(localStorage.getItem('profile'))
	
	const handLogout =()=> {
		dispatch(logout())
		localStorage.removeItem('profile')
		}
React.useEffect(()=>{
	            let token
	        	if(profile)token = profile.token
	        	if(token){
	        		const decodedToken = decode(token)
	        		if(decodedToken.exp * 1000 < new Date().getTime()){
	        		  handLogout()
	            }
	        	}
	        },[authData])
	        
React.useEffect(()=>{
	if(authData.length && JSON.stringify(authData[0]) !== JSON.stringify(profile))
	   localStorage.setItem('profile', JSON.stringify(authData[0]))
	
	if(JSON.stringify(authData[0]) !== JSON.stringify(profile)&&
	   JSON.stringify(profile).length > 4)dispatch(setData(profile))
	  
	console.log(authData[0])
	
		},[authData, dispatch, profile])
		console.log(opened)
		
	return <>
	        {!authData.length && opened.auth && <><AuthForm/></>}
	
	        {authData.length
				?<><button  onClick={()=>setOpened({...opened, item:true})}>addItem</button>
				   <button  onClick={handLogout}> logout </button></>
				:null}
			{!opened.auth && !authData.length && <>
				         <h2>SignIn to Add an Item</h2>
				         <button onClick={()=>setOpened({...opened, auth:true})}>SignIn</button>
				</>}
		    {authData.length > 0 && opened.item && 
			         <ItemForm  opened={opened} setOpened={setOpened} currentId={currentId} setCurrentId={setCurrentId}/>}
	       </>
	}