/* /* Importations Bibliothèques React - Yarn  
-> Styled-Components  */
import styled from "styled-components";

/* Importations styles hooks + colors  */

import { useTheme } from "../../utils/hooks";
import colors from "../../utils/style/colors";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`;

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.secondary};
  padding-top: 30px;
`;

function Footer() {
  const { toggleTheme, theme } = useTheme();

  return (
    <FooterContainer>
      <NightModeButton onClick={() => toggleTheme()}>
        Changer de mode : {theme === "light" ? "☀️" : "🌙"}
      </NightModeButton>
    </FooterContainer>
  );
}

export default Footer;
