/* Importations des bibliothèques react + axios +  */
import React from "react";
import axios from "axios";
// /* Importations des pages de styles + images */
import "../../../Styles/App.css";

const DeleteUpdateArticle = () => {
  const [services, setServices] = useState();
  const [message, setMessage] = useState("");

  function Services() {
    if (services === undefined) {
      setServices(false);
      setMessage("Refuse l'affichage des données");
    } else {
      setMessage("Affiche moi les données");
    }
  }
  const handleDelete = () => {
    axios.delete("http://localhost:3000/articles/:id");
  };
  const handleUpdate = () => {
    axios.put("http://localhost:3000/articles/:id");
  };
  return (
    <main className={`message ${Services ? "valid" : "invalid"}`}>
      <Services>
        {message}
        <div>
          <button
            onClick={() => {
              if (window.confirm("Confirmer pour supprimer cette article?"))
                handleDelete();
            }}
          >
            Supprimer
            <div className="btn-container"></div>
          </button>
          <button
            onClick={() => {
              if (window.confirm("Confirmer pour modifier cette article?"))
                handleUpdate();
            }}
          >
            modifier
          </button>
        </div>
      </Services>
    </main>
  );
};
export default DeleteUpdateArticle;
