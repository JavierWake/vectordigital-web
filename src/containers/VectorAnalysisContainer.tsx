import React from 'react';
import CardContainer from '../containers/CardContainer';

//State of the component
interface propsFromState {
    //listItems: string;
}

type AllProps = propsFromState;

const VectorAnalysisContainer: React.FC<AllProps> = ({  }) =>{

    var numbers = [1, 5, 10];

    return(
        <div className="flex flex-row">
            {
                numbers.map((index: any) => {
                    return(
                        <div className="flex mr-6">
                            <CardContainer typeCard={"vectorAnalisis"} name={"Flash Técnico"} sub1= {"Georgina Muñiz Sánchez"} sub2= {"El índice Russell 2000 lidera la baja de Estados Unidos. Hay riesgo de mayor ajuste."} sub3= {"hace 1 hora"} sub4 ={""} sub5={""} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default VectorAnalysisContainer;