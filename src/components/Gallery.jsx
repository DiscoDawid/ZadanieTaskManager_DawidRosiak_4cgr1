import { useEffect, useRef, useState } from "react";
import $ from "jquery";

// 15 zdjęć z picsum.photos (krajobrazy i natura); numer id zawsze daje to samo zdjęcie
const ids = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 29, 37, 39, 42];

const zdjecia = ids.map((id, i) => ({
    src: `https://picsum.photos/id/${id}/800/600`,
    alt: `Zdjęcie ${i + 1}`,
}));

function Gallery() {
    const overlayRef = useRef(null);
    const imgRef = useRef(null);
    const animujeRef = useRef(false);

    const [otwarte, setOtwarte] = useState(false);
    const [indeks, setIndeks] = useState(0);

    // otwieranie / zamykanie okna (fade)
    useEffect(() => {
        const $overlay = $(overlayRef.current);
        $overlay.stop(true, true);
        if (otwarte) $overlay.fadeIn(250);
        else $overlay.fadeOut(250);

        return () => {
            $overlay.stop(true, true);
        };
    }, [otwarte]);

    // pojawienie się zdjęcia po otwarciu lub zmianie (slide + fade in)
    useEffect(() => {
        if (!otwarte) return;
        const $img = $(imgRef.current);
        $img.stop(true).animate({ opacity: 1, marginLeft: 0 }, 300);
    }, [indeks, otwarte]);

    const otworz = (i) => {
        $(imgRef.current).css({ opacity: 0, marginLeft: 0 });
        setIndeks(i);
        setOtwarte(true);
    };

    const zamknij = () => setOtwarte(false);

    // kierunek: 1 = następne, -1 = poprzednie
    const zmien = (kierunek) => {
        if (animujeRef.current) return;
        animujeRef.current = true;

        const $img = $(imgRef.current);
        $img.stop(true).animate(
            { opacity: 0, marginLeft: -kierunek * 60 },
            200,
            () => {
                // ustaw zdjęcie po przeciwnej stronie, efekt wjedzie do środka
                $img.css({ marginLeft: kierunek * 60 });
                setIndeks((p) => (p + kierunek + zdjecia.length) % zdjecia.length);
                animujeRef.current = false;
            }
        );
    };

    // klawiatura: Esc, strzałki
    useEffect(() => {
        if (!otwarte) return;
        const onKey = (e) => {
            if (e.key === "Escape") zamknij();
            if (e.key === "ArrowRight") zmien(1);
            if (e.key === "ArrowLeft") zmien(-1);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [otwarte]);

    if (zdjecia.length === 0) {
        return (
            <section className="galeria">
                <h2>Galeria</h2>
                <p>Brak zdjęć w folderze src/assets/gallery</p>
            </section>
        );
    }

    return (
        <section className="galeria">
            <h2>Galeria</h2>

            <div className="miniatury">
                {zdjecia.map((z, i) => (
                    <img
                        key={z.alt}
                        src={z.src}
                        alt={z.alt}
                        onClick={() => otworz(i)}
                    />
                ))}
            </div>

            <div
                className="lightbox"
                ref={overlayRef}
                onClick={zamknij}
            >
                <div className="lightbox-wnetrze">
                    <button
                        type="button"
                        className="lb-btn"
                        aria-label="Poprzednie zdjęcie"
                        onClick={(e) => { e.stopPropagation(); zmien(-1); }}
                    >
                        ‹
                    </button>

                    <img
                        ref={imgRef}
                        className="lb-img"
                        src={zdjecia[indeks].src}
                        alt={zdjecia[indeks].alt}
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        type="button"
                        className="lb-btn"
                        aria-label="Następne zdjęcie"
                        onClick={(e) => { e.stopPropagation(); zmien(1); }}
                    >
                        ›
                    </button>
                </div>

                <p className="lb-licznik">{indeks + 1} / {zdjecia.length}</p>
                <button type="button" className="lb-zamknij" onClick={zamknij}>✕</button>
            </div>
        </section>
    );
}

export default Gallery;
