import React, {useState, useContext, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom';
import {
        Button,
        Link, 
        Dialog,
        DialogActions, 
        DialogContent, 
        DialogTitle  } from '@mui/material'
import { SelectedGamesContext } from '../App'
import '../Styles/App.css'

function Checkout(){
    const { state, dispatch } = useContext(SelectedGamesContext)
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [error, setError] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(state?.selectedGames){
            setData(state?.selectedGames)
        } else setError('No Games Selected')
    }, [state])

    const handleRentClick = () => {
        setIsOpen(true);
    }

    const handleRemoveClick = (item) => {
       const selectedGames = state.selectedGames.filter((game) => {
            if(item.id !== game.id){
                return game
            }
            return null
        })
        dispatch({type: 'UPDATE_SELECTED_GAMES', data: selectedGames})
    }

    const getTotalPrice = () => {
        let total = 0;
        for(let game of data){
            total += game.price
        }
        return total.toFixed(2)
    }

    const handleClose = () => {
        dispatch({type: 'UPDATE_SELECTED_GAMES', data: []})
        setIsOpen(false)
    }

    const returnToSearch = () => {
        dispatch({type: 'UPDATE_SELECTED_GAMES', data: []})
        setIsOpen(false)
        navigate('/search')
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
        },
        {
            field:'remove',
            headerName: '',
            flex: 2,
            renderCell: (params) => {return <Button onClick={() => {handleRemoveClick(params)}}>Remove</Button>}
        },
        {
            field:'platform',
            headerName: 'Platform',
            flex: 1,
        },{
            field: 'price',
            headerName: 'Price',
            flex: 2,
            renderCell: (params) => {return <div>{params.value.toFixed(2)}</div>}
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
                        />
                        <div>Total: ${getTotalPrice()}</div>
                        <Button disabled={!data.length}onClick={() => {handleRentClick()}}>Rent</Button>
                        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="checkout confirmation"
                               aria-describedby="checkout confirmation">
                            <DialogTitle>
                            {"Confirmation"}
                            </DialogTitle>
                            <DialogContent >
                                You have rented the following games: 
                                {state.selectedGames.map((game) => {
                                    return <div>{game.title}</div>
                                })}
                                Thank You!
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {handleClose()}}>Close</Button>
                                <Link 
                                    component={Button}
                                    to="/search"
                                    onClick={() => {returnToSearch()}}
                                >
                                    Return To Search
                                </Link>
                            </DialogActions>
                        </Dialog>
                    </div>
                : null}
            </div>
        </div>
    )
}
export default Checkout;
