import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/recipeSlice'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  return (
    <nav className='flex justify-between bg-zinc-600 fixed w-full p-5  text-white font-bold'>
        <Link to={'/'} style={{fontFamily: "Bitter"}} className='text-2xl'>PINCH <span style={{fontFamily:"Dancing Script"}}>OF</span> YUM</Link>
         {insideHome &&
         <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}  style={{width:'300px'}} className='rounded p-1 text-black' type="text" placeholder='Search By Cuisine' />
         }
            
    </nav>
  )
}

export default Header