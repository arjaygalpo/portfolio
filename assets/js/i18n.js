(() => {
  'use strict';

  // English lives in the HTML itself; only French is stored here.
  // Keys match data-i18n (innerHTML) and data-i18n-attr="attr:key,attr:key".
  const FR = {
    'meta.title': 'Arjay Galpo — Soutien informatique, systèmes et développement web',
    'meta.desc': "Arjay Galpo — professionnel des TI cumulant 8 ans de soutien technique en systèmes PDV, Windows Server, réseaux et sécurité, ainsi qu'en développement web et ingénierie IA.",
    'skip': 'Passer au contenu',

    'nav.home': 'Arjay Galpo, accueil',
    'nav.primary': 'Navigation principale',
    'nav.about': 'À propos',
    'nav.work': 'Expertise',
    'nav.experience': 'Expérience',
    'nav.credentials': 'Formation',
    'nav.contact': 'Contact',
    'lang.group': 'Langue',

    'hero.eyebrow': '<span class="dot"></span> Disponible<span class="hide-sm"> pour des postes en TI et en développement</span> · Québec',
    'hero.alt': "Portrait d'Arjay Galpo en complet, éclairé par une lumière de studio rouge et verte",
    'hero.badge': '<span class="pulse"></span> 8+ ans en soutien TI',
    'chip.ai': 'Ingénieur IA',
    'hero.roles': 'Soutien TI <i>•</i> Systèmes <i>•</i> Technologie PDV <i>•</i> Développement web <i>•</i> Ingénierie IA',
    'hero.intro': "Je garde la technologie des entreprises en marche. Pendant huit ans, j'ai déployé et soutenu des systèmes PDV, des serveurs, des réseaux et des systèmes de sécurité pour certaines des plus grandes chaînes de restaurants des Philippines. Aujourd'hui, je crée des applications web et des outils propulsés par l'IA avec PHP, JavaScript et MySQL.",
    'hero.cta.work': 'Voir mon travail <span aria-hidden="true">→</span>',
    'hero.cta.contact': 'Me contacter',
    'hero.scroll': 'Défiler vers À propos',
    'stat.years': '8 ans',
    'stat.years.label': 'Soutien technique',
    'stat.brands': 'Chaînes de restaurants soutenues',
    'stat.migrations': 'Migrations de plateformes PDV',

    'profile.title': 'Professionnel des TI et développeur',
    'profile.based': '<span>Lieu</span> Québec, Canada',
    'profile.degree': '<span>Diplôme</span> B. Sc. en technologies de l\'information',
    'profile.focus': '<span>Domaines</span> Systèmes · PDV · Web · IA',
    'profile.langs': '<span>Langues</span> Tagalog · Anglais · Français',

    'about.kicker': 'À propos de moi',
    'about.title': 'Des TI concrètes, de la salle des serveurs au plancher de vente.',
    'about.p1': "Je suis titulaire d'un <strong>baccalauréat en sciences des technologies de l'information</strong> du STI College Caloocan. De 2016 à 2024, j'ai été spécialiste en <strong>soutien technique</strong> chez <strong>PPI Holdings Inc.</strong>, qui exploite Pizza Hut, Taco Bell et Dairy Queen aux Philippines. Mon rôle était d'assurer le bon fonctionnement des magasins, des centres d'appels et des centres de données.",
    'about.p2': "J'ai installé et dépanné des systèmes PDV pour cinq marques et dirigé les migrations de Fenix vers Cuscapi, de Cuscapi vers Aloha, puis d'Aloha et Chase vers ANSI. J'ai aussi installé du câblage structuré, monté des serveurs Windows avec sauvegardes quotidiennes et entretenu la téléphonie Avaya et PABX, la vidéosurveillance, le système RH biométrique et les serrures électroniques. Pour les ouvertures de nouveaux magasins, je m'occupais de toute la mise en place informatique.",
    'about.p3': "Depuis mon arrivée à Québec, j'ai travaillé en restauration et en commerce de détail, notamment comme directeur général adjoint de restaurant. Cette expérience m'a montré comment les systèmes que je soutenais tiennent le coup pendant un service achalandé. En parallèle, je développe avec <strong>PHP, JavaScript, MySQL et Lua</strong>; je suis développeur FiveM depuis 2019 et j'ai ajouté des serveurs de jeu RedM en 2025. Je travaille aussi comme <strong>ingénieur IA</strong>, en reliant de grands modèles de langage à de vrais outils d'affaires : assistants conversationnels, flux de soutien automatisés et fonctionnalités basées sur des API d'IA.",
    'about.tags': '<li>Windows Server et VMware</li><li>Réseautique</li><li>Systèmes PDV</li><li>Vidéosurveillance et sécurité</li><li>PHP / MySQL</li><li>Lua</li><li>Intégration IA / LLM</li>',

    'work.kicker': 'Ce que je fais',
    'work.title': 'Expertise',
    'work.mig.aria': 'Migrations PDV dirigées',
    'work.mig.label': "Migrations PDV que j'ai réalisées",
    'work.ai.h': 'Ingénierie IA',
    'work.ai.p': "J'intègre l'IA à des systèmes existants : assistants conversationnels basés sur des LLM, flux automatisés de soutien TI et de centre d'assistance, et fonctionnalités d'IA intégrées à des applications web PHP et JavaScript. L'ingénierie de requêtes et l'intégration d'API ancrent les modèles dans de vraies données d'entreprise.",
    'work.ai.tags': "<li>API de LLM</li><li>Ingénierie de requêtes</li><li>Robots conversationnels IA</li><li>Automatisation des flux</li><li>RAG</li>",
    'work.pos.h': 'Systèmes PDV',
    'work.pos.p': 'Installation, dépannage et migrations pour Taco Bell, Pizza Hut, Dairy Queen, Snaxx et Sachi.',
    'work.srv.h': 'Serveurs et données',
    'work.srv.p': "Mise en place de Windows Server pour des centres de données et d'appels, virtualisation VMware et routines de sauvegarde quotidiennes.",
    'work.srv.tags': '<li>Windows Server</li><li>VMware</li><li>Sauvegardes</li>',
    'work.net.h': 'Réseaux et câblage',
    'work.net.p': "Câblage structuré et conception de réseaux pour des magasins et des centres d'appels, y compris les liaisons par modem entre eux.",
    'work.net.tags': '<li>Câblage structuré</li><li>LAN</li><li>Dépannage</li>',
    'work.sec.h': 'Sécurité et téléphonie',
    'work.sec.p': 'Vidéosurveillance, biométrie RH, serrures électroniques et systèmes de billetterie, ainsi que téléphones Avaya et PABX analogiques.',
    'work.sec.tags': '<li>Vidéosurveillance</li><li>Biométrie</li><li>Avaya</li><li>PABX</li>',
    'work.web.h': 'Développement web',
    'work.web.p': 'Sites rendus côté serveur et outils web construits avec PHP et MySQL/MariaDB côté serveur, et HTML, CSS et JavaScript côté client.',
    'work.game.h': 'Scripts de serveurs de jeu',
    'work.game.p': 'Développeur FiveM depuis 2019 et RedM depuis 2025 : scripts Lua et configuration de serveurs pour des communautés de jeu de rôle.',
    'work.game.tags': '<li>Lua</li><li>FiveM · depuis 2019</li><li>RedM · depuis 2025</li>',

    'redm.kicker': 'RedM · depuis 2025',
    'redm.title': 'Scripts RedM Mavarne',
    'redm.lead': "Une suite de ressources RedM que j'écris et maintiens sous le nom Mavarne, basée sur VORP Core avec Lua, oxmysql et des interfaces NUI personnalisées. Elles sont conçues pour fonctionner ensemble : Priority Status contrôle les vols, et les scripts de jeu partagent la même barre de progression et le même style de notifications.",
    'redm.featured': 'En vedette',
    'redm.more': 'Autres scripts',

    'p.cock.h': 'Arènes de combats de coqs',
    'p.cock.p': 'Élevez, entraînez et faites se reproduire des coqs, puis affrontez d\'autres joueurs en JcJ avec mises et paris des spectateurs. Le serveur décide de chaque combat, pari, gain et résultat de reproduction.',
    'p.cock.f': "<li>Les poussins éclosent au ranch et deviennent des combattants; jusqu'à 6 coqs par personnage</li><li>Des soins qui continuent hors ligne : faim, énergie, toilettage, maladie, blessures et saignements</li><li>9 statistiques plafonnées par le potentiel génétique et la rareté, avec XP et niveaux</li><li>Reproduction avec frais croissants, limite de 7 reproductions et aucun proche parent; les œufs éclosent dans votre poulailler</li><li>Combats JcJ à mises égales, paris des spectateurs, HUD de combat en direct et combats d'entraînement</li><li>Les perdants peuvent mourir ou garder des blessures qui nécessitent des médicaments</li><li>Maison d'encan de coqs, ventes entre joueurs et marchand de nourriture et de médicaments</li><li>Carnet des coqs (<code>/manok</code>) et classement</li>",
    'p.cock.tags': '<li>VORP</li><li>oxmysql</li><li>NUI</li><li>Génétique</li>',
    'p.admin.h': "Panneau d'administration",
    'p.admin.p': "Un panneau pour le personnel (<code>/admincheck</code>) permettant de consulter joueurs, chariots, sacs à dos, maisons et chevaux, avec des outils pour réparer les joueurs invisibles.",
    'p.admin.f': "<li>Recherche de joueurs : inventaire, armes, chariots, coffres et sacs à dos</li><li>Onglets pour les sacs à dos, chariots et cargaisons, les maisons gum_housing et les chevaux gum_stables</li><li>Téléportation vers les sacs à dos et les maisons, affichage des icônes de maisons, modification ou réanimation des chevaux</li><li>Mode suppression (<code>/admindelete</code>) limité à une liste d'autorisation Steam côté serveur</li><li>Correctifs de bucket et de visibilité : <code>/bucket</code>, <code>/fixbucket</code>, <code>/checkplayer</code>, <code>/fixvisible</code>, <code>/vislog</code></li><li>Journaux Discord pour les actions txAdmin, <code>/heal</code>, <code>/revive</code>, <code>/tpm</code>, l'argent et les objets générés</li><li>Noms d'événements aléatoires, vérifications de permissions côté serveur et limites de fréquence</li>",
    'p.plant.h': 'Plantation et agriculture',
    'p.plant.p': "Une boucle agricole complète : ratissez le sol, plantez, arrosez, fertilisez et récoltez n'importe où hors des limites des villes.",
    'p.plant.f': "<li>Plantation en deux étapes avec un sol travaillé sous chaque culture</li><li>Contrôle de l'eau : la croissance s'arrête jusqu'au prochain arrosage</li><li>L'engrais augmente la récolte</li><li>Seaux d'eau remplis aux pompes</li><li>Sauvegarde groupée de la croissance dans la base de données</li><li>Panneau d'administration à onglets : fermes, plants, don d'objets, statistiques</li>",
    'p.soc.h': "Système d'emplois de société",
    'p.soc.p': "Un système d'emplois natif VORP avec une interface au style RedM d'antan. Il remplace vorp_billing et vorp_paycheck et crée son propre schéma de base de données au premier démarrage.",
    'p.soc.f': "<li>Panneau d'administration (<code>/jobsadmin</code>) pour créer des sociétés, des grades et des montants de paie</li><li>Actions du patron (<code>/boss</code>) : embaucher, promouvoir, solde de la société, dépôt et retrait</li><li>Les patrons ne gèrent que les grades inférieurs au leur</li><li>Paies par grade versées par le serveur ou la trésorerie de la société</li><li>Horodateur (<code>/duty</code>) avec minuterie de quart en direct et historique des quarts</li><li>Entrepôts publics et personnels de la société, ouverts avec la touche G</li><li>Facturation (<code>/bill</code>) dont les revenus vont à la trésorerie</li>",
    'p.rob.h': 'Système de vols',
    'p.rob.p': 'Des vols chronométrés configurables avec points de déclenchement et zones. Chaque lieu peut remplacer les paramètres par défaut.',
    'p.rob.f': "<li>Objet requis vérifié par le serveur</li><li>Nombre minimum de policiers et de médecins en ligne par lieu</li><li>Alertes policières, délais de recharge et récompenses</li><li>Annulation en tout temps avec Retour arrière</li><li>Démarre seulement si Priority Status est SAFE</li>",
    'p.prio.h': 'Statut de priorité',
    'p.prio.p': "Un statut de priorité à l'échelle du serveur, contrôlé par les forces de l'ordre, pour que le crime en jeu de rôle soit rythmé équitablement.",
    'p.prio.f': "<li>Commandes <code>/safe</code>, <code>/inprogress</code> et <code>/hold</code></li><li>Réservé aux emplois de la loi ou à une permission ACE; RCON et txAdmin peuvent forcer un statut</li><li>Badge HUD en direct placé à côté de l'affichage de l'argent</li><li>Bannière d'annonce sur tout le serveur lorsque le statut change</li><li>Fournit un export qui contrôle mavarne_robbery</li>",
    'p.prio.tags': '<li>VORP</li><li>Permissions ACE</li>',
    'p.side.h': "Petits boulots",
    'p.side.p': 'Quatre emplois autonomes dans une seule ressource, chacun dans son propre sous-dossier.',
    'p.side.f': "<li>Travail de construction et de bûcheron</li><li>Emploi de nettoyage : endroits aléatoires dans un rayon, balai en main, barre de progression, réputation et récompenses en argent</li><li>Cargaison illégale : chargez des caisses sur un chariot et livrez-les à un point de dépôt aléatoire</li><li>Récompenses validées par le serveur</li>",
    'p.name.h': 'Changement de nom du personnage',
    'p.name.p': "Les joueurs renomment leur personnage avec une carte, la commande <code>/changename</code> ou un commis PNJ. Aucune reconnexion n'est nécessaire.",
    'p.name.f': "<li>Formulaire NUI pour le prénom, le nom et le surnom</li><li>Validation du nom, paiement et délai de recharge</li><li>Limité au personnage actif, pas à tous les personnages du compte</li><li>Noms d'événements réseau aléatoires à chaque démarrage</li><li>Journal Discord optionnel par webhook</li>",
    'p.prop.h': "Outil d'attache d'accessoires",
    'p.prop.p': 'Un outil de développement pour attacher des accessoires aux os du personnage et copier le code final.',
    'p.prop.f': "<li>Faites apparaître n'importe quel accessoire et attachez-le à n'importe quel os</li><li>Curseurs de position et de rotation avec aperçu en direct</li><li>Caméra orbitale et ajustement fin au clavier</li><li>Testez l'accessoire avec n'importe quelle animation</li><li>Génère du code <code>AttachEntityToEntity</code> prêt à copier-coller</li><li><code>/manim</code> : un navigateur de recherche de toutes les animations RDR3 avec aperçu 3D</li>",
    'p.prop.tags': '<li>Autonome</li><li>Outil de dev</li><li>NUI</li>',

    'exp.kicker': 'Parcours',
    'exp.title': 'Expérience',
    'exp.1.t': "Mars 2026 — Aujourd'hui",
    'exp.1.h': "Équipier <span>· Maféli Inc. (McDonald's), Québec</span>",
    'exp.1.p': "Je prends les commandes et les paiements au PDV, je prépare les aliments et je sers au service à l'auto dans un restaurant à fort achalandage, en respectant les normes de salubrité alimentaire.",
    'exp.2.t': 'Sept. 2025 — Févr. 2026',
    'exp.2.h': 'Directeur général adjoint de restaurant <span>· NBG Group (Pizza Hut), Québec</span>',
    'exp.2.p': "J'ai dirigé les opérations quotidiennes, formé et supervisé le personnel, et géré les horaires, les coûts de main-d'œuvre, l'inventaire et les rapports afin d'atteindre les objectifs de ventes et de rentabilité.",
    'exp.3.t': 'Févr. 2025 — Août 2025',
    'exp.3.h': 'Associé de nuit <span>· Walmart, Québec</span>',
    'exp.3.p': "Je préparais le plancher de vente pour l'ouverture : déchargement, marchandisage, étiquetage, organisation des bacs de l'arrière-boutique et rondes de sécurité.",
    'exp.4.t': 'Oct. 2024 — Mars 2025',
    'exp.4.h': 'Cuisine <span>· Hemkund Development (Pizza Hut), Québec</span>',
    'exp.4.p': "Je préparais les aliments selon les normes de la marque, j'utilisais l'équipement de cuisine, je surveillais l'inventaire et je maintenais la cuisine conforme aux règles d'hygiène.",
    'exp.5.t': 'Sept. 2016 — Août 2024',
    'exp.5.h': 'Soutien technique <span>· PPI Holdings Inc. (Pizza Hut, Taco Bell, Dairy Queen), Quezon City</span>',
    'exp.5.list': "<li>Installation et dépannage de systèmes PDV pour Taco Bell, Pizza Hut, Dairy Queen, Snaxx et Sachi.</li><li>Migration des magasins de Fenix vers Cuscapi, de Cuscapi vers Aloha, puis d'Aloha et Chase vers ANSI POS.</li><li>Conception et installation du câblage structuré et des réseaux pour les magasins et les centres d'appels, et configuration des modems qui les relient.</li><li>Mise en place de serveurs Windows pour les centres de données et d'appels, avec sauvegardes quotidiennes. Entretien des serveurs et des PDV pour réduire les temps d'arrêt.</li><li>Installation et entretien de la téléphonie Avaya et PABX analogique, de la vidéosurveillance, de la biométrie RH, de la billetterie et des serrures électroniques.</li><li>Soutien des postes de travail et des actifs informatiques, et mise en place informatique complète pour les ouvertures de nouveaux magasins.</li>",

    'cred.kicker': 'Études et formation',
    'cred.title': 'Formation',
    'cred.bs': "B. Sc. en technologies de l'information",
    'cred.mcsa': 'Rivan School of Technology · Certificat de formation',
    'cred.smaw': 'TESDA · et prix « Best in Set-Up Weld Equipment »',
    'cred.recog.t': 'Reconnaissance',
    'cred.recog.h': 'Certificat de reconnaissance',
    'cred.cc.t': 'En cours',
    'cred.cc.link': "Voir mon profil d'apprentissage ↗",

    'lang.label': 'Langues',
    'lang.tl.t': 'Langue maternelle',
    'lang.tl.h': 'Tagalog',
    'lang.tl.aria': 'Langue maternelle, 5 sur 5',
    'lang.tl.p': 'Première langue',
    'lang.en.t': 'Courant',
    'lang.en.h': 'Anglais',
    'lang.en.aria': 'Courant, 4 sur 5',
    'lang.en.p': 'Travail, soutien et documentation',
    'lang.fr.t': 'Niveau 3 · Débutant',
    'lang.fr.h': 'Français',
    'lang.fr.aria': 'Débutant, 2 sur 5',
    'lang.fr.p': "Je peux tenir une conversation simple et je continue d'apprendre",

    'contact.title': 'Gardons vos systèmes en marche.',
    'contact.lead': 'Je suis ouvert à des postes en soutien TI, en systèmes et en développement web à Québec ou à distance.',
    'footer.city': 'Québec',
  };

  const KEY = 'lang';
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch { /* storage blocked */ } },
  };

  // Snapshot the English markup once so switching back is lossless
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  const EN_TEXT = new Map(textEls.map((el) => [el, el.innerHTML]));
  const EN_ATTR = new Map(attrEls.map((el) => [el, Object.fromEntries(
    el.dataset.i18nAttr.split(',').map((pair) => {
      const [attr] = pair.split(':').map((s) => s.trim());
      return [attr, el.getAttribute(attr)];
    })
  )]));

  const apply = (lang) => {
    const fr = lang === 'fr';
    document.documentElement.lang = lang;

    textEls.forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = fr && FR[k] != null ? FR[k] : EN_TEXT.get(el);
    });
    attrEls.forEach((el) => {
      el.dataset.i18nAttr.split(',').forEach((pair) => {
        const [attr, k] = pair.split(':').map((s) => s.trim());
        el.setAttribute(attr, fr && FR[k] != null ? FR[k] : EN_ATTR.get(el)[attr]);
      });
    });

    document.querySelectorAll('.lang__btn').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  };

  // Priority: ?lang= in the URL, then saved choice, then browser language
  const param = new URLSearchParams(location.search).get('lang');
  const initial = ['en', 'fr'].includes(param) ? param
    : store.get() || ((navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en');
  if (initial !== 'en') apply(initial);

  document.querySelectorAll('.lang__btn').forEach((b) => {
    b.addEventListener('click', () => {
      const lang = b.dataset.lang;
      if (document.documentElement.lang === lang) return;
      apply(lang);
      store.set(lang);
    });
  });
})();
