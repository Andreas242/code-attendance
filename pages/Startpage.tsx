import React from "react";
import styles from "../styles/Home.module.css";

interface StartpageProps {
    setLanguage: any;

}
const Startpage: React.FC<StartpageProps> = ({ setLanguage}) => {
function setupRegistration(language:string) {
setLanguage(language);

}

return (

    <div className={styles.startbackground}>
    <button onClick={(() => setLanguage('E'))}>English</button>
    <button onClick={(() =>setLanguage('N'))}>Norsk</button>

    </div>
)
}

export default Startpage