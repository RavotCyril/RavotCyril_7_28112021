/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import { Link } from "react-router-dom";

/* Importations des pages de styles + images */

function votes() {
  const { data, error } = useFetch(`http://localhost:8000/api/votes/:id/like`);
  const votesList = data?.votesList;

  if (error) {
    return <span>Il y a un problème</span>;
  }
  return (
    <div>
      {votesList?.map((vote) => (
        <Link key={`article-${vote.id}`} to={`/votes/${vote.id}`}>
          like={vote.like}
          dislike={vote.dislike}
        </Link>
      ))}
      )
    </div>
  );
}

export default votes;
