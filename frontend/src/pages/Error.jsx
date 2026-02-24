import React, { useEffect, useState } from 'react'
import Preloader from '../elements/Preloader'
import HelmetReact from '../elements/HelmetReact';
import ErrorInner from '../components/ErrorInner';

const Error = () => {
    let [active, setActive] = useState(true);
    useEffect(() => {
        setTimeout(function () {
            setActive(false);
        }, 500);
    }, []);
    return (
        <div>
            {/* Preloader */}
            {active === true && <Preloader />}

            {/* Helmet */}
            <HelmetReact title={"Página não encontrada"} description="A página que você está procurando não existe ou foi movida." />

            {/* ErrorInner */}
            <ErrorInner />
        </div>
    )
}

export default Error