/* ============================================================
   Dein erster Tag online — das Werkzeug
   Einmal gebaut, danach nicht mehr anfassen.

   Gefüttert wird ausschliesslich über die Angabe KUNDIN,
   die in der index.html der jeweiligen Kundin steht.
   ============================================================ */

(function () {
  'use strict';

  var K = window.KUNDIN;
  if (!K) {
    document.body.innerHTML =
      '<p style="font-family:sans-serif;padding:40px">Hier fehlen die Angaben der Kundin. ' +
      'Bitte in der index.html den Block KUNDIN ausfüllen.</p>';
    return;
  }

  var sanft = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     Das Gerüst wird hier gebaut, nicht in der Kundinnen-Datei.
     So steht in jedem Kundinnen-Ordner wirklich nur ihr Inhalt,
     und eine Änderung am Aufbau gilt sofort für alle.
     ---------------------------------------------------------- */

  /* ----------------------------------------------------------
     FILM STATT SEITE (Simone, 20.09.2026)

     Die Kundin sitzt davor und schaut zu, wie bei einer
     Folienpräsentation. Scrollen gibt es nicht mehr. Jede Station
     ist eine Folie auf voller Bildschirmhöhe, die nächste blendet
     sich von selbst darüber. Unten läuft eine kleine Leiste mit
     Anhalten, zurück und vor, wie bei einem Video.

     Der frühere Teil 1 (Chronik der Zusammenarbeit plus die Liste
     "Was deine Seite jetzt kann") ist bewusst gestrichen, nicht
     gekürzt (Simone, 19.09.2026): "Teil 1 ist mit der Liveschaltung
     hinter uns." Übrig bleibt eine reine Zeitachse aus Gegenwart
     und Zukunft. Begründung in context/business.md.
     ---------------------------------------------------------- */

  document.body.innerHTML = [
    '<canvas id="konfetti"></canvas>',
    '<div id="fortschritt"></div>',

    '<section id="start">',
    '  <p class="start-zeile">Dein erster Tag online</p>',
    '  <h1 class="start-satz" id="start-satz"></h1>',
    '  <button class="knopf-los" id="knopf-los" type="button"></button>',
    '  <p class="start-hinweis" id="start-hinweis"></p>',
    '  <p class="start-marke">Simone Katz<span class="blume">🌸</span>Webdesign</p>',
    '</section>',

    '<main id="seite" hidden>',

    '  <section class="folie folie--jubel">',
    '    <div class="folie-innen">',
    '      <p class="jubel-datum" id="jubel-datum"></p>',
    '      <h1 class="jubel-satz" id="jubel-satz"></h1>',
    '      <p class="jubel-firma" id="jubel-firma"></p>',
    '      <a class="jubel-adresse" id="jubel-adresse" target="_blank" rel="noopener"></a>',
    '    </div>',
    '  </section>',

    '  <section class="folie folie--buehne">',
    '    <div class="geraet">',
    '      <div class="laptop" id="laptop">',
    '        <div class="laptop-deckel"><div class="laptop-schirm" id="laptop-schirm"></div></div>',
    '        <div class="laptop-fuss"></div>',
    '      </div>',
    '      <p class="laptop-untertitel" id="laptop-untertitel"></p>',
    '    </div>',
    '  </section>',

    '  <section class="folie folie--nacht">',
    '    <div class="folie-innen bahn">',
    '      <p class="block-nummer">Teil 1</p>',
    '      <h2 class="block-titel" id="t2"></h2>',
    '      <p class="block-vorspann" id="v2"></p>',
    '      <ul class="hat" id="hat"></ul>',
    '      <p class="hat-schluss" id="hat-schluss"></p>',
    '    </div>',
    '  </section>',

    '  <section class="folie folie--hell">',
    '    <div class="folie-innen bahn">',
    '      <p class="block-nummer">Teil 2</p>',
    '      <h2 class="block-titel" id="t3"></h2>',
    '      <p class="block-vorspann" id="v3"></p>',
    '      <ul class="ausblick" id="ausblick"></ul>',
    '      <p class="ausblick-nachsatz" id="ausblick-nachsatz"></p>',
    '    </div>',
    '  </section>',

    '  <section class="folie folie--schluss">',
    '    <div class="folie-innen bahn">',
    '      <p class="schluss-text" id="schluss-text"></p>',
    '      <p class="schluss-name">Simone Katz🌸</p>',
    '      <p class="schluss-rolle">Webdesign</p>',
    '      <button class="knopf-pdf" id="knopf-pdf" type="button">Als PDF speichern</button>',
    '      <p class="fuss-hinweis">Im Fenster danach als Ziel „Als PDF speichern" wählen.</p>',
    '    </div>',
    '  </section>',

    '  <div class="steuerung" id="steuerung" hidden>',
    '    <button class="st-knopf" id="st-zurueck" type="button" aria-label="Eine Folie zurück">‹</button>',
    '    <button class="st-knopf" id="st-pause" type="button" aria-label="Anhalten">❚❚</button>',
    '    <button class="st-knopf" id="st-vor" type="button" aria-label="Eine Folie weiter">›</button>',
    '    <div class="st-punkte" id="st-punkte"></div>',
    '  </div>',

    '</main>'
  ].join('\n');

  /* ----------------------------------------------------------
     kleine Helfer
     ---------------------------------------------------------- */

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }

  function finde(w) { return document.querySelector(w); }

  /* ----------------------------------------------------------
     Kopfdaten in die Seite schreiben
     ---------------------------------------------------------- */

  document.title = 'Dein erster Tag online · ' + K.firma;

  finde('#start-satz').textContent = 'Bereit, ' + K.vorname + '?';
  finde('#start-hinweis').textContent = K.startHinweis || 'Einmal draufdrücken.';
  finde('#knopf-los').textContent = K.knopfText || 'Meine Seite ist live';

  finde('#jubel-datum').textContent = K.datum;
  finde('#jubel-satz').textContent = 'Geschafft, ' + K.vorname + '.';

  var adresse = finde('#jubel-adresse');
  adresse.href = K.domainLink;
  adresse.textContent = K.domain + '  ↗';

  /* Überschriften der drei Teile. Stehen hier, damit sie überall
     gleich sind. Eine Kundin kann sie über K.texte überschreiben. */
  var T = K.texte || {};
  /* Fassung D „Blick der neuen Kundin" (Simone, 26.09.2026) */
  finde('#t2').textContent  = T.t2  || 'Das sieht eine neue Kundin zuerst';
  finde('#v2').textContent  = T.v2  || 'Bevor jemand bei dir bucht, schaut sie genau hin. Bei dir findet sie das hier.';
  finde('#t3').textContent  = T.t3  || 'Was irgendwann möglich wäre';
  finde('#v3').textContent  = T.v3  || 'Drei Ideen, mehr nicht. Nichts davon brauchst du, damit deine Seite funktioniert.';

  /* ----------------------------------------------------------
     Teil 1: was sie hat, mit hochzählenden Zahlen
     ---------------------------------------------------------- */

  var hat = finde('#hat');
  (K.hat || []).forEach(function (z) {
    var li = el('li');

    /* Zahl, Sterne und Siegel stehen in einer Zeile, damit alle
       Zahlen auf einer Höhe beginnen (Simone, 26.09.2026). */
    var kopf = el('div', 'hat-kopf');

    var zahl = el('div', 'hat-zahl');
    zahl.dataset.ziel = String(z.zahl);
    zahl.dataset.anhang = z.anhang || '';
    zahl.textContent = (z.anhang || '') ? '0' + z.anhang : '0';
    kopf.appendChild(zahl);

    if (z.sterne) {
      var reihe = el('div', 'sterne');
      for (var i = 0; i < 5; i++) reihe.appendChild(el('span', null, '★'));
      kopf.appendChild(reihe);
    }
    if (z.siegel) kopf.appendChild(el('div', 'hat-siegel', z.siegel));

    li.appendChild(kopf);

    if (z.einheit) li.appendChild(el('div', 'hat-einheit', z.einheit));
    li.appendChild(el('div', 'hat-text', z.text));
    hat.appendChild(li);
  });

  finde('#hat-schluss').textContent = K.hatSchluss || '';

  /* ----------------------------------------------------------
     Teil 2: der Ausblick, aufklappbar
     ---------------------------------------------------------- */

  var ausblick = finde('#ausblick');

  /* Stil „projekte" (Simone, 26.09.2026, Maria): drei helle Container
     untereinander, ohne Aufklappen, ein Satz je Punkt, Zeitpunkt rechts.
     Darüber „Deine nächsten Projekte" mit pinker Linie. Beim Erscheinen
     gleiten sie nacheinander herein, der Hauptpunkt leuchtet pink auf. */
  if (K.ausblickStil === 'projekte') {
    ausblick.classList.add('projekte');
    var kicker = el('p', 'projekte-kicker', K.ausblickKicker || 'Deine nächsten Projekte');
    kicker.appendChild(el('span', 'projekte-linie'));
    ausblick.parentNode.insertBefore(kicker, ausblick);
    (K.ausblick || []).slice(0, 3).forEach(function (idee, nr) {
      var li = el('li');
      if (idee.gross) li.classList.add('haupt');
      li.appendChild(el('div', 'pj-nr', String(nr + 1)));
      var mitte = el('div');
      mitte.appendChild(el('div', 'pj-titel', idee.titel));
      if (idee.warum) mitte.appendChild(el('div', 'pj-text', idee.warum));
      li.appendChild(mitte);
      if (idee.wann) li.appendChild(el('div', 'pj-wann', idee.wann));
      ausblick.appendChild(li);
    });
  }

  if (K.ausblickStil !== 'projekte') (K.ausblick || []).slice(0, 3).forEach(function (idee, nr) {
    var li = el('li');
    /* gross: hervorgehobener Hauptpunkt, rechner: dunkle Karte mit
       kleiner bewegter Vorschau (Simone, 26.09.2026, Maria Folie 4) */
    if (idee.gross) li.classList.add('gross');
    if (idee.rechner) li.classList.add('rechner');

    var knopf = el('button', 'idee-knopf');
    knopf.type = 'button';
    knopf.setAttribute('aria-expanded', 'false');
    knopf.setAttribute('aria-controls', 'idee-' + nr);
    var kopf = el('span', 'idee-kopf');
    if (idee.wann) kopf.appendChild(el('span', 'idee-wann', idee.wann));
    var titel = el('span', 'idee-titel', idee.titel);
    if (idee.neu) titel.appendChild(el('span', 'idee-neu', 'NEU'));
    kopf.appendChild(titel);
    knopf.appendChild(kopf);
    knopf.appendChild(el('span', 'idee-pfeil', '▾'));

    var huelle = el('div', 'idee-inhalt');
    huelle.id = 'idee-' + nr;
    var innen = el('div');
    var textblock = el('div', 'idee-text', idee.warum);
    if (idee.bausteine) {
      var liste = el('ul', 'idee-bausteine');
      idee.bausteine.forEach(function (b) { liste.appendChild(el('li', null, b)); });
      textblock.appendChild(liste);
    }
    if (idee.rechner) {
      var mini = el('div', 'mini-rechner');
      mini.innerHTML = '<div class="mr-frage">Kundinnen pro Woche</div>' +
        '<div class="mr-spur"><div class="mr-fill"></div><div class="mr-knopf"></div></div>' +
        '<div class="mr-frage">Das bringt dir die Ausbildung</div>' +
        '<div class="mr-ergebnis"><span>?</span> € im Monat</div>' +
        '<div class="mr-klein">Beispiel, so könnte er aussehen</div>';
      var zeile = el('div', 'idee-mit-mini');
      zeile.appendChild(textblock);
      zeile.appendChild(mini);
      innen.appendChild(zeile);
    } else {
      innen.appendChild(textblock);
    }
    huelle.appendChild(innen);

    knopf.addEventListener('click', function () {
      var offen = knopf.getAttribute('aria-expanded') === 'true';
      knopf.setAttribute('aria-expanded', offen ? 'false' : 'true');
      huelle.classList.toggle('offen', !offen);
    });

    li.appendChild(knopf);
    li.appendChild(huelle);
    ausblick.appendChild(li);
  });

  var nachsatz = finde('#ausblick-nachsatz');
  nachsatz.textContent = K.ausblickNachsatz || '';
  /* Statt Nachsatz nur Simones Name mit pinkem Strich (26.09.2026) */
  if (K.ausblickSignatur) {
    nachsatz.classList.add('mit-signatur');
    nachsatz.innerHTML = '<span class="sig-strich"></span><b>Simone Katz🌸</b>';
  }

  /* ----------------------------------------------------------
     Schlusswort
     ---------------------------------------------------------- */

  finde('#schluss-text').textContent = K.schlusswort || '';

  /* ----------------------------------------------------------
     Der Laptop mit dem Mockup
     ---------------------------------------------------------- */

  var schirm = finde('#laptop-schirm');
  var glanz = el('div', 'laptop-glanz');

  /* Bringt das Material schon einen eigenen Geräterahmen mit
     (so wie Simones Mockup-Video), fällt unser Laptop weg.
     Sonst stünde ein Laptop im Laptop. */
  if (K.hero && K.hero.rahmen === false) {
    finde('#laptop').classList.add('ohne-rahmen');
  }

  if (K.hero && K.hero.video) {
    var v = el('video');
    v.src = K.hero.video;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    if (K.hero.standbild) v.poster = K.hero.standbild;
    schirm.appendChild(v);
  } else if (K.hero && K.hero.bild) {
    var b = el('img');
    b.src = K.hero.bild;
    b.alt = 'Die Startseite von ' + K.firma;
    schirm.appendChild(b);
  }

  schirm.appendChild(glanz);
  /* Erst der Name groß, dann ein kurzer pinker Strich, dann der Satz
     (Simone, 26.09.2026, Variante B mit Strich). Ohne hero.satz bleibt
     es beim alten einzeiligen Untertitel. */
  var ut = finde('#laptop-untertitel');
  if (K.hero && K.hero.satz) {
    ut.classList.add('gestuft');
    ut.appendChild(el('span', 'lu-name', K.hero.name || K.firma));
    ut.appendChild(el('span', 'lu-strich'));
    ut.appendChild(el('span', 'lu-satz', K.hero.satz));
  } else {
    ut.textContent = K.hero && K.hero.untertitel ? K.hero.untertitel : '';
  }

  /* ----------------------------------------------------------
     Musik: startet erst beim Klick, nie beim Laden.
     Der Knopf unten rechts erscheint nur, wenn K.musik gesetzt ist.
     ---------------------------------------------------------- */

  var ton = null;
  var tonSchluss = null;
  var tonKnopf = null;
  var tonAus = false;
  var lautstaerke = typeof K.musikLautstaerke === 'number' ? K.musikLautstaerke : 0.5;

  /* Zweiter Schnipsel für ganz unten: der Schluss mit dem Klatscher.
     Simones Wunsch, damit die Mitte des Titels wegfällt und die
     Musik das Erlebnis nur einklammert, statt durchzulaufen. */
  if (K.musikSchluss) {
    tonSchluss = new Audio(K.musikSchluss);
    tonSchluss.volume = lautstaerke;
  }

  if (K.musik) {
    ton = new Audio(K.musik);
    ton.loop = K.musikSchleife === true;
    ton.volume = lautstaerke;

    tonKnopf = el('button', 'knopf-ton', '♪');
    tonKnopf.type = 'button';
    tonKnopf.hidden = true;
    tonKnopf.setAttribute('aria-pressed', 'true');
    tonKnopf.setAttribute('aria-label', 'Musik an oder aus');
    tonKnopf.title = 'Musik an oder aus';

    tonKnopf.addEventListener('click', function () {
      tonAus = !tonAus;
      tonKnopf.setAttribute('aria-pressed', tonAus ? 'false' : 'true');
      tonKnopf.textContent = tonAus ? '♪̸' : '♪';

      if (tonAus) {
        ton.pause();
        if (tonSchluss) tonSchluss.pause();
      } else if (ton.currentTime > 0 && !ton.ended) {
        ton.play();
      }
    });

    document.body.appendChild(tonKnopf);
  }

  /* ----------------------------------------------------------
     Der Moment: Klick auf den Knopf
     ---------------------------------------------------------- */

  finde('#knopf-los').addEventListener('click', function () {
    if (ton) {
      var t = ton.play();
      if (t && t.catch) t.catch(function () { /* Ton abgelehnt, Seite läuft still weiter */ });
      tonKnopf.hidden = false;
    }

    finde('#start').classList.add('weg');
    finde('#seite').hidden = false;

    window.scrollTo(0, 0);

    konfettiRegnen();
    firmaSchreiben();

    /* Die dauerhaft fallenden Kirschblüten im Hintergrund sind bewusst
       draußen (Simone, 19.09.2026): eine einzelne Blüte, die mitten auf
       der Seite vorbeisegelt, wirkt zufällig statt festlich. Konfetti
       gibt es nur noch im Geschafft-Moment und beim Schluss-Klatscher. */

    /* Simones Regel: Auf jeden Klatscher muss etwas Sichtbares kommen.
       Ein Konfetti-Stoss von unten und ein kurzer Schlag auf die
       Überschrift, beides genau auf den Takt. */
    if (ton) {
      var kopf = finde('#jubel-satz');
      taktErkennungStarten(ton, K.taktSekunden || 9, function () {
        konfettiStoss();
        kopf.classList.remove('schlag');
        void kopf.offsetWidth;
        kopf.classList.add('schlag');
      });
    }

    filmStarten();
  });

  /* ----------------------------------------------------------
     DER FILM
     Jede Folie bekommt ihre eigene Standzeit. Danach blendet die
     nächste über. Unten steuert die Kundin selbst: anhalten,
     zurück, vor. Nichts wird gescrollt.

     Die Zeiten stehen in SEKUNDEN und sind über den Regler-Kasten
     einstellbar (?regler an der Adresse). Was Simone dort findet,
     wird hier festgeschrieben.
     ---------------------------------------------------------- */

  /* Von Simone am 20.09.2026 über den Regler eingestellt, am 26.09.2026 nachjustiert */
  var FOLIEN = [
    { name: 'Geschafft',        dauer: K.dauerJubel   || 7.6  },
    { name: 'Laptop',           dauer: K.dauerLaptop  || 10.5 },
    { name: 'Das hast du schon',dauer: K.dauerZahlen  || 8    },
    { name: 'Die Impulse',      dauer: K.dauerImpulse || 10   },
    { name: 'Schlusswort',      dauer: 0 }   /* 0 heisst: bleibt stehen */
  ];

  /* Ab wann die Zahlen zu laufen beginnen, gerechnet ab dem Moment,
     in dem die Folie erscheint. Muss lang genug sein, dass die vier
     Kacheln vorher stehen (Simone, 20.09.2026). */
  var zahlenAb = K.zahlenAb || 2.1;

  var folien = [];
  var jetzigeFolie = -1;
  var uhr = null;
  var laeuftFilm = true;

  function filmStarten() {
    folien = [].slice.call(document.querySelectorAll('.folie'));

    var punkte = finde('#st-punkte');
    folien.forEach(function (f, i) {
      var p = el('button', 'st-punkt');
      p.type = 'button';
      p.setAttribute('aria-label', 'Zu „' + FOLIEN[i].name + '"');
      p.title = FOLIEN[i].name;
      p.addEventListener('click', function () { anhalten(); zeige(i); });
      punkte.appendChild(p);
    });

    finde('#steuerung').hidden = false;
    finde('#st-zurueck').addEventListener('click', function () { anhalten(); zeige(jetzigeFolie - 1); });
    finde('#st-vor').addEventListener('click', function () { anhalten(); zeige(jetzigeFolie + 1); });
    finde('#st-pause').addEventListener('click', pauseUmschalten);

    /* Pfeiltasten und Leertaste, weil beides erwartet wird */
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { anhalten(); zeige(jetzigeFolie + 1); }
      if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   { anhalten(); zeige(jetzigeFolie - 1); }
      if (e.key === ' ') { e.preventDefault(); pauseUmschalten(); }
    });

    zeige(0);
  }

  function zeige(nr) {
    if (nr < 0 || nr >= folien.length || nr === jetzigeFolie) return;

    var vor = jetzigeFolie;
    jetzigeFolie = nr;

    folien.forEach(function (f, i) {
      f.classList.toggle('aktiv', i === nr);
      f.setAttribute('aria-hidden', i === nr ? 'false' : 'true');
    });

    [].slice.call(document.querySelectorAll('.st-punkt')).forEach(function (p, i) {
      p.classList.toggle('da', i === nr);
    });

    balkenSetzen();
    folieErwecken(nr, vor);
    uhrStellen();
  }

  /* Was auf einer Folie passieren soll, sobald sie erscheint */
  function folieErwecken(nr, vorher) {
    var f = folien[nr];

    /* Laptop: fährt heran, sobald seine Folie dran ist */
    if (f.classList.contains('folie--buehne')) laptopWecken();

    /* Erst stellen sich die Kacheln nacheinander hin, dann erst
       laufen die Zahlen los (Simone, 20.09.2026: "eigentlich müsste
       erst die Kachel kommen und dann die Zahl anfangen zu laufen"). */
    var kacheln = [].slice.call(f.querySelectorAll('.hat li'));
    if (kacheln.length && !f.dataset.kacheln) {
      f.dataset.kacheln = '1';

      kacheln.forEach(function (k, i) {
        setTimeout(function () { k.classList.add('da'); }, sanft ? 0 : i * 160);
      });

      setTimeout(function () {
        f.querySelectorAll('.hat-zahl').forEach(function (z) {
          if (z.dataset.fertig) return;
          z.dataset.fertig = '1';
          hochzaehlen(z);
        });
        f.querySelectorAll('.sterne').forEach(function (s) { s.classList.add('an'); });
      }, sanft ? 0 : zahlenAb * 1000);
    }

    /* Die Impulse klappen von selbst nacheinander auf, sonst liest
       sie im Film niemand (Simone, 20.09.2026: Weg A). */
    /* Stil „projekte": Einflug bei jedem Erscheinen neu abspielen */
    if (f.classList.contains('folie--hell')) {
      var pj = f.querySelector('.ausblick.projekte');
      if (pj) {
        pj.classList.remove('los');
        void pj.offsetWidth;
        pj.classList.add('los');
        var pk = f.querySelector('.projekte-kicker');
        if (pk) { pk.classList.remove('los'); void pk.offsetWidth; pk.classList.add('los'); }
      }
    }

    if (f.classList.contains('folie--hell') && !f.dataset.aufgeklappt) {
      f.dataset.aufgeklappt = '1';
      var knoepfe = [].slice.call(f.querySelectorAll('.idee-knopf'));
      knoepfe.forEach(function (k, i) {
        setTimeout(function () {
          if (k.getAttribute('aria-expanded') === 'true') return;
          k.click();
        }, sanft ? 0 : 700 + i * 900);
      });
    }

    /* Schlusswort: der Klatscher mit dem Feuerwerk */
    if (f.classList.contains('folie--schluss') && !f.dataset.gefeiert) {
      f.dataset.gefeiert = '1';
      schlussFeuerwerk();
    }

    if (vorher === -1) return;   /* beim ersten Aufbau nichts weiter */
  }

  function uhrStellen() {
    clearTimeout(uhr);
    if (!laeuftFilm) return;

    var dauer = FOLIEN[jetzigeFolie] ? FOLIEN[jetzigeFolie].dauer : 0;
    if (!dauer) return;          /* letzte Folie bleibt stehen */

    uhr = setTimeout(function () { zeige(jetzigeFolie + 1); }, dauer * 1000);
  }

  function anhalten() {
    laeuftFilm = false;
    clearTimeout(uhr);
    pauseKnopfSetzen();
  }

  function pauseUmschalten() {
    laeuftFilm = !laeuftFilm;
    pauseKnopfSetzen();
    if (laeuftFilm) uhrStellen(); else clearTimeout(uhr);
  }

  function pauseKnopfSetzen() {
    var k = finde('#st-pause');
    if (!k) return;
    k.textContent = laeuftFilm ? '❚❚' : '▶';
    k.setAttribute('aria-label', laeuftFilm ? 'Anhalten' : 'Weiterlaufen lassen');
  }

  function balkenSetzen() {
    var balken = finde('#fortschritt');
    if (!balken) return;
    balken.style.width = ((jetzigeFolie + 1) / folien.length * 100) + '%';
  }

  /* ----------------------------------------------------------
     Der Laptop fährt heran, sobald seine Folie dran ist
     ---------------------------------------------------------- */

  function laptopWecken() {
    var laptop = finde('#laptop');
    if (!laptop || laptop.classList.contains('auf')) return;

    var video = schirm.querySelector('video');
    laptop.classList.add('auf');

    if (!video) return;
    setTimeout(function () {
      var p = video.play();
      if (p && p.catch) p.catch(function () { /* Standbild bleibt stehen */ });
    }, sanft ? 0 : (K.hero && K.hero.rahmen === false ? 250 : 1750));
  }

  /* ----------------------------------------------------------
     Firmenname schreibt sich Buchstabe für Buchstabe
     ---------------------------------------------------------- */

  function firmaSchreiben() {
    var ziel = finde('#jubel-firma');
    ziel.textContent = '';

    if (sanft) {
      ziel.textContent = K.firma + ' ist online.';
      return;
    }

    var text = K.firma + ' ist online.';
    text.split('').forEach(function (z, i) {
      var s = el('span', 'buchstabe', z === ' ' ? ' ' : z);
      s.style.animationDelay = (0.5 + i * 0.045) + 's';
      ziel.appendChild(s);
    });

    var cursor = el('span', 'jubel-cursor');
    ziel.appendChild(cursor);
    setTimeout(function () { cursor.remove(); }, 600 + text.length * 45 + 1400);
  }

  /* ----------------------------------------------------------
     Takt-Erkennung: hört die Klatscher aus der Musik heraus
     und meldet jeden einzelnen.

     Simones Regel dahinter (19.09.2026): Klatsch-Takte wirken nur,
     wenn GENAU in dem Moment auch etwas Sichtbares passiert.
     Sonst fühlt es sich an wie ein Fehler.

     Bewusst nur in den ersten Sekunden aktiv. Danach würde es
     zur Disco, und die Kundin will ja lesen.
     ---------------------------------------------------------- */

  function taktErkennungStarten(audio, fensterSekunden, beiSchlag) {
    if (sanft || !audio) return;

    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    var ctx, quelle, pruefer;
    try {
      ctx = new Ctx();
      quelle = ctx.createMediaElementSource(audio);
      pruefer = ctx.createAnalyser();
      pruefer.fftSize = 1024;
      quelle.connect(pruefer);
      pruefer.connect(ctx.destination);
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) {
      return; /* Ohne Tonanalyse läuft die Seite normal weiter */
    }

    var werte = new Uint8Array(pruefer.frequencyBinCount);
    var verlauf = [];
    var letzterTakt = 0;
    var beginn = performance.now();

    var FENSTER = (fensterSekunden || K.taktSekunden || 9) * 1000;
    var ABSTAND = K.taktAbstand || 230;           /* Millisekunden Mindestabstand */
    var SCHWELLE = K.taktSchwelle || 1.38;        /* wie deutlich über dem Schnitt */

    function hoeren(jetzt) {
      if (jetzt - beginn > FENSTER) return;
      requestAnimationFrame(hoeren);

      pruefer.getByteFrequencyData(werte);

      /* Klatschen und Stampfen sitzen unten und in der Mitte */
      var summe = 0;
      var bis = Math.floor(werte.length * 0.42);
      for (var i = 0; i < bis; i++) summe += werte[i];
      var jetztWert = summe / bis;

      verlauf.push(jetztWert);
      if (verlauf.length > 48) verlauf.shift();
      if (verlauf.length < 14) return;

      var schnitt = verlauf.reduce(function (a, b) { return a + b; }, 0) / verlauf.length;

      if (jetztWert > schnitt * SCHWELLE && jetztWert > 26 &&
          jetzt - letzterTakt > ABSTAND) {
        letzterTakt = jetzt;
        beiSchlag();
      }
    }

    requestAnimationFrame(hoeren);
  }

  /* ----------------------------------------------------------
     Konfetti in Pink und Lime, dazu Kirschblüten
     ---------------------------------------------------------- */

  var konfettiStoss = function () {};  /* wird beim Start ersetzt */

  function konfettiRegnen() {
    if (sanft) return;

    var leinwand = finde('#konfetti');
    var stift = leinwand.getContext('2d');
    var breite, hoehe;

    function messen() {
      breite = leinwand.width = window.innerWidth;
      hoehe = leinwand.height = window.innerHeight;
    }
    messen();
    window.addEventListener('resize', messen);

    var farben = ['#FF0080', '#C6FF3D', '#FF4DA6', '#1A1A2E', '#E0FF8C'];
    var teile = [];

    function teilchen(eigenes) {
      var t = {
        x: Math.random() * breite,
        y: Math.random() * -hoehe,
        b: 6 + Math.random() * 7,
        h: 9 + Math.random() * 10,
        farbe: farben[(Math.random() * farben.length) | 0],
        vx: -1.1 + Math.random() * 2.2,
        vy: 2.2 + Math.random() * 3.4,
        schwerkraft: 0,
        wiederholt: true,
        dreh: Math.random() * Math.PI * 2,
        drehTempo: -0.11 + Math.random() * 0.22,
        blume: Math.random() < 0.22
      };
      for (var s in eigenes) t[s] = eigenes[s];
      return t;
    }

    var anzahl = window.innerWidth < 600 ? 90 : 160;
    for (var i = 0; i < anzahl; i++) teile.push(teilchen());

    var start = performance.now();
    /* Lange genug, dass noch Konfetti fällt, wenn die Seite auf der
       dunklen Bühne ankommt (Simone, 19.09.2026: "schön, dass das
       auch noch mit Konfetti ist"). */
    var dauer = 10000;   /* von Simone eingestellt, 26.09.2026 */
    var bisWann = start + dauer;
    var laeuft = true;

    /* Ein Stoss auf den Takt: schiesst von unten nach oben und fällt zurück.
       Kann die Leinwand auch wieder aufwecken, wenn sie schon geruht hat.
       Genau das braucht der Schluss-Klatscher ganz unten auf der Seite. */
    konfettiStoss = function (wucht) {
      var stark = wucht || 1;
      var wieviele = Math.round((window.innerWidth < 600 ? 16 : 26) * stark);
      var mitte = breite / 2;

      for (var j = 0; j < wieviele; j++) {
        var seite = Math.random() < 0.5 ? -1 : 1;
        teile.push(teilchen({
          x: mitte + seite * (breite * (0.08 + Math.random() * 0.34)),
          y: hoehe + 12,
          vx: seite * (0.6 + Math.random() * 2.6) * stark,
          vy: -(11 + Math.random() * 8) * stark,
          schwerkraft: 0.28,
          wiederholt: false,
          drehTempo: -0.26 + Math.random() * 0.52
        }));
      }

      bisWann = Math.max(bisWann, performance.now() + 2600);

      if (!laeuft) { laeuft = true; requestAnimationFrame(bild); }
    };

    function bild(jetzt) {
      stift.clearRect(0, 0, breite, hoehe);

      var rest = bisWann - jetzt;
      var schwund = rest < 1400 ? Math.max(0, rest / 1400) : 1;

      for (var k = teile.length - 1; k >= 0; k--) {
        var t = teile[k];
        t.vy += t.schwerkraft;
        t.y += t.vy;
        t.x += t.vx;
        t.dreh += t.drehTempo;

        if (t.y > hoehe + 30) {
          if (t.wiederholt) { t.y = -30; t.x = Math.random() * breite; }
          else { teile.splice(k, 1); continue; }
        }

        stift.save();
        stift.globalAlpha = schwund;
        stift.translate(t.x, t.y);
        stift.rotate(t.dreh);

        if (t.blume) {
          stift.font = (t.h + 6) + 'px serif';
          stift.textAlign = 'center';
          stift.fillText('🌸', 0, 0);
        } else {
          stift.fillStyle = t.farbe;
          stift.fillRect(-t.b / 2, -t.h / 2, t.b, t.h);
        }
        stift.restore();
      }

      if (rest > 0) {
        requestAnimationFrame(bild);
      } else {
        stift.clearRect(0, 0, breite, hoehe);
        laeuft = false;
      }
    }

    requestAnimationFrame(bild);
  }

  /* ----------------------------------------------------------
     Auf der Schluss-Folie: der Klatscher mit dem Feuerwerk.
     Auf jeden Schlag des Wirbels ein Konfetti-Stoss, der letzte
     kräftig. Das ist der zweite und letzte Moment des Films.
     ---------------------------------------------------------- */

  function schlussFeuerwerk() {
    if (!tonSchluss || tonAus) { konfettiStoss(1.4); return; }

    var p = tonSchluss.play();
    if (p && p.catch) p.catch(function () { /* Ton abgelehnt, alles läuft weiter */ });

    if (tonKnopf) tonKnopf.hidden = false;

    taktErkennungStarten(tonSchluss, 6.5, function () { konfettiStoss(1.15); });
  }

  function hochzaehlen(feld) {
    var ziel = parseFloat(feld.dataset.ziel);
    var anhang = feld.dataset.anhang || '';

    if (sanft || isNaN(ziel)) {
      feld.textContent = (feld.dataset.ziel || '') + anhang;
      return;
    }

    var dauer = 1150;
    var start = performance.now();

    function tick(jetzt) {
      var t = Math.min(1, (jetzt - start) / dauer);
      var weich = 1 - Math.pow(1 - t, 3);
      feld.textContent = Math.round(ziel * weich) + anhang;
      if (t < 1) requestAnimationFrame(tick);
      else feld.textContent = feld.dataset.ziel + anhang;
    }

    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------
     Regler-Kasten, nur für Simone.
     Aufrufen mit ?regler an der Adresse. Damit stellt sie den
     Rhythmus selbst ein, statt ihn zu beschreiben.
     ---------------------------------------------------------- */

  if (/[?&]regler/.test(location.search)) reglerBauen();

  function reglerBauen() {
    var regler = [
      { gruppe: 'Wie lange steht jede Folie' },
      { text: 'Geschafft',          von: 2, bis: 20, schritt: 0.5, art: 'folie', nr: 0,
        schluessel: 'dauerJubel' },
      { text: 'Laptop',             von: 3, bis: 22, schritt: 0.5, art: 'folie', nr: 1,
        schluessel: 'dauerLaptop' },
      { text: 'Das hast du schon',  von: 5, bis: 40, schritt: 1,   art: 'folie', nr: 2,
        schluessel: 'dauerZahlen' },
      { text: 'Die Impulse',        von: 5, bis: 50, schritt: 1,   art: 'folie', nr: 3,
        schluessel: 'dauerImpulse' },

      { gruppe: 'Der Wechsel zwischen den Folien' },
      { text: 'Wechsel dauert',     von: 0.1, bis: 2, schritt: 0.05,
        wert: 0.7, art: 'css', name: '--t-wechsel' },
      { text: 'Zahlen starten ab',  von: 0, bis: 5, schritt: 0.1,
        wert: zahlenAb, art: 'zahlen' },

      { gruppe: 'Der Laptop-Auftritt' },
      { text: 'Laptop fährt heran', von: 1, bis: 10, schritt: 0.25,
        wert: 4.75, art: 'css', name: '--t-heran' },
      { text: 'Seite erwacht ab',   von: 0, bis: 8,  schritt: 0.25,
        wert: 2.25, art: 'css', name: '--t-wach-ab' },
      { text: 'Erwachen dauert',    von: 0.2, bis: 4, schritt: 0.1,
        wert: 1.5,  art: 'css', name: '--t-wach' },
      { text: 'Lichtstreifen ab',   von: 0, bis: 9,  schritt: 0.25,
        wert: 3,    art: 'css', name: '--t-glanz-ab' },
      { text: 'Firmenname kommt ab', von: 0, bis: 12, schritt: 0.25,
        wert: 4.5, art: 'css', name: '--t-name-ab' },
      { text: 'Satz kommt ab',      von: 0, bis: 12, schritt: 0.25,
        wert: 6, art: 'css', name: '--t-satz-ab' },
      { text: 'Konfetti läuft',     von: 3, bis: 20, schritt: 0.5,
        wert: 10, art: 'nur-anzeige' }
    ];

    var kasten = el('div', 'regler-kasten');
    kasten.appendChild(el('h2', null, 'Rhythmus einstellen'));

    /* Ganz von vorn, samt Startbildschirm. Simone soll den Film selbst
       neu starten können, ohne Charli zu fragen (26.09.2026). Die
       eingestellten Werte merkt sich der Browser, damit sie beim
       Neuladen nicht verloren gehen. */
    var gemerkt = {};
    try { gemerkt = JSON.parse(localStorage.getItem('ersterTagRegler') || '{}'); } catch (e) {}
    function merken() {
      var m = {};
      regler.forEach(function (r) { if (!r.gruppe) m[r.text] = r.wert; });
      try { localStorage.setItem('ersterTagRegler', JSON.stringify(m)); } catch (e) {}
    }
    var neustart = el('button', 'regler-neustart', '↻ Ganz von vorn');
    neustart.type = 'button';
    neustart.addEventListener('click', function () { merken(); location.reload(); });
    kasten.appendChild(neustart);

    regler.forEach(function (r) {
      if (r.gruppe) {
        kasten.appendChild(el('p', 'regler-gruppe', r.gruppe));
        return;
      }

      if (r.art === 'folie') r.wert = FOLIEN[r.nr].dauer;
      if (gemerkt[r.text] != null) {
        r.wert = gemerkt[r.text];
        if (r.art === 'css')    document.documentElement.style.setProperty(r.name, r.wert + 's');
        if (r.art === 'folie')  FOLIEN[r.nr].dauer = r.wert;
        if (r.art === 'zahlen') zahlenAb = r.wert;
      }

      var zeile = el('div', 'regler-zeile');
      var label = el('label');
      label.appendChild(el('span', null, r.text));
      var zahl = el('b', null, r.wert + 's');
      label.appendChild(zahl);

      var schieber = el('input');
      schieber.type = 'range';
      schieber.min = r.von; schieber.max = r.bis;
      schieber.step = r.schritt; schieber.value = r.wert;

      schieber.addEventListener('input', function () {
        r.wert = parseFloat(schieber.value);
        zahl.textContent = r.wert + 's';
        if (r.art === 'css') {
          document.documentElement.style.setProperty(r.name, r.wert + 's');
        }
        if (r.art === 'folie')  FOLIEN[r.nr].dauer = r.wert;
        if (r.art === 'zahlen') zahlenAb = r.wert;
        merken();
      });

      zeile.appendChild(label);
      zeile.appendChild(schieber);
      kasten.appendChild(zeile);
    });

    var knoepfe = el('div', 'regler-knoepfe');
    var nochmal = el('button', null, 'Film von vorn');
    var zeigen = el('button', 'still', 'Werte');
    knoepfe.appendChild(nochmal);
    knoepfe.appendChild(zeigen);
    kasten.appendChild(knoepfe);

    var ausgabe = el('pre', 'regler-ausgabe');
    kasten.appendChild(ausgabe);

    /* Spielt den ganzen Film noch einmal, samt Laptop-Auftritt und
       aufklappenden Impulsen, damit Simone den Rhythmus im Ganzen hört
       und sieht statt nur eine einzelne Stufe. */
    nochmal.addEventListener('click', function () {
      var laptop = finde('#laptop');
      laptop.classList.remove('auf');
      void laptop.offsetWidth;

      document.querySelectorAll('.folie').forEach(function (f) {
        delete f.dataset.aufgeklappt;
        delete f.dataset.gefeiert;
        delete f.dataset.kacheln;
      });
      document.querySelectorAll('.idee-knopf[aria-expanded="true"]').forEach(function (k) { k.click(); });
      document.querySelectorAll('.hat li').forEach(function (k) { k.classList.remove('da'); });
      document.querySelectorAll('.sterne').forEach(function (s) { s.classList.remove('an'); });
      document.querySelectorAll('.hat-zahl').forEach(function (z) {
        delete z.dataset.fertig;
        z.textContent = '0' + (z.dataset.anhang || '');
      });

      jetzigeFolie = -1;
      laeuftFilm = true;
      pauseKnopfSetzen();
      zeige(0);
    });

    zeigen.addEventListener('click', function () {
      var zeilen = regler.filter(function (r) { return !r.gruppe; }).map(function (r) {
        return (r.schluessel ? r.schluessel + ': ' : r.name ? r.name + ': ' : r.text + ': ') + r.wert + 's';
      });
      ausgabe.textContent = zeilen.join('\n');
      ausgabe.classList.add('da');
    });

    document.body.appendChild(kasten);
  }

  /* ----------------------------------------------------------
     Als PDF speichern
     ---------------------------------------------------------- */

  finde('#knopf-pdf').addEventListener('click', function () {
    /* Der Film hält an, sonst wechselt im Hintergrund die Folie,
       während das Druckfenster offen ist. */
    anhalten();

    document.querySelectorAll('.idee-inhalt').forEach(function (h) { h.classList.add('offen'); });
    document.querySelectorAll('.idee-knopf').forEach(function (k) {
      k.setAttribute('aria-expanded', 'true');
    });

    /* Kurz warten, damit der Browser die Folien wirklich alle
       aufgebaut hat, bevor er das Druckbild macht. */
    setTimeout(function () { window.print(); }, 120);
  });
})();
