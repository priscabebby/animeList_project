import React from 'react';
import _ from 'lodash';

const ListDetail = ({ detail, isLoaded, error, AddToList}) => { 
    console.log(detail)
    var array = detail.genres
    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }else
        if(!_.isEmpty(detail)){
    
        return (
        <>
    <div className="grid__flexDetail">
        
    <img className="grid__banner" src={detail.bannerImage} alt={""} />
    <h1>{detail.title.romaji} - {detail.title.native} - {detail.title.english}</h1>
    
    <small> Genres: {array.join("-")}</small>
    
    <p>Episode: {detail.episodes} | {detail.startDate.year}</p>
    <hr></hr>
    <p>{detail.description}</p>
    <input type="submit" class="btn btn-sm" value="Add To List" onClick={() => AddToList(detail)} />
    </div>
            </>
        );

        }else return null
    
    } 

export default ListDetail;