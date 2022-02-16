/* Importations des bibliothèques react + Yarn 
-> styled-components  + react-router-dom  */
import React from "react";
import Accueil from "../../pages/Accueil";
import Inscription from "../../pages/Inscription";

// /* Importations des pages de styles + images */

function Login() {
  return (
    <div>
      <link>
        <Accueil />
      </link>
      <p>Connexion</p>
      <link>
        <Inscription />
      </link>
    </div>
  );
  // const { id: queryId } = useParams();
  // const [profileData, setLoginData] = useState({});
  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/auth/login/id=${queryId}`)
  //     .then((response) => response.json())
  //     .then((jsonResponse) => {
  //       setLoginData(jsonResponse?.articleData);
  //     });
  // }, [queryId]);
}

export default Login;
