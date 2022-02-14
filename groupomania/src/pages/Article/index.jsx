/* Importations des bibliothèques + des Images du dossier assets. */

import DefaultPicture from "../../assets/profile.png";
import PropTypes from "prop-types";
import styled from 'styled-components'

/* Sécuriser le composant Card. On récupère 3 props,  label  ,  title  et  picture. 
On va donc importer  PropTypes  depuis la bibliothèque et utiliser  Card.propTypes  
pour préciser les types de chacune des propriétés.
+ Permet de donner un styled-components  ( styles CSS )  aux spans + images*/

const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: bold;
`
const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`
const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`
const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`
/* Données de l'article crée - Images - texte ...( Données ) */
const Article = [
  {
    name: "Jane Doe",
    jobTitle: "Devops",
    picture: DefaultPicture,
  },
  {
    name: "John Doe",
    jobTitle: "Developpeur frontend",
    picture: DefaultPicture,
  },
  {
    name: "Jeanne Biche",
    jobTitle: "Développeuse Fullstack",
    picture: DefaultPicture,
  },
];
/* Récupération et lecture des donnéess des article crées - Titre- Images - texte ...( Données ) */

function ArticleLecture() {
  return (
    <div>
      <h1>Article 👩‍💻👨‍💻👩‍💻</h1>
      <CardsContainer>
        {Article.map((profile, index) => (
        <Card
          key={`${profile.name}-${index}`}
          label={profile.jobTitle}
          picture={profile.picture}
          title={profile.name}
        />
        ))}
      </CardsContainer>
    </div>
  );
}

/* Récupération et lecture des donnéess des article crées - Label - Titre- Image - texte ...( Données ) */

function Card({ label, title, picture }) {
    return (
        <CardWrapper> style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
				<CardLabel>{label}</CardLabel>
				<CardImage src={picture} alt="Article" />
            <span>{title}</span>
        </CardWrapper>
    )
}
 
Card.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
}
/* Exportation des functions sur l'application. React */

export default ArticleLecture;
export default Card
