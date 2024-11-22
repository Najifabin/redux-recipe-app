import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../redux/slices/recipeSlice'


const Home = () => {
  const dispatch = useDispatch()
  const { allRecipes, loading, errorMsg } = useSelector(state => state.recipeReducer)
  // console.log(allRecipes, loading, errorMsg);

  const [currentPage,setCurrentPage] = useState(1)
  const recipesPerPage = 6
  const totalPages = Math.ceil(allRecipes?.length/recipesPerPage)
  const currentPageProductLastIndex = currentPage * recipesPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex - recipesPerPage
  const visibleAllRecipes = allRecipes?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)


  useEffect(() => {
    dispatch(fetchRecipes())
  }, [])

  const navigateToNextPage = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }
  const navigateToPreviousPage = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <>
      <Header insideHome={true} />

      <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto  '>
        {loading ?
          <div className="flex justify-center items-center my-5 text-lg">
            <img width={'70px'} height={'70px'} className='me-3' src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif" alt="" />
            Loading...
          </div>
          :
          <>
            <h1 className='text-center text-2xl font-bold  text-zinc-500'><i class="fa-solid fa-list-ul text-yellow-400 me-2"></i>ALL RECIPIES</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              {allRecipes?.length > 0 ?
                visibleAllRecipes?.map(item => (
                  <div key={item.id} className="rounded border p-2 shadow">
                    <h3 className="text-xl font-bold text-white text-center bg-red-700">{item?.difficulty}</h3>
                    <img width={'100%'} height={'200px'} src={item?.image} alt="" />
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-red-700">{item?.name}</h3>
                      <h2 className="text-xl font-semibold">{item?.cuisine}</h2>
                      <p className=''>Ratings : {item?.rating}</p>

                      <Link to={`/${item?.id}/View`} className='rounded bg-green-700 p-1 mt-3 text-white inline-block'>view More</Link>
                    </div>
                  </div>))

                :
                
                <div className="flex justify-center items-center font-bold text-red-600 my-5 text-lg">recipe Not Found!!!</div>
                }


          </div>
          <div className="text-2xl text-center font-bold mt-20">
            <span onClick={navigateToPreviousPage} className="cursor-pointer"><i className='fa-solid fa-backward me-5'></i></span>
            <span>{currentPage} of {totalPages}</span>
            <span onClick={navigateToNextPage} className="cursor-pointer"><i className='fa-solid fa-forward ms-5'></i></span>
          </div>
      </>
      }
    </div >
    </>
  )
}

export default Home