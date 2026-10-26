import { TestimonialPiece, BasementEvidence, VictimFace, TeamMember, LibraryBook } from '../types';

/**
 * DATOS HISTÓRICOS Y DOCUMENTALES DE VESTIGIOS
 * Fuente directa y exclusiva: Biblia Transmedia VESTIGIOS (Grupo 04 - FADyCC UNNE)
 * "COPIAAA de SEM3_PRE_BibliaTransmedia_Grupo04_VESTIGIOS.pdf"
 * 
 * Basado en:
 * - Expedientes N° 42/85 y 44/85 de la Causa Caballero (Juicio por Delitos de Lesa Humanidad)
 * - Libro "El Golpe" (planos oficiales páginas 11 a 13, peritaje del EAAF de febrero de 2008 y mapas de operativos chaqueños)
 * - Registro Único de la Verdad (RUV Chaco)
 * - Comisión Provincial por la Memoria del Chaco (Casa por la Memoria, Marcelo T. de Alvear 32, Resistencia)
 * - Registro de Abuelas de Plaza de Mayo (Caso Guillermo Amarilla Molfino - Nieto N° 98)
 */

export const TESTIMONIAL_PIECES: TestimonialPiece[] = [
  {
    id: 'ayala-morel',
    title: 'Gerardo Delgado y Viviana Morel',
    subtitle: 'La solidaridad en cautiverio y el rescate de Viviana',
    person: 'Gerardo Delgado y Viviana Morel',
    secondaryPerson: 'Sara Ayala y Pedro Morel',
    category: 'testimonio',
    year: '1977 - Presente',
    expediente: 'Juicios de Lesa Humanidad en el Chaco · Causa Caballero (Expedientes N° 42/85 y 44/85)',
    description: 'Gerardo Delgado militaba en el PB. Fue detenido en 1977 en Resistencia, Chaco, a los 21 años. Viviana Morel es hija de Sara Ayala y Pedro Morel, secuestrados el 13 de mayo de 1977 en Claypole tras ponerla a resguardo con una vecina. En la Brigada, Pedro le pidió a Gerardo memorizar el teléfono de su suegra, el cual Gerardo envió en un termo de té con leche gracias a un oficial conocido, permitiendo a la abuela rescatar a Viviana.',
    fullStory: `Gerardo Delgado. Militaba en el PB. Fue detenido en 1977 en Resistencia, Chaco. Tenía 21 años. Lo tuvieron privado de su libertad, primero en la Brigada de Investigaciones y luego en la Alcaidía de Resistencia.

Viviana Morel. Es hija de Sara Ayala y Pedro Morel. Los secuestran el 13 de mayo de 1977, en Claypole, Provincia de Bs. As. Antes de ser secuestrados, Sara y Pedro alcanzan a poner a Viviana a resguardo en la casa de una vecina. Viviana tenía 1 año, Sara 22 y Pedro 32 años de edad.

Sara y Pedro, una vez detenidos, son llevados a Goya, a Corrientes, a Misiones, a Formosa y finalmente a la Brigada de Investigaciones de Resistencia, donde se los ve por última vez. Hasta hoy siguen desaparecidos.

Gerardo, Sara y Pedro estuvieron detenidos juntos en la Brigada de Investigaciones. Pedro le pidió a Gerardo que memorice el número de teléfono de su suegra para que, cuando pueda, le avise que a Viviana la habían dejado en la casa de la vecina.

En la brigada, uno de los Oficiales conocía a Gerardo. Este Oficial, cuando estaba de guardia, permitía que Gerardo se bañe y coma. Y también le entregaba un termo con té con leche que la mamá de Gerardo le mandaba a diario.

Con esta información, la abuela de Viviana comienza la búsqueda de su nieta y finalmente logra recuperarla. Viviana estaba en un hogar de niños bajo la custodia de una jueza de Buenos Aires.

Ya en democracia, Viviana y Gerardo se encuentran en los Juicios de Lesa Humanidad que se realizaron en Chaco.`,
    quote: '«En ese termo Gerardo escondió el número de teléfono y le pidió al Oficial que llame a la abuela de Viviana y le avise dónde estaba su nieta. El oficial lo hace.»',
    source: 'Testimonios judiciales de Gerardo Delgado y Viviana Morel · Juicios de Lesa Humanidad en el Chaco (Causa Caballero) · Registro Único de la Verdad (RUV Chaco)',
    caption: 'Epígrafe: Fotografía de archivo de Viviana Morel y Gerardo Delgado (Colección RUV / Casa por la Memoria).',
    visualType: 'photo',
    image: '/assets/aistudio/MOREL_098e2180.png',
    initialX: 20,
    initialY: 42,
  },
  {
    id: 'amarilla-molfino',
    title: 'Guillermo Martín Amarilla Molfino',
    subtitle: 'Nació en cautiverio en 1980 · Nieto restituido N° 98 por Abuelas de Plaza de Mayo',
    person: 'Guillermo Martín Amarilla Molfino',
    category: 'testimonio',
    year: 'Nació en 1980 / Restitución en 2009',
    expediente: 'Libro "IDENTIDAD" (Colección RUV N° 03) · CONADI / Abuelas de Plaza de Mayo',
    description: 'Hijo de los militantes chaqueños Marcela Molfino y Guillermo Amarilla, secuestrados en 1979 y aún desaparecidos. Nació en cautiverio en Campo de Mayo en 1980 y fue apropiado por un personal civil de Inteligencia del Ejército del Batallón 601. En 2009, tras la declaración de una sobreviviente y el cotejo del Banco Nacional de Datos Genéticos junto a Abuelas y CONADI, conoció su verdadera identidad y a sus tres hermanos.',
    fullStory: `Guillermo Martín Amarilla Molfino nació el 6 o 7 de julio de 1980 en cautiverio en el Centro Clandestino de Detención de Campo de Mayo, y recuperó su identidad el 30 de octubre de 2009 como el Nieto N° 98 restituido por Abuelas de Plaza de Mayo.

Sus padres eran los militantes chaqueños Marcela Ester Molfino ("La flaca" o "Tata") y Guillermo Amarilla ("Negro", "Tato", "Marcos" o "Andrés"). Marcela estudió Filosofía y Letras en la UNNE y militó en el Peronismo de Base en Villa Saavedra y Barrio Mariano Moreno de Resistencia. Guillermo nació en Resistencia, estudió Contador Público en la UNNE, militó en el Integralismo y fue delegado de la Regional IV de la Juventud Peronista, participando en 1972 en la comitiva para el retorno de Perón. Tras el golpe de Estado de 1976 y el exilio en Francia, México y España con sus tres primeros hijos (Mauricio, Joaquín e Ignacio), regresaron en mayo de 1979 al país.

El 17 de octubre de 1979, Guillermo padre fue secuestrado en la vía pública en Ramos Mejía, y el mismo día Marcela fue secuestrada en su domicilio de San Antonio de Padua junto a sus tres hijos y su cuñado Rubén. Marcela estaba embarazada de un mes. Los niños fueron devueltos a la abuela paterna en Resistencia. La pareja permaneció con vida en Campo de Mayo hasta fines de 1980 y hasta hoy continúan desaparecidos. Al momento del secuestro, la familia desconocía el embarazo, por lo que no integraba los registros iniciales del Banco Nacional de Datos Genéticos.

Guillermo Martín fue apropiado por un personal civil de Inteligencia del Ejército del Batallón 601, quien lo inscribió con una partida falsa firmada por el médico Caserotto en el Hospital Militar de Campo de Mayo, criándose en Ramos Mejía.

En diciembre de 2007, con dudas sobre su origen biológico, Guillermo se acercó por su cuenta a la CONADI. Inicialmente el cotejo dio negativo porque el embarazo de su madre no estaba denunciado, pero el 21 de agosto de 2009 una sobreviviente de Campo de Mayo declaró ante la Secretaría de Derechos Humanos que Marcela Molfino había dado a luz un varón en ese centro clandestino. Se convocó a las familias Amarilla y Molfino, se entrecruzaron las muestras genéticas en el BNDG y el 30 de octubre de 2009 se confirmó con un 99,99% de compatibilidad que era hijo de Marcela y Guillermo.

Al acudir a la sede de Abuelas de Plaza de Mayo, fue recibido por Estela de Carlotto con un abrazo inolvidable y se reencontró con sus tres hermanos que habían viajado desde el Chaco. Como relató en su entrevista testimonial publicada en el libro IDENTIDAD:

«Ya no me entra ni una pizquita de duda que no hay mejor camino que el de la verdad. Toda esa desorientación y toda esa falta de situarse en el espacio, en el tiempo, en tantos ámbitos no tiene por qué ser así... Fuimos robados y entregados como objetos. La diferencia que hay entre una vida de mentira y una vida de verdad es básicamente saber que ya no somos objetos de la mentira creada por un plan sistemático. Y finalmente uno puede encontrarse con su lugar, con su espacio, con sus cosas, con sus recuerdos verdaderos a través de los relatos. Siempre lo que uno va a recibir va a ser amor».`,
    quote: '«Ya no me entra ni una pizquita de duda que no hay mejor camino que el de la verdad... La diferencia que hay entre una vida de mentira y una vida de verdad es básicamente saber que ya no somos objetos de la mentira creada por un plan sistemático.» — Guillermo Martín Amarilla Molfino (Libro IDENTIDAD, pág. 83)',
    source: 'Libro "IDENTIDAD" (Colección RUV N° 03, págs. 76 a 84) · Autores: Magalí Valetto Claps y Sonia Wyss (Investigación); Juan Carlos Fernández (Coordinación) · Registro Único de la Verdad / Comisión Provincial por la Memoria del Chaco',
    caption: 'Epígrafe: Guillermo Martín Amarilla Molfino, Nieto restituido N° 98 por Abuelas de Plaza de Mayo (Libro IDENTIDAD, Colección RUV Chaco).',
    visualType: 'photo',
    image: '/assets/aistudio/AMARILLA_e11dc7ad.png',
    initialX: 38,
    initialY: 55,
  },
  {
    id: 'saqueo-material',
    title: 'El Mito de la "Guerra" vs. La Realidad del "Saqueo"',
    subtitle: 'El robo de pertenencias personales como botín de guerra',
    person: 'Maria Teresa Pressa',
    personLabel: 'Persona/Testimonio',
    category: 'saqueo',
    year: '1976 (Secuestro y despojo de bienes)',
    yearLabel: 'Hechos',
    expediente: 'Causa Caballero / Brigada I y III (Juicios orales 2010 / 2021)',
    expedienteLabel: 'Causa judicial',
    description: 'Desmonta el mito de la «gesta patriótica». Las declaraciones de María Teresa Pressa (cuadros robados) y Silvia Robles (muebles de Parodi Ocampo) probaron el saqueo sistemático de los grupos de tareas.',
    fullStory: `Frente al relato negacionista que busca presentar los crímenes de Estado como una «guerra entre dos bandos», las pruebas judiciales de los juicios del Chaco demuestran un sistemático y mezquino saqueo material perpetrado por los grupos de tareas como «botín de guerra»:

1. El Testimonio Judicial de María Teresa Pressa:
Durante las inspecciones oculares de la Causa Caballero en la ex Brigada de Investigaciones, la sobreviviente María Teresa Pressa descubrió que los cuadros artísticos robados de su casa particular durante su secuestro estaban colgados en las paredes decorando los despachos de los comisarios y jefes de la Brigada.

2. La Declaración de Silvia Robles:
Silvia Robles identificó en el edificio de la Brigada los muebles y escritorios pertenecientes al militante asesinado Manuel Parodi Ocampo, los cuales eran utilizados a la vista de todos como mobiliario oficial por los propios policías de la patota.

Como acreditó la sentencia judicial: no fue una guerra. Fue un plan sistemático de secuestro, desaparición y despojo de bienes materiales.`,
    quote: '«No fue una guerra. Fue un plan sistemático de despojo.»',
    source: 'Libro Juicio y Castigo en el Chaco (Vol. II), CPM Chaco (Gonzalo Torres, comp).',
    sourceLabel: 'Fuente consultada',
    caption: 'Epígrafe: María Teresa Pressa declarando en el juicio oral sobre los cuadros robados de su casa que decoraban la ex Brigada (Colección RUV Chaco).',
    visualType: 'photo',
    image: '/assets/aistudio/teresa_presa_HD_a6a115b1.png',
    secondaryImage: '/assets/aistudio/silvia_robles_HD_5bf4740c.png',
    secondaryPerson: 'Silvia Robles',
    secondaryCaption: 'Epígrafe: Silvia Robles prestando testimonio judicial sobre los muebles de Manuel Parodi Ocampo utilizados por los torturadores.',
    initialX: 72,
    initialY: 58,
  },
  {
    id: 'represor-delatado',
    title: 'El Represor que se Delató Solo',
    subtitle: 'Legajos oficiales de la época y admisiones judiciales',
    person: 'José Francisco Rodríguez Valiente',
    personLabel: 'Personas / Imputados',
    category: 'evidencia_judicial',
    year: 'Juicios 2010 - 2018',
    showYearInModal: false,
    expediente: 'Juicios por Crímenes de Lesa Humanidad en la ex Brigada de Investigaciones (Causa Caballero I, 2010 y Caballero II, 2016-2018)',
    expedienteLabel: 'Procesos judiciales',
    description: 'La farsa de que los juicios son «venganzas sin pruebas» se estrella contra sus propios legajos: Rodríguez Valiente premiado por su "brillante desempeño en la lucha contrasubversiva" y Ramón Meza usando "manuales para combatir la plaga".',
    fullStory: `Frente a las coartadas negacionistas que acusan a los juicios de ser «venganzas sin pruebas», la contundencia de las condenas en el Chaco quedó demostrada a partir de la propia burocracia y los documentos oficiales firmados por los represores:

1. El Legajo de José Francisco Rodríguez Valiente:
En el juicio, el acusado pretendió engañar a los jueces asegurando que durante esos años sólo cumplía tareas administrativas y que nunca bajó a los sótanos. Sin embargo, su propio legajo policial de la época lo destruyó: constaba allí su felicitación por escrito por su «brillante desempeño como sumariante subversivo» y su actuación en la lucha contrasubversiva en la ex Brigada.

2. La Admisión Judicial del Excomisario Ramón Meza:
En el año 2017, durante las audiencias judiciales, el excomisario Ramón Meza admitió haber utilizado «manuales para combatir la plaga» en la dependencia policial, dejando al descubierto la doctrina deshumanizante con la que operaba el terrorismo de Estado.

Los juicios en el Chaco no requirieron testimonios inventados: la soberbia de los propios represores y sus registros oficiales archivados sirvieron como prueba de cargo condenatoria.`,
    quote: '«Sus propios papeles oficiales los condenaron: legajos premiados por la lucha contrasubversiva y manuales para combatir la plaga.»',
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco.',
    sourceLabel: 'Fuente consultada',
    caption: 'Epígrafe: José Francisco Rodríguez Valiente, imputado y condenado en la Causa Caballero (Colección RUV Chaco).',
    visualType: 'photo',
    image: '/assets/aistudio/Jose_rodriguez_Valiente_HD_4f998583.png',
    secondaryImage: '/assets/aistudio/Ramon_Meza_HD_7e8aa7e0.png',
    secondaryPerson: 'Ramón Meza',
    secondaryCaption: 'Epígrafe: Excomisario Ramón Meza, quien admitió en 2017 haber utilizado «manuales para combatir la plaga» (Causa Caballero).',
    initialX: 65,
    initialY: 72,
  },
];

export const BASEMENT_EVIDENCE: BasementEvidence[] = [
  {
    id: 'frase-sangre',
    title: 'Frase en el revoque: "La sangre derramada no será negociada"',
    type: 'frase_concreto',
    image: 'https://i.ibb.co/FbjzHWJ8/Inscripci-n-en-la-pared-LA-SANGRE-DERRAMADA-NO-SER-NEGOCIADA-COMISI-N-PROVINCIAL-POR-LA-MEMORI.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'Pared_Norte, Sótano SB2',
    description: 'Inscripción real grabada en el revoque del sótano por las personas detenidas-desaparecidas y relevada por el Equipo Argentino de Antropología Forense (EAAF) en febrero de 2008. Grabada a mano con un clavo o punzón en el muro del sótano por una persona detenida-desaparecida. Un testimonio de dignidad, resistencia y memoria que permaneció 30 años sepultado bajo los escombros hasta su rescate por el EAAF. ',
    quote: '«LA SANGRE DERRAMADA NO SERÁ NEGOCIADA»',
    investigationNote: `Texto descriptivo basado en los planos oficiales (páginas 11 a 13 del libro El Golpe) y el relevamiento del Equipo Argentino de Antropología Forense (EAAF) de febrero de 2008.

¿Quién escribió esta frase y qué significa?
Fue grabada a mano con un clavo o punzón en el revoque del sótano por una persona detenida ilegalmente. Los prisioneros sabían que podían ser asesinados o desaparecidos en cualquier momento. Dejar esta frase en la pared era un acto supremo de dignidad y resistencia: significaba que la verdad y la sangre de los compañeros caídos jamás iban a ser canjeadas por el olvido o la impunidad.

¿Por qué estaba oculta?
En 1978, antes de que llegaran comisiones internacionales de derechos humanos, la policía ordenó tapiar el Sótano Mayor (SB1) y el Sótano Menor (SB2), arrojando toneladas de tierra y escombros y construyendo baños y pisos falsos encima para ocultar los calabozos. En febrero de 2008, el Equipo Argentino de Antropología Forense (EAAF) excavó el lugar, retiró los escombros y sacó a la luz estas palabras intactas en el concreto.`,
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco',
    caption: 'Epígrafe: Relevamiento fotográfico forense del EAAF (2008) sobre el muro norte del sótano SB2 (sótano chico) de la ex Brigada de Investigaciones.',
    x: 28,
    y: 36,
  },
  {
    id: 'frase-firmeza',
    title: 'Frase en el Concreto: "Firmeza y luz como cristal de roca"',
    type: 'frase_concreto',
    image: 'https://i.ibb.co/b5ss7nHh/Inscripci-n-en-la-pared-FIRMEZA-Y-LUZ-COMO-CRISTAL-DE-ROCA-COMISI-N-PROVINCIAL-POR-LA-MEMORIA.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'Pared_Sur',
    description: 'Inscripción minuciosa en la parte baja del muro del Sótano Menor (SB2), donde reinaba la oscuridad total.',
    quote: '«FIRMEZA Y LUZ COMO CRISTAL DE ROCA»',
    investigationNote: `¿Qué nos transmite esta frase?
Escrita en la celda más fría y húmeda del sótano, esta frase sintetiza la fuerza espiritual y entereza de los detenidos frente a la tortura. "Cristal de roca" hace referencia a un mineral transparente y extremadamente duro: frente a la oscuridad y el aislamiento forzado, pedían mantenerse firmes moralmente y conservar la luz de sus ideales.

Esta inscripción permaneció sepultada bajo los escombros y el contrapiso falso arrojados por los policías durante 30 años, hasta que los antropólogos forenses del EAAF picaron el revoque falso en febrero de 2008 y la rescataron para siempre.`,
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco',
    caption: 'Epígrafe: Registro de conservación de la frase "Firmeza y luz" en el Sótano Menor SB2 (Archivo CPM Chaco).',
    x: 74,
    y: 44,
  },
  {
    id: 'picana-electrica',
    title: 'Picana Eléctrica a Batería y Evidencia Material',
    type: 'objeto_eaaf',
    image: 'https://i.ibb.co/tpt6c5XR/vector-picana-electrica.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'SB2_Menor',
    description: 'Dispositivo de tormento provisto de varilla metálica, mango cilíndrico aislante y cables con pinzas hallado sepultado bajo los escombros',
    quote: '«Dispositivo portátil de electrochoque a batería hallado entre los escombros por el EAAF.»',
    investigationNote: `Evidencia material hallada en febrero de 2008 por el Equipo Argentino de Antropología Forense (EAAF) en el Sótano Menor de la ex Brigada de Investigaciones (Marcelo T. de Alvear 32):

1. Funcionamiento Clandestino a Batería: El hallazgo pericial confirmó la utilización de un circuito alimentado con baterías conectadas en serie, lo que evitaba generar caídas bruscas de tensión en la red eléctrica de la manzana durante las aplicaciones de tormento y mantenía la clandestinidad del recinto.

2. Valor Probatorio en los Juicios por Crímenes de Lesa Humanidad: Las pinzas, cables y componentes recuperados en la excavación coincidieron con los testimonios judiciales de personas sobrevivientes, quienes describieron haber sido sometidas a descargas eléctricas en los sótanos del centro clandestino de detención`,
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco',
    caption: 'Epígrafe: Una de las picanas eléctricas recuperadas por el EAFF durante la inspección que reveló uno de los sótanos oculto debajo de escombros/ gentileza.',
    x: 48,
    y: 62,
  },
  {
    id: 'caja-electrica',
    title: 'Caja Eléctrica y Tendido Clandestino',
    type: 'objeto_eaaf',
    image: 'https://i.ibb.co/JFQM18Dw/vector-caja-electrica.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'SB2_Menor',
    description: 'Caja de derivación metálica con óxido profundo y cañería embutida oculta para energizar clandestinamente los sótanos del centro clandestino de detención.',
    investigationNote: `Informe Pericial y Contexto Histórico: 
Durante las inspecciones oculares y el desescombrado del Sótano Menor (SB2), los peritos judiciales y arqueólogos forenses documentaron una instalación eléctrica oculta totalmente independiente de los tableros generales del edificio policial:

1. Circuito Oculto sin Registro Oficial: La cañería galvanizada y la caja de registro con borneras y cableado aislado no figuraban en los planos civiles aprobados de la Dirección de Arquitectura. Fueron empotradas en los muros con el objetivo premeditado de llevar energía a los calabozos subterráneos sin dejar rastros en los planos públicos del inmueble.

2. Suministro Eléctrico Independiente para el Grupo de Tareas: Este tendido clandestino garantizaba suministro continuo para la iluminación de las salas de detención y para los equipos auxiliares de electrochoque utilizados en los interrogatorios bajo tortura, evitando generar caídas de tensión en las dependencias administrativas de la planta baja. La severa corrosión y los extremos seccionados de los conductores evidencian el intento de inutilizar el sistema antes de tapar el sitio con escombros en 1978.`,
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco',
    caption: 'Epígrafe: Relevamiento pericial de la caja de derivación y tendido eléctrico clandestino recuperado en el Sótano SB1 (Colección RUV / CPM Chaco).',
    x: 38,
    y: 58,
  },
  {
    id: 'fusible-ceramico',
    title: 'Fusible Cerámico',
    type: 'objeto_eaaf',
    image: 'https://i.ibb.co/67vwLggc/vector-fusible.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'SB2_Menor',
    description: 'Aislador de porcelana técnica y casquillo metálico extraído del contrapiso sepultado del subsuelo.',
    investigationNote: `Informe Pericial y Contexto Histórico: 
En el relevamiento arqueológico-forense del Sótano Menor (SB2), el Equipo Argentino de Antropología Forense (EAAF) recolectó evidencias materiales clave que desmienten los intentos de ocultamiento y confirman el funcionamiento del centro clandestino de detención:

1. Componentes de Instalación Eléctrica Oculta: Los conectores y aisladores de porcelana recuperados formaban parte del tendido eléctrico no registrado que alimentaba el subsuelo, garantizando el suministro necesario para la iluminación de los calabozos y la aplicación de descargas eléctricas durante las sesiones de tormento.

2. Evidencia Material de la Clandestinidad: El hallazgo de estos materiales de aislamiento eléctrico, junto con la picana a pila y las inscripciones grabadas en los muros, confirmó que el subsuelo fue acondicionado deliberadamente para el aislamiento y la tortura de las personas detenidas-desaparecidas, antes de ser rellenado con escombros en 1978 para intentar borrar toda prueba.`,
    source: 'Juicio y Castigo en el Chaco (Vol. II), Gonzalo Torres / CPM Chaco',
    caption: 'Epígrafe: Fusible cerámico de porcelana peritado por el EAAF tras la demolición del contrapiso falso en 2008 (Archivo CPM Chaco / Causa Caballero).',
    x: 58,
    y: 65,
  },
  {
    id: 'sb1',
    title: 'Sótano Mayor (SB1) — Relevamiento Forense',
    type: 'objeto_eaaf',
    image: 'https://i.ibb.co/GfYwsY6v/SOTANO-MAYOR-SB1-IMAGEN-DE-LA-COMISI-N-PROVINCIAL-POR-LA-MEMORIA.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'SB1_Mayor',
    description: 'Sector del Sótano Mayor desenterrado por el EAAF donde funcionaron las celdas y tabiques de aislamiento.',
    investigationNote: `Fotografía pericial forense del Sótano Mayor (SB1) de la ex Brigada de Investigaciones (Marcelo T. de Alvear 32). El peritaje del Equipo Argentino de Antropología Forense (EAAF) en 2008 rompió los contrapisos falsos y recuperó los vestigios del centro clandestino de detención.`,
    source: 'Registro Fotográfico CPM Chaco · Peritaje Forense EAAF 2008',
    caption: 'Epígrafe: Sector SB1 (Sótano Mayor) desenterrado por el EAAF (Archivo CPM Chaco).',
    x: 30,
    y: 35,
  },
  {
    id: 'sb2',
    title: 'Sótano Menor (SB2) — Celda de Aislamiento',
    type: 'objeto_eaaf',
    image: 'https://i.ibb.co/k6SCJVww/sotano-menos-sb2-imagen-de-la-comision-provincial-por-la-memoria.png',
    discoveryYear: 'Febrero 2008 (Excavación del EAAF)',
    locationInBasement: 'SB2_Menor',
    description: 'Celda subterránea de aislamiento total donde se hallaron las inscripciones talladas sobre el revoque original.',
    investigationNote: `Fotografía pericial forense del Sótano Menor (SB2). En esta pequeña celda subterránea sin luz natural ni ventilación permanecieron cautivas víctimas de la Causa Caballero, dejando marcas y palabras grabadas en los muros antes de su traslado.`,
    source: 'Registro Fotográfico CPM Chaco · Peritaje Forense EAAF 2008',
    caption: 'Epígrafe: Sector SB2 (Sótano Menor) relevado por el EAAF (Archivo CPM Chaco).',
    x: 65,
    y: 50,
  },
];

// VÍCTIMAS Y DESAPARECIDOS REGISTRADOS EN LA CASA POR LA MEMORIA / CAUSA CABALLERO Y MARGARITA BELÉN (1975-1978)
// Datos oficiales del Registro Único de la Verdad (RUV Chaco) y Comisión Provincial por la Memoria
export const VICTIM_FACES: VictimFace[] = [
  {
    id: '1',
    name: 'Carlos Enrique Tereszecuk',
    age: 24,
    profession: 'Estudiante y militante social',
    status: 'Asesinado en la Masacre de Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén · Juicio Causa Caballero',
    caption: 'Fue asesinado en la Masacre de Margarita Belén a los 24 años. Pasó por la Brigada de Investigaciones.',
    image: '/assets/aistudio/Carlos_Enrique_Tereszecuk_ede15b2f.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=CarlosEnriqueTereszecuk',
  },
  {
    id: '2',
    name: 'Luis Ángel Barco',
    age: 25,
    profession: 'Trabajador y militante juvenil',
    status: 'Asesinado en Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén · Registro DDHH Nación',
    caption: 'Fue asesinado en Margarita Belén cuando tenía 25 años tras permanecer secuestrado en la Brigada.',
    image: '/assets/aistudio/BARCO__Luis_Angel_6bb18259.png',
    link: 'https://www.argentina.gob.ar/obras-publicas/comision-ddhh/barco-luis-angel',
  },
  {
    id: '3',
    name: 'Delicia González',
    age: 37,
    profession: 'Estudiante universitaria',
    status: 'Asesinada en la Masacre de Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén · Juicio Causa Caballero: Vol. 2',
    caption: 'Fue asesinada en la Masacre de Margarita Belén a los 37 años. Permaneció en los calabozos de la ex Brigada.',
    image: '/assets/aistudio/Delicia_Gonz_lez_bf00dcf4.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=DeliciaGonzalez',
  },
  {
    id: '4',
    name: 'Mario Cuevas',
    age: 28,
    profession: 'Docente y gremialista ("Indio")',
    status: 'Asesinado en la Masacre de Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén · Sembrando Memoria ATE',
    caption: 'Fue asesinado en la Masacre de Margarita Belén a los 28 años.',
    image: '/assets/aistudio/Mario_Cuevas_e930df49.png',
    link: 'https://documentos.atesantafe.com.ar/sembrando-memoria/historias/centro-y-norte-provincial/mario-cuevas-indio',
  },
  {
    id: '5',
    name: 'Ricardo Alfredo Amarilla',
    age: 26,
    profession: 'Militante barrial',
    status: 'Detenido - Desaparecido',
    date: 'Agosto de 1976',
    caseRef: 'Causa Caballero · Archivo Roberto Baschetti',
    caption: 'Detenido - Desaparecido. Visto con vida por testigos en el centro clandestino de la Brigada.',
    image: '/assets/aistudio/Amarilla__Ricardo_Alfredo_f68ba01c.png',
    link: 'https://robertobaschetti.com/amarilla-ricardo-alfredo/',
  },
  {
    id: '6',
    name: 'Dora Noriega',
    age: 24,
    profession: 'Militante social y estudiante',
    status: 'Probablemente asesinada en Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Probablemente asesinada en la Masacre de Margarita Belén a los 24 años.',
    image: '/assets/aistudio/DORA_NORIEGA_3be17ed8.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=DoraNoriega',
  },
  {
    id: '7',
    name: 'Patricio Blas Tierno',
    age: 24,
    profession: 'Estudiante de Derecho',
    status: 'Asesinado en Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Fue asesinado en Margarita Belén a los 24 años.',
    image: '/assets/aistudio/patricio-blas-tierno_a25d7eb0.jpg',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=PatricioBlasTierno',
  },
  {
    id: '8',
    name: 'Carlos Alberto Zamudio',
    age: 28,
    profession: 'Abogado defensor de presos políticos',
    status: 'Asesinado en la Masacre de Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Fue asesinado en la Masacre de Margarita Belén a los 28 años.',
    image: '/assets/aistudio/Carlos_Alberto_Zamudio_ef527e8d.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=CarlosAlbertoZamudio',
  },
  {
    id: '9',
    name: 'Emma Beatriz Cabral',
    age: 28,
    profession: 'Trabajadora y militante',
    status: 'Asesinada en Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Fue asesinada en Margarita Belén a los 28 años.',
    image: '/assets/aistudio/Emma_Beatriz_Cabral_d0e5a9cd.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=EmmaBeatrizCabral',
  },
  {
    id: '10',
    name: 'Fernando Gabriel Piérola',
    age: 24,
    profession: 'Estudiante de Arquitectura',
    status: 'Asesinado en la Masacre de Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Fue asesinado en la Masacre de Margarita Belén a los 24 años.',
    image: '/assets/aistudio/Fernando_Gabriel_Pi_rola_1622e42a.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=FernandoGabrielPierola',
  },
  {
    id: '11',
    name: 'Luis Díaz',
    age: 25,
    profession: 'Militante barrial',
    status: 'Asesinado en Margarita Belén',
    date: '13 de Diciembre de 1976',
    caseRef: 'Causa Margarita Belén',
    caption: 'Fue asesinado en Margarita Belén a los 25 años.',
    image: '/assets/aistudio/Lu_s_D_az_c4aa6e63.png',
    link: 'https://cpm.chaco.gov.ar/margaritabelen/?militante=LuisDiaz',
  },
  {
    id: '12',
    name: 'Gladis Lucía Gómez ("Luci")',
    age: 26,
    profession: 'Enfermera y militante sanitaria',
    status: 'Detenida - Sus restos fueron identificados en 2010',
    date: 'Noviembre de 1976 / Identificada en 2010',
    caseRef: 'Causa Caballero · Sembrando Memoria ATE Santa Fe',
    caption: 'Detenida - Sus restos fueron identificados en 2010 por el Equipo Argentino de Antropología Forense (EAAF).',
    image: '/assets/aistudio/Gladis_Luc_a_G_MEZ__Luci__cc3d7f27.png',
    link: 'https://documentos.atesantafe.com.ar/sembrando-memoria/historias/resistencia-clandestina/gladis-lucia-gomez-luci',
  },
];

/**
 * Frases reflexivas de cierre extraídas de la Biblia Transmedia VESTIGIOS (Grupo 04)
 * "se habilitará una carta o frase al azar para el usuario, a modo de cerrar con una reflexión de lo visto y vivido" (Páginas 12-13 y 37)
 */
export const REFLEXIVE_QUOTES: string[] = [
  'El mensaje fundamental de Vestigios es que la memoria histórica no es un hecho abstracto ni un relato congelado en el pasado, sino un territorio de disputa activa en el presente.',
  'La levedad e inmaterialidad de las redes sociales, donde proliferan la desinformación y el negacionismo, puede ser perforada mediante el choque con las evidencias físicas y humanas de la Casa por la Memoria.',
  '¿Por qué pedir una "lista exacta" a quienes ocultaron deliberadamente las pruebas es ignorar cómo funciona el terrorismo de Estado?',
  'La sangre derramada no será negociada. Firmeza y luz, como cristal de roca.',
  'La farsa de que los juicios son "venganzas sin pruebas" se estrella contra la propia soberbia de los represores y la contundencia de sus legajos policiales de la época.',
  'Donde todos son culpables nadie lo es; donde todos somos víctimas, nadie es culpable: no permitamos que la trampa de la "Memoria Completa" diluya las responsabilidades penales y morales.',
  'El usuario no es un espectador pasivo: es alguien que tiene que decidir qué hace con lo que acaba de ver, escuchar y recorrer.',
  'No fue una guerra. Fue un plan sistemático de secuestro, tortura, desaparición y despojo material.',
  'Las paredes tapiadas con escombros no lograron callar los gritos: las marcas talladas en el cemento por los detenidos sobrevivieron al tiempo para dar testimonio de la verdad.',
  'La diferencia entre una vida de mentira y una vida de verdad es saber que ya no somos objetos del silencio impuesto.',
  'La memoria no es nostalgia del dolor, es la herramienta más viva para que el horror del pasado no vuelva a vestirse de presente.',
  'Quienes pretendieron borrar la historia bajo toneladas de escombros sólo consiguieron convertir cada ladrillo en una prueba judicial irrefutable.',
  'Frente al ruido fugaz de las pantallas digitales, la palabra de los sobrevivientes se yergue como un faro de dignidad inquebrantable.',
  'No hay futuro con olvido: cada nombre rescatado en este mural es una victoria definitiva de la verdad sobre la impunidad.',
  'El terrorismo de Estado buscó deshumanizar a sus víctimas; nuestra memoria organizada las restituye en su plena condición de sujetos con ideales, amores y proyectos.',
  'Caminar por estos pasillos es asumir un compromiso cívico: defender la democracia y los derechos humanos todos los días.',
];

/**
 * Frases negacionistas reales tomadas de redes sociales y debates públicos con usuarios ficticios legibles
 */
export const NEGATIONIST_NOISE_COMMENTS = [
  { text: '¿Por qué pedir una "lista exacta" a quienes destruyeron los archivos y ocultaron las pruebas?', user: '@usuario_anonimo', isQuestion: true },
  { text: '"No fueron 30.000, fueron 7.000 u 8.000..."', user: '@perfil_anonimo' },
  { text: '"Algo habrán hecho, por algo se los llevaron."', user: '@cuenta_anonima' },
  { text: '"Fue una guerra entre dos bandos iguales."', user: '@usuario_red' },
  { text: '"Decían que los policías no tenían opción y debían obedecer."', user: '@opina_anonimo' },
  { text: '"¿Por qué no muestran la otra parte de la historia?"', user: '@comentario_red' },
  { text: '"Memoria Completa: todos fuimos víctimas."', user: '@perfil_76' },
  { text: '"Los juicios son venganzas sin pruebas."', user: '@usuario_70' },
  { text: '"Dejen de lucrar con el pasado, miren para adelante."', user: '@lector_anonimo' },
  { text: '"En esa época se vivía tranquilo con las puertas abiertas."', user: '@ciudadano_red' },
  { text: '"Los derechos humanos son solo para un lado."', user: '@debate_anonimo' },
  { text: '"Dicen que son sótanos pero seguro eran depósitos."', user: '@anonimo_web' },
];

/**
 * Equipo de producción oficial según la Biblia Transmedia VESTIGIOS (Página 43)
 */
export const TEAM_DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1qzit5Ch8IXw4l-9aNp0xblZaCUvikTqQ';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Valeria Barreto',
    role: 'Coordinadora General de Proyecto',
    area: 'Coordinación',
    initials: 'VB',
    bio: 'Articula la comunicación interdisciplinaria entre las áreas de investigación, diseño web e instalación inmersiva.',
    image: '/assets/aistudio/VALERIA_daf8815e.jpeg',
    cv: 'https://drive.google.com/file/d/1GaXvoMCY9xBjEVwge3rKLbr4ERpTU1yz/view?usp=sharing',
  },
  {
    name: 'Agustín Gandino',
    role: 'Guionista / Estratega de Redes',
    area: 'Redes y Contenido',
    initials: 'AG',
    bio: 'Adaptación de las actas de juicio y testimonios orales del RUV a guiones y ganchos de conversión digital.',
    image: '/assets/aistudio/AGUSTIN_2e68dfef.PNG',
    email: 'agustingandino03@gmail.com',
  },
  {
    name: 'Malena Perez',
    role: 'Diseñadora Visual / Creación de Contenido',
    area: 'Audiovisual y Redes',
    initials: 'MP',
    bio: 'Edición gráfica, tratamiento de archivos desclasificados y producción de contenido visual para Instagram.',
    image: '/assets/aistudio/MALENA_0d89b738.jpeg',
    instagram: 'https://www.instagram.com/_malenaperez_?mdxt=cHZ6OWx6Ym9xYTM%3D&utm_source=qr',
  },
  {
    name: 'Mauro Enciso',
    role: 'Community Manager & Moderación',
    area: 'Redes Sociales',
    initials: 'ME',
    bio: 'Gestión y moderación pedagógica de comentarios y análisis de métricas en @vestigios_negacionismo.',
    image: '/assets/aistudio/MAURO_0e23c1aa.jpeg',
    instagram: 'https://www.instagram.com/mauroenciso_?dlrf=MTJkdXd1eWVqc2wzag==',
  },
  {
    name: 'Tiago Espinosa Layus',
    role: 'Product Owner / UX Strategist',
    area: 'Plataforma Web',
    initials: 'TE',
    bio: 'Estructuración del recorrido de usuario, arquitectura de información y supervisión de accesibilidad.',
    image: '/assets/aistudio/TIAGO_fd1d1e70.jpeg',
    imagePosition: 'object-[50%_15%]',
    instagram: 'https://www.instagram.com/espinosa.tiago/',
  },
  {
    name: 'Laila Lazcano',
    role: 'UI/UX Designer & Autora del Guión',
    area: 'Plataforma Web',
    initials: 'LL',
    bio: 'Diseño visual, guión técnico interactivo del recorrido por la Casa y conceptualización de auras.',
    image: '/assets/aistudio/LAILA_b24d19d0.png',
    linkedin: 'https://www.linkedin.com/in/laila-lazcano-22586318a?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    name: 'Juan Schelover',
    role: 'Programador / Developer',
    area: 'Plataforma Web',
    initials: 'JS',
    bio: 'Desarrollo de la aplicación interactiva, sistema Web Audio API, portal 3D en canvas y lógica transmedia.',
    image: '/assets/aistudio/JUANI_a65e27b3.jpeg',
    imagePosition: 'object-center',
    instagram: 'https://www.instagram.com/sche.lover/',
  },
  {
    name: 'Cielo Marker',
    role: 'Directora Creativa / Curadora',
    area: 'Instalación Física',
    initials: 'CM',
    bio: 'Curaduría sensorial del aula intervenida, narrativa en primera persona y experinecia de la instalación física.',
    image: '/assets/aistudio/CIELO_9edf063b.jpeg',
    instagram: 'https://www.instagram.com/cielomarker?mdxt=ZHVpMXZyOHh4enkw',
  },
  {
    name: 'Lucas Cabrera',
    role: 'Montajista Audiovisual & Foley',
    area: 'Instalación Física',
    initials: 'LC',
    bio: 'Diseño sonoro, grabación de ambientes foley y sincronización de videomapping para la instalación.',
    image: '/assets/aistudio/LUCAS_bf19a7b5.JPEG',
    linkedin: 'https://www.linkedin.com/in/lucascabreras/',
  },
  {
    name: 'Sebastián Candia',
    role: 'Director Técnico & Hardware',
    area: 'Instalación Física',
    initials: 'SC',
    bio: 'Montaje técnico de proyectores, sensores y sincronización de audio espacial en la sala de exposición.',
    image: '/assets/aistudio/SEBA_8a04cb39.png',
    instagram: 'https://www.instagram.com/sebbcl__?obrf=aXRvNzl6NW10N3pu',
  },
];

/**
 * Biblioteca y Material Documental (Anexo 2 de la Biblia Transmedia, Págs. 26 y 50)
 * Material proporcionado por el RUV y la Casa por la Memoria:
 * ● EL GOLPE
 * ● JUICIO Y CASTIGO EN EL CHACO - CAUSA BRIGADA
 * ● FOTOGRAFÍAS, MAPAS E ILUSTRACIONES
 * ● JUICIO Y CAUSA EN EL CHACO
 * ● NEGACIONISMO
 * ● COLECCIÓN DEL RUV
 * ● LEYES
 */
export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'el-golpe',
    title: 'EL GOLPE',
    subtitle: 'La dictadura cívico-militar en el Chaco y el mapa represivo',
    edition: 'Publicación oficial del Registro Único de la Verdad (RUV)',
    publisher: 'Comisión Provincial por la Memoria del Chaco',
    description: 'Investigación histórica fundamental que documenta cómo operó el terrorismo de Estado en la provincia del Chaco, incluyendo los planos arquitectónicos de la ex Brigada de Investigaciones y el organigrama militar de la Subzona 23.',
    keyTopics: [
      'Planos de los sótanos SB1 y SB2 y reformas para ocultar celdas en 1978 (págs. 11 a 13).',
      'Operativos represivos en Resistencia, Barranqueras y el interior chaqueño.',
      'La Masacre de Margarita Belén del 13 de diciembre de 1976.',
      'Testimonios orales y peritajes de inspección ocular (Expedientes 42/85 y 44/85).',
    ],
    chapters: [
      { title: 'Capítulo 1: El Escenario Chaqueño', summary: 'Contexto social, detenciones ilegales y la toma de la Brigada de Investigaciones.' },
      { title: 'Capítulo 2: Los Sótanos de la Memoria', summary: 'Páginas 11 a 13: planos de la excavación arqueológica forense y análisis de muros.' },
      { title: 'Capítulo 3: La Causa Caballero', summary: 'Las denuncias iniciales (Expedientes 42/85 y 44/85) que abrieron el camino a la justicia.' },
    ],
  },
  {
    id: 'negacionismo',
    title: 'NEGACIONISMO',
    subtitle: 'Cuadernillo conceptual frente a la desinformación digital',
    edition: 'Cuadernillo de Formación Ciudadana y Derechos Humanos',
    publisher: 'Registro Único de la Verdad (RUV) - Chaco',
    description: 'Manual pedagógico que desmonta una por una las falacias y discursos de odio contemporáneos que circulan en redes sociales sobre los crímenes de lesa humanidad.',
    keyTopics: [
      '¿Por qué 30.000? Explicación del número simbólico frente a la clandestinidad y el subregistro estatal.',
      'La trampa de la "Teoría de los Dos Demonios recargada" en el siglo XXI.',
      'El eslogan de la "Memoria Completa": la maniobra exculpatoria de pasar de vencedores a supuestas víctimas.',
      'Delitos de Lesa Humanidad: qué son y por qué son crímenes imprescriptibles.',
    ],
    chapters: [
      { title: 'Eje 1: La discusión contable', summary: 'Por qué exigir listas definitivas a quienes destruyeron los archivos es una trampa negacionista.' },
      { title: 'Eje 2: La falsa simetría', summary: 'Diferencias jurídicas insalvables entre la violencia civil y el terrorismo sistemático ejercido desde el Estado.' },
      { title: 'Eje 3: Argumentos para el debate', summary: 'Respuestas ágiles de menos de 45 segundos respaldadas en sentencias judiciales firmes.' },
    ],
  },
  {
    id: 'difusion',
    title: 'DIFUSIÓN',
    subtitle: 'Catálogo de testimonios, víctimas y guías para el aula',
    edition: 'Material Educativo y Extensión Universitaria',
    publisher: 'FADyCC - UNNE & Casa por la Memoria',
    description: 'Compendio de biografías, fotografías históricas recuperadas, fichas de víctimas chaqueñas y herramientas didácticas para escuelas secundarias y profesorados.',
    keyTopics: [
      'Biografías y fichas biográficas de los desaparecidos chaqueños.',
      'Guía para visitas guiadas escolares a la Casa por la Memoria (Marcelo T. de Alvear 32).',
      'Actividades pedagógicas para confrontar discursos de odio en entornos escolares.',
      'Registro fotográfico de las marcas del edificio y el museo de sitio.',
    ],
    chapters: [
      { title: 'Sección A: Rostros y Vidas', summary: 'Historias de militantes, estudiantes, obreros y abogados secuestrados en el Chaco.' },
      { title: 'Sección B: El Edificio como Evidencia', summary: 'Cómo leer las huellas materiales del excentro clandestino.' },
      { title: 'Sección C: Memoria Colectiva', summary: 'Dinámicas grupales para debatir el valor irrenunciable de la democracia y los derechos humanos.' },
    ],
  },
];
