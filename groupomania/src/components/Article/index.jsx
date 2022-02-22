/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import { Link } from "react-router-dom";

/* Importations des pages de styles + images */

import Article from "../../components/Article";

function articles() {
  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {articlesList?.map((article) => (
            <Link key={`article-${article.id}`} to={`/article/${article.id}`}>
              <Article
                label={article.job}
                title={article.name}
                picture={article.picture}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </div>
  );
}

export default articles;
