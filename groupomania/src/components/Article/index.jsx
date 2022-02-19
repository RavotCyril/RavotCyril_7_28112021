/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import { Link } from "react-router-dom";

/* Importations des pages de styles + images */

function articles() {
  const { data, error } = useFetch(`http://localhost:8000/api/articles/`);
  const articlesList = data?.articlesList;

  if (error) {
    return <span>Il y a un problème</span>;
  }
  return (
    <div>
      {articlesList?.map((article) => (
        <Link key={`article-${article.id}`} to={`/articles/${article.id}`}>
          sujet={article.sujet}
          texte={article.texte}
          date={article.date}
          image={article.image}
        </Link>
      ))}
      )
    </div>
  );
}
export default articles;

function commentaires(commentaire) {
  const { data, error } = useFetch(`http://localhost:8000/api/commentaires/${commentaire.id}`);
  const commentairesList = data?.commentairesList;

  if (error) {
    return <span>Il y a un problème</span>;
  }
  return (
    <div>
      {commentairesList?.map((commentaire) => (
        <Link
          key={`commentaire-${commentaire.id}`}
          to={`/commentaire/${commentaire.id}`}
        >
          texte={commentaire.texte}
        </Link>
      ))}
      )
    </div>
  );
}

export default commentaires;
