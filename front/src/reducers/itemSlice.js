import {createSlice} from '@reduxjs/toolkit'
import {FETCH_ALL, CREATE, DELETE} from '../actionTypes'


const func = (posts=[], action) =>{
	switch(action.type){
	case DELETE:
	    return posts.filter((post)=>post._id !== action.payload)
/*	case UPDATE:
	    return posts.map((post)=>post._id===action.payload._id
	    	                                    ?action.payload:post)*/
	case FETCH_ALL:
        return  action.payload
	case CREATE:
        return [...posts, action.payload]
	default:
	     return posts
	}
}
export default func