/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Importations styles + images + (style ) thème    */

import { StyledLink } from "../../utils/style/Atoms";
import LightLogo from "../../assets/light-logo.png";
import DarkLogo from "../../assets/dark-logo.png";
import { useTheme } from "../../utils/hooks";

/* Permet de donner un styled-components  ( styles CSS ) aux liens*/

const HomeLogo = styled.img`
  height: 70px;
`;

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  const { theme } = useTheme();

  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={theme === "light" ? DarkLogo : LightLogo} />
      </Link>
      <StyledLink to="/Accueil">Accueil</StyledLink>
      {/* Ici on passe la prop $isFullLink  . Ce qui nous permet d'utiliser la prop directement dans le style :
      On va pouvoir passer des props à nos composants directement depuis notre composant React */}
      <StyledLink to="/Connexion" $isFullLink>
        Connexion
      </StyledLink>
      <StyledLink to="/Inscription">Inscription</StyledLink>
    </NavContainer>
  );
}
export default Header;
