import {useEffect, useState} from "react";

function EntitiesList() {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8668/output").then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }
        ).then(data => {
            console.log(data)
            setEntities(data);
        })
    }, [])


    return (
        <div>
            {entities.directories ?
                entities.directories.map(
                    function (value, index) {
                        console.log(value, index)
                        return <ul key={index}>{index}. {value} </ul>;
                    }) : "Loading..."
            }
        </div>
    );
}

export default EntitiesList;
