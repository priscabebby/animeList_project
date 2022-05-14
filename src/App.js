import { useState, useEffect } from 'react';
import './App.css';
//import styled from '@emotion/styled'
import axios from 'axios';
import List from './Components/List';
import ListDetail from './Components/ListDetail';
import Pagination from './Components/pagination';
import Collections from './Components/MyCollection';


function ListAnime() {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [clicked, setClicked] = useState(false);
  
  //add-collections
 // const[addList, setAddList] =useState("");
  const [click, setClick] = useState(false);
  //const [collectionlist] =useState
  

  //paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


useEffect( () => {
  //Get All data
    const fetchData = async (query, variables)=> {
      try {
      const response = await axios.post('https://graphql.anilist.co/', {
        query,
        variables
      });

      // Log the response
      console.log(response.data)

      // Set the data to the state
      setIsLoaded(true);
      //console.log(response.data.data.Page.media);
      setList(response.data.data.Page.media);
      //setDetail(response.data.data.Page.media);


    } catch (error) {
      //  set the error to the state
      setError("");
    }

  };

  const query = `
    query {
      Page {
        media(isAdult: false, sort: POPULARITY_DESC ) {
    id
    title {
      romaji,
      english
      native
    }
    coverImage {
      large
    }
    startDate {
      year
    }
    episodes
    description
    genres
    bannerImage
    
      }
    }
  }`;

     // variables
    const variables = {};
    // execute our async function
    fetchData(query, variables)
},[]);

console.log(selectedID);


//Get ID Onclick item
function ClickDetail(ID){
    setClicked(true);
    setSelectedID(ID);
    
}

function ClickBack(){
    setClicked(false);
    //reload(), 500;
}

function CollectionsList(){
      <Collections />
}

//detail-data

  useEffect(()=>{
  if(clicked){
  //console.log(list.find(x =>x.id === selectedID));
  setDetail(list.find(x =>x.id === selectedID));
  }

},[list,selectedID,clicked]);


//add To collection
function AddToList(id){
    setClick(true);
   // setAddList(id);
}


//paginate--Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  /*console.log(click);
  if(click){
    return(
      <div>
        <div className="detail-page">
          <button className="button-detail"
        onClick={ClickBack}> back</button>
          <Collection addList={addList} isLoaded={isLoaded} error={error} 
          clicked={clicked} AddToList={AddToList} />

        </div>
      </div>
    )
  
  }*/

  //result page
  console.log(click);
  if(clicked){
    return(
      <div>
        <div className="detail-page">
          <button className="button-detail"
        onClick={ClickBack}> Back to List</button>
          <ListDetail detail={detail} isLoaded={isLoaded} error={error} 
          clicked={clicked} AddToList={AddToList} />

        </div>
      </div>
    )

  
  }else{
    return (
        <>
        <div className='section'>
        <div className="left">
          
          <h1>Anime Collections</h1>
          <button className='btn'  onClick={CollectionsList}> My Collection List</button>
        </div>

        <div className="right">
          <hr></hr>

          <List list={currentPosts} isLoaded={isLoaded} error={error} 
          clicked={clicked} selectedID={selectedID} ClickDetail={ClickDetail} />
          
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={list.length}
          paginate={paginate}
          />
        </div>
        </div>
        </>
      );
   
      }
    }

export default ListAnime;
