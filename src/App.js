import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {  useEffect, useState } from 'react';
import Movielist from './component/Movielist/Movielist';
import { Container, Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap';
function App() {
  const API_URL ='https://api.themoviedb.org/3/movie/popular?api_key=d6ffe34b9e35a4a6053064f06d194930'
  
  const [movies , setMovies] = useState([])
  const [query ,setQuery] = useState('')
 
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=d6ffe34b9e35a4a6053064f06d194930&language=en-US&query=${query}&include_adult=false`
useEffect(()=>{
      fetch(API_URL)
      .then((res)=> res.json())
      .then(data=>{
        console.log(data)
        setMovies(data.results)
      })
  },[])

const searchMovie = async(e)=>{
  e.preventDefault();
  try {
    const res = await fetch(API_SEARCH);
    const data = await res.json();
    setMovies(data.results)
    
  } catch (error) {
    console.log(error)
  }

}


const changeHandler = (e) =>{
  setQuery(e.target.value)
}

  return (
    <>
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container fluid>
        <Navbar.Brand href='home'>MovieDB</Navbar.Brand>
        <Navbar.Brand href='home'>Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll'> </Navbar.Toggle>
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='me-auto my-2 my-lg-3'
                  style={{maxHeight:'100px'}}
                  navbarScroll
            >

            </Nav>
            <Form className='d-flex' onSubmit={searchMovie}>
              <FormControl
              type='search'
              placeholder='Movie search'
              className='me-2'
              aria-label='search'
              name='query'
              value={query} onChange ={changeHandler}
              />
              <Button variant='secondary' type='submit'></Button>
            
            </Form>
          </Navbar.Collapse>
       
      </Container>

    </Navbar>
     <div className='container'>
    <div className='grid'> 
       {movies.map((moviereq)=><Movielist key={moviereq.id} {...moviereq}/>)}</div>
  
    </div>
    </>

  
  );
}

export default App;
