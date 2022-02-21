/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */

/* Importations des pages de styles + images */

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

export default votes;
