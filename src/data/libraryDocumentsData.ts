export interface LibraryDocSection {
  id: string;
  title: string;
  page?: string;
  summary: string;
  content: string;
  tags?: string[];
  quotes?: string[];
}

export interface LibraryDocumentItem {
  id: string;
  category: 'el_golpe' | 'negacionismo' | 'difusion';
  buttonLabel: string;
  pdfFileName: string;
  title: string;
  subtitle: string;
  badge: string;
  publisher: string;
  year: string;
  totalPages: number;
  description: string;
  context: string;
  keyTopics: string[];
  sections: LibraryDocSection[];
  driveDownloadUrl?: string;
  driveViewUrl?: string;
}

export const GOOGLE_DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1KtYBwY948QbPpFQVN394errmiSP4ooJv';

export const LIBRARY_DOCUMENTS: LibraryDocumentItem[] = [
  // 1. EL GOLPE -> ELGOLPE.pdf
  {
    id: 'el-golpe',
    category: 'el_golpe',
    buttonLabel: 'El Golpe',
    pdfFileName: 'ELGOLPE.pdf',
    driveDownloadUrl: 'https://drive.usercontent.google.com/download?id=1PnO9smxg63Wtawrnvce_EzfQExdAFqAi&export=download',
    driveViewUrl: 'https://drive.google.com/file/d/1PnO9smxg63Wtawrnvce_EzfQExdAFqAi/view?usp=sharing',
    title: 'EL GOLPE — Informe Final Comisión de Derechos Humanos (1985)',
    subtitle: 'Cámara de Diputados de la Provincia del Chaco (Ley 2971 / Res. 87/85) · Edición CPM Chaco (2019)',
    badge: '148 Páginas · Documento Histórico Oficial Facsimilar',
    publisher: 'Comisión Provincial por la Memoria del Chaco (CPM) - Registro Único de la Verdad (RUV)',
    year: '1985 / Edición Reeditada 2019',
    totalPages: 148,
    description: 'Investigación histórica, parlamentaria y judicial decisiva que compila el Informe Final de la Comisión de Derechos Humanos de la Cámara de Diputados de la Provincia del Chaco (creada por Ley 2971 y Resolución 87/85), el mapa del terrorismo de Estado en la Subzona 23, el peritaje arqueológico del EAAF en los sótanos de la ex Brigada (Marcelo T. de Alvear 32) y la causa judicial por la Masacre de Margarita Belén.',
    context: 'El 17 de mayo de 1984, la Legislatura chaqueña aprobó la Ley 2971 creando la Comisión Investigadora de Violaciones a los DDHH. En octubre de 1985 se aprobó por unanimidad el Informe Final redactado por los diputados Bittel, Rey, Collado, Filippa, Tenev, Galissier, Palavecino, Romero, Reynoso y Westtein.',
    keyTopics: [
      'Modelado 3D y relevamiento planimétrico de Marcelo T. de Alvear 32 (Sótano Mayor SB1 y Sótano Menor SB2).',
      'Hallazgo pericial del EAAF (2008): picana eléctrica a batería, aislaciones acústicas y frases en el concreto.',
      'Nómina y testimonios de ex detenidos políticos: Uferer, Luque, Goya, Aguirre, Campos, Ponti, Rossi, etc.',
      'Investigación completa de la Masacre de Margarita Belén (13/12/1976): traslado clandestino y fusilamiento de 21 presos políticos.',
      'Identificación y legajos fotográficos de los represores policiales y militares (Thomas, Manader, Cardozo, Ceniquel).',
    ],
    sections: [
      {
        id: 'eg-presentacion',
        title: '1. Presentación Institucional y Organismos de DDHH',
        page: 'Págs. 1 a 6',
        summary: 'Marco institucional de la Comisión Provincial por la Memoria y antecedentes parlamentarios.',
        content: `La Comisión Provincial por la Memoria del Chaco (CPM), con sede en la histórica casona de Marcelo T. de Alvear 32 en Resistencia, reúne a los organismos históricos de Derechos Humanos:
- Asociación de Ex Detenidos Políticos del Chaco "Chachi Quintana"
- H.I.J.O.S. Chaco (Hijos por la Identidad y la Justicia contra el Olvido y el Silencio)
- Asociación Familiares de Desaparecidos por Razones Políticas durante el Terrorismo de Estado
- Red por la Identidad Chaco
- Comisión Permanente por los Derechos Humanos

La reedición de este documento consagra el rescate de las actuaciones de la Comisión de DDHH de la Cámara de Diputados de 1985, presidida por Felipe Germán Bittel, como pilar documental para los juicios de lesa humanidad en el Nordeste.`,
        quotes: ['«Este edificio fue sede del terrorismo de Estado y hoy es un espacio de memoria, justicia y reparación ciudadana.»']
      },
      {
        id: 'eg-casona-sotanos',
        title: '2. El CCD Brigada de Investigaciones y las Excavaciones del EAAF',
        page: 'Págs. 7 a 23',
        summary: 'Relevamiento arqueológico de los sótanos tapiados y evidencias de tortura incautadas en 2008.',
        content: `El inmueble de Marcelo T. de Alvear 32 fue construido en 1910 por Gustavo Lagerheim. En 1955 fue expropiado por el Estado para obras públicas, y en 1976 cedido a la Policía del Chaco para la Brigada de Investigaciones, convirtiéndose en el Centro Clandestino de Detención, Tortura y Exterminio más importante del Nordeste.

En febrero de 2008, el Equipo Argentino de Antropología Forense (EAAF) realizó la inspección y excavación en el marco de la Causa Caballero:
- Sótano Mayor (SB1): Estaba inundado y tapiado con escombros bajo un contrapiso de cemento construido en 1978 para ocultar los calabozos ante inspecciones de la Cruz Roja.
- Sótano Menor (SB2): Superficie de 4x4 metros. Los antropólogos recuperaron cables de conexión con pinzas, una picana a pila (utilizada a batería para evitar caídas de tensión en el alumbrado público exterior que alertaran a los vecinos), restos de proyectiles y la instalación eléctrica clandestina.
- En las paredes se hallaron las históricas inscripciones grabadas a punzón: "La sangre derramada no será negociada" y "Firmeza y luz, como cristal de roca".`,
        quotes: [
          '«En las paredes del sótano de castigo sobrevivieron los grabados de los prisioneros: "La sangre derramada no será negociada".»',
          '«Para amortiguar los gritos de los torturados en el sótano, los guardias encendían la radio a todo volumen y tocaban el acordeón.»'
        ]
      },
      {
        id: 'eg-expedientes',
        title: '3. Testimonios de Sobrevivientes y Expedientes de Denuncia',
        page: 'Págs. 24 a 83',
        summary: 'Declaraciones de militantes, estudiantes y obreros secuestrados en la provincia.',
        content: `El informe compila más de 20 expedientes testimoniales donde constan las modalidades de secuestro, traslado en camionetas Falcon o Citroën, sesiones de picana y simulacros de fusilamiento:
- Expte 3/84 - Osvaldo Raúl Uferer: Secuestrado el 22/04/76 por la patota de la Brigada. Llevado a la "Sala Negra" en planta alta y luego a los sótanos.
- Expte 4/84 - Ramón Eduardo Luque: Describió cómo los agentes Borba, Manader y Cardozo torturaban en la "sala negra" y en el sótano bajo amenazas de muerte.
- Expte 6/84 - Juan Carlos Goya: Detenido en 1976 y sometido a sesiones ininterrumpidas de picana y golpes en la "sala de situación".
- Expte 7/84 - Carlos Erasmo Aguirre: Describió la aplicación de picana eléctrica de ganado y las quemaduras con ácido.
- Expte 42/85 y 44/85 - Sara Fulvia Ayala y Pedro Crisólogo Morel: Secuestrados con su beba Viviana Morel, trasladados por centros clandestinos hasta su desaparición en la Brigada en 1977.
- Expte 47/85 - Enzo Lauroni y Mónica Almirón: Secuestrados en Cipolletti y trasladados a la Brigada de Resistencia en diciembre de 1977.`,
        quotes: ['«Nos vendaron y ataron a camastros elásticos. Nos amenazaban con que nadie saldría con vida para contarlo.»']
      },
      {
        id: 'eg-represores',
        title: '4. Cuadro de Represores y Prueba Judicial',
        page: 'Págs. 84 a 112',
        summary: 'Álbum fotográfico de reconocimiento y legajos de la patota policial y militar.',
        content: `A partir del reconocimiento fotográfico efectuado por los denunciantes en el expediente legislativo y judicial, se identificó la cadena de mando:
- Carlos Alcides Thomas (Jefe de la Brigada de Investigaciones)
- Gabino Manader (Sargento / interrogador jefe de la patota)
- José María Cardozo (Torturador en la "Sala Negra" y sótanos)
- Carlos Silva Longhi (Oficial inspector de la Brigada)
- Wenceslao Ceniquel (Jefe de Policía de la Provincia del Chaco)
- Ramón Esteban Meza y Alfredo Scordo (Torturadores y enlaces de inteligencia)

Estas pruebas sirvieron de basamento para las sentencias históricas del Tribunal Oral Federal de Resistencia en los juicios Causa Caballero I (2010), Caballero II (2018) y Masacre de Margarita Belén.`,
        quotes: ['«Los propios legajos policiales condecoraban a los sumariantes por "labor contrasubversiva".»']
      },
      {
        id: 'eg-margarita-belen',
        title: '5. La Masacre de Margarita Belén (13 de Diciembre de 1976)',
        page: 'Págs. 131 a 147',
        summary: 'Reconstrucción del fusilamiento de 21 presos políticos simulando un enfrentamiento.',
        content: `En la madrugada del 13 de diciembre de 1976, una comisión militar y policial extrajo de la Alcaidía y de la Brigada de Investigaciones a un grupo de 21 detenidos políticos bajo el falso pretexto de un "traslado a Formosa".

En el kilómetro 1042 de la Ruta Nacional 11, cerca de Margarita Belén:
- Los prisioneros, previamente torturados y en estado de indefensión, fueron acribillados con ráfagas de fusil FAL e Itaka por oficiales del Ejército y la Policía.
- Se colocaron tres de los cuerpos acribillados dentro de un Peugeot 504 para simular un "ataque guerrillero al convoy militar".
- Médicos policiales como Héctor Grillo y autoridades judiciales (el juez Ángel Córdoba y el fiscal Roberto Mazzoni) encubrieron los asesinatos emitiendo certificados de defunción irregulares e impidiendo que los familiares vieran los cuerpos.
- Las víctimas: Patricio Blas Tierno, Carlos Zamudio, Fernando Piérola, Carlos Alberto Duarte, Manuel Parodi Ocampo, Mario Cuevas, Luis Díaz, entre otros mártires chaqueños.`,
        quotes: [
          '«No hubo ningún enfrentamiento: fue un fusilamiento a mansalva planificado por la Séptima Brigada de Infantería.»'
        ]
      }
    ]
  },

  // 2. NEGACIONISMO -> ANM - Cuadernillo negacionismo_0322.pdf
  {
    id: 'negacionismo',
    category: 'negacionismo',
    buttonLabel: 'Negacionismo',
    pdfFileName: 'ANM - Cuadernillo negacionismo_0322.pdf',
    driveDownloadUrl: 'https://drive.usercontent.google.com/download?id=1aA1GSX5U5b8J4lu_vAqO2ISbMnNsJqzB&export=download',
    driveViewUrl: 'https://drive.google.com/file/d/1aA1GSX5U5b8J4lu_vAqO2ISbMnNsJqzB/view?usp=sharing',
    title: 'NEGACIONISMO — Repertorios en Clave de Derechos Humanos',
    subtitle: 'Secretaría de Derechos Humanos de la Nación (Colección Repertorios N° 1)',
    badge: '117 Páginas · Colección Repertorios N° 1',
    publisher: 'Ministerio de Justicia y Derechos Humanos de la Nación · Secretaría de Derechos Humanos',
    year: '2021',
    totalPages: 117,
    description: 'Compilación académica y doctrinaria de referencia coordinada por la Secretaría de Derechos Humanos de la Nación. Analiza el origen internacional del negacionismo, sus manifestaciones en Argentina (desde la dictadura militar hasta la actualidad), el desmontaje de la teoría de los dos demonios original y de su versión recargada, los debates sobre la criminalización penal y la defensa inalienable de la cifra de los 30.000 detenidos-desaparecidos.',
    context: 'Con prólogo de Horacio Pietragalla Corti y ensayos de Ana Barletta, Verónica Cruz, Daniel Rafecas, Daniel Feierstein, Mario Ranalletti, Valentina Salvi, Emanuela Fronza y Valeria Thus.',
    keyTopics: [
      'Los 4 procedimientos del negacionismo según Yves Ternon: racionalización, reducción numérica, inversión de culpa y anamorfosis.',
      'Diferencia epistemológica entre "revisionismo histórico" de base científica y "negacionismo" ideológico.',
      'La falacia de la "Memoria Completa": de la retórica triunfalista a la victimización de los perpetradores.',
      'La "teoría de los dos demonios original" y de su versión "recargada" (Daniel Feierstein).',
      'El debate doctrinario internacional sobre la criminalización penal del negacionismo (Emanuela Fronza).',
      'El debate sobre la cifra de los 30.000: por qué cuestionar el número busca encubrir la clandestinidad del Estado terrorista.',
      'Daño negacionista y el derecho a la memoria como garantía constitucional y de derechos humanos (Valeria Thus).',
    ],
    sections: [
      {
        id: 'neg-prologo',
        title: '1. Prólogo Institucional e Introducción',
        page: 'Págs. 1 a 8',
        summary: 'Horacio Pietragalla Corti y los cuatro mecanismos discursivos del negacionismo.',
        content: `La Secretaría de Derechos Humanos de la Nación inauguró su colección Repertorios para responder a los discursos que pretenden relativizar el genocidio argentino.
Se rescata el marco teórico del historiador francés Yves Ternon, identificando los cuatro procedimientos clásicos del aparato de la negación:
1. Racionalización: Deslegitimar o falsear las pruebas documentales y los testimonios de las víctimas.
2. Reducción numérica: Rebajar arbitrariamente la cantidad de víctimas para restarle sistematicidad al plan criminal.
3. Inversión de la acusación: Culpabilizar a las víctimas y transformar a los verdugos en supuestos "defensores del orden".
4. Anamorfosis: Deformar la realidad histórica afirmando que las cárceles y centros clandestinos eran simples lugares de detención legal.`,
        quotes: [
          '«Un análisis del negacionismo debe estar precedido por una advertencia: trata de la negación, de la mentira y de las manipulaciones.» — Yves Ternon',
          '«Defender los acuerdos sobre el terrorismo de Estado es hoy defender la democracia.» — Horacio Pietragalla Corti'
        ]
      },
      {
        id: 'neg-rafecas-barletta',
        title: '2. Genocidio y negacionismo: disputas en la construcción de la memoria',
        page: 'Págs. 9 a 28',
        summary: 'Debate de Ana Barletta, Verónica Cruz, Daniel Feierstein y Daniel Rafecas (UNLP).',
        content: `El juez federal Daniel Rafecas compara el genocidio armenio, la Shoá y el terrorismo de Estado en Argentina:
- Todo proceso genocida planifica desde el primer día tanto la matanza como el encubrimiento y la negación posterior de los hechos.
- En Argentina, la opción por la clandestinidad (centros clandestinos, vuelos de la muerte, desaparición de cuerpos y apropiación de bebés) fue elegida conscientemente para poder negar los crímenes en el futuro: "No están ni vivos ni muertos: son una entidad, son desaparecidos" (Videla, 1979).
- Rafecas desmonta la pretensión de equiparación: los miembros de organizaciones políticas que cometieron delitos fueron secuestrados, torturados y asesinados masivamente por el Estado; no hubo juicio convencional sino "justicia policial" clandestina y pena de muerte ilegal.

El Dr. Daniel Feierstein profundiza sobre la construcción social de la memoria:
- El negacionismo no se combate únicamente con el Código Penal, sino desmontando políticamente y con pruebas históricas sus argumentos en el espacio público.
- La categoría jurídica y sociológica de "genocidio" es la única que impide la trampa de la simetría entre la violencia civil y el terrorismo sistemático ejercido desde el Estado.`,
        quotes: [
          '«Quienes cometen genocidios dedican igual energía a cometer los crímenes que a diseñar las estrategias para procurar la impunidad y el negacionismo posterior.» — Daniel Rafecas',
          '«Las palabras no son neutrales: el concepto de genocidio da cuenta de un plan sistemático para transformar el patrón de identidad nacional.» — Daniel Feierstein'
        ]
      },
      {
        id: 'neg-ranalletti',
        title: '3. Apuntes sobre el negacionismo en Argentina: Uso político del pasado y represión ilegal (Mario Ranalletti)',
        page: 'Págs. 29 a 44',
        summary: 'Historia del concepto, diferencia con el revisionismo y etapas del discurso en democracia.',
        content: `El historiador Mario Ranalletti establece la distinción esencial:
- Revisionismo histórico: Es una práctica científica legítima en la que investigadores reexaminan fuentes y documentos para refinar el conocimiento del pasado.
- Negacionismo: Es una empresa política e ideológica que prescinde del método científico, recurre a la manipulación burda y busca habilitar a los perpetradores de crímenes atroces.

Evolución del negacionismo en Argentina:
1. 1976-1983: Retórica de "victoria militar en una guerra justa" contra una supuesta agresión marxista.
2. 1983-1990: Maniobra de autoamnistía y rechazo al informe "Nunca Más" (Etchecolatz, "La otra campana del Nunca Más").
3. 2000-presente: El giro hacia la consigna de la "Memoria Completa" (asociaciones como FAMUS y CELTYV), donde los represores intentan presentarse como víctimas para eludir las sentencias judiciales.`,
        quotes: [
          '«Contrariamente a lo que pretenden, los negacionistas no revisan nada: inventan y manipulan para justificar el horror.» — Mario Ranalletti'
        ]
      },
      {
        id: 'neg-salvi',
        title: '4. “Todos somos víctimas”: Transformaciones en la narrativa de la “reconciliación nacional” (Valentina Salvi)',
        page: 'Págs. 45 a 54',
        summary: 'Cómo los sectores vinculados a la represión mutaron su retórica de vencedores a supuestas víctimas.',
        content: `La socióloga Valentina Salvi analiza cómo a partir de la anulación de las leyes de Obediencia Debida y Punto Final en 2003, los defensores de los militares cambiaron de táctica:
- Al quedar demostrados los "vuelos de la muerte" y los testimonios de los campos de concentración, ya era insostenible presentarse como héroes de una "guerra justa".
- Crearon la consigna de la "Memoria Completa", utilizando un lenguaje de parentesco y apelando a "víctimas inocentes" para desviar la atención de los crímenes de lesa humanidad.
- El lema busca instalar la falacia de que "si todos somos víctimas, nadie es culpable", pretendiendo que la sociedad les otorgue amnistía y perdón a cambio de una falsa reconciliación.`,
        quotes: [
          '«La victimización colectiva indiferenciada funciona como un instrumento de disculpa y exculpación masiva.» — Valentina Salvi'
        ]
      },
      {
        id: 'neg-dosdemonios-30000',
        title: '5. Argumentos principales de la teoría de los dos demonios original y de su versión recargada (Daniel Feierstein)',
        page: 'Págs. 55 a 64',
        summary: 'Por qué la cifra de 30.000 es la respuesta política y moral irrefutable a la clandestinidad de la dictadura.',
        content: `Feierstein desarticula las campañas mediáticas que pretenden reinstalar la teoría de los dos demonios en su versión "recargada" y rebajar la cifra de víctimas:
- La versión original ponía el eje en la violencia estatal enfrentada a grupos armados; la versión "recargada" busca redirigir la empatía social hacia los represores bajo el ropaje de supuestas víctimas silenciadas.
- Explicación de la cifra: La cifra de 30.000 fue formulada por los organismos de derechos humanos durante la dictadura para denunciar la totalidad del universo represivo: detenidos-desaparecidos permanentes, personas asesinadas clandestinamente, sobrevivientes que pasaron por campos de concentración, y niños apropiados.
- El subregistro endémico: En todo genocidio (la Shoá, Armenia, Ruanda, Guatemala) es imposible tener un número definitivo porque los perpetradores ocultaron los cuerpos y destruyeron los archivos.
- En el interior de Argentina (como en Tucumán y Chaco), muchísimas familias rurales y obreras tardaron décadas en animarse a denunciar por miedo. Los listados de la CONADEP de 1984 eran apenas un punto de partida inicial, no un techo definitivo.
- Como sintetizó Martín Kohan: A la negativa criminal de los militares de entregar las listas y decir dónde están los cuerpos, la sociedad responde con la cifra 30.000.`,
        quotes: [
          '«El que ajusta de 30.000 a 8.000, o abre esa discusión contable, incurre en una canallada que encubre la clandestinidad del Estado terrorista.» — Daniel Feierstein / Martín Kohan'
        ]
      },
      {
        id: 'neg-fronza',
        title: '6. La criminalización del negacionismo histórico: ¿El instrumento penal como guardián de la memoria? (Emanuela Fronza)',
        page: 'Págs. 65 a 94',
        summary: 'El análisis comparado europeo y latinoamericano sobre leyes penales contra el negacionismo.',
        content: `La jurista y profesora de Derecho Penal Emanuela Fronza examina los límites y potencialidades del derecho penal frente al negacionismo:
- Experiencias en Europa (Alemania, Francia con la Ley Gayssot, Italia y el Tribunal Europeo de Derechos Humanos): las normativas que tipifican la negación, apología o justificación de crímenes de genocidio y crímenes contra la humanidad.
- El dilema entre la libertad de expresión y la tutela de la dignidad humana: el negacionismo no constituye una opinión protegida, sino una forma de hostigamiento y discurso de odio que promueve la violencia y revictimiza a los colectivos vulnerados.
- En el contexto latinoamericano y argentino, la autora evalúa la eficacia preventiva del castigo penal versus las políticas pedagógicas de memoria, señalando que la tipificación penal debe reservarse para actos que constituyan una incitación clara a la discriminación o a la violencia.`,
        quotes: [
          '«El derecho penal no puede sustituir a la historia, pero tiene la función de trazar una línea infranqueable ante la justificación de crímenes atroces.» — Emanuela Fronza'
        ]
      },
      {
        id: 'neg-danio-memoria',
        title: '7. Daño negacionista y Derecho Penal: resignificando la lesividad en el siglo de los genocidios (Valeria Thus)',
        page: 'Págs. 95 a 116',
        summary: 'El negacionismo como última fase del genocidio y la lesión directa a la dignidad de las víctimas.',
        content: `La Dra. Valeria Thus fundamenta la lesividad del negacionismo en el marco del Derecho Internacional de los Derechos Humanos:
- El genocidio no termina con la matanza física: se completa con la "realización simbólica", que es el intento de borrar de la memoria colectiva la identidad de los aniquilados y justificar el crimen.
- El negacionismo no es un ejercicio legítimo de opinión: es un ataque directo a la dignidad humana de los sobrevivientes y sus familiares, a quienes se les renueva el dolor del trauma y se les niega el duelo.
- El Estado tiene la obligación positiva de garantizar la verdad, la reparación y la memoria colectiva como garantías de no repetición de los crímenes de lesa humanidad.`,
        quotes: [
          '«El derecho a la memoria no es un capricho del pasado: es el pilar que garantiza que no se repitan las aberraciones del terrorismo de Estado.» — Valeria Thus'
        ]
      }
    ]
  },

  // 3.1 DIFUSIÓN -> 1 - Historias de las Organizaciones.pdf
  {
    id: 'difusion-org',
    category: 'difusion',
    buttonLabel: '1. Historias de las Organizaciones',
    pdfFileName: '1 - Historias de las Organizaciones.pdf',
    driveDownloadUrl: 'https://drive.usercontent.google.com/download?id=1Jamd1PLYLymvd_hH3JuUQ1heDznh0V8Y&export=download',
    driveViewUrl: 'https://drive.google.com/file/d/1Jamd1PLYLymvd_hH3JuUQ1heDznh0V8Y/view?usp=sharing',
    title: 'COLECCIÓN RUV 01: Historia de las Organizaciones Políticas en el Chaco y sus Militantes',
    subtitle: 'Ligas Agrarias, Unión de Estudiantes Secundarios (UES) y PRT/ERP',
    badge: '92 Páginas · Colección RUV N° 01',
    publisher: 'Comisión Provincial por la Memoria del Chaco - Registro Único de la Verdad (RUV)',
    year: 'Edición Oficial RUV Chaco',
    totalPages: 92,
    description: 'Investigación histórica profunda que documenta la emergencia, luchas y trayectorias de las tres organizaciones sociales y políticas emblemáticas perseguidas en el Chaco durante los años 70: el campesinado cooperativista de las Ligas Agrarias Chaqueñas, la militancia juvenil secundaria de la UES y la estructura política del PRT/ERP en el Nordeste.',
    context: 'Elaborado por el equipo de investigación del Registro Único de la Verdad (RUV Chaco: Juan Carlos Fernández, Ángeles Méndez, Magalí Valetto Claps, Sonia Wyss y Leandro Romero) en el marco de la Ley 5582 / Ley 1412-A.',
    keyTopics: [
      'Ligas Agrarias Chaqueñas: Cabildo de Sáenz Peña (1970) y marcha de 10.000 productores en Resistencia (1972).',
      'El Operativo Toba II y el desmantelamiento del modelo agrario cooperativo por el general Antonio Serrano.',
      'Militantes de Ligas Agrarias asesinados y desaparecidos: Cattáneo, Fleitas, Gómez Estigarribia ("Ñaró"), López, Molina, Orianki, Píccoli, Sokol, Vallejos, Voccouber.',
      'Unión de Estudiantes Secundarios (UES): lineamientos, comedor estudiantil, boleto secundario y desaparición de jóvenes de 19 años.',
      'PRT/ERP en el Chaco: militantes vinculados a la provincia y las caídas en la Brigada de Investigaciones (Almirón, Arra, Ayala, Delfino, Ferro, García, Goyeneche, Lauroni, Morel, Sobko, Staré, Wettengel).',
    ],
    sections: [
      {
        id: 'org-intro',
        title: '1. Introducción: Ley 5582 y el Registro Único de la Verdad',
        page: 'Pág. 9',
        summary: 'Misión del RUV y marco legal provincial para la reconstrucción de la memoria chaqueña.',
        content: `La Ley 5582 del año 2005 (hoy Ley 1412-A/2017) crea la Comisión Provincial por la Memoria y establece en su artículo 1° "el derecho de todo integrante de la comunidad a conocer la verdad acerca de la desaparición forzada de personas, muerte, sustracción de menores, cambios de identidad y demás violaciones de Derechos Humanos ocurridos en los años de dictadura militar, autoritarismo y terrorismo de Estado".
El Registro Único de la Verdad (RUV) tiene a su cargo centralizar y custodiar los archivos, legajos testimoniales y la reconstrucción histórica de las organizaciones populares destruidas por el aparato represivo.`,
        quotes: ['«El RUV es el área responsable de investigar, recopilar y organizar la información para garantizar su preservación y el derecho a la verdad.»']
      },
      {
        id: 'org-ligas',
        title: '2. Las Ligas Agrarias: Miseria y Explotación: El Campo se Liga',
        page: 'Págs. 13 a 18',
        summary: 'La rebelión de 20.000 familias campesinas contra los monopolios algodoneros y la marcha de 10.000 agricultores.',
        content: `Las Ligas Agrarias agruparon a más de 20.000 familias y 54.000 jóvenes en el Nordeste argentino:
- Antecedentes: Nacieron del Movimiento Rural de Acción Católica (1958) y la cooperativa UCAL para defender a pequeños y medianos colonos frente a monopolios como Bunge & Born y La Forestal.
- Hitos masivos: El 14 de noviembre de 1970 se celebró el Primer Cabildo Abierto en Sáenz Peña con 5.000 campesinos bajo el lema "Grita lo que sientes". El 31 de enero de 1972, 10.000 agricultores marcharon sobre la Plaza 25 de Mayo en Resistencia exigiendo precio justo para el algodón.
- Represión estatal: Tras el golpe de 1976, la VII Brigada de Infantería desplegó el Operativo Toba II comandado por Cristino Nicolaides. Se detuvo a más de 85 colonos en masa, se confiscaron cooperativas y se persiguió a sus líderes por el monte chaqueño.`,
        quotes: ['«El campo era un hervidero de gente... Las Ligas fueron el grito de dignidad del campesinado chaqueño.» — Osvaldo Lovey']
      },
      {
        id: 'org-biografias-ligas',
        title: '3. Militantes de las Ligas Agrarias Asesinados y Desaparecidos',
        page: 'Págs. 19 a 44',
        summary: 'Biografías detalladas de los dirigentes rurales perseguidos y ejecutados.',
        content: `- Raquel Noemí Cattáneo (21 años): Maestra rural en El Sauzalito. Secuestrada en San Isidro en 1979 junto a su pareja Armando Molina. Su hijo Martín de 2 años fue rescatado.
- Luis Alberto Fleitas (24 años): Campesino de Quitilipi, militante liguista secuestrado y desaparecido.
- Raúl Eduardo Gómez Estigarribia "Ñaró" (34 años): Docente rural. Emboscado y asesinado el 12 de febrero de 1977 en Corzuela por una comisión del Ejército al mando de Bettolli.
- Alicia Adela López (30 años): Profesora en Letras, redactora del periódico "El Campesino" en Sáenz Peña. Secuestrada en Santa Fe en 1976 y asesinada en la Seccional 4ª.
- Armando Molina (27 años): Asesor de colonos, secuestrado en Buenos Aires en 1979.
- Carlos Héctor Orianki (29 años): Asesor de Ligas y UCAL. Capturado tras persecución en helicóptero por el coronel Larrateguy el 3 de octubre de 1976. Desaparecido.
- Carlos Servando Píccoli (28 años): Secretario general de la Unión Cooperativista del Agricultor. Vivió clandestino en el monte hasta su exilio y regreso en la contraofensiva; asesinado en Pampa Florida el 22 de abril de 1979.
- Juan Sokol (23 años): Joven campesino que ayudó a Orianki; capturado y asesinado bajo tortura en la comisaría de Sáenz Peña el 3 de octubre de 1976.
- Secundino "Taco" Vallejos (36 años) y Hugo Rogelio Voccouber (31 años): Dirigentes liguistas de Villa Berthet, secuestrados y desaparecidos.`,
        quotes: ['«Piccoli murió en la noche del 22 de abril de 1979 en Pampa Florida defendiendo hasta el final a los colonos.»']
      },
      {
        id: 'org-ues',
        title: '4. La Unión de Estudiantes Secundarios (UES) del Chaco',
        page: 'Págs. 45 a 58',
        summary: 'La militancia de los colegios de Resistencia y la desaparición de cuatro jóvenes de 19 años.',
        content: `La UES se fundó en el Chaco en 1972 (Regional 4) nucleando a estudiantes de los colegios Mc Lean, Nacional, Comercio y Escuela Industrial:
- Reclamaban la derogación de la restrictiva Ley La Torre, el boleto estudiantil secundario y organizaban ollas populares y ayuda social (Operativo Formosa en 1973).
- En agosto de 1975, tras el acto en el Colegio Mc Lean, la policía detuvo a varios delegados y la Triple A ametralló domicilios estudiantiles.
- Tras el golpe, cuatro de sus principales dirigentes fueron secuestrados y desaparecidos con apenas 19 años:
  1. Ricardo Alfredo "Ricardito" Amarilla (Bachillerato N° 9): herido en Rosario en septiembre de 1976 y desaparecido.
  2. Antonio Inocencio "El Negro" Silva (Escuela de Comercio): trabajador de correo y fundador de la UES, desaparecido en febrero de 1976 en Santa Fe.
  3. Carlos Armando "Carlitos" Rolón (Comercio Noche): abanderado escolar y militante barrial, desaparecido en enero de 1977.
  4. Julio César "Lalo" Rossi (Colegio Mc Lean): responsable de biblioteca de la UES, secuestrado en Rosario en septiembre de 1976.`,
        quotes: ['«Sentíamos que estábamos destinados a ser parte activa de la generación del 70 que luchó por sus ideales.»']
      },
      {
        id: 'org-prt',
        title: '5. El PRT / ERP en el Chaco: Militantes Asesinados y Desaparecidos',
        page: 'Págs. 59 a 92',
        summary: 'Historias de vida de los 14 militantes vinculados a la provincia.',
        content: `El PRT comenzó a actuar en el Chaco hacia 1969 con obreros de la fábrica textil Chacotex y estudiantes de la UNNE:
- Mónica Judith Almirón (26 años) y Enzo Lauroni (28 años): Estudiantes de la UNNE, secuestrados en Cipolletti y trasladados a la Brigada de Investigaciones de Resistencia donde fueron vistos en diciembre de 1977.
- Miguel Ángel Arra (23 años): Secuestrado y desaparecido en Rosario.
- Sara Fulvia Ayala (22 años) y Pedro Crisolo Morel (32 años): Estudiantes de Ciencias Económicas en Resistencia y militantes judiciales; secuestrados en Claypole y desaparecidos en la Brigada en julio de 1977.
- Marta Liliana Delfino "La Alemana" (32 años): Estudiante de Humanidades de la UNNE y pareja de Mario Roberto Santucho, secuestrada embarazada en Villa Martelli en julio de 1976.
- Fredesvinda Zurama Ferro (43 años) y Juan Carlos García del Val "Flaco" (37 años): Periodistas del Diario Norte, perseguidos por la Triple A en Resistencia y secuestrados en Buenos Aires en 1976-1977.
- Hilda Magdalena García (18 años) y Lelis Nora García (21 años): Militantes chaqueñas oriundas de La Verde; Hilda fue secuestrada frente a la Brigada de Quilmes junto a su bebé Pedro Luis Nadal García.
- Élida Olga Goyeneche (27 años) y Pedro Miguel Sobko (27 años): Estudiantes de Medicina en la UNNE, secuestrados en Goya y Paraná.
- Alejandro Rodolfo Staré (27 años): Estudiante de Ingeniería de la UNNE, secuestrado en Resistencia.
- Máximo Ricardo Wettengel (28 años): Estudiante y militante chaqueño desaparecido en 1976.`,
        quotes: ['«En 2018 la sentencia de la Causa Caballero II condenó a once represores por las torturas y desaparición de Ayala y Morel.»']
      }
    ]
  },

  // 3.2 DIFUSIÓN -> 2 - Educación y dictadura.pdf
  {
    id: 'difusion-edu',
    category: 'difusion',
    buttonLabel: '2. Educación y Dictadura',
    pdfFileName: '2 - Educación y dictadura.pdf',
    driveDownloadUrl: 'https://drive.usercontent.google.com/download?id=1HvUqchu0FNhPWnI1vmq6KAgSoq5V-L4V&export=download',
    driveViewUrl: 'https://drive.google.com/file/d/1HvUqchu0FNhPWnI1vmq6KAgSoq5V-L4V/view?usp=sharing',
    title: 'COLECCIÓN RUV 02: Educación y Dictadura en el Chaco',
    subtitle: 'El Correntinazo de 1969, la Intervención a la UNNE y los Estudiantes Desaparecidos',
    badge: '60 Páginas · Colección RUV N° 02',
    publisher: 'Comisión Provincial por la Memoria del Chaco - Registro Único de la Verdad (RUV)',
    year: 'Edición Oficial RUV Chaco',
    totalPages: 60,
    description: 'Investigación histórica sobre la confluencia entre el movimiento estudiantil y obrero en el Nordeste, comenzando con las protestas de mayo de 1969 que culminaron en el "Correntinazo" y el asesinato de Juan José Cabral, hasta el violento proceso de intervención militar en las facultades de la UNNE en 1976 y el listado completo de alumnos y docentes desaparecidos.',
    context: 'Basado en archivos hemerográficos de los diarios Norte y El Territorio, resoluciones del Ministerio de Educación chaqueño y legajos del Registro Único de la Verdad.',
    keyTopics: [
      'El Correntinazo (mayo de 1969): privatización del comedor de la UNNE y asesinato del estudiante Juan José Cabral.',
      'La alianza obrero-estudiantil con la CGT y el apoyo del clero tercermundista (Uberto Cúberli y Raúl Marturet).',
      'La intervención militar de 1976 en la UNNE por el mayor ingeniero Miguel Antonio Ferrari.',
      'Leyes provinciales 1904 y 1905: cesantías, exoneración de 483 docentes y empleados "prescindibles" y censura bibliográfica.',
      'Nómina oficial y homenaje de los estudiantes y egresados de la UNNE desaparecidos por facultad.',
    ],
    sections: [
      {
        id: 'edu-intro',
        title: '1. Introducción: La Memoria en las Aulas Universitarias',
        page: 'Pág. 9',
        summary: 'Marco institucional y pedagógico del rescate de la memoria en la educación superior chaqueña.',
        content: `La Colección RUV aborda la educación no solo como víctima del terrorismo de Estado, sino como trinchera de lucha colectiva:
- A través del testimonio oral y documental, se reconstruye el proyecto de una universidad popular, científica y abierta al servicio de las necesidades sociales de la región.
- La dictadura atacó con saña al estudiantado chaqueño y correntino precisamente porque representaba la unión solidaria entre los futuros profesionales y las demandas obreras y campesinas.`,
        quotes: ['«La memoria es una herramienta pedagógica para que las nuevas generaciones comprendan por qué luchó aquella juventud.»']
      },
      {
        id: 'edu-correntinazo',
        title: '2. Educación y Dictadura: Del "Correntinazo" de 1969 a la Intervención de 1976',
        page: 'Págs. 11 a 52',
        summary: 'La privatización del comedor, las marchas de Resistencia y Corrientes, el crimen de Cabral y la purga militar.',
        content: `En mayo de 1969, las autoridades interventoras de la UNNE privatizaron los comedores universitarios de Corrientes y Resistencia, triplicando el costo del ticket de comida:
- Los estudiantes de la FAUIN y la Federación Universitaria del Nordeste (FUNNE) convocaron a asambleas masivas y huelgas.
- En Resistencia, los alumnos se instalaron en la Catedral con la protección del párroco Uberto Cúberli, quien al ser increpado por la policía declaró: "Cuando existe violencia de arriba, yo justifico la violencia de abajo".
- El 15 de mayo de 1969, una manifestación de más de 1.000 estudiantes frente al Rectorado en Corrientes fue repelida a balazos por la policía. En la Plaza Cabral cayó muerto de un tiro al corazón el estudiante de medicina Juan José Cabral (22 años).
- La indignación popular provocó paros generales de la CGT, marchas del silencio y la renuncia del rector Walker, desencadenando la chispa que días después estallaría en el Rosariazo y el Cordobazo.

Tras el golpe de marzo de 1976:
- La dictadura nombró interventor de la UNNE al mayor ingeniero Miguel Antonio Ferrari.
- Mediante las leyes 1904 y 1905 se declaró en "prescindibilidad" y se exoneró a más de 483 trabajadores y decenas de docentes por motivos ideológicos.
- Se cerraron carreras, se clausuraron centros de estudiantes y se quemaron libros considerados "peligrosos" en las plazas universitarias.`,
        quotes: [
          '«Cabral debe ser erigido en bandera de una causa noble: pereció por luchar para que la universidad sirva auténticamente al pueblo.» — Diario Norte, mayo 1969',
          '«Se consideraba subversivo el pensamiento crítico, la agremiación estudiantil y la pedagogía de la liberación.»'
        ]
      },
      {
        id: 'edu-desaparecidos-unne',
        title: '3. Estudiantes de la UNNE Desaparecidos por la Dictadura',
        page: 'Págs. 53 a 60',
        summary: 'Nómina oficial y homenaje fotográfico de las víctimas por facultad.',
        content: `El registro oficial de la UNNE y la Comisión Provincial por la Memoria del Chaco documenta a los estudiantes y graduados secuestrados y desaparecidos:
- Facultad de Humanidades: Mónica Judith Almirón, Marcela Esther Molfino, Gladys Noemí Gómez, entre otros.
- Facultad de Ciencias Económicas: Guillermo Amarilla, Lidoro Luis Aragón, Sara Fulvia Ayala, Luis Ángel Díaz, Carlos Alberto Duarte, Raúl Figueredo, Héctor Manuel Navarro, Carlos Zamudio, Roberto Horacio Tapia, Julio Pereira.
- Facultad de Ingeniería: Rosa Noemí Nusbaum, Néstor Alberto Leyes, Juan Carlos Silva, Justo Pastor Pelozo, Enzo Lauroni, Alejandro Rodolfo Staré, Ana Rubel, Jorge Pared.
- Facultad de Arquitectura y Urbanismo: Mario Catena, Fernando Gabriel Piérola, Moisés Ritvo.
- Facultad de Medicina: Élida Olga Goyeneche, Pedro Miguel Sobko, Raúl Méndez.
- Facultad de Derecho (Ciencias Jurídicas): Alfredo Velázquez, Roberto Yedro.
- Facultad de Agronomía: Carlos Héctor Orianki.
- Facultad de Bioquímica y Farmacia: Dora Noriega.

El documento señala asimismo a los autores materiales y cómplices de la persecución universitaria: los comisarios Carlos Alcides Thomas y Wenceslao Ceniquel, y el fiscal federal Roberto Mazzoni.`,
        quotes: ['«Estudiantes que soñaron una universidad abierta al pueblo y pagaron con sus vidas el compromiso con la justicia.»']
      }
    ]
  },

  // 3.3 DIFUSIÓN -> 3 - Identidad.pdf
  {
    id: 'difusion-identidad',
    category: 'difusion',
    buttonLabel: '3. Identidad',
    pdfFileName: '3 - Identidad.pdf',
    driveDownloadUrl: 'https://drive.usercontent.google.com/download?id=1MVsjYmjlW04S5jJd2xMZ4ntncrxtzOsM&export=download',
    driveViewUrl: 'https://drive.google.com/file/d/1MVsjYmjlW04S5jJd2xMZ4ntncrxtzOsM/view?usp=sharing',
    title: 'COLECCIÓN RUV 03: Identidad — Plan Sistemático de Apropiación',
    subtitle: 'El Derecho a la Identidad, Abuelas de Plaza de Mayo y los Casos Vinculados al Chaco',
    badge: '104 Páginas · Colección RUV N° 03',
    publisher: 'Comisión Provincial por la Memoria del Chaco - Registro Único de la Verdad (RUV)',
    year: 'Edición Oficial RUV Chaco',
    totalPages: 104,
    description: 'Investigación exhaustiva sobre la sustracción sistemática de bebés e hijos de detenidos-desaparecidos durante la dictadura militar, la creación del Banco Nacional de Datos Genéticos y del Índice de Abuelidad, el accionar de la CONADI y los casos de nietos restituidos vinculados a la provincia del Chaco.',
    context: 'Elaborado por el Área Identidad del Registro Único de la Verdad (RUV Chaco: Juan Carlos Fernández, Magalí Valetto Claps, Sonia Wyss y Leandro Romero), con sede en Marcelo T. de Alvear 32, Resistencia.',
    keyTopics: [
      'La Identidad como Derecho Humano fundamental y los Artículos 7, 8 y 11 de la Convención de los Derechos del Niño ("Artículos Argentinos").',
      'El plan sistemático de apropiación de menores y las maternidades clandestinas (Campo de Mayo, ESMA, Pozo de Banfield).',
      'La lucha de Abuelas de Plaza de Mayo y la creación del Banco Nacional de Datos Genéticos (BNDG) mediante Ley 23.511.',
      'El rol de la CONADI, UFICANTE y el Área Identidad del RUV Chaco en la búsqueda de los alrededor de 400 nietos que aún faltan.',
      'Casos y testimonios en primera persona de los nietos restituidos vinculados al Chaco: Pedro Nadal García, Guillermo Amarilla Molfino (Nieto 98), Carlos Alberto Goya Martínez Aranda (Nieto 92) y Jorge Castro Rubel.',
    ],
    sections: [
      {
        id: 'id-intro',
        title: '1. Introducción: La Búsqueda de los Alrededor de 400 Nietos que Aún Faltan',
        page: 'Pág. 9',
        summary: 'Marco legal provincial (Ley 5582 / Ley 1412-A) y la labor del Área Identidad del RUV Chaco.',
        content: `La Ley 5582 instituye como misión del Registro Único de la Verdad (RUV) la atención e investigación de casos de menores apropiados durante la dictadura cívico-militar y de sustitución de identidad:
- El documento rinde cuenta del trabajo continuo para hallar a los alrededor de 400 jóvenes (hoy adultos) que crecieron sin conocer su verdadera filiación biológica.
- Plantea la identidad no como un asunto privado del pasado, sino como una violación de derechos humanos continuada en el presente hasta tanto se restituya la verdad.`,
        quotes: ['«El RUV aborda la búsqueda de los 400 nietos que aún faltan: la identidad es un derecho inalienable que no prescribe.»']
      },
      {
        id: 'id-derecho',
        title: '2. La Identidad como un Derecho Humano',
        page: 'Págs. 11 a 23',
        summary: 'Concepto de identidad, derechos civiles y políticos, y la "Cláusula Argentina" en la Convención del Niño.',
        content: `El Derecho a la Identidad es el derecho inalienable de toda persona a saber quién es, conocer su origen biológico, su nombre, su nacionalidad y sus vínculos familiares:
- Derechos civiles y políticos: Protegen la individualidad frente al avasallamiento estatal y aseguran la participación democrática.
- En noviembre de 1989, gracias a la lucha de Abuelas de Plaza de Mayo, la Asamblea de las Naciones Unidas incorporó los artículos 7, 8 y 11 en la Convención Internacional sobre los Derechos del Niño, conocidos mundialmente como los "Artículos Argentinos".
- En Argentina, el Código Civil y Comercial de la Nación (arts. 595 y 596) consagra el derecho de toda persona adoptada a acceder a sus expedientes y conocer la verdad sobre su filiación biológica.`,
        quotes: ['«El derecho a la identidad, plasmado en la Convención Internacional por los Derechos del Niño, nace en Abuelas.» — Estela de Carlotto']
      },
      {
        id: 'id-plan-sistematico',
        title: '3. Violación de los DDHH: El Plan Sistemático de Apropiación de Menores',
        page: 'Págs. 24 a 34',
        summary: 'La sustracción de bebés como doctrina militar de borramiento ideológico y el contexto latinoamericano.',
        content: `Durante la dictadura, las fuerzas armadas consideraron que la ideología de los padres se transmitía por vía familiar, por lo que crearon una red clandestina para apropiarse de los bebés nacidos en cautiverio:
- Cientos de mujeres embarazadas dieron a luz amordazadas y en condiciones infrahumanas en maternidades clandestinas de Campo de Mayo, la ESMA, el Pozo de Banfield y hospitales militares.
- Los bebés eran inscriptos como hijos propios por militares o policías con certificados médicos falsos firmados por médicos cómplices como Jorge Antonio Bergés.
- En 2012, la sentencia judicial histórica del Tribunal Oral en lo Criminal Federal N° 6 de la Capital Federal condenó a los dictadores Videla y Bignone por la comisión de una práctica sistemática y generalizada de sustracción, retención y ocultamiento de menores, catalogándolo como delito continuo e imprescriptible de lesa humanidad.`,
        quotes: [
          '«No hubo ningún acto de beneficencia: fue un plan criminal organizado para robar la identidad de los niños.»'
        ]
      },
      {
        id: 'id-restitucion-organismos',
        title: '4. La Restitución: Abuelas, BNDG, CONADI, UFICANTE y RUV Chaco',
        page: 'Págs. 35 a 50',
        summary: 'Ciencia genética, organismos de derechos humanos y compromiso estatal.',
        content: `- Abuelas de Plaza de Mayo: Surgidas en octubre de 1977, impulsaron la creación del Banco Nacional de Datos Genéticos (BNDG) mediante la Ley 23.511 en 1987.
- El "Índice de Abuelidad": Desarrollado por la científica genetista Dra. Mary-Claire King (Universidad de Berkeley) y Fred Allen, permite determinar con 99,9% de precisión la filiación de los nietos a partir de la sangre de abuelos y tíos.
- Red por la Identidad e H.I.J.O.S. (Comisión HermanXs): Trabajo territorial de difusión y acompañamiento.
- CONADI (Comisión Nacional por el Derecho a la Identidad) y UFICANTE (Unidad Fiscal Especializada): Organismos públicos que reciben consultas espontáneas y cotejan ADN en todo el país.
- Área Identidad del RUV-CPM Chaco: Funciona en Marcelo T. de Alvear 32 (Resistencia). Recibe denuncias, cruza datos del Registro Civil chaqueño y el Hospital Perrando, y acompaña a jóvenes con dudas sobre su origen.`,
        quotes: ['«El día que las Abuelas no estemos físicamente, nuestra sangre estará en el Banco de Datos a la espera de los nietos.» — Estela de Carlotto']
      },
      {
        id: 'id-restituidos-chaco',
        title: '5. Casos de Apropiación Vinculados al Chaco e Identidades Restituidas',
        page: 'Págs. 50 a 100',
        summary: 'Las historias y testimonios de vida de los cuatro nietos restituidos vinculados a la provincia.',
        content: `1. Pedro Luis Nadal García (Restituido el 26/10/2004):
Hijo de Hilda Magdalena García (de La Verde, Chaco) y Jorge Adalberto Nadal. Secuestrado a los 9 meses frente a la Brigada de Quilmes el 5 de marzo de 1976. Fue apropiado por un sargento de la policía bonaerense con certificado falso del médico Bergés. A los 29 años se realizó el ADN y se reencontró con su padre y su hermano Carlos.

2. Guillermo Martín Amarilla Molfino — Nieto N° 98 (Restituido el 30/10/2009):
Hijo de los militantes chaqueños Guillermo Amarilla y Marcela Molfino. Nació en el CCD Campo de Mayo en julio de 1980. Fue apropiado por un agente de inteligencia del Batallón 601. Tras acercarse a CONADI en 2007 y contrastar ADN con sus familiares biológicos en 2009, conoció a sus tres hermanos chaqueños.

3. Carlos Alberto Goya Martínez Aranda — Nieto N° 92 (Restituido el 28/07/2008):
Hijo del chaqueño Francisco Luis Goya ("Oli") y María Lourdes Martínez Aranda. Secuestrado en Mendoza en julio de 1980 con menos de un año de vida. Apropiado por el suboficial Luis Tejada. Tras el cotejo genético, conoció a su familia en Resistencia y a su abuela de 92 años.

4. Jorge Castro Rubel (Restituido el 04/12/2014):
Hijo de la chaqueña Ana Rubel y Hugo Castro. Nació sietemesino en la enfermería clandestina de la ESMA en junio de 1977. Criado por un médico de Casa Cuna. En 2014 recuperó su origen y declaró como testigo y querellante en el megajuicio ESMA III.`,
        quotes: [
          '«No se puede formar una identidad seria o real para ser feliz a partir de la mentira. La verdad te da libertad.» — Guillermo Martín Amarilla Molfino',
          '«Encontré a mi abuela esperándome en el Chaco con su lugar vacío en la mesa desde hacía 30 años.» — Carlos Alberto Goya Martínez Aranda'
        ]
      },
      {
        id: 'id-enlaces',
        title: '6. Enlaces de Interés y Vías de Contacto para Dudas sobre la Identidad',
        page: 'Págs. 101 a 104',
        summary: 'Cómo comunicarse confidencialmente con CONADI, Abuelas y el Área Identidad del RUV Chaco.',
        content: `Si naciste entre 1975 y 1983 y tenés dudas sobre tu identidad, o conocés a alguien que podría ser hijo de desaparecidos:
- Comisión Provincial por la Memoria del Chaco / Registro Único de la Verdad: Marcelo T. de Alvear 32, Resistencia, Chaco.
- Abuelas de Plaza de Mayo: Virrey Cevallos 592, CABA. Tel: (011) 4384-0950. Web: www.abuelas.org.ar
- CONADI (Comisión Nacional por el Derecho a la Identidad): 0800-222-CONADI (266234). Mail: conadi@jus.gov.ar
- Toda consulta es absolutamente confidencial y gratuita.`,
        quotes: ['«Si tenés dudas sobre quién sos, animate a dar el paso: la verdad te está esperando.»']
      }
    ]
  }
];
