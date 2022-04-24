import React, {useState} from 'react'
import { Button, Input, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './App.css'
import {callAPI} from './apiCalls'

function Search(){
    const [searchInput, setSearchInput] = useState('')
    const [searching, setSearching] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState('')

    const formatData = (data) => {
        const formattedData = []
        let count = 0
        for(let item of data){
            if(item.name){
                formattedData.push({
                    id: `${item.name}_${count}`,
                    title: item.name,
                    image: item.image.icon_url
                })
            }
        }
        return formattedData
    }

    const handleSearchClick = async () => {
        setSearching(true)
        const response = await callAPI(searchInput, process.env.REACT_APP_API_KEY)
        if(response){
            if(response.error === 'OK'){
                setData(formatData(response.results))
            }else{
                setError(response.error)
            }
        } else{
            setError('Error searching')
        }
        setSearching(false)
    }

    const columns = [
        {field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'title',
            headerName: 'Title',
        },
        {
            field:'image',
            headerName: 'image',
            renderCell: (params) => {return <img src={params.value}/>}
        }
    ]

    return (
        <div className="pageContent">
            <h1>Search for games</h1>
            <div className="searchForm pageContent">
                <Input placeholder="Game Title" 
                    value={searchInput}
                    oncolor="secondary" 
                    disabled={searching}
                    onChange={(event) => {
                        setSearchInput(event.target.value)
                    }}
                />
                {searching ? <CircularProgress/> : 
                <Button outlinedPrimary
                  type="submit"
                  onClick={() => {
                    handleSearchClick()
                  }}
                  >
                    Submit
                </Button>}
            </div>
            <div className="searchResults">
                {error ? <div>{error} </div> : 
                    data ? 
                    <div style={{height: '50vh'}}>
             
                        <DataGrid
                        rows={data}
                        columns={columns}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                    </div>
                : null}
            </div>
        </div>
      
    )
}
export default Search;