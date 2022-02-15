/* Importations Bibliothèques React-router - Yarn  
-> Styled-Components  */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* Importations styles + images + (style ) thème */

import { StyledLink } from "../../utils/style/Atoms";
import LightLogo from "../../assets/LogoGroupomaniaLight.png";
import DarkLogo from "../../assets/LogoGroupomaniaBlack.png";
import { useTheme } from "../../utils/hooks";

/* Permet de donner un styled-components  ( styles CSS ) aux liens */

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
      <div>
        <StyledLink $theme={theme} to="/">
          Accueil
        </StyledLink>
        <StyledLink $theme={theme} to="/Connexion">
          Connexion
        </StyledLink>
        <StyledLink to="/Inscription">Inscription</StyledLink>
      </div>
    </NavContainer>
  );
}
export default Header;
