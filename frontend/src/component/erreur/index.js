import "./erreur.css"

function Erreur() {
  return (
    <div className="pageerreur">
        <div className='phrase'>
            Cette page n'existe pas.
        </div>
        <div > <a className="boutonretour" href = "/">Retourner à la page d'accueil</a> </div>
    </div>
  );
}

export default Erreur;