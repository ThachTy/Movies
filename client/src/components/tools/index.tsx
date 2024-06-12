import { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { SearchMoviesContext } from "@context/SearchMoviesContext";
import './tools.css';

import vnFlag from '@assets/image/flags-VN.png';
import ukFlag from '@assets/image/flags-UK.png';

function Tools() {
    const { i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isEnLanguare, setIsLanguare] = useState(true);
    const { handleOpen }: any = useContext(SearchMoviesContext)

    const onchangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
        // true  => Light Mode
        // false => Dark Mode
        setIsDarkMode(e.target.checked)
    }

    const onchangeLanguare = (e: ChangeEvent<HTMLInputElement>) => {
        //  true  =>  Enligsh Languare
        (e.target.checked) ?
            i18n.changeLanguage("vn") :
            //  false  =>  VietNam Languare
            i18n.changeLanguage("en")
        setIsLanguare(!isEnLanguare);
    }


    return (
        <section id='tools'>
            <ul className='tools-content'>
                <li className='tools-items'>
                    <label className='lbl-checkbox' htmlFor="checkbox-theme">
                        <input onChange={(e) => onchangeTheme(e)} type="checkbox" id="checkbox-theme" />
                        {!isDarkMode ? <i className="fa-solid fa-cloud-sun"></i> : <i className="fa-solid fa-cloud-moon"></i>}
                    </label>
                </li>
                <li className='tools-items tools-flags'>
                    <label className='lbl-checkbox' htmlFor="checkbox-lan">
                        <input onChange={(e) => onchangeLanguare(e)} type="checkbox" id="checkbox-lan" />
                        {!isEnLanguare ? <img className='tools-flags-icon' src={ukFlag} alt="uklag" /> : <img className='tools-flags-icon' src={vnFlag} alt="vnflag" />}
                    </label>
                </li>
                <li className='tools-items tools-search'>
                    <button className='btn-tools-search' onClick={handleOpen}
                        type="button"><i className='fa-solid fa-search' ></i></button>
                </li>
            </ul>
        </section >
    )
}

export default Tools
