'use client'
import React from 'react'
import * as S from './list.styled'

export const Cell =({item, showOptions, creator,
	                 admin, urlSingle, t, tc, tt})=> {

const [options, setOptions] = React.useState(false) 
return(<>
<S.Cell  key={item._id} onMouseLeave={()=>setOptions(false)}>
               {!options && <S.StyledImage alt='' 
				                         src={item.photo&&item.photo.length
				                                    ?item.photo:'/next.svg'}
				                         //~ onClick={(e)=>handAdd(e,item)}
				                         onClick={()=>setOptions(true)}
                                         width={0} height={0} 
                                         priority={true}/>  }
            <br/>                   
               <S.TitleLink href={`/${urlSingle}/${item._id}`}
				            className='styledLink'>{item.title.slice(0, 12)}</S.TitleLink>
               <S.Parag>{t('category')}: {item.category?tc(item.category):'---'}</S.Parag>
               <S.Parag>{t('type')}: {item.type?tt(item.type):'---'}</S.Parag>
               <S.Parag>{t('price')}: {item.price}</S.Parag>
               
               {/*<S.AddButt >{t('add_butt')}
              <AddCartIcon style={{position:'relative',top:'5px',fontSize:'25px'}}/>
              </S.AddButt><br/> */}
               
               {(creator(item.creator)||admin)
				   
				&&<><S.KingButt onClick={(e)=>
					      delUnit(e, item._id)}><OffIcon style={{fontSize:'30px', marginTop:'2px'}}/></S.KingButt>
				  <S.KingButt onClick={(e)=>handEdit(e, item)}><EditIcon style={{fontSize:'30px', marginTop:'2px'}}/></S.KingButt></>}
              
              </S.Cell>
             </> )}
