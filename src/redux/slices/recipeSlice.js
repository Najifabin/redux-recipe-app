import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes",async ()=>{
    const result = await axios.get("https://dummyjson.com/recipes")
    sessionStorage.setItem("allRecipes",JSON.stringify(result.data.recipes))
    return result.data.recipes
})
const recipeSlice = createSlice({
    name:'recipes',
    initialState:{
        allRecipes:[],
        dummyRecipes:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchProduct : (state,actionByHeader)=>{
            state.allRecipes = state.dummyRecipes.filter(item=>item.cuisine.toLowerCase().includes(actionByHeader.payload))
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRecipes.fulfilled,(state,apiResult)=>{
            state.allRecipes = apiResult.payload
            state.dummyRecipes = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipes.pending,(state)=>{
            state.allRecipes = []
            state.dummyRecipes = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipes.rejected,(state)=>{
            state.allRecipes = []
            state.dummyRecipes = []
            state.loading = false
            state.errorMsg = "API call failed"
        })
    }
})
export const {searchProduct} = recipeSlice.actions
export default recipeSlice.reducer