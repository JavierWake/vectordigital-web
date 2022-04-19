import React from 'react';

interface propsFromState {
    srcMiniGrafica?: string;
    srcUrl?: string;

    esSeccionIndicesFx?: boolean;
}

type AllProps = propsFromState; 

const RefinitivMiniGraph: React.FC<AllProps> = ({ srcMiniGrafica, srcUrl, esSeccionIndicesFx }) =>{

    /*
    REGLA DE 3:
        h= 35 - 60
        w= 80 - 137
     */
    return(
        <>
            {
                srcMiniGrafica ? 
                    srcMiniGrafica.length > 0 && <iframe srcDoc={srcMiniGrafica} height={100} width={150} />
                : srcUrl ?
                    (esSeccionIndicesFx !== undefined && esSeccionIndicesFx === true) ?
                        <iframe className="self-center" src={srcUrl} height={60} width={137} />
                    :
                        <iframe className="self-center" src={srcUrl} height={35} width={100} />
                :
                    <div>
                        <p>No es posible mostrar el minigráfico en estos momentos.</p>
                    </div>
                    /*refinitivMiniGrafica && 
                    refinitivMiniGrafica.refinitivMiniGrafica && 
                        <iframe srcDoc={refinitivMiniGrafica.refinitivMiniGrafica} height={55} width={200} />*/
            }
        </>
    );
}

//Get data from store
/*const mapStateToProps = (store: RootState) => {
    return {
        refinitivMiniGrafica: store.refinitivMiniGrafica
    };
};

//Post data to the store
const mapDispatchToProps = (dispatch: any) => {
    return {
        getRefinitivMiniGraficaRequest: () => dispatch(getRefinitivMiniGraficaRequest(dispatch))
    };
};*/

//export default connect(mapStateToProps, mapDispatchToProps)(RefinitivMiniGraph);
export default RefinitivMiniGraph;