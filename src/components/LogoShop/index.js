import imgLogo from '../../assets/global-warming.png';
import './style.css';
const LogoShop = () => {
    return (
        <div className="logo__shop">
            <img src={imgLogo} alt="this is logo page" />
            <span>Shopping Mall</span>
        </div>
    );

};

export default LogoShop;