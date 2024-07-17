import "./erreur.css"

function Erreuracces() {
  return (
    <div className="pageerreur">
        <div className='phrase'>
            Vous n'avez pas accès à cette page
        </div>
        <div > <a className="boutonretour" href = "/">Retourner à la page d'accueil</a> </div>
    </div>
  );
}
export default Erreuracces;