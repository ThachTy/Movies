import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
    const { t } = useTranslation(["notfound"]);
    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className=''>
                <h2 className='text-6xl mb-6'>404 {t('NotFound')}</h2>
                <Link className=" underline text-2xl" to={"/"}>{t('link_to_home')}</Link>
            </div>
        </div>
    )
}

export default NotFound