import "./page.module.scss"

export default function Nav() {
    return(
        <div id="Header">
            <li className="header_li"><a href="index.html">Hjem</a></li>
            <li className="header_li"><a href="Cookies.html">Cookies</a></li>
            <li id="highlighted"><a href="Phishing.html">Phishing</a></li>
            <li className="header_li"><a href="Testen.html">Ta quizen</a></li>
            <li className="header_li"><a href="kommentarer.html">Kommentarer</a></li>
            <li className="header_li"><a href="login.html">Logg inn</a></li>
        </div>
    )
}