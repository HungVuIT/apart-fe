import { IPropsChildren } from '../../../interface/globalType';
import Header from '../components/Header';
function DefaultLayout({ children }: IPropsChildren) {
    return (
        <div className='layout__wrapper'>
            <Header />
            <div className='layout__container'>
                <div className='layout__content'>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
