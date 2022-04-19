import * as React from 'react';
import '../styles/footer.css'
import logo from '../assets/loggo.png';

export const FooterComponent = () => {

    var actualYear = new Date().getFullYear();

    const handleClickTL = (data: string) => {
        let url: string = "";
        if ("TL") {
            url = "https://e-vector.com.mx/terminos-legales/";
        }
        if ("AP") {
            url = "https://e-vector.com.mx/aviso-de-privacidad/";
        }
        window.open(url);
    };

    return (
        <footer className="footer">
            <div className="footer-content-1">

                <div className="box">
                    <figure>
                        <img src={logo} alt="loggo" />
                    </figure>
                </div>
                <div className="box link ">
                    <a className="cursor-pointer hover:text-red-600" onClick={() => handleClickTL("TL")}>Terminos Legales</a>
                </div>
                <div className="box link">
                    <a className="cursor-pointer hover:text-red-600" onClick={() => handleClickTL("AP")}>Aviso de Privacidad</a>
                </div>
                <div className="box derechos">
                    <b>© {actualYear} VECTOR Casa de Bolsa S.A. de C.V. Derechos Reservados</b>
                </div>
            </div>

            <div className="footer-content-2">
                <div className="box">
                    <p className="parrafo">© Para cualquier observación, le sugerimos comunicarse a nuestra Unidad Especializada de Atención al cliente (UNE) a la siguiente dirección de correo electrónico: une@vector.com.mx o bien dirigirse al domicilio ubicado en Av. Roble 565 Ote. Col. Valle del Campestre, C.P. 6626, San Pedro Garza García, Nuevo León, México o comunicarse al teléfono 800 8336800. Para comunicarse a la CONDUSEF, favor de marcar en el territorio nacional: 800, 9998080, en el Distrito Federal: (55) 5340 0999 o a la dirección electrónica asesoria@condusef.gob.mx</p>
                </div>
            </div>
        </footer>
    )

}