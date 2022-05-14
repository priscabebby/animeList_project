import React from 'react';
import _ from 'lodash';


const List = ({ list, isLoaded, error, ClickDetail}) => { 
const GridItem = (props) => (
    <div className="grid__flex" id={props.id}
onClick={() => {
    console.log(props.id);
    ClickDetail(props.id);}}>
    <img className="grid__img" src={props.image} alt={""} />
    <p className="title" >{props.name}</p>
    </div>
)

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
    if(!_.isEmpty(list)){
return (


        <div className="grid">
            {list.map(item => (
                <GridItem key={item.id}
                id={item.id}
                image={item.coverImage.large}
                name={item.title.romaji} 
                />   
            ))}
            </div>

                );

            }else return null        

        
                };

}

export default List;