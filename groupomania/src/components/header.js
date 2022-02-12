import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoGroupomania from "../assets/LogoGroupomania.png";

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
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={LogoGroupomania} />
      </Link>
      <div></div>
    </NavContainer>
  );
}

export default Header;
