import { Link } from "react-router-dom";
import styled from "styled-components";
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

const StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.primary};`}
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
