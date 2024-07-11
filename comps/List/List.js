'use client'
import React from 'react'
import * as S from './list.styled'
import {AddForm} from './AddForm/AddForm'
import {Filter} from './Filter/Filter'
import Box from '@mui/material/Box';
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import OffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
//~ import LinearProgress from '@mui/material/LinearProgress';

import {useItemContext} from '../../context/items/ItemState'
import {useSeedContext} from '../../context/seeds/SeedState'
import {useQueryContext} from '../../context/queries/QueryState'
import {useUserContext} from '../../context/user/UserState'
import {useCartContext} from '../../context/cart/CartState'

import revalidator from './revalidator'

import { usePathname } from '../../navigation'
import { useRouter } from '../../navigation'
import {useTranslations} from 'next-intl'

export function List({servData}){
	const t = useTranslations('List')
	const tc = useTranslations('categories')
	const tt = useTranslations('types')
	//~ console.log(servData)
	const pathname = usePathname()
	const router = useRouter()
	const isSeed = pathname === '/seed-list'
	
	const urlSingle = isSeed?'seeds':'items'
	
	const [open, setOpen] = React.useState(false)
	const [shown, setShown] = React.useState(servData)
	const [currItem, setCurrItem] = React.useState({})
	const [staticData, setStaticData] = React.useState(servData)
	
	const {userData} = useUserContext()
	const {cartItems, addToCart} = useCartContext()
	const {fetchItems, loadingItems, items,
		               removeItem, resetItems} = useItemContext()
	const {fetchSeeds, loadingSeeds, seeds, 
		               removeSeed, resetSeeds} = useSeedContext()
	const {state, category} = useQueryContext()
	
	
	const units = !items.length?seeds:items
	const loading = loadingItems||loadingSeeds
	
	const creator =(id)=> userData.user && (userData.user._id === id)
	const admin = userData.user && userData.user.role === 'admin'
	
	const handAdd =(e, s)=> {e.preventDefault();addToCart(s);}
	
	const handEdit =(e, s)=> {e.preventDefault(); setCurrItem(s);setOpen(true)}
    const onMenu = () => {router.push('/');if(isSeed){
							            resetSeeds()}else{resetItems()}}
	
	function fetchUnits(){if(isSeed){fetchSeeds(state)}
		                       else{fetchItems(state)} } 
                       
	function delUnit(e, id){
		e.preventDefault();
		if(isSeed){removeSeed(id)}else{removeItem(id)}
		revalidator()
		setTimeout(()=>{fetchUnits()},500)
		}	

   React.useEffect(()=>{ if(seeds.data && isSeed){setShown(seeds.data)}
	                    if(items.data && !isSeed){setShown(items.data)}
	                  },[items, seeds])
  
return (<S.Container>
      <S.ListButts>
        <Filter/>
        {admin &&       
			<S.AddAdmin onClick={()=>setOpen(true)}>
			                   {t('add_butt')}</S.AddAdmin>}
        <S.NotLink onClick={()=>onMenu()}>{t('menu')}</S.NotLink>
      < /S.ListButts>    
       {open &&
		     <AddForm setOpen={setOpen} 
		              currItem={currItem}
		              setCurrItem={setCurrItem}
		               />}  
	   {loading &&  <S.SpinCont><S.Spinner/></S.SpinCont>}
       {shown && shown.length>0 && !loading && <S.List>
          
          
          {shown.map(item => (
             <S.Cell  key={item._id}>
               <S.StyledImage alt='' src={item.photo&&item.photo.length
				                         ?item.photo:'/next.svg'}
                              width={0} height={0} priority={true}/><br/>
               <S.TitleLink href={`/${urlSingle}/${item._id}`}
				            className='styledLink'>{item.title.slice(0, 12)}</S.TitleLink>
               <S.Parag>{t('category')}: {item.category?tc(item.category):'---'}</S.Parag>
               <S.Parag>{t('type')}: {item.type?tt(item.type):'---'}</S.Parag>
               <S.Parag>{t('price')}: {item.price}</S.Parag>
               
               <S.AddButt onClick={(e)=>handAdd(e,item)}>{t('add_butt')}
              {/*<AddCartIcon style={{position:'relative',top:'5px',fontSize:'25px'}}/>*/}
              </S.AddButt><br/> 
               
               {(creator(item.creator)||admin)
				   
				&&<><S.KingButt onClick={(e)=>
					      delUnit(e, item._id)}><OffIcon style={{fontSize:'30px', marginTop:'2px'}}/></S.KingButt>
				  <S.KingButt onClick={(e)=>handEdit(e, item)}><EditIcon style={{fontSize:'30px', marginTop:'2px'}}/></S.KingButt></>}
              
              </S.Cell>
          ))}       
        </S.List>}
         {!shown.length&&<S.NoData>No products found for this request</S.NoData>}
       </S.Container>)
} 
