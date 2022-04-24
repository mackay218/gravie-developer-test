import React, {useState, useContext, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { SelectedGamesContext } from './App'
import './App.css'

function Checkout(){
    const { state, dispatch } = useContext(SelectedGamesContext)
    const [data, setData] = useState()
    const [error, setError] = useState('')
    const [rented, setRented] = useState(false)

    useEffect(() => {
        if(state?.selectedGames){
            setData(state?.selectedGames)
        } else setError('No Games Selected')
    }, [state])

    const handleRentClick = () => {
        console.log(state.selectedGames)
        setRented(true);
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
            <h1>Checkout</h1>
            <div className="selectedGames">
                {error ? <div>{error} </div> : 
                    data ? 
                    <div style={{height: '50vh'}}>
                        <DataGrid
                            options={{
                                selectableRows: false 
                            }}
                            rows={data}
                            columns={columns}
                        />{!rented ? <Button onClick={() => {handleRentClick()}}>Rent</Button> : <div>
                                Congrats you have rented: 
                                {state.selectedGames.map((game) => {
                                    return <div>{game.title}</div>
                                })}
                            </div>}
                    </div>
                : null}
            </div>
        </div>
    )
}
export default Checkout;
