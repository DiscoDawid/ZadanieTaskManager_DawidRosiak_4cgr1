import { useEffect, useRef, useState } from "react";
import $ from "jquery";

function Menu() {
    const zadaniaRef = useRef(null);
    const ustawieniaRef = useRef(null);
    const menuRef =useRef(null);

    const [otwarteMenu, setOtwarteMenu] = useState(null);

    useEffect(() => {
        const $zadania = $(zadaniaRef.current);
        const $ustawienia = $(ustawieniaRef.current);

        $zadania.stop(true, true);
        $ustawienia.stop(true, true);

        if (otwarteMenu === "zadania") {
            $zadania.slideDown(300);
            $ustawienia.slideUp(300);
        } else if (otwarteMenu === "ustawienia") {
            $ustawienia.slideDown(300);
            $zadania.slideUp(300);
        } else {
            $zadania.slideUp(300);
            $ustawienia.slideUp(300);
        }

        return () => {
            $zadania.stop(true, true);
            $ustawienia.stop(true, true);
        };
    }, [otwarteMenu]);

    const przelaczMenu = (nazwa) => {
        setOtwarteMenu((poprzednie) =>
            poprzednie === nazwa ? null : nazwa
        );
    };

    useEffect(() => {
        const kliknieciePozaMenu = (e) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target)
            ){
                setOtwarteMenu(null);
            }
        };
        document.addEventListener("pointerdown", kliknieciePozaMenu);
        return () => {
            document.removeEventListener("pointerdown",kliknieciePozaMenu);
        };
    },[]);

    return (
        <nav ref={menuRef} className="menu" aria-label="Menu główne">
            <ul>
                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === "zadania"}
                        onClick={() => przelaczMenu("zadania")}
                    >
                        Zadania
                    </button>

                    <ul className="submenu" ref={zadaniaRef}>
                        <li>Wszystkie zadania</li>
                        <li>Dodaj zadanie</li>
                        <li>Statystyki</li>
                    </ul>
                </li>

                <li>
                    <button
                        type="button"
                        aria-expanded={otwarteMenu === "ustawienia"}
                        onClick={() => przelaczMenu("ustawienia")}
                    >
                        Ustawienia
                    </button>

                    <ul className="submenu" ref={ustawieniaRef}>
                        <li>Motyw aplikacji</li>
                        <li>Preferencje</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;