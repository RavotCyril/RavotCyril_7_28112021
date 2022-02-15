/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

/* Importations des pages de styles + images */

import Article from "../../components/Article";
import colors from "../../utils/style/colors";
import { Loader } from "../../utils/style/Atoms";
import { useFetch, useTheme } from "../../utils/hooks";

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`;
const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function articles() {
  const { theme } = useTheme();
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/api/api/articles`
  );
  const articlesList = data?.articlesList;

  if (error) {
    return <span>Il y a un problème</span>;
  }

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
