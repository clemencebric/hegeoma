import "./contact.css"

function Contact() {
  localStorage.removeItem('idecole');
  return (
    <div className="pagecontact">
        <div className='minipage'>
            Je suis la page de contact
            <div className="partiegauche">
            </div>
            <div className="partiedroite"></div>
            <div className="soumettre"></div>
        </div>
    </div>
  );
}

export default Contact;