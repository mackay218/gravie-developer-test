import React, {useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, CircularProgress, Link } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import './App.css'
import {callAPI} from './apiCalls'
import { SelectedGamesContext } from './App'

function Search(){
    const navigate = useNavigate()
    const {state, dispatch} = useContext(SelectedGamesContext)
    const [searchInput, setSearchInput] = useState('')
    const [searching, setSearching] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState('')
    const [selectedGames, setSelectedGames] = useState([])

    const formatData = (data) => {
        const formattedData = []
        let count = 0
        for(let item of data){
            if(item.name){
                formattedData.push({
                    id: `${item.name}_${count}`,
                    title: item.name,
                    image: { url: item.image.icon_url, name: item.name}
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

    const handleAddClick = () => {
        if(selectedGames){
           let gamesToSend = []
           for(let item of state?.selectedGames){
               gamesToSend.push(item)
           }
           for(let item of selectedGames){
               gamesToSend.push(item)
           }
             dispatch({type: 'UPDATE_SELECTED_GAMES', data: gamesToSend})
        }
        
    }

    const handleCheckoutClick = () => {
        navigate('/checkout')
    }

    const columns = [
        {field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
        },
        {
            field:'image',
            headerName: 'Image',
            flex: 1,
            renderCell: (params) => {return <img src={params.value.url} alt={params.value.name}/>}
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
                    <div style={{height: '40vh'}}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            checkboxSelection
                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRowData = data.filter((row) =>
                                selectedIDs.has(row.id.toString())
                                )
                                setSelectedGames(selectedRowData)
                            }}
                        />
                        <Button disabled={selectedGames.length ? false : true} 
                                onClick={() => {handleAddClick()}}
                        >
                            Add
                        </Button>
                        <Link 
                            component={Button}
                            to="/checkout"
                            disabled={state?.selectedGames.length ? false : true} 
                            onClick={() => {handleCheckoutClick()}}
                        >
                            Checkout
                        </Link>
                    </div>
                : null}
            </div>
        </div>
      
    )
}
export default Search;