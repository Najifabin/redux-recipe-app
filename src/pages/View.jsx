import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const View = () => {
  const [recipe,setRecipe] = useState({})
  const {id} = useParams()

    useEffect(()=>{
      if(sessionStorage.getItem("allRecipes")){
        const allRecipes = JSON.parse(sessionStorage.getItem("allRecipes"))
        setRecipe(allRecipes.find(item=>item.id==id))
      }
    },[])
  return (
    <>
    <Header/>
    <div style={{ paddingTop: '100px' }} className='flex flex-col mx-5 '>
        <div className="grid grid-cols-2 items-center gap-5 ">
          <img className='lg:ms-40' width={'350px'} height={'250px'} src={recipe?.image} alt="" />        
          <div>
            
            <h1 className='text-5xl font-bold mb-5 text-red-700'>{recipe?.name}</h1>
            <p>
              <span className='font-bold'>Meal Type </span>: {recipe?.mealType}
            </p>
            <p>
              <span className='font-bold'>Difficulty </span>: {recipe?.difficulty}
            </p>
            <p>
              <span className='font-bold'>Cuisine </span>: {recipe?.cuisine}
            </p>
            <p>
              <span className='font-bold'>Servings </span>: {recipe?.servings}
            </p>
            <p>
              <span className='font-bold'>Rating </span>: {recipe?.rating}
            </p>
           
          </div>
        </div>
        <div className="grid grid-cols-2 items-center mt-7 mx-10 gap-7">
          <div style={{height:'400px'}}  className='shadow border text-black text-center items-center'>
              <h4 className='text-semibold text-3xl p-10 text-red-700 underline underline-offset-8'>Ingredients</h4>
                <ol className='mt-5'>
                  {
                    recipe?.ingredients?.map((item,index)=>(
                      <li key={index}>{index+1}. {item}</li>
                    ))  
                  }
                </ol>
              
          </div>
          <div style={{height:'400px'}}  className='shadow border  text-black text-center'>
              <h4 className='text-semibold text-3xl p-10 text-red-700 underline underline-offset-8'>Instructions</h4>
              <ul className='mt-5'>
                {
                  recipe?.instructions?.map((item,index)=>(
                    <li key={index}>{index+1}. {item}</li>
                  ))
                }
              </ul>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default View