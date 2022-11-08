import { IPropsChildren } from '../../../interface/globalType';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './DefaultLayout.scss';
function DefaultLayout({ children }: IPropsChildren) {
    return (
        <div className='layout__wrapper'>
            <Header />
            <div className='layout__container'>
                <div className='layout__content'>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
