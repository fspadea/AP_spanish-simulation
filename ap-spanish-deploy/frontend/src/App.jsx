import React, { useState, useEffect, useRef } from "react";

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null, info: null }; }
  componentDidCatch(error, info) { this.setState({ error, info }); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#0d1a2d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", padding: 40 }}>
          <div style={{ background: "#1a2a3a", borderRadius: 12, padding: 32, maxWidth: 700, width: "100%", border: "2px solid #e74c3c" }}>
            <div style={{ color: "#e74c3c", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16 }}>⚠️ Something went wrong</div>
            <div style={{ color: "#ff9999", fontSize: "0.9rem", marginBottom: 12, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {String(this.state.error)}
            </div>
            <div style={{ color: "#7f8c8d", fontSize: "0.75rem", whiteSpace: "pre-wrap", wordBreak: "break-all", marginBottom: 20, maxHeight: 200, overflow: "auto" }}>
              {this.state.info?.componentStack}
            </div>
            <button onClick={() => window.location.reload()} style={{ background: "#e74c3c", color: "white", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: "1rem" }}>
              🔄 Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Shared Styles ────────────────────────────────────────────────────────────
const cardStyle = {
  background: "white", borderRadius: 12, padding: 20,
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0",
};
const sectionTitle = { margin: "0 0 12px", fontSize: "1rem", fontWeight: 700, color: "#2c3e50" };
const btnStyle = {
  background: "#3498db", color: "white", border: "none", borderRadius: 8,
  padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem",
};

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

// ─── ALL TEST DATA ──────────────────────────────────────────────────────────

// ─── ALL TEST DATA ──────────────────────────────────────────────────────────
const ALL_TESTS = [
  // TEST 0 — 2025 Official
  // ══════════════════════════════════════════════════════════════
  {
    id: "official2025",
    label: "2025 Official Exam",
    year: "AP 2025",
    description: "The real 2025 AP Spanish FRQ — volunteering email, city vs. pueblo essay, talent show conversation, and outdoor public spaces comparison.",
    badge: "Official",
    badgeColor: "#c0392b",
    themes: ["Las familias y las comunidades", "La vida contemporánea", "La belleza y la estética"],
    task1: {
      theme: "Las familias y las comunidades",
      email: {
        from: "Raúl Galindo, Director — Oficina de Voluntariado, Centro Comunitario Municipal",
        subject: "Oportunidades de voluntariado",
        intro: "Este mensaje electrónico es de Raúl Galindo, director de la Oficina de Voluntariado del Centro Comunitario Municipal. Has recibido este mensaje porque quieres colaborar con esta organización en su programa de actividades extraescolares para estudiantes de la escuela primaria.",
        body: `Estimado/a estudiante:

Le agradezco su interés en cooperar con nuestro centro ofreciendo hacer trabajo voluntario.

Con el objetivo de ayudar a los estudiantes de la escuela primaria, nuestra organización ofrece clases de apoyo después del horario escolar. Además, organizamos competiciones deportivas y juegos para quienes acuden al centro. Para poder planificar mejor la colaboración de los voluntarios, nos gustaría recibir la siguiente información:

• ¿En qué actividad o actividades le gustaría participar y por qué?
• ¿Por qué le parece importante hacer este tipo de trabajo voluntario?

Gracias por su interés en colaborar con nuestro centro. En cuanto tengamos su respuesta, podremos organizar el horario de actividades para el resto del año escolar. Si tuviera alguna pregunta, le contestaré con mucho gusto.

Atentamente,
Raúl Galindo, Director
Oficina de Voluntariado
Centro Comunitario Municipal`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Respuesta a ambas preguntas (actividad + importancia del voluntariado)", "Solicitud de más información sobre el programa", "Uso correcto del usted formal", "Variedad léxica y gramatical", "Claridad y organización del texto"],
    },
    task2: {
      theme: "La vida contemporánea",
      topic: "¿Es mejor vivir en un pueblo o en una ciudad?",
      sources: [
        {
          num: 1, title: "Todas las ventajas de vivir en la ciudad, ¿y las desventajas?",
          intro: "Este texto trata de las ventajas de vivir en la ciudad. El artículo original fue publicado el 1 de julio de 2016 en España por el periodista español Álvaro dos Santos en Mi Portal Financiero.",
          text: `Las ventajas de vivir en la ciudad son muchas, pero, sobre todo para los más jóvenes (estudiantes, nuevos trabajadores en búsqueda activa de empleo o familias con necesidad de tener todos los servicios a mano), vivir en una ciudad se les hace imprescindible y no atienden tanto a sus desventajas, como lo harían, por ejemplo, las personas que buscan más paz o más tranquilidad.

EL ACCESO A LOS SERVICIOS
La primera de las grandes ventajas de vivir en la ciudad es el amplio acceso a múltiples servicios, tanto públicos como privados. Los establecimientos más importantes dedicados a la salud —no sólo en España sino en todo el mundo— siempre se encuentran ubicados en grandes ciudades. Por lógica, siempre es mejor que estas instituciones se encuentren lo más cerca posible de la mayor cantidad de personas.

Si hay algo que las grandes ciudades ofrecen, prácticamente por obligación, son amplias redes de transporte. El metro, el tranvía, los buses a constantes horas y los taxis al alcance de la mano son privilegios que solo se consiguen viviendo en una ciudad. En los pueblos, los horarios son mucho más inflexibles, y, por las distancias, el gasto a largo plazo puede llegar a ser lo suficientemente alto como para que resulte más rentable comprarte un coche.

Para quienes tienen hijos, también es innegable que las mayores oportunidades educativas siempre están en las ciudades. No sólo hablamos de más sino de mejores instituciones educativas, que permitirán a nuestros hijos el acceso a la mejor formación posible para tener en el futuro las mejores oportunidades. Por otra parte, los servicios de telecomunicaciones siempre son más accesibles y eficientes en las grandes ciudades, donde la conectividad es una necesidad primordial que marca la manera en que nos comunicamos en todos los ámbitos.

LA MULTICULTURALIDAD
Las grandes ciudades han sido siempre el lugar de destino de una rica y múltiple mezcla de personas y culturas. En cualquier gran ciudad del mundo podrás encontrar colectividades de distintas nacionalidades que no sólo pertenecen a la misma ciudad, sino que la moldean. Hace mucho tiempo dejó de ser inusual el encontrar en una ciudad un espacio donde se expresan diversas culturas extranjeras, ya sea en restaurantes, clubes nocturnos o tiendas.

LAS OPORTUNIDADES LABORALES
Otras de las tantas ventajas de vivir en la ciudad (y una bastante importante) son las oportunidades laborales a las que tienes acceso. En los pueblos más pequeños, las oportunidades educativas suelen ser más limitadas y, como consecuencia de esto, los trabajos a los que terminas teniendo acceso son cada vez menos atractivos.

En las ciudades el anonimato y la privacidad que tengas serán los que tú decidas tener, mientras que en los pueblos, las probabilidades de que tus vecinos sepan quién eres y qué pasa en tu vida (quieras o no) es muchísimo mayor. De ahí el dicho "pueblo pequeño, infierno grande".

Y estas son sólo algunas de las ventajas de la ciudad con respecto a los municipios rurales y el campo. Por eso, vivir en ellas es más caro.`,
        },
        {
          num: 2, title: "Índice de satisfacción en seis ciudades de América Latina",
          intro: "Esta selección trata de la calidad de vida en algunas ciudades. El gráfico original fue publicado el 22 de agosto de 2017 en México por el sitio de Internet Arena Pública.",
          text: `[Datos del gráfico — Índice de satisfacción con la calidad de vida en ciudades latinoamericanas]

• Buenos Aires, Argentina: 6.2 / 10
• Ciudad de México, México: 6.8 / 10
• Bogotá, Colombia: 6.5 / 10
• Lima, Perú: 6.1 / 10
• Santiago, Chile: 7.1 / 10
• Caracas, Venezuela: 4.9 / 10

Factores considerados: seguridad, transporte, servicios de salud, educación, espacios verdes y ocio.
Nota: Santiago presenta el índice más alto de satisfacción, mientras que Caracas muestra el más bajo entre las ciudades evaluadas.`,
        },
        {
          num: 3, title: "¿Cuáles son las ventajas de vivir en un pueblo?",
          intro: "Esta grabación trata de las experiencias de vivir en un pueblo. El informe original fue publicado el 20 de diciembre de 2021 en España por TeleMadrid.es. La grabación dura aproximadamente dos minutos y medio.",
          text: `[Transcripción del audio — TeleMadrid.es, 2021]

"¿Cuáles son las ventajas de vivir en un pueblo? Bueno, no sé lo que hubiera contestado hace años, pero ahora mismo, para mí, todas. Somos mucho más libres. El aire es mucho más limpio. Podemos autogestionarnos. Estamos aprendiendo muchísimo. Nuestra hija se tiró los tres primeros meses abriendo la puerta de casa y gritando 'Soy libre'."

"Se te quita el estrés. Yo cuando llegué noté que la gente andaba muy despacio. Pero es que ahora, cuando vengo a Madrid, veo que los que andan de prisa son los de Madrid."

"Esta facilidad para hacer, por ejemplo, los papeleos, el cambio de ritmo con el que la gente te trata está muy bien. Puedes ir a cualquier parte y la gente como te conoce te trata de otra manera, te trata con otro respeto, con otra tranquilidad."

"Espacio, paz y naturaleza. Esas son las tres principales ventajas de vivir en un pueblo. Espacio no en el sentido de que tengas una casa muy grande, sino en el sentido de que sales de casa y hay espacio. No tienes que girar una calle o algo para ver la línea del horizonte directamente. Hay campo y ya puedes ver el cielo, puedes ver las estrellas, incluso también, que es algo que en las grandes ciudades no se ve."

"La calidad del aire, la calidad del agua, la calidad de relaciones humanas, la comida, el silencio."

"Y respiramos aire puro, cosa que en una ciudad hoy en día no, y el silencio que escuchamos, el mayor ruido que podemos escuchar es el del silencio, el gallo, los perros cuando pasean."

"Yo me levanto todas las mañanas y me despiertan los pájaros. No me despierta el chu chu chu del semáforo."

"Para practicar deporte lo podemos hacer al aire libre. Por ejemplo, a mí me encanta el senderismo y voy por los caminos y por las rutas que hay en mi pueblo."

"Nosotros, pues por el mismo precio de alquiler de un apartamento en Madrid, cerca del río Manzanares, pues por el mismo precio prácticamente estamos viviendo ahora en una casa, en un chalet, tenemos varias habitaciones, podemos tener visitas que se queden a dormir, con piscina, con un jardincito. Es otra calidad de vida, nada que ver."`,
        },
      ],
      rubric: ["Posición clara sobre si es mejor vivir en pueblo o ciudad", "Integración y cita apropiada de las tres fuentes", "Organización en párrafos con introducción y conclusión", "Corrección gramatical y léxico variado", "Argumentación lógica con ejemplos concretos de las fuentes"],
    },
    task3: {
      theme: "La belleza y la estética",
      intro: "Esta es una conversación con tu amiga Sol. Vas a participar en esta conversación porque van a colaborar con la organización de un concurso de talentos para recaudar fondos para la escuela.",
      turns: [
        { id: "3a", speaker: "Sol", text: "Hola. Te llamo para organizar la competencia de talentos para la escuela. ¡Hay tanto que hacer! ¿A quién deberíamos invitar a participar en el concurso?", hint: "Di quiénes deberían participar en el concurso de talentos y por qué — incluye detalles específicos" },
        { id: "3b", speaker: "Sol", text: "¡Buenas ideas! Hay algunos que opinan que la competencia se debería enfocar sólo en la música. Pero yo creo que sería mejor incluir todo tipo de talentos. ¿Qué piensas tú?", hint: "Comparte tu opinión sobre si el concurso debe incluir solo música o todos los talentos, y explica tu razonamiento" },
        { id: "3c", speaker: "Sol", text: "Estoy de acuerdo. Oye, ¿y cómo tienes pensado colaborar en la competencia?", hint: "Explica específicamente cómo planeas ayudar a organizar el concurso de talentos" },
        { id: "3d", speaker: "Sol", text: "Genial. Todo el grupo prefiere hacer el concurso al aire libre, pero ¿qué hacemos si llueve?", hint: "Propón soluciones concretas para el problema de la lluvia durante el evento al aire libre" },
        { id: "3e", speaker: "Sol", text: "Tienes razón. Ojalá que saquemos mucho dinero con la venta de los boletos. ¿Cómo podríamos utilizar ese dinero para nuestra escuela?", hint: "Sugiere ideas específicas sobre cómo usar el dinero recaudado para beneficiar a la escuela" },
      ],
    },
    task4: {
      theme: "La vida contemporánea",
      topic: "¿Qué rol tienen los espacios públicos al aire libre (por ejemplo, parques, plazas, mercados, etc.) en una comunidad del mundo hispanohablante que te sea familiar? Compara el rol que tienen en una región del mundo hispanohablante que te sea familiar con el rol que tienen en tu comunidad o en otra comunidad. En tu presentación, puedes referirte a lo que has estudiado, experimentado, observado, etc.",
      rubric: ["Comparación clara entre una comunidad hispanohablante y la propia o alternativa", "Demostración de comprensión de aspectos culturales específicos", "Presentación organizada y bien estructurada", "Uso apropiado del vocabulario y expresiones en español", "Ejemplos concretos y análisis de semejanzas y diferencias culturales"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // TEST 1 — 2024 Official
  // ══════════════════════════════════════════════════════════════
  {
    id: "official2024",
    label: "2024 Official Exam",
    year: "AP 2024",
    description: "The real 2024 AP Spanish FRQ — Hispanic Heritage Month email, university funding essay, travel project conversation, and popular celebrations comparison.",
    badge: "Official",
    badgeColor: "#c0392b",
    themes: ["Las familias y las comunidades", "La vida contemporánea"],
    task1: {
      theme: "Las familias y las comunidades",
      email: {
        from: "Alejandra Montoya, Directora — Academia José Martí",
        subject: "Mes de la Herencia Hispana",
        intro: "Este mensaje electrónico es de la directora de tu escuela, Alejandra Montoya. Has recibido este mensaje porque la directora necesita sugerencias de los alumnos para celebrar el Mes de la Herencia Hispana.",
        body: `Estimado/a estudiante:

Desde el 15 de septiembre hasta el 15 de octubre, se celebra el mes de la Herencia Hispana en nuestra escuela con programas especiales, exposiciones y actos dedicados a esta celebración. Habrá muestras de arte y fotografía, así como conferencias sobre la historia y las tradiciones de la población latina en los Estados Unidos, entre otras actividades. En la celebración de este año, nos gustaría destacar la contribución de las comunidades latinas en los Estados Unidos.

Teniendo en cuenta su perspectiva como estudiante en nuestra escuela, me dirijo a usted para pedirle ideas que nos permitan apreciar los logros de las comunidades latinas en los Estados Unidos. Le invito a que responda a las siguientes preguntas para ayudarnos con esta iniciativa:

• ¿Qué actividad sería importante incluir en la celebración de este año y por qué?
• ¿Cómo podríamos animar a nuestra comunidad a participar en la celebración del mes de la Herencia Hispana?

De antemano le agradezco su colaboración. Por favor, comuníquese conmigo para cualquier pregunta o duda que tenga.

Atentamente,
Alejandra Montoya, Directora
Academia José Martí`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Propuesta de actividad específica con justificación", "Sugerencia de cómo animar a la comunidad a participar", "Solicitud de más información sobre la celebración", "Uso del usted formal consistente", "Léxico apropiado al contexto cultural"],
    },
    task2: {
      theme: "Las familias y las comunidades",
      topic: "¿Debería ser gratuita la educación universitaria para todos los estudiantes?",
      sources: [
        {
          num: 1, title: "La Universidad es para ti, la factura para todos",
          intro: "Este texto trata de los gastos de la educación universitaria. El artículo original fue publicado el 27 de octubre de 2010 en España por Patricia Tubella para el diario El País.",
          text: `¿Deben pagar más los estudiantes universitarios por sus matrículas? ¿Deben pagar más solo los que suspendan, como se ha planteado en España? Para distintos sectores, la respuesta es que los universitarios, al menos algunos, tienen que aportar más dinero a su universidad. Primero, porque si fuera más caro estudiar, los alumnos se esforzarían más (en España, un 30% de los alumnos abandonan después de dos años sin obtener titulación alguna y solo un 30% acaba la licenciatura de cuatro años en el periodo previsto).

Asimismo, cobrar más a los que pueden pagarlo, dando ayudas realmente adecuadas a quien las necesita sería más justo que subvencionar a todos por igual. En esta corriente estarían economistas como Jose-Ginés Mora o José García Montalvo, quien resalta que la mayor parte del beneficio de los estudios universitarios es privado (es decir, el título redunda en mejores condiciones de trabajo y mejores sueldos individuales).

En contra, argumentos que aconsejan no mezclar en el debate tasas y becas, porque tienen misiones, procedencias y destinos diferentes. Y porque con las subidas de las matrículas "los más afectados no son los más ricos, sino los que están en el límite donde las becas no alcanzan", es decir, las clases medias, escribía en un artículo de opinión el pasado mayo el catedrático de Sociología de la Universidad Complutense Julio Carabaña.

"Es importante situar el debate de las matrículas en una discusión más amplia sobre la financiación de la Universidad y la importancia de que diversifiquen la procedencia de sus ingresos para garantizar su sostenibilidad a largo plazo", dice el secretario general de la Asociación Europea de Universidades (EUA, en inglés), Lesley Wilson. Pero el 75% de los ingresos de los campus públicos europeos procede de los Estados.

Wilson explica que esas subvenciones no deben bajar, pero que las universidades han de aumentar sus ingresos por investigación privada, a través de la filantropía y antiguos alumnos, la formación permanente y otras actividades comerciales. Pero la crisis económica sí ha bajado esa aportación estatal, con recortes presupuestarios. Y eso ha reavivado el debate de las matrículas. "Está clara la necesidad de incrementar la financiación de la educación superior para mantener el ritmo de la demanda y no poner en peligro la calidad. Esa financiación puede be de dinero público o de fuentes privadas. Cada Estado miembro tendrá que revisar su estructura y elegir lo más adecuado."`,
        },
        {
          num: 2, title: "La deuda estudiantil en Chile",
          intro: "Este texto trata de la deuda estudiantil en Chile. El gráfico fue publicado el 4 de mayo de 2018 por Fernando Vega con datos de la Superintendencia de Bancos e Instituciones Financieras de Chile.",
          text: `[Datos del gráfico — Deuda estudiantil en Chile]

• Deuda total estudiantil en Chile: más de 8.000 millones de dólares
• Porcentaje de estudiantes con deuda: 70% de los universitarios chilenos
• Promedio de deuda por estudiante: 20.000 dólares aproximadamente
• Tiempo promedio para pagar la deuda: 15–20 años después de graduarse
• Tasa de interés promedio de créditos universitarios: entre 5.6% y 8% anual

Chile tiene uno de los sistemas de educación universitaria más costosos de América Latina en relación al ingreso per cápita. Las reformas recientes han intentado aumentar la gratuidad para familias de bajos recursos, pero la deuda estudiantil sigue siendo un problema grave para la clase media.`,
        },
        {
          num: 3, title: "La educación superior en Colombia",
          intro: "Esta grabación trata de la educación pública. El informe fue publicado el 13 de octubre de 2011 en Colombia por la Federación Nacional de Profesores Universitarios (FENALPROU). La grabación dura aproximadamente tres minutos.",
          text: `[Transcripción del audio — FENALPROU, Colombia, 2011]

"Toda persona tiene derecho a la educación." Artículo 26 de la Declaración Universal de los Derechos Humanos. La educación es un derecho de la persona y un servicio público que cumple una función social. Con ella se busca el acceso al conocimiento, a la ciencia, a la técnica y a todos los bienes y valores de la cultura.

En 1990 el 85% del presupuesto de las universidades públicas lo asumía el estado. En 2008 solo el 49%. En el 2009 Colombia invirtió en gasto militar, 3.7% del producto interno bruto. En educación 0.69%. En 1993 por cada estudiante el gobierno nacional aportaba 5 millones 700 mil pesos. En el año 2008 aportó 3 millones 700 mil pesos. El estado colombiano gasta anualmente en un soldado 18 millones de pesos. En un interno de cárcel 13 millones 500 mil, y en un estudiante 3 millones 515 mil pesos.

La financiación de la universidad pública debe ser una obligación del estado. De la excelencia de la educación universitaria y de la investigación que ella propicia depende el futuro del país. La construcción de una sociedad más solidaria y democrática depende de la educación. La naturaleza pública de la universidad hace así que la nación pueda usufructuar los productos del conocimiento y ser más competitiva como sociedad en el contexto mundial. La educación de excelencia solo es posible si el estado asume seriamente su financiación. Entendiendo que al igual que la salud, es un derecho fundamental. Una fuerte inversión en educación pública no solo propicia el crecimiento económico, sino la construcción de sociedades más igualitarias y más democráticas.

La privatización de la educación convierte automáticamente a las universidades en empresas comerciales. Por tanto, obedecen a una lógica mercantil. La ciencia y la innovación no pueden depender del ciclo de la economía. Cuando se vincula el valor de la matrícula a los costos y el monto de los créditos educativos, se condiciona a la capacidad de pago de los individuos y genera una gran inequidad. El modelo de financiación propuesto en la actual reforma no permitirá alcanzar la calidad y cobertura que el país requiere. La educación es un derecho, no una mercancía. La educación no es un servicio, tampoco un privilegio. Es un derecho fundamental.`,
        },
      ],
      rubric: ["Posición clara sobre la gratuidad universitaria", "Integración y cita de las tres fuentes", "Paragrafación lógica con introducción y conclusión", "Corrección gramatical y vocabulario académico", "Argumentación equilibrada con datos de las fuentes"],
    },
    task3: {
      theme: "La vida contemporánea",
      intro: "Esta es una conversación con Izel, una compañera de la escuela. Vas a participar en esta conversación porque ustedes están colaborando en un proyecto para la clase de español en el que tienen que planear un viaje a un país hispanohablante.",
      turns: [
        { id: "3a", speaker: "Izel", text: "¡Hola! ¿Qué tal? Necesitamos preparar el proyecto sobre un viaje a un país hispanohablante. En tu opinión, ¿qué país podemos escoger para el proyecto y por qué?", hint: "Sugiere un país hispanohablante y da razones específicas para tu elección" },
        { id: "3b", speaker: "Izel", text: "De acuerdo, me parece muy bien. Ahora, en el proyecto tenemos que proponer dónde nos quedaríamos. ¿Crees que sería mejor en un hotel o en casas de familias?", hint: "Explica tu preferencia entre hotel o casas de familias, con razones detalladas" },
        { id: "3c", speaker: "Izel", text: "Ahh, tienes razón. En el proyecto hay que crear un itinerario para explorar el país. ¿Qué actividades podríamos incluir?", hint: "Propón varias actividades concretas para el itinerario del viaje" },
        { id: "3d", speaker: "Izel", text: "Qué buenas ideas. Pero mira, estoy preocupada porque tenemos que entregar el proyecto mañana y no sé si lo vamos a poder terminar a tiempo. ¿Qué podemos hacer?", hint: "Ofrece soluciones concretas para terminar el proyecto a tiempo" },
        { id: "3e", speaker: "Izel", text: "Sí, buena idea. Por cierto, ¿qué sugerencias tienes para hacer más interesante la presentación del proyecto a la clase?", hint: "Sugiere formas creativas de hacer la presentación más atractiva e interactiva" },
      ],
    },
    task4: {
      theme: "Las familias y las comunidades",
      topic: "¿Qué papel tienen las celebraciones populares (por ejemplo, las fiestas patrias, los carnavales, los desfiles, etc.) en una comunidad del mundo hispanohablante que te sea familiar? Compara el papel que tienen en una región del mundo hispanohablante que te sea familiar con el papel que tienen en tu comunidad o en otra comunidad. En tu presentación, puedes referirte a lo que has estudiado, vivido, observado, etc.",
      rubric: ["Comparación clara de celebraciones populares entre dos comunidades", "Conocimiento específico de tradiciones de la comunidad hispanohablante", "Presentación bien organizada y fluida", "Vocabulario apropiado al tema cultural", "Análisis de diferencias y semejanzas con ejemplos concretos"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // TEST 2 — 2023 Official
  // ══════════════════════════════════════════════════════════════
  {
    id: "official2023",
    year: "AP 2023",
    label: "2023 Official Exam",
    description: "Official College Board free-response questions: scholarship email reply, academic achievement essay, film festival conversation, and ecological habits cultural comparison.",
    themes: ["La belleza y la estética", "Los desafíos mundiales"],
    badge: "Official",
    badgeColor: "#c0392b",
    task1: {
      theme: "La belleza y la estética",
      email: {
        from: "Clara Martínez, directora de Fundación Arte y Vida",
        subject: "Becas de investigación",
        intro: "Este mensaje electrónico es de Clara Martínez, directora de Arte y Vida, una fundación privada que ofrece oportunidades a estudiantes de secundaria para que realicen un proyecto de investigación en un país de habla hispana. Has recibido este mensaje porque estás entre las personas finalistas para obtener una beca.",
        body: `Estimado/a estudiante:

Muchas gracias por su interés en nuestra oferta de becas para estudiantes de nivel secundario que quieran aprender más sobre el arte, la arquitectura o la historia de un país hispanohablante en el verano. Como usted sabe, Fundación Arte y Vida es una organización sin fines de lucro que busca promover el estudio de estas materias y crear lazos culturales entre la juventud.

Queremos informarle que usted está entre las personas finalistas de este año.

Para hacer la selección final, le pedimos que nos envíe la siguiente información adicional:

• En caso de poder elegir, ¿en qué país hispanohablante desearía hacer sus estudios y por qué?

• ¿Cuál de las tres disciplinas académicas antes mencionadas (arte, arquitectura o historia) es de mayor interés para usted? Explique dando detalles del porqué de su elección.

El Consejo de la Fundación se reunirá el mes próximo para elegir a las personas que recibirán las becas. Mientras tanto, no dude en escribirme si tiene cualquier pregunta.

Atentamente,
Clara Martínez
Directora
Fundación Arte y Vida`,
      },
      rubric: ["Saludo y despedida formales apropiados", "Responde sobre el país hispanohablante elegido con razones detalladas", "Explica la disciplina académica de mayor interés con detalles convincentes", "Solicita más información sobre algún aspecto mencionado", "Registro formal y vocabulario variado"],
    },
    task2: {
      theme: "La vida contemporánea",
      topic: "¿Es la capacidad intelectual el factor más importante para el éxito académico?",
      sources: [
        {
          num: 1, title: "No todo es talento",
          intro: "Este texto trata de los factores que contribuyen a los buenos resultados del rendimiento académico y al éxito en la vida. El artículo original fue publicado el 7 de agosto de 2016 en una revista digital en Colombia.",
          text: `No todo es talento

Una psicóloga señala que el mejor predictor del éxito no es la inteligencia, sino la perseverancia y la pasión que se le ponga a ese objetivo.

Cuando le preguntan por el factor primordial de su triunfo como actor y músico, Will Smith contesta que no es ni el talento ni la inteligencia sino la determinación de trabajar con más ahínco que cualquiera y no darse por vencido.

Según Angela Duckworth, una psicóloga de la Universidad de Pensilvania, el temple —que ella define como una mezcla de pasión y perseverancia— es el factor que predice el éxito con mayor exactitud, incluso más que el coeficiente intelectual. "Esta medida le gana al coeficiente intelectual y a las pruebas de conocimiento en la predicción de quiénes van a tener éxito en ciertas situaciones", dice.

La autora se interesó por este tema cuando era profesora de matemáticas de séptimo grado y observó que los niños más inteligentes y dotados no siempre tenían mejores notas, al tiempo que aquellos que parecían tener más dificultades terminaban de primeros porque le dedicaban más tiempo y esfuerzo a aprender.

Para Duckworth el temple es el término opuesto de renunciar y un sinónimo de perseverar con pasión a largo plazo. Como lo dice en su libro, "es tener una actitud de 'no me doy por vencido'" o una pose de pelear hasta el final frente a los retos. En una entrevista al diario The Washington Post, lo definió de manera sucinta como 'aguante' pues considera que en el corazón de la palabra está el concepto de adherirse a un reto, y no soltarlo a pesar de las piedras que surjan en el camino.

En resumen, los que logran el éxito, no importa en qué disciplina, tienen una determinación de hierro que funciona en dos vías: por un lado, son trabajadores y resilientes; y por otro lado, tienen muy claro lo que quieren lograr.

Su teoría ha sido objeto de críticas. Algunos lo han visto como un viejo concepto disfrazado en una nueva palabra. Pero una de las críticas más fuertes es que tener temple suele confundirse con ser disciplinado, uno de los cinco rasgos básicos de la personalidad. Aunque ella acepta la crítica, piensa que la disciplina encierra características diferentes al temple como el orden, la puntualidad y la confiabilidad. El temple sería una faceta más de la disciplina y la que mejor predice el éxito en los logros exigentes y significativos.`,
        },
        {
          num: 2, title: "Factores que influyen en los resultados académicos",
          intro: "Esta selección trata de la percepción que tienen los profesores de los factores que influyen en los resultados académicos de los estudiantes. El gráfico fue publicado el 31 de enero de 2014 en Cuba por Yaritza García Ortiz y Yileny Cruz Pacheco, Universidad de Ciencias Médicas de Villa Clara.",
          text: `[Datos del gráfico — Factores que influyen en los resultados académicos]

• Motivación por el estudio: 55
• Habilidades para aprender: 52
• Coeficiente intelectual: 48
• Motivación por la carrera: 45
• Administración del tiempo: 44
• Capacidad de memoria: 42
• Capacidad de atención: 40
• Inteligencia interpersonal: 36
• Ausencia de problemas: 32
• Relaciones profesor-alumno: 30
• Rendimiento anterior: 28
• Estrés académico: 18

Fuente: Encuesta a 60 docentes, Universidad de Ciencias Médicas de Villa Clara, Cuba (2014). De 60 profesores encuestados, la motivación por el estudio fue el factor más valorado, seguido de las habilidades para aprender y el coeficiente intelectual.`,
        },
        {
          num: 3, title: "El rendimiento académico",
          intro: "Esta grabación trata del rendimiento académico. La presentación original fue publicada el 9 de abril de 2012 en Trujillotv.com por Luis A. Vera Cruzado. La grabación dura aproximadamente dos minutos y medio.",
          text: `[Transcripción del audio — Trujillotv.com, 2012]

Gusto en saludarlos, el día de hoy estamos para compartir con ustedes un tema muy interesante que es el rendimiento académico. Generalmente está asociado al niveles de desarrollo académico, escolar, e incluso en la misma universidad. Los chicos tienen que asumir una tarea y un compromiso que está asociado a una evaluación en cada cierto tiempo y obviamente, este tipo de rendimiento debe estar acorde con los requerimientos de cada materia. Fundamentalmente uno de los que más inquieta es aquel estudiante que se distrae con facilidad, llamémosle así preocupado por algunas circunstancias y momentos que puede estar experimentando y lastimosamente no se concentra en lo que está estudiando.

Ahora hay que tener en cuenta que hay una gran diferencia entre lo que es el rendimiento académico y el nivel intelectual, porque hay personas, jóvenes, o chicos o niños que tienen una inteligencia bastante alta, o incluso promedio y lastimosamente el rendimiento académico es bajo. Bueno, fundamentalmente lo que más influye son los factores emocionales.

Las inteligencias múltiples es un detalle sumamente interesante e importante porque muchos padres lastimosamente creen que solamente el rendimiento académico debe estar enfocado en cuanto a lo que es las notas en el colegio y obviamente que hay una serie de aspectos y factores personales que su hijo o la persona, el individuo puede tener, como por ejemplo en las artes plásticas, como por ejemplo en la música o como por ejemplo deportivas, que él podría o ella podría también desempeñar.

Hay que recordar que hay una serie de estudios, investigaciones que nos permiten, nos indican de que el joven o la estudiante que ha permitido o tiene la posibilidad de desarrollarse tanto en el deporte como en cualquier actividad artística o musical y le va a dar lugar a que su desarrollo de inteligencia sea más firme, más estable, más seguro y descubran cada uno sus capacidades.`,
        },
      ],
      rubric: ["Posición clara y defendida sobre los factores del éxito académico", "Integración de las tres fuentes con citas y referencias específicas", "Argumentación lógica con ejemplos concretos", "Vocabulario académico variado y preciso", "Estructura clara con introducción, desarrollo y conclusión"],
    },
    task3: {
      theme: "La belleza y la estética",
      intro: "Esta es una conversación con Mariano, el presidente del club de cine. Vas a participar en esta conversación porque están organizando un festival de cine en la escuela.",
      turns: [
        { id: "3a", speaker: "Mariano", text: "¡Hola! Me alegra que podamos hablar sobre el festival de cine en la escuela. ¿Qué tipos de películas piensas que podemos incluir y por qué?", hint: "Sugiere tipos de películas específicas para el festival con razones detalladas" },
        { id: "3b", speaker: "Mariano", text: "Muy bien, con esas ideas tendríamos bastantes opciones para elegir. Y ya que es un evento nuevo, ¿cómo podemos promocionarlo para que venga mucha gente?", hint: "Propón estrategias concretas de promoción para atraer al público" },
        { id: "3c", speaker: "Mariano", text: "Sí, genial. Mira, tenemos que preparar una presentación sobre cada película para que nuestros compañeros las entiendan mejor. ¿Qué información podemos incluir y por qué?", hint: "Explica qué información sería más útil en las presentaciones de cada película" },
        { id: "3d", speaker: "Mariano", text: "Perfecto. Y, además, quizás alguno de los maestros pueda ayudarnos con el evento. ¿Cómo crees que nos pueden ayudar?", hint: "Sugiere formas específicas en que los maestros pueden apoyar el festival de cine" },
        { id: "3e", speaker: "Mariano", text: "Estupendo. ¡Ay! Mirando el calendario veo que el auditorio está ocupado en las fechas en que queríamos hacer el festival. ¿Qué podemos hacer?", hint: "Propón soluciones alternativas para resolver el problema del auditorio ocupado" },
      ],
    },
    task4: {
      theme: "Los desafíos mundiales",
      topic: "¿Qué rol tienen los hábitos ecológicos (por ejemplo, reciclar, usar bicicletas, participar en la limpieza de playas o parques, etc.) en una comunidad del mundo hispanohablante que te sea familiar? Compara el rol que tienen en una región del mundo hispanohablante que te sea familiar con el rol que tienen en tu comunidad o en otra comunidad. En tu presentación, puedes referirte a lo que has estudiado, vivido, observado, etc.",
      rubric: ["Comparación clara de hábitos ecológicos en dos comunidades", "Ejemplos específicos de prácticas ecológicas en el mundo hispanohablante", "Presentación organizada con introducción y conclusión claras", "Vocabulario medioambiental apropiado y variado", "Análisis profundo del impacto cultural y social de los hábitos ecológicos"],
    },
  },

  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-tech",
    label: "Identidad y Tecnología",
    year: "Simulación A",
    description: "A full simulated exam exploring digital identity, social media's impact on youth, AI in education, and the influence of technology on Latino communities.",
    badge: "Sim",
    badgeColor: "#7c3aed",
    themes: ["La ciencia y la tecnología", "La identidad personal y pública", "Los desafíos mundiales"],
    task1: {
      theme: "La ciencia y la tecnología",
      email: {
        from: "Dra. Carmen Fuentes — Directora, Programa de Innovación Juvenil, TecnoFuturo Latino",
        subject: "Solicitud de participación en congreso de jóvenes innovadores",
        intro: "Este mensaje electrónico es de la Dra. Carmen Fuentes, directora del Programa de Innovación Juvenil de TecnoFuturo Latino. Has recibido este mensaje porque solicitaste información sobre el congreso anual de jóvenes innovadores latinoamericanos.",
        body: `Estimado/a estudiante:

Muchas gracias por su interés en el Congreso Anual de Jóvenes Innovadores Latinoamericanos. Este evento reúne a estudiantes de secundaria y universidad de toda América Latina y de comunidades latinas en los Estados Unidos para compartir proyectos relacionados con la tecnología, el medioambiente y el desarrollo social.

El congreso se celebrará durante tres días en la Ciudad de México y los participantes seleccionados recibirán una beca completa que cubre vuelos, alojamiento y comidas. Para poder evaluar su candidatura, necesitamos que responda a las siguientes preguntas:

• ¿Qué proyecto o idea innovadora le gustaría presentar en el congreso y cómo beneficiaría a su comunidad?
• ¿Por qué le parece importante que los jóvenes latinos participen en este tipo de eventos de innovación tecnológica?

Le responderemos dentro de las próximas dos semanas. No dude en comunicarse con nosotros si tiene alguna pregunta.

Atentamente,
Dra. Carmen Fuentes
Directora, Programa de Innovación Juvenil
TecnoFuturo Latino`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Descripción clara del proyecto o idea innovadora", "Explicación de por qué es importante la participación juvenil latina en tecnología", "Solicitud de más información sobre el proceso de selección", "Uso correcto del usted formal", "Léxico relacionado con tecnología e innovación"],
    },
    task2: {
      theme: "La ciencia y la tecnología",
      topic: "¿Las redes sociales tienen más efectos negativos que positivos en la vida de los jóvenes?",
      sources: [
        {
          num: 1, title: "Redes sociales y adolescentes: ¿aliadas o enemigas?",
          intro: "Este artículo fue publicado en octubre de 2023 por la Revista de Psicología Educativa de la Universidad Autónoma de México (UNAM).",
          text: `El uso de las redes sociales entre los adolescentes latinoamericanos ha aumentado de manera exponencial. Según datos de 2023, el 87% de los jóvenes entre 13 y 18 años en México, Argentina y Colombia usan Instagram, TikTok o YouTube más de 3 horas diarias.

Los efectos positivos son notables: las redes sociales permiten a los jóvenes conectarse con comunidades de intereses comunes, acceder a contenido educativo y desarrollar habilidades digitales fundamentales para el mercado laboral del futuro. Plataformas como YouTube han democratizado el acceso al conocimiento, permitiendo que jóvenes de regiones remotas accedan a tutoriales, conferencias y materiales educativos.

Sin embargo, investigaciones recientes señalan una correlación entre el uso excesivo de redes sociales y el aumento de la ansiedad, la depresión y los problemas de autoimagen entre los adolescentes. El fenómeno de la "comparación social" — compararse constantemente con las versiones idealizadas de la vida que otros presentan en línea — genera una percepción distorsionada de la realidad.

Los expertos recomiendan un uso consciente y equilibrado: limitar el tiempo de pantalla, seguir cuentas que generen bienestar, y mantener relaciones significativas también fuera del mundo digital.`,
        },
        {
          num: 2, title: "Uso de redes sociales entre jóvenes hispanohablantes (2023)",
          intro: "Gráfico publicado en 2023 por el Centro de Investigación de Medios Digitales de América Latina (CIMDAL).",
          text: `[Datos del gráfico — Impacto de las redes sociales en jóvenes (13–25 años)]

Plataformas más usadas por jóvenes latinoamericanos:
• TikTok: 78% de usuarios entre 13–25 años (promedio 2.4 horas/día)
• Instagram: 71% (promedio 1.8 horas/día)
• YouTube: 89% (promedio 2.1 horas/día)
• WhatsApp: 94% (principalmente comunicación familiar)

Efectos reportados por los propios jóvenes:
• Se sienten más informados: 68%
• Sienten presión por su apariencia física: 54%
• Han aprendido habilidades nuevas a través de plataformas: 61%
• Reportan sentirse "adictos" al teléfono: 47%
• Han tenido experiencias negativas de cyberbullying: 23%

Tiempo promedio de uso diario: 4.5 horas (todos dispositivos combinados)`,
        },
        {
          num: 3, title: "Voces jóvenes: el debate sobre las redes sociales",
          intro: "Esta grabación es un debate estudiantil sobre el impacto de las redes sociales, producido por Radio Universitaria de Buenos Aires en 2023. Duración: aproximadamente dos minutos.",
          text: `[Transcripción del debate — Radio Universitaria Buenos Aires]

Moderadora: "Hoy debatimos: ¿Las redes sociales perjudican más de lo que ayudan a los jóvenes? Valentina, ¿cuál es tu posición?"

Valentina (a favor de efectos negativos): "Definitivamente. Yo dejé Instagram por seis meses y mi ansiedad bajó notablemente. Las redes nos venden una vida perfecta que no existe. Pasamos horas comparándonos con influencers que tienen equipos de fotografía y filtros. Eso destruye la autoestima."

Martín (a favor de efectos positivos): "Pero hay que ver también el otro lado. Yo aprendí a programar gratis en YouTube. Conozco comunidades de astronomía, de escritura creativa, de robótica. Las redes me conectaron con personas de todo el mundo que comparten mis intereses. Sin internet, yo, viviendo en un pueblo pequeño de la Patagonia, jamás habría tenido esas oportunidades."

Valentina: "El problema no es la tecnología en sí, sino cómo se usa. Las plataformas están diseñadas para generar adicción. Los algoritmos nos muestran lo que más nos engancha, no lo que más nos beneficia."

Martín: "En eso tienes razón. Necesitamos educación digital, no prohibición."`,
        },
      ],
      rubric: ["Tesis clara sobre el impacto de las redes sociales en los jóvenes", "Integración de las tres fuentes con citas apropiadas", "Estructura argumental con párrafos bien desarrollados", "Vocabulario tecnológico y psicológico apropiado", "Posición matizada apoyada en evidencia de las fuentes"],
    },
    task3: {
      theme: "La identidad personal y pública",
      intro: "Esta es una conversación con tu amigo Diego, un estudiante de intercambio de México que está en tu escuela este año. Diego está explorando el tema de la identidad cultural latina en los Estados Unidos para un proyecto escolar.",
      turns: [
        { id: "3a", speaker: "Diego", text: "Oye, estoy trabajando en un proyecto sobre la identidad latina en los Estados Unidos. ¿Cómo describes tu identidad cultural y qué significa para ti ser parte de una comunidad hispana o latinoamericana?", hint: "Describe tu identidad cultural de manera auténtica y reflexiva, con detalles específicos" },
        { id: "3b", speaker: "Diego", text: "Interesante. ¿Crees que las redes sociales y la tecnología han cambiado la manera en que los jóvenes latinos mantienen su cultura e idioma en los Estados Unidos?", hint: "Analiza el papel de la tecnología en la preservación (o erosión) de la identidad cultural latina" },
        { id: "3c", speaker: "Diego", text: "Tiene sentido. A veces en México vemos que los latinos en EE.UU. pierden el español. ¿Cómo mantienes el idioma español en tu vida diaria y por qué lo consideras importante?", hint: "Explica tus estrategias personales para mantener el español y su importancia para ti" },
        { id: "3d", speaker: "Diego", text: "¿Y en tu escuela hay programas que apoyen a los estudiantes latinos? ¿Cómo podría mejorarse la educación para celebrar mejor la diversidad cultural?", hint: "Describe programas existentes o propón mejoras concretas para la educación multicultural" },
        { id: "3e", speaker: "Diego", text: "Muchas gracias. Una última pregunta: si pudieras cambiar algo sobre cómo la sociedad estadounidense percibe a la comunidad latina, ¿qué sería?", hint: "Comparte una reflexión personal sobre percepciones estereotipadas y cómo cambiarlas" },
      ],
    },
    task4: {
      theme: "La ciencia y la tecnología",
      topic: "¿Cómo ha influido la tecnología digital en los hábitos culturales y las tradiciones de una comunidad hispanohablante que conoces bien? Compara esos cambios con los que has observado en tu propia comunidad o en otra comunidad de tu elección. En tu presentación, puedes referirte a lo que has estudiado, experimentado u observado.",
      rubric: ["Comparación clara del impacto tecnológico entre dos comunidades", "Ejemplos específicos de cambios culturales relacionados con la tecnología", "Presentación organizada con análisis profundo", "Vocabulario apropiado sobre tecnología y cultura", "Reflexión matizada sobre los cambios positivos y negativos"],
    },
  },

  // ══════════════════════════════════════════════════════════════
  // Simulation B — Medio Ambiente y Sostenibilidad
  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-environment",
    label: "Medio Ambiente y Sostenibilidad",
    year: "Simulación B",
    description: "A full simulated exam on environmental challenges, eco-tourism in Latin America, climate activism among youth, and sustainable development.",
    badge: "Sim",
    badgeColor: "#7c3aed",
    themes: ["Los desafíos mundiales", "Las familias y las comunidades", "La vida contemporánea"],
    task1: {
      theme: "Los desafíos mundiales",
      email: {
        from: "Ing. Roberto Vargas — Coordinador, Programa EcoJóvenes, Ministerio de Medioambiente de Costa Rica",
        subject: "Invitación al Programa de Embajadores Ambientales Juveniles",
        intro: "Este mensaje es del Ing. Roberto Vargas, coordinador del Programa EcoJóvenes del Ministerio de Medioambiente de Costa Rica. Has recibido este mensaje porque participaste en una encuesta sobre conciencia ambiental entre estudiantes internacionales.",
        body: `Estimado/a estudiante:

Con mucho agrado le informo que ha sido preseleccionado/a para participar en nuestro Programa de Embajadores Ambientales Juveniles, una iniciativa que reúne a jóvenes de todo el mundo en Costa Rica durante dos semanas para aprender sobre conservación de la biodiversidad y desarrollo sostenible.

Los participantes seleccionados vivirán con familias costarricenses, visitarán parques nacionales y trabajarán junto a biólogos y conservacionistas. Al final del programa, cada participante diseñará un proyecto de educación ambiental para implementar en su escuela o comunidad.

Para completar su solicitud, necesitamos que responda a las siguientes preguntas:

• ¿Qué problema ambiental específico le preocupa más en su comunidad y por qué?
• ¿Cómo podría aplicar lo que aprenda en Costa Rica para mejorar el medioambiente en su propia comunidad?

Esperamos su respuesta antes del 15 del mes próximo.

Respetuosamente,
Ing. Roberto Vargas
Coordinador, Programa EcoJóvenes
Ministerio de Medioambiente de Costa Rica`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Descripción específica del problema ambiental local", "Plan claro de aplicación de conocimientos aprendidos", "Solicitud de información adicional sobre el programa", "Uso correcto del usted", "Vocabulario ambiental apropiado"],
    },
    task2: {
      theme: "Los desafíos mundiales",
      topic: "¿Es el ecoturismo una solución efectiva para proteger el medioambiente y apoyar el desarrollo económico en América Latina?",
      sources: [
        {
          num: 1, title: "El ecoturismo en América Latina: ¿promesa o problema?",
          intro: "Artículo publicado en 2022 por la Revista de Desarrollo Sostenible de la CEPAL (Comisión Económica para América Latina y el Caribe).",
          text: `El ecoturismo se ha convertido en una de las industrias de mayor crecimiento en América Latina. Costa Rica, Ecuador, Colombia y Perú reciben millones de visitantes al año atraídos por su biodiversidad excepcional.

Los defensores del ecoturismo argumentan que crea incentivos económicos para conservar la naturaleza. Cuando las comunidades locales pueden generar ingresos de manera sostenible a través del turismo, tienen menos motivos para explotar los recursos naturales de manera destructiva. En Costa Rica, el 25% del territorio está protegido y el ecoturismo genera más de 3.500 millones de dólares anuales.

Sin embargo, los críticos señalan que el ecoturismo mal gestionado puede destruir los ecosistemas que pretende proteger. La presencia masiva de turistas en zonas sensibles puede alterar el comportamiento de los animales, contaminar fuentes de agua y crear una dependencia económica frágil. En las Islas Galápagos, el crecimiento turístico ha introducido especies invasoras que amenazan la fauna endémica.

El desafío está en encontrar un modelo de ecoturismo verdaderamente sostenible, controlado y beneficioso para las comunidades locales, no solo para las empresas internacionales de turismo.`,
        },
        {
          num: 2, title: "Ecoturismo en América Latina: estadísticas clave (2022)",
          intro: "Infografía publicada por la Organización Mundial de Turismo (OMT) y el Programa de Naciones Unidas para el Medioambiente (PNUMA) en 2022.",
          text: `[Datos del gráfico — Ecoturismo en América Latina]

• Costa Rica: 3800
• Ecuador (Galápagos): 418
• Colombia: 1200
• Perú (Amazonia): 1100
• México (Yucatán): 2400`,
        },
        {
          num: 3, title: "Voces desde la Amazonia: el debate del ecoturismo",
          intro: "Esta grabación proviene de un reportaje de Radio ONU publicado en 2022 sobre comunidades indígenas y el ecoturismo en la Amazonia peruana. Dura aproximadamente dos minutos.",
          text: `[Transcripción del audio — Radio ONU, Reportaje sobre ecoturismo en Perú]

Elena Sinuhe: Para nosotros, los shipibo-konibo, el bosque es nuestra farmacia, nuestra biblioteca, nuestro templo. Durante mucho tiempo, los extranjeros venían y tomaban fotos de nosotros como si fuéramos animales de zoológico. Eso no era ecoturismo, era explotación disfrazada de turismo sostenible.

Marco Rivas: El modelo que defendemos nosotros es el turismo comunitario. Los visitantes pagan para vivir con nosotros, aprender nuestras técnicas de pesca y artesanía, conocer la medicina tradicional. El 100% del dinero se queda en la comunidad. Llevamos cinco años con este modelo y ha funcionado.

Dra. Adriana Flores: El problema real es quién controla el ecoturismo. Si son empresas de Lima o de Europa, el dinero se va. Si son las propias comunidades, el dinero se queda y hay verdadero incentivo para conservar el bosque.`,
        },
      ],
      rubric: ["Posición clara sobre la efectividad del ecoturismo", "Integración crítica de las tres fuentes", "Estructura argumentativa con párrafos bien desarrollados", "Vocabulario ambiental y económico preciso", "Argumentación que considera múltiples perspectivas"],
    },
    task3: {
      theme: "Los desafíos mundiales",
      intro: "Esta es una conversación con tu vecina Lucía, una estudiante universitaria de Colombia que está haciendo un intercambio en tu ciudad. Lucía está organizando un club de medioambiente en tu escuela.",
      turns: [
        { id: "3a", speaker: "Lucía", text: "¡Hola! Estoy organizando un club de medioambiente en la escuela y necesito tu ayuda. ¿Cuáles son los problemas ambientales más urgentes que ves en tu comunidad?", hint: "Describe problemas ambientales específicos de tu comunidad con ejemplos concretos" },
        { id: "3b", speaker: "Lucía", text: "Qué interesante. En Colombia tenemos problemas similares. ¿Qué actividades podríamos organizar desde el club escolar para crear conciencia entre los estudiantes sobre estos problemas?", hint: "Propón actividades concretas y creativas para el club ambiental escolar" },
        { id: "3c", speaker: "Lucía", text: "Me encantan esas ideas. ¿Y cómo podríamos involucrar a las familias y a la comunidad local, no solo a los estudiantes?", hint: "Sugiere formas de extender el impacto ambiental más allá de la escuela a la comunidad" },
        { id: "3d", speaker: "Lucía", text: "Muy bien. Oye, ¿has notado si los jóvenes de tu generación se preocupan por el medioambiente? ¿Cómo comparas el activismo ambiental juvenil aquí con lo que sabes de América Latina?", hint: "Compara el activismo ambiental juvenil en tu comunidad con lo que sabes de Latinoamérica" },
        { id: "3e", speaker: "Lucía", text: "Tienes razón. Antes de terminar, ¿qué cambio de hábito personal creerías que tiene mayor impacto en el medioambiente y por qué?", hint: "Explica el cambio personal más impactante que recomiendas con razones específicas" },
      ],
    },
    task4: {
      theme: "Los desafíos mundiales",
      topic: "¿Cómo enfrentan los problemas medioambientales las comunidades de una región hispanohablante que conoces? Compara las actitudes y acciones hacia el medioambiente en esa comunidad con las que observas en tu propia comunidad o en otra comunidad de tu elección. Puedes referirte a lo que has estudiado, experimentado u observado.",
      rubric: ["Comparación clara de actitudes y acciones medioambientales entre dos comunidades", "Ejemplos específicos de iniciativas ambientales en la comunidad hispanohablante", "Presentación organizada y bien estructurada", "Vocabulario ambiental preciso y variado", "Análisis reflexivo de diferencias y semejanzas culturales"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // Simulation C — Salud y Bienestar
  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-health",
    label: "Salud y Bienestar",
    year: "Simulación C",
    description: "A full simulated exam on mental health awareness, healthcare access in Latino communities, nutrition traditions, and wellness practices in the Spanish-speaking world.",
    badge: "Sim",
    badgeColor: "#059669",
    themes: ["La vida contemporánea", "Las familias y las comunidades", "Los desafíos mundiales"],
    task1: {
      theme: "La vida contemporánea",
      email: {
        from: "Lic. Patricia Mendoza — Coordinadora, Programa de Salud Escolar, Hospital General de Miami",
        subject: "Campaña de Concienciación sobre Salud Mental en Escuelas",
        intro: "Este mensaje es de la Lic. Patricia Mendoza, coordinadora del Programa de Salud Escolar del Hospital General de Miami. Has recibido este mensaje porque tu escuela colabora con el hospital en programas de bienestar estudiantil.",
        body: `Estimado/a estudiante:

Nos dirigimos a usted porque estamos desarrollando una campaña de concienciación sobre salud mental dirigida a jóvenes de escuelas secundarias de nuestra comunidad. Reconocemos que los estudiantes tienen perspectivas valiosas que pueden ayudarnos a diseñar programas más efectivos y relevantes.

La campaña busca reducir el estigma asociado con la salud mental en comunidades latinas y promover el acceso a recursos de apoyo psicológico. Para poder diseñar materiales apropiados para nuestra audiencia joven, nos gustaría conocer su opinión:

• ¿Cuáles son los principales factores que cree usted que afectan la salud mental de los jóvenes latinos en su comunidad?
• ¿Qué tipo de recursos o programas de apoyo serían más útiles y accesibles para los estudiantes de su escuela?

Su colaboración es fundamental para hacer de este programa un éxito. Gracias de antemano por su tiempo y sus ideas.

Atentamente,
Lic. Patricia Mendoza
Coordinadora, Programa de Salud Escolar
Hospital General de Miami`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Identificación clara de factores que afectan la salud mental juvenil latina", "Propuesta específica de recursos o programas útiles", "Solicitud de información adicional sobre el programa", "Uso correcto del usted formal", "Vocabulario apropiado sobre salud mental"],
    },
    task2: {
      theme: "La vida contemporánea",
      topic: "¿Deben las escuelas incluir clases obligatorias de salud mental en el currículo académico?",
      sources: [
        {
          num: 1, title: "Salud mental en los jóvenes hispanos: una crisis silenciosa",
          intro: "Artículo publicado en 2023 por la Asociación Americana de Psicología (APA) sobre salud mental en comunidades latinas.",
          text: `Los datos son preocupantes: según el Centro para el Control y Prevención de Enfermedades (CDC), los adolescentes latinos en los Estados Unidos reportan tasas de depresión y ansiedad más altas que sus pares de otras etnias, pero buscan ayuda profesional con mucho menos frecuencia.

Factores culturales juegan un papel crucial. El concepto de "familismo" — priorizar el bienestar familiar sobre el individual — puede llevar a los jóvenes latinos a suprimir sus problemas emocionales para no preocupar a sus familias. El estigma asociado con la enfermedad mental en muchas comunidades latinas, donde las dificultades emocionales se ven como "debilidad" o "locura", también impide que los jóvenes busquen ayuda.

Sin embargo, las escuelas tienen el potencial de ser un punto de acceso crítico. Investigaciones demuestran que los programas de salud socioemocional integrados en el currículo escolar pueden reducir los síntomas de ansiedad en hasta un 25% y mejorar el rendimiento académico. Los estudiantes pasan más de 1.200 horas al año en la escuela — es el lugar ideal para llegar a quienes de otra manera no accederían a apoyo psicológico.

Los críticos argumentan que las escuelas ya están sobrecargadas y que la responsabilidad de la salud mental debería recaer en las familias y los profesionales de la salud, no en los maestros.`,
        },
        {
          num: 2, title: "Salud mental juvenil: estadísticas en comunidades latinas (2023)",
          intro: "Datos publicados por el Instituto Nacional de Salud Mental (NIMH) y la Alianza Nacional de Enfermedades Mentales (NAMI) en 2023.",
          text: `[Datos del gráfico — Barreras de acceso a salud mental en jóvenes latinos]

• Estigma cultural y familiar: 61
• Falta de profesionales hispanohablantes: 52
• Falta de seguro médico: 48
• Desconfianza en el sistema: 39`,
        },
        {
          num: 3, title: "Hablemos de salud mental: perspectivas de jóvenes latinos",
          intro: "Esta grabación es de un podcast estudiantil producido por jóvenes de la comunidad latina en Los Ángeles en 2023. Duración aproximada: dos minutos.",
          text: `[Transcripción del podcast — "Hablemos sin tabúes", Los Ángeles 2023]

Sofía: Bienvenidos a Hablemos sin tabúes. Hoy hablamos de salud mental con dos estudiantes de nuestra comunidad.

Carlos: En mi casa nunca se hablaba de estas cosas. Mi abuela decía que el psicólogo era para los locos. Pero en décimo grado me di cuenta que tenía ansiedad severa. Si en mi escuela hubiera habido una clase donde aprendemos a reconocer las emociones y cuándo pedir ayuda, creo que habría pedido ayuda mucho antes.

María: Yo fui diferente, tuve suerte. Mi maestra de español notó que algo no estaba bien conmigo y me conectó con la consejera escolar. Esa conversación cambió mi vida. Pero no todos tienen esa maestra. Por eso creo que las escuelas necesitan programas formales, no depender de que te toque un maestro sensible.

Carlos: Cuando yo empecé a hablar con mis padres usando el vocabulario que aprendí en terapia, entendieron mejor. El idioma importa. Necesitamos más profesionales que hablen español y entiendan nuestra cultura.`,
        },
      ],
      rubric: ["Posición clara sobre la inclusión obligatoria de clases de salud mental", "Integración efectiva de las tres fuentes", "Argumentación con datos específicos de las fuentes", "Vocabulario sobre salud mental y educación", "Consideración de perspectivas a favor y en contra"],
    },
    task3: {
      theme: "Las familias y las comunidades",
      intro: "Esta es una conversación con tu compañero Andrés, estudiante de intercambio de Argentina que está aprendiendo sobre los hábitos de salud en los Estados Unidos para un proyecto escolar.",
      turns: [
        { id: "3a", speaker: "Andrés", text: "Hola, estoy investigando los hábitos de salud en diferentes comunidades para mi proyecto. ¿Cómo describirías los hábitos de salud y bienestar de tu comunidad en general?", hint: "Describe los hábitos de salud de tu comunidad, incluyendo aspectos positivos y áreas de mejora" },
        { id: "3b", speaker: "Andrés", text: "Interesante. En Argentina tenemos una cultura gastronómica muy fuerte. ¿Qué papel tiene la comida en la cultura de tu comunidad y cómo afecta la salud?", hint: "Explica el rol de la comida en tu comunidad y su relación con la salud" },
        { id: "3c", speaker: "Andrés", text: "Ya veo. En los países hispanohablantes hay tradiciones de medicina popular y remedios caseros. ¿Conoces algunas prácticas de salud tradicionales de comunidades latinas? ¿Cómo se comparan con la medicina moderna?", hint: "Compara prácticas de salud tradicionales latinas con la medicina moderna" },
        { id: "3d", speaker: "Andrés", text: "Qué fascinante. ¿Crees que la salud mental recibe suficiente atención en tu escuela y comunidad? ¿Qué mejorarías?", hint: "Evalúa el tratamiento de la salud mental en tu entorno y propón mejoras concretas" },
        { id: "3e", speaker: "Andrés", text: "Tiene mucho sentido. Para terminar, ¿qué consejo le darías a alguien de tu edad sobre cómo mantener un buen equilibrio entre la vida académica y el bienestar personal?", hint: "Da consejos específicos y prácticos sobre el equilibrio entre académico y bienestar" },
      ],
    },
    task4: {
      theme: "Los desafíos mundiales",
      topic: "¿Cómo se concibe y se practica el bienestar personal (incluyendo la salud física y mental) en una comunidad hispanohablante que conoces bien? Compara estas prácticas y actitudes con las que observas en tu propia comunidad o en otra de tu elección. Puedes referirte a lo que has estudiado, experimentado u observado.",
      rubric: ["Comparación clara de concepciones de bienestar entre dos comunidades", "Ejemplos específicos de prácticas de salud física y mental", "Presentación organizada y bien estructurada", "Vocabulario de salud y bienestar apropiado", "Reflexión cultural profunda con ejemplos concretos"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // Simulation D — Arte y Expresión Cultural
  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-arts",
    label: "Arte y Expresión Cultural",
    year: "Simulación D",
    description: "A full simulated exam exploring artistic expression in Latin America, street art as protest, music and cultural identity, and the role of art in community building.",
    badge: "Sim",
    badgeColor: "#059669",
    themes: ["La belleza y la estética", "La identidad personal y pública", "Las familias y las comunidades"],
    task1: {
      theme: "La belleza y la estética",
      email: {
        from: "Prof. Gabriela Reyes — Curadora, Festival Internacional de Arte Latinoamericano",
        subject: "Convocatoria para jóvenes artistas y escritores",
        intro: "Este mensaje es de la Prof. Gabriela Reyes, curadora del Festival Internacional de Arte Latinoamericano. Has recibido este mensaje porque tu escuela participa en el programa de intercambio cultural con el festival.",
        body: `Estimado/a estudiante:

Me complace informarle que el Festival Internacional de Arte Latinoamericano abre una convocatoria especial para jóvenes artistas, escritores y músicos de comunidades latinas en los Estados Unidos. El festival, que se celebrará en Ciudad de México durante una semana, busca mostrar cómo la juventud latina contemporánea expresa su identidad cultural a través del arte.

Los participantes seleccionados tendrán la oportunidad de exhibir su obra, asistir a talleres con artistas consagrados y participar en mesas de diálogo sobre identidad cultural y arte. Para evaluar su candidatura, nos gustaría que respondiera:

• ¿Qué forma de expresión artística practica usted y cómo refleja su identidad cultural o las experiencias de su comunidad?
• ¿Por qué considera importante que los jóvenes latinos tengan espacios de expresión artística propios?

Esperamos su respuesta antes del 30 de este mes.

Cordialmente,
Prof. Gabriela Reyes
Curadora, Festival Internacional de Arte Latinoamericano`,
      },
      rubric: ["Saludo formal y despedida apropiados", "Descripción de la práctica artística y su vínculo con la identidad cultural", "Justificación de la importancia de espacios artísticos para jóvenes latinos", "Solicitud de más información sobre el proceso de selección", "Uso del usted formal consistente", "Vocabulario artístico y cultural apropiado"],
    },
    task2: {
      theme: "La belleza y la estética",
      topic: "¿El arte callejero (grafiti, murales) debería ser considerado una forma legítima de expresión artística y cultural en las ciudades latinoamericanas?",
      sources: [
        {
          num: 1, title: "Muros que hablan: el arte urbano en América Latina",
          intro: "Artículo publicado en 2023 en la Revista Iberoamericana de Estudios Culturales sobre el arte callejero en ciudades latinoamericanas.",
          text: `El arte callejero ha transformado los paisajes urbanos de Ciudad de México, Buenos Aires, Bogotá y São Paulo. Lo que comenzó como una forma de protesta y expresión marginal se ha convertido en uno de los movimientos artísticos más dinámicos y reconocidos del mundo.

En Ciudad de México, el muralismo tiene raíces profundas. Los murales de Diego Rivera, José Clemente Orozco y David Alfaro Siqueiros transformaron paredes de edificios públicos en libros de historia para la gente que no sabía leer. Hoy, artistas como Dr. Lakra y Saner continúan esa tradición, fusionando iconografía prehispánica con estética contemporánea.

En Bogotá, el alcalde Gustavo Petro despenalizó el grafiti en 2011 después del asesinato del joven grafitero Diego Felipe Becerra por un policía. Hoy, el barrio de La Candelaria es una galería al aire libre que atrae turistas de todo el mundo y genera ingresos para artistas locales.

Sin embargo, los debates persisten. Los críticos argumentan que el arte callejero no autorizado daña la propiedad privada y en muchos casos degenera en vandalismo sin valor estético. La línea entre arte y vandalismo es subjetiva y su aplicación desigual según el barrio o la clase social revela inequidades del sistema.`,
        },
        {
          num: 2, title: "Arte callejero en ciudades latinoamericanas: datos y percepciones (2023)",
          intro: "Datos publicados por la Red Latinoamericana de Arte Urbano (RELAU) en colaboración con universidades de Argentina, México y Colombia en 2023.",
          text: `[Datos del gráfico — Percepción del arte callejero en ciudades latinoamericanas]

• Ciudad de México — a favor: 67
• Buenos Aires — a favor: 71
• Lima — a favor: 58
• Bogotá — a favor: 74
• Santiago — a favor: 62`,
        },
        {
          num: 3, title: "Arte o vandalismo: voces de artistas y ciudadanos",
          intro: "Esta grabación es de un reportaje de Radio Nacional de Colombia publicado en 2022 sobre el debate del arte callejero en Bogotá. Dura aproximadamente dos minutos.",
          text: `[Transcripción del audio — Radio Nacional de Colombia, 2022]

Periodista: Bogotá se ha convertido en referente mundial del arte urbano, pero el debate sobre sus límites sigue vivo.

Artista Cheo Quenan: Cuando yo pinto en un muro, estoy devolviendo el arte a la gente. Los museos son para quien puede pagar la entrada. La calle es de todos. Mi mural lo ve el vendedor ambulante, la señora que espera el bus, el niño que va a la escuela. El arte callejero democratiza la belleza.

Propietaria Laura Martínez: Entiendo el argumento artístico, pero la semana pasada amanecí con grafiti en la fachada de mi negocio. Eso no es arte, es vandalismo. Me costó quinientos dólares limpiarlo.

Sociólogo Dr. Fernando Ríos: El problema es que usamos una misma palabra para cosas muy diferentes. Un mural comisionado por la comunidad que cuenta su historia es arte. Rayar el nombre de tu pandilla en la pared ajena es vandalismo. La distinción no es estética sino ética: ¿quién da permiso y a quién pertenece el espacio?`,
        },
      ],
      rubric: ["Posición clara sobre la legitimidad del arte callejero", "Integración crítica de las tres fuentes", "Argumentación con ejemplos históricos y contemporáneos", "Vocabulario artístico y cultural apropiado", "Análisis matizado que reconoce complejidades del tema"],
    },
    task3: {
      theme: "La identidad personal y pública",
      intro: "Esta es una conversación con tu amiga Valentina, una joven artista colombiana que vive en tu ciudad desde hace un año y está adaptándose a la cultura local mientras mantiene sus raíces.",
      turns: [
        { id: "3a", speaker: "Valentina", text: "Oye, estoy pensando en organizar una exposición de arte latinoamericano en el centro comunitario. ¿Qué formas de arte crees que representan mejor la cultura latina y conectarían con la comunidad local?", hint: "Sugiere formas de arte específicas y explica por qué conectarían con la comunidad local" },
        { id: "3b", speaker: "Valentina", text: "Me gustan esas ideas. Una cosa que extraño de Colombia es la música. La salsa, el vallenato, el reggaetón... La música lo es todo allá. ¿Qué papel tiene la música en tu comunidad y en tu vida personal?", hint: "Describe el rol de la música en tu comunidad y comparte tu relación personal con la música" },
        { id: "3c", speaker: "Valentina", text: "¡Qué interesante! Yo noto que aquí hay menos arte en los espacios públicos que en Colombia. ¿Crees que el arte público hace que una comunidad se sienta más unida e identificada con su lugar?", hint: "Analiza el rol del arte público en la identidad comunitaria con ejemplos concretos" },
        { id: "3d", speaker: "Valentina", text: "Tienes razón. A veces siento que mi arte no encaja aquí porque es muy latino y la gente no lo entiende. ¿Cómo crees que el arte puede ser un puente entre culturas?", hint: "Explica cómo el arte puede servir de puente entre culturas diferentes" },
        { id: "3e", speaker: "Valentina", text: "Muy bien dicho. ¿Y si quisieras recomendar a alguien una obra de arte, una película o un libro latinoamericano que explique nuestra cultura, cuál sería y por qué?", hint: "Recomienda una obra de arte, película o libro latinoamericano y explica su valor cultural" },
      ],
    },
    task4: {
      theme: "La belleza y la estética",
      topic: "¿Qué papel tienen las artes (música, pintura, literatura, cine, danza, etc.) en la preservación de la identidad cultural de una comunidad hispanohablante que conoces bien? Compara ese papel con el que tienen las artes en tu propia comunidad o en otra de tu elección. Puedes referirte a lo que has estudiado, experimentado u observado.",
      rubric: ["Comparación clara del rol de las artes en dos comunidades", "Ejemplos específicos de formas artísticas y su función cultural", "Presentación bien organizada y fluida", "Vocabulario artístico y cultural rico y variado", "Análisis profundo de cómo el arte preserva la identidad cultural"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // Simulation E — Familia y Comunidad
  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-family",
    label: "Familia y Comunidad",
    year: "Simulación E",
    description: "Explore family structures, generational dynamics, and community bonds in Hispanic cultures. Practice with topics on immigration, multigenerational households, and community identity.",
    badge: "Sim",
    badgeColor: "#7c3aed",
    themes: ["La familia y las comunidades", "Los desafíos mundiales"],
    task1: {
      theme: "La familia y las comunidades",
      email: {
        from: "Sra. Patricia Herrera, Coordinadora del Centro Comunitario Hispano",
        subject: "Proyecto de historia oral — participación de jóvenes",
        intro: "Este mensaje electrónico es de la Sra. Patricia Herrera, coordinadora del Centro Comunitario Hispano de tu ciudad. Estás recibiendo este mensaje porque participaste en un evento reciente del centro.",
        body: `Estimado/a joven:

Espero que este mensaje le encuentre bien. Me pongo en contacto con usted porque estamos lanzando un emocionante proyecto de historia oral para documentar las experiencias de las familias hispanas en nuestra comunidad a lo largo de los últimos cincuenta años.

El proyecto consistirá en entrevistar a miembros de distintas generaciones de familias hispanas para preservar sus historias, tradiciones y recuerdos. Creemos que la perspectiva de los jóvenes es fundamental para este proyecto.

Me gustaría pedirle que considere participar y le agradecería que respondiera las siguientes preguntas:

• ¿Estaría interesado/a en participar como entrevistador/a voluntario/a? ¿Por qué considera importante preservar estas historias familiares?

• En su opinión, ¿qué aspectos de la cultura y las tradiciones familiares hispanas son más importantes documentar para las generaciones futuras?

Esperamos su respuesta y agradecemos de antemano su interés en apoyar a nuestra comunidad.

Atentamente,
Sra. Patricia Herrera
Coordinadora
Centro Comunitario Hispano`,
      },
      rubric: ["Saludo y despedida formales apropiados", "Responde sobre su interés en participar con razones convincentes", "Identifica aspectos culturales importantes a documentar con detalles específicos", "Solicita más información sobre algún aspecto del proyecto", "Vocabulario formal y variado apropiado para el contexto"],
    },
    task2: {
      theme: "La familia y las comunidades",
      topic: "¿Cómo afecta la inmigración a las estructuras familiares y a la identidad cultural de las familias hispanas?",
      sources: [
        {
          num: 1, title: "Familias transnacionales: vivir entre dos mundos",
          intro: "Este artículo trata del fenómeno de las familias transnacionales hispanas en los Estados Unidos. Fue publicado en 2019 por el Instituto de Política Migratoria de Washington D.C.",
          text: `Más de 11 millones de familias hispanas en los Estados Unidos se definen como transnacionales: mantienen vínculos emocionales, económicos y culturales profundos tanto con su país de origen como con su comunidad adoptiva. Este fenómeno redefine lo que significa ser familia en el siglo XXI.

Los estudios muestran que las familias transnacionales enfrentan desafíos únicos. La separación geográfica crea lo que los investigadores llaman duelo migratorio: la tristeza por dejar atrás a abuelos, tíos y primos, combinada con la presión de adaptarse a una nueva cultura sin perder la propia.

Sin embargo, estas familias también desarrollan fortalezas extraordinarias. Las videollamadas con abuelos en México o Colombia se han convertido en rituales que mantienen viva la lengua, las tradiciones y el sentido de pertenencia. Los hijos criados en estas familias suelen ser bilingües, biculturales y especialmente hábiles para navegar entre mundos.

El concepto de familismo —la lealtad intensa hacia la familia extendida— sigue siendo un pilar central de la identidad hispana incluso después de la migración. Las remesas económicas enviadas a familiares en el país de origen superan los 150,000 millones de dólares anuales en toda Latinoamérica.

La segunda generación, nacida o criada en Estados Unidos, enfrenta el reto de construir una identidad que integre ambas culturas. Para muchos jóvenes hispanos, esta negociación entre herencia y adaptación se convierte en una fuente de riqueza cultural, aunque también puede generar tensiones intergeneracionales.`,
        },
        {
          num: 2, title: "Hogares multigeneracionales en comunidades hispanas",
          intro: "Este gráfico muestra el porcentaje de familias hispanas que viven en hogares multigeneracionales comparado con otras comunidades en los Estados Unidos. Datos del Pew Research Center, 2022.",
          text: `[Datos del gráfico — Hogares multigeneracionales por grupo étnico (EE.UU., 2022)]

• Hispanos/Latinos: 27
• Asiático-americanos: 25
• Afroamericanos: 18
• Blancos no hispanos: 14
• Promedio nacional: 20`,
        },
        {
          num: 3, title: "Voces de la diáspora: identidad entre dos culturas",
          intro: "Esta grabación es un reportaje de Radio Ambulante sobre jóvenes hispanos que crecieron entre dos culturas. Fue publicada en 2021 y dura aproximadamente dos minutos y medio.",
          text: `[Transcripción del audio — Radio Ambulante, 2021]

Moderadora: Hoy hablamos con tres jóvenes que crecieron en familias hispanas en los Estados Unidos sobre cómo navegan su identidad cultural.

Daniela (22 años, padres mexicanos, nacida en Chicago): En casa hablamos español con mis abuelos y mezcla con mis padres. Cuando era pequeña me daba vergüenza hablar español en la escuela. Ahora es mi mayor orgullo. Mi bisabuela me enseñó a hacer tamales. Ese conocimiento lo voy a pasar a mis hijos.

Daniela: El desafío más difícil es sentir que no encajas en ningún lado. Aquí eres demasiado mexicana y cuando vas a México eres demasiado americana. Pero con el tiempo aprendí que tener dos culturas es un superpoder, no una debilidad.

Rodrigo (19 años, padres colombianos y venezolanos, criado en Miami): Mi familia es un ejemplo de esa mezcla. Crecí en Miami con amigos cubanos, puertorriqueños, peruanos. Para mí, ser latino es una identidad compartida aunque cada país sea diferente. Las fiestas son sagradas — Navidad, Año Nuevo, los cumpleaños — siempre con familia grande, música, comida.

Sofía (21 años, padres guatemaltecos, criada en Los Ángeles): Lo más importante que me dieron mis padres es el idioma. El español me abrió puertas que no hubiera imaginado. Y también la visión del mundo: la familia es lo primero, hay que apoyarse. Eso no lo cambia ninguna frontera.`,
        },
      ],
      rubric: ["Posición clara sobre el impacto de la inmigración en la familia y la identidad", "Integración efectiva de las tres fuentes con referencias específicas", "Argumentación con ejemplos de la cultura hispana y experiencias personales", "Vocabulario cultural y sociológico apropiado", "Análisis equilibrado que reconoce tanto desafíos como fortalezas"],
    },
    task3: {
      theme: "La familia y las comunidades",
      intro: "Esta es una conversación con Carmen, una estudiante de intercambio de España que vive con tu familia por un semestre y quiere entender mejor la vida familiar hispana en los Estados Unidos.",
      turns: [
        { id: "3a", speaker: "Carmen", text: "Hola, llevo un mes viviendo aquí y noto que las familias hispanas aquí son muy unidas. ¿Cómo describirías la relación con tu familia extendida —abuelos, tíos, primos— y qué papel juegan en tu vida diaria?", hint: "Describe tu relación con la familia extendida con ejemplos específicos y concretos" },
        { id: "3b", speaker: "Carmen", text: "Qué interesante. En España también somos muy familiares. Una cosa que me sorprende aquí es que muchos jóvenes hablan inglés en casa con sus padres aunque sus padres prefieren el español. ¿Tú cómo manejas el idioma en tu familia?", hint: "Explica cómo usas el español e inglés en diferentes contextos familiares" },
        { id: "3c", speaker: "Carmen", text: "Entiendo. Oye, ¿y qué tradiciones o celebraciones familiares son más importantes para tu familia? ¿Cómo las celebran aquí siendo una familia hispana en los Estados Unidos?", hint: "Describe tradiciones familiares específicas y cómo las adaptan en su contexto cultural" },
        { id: "3d", speaker: "Carmen", text: "¡Qué bonito! A veces pienso que los jóvenes de hoy están perdiendo la conexión con sus raíces por la tecnología y las redes sociales. ¿Crees que la tecnología ayuda o dificulta mantener los lazos familiares y culturales?", hint: "Analiza el papel de la tecnología en las relaciones familiares con ejemplos concretos" },
        { id: "3e", speaker: "Carmen", text: "Buen punto. Por cierto, cuando seas mayor y tengas tu propia familia, ¿qué tradiciones o valores de tu cultura hispana quisieras transmitirles a tus hijos?", hint: "Reflexiona sobre qué valores y tradiciones son más importantes preservar para las próximas generaciones" },
      ],
    },
    task4: {
      theme: "La familia y las comunidades",
      topic: "¿Cómo se define y se expresa el concepto de comunidad en una comunidad del mundo hispanohablante que conozcas bien? Compara esa definición y expresión con cómo se define y expresa la comunidad en tu propia comunidad o en otra de tu elección. Puedes referirte a lo que has estudiado, vivido, observado, etc.",
      rubric: ["Comparación clara del concepto de comunidad en dos culturas", "Ejemplos específicos de expresiones comunitarias hispanas", "Presentación organizada con introducción, desarrollo y conclusión", "Vocabulario cultural y sociológico rico y apropiado", "Reflexión profunda sobre diferencias y similitudes entre comunidades"],
    },
  },


  // ══════════════════════════════════════════════════════════════
  // Simulation F — Educación y Trabajo
  // ══════════════════════════════════════════════════════════════
  {
    id: "sim-education",
    label: "Educación y Trabajo",
    year: "Simulación F",
    description: "Examine education systems, career aspirations, and the relationship between schooling and professional life across Spanish-speaking cultures.",
    badge: "Sim",
    badgeColor: "#7c3aed",
    themes: ["La educación y las carreras profesionales", "La vida contemporánea"],
    task1: {
      theme: "La educación y las carreras profesionales",
      email: {
        from: "Prof. Miguel Ángel Ramos, Coordinador del Programa de Intercambio Académico",
        subject: "Oportunidad de pasantía — verano en empresa latinoamericana",
        intro: "Este mensaje electrónico es del Prof. Miguel Ángel Ramos, coordinador del programa de intercambio académico de tu escuela. El programa tiene convenios con empresas en varios países latinoamericanos.",
        body: `Estimado/a estudiante:

Me complace informarle que su nombre ha sido seleccionado como candidato/a para una pasantía de verano en una empresa líder en América Latina. Este es un programa muy competitivo que ofrece experiencia profesional valiosa en un entorno hispanohablante.

Las pasantías están disponibles en los siguientes sectores: tecnología, medios de comunicación, ciencias del medioambiente y educación comunitaria. La duración es de seis semanas y se realizará en la ciudad de la empresa seleccionada.

Para continuar con el proceso de selección, necesito que responda las siguientes preguntas:

• ¿En cuál de los cuatro sectores le gustaría trabajar y por qué? ¿Qué habilidades o experiencias previas tiene que lo/la hacen un/a buen/a candidato/a para ese sector?

• ¿Cuáles son sus expectativas sobre la experiencia de trabajar en un entorno profesional hispanohablante? ¿Qué espera aprender sobre la cultura de trabajo en ese país?

Por favor, responda antes del viernes. Si tiene alguna pregunta adicional, no dude en contactarme.

Atentamente,
Prof. Miguel Ángel Ramos
Coordinador, Programa de Intercambio Académico`,
      },
      rubric: ["Saludo y despedida formales adecuados", "Explica el sector elegido con habilidades y experiencias relevantes", "Describe expectativas sobre el entorno laboral hispanohablante con detalle", "Pide más información sobre un aspecto específico de la pasantía", "Registro formal y vocabulario profesional apropiado"],
    },
    task2: {
      theme: "La educación y las carreras profesionales",
      topic: "¿Debería el sistema educativo preparar a los estudiantes principalmente para el mercado laboral o para el desarrollo personal e intelectual?",
      sources: [
        {
          num: 1, title: "La educación latinoamericana ante los desafíos del siglo XXI",
          intro: "Este artículo analiza los debates sobre los fines de la educación en América Latina. Fue publicado en 2020 por la UNESCO en su informe sobre educación en la región.",
          text: `América Latina enfrenta una paradoja educativa: sus sistemas educativos han logrado avances históricos en cobertura —más del 95% de los niños acceden a la escuela primaria— pero los resultados en aprendizaje siguen siendo preocupantes. La pregunta que divide a pedagogos, economistas y familias es: ¿para qué educar?

Un primer modelo, predominante en las políticas de muchos gobiernos, ve la educación como inversión económica. Bajo este enfoque, la escuela debe equipar a los estudiantes con competencias técnicas y habilidades para el mercado laboral: programación, matemáticas aplicadas, inglés de negocios. Los defensores argumentan que en una región con altos índices de desempleo juvenil, la educación que no produce empleo fracasa en su misión principal.

El modelo alternativo, con raíces en el pensamiento del brasileño Paulo Freire, concibe la educación como herramienta de liberación personal y transformación social. Desde esta perspectiva, la escuela debe formar ciudadanos críticos capaces de cuestionarse el mundo, desarrollar su creatividad y contribuir a una sociedad más justa.

Países como Finlandia han demostrado que una educación centrada en el desarrollo integral del niño —con juego, creatividad y bienestar emocional— produce también excelentes resultados académicos y trabajadores innovadores. La falsa dicotomía entre formación humana y preparación laboral puede resolverse con pedagogías que integren ambas dimensiones.`,
        },
        {
          num: 2, title: "Desempleo juvenil y nivel educativo en América Latina",
          intro: "Este gráfico muestra la tasa de desempleo juvenil según nivel educativo en varios países latinoamericanos. Datos de la CEPAL, 2021.",
          text: `[Datos del gráfico — Tasa de desempleo juvenil con título universitario (18-29 años), América Latina 2021]

• Colombia: 14
• México: 11
• Argentina: 16
• Chile: 10
• Perú: 13
• Brasil: 15`,
        },
        {
          num: 3, title: "Voces sobre la educación: ¿qué queremos de la escuela?",
          intro: "Esta grabación es un debate radial sobre los fines de la educación en el que participan estudiantes, docentes y empleadores de varios países hispanohablantes. Dura aproximadamente dos minutos y medio.",
          text: `[Transcripción del audio — Debate radial, Radio Nacional de España, 2020]

Moderadora: Hoy debatimos sobre el propósito de la educación. ¿Debe la escuela preparar trabajadores o ciudadanos críticos?

Prof. Elena Vargas (docente, México): Creo que es una pregunta mal planteada. Un buen ciudadano crítico también es un buen trabajador. Cuando enseño literatura a mis alumnos, les enseño a argumentar, a empatizar, a pensar con matices. Esas son exactamente las habilidades que buscan las empresas.

Alejandro Torres (director de recursos humanos, Colombia): Las empresas queremos personas que sepan comunicarse, resolver problemas, trabajar en equipo y adaptarse al cambio. Los mejores candidatos que entrevistamos no siempre vienen de carreras técnicas; muchos vienen de humanidades y filosofía. Aprendieron a pensar y eso vale más que cualquier curso técnico que se desactualiza en dos años.

Valentina Cruz (estudiante, Argentina, 17 años): Yo quiero las dos cosas. Quiero saber programar porque me da independencia económica, pero también quiero entender por qué el mundo es como es. La escuela me obliga a elegir y eso me parece injusto. En la vida real, necesitas las dos cosas.`,
        },
      ],
      rubric: ["Posición clara y bien argumentada sobre los fines de la educación", "Uso efectivo de las tres fuentes con citas específicas", "Argumentación con ejemplos de sistemas educativos hispanohablantes", "Vocabulario educativo y profesional variado y preciso", "Estructura coherente con introducción, desarrollo y conclusión sólidos"],
    },
    task3: {
      theme: "La educación y las carreras profesionales",
      intro: "Esta es una conversación con Tomás, un estudiante universitario de España que está haciendo una encuesta sobre las aspiraciones profesionales de los jóvenes hispanos en los Estados Unidos.",
      turns: [
        { id: "3a", speaker: "Tomás", text: "Hola, estoy investigando las aspiraciones profesionales de jóvenes hispanos en distintos países. Para empezar, ¿qué carrera o profesión te gustaría seguir en el futuro y qué te motivó a elegirla?", hint: "Describe tu carrera deseada y las razones personales y culturales que te motivaron" },
        { id: "3b", speaker: "Tomás", text: "Interesante elección. En España hay mucha presión familiar para seguir ciertas profesiones respetables como medicina, derecho o ingeniería. ¿Sientes esa presión familiar en tu cultura y cómo la manejas?", hint: "Reflexiona sobre las expectativas familiares en tu cultura y cómo las navegas" },
        { id: "3c", speaker: "Tomás", text: "Lo entiendo bien. ¿Crees que el sistema educativo de tu país te está preparando adecuadamente para tu carrera futura? ¿Qué cambiarías?", hint: "Evalúa con detalle la preparación que ofrece tu sistema educativo y propón mejoras" },
        { id: "3d", speaker: "Tomás", text: "Puntos muy válidos. El español es cada vez más valioso en el mercado laboral global. ¿Cómo crees que ser hispanohablante será una ventaja para ti en tu carrera?", hint: "Explica las ventajas profesionales concretas de ser bilingüe en español e inglés" },
        { id: "3e", speaker: "Tomás", text: "Muy bien dicho. Para terminar, si pudieras darle un consejo a un estudiante de doce años que está pensando en su futuro profesional, ¿qué le dirías?", hint: "Da consejos reflexivos y específicos sobre cómo prepararse para el futuro profesional" },
      ],
    },
    task4: {
      theme: "La educación y las carreras profesionales",
      topic: "¿Cómo influye la educación en las oportunidades profesionales y en la movilidad social en una comunidad del mundo hispanohablante que conozcas bien? Compara esa influencia con la que tiene en tu propia comunidad o en otra de tu elección. Puedes referirte a lo que has estudiado, vivido, observado, etc.",
      rubric: ["Comparación clara del rol de la educación en dos comunidades", "Ejemplos específicos de sistemas educativos y oportunidades en el mundo hispanohablante", "Presentación organizada y fluida con ideas bien desarrolladas", "Vocabulario educativo y socioeconómico preciso y variado", "Análisis profundo de la relación entre educación, trabajo y movilidad social"],
    },
  },

];

// ─── Section I Data — AP Spanish Language & Culture ─────────────────────────
// Simulations include Section I MC; official exams go straight to FRQ

const SPANISH_SECTION_I = {
  partA: {
    label: "Part A — Interpretive: Print Texts / Textos impresos",
    minutes: 40,
    sets: [
      {
        type: "Texto literario",
        intro: "El siguiente fragmento es de una revista literaria latinoamericana, 2022.",
        text: `Desde pequeña, Valentina llenaba cuadernos con historias de dragones y reinas guerreras. Su madre, profesora de literatura, la animaba a escribir, pero su padre, ingeniero, insistía en que debía elegir una carrera "con futuro." Cuando Valentina anunció que estudiaría letras en la universidad, la tensión en casa se volvió casi insoportable.

"No es que no crea en ti," le dijo su padre una noche, con voz cansada. "Es que el mundo no paga a los soñadores."

Valentina no discutió. En cambio, esa misma noche escribió el primer capítulo de una novela que tardaría cuatro años en terminar. La publicó con una pequeña editorial independiente cuando tenía veintiséis años. El libro no se convirtió en un bestseller, pero ganó un premio regional que le abrió puertas inesperadas.

Hoy, a los treinta y dos, Valentina imparte talleres de escritura creativa en tres ciudades y viaja dos veces al año a ferias del libro internacionales. Su padre, que al principio ni compraba el libro, ahora lo regala a sus colegas con una sonrisa de orgullo que él mismo aún no sabe cómo explicar.`,
        questions: [
          { id:"pA1q1", text:"¿Cuál es el conflicto principal del texto?", options:["Valentina no sabe qué carrera elegir","El padre de Valentina no apoya su vocación literaria","Valentina fracasa como escritora","La madre de Valentina prohíbe que escriba"], answer:1 },
          { id:"pA1q2", text:"¿Qué hace Valentina inmediatamente después de la conversación con su padre?", options:["Abandona su sueño de ser escritora","Discute fuertemente con él","Escribe el primer capítulo de su novela","Busca un trabajo de ingeniería"], answer:2 },
          { id:"pA1q3", text:"¿Qué indica la actitud del padre al final del texto?", options:["Sigue sin apoyar a su hija","Ha cambiado de opinión sobre el éxito de Valentina","Está arrepentido de haberla apoyado","Ignora los logros de su hija"], answer:1 },
          { id:"pA1q4", text:"¿Qué función cumple la cita directa del padre en el párrafo dos?", options:["Mostrar que el padre es cruel e indiferente","Ilustrar la preocupación pragmática del padre por el futuro de Valentina","Demostrar que el padre no entiende la literatura","Confirmar que el padre apoya la decisión de Valentina"], answer:1 },
          { id:"pA1q5", text:"¿Cuál de las siguientes afirmaciones describe mejor el tema central del texto?", options:["El éxito profesional requiere abandonar los sueños","La perseverancia puede transformar la duda en orgullo","La escritura es una carrera imposible en América Latina","Los padres siempre tienen razón sobre el futuro de sus hijos"], answer:1 },
        ],
      },
      {
        type: "Artículo informativo",
        intro: "El siguiente texto es de una guía de turismo cultural de Buenos Aires, 2023.",
        text: `El Mercado de San Telmo es uno de los espacios más emblemáticos de Buenos Aires. Inaugurado en 1897, este edificio de hierro y vidrio ha sobrevivido guerras económicas, dictaduras y la globalización sin perder su esencia: ser un punto de encuentro entre lo antiguo y lo contemporáneo.

Entre sus pasillos, conviven puestos de antigüedades con cafeterías de especialidad, carnicerías de toda la vida con galerías de arte joven. Un turista puede encontrar, en menos de cien metros, un fonógrafo de principios del siglo XX, un vinilo de Astor Piazzolla y una obra de un artista emergente de Palermo.

Lo que hace único al mercado no es solo lo que vende, sino lo que representa: la memoria colectiva de una ciudad que nunca termina de reinventarse. Los porteños de mayor edad recuerdan ir allí con sus abuelos a comprar verduras; los jóvenes de hoy van a tomarse un café de filtro y trabajar desde sus laptops.

Para el historiador cultural Rodrigo Esteves, "San Telmo es un archivo vivo. No conserva el pasado como un museo —lo habita y lo transforma."`,
        questions: [
          { id:"pA2q1", text:"Según el texto, ¿qué hace especial al Mercado de San Telmo?", options:["Su tamaño y modernidad","La convivencia entre lo histórico y lo contemporáneo","Su ubicación en el centro de Buenos Aires","Los bajos precios de sus productos"], answer:1 },
          { id:"pA2q2", text:"¿Qué sugiere la expresión 'archivo vivo' usada por Rodrigo Esteves?", options:["Que el mercado guarda documentos históricos","Que el mercado preserva la historia mientras continúa evolucionando","Que el mercado es administrado por historiadores","Que el mercado tiene una biblioteca pública"], answer:1 },
          { id:"pA2q3", text:"¿Cuál de los siguientes elementos NO se menciona como parte de la oferta del mercado?", options:["Antigüedades","Galerías de arte","Vinilos de música","Libros de historia"], answer:3 },
          { id:"pA2q4", text:"¿Qué contraste cultural se describe en el tercer párrafo?", options:["El contraste entre Argentina y otros países","Las diferencias entre turistas y residentes locales","El cambio en los usos del mercado entre generaciones","La oposición entre arte moderno y antiguo"], answer:2 },
          { id:"pA2q5", text:"¿Cuál es el propósito principal de este texto?", options:["Persuadir al lector de visitar Argentina","Criticar los efectos de la globalización en los mercados","Describir el valor cultural e histórico de un espacio emblemático","Explicar la historia económica de Buenos Aires"], answer:2 },
        ],
      },
      {
        type: "Texto académico",
        intro: "El siguiente texto es de un artículo académico sobre etnomusicología, Universidad de Chile, 2021.",
        text: `Cuando los investigadores de la Universidad de Chile comenzaron a documentar la música de las comunidades mapuche del sur del país, esperaban encontrar tradiciones en peligro de extinción. Lo que hallaron fue sorprendente: una fusión viva entre instrumentos ancestrales y géneros contemporáneos como el hip-hop y el jazz.

El cultrún, tambor sagrado mapuche, acompañaba ahora letras en mapudungun que hablaban de desplazamiento forzado y resistencia cultural. Jóvenes de diecisiete y dieciocho años grababan sus canciones en estudios caseros y las subían a plataformas de streaming, acumulando oyentes en Santiago, Buenos Aires y Ciudad de México.

"La música no es solo arte," explica la etnomusicóloga Carmen Painemal. "Es un sistema de comunicación que atraviesa generaciones y geografías. Cuando un joven mapuche canta en mapudungun con una base de hip-hop, no está contaminando su cultura —la está protegiendo."

Este fenómeno, que los académicos llaman 'fusión cultural estratégica', plantea preguntas fundamentales sobre qué significa preservar una cultura en el siglo XXI: ¿mantenerla intacta en un museo o dejarla respirar y transformarse?`,
        questions: [
          { id:"pA3q1", text:"¿Qué descubrieron inesperadamente los investigadores de la Universidad de Chile?", options:["Que la música mapuche había desaparecido completamente","Que la música mapuche estaba evolucionando al fusionarse con géneros modernos","Que los jóvenes mapuche rechazaban su propia cultura","Que el gobierno prohibía la música tradicional mapuche"], answer:1 },
          { id:"pA3q2", text:"Según Carmen Painemal, ¿qué representa la fusión musical para los jóvenes mapuche?", options:["Una amenaza a la cultura tradicional","Una forma de proteger y comunicar su cultura","Un intento de imitar la cultura occidental","Una manera de ganar dinero en plataformas digitales"], answer:1 },
          { id:"pA3q3", text:"¿Qué pregunta central plantea el texto al final?", options:["¿Deben los jóvenes mapuche estudiar en universidades?","¿Es la música un arte o solo entretenimiento?","¿Cómo debe entenderse la preservación cultural en la actualidad?","¿Deben los musicólogos documentar todas las culturas del mundo?"], answer:2 },
          { id:"pA3q4", text:"¿Cuál es la función del cultrún en el contexto descrito?", options:["Ha sido reemplazado por instrumentos modernos","Se usa solo en ceremonias religiosas privadas","Forma parte de la fusión musical contemporánea mapuche","Es estudiado únicamente por académicos"], answer:2 },
          { id:"pA3q5", text:"¿Cuál de las siguientes palabras describe mejor la actitud del texto hacia la fusión cultural mapuche?", options:["Crítica","Neutral y objetiva","Favorable y admirativa","Alarmante"], answer:2 },
        ],
      },
      {
        type: "Texto literario narrativo",
        intro: "El siguiente fragmento es de una novela contemporánea colombiana, 2020.",
        text: `Don Aurelio llegó al restaurante a las doce y cuarto, como siempre. La mesera, una joven de apellido Ríos, ya sabía su orden: sopa de lentejas, arroz blanco, pechuga a la plancha y agua de panela fría. Nunca necesitaba preguntarle.

Desde que su esposa había muerto tres años atrás, Don Aurelio almorzaba solo en ese lugar. No porque le gustara especialmente la comida —era buena, sin más—, sino porque a esa hora del día, sin el bullicio de la oficina y sin el silencio opresivo de su apartamento vacío, encontraba algo parecido a la paz.

La señorita Ríos siempre le sonreía cuando le traía el plato. No era una sonrisa de trabajo, de esas mecánicas que los empleados aprenden a fabricar. Era genuina, cargada de algo que Don Aurelio no sabía nombrar pero que agradecía profundamente.

Un martes, ella no estaba. La reemplazaba un muchacho nuevo que derramó el agua y no recordó el azúcar. Don Aurelio comió en silencio, pagó y salió. En la puerta, se dio cuenta de que había extrañado a la señorita Ríos más de lo que había extrañado a muchas personas en mucho tiempo.`,
        questions: [
          { id:"pA4q1", text:"¿Por qué Don Aurelio almuerza solo en ese restaurante?", options:["Porque la comida es excelente","Porque el restaurante está cerca de su trabajo","Porque ese espacio le ofrece una paz que no encuentra en otros lugares","Porque su médico le recomendó ese menú"], answer:2 },
          { id:"pA4q2", text:"¿Qué nos indica el hecho de que la mesera ya sepa su pedido sin preguntarle?", options:["Que Don Aurelio es un cliente nuevo pero memorable","Que él visita el restaurante con frecuencia y regularidad","Que la mesera tiene muy buena memoria","Que el menú del restaurante es muy limitado"], answer:1 },
          { id:"pA4q3", text:"¿Cómo describe el narrador la sonrisa de la señorita Ríos?", options:["Como una sonrisa educada pero fría","Como una sonrisa mecánica de servicio","Como una sonrisa genuina y cargada de significado","Como una sonrisa triste y melancólica"], answer:2 },
          { id:"pA4q4", text:"¿Qué revela la última oración del texto sobre Don Aurelio?", options:["Que prefiere comer solo para siempre","Que la presencia de la mesera tiene más valor del que él había reconocido","Que está enojado con el servicio del restaurante","Que planea no volver al restaurante"], answer:1 },
          { id:"pA4q5", text:"¿Cuál de los siguientes temas predomina en este fragmento?", options:["La importancia de la buena alimentación","La soledad y la necesidad humana de conexión","Las dificultades del trabajo en restaurantes","Los efectos del envejecimiento en la memoria"], answer:1 },
          { id:"pA4q6", text:"¿Qué función tiene el martes sin la señorita Ríos en la estructura del relato?", options:["Introduce un nuevo personaje principal","Sirve como clímax que revela el valor emocional de la rutina de Don Aurelio","Muestra los problemas laborales del restaurante","Describe la calidad deficiente de la comida"], answer:1 },
        ],
      },
      {
        type: "Artículo de opinión",
        intro: "El siguiente texto es de un artículo de nutrición de la Universidad Complutense de Madrid, 2023.",
        text: `Cuando la UNESCO declaró la dieta mediterránea Patrimonio Cultural Inmaterial de la Humanidad en 2010, muchos españoles sintieron que un aspecto cotidiano de su vida había sido, por fin, reconocido como extraordinario. Lo que para ellos era simplemente "comer bien" —aceite de oliva, legumbres, pescado fresco, vino con moderación, sobremesa larga— resultaba ser un modelo de salud que el mundo entero intentaba imitar.

La dieta mediterránea española no es solo un conjunto de alimentos; es una forma de organizar el tiempo y las relaciones sociales. El almuerzo en España sigue siendo, en muchas familias, la comida principal del día, un momento de reunión y conversación que puede extenderse por una o dos horas. La sobremesa —ese tiempo después de comer en el que se continúa charlando— no tiene equivalente en inglés, lo que sugiere que es un concepto culturalmente específico.

Los nutricionistas advierten, sin embargo, que la dieta mediterránea tradicional está en peligro. Las generaciones más jóvenes consumen más ultraprocesados y comen con mayor frecuencia frente a pantallas, solos y de manera apresurada. El reto no es solo mantener los alimentos, sino preservar los rituales que les dan sentido.`,
        questions: [
          { id:"pA5q1", text:"¿Qué reconocimiento recibió la dieta mediterránea en 2010?", options:["Un premio internacional de nutrición","El título de Patrimonio Cultural Inmaterial de la Humanidad","Una certificación de la Organización Mundial de la Salud","Un reconocimiento del gobierno español"], answer:1 },
          { id:"pA5q2", text:"Según el texto, ¿qué hace única a la sobremesa española?", options:["Es la comida más importante del día","No tiene un equivalente conceptual en inglés","Es obligatoria en todos los hogares españoles","Fue inventada en el siglo XX"], answer:1 },
          { id:"pA5q3", text:"¿Qué amenaza el texto identifica para la dieta mediterránea tradicional?", options:["El precio elevado del aceite de oliva","Los cambios en los hábitos alimentarios de los jóvenes","La influencia de la cocina asiática","La falta de acceso a pescado fresco"], answer:1 },
          { id:"pA5q4", text:"¿Cuál es la idea principal del último párrafo?", options:["Los jóvenes españoles no valoran la tradición culinaria","Preservar la dieta mediterránea implica mantener también sus rituales sociales","Los ultraprocesados son el mayor problema de salud en España","La tecnología ha destruido la cultura alimentaria española"], answer:1 },
          { id:"pA5q5", text:"¿Cuál es el tono predominante de este artículo?", options:["Irónico y crítico","Informativo con una nota de preocupación al final","Entusiasta y celebratorio","Neutral y científico sin opinión"], answer:1 },
        ],
      },
      {
        type: "Poema en prosa",
        intro: "El siguiente texto es de una escritora guatemalteca contemporánea, publicado en 2022.",
        text: `Ciudad mía, ciudad que me expulsó y que no dejo de amar. Hay una contradicción en mis huesos que no sé si es tuya o mía. Crecí entre tus calles empedradas y tus mercados que huelen a copal y tortilla recién hecha, y sin embargo me fui.

No me fui por no amarte. Me fui porque amarte era quedarse pequeña dentro de ti, y yo necesitaba crecer en direcciones que tus paredes no permitían. Me fui con una mochila y una vergüenza que tardé años en entender que no era vergüenza sino duelo.

Desde lejos, te imagino siempre al atardecer, cuando el cielo sobre el volcán se vuelve anaranjado y los pájaros vuelan en bandadas ruidosas sobre la plaza central. Te imagino con la precisión con que se imagina lo que más se ha querido y ya no se puede recuperar.

Volveré algún día, lo sé. Pero volveré diferente, y tú también habrás cambiado. Y quizás ese encuentro entre dos cosas que ya no son lo que eran sea la única forma honesta de reunirse.`,
        questions: [
          { id:"pA6q1", text:"¿Qué sentimiento contradictorio expresa la voz poética en el primer párrafo?", options:["Amor y odio simultáneos por la ciudad","Amor por la ciudad a pesar de haberla dejado","Indiferencia hacia su ciudad natal","Arrepentimiento por haber crecido en esa ciudad"], answer:1 },
          { id:"pA6q2", text:"¿Por qué se fue la voz poética de su ciudad, según el segundo párrafo?", options:["Porque fue expulsada por razones políticas","Porque no soportaba el olor a copal","Porque necesitaba un crecimiento personal que la ciudad no le permitía","Porque encontró mejor trabajo en otra parte"], answer:2 },
          { id:"pA6q3", text:"¿Qué función tiene la imagen del atardecer sobre el volcán en el tercer párrafo?", options:["Describir el clima de Guatemala","Representar el recuerdo idealizado pero preciso de la ciudad amada","Mostrar el peligro de vivir cerca de un volcán","Introducir un cambio de tono hacia lo triste"], answer:1 },
          { id:"pA6q4", text:"¿Qué sugiere la voz poética sobre el reencuentro futuro con su ciudad?", options:["Será una reunión feliz y sin cambios","Será imposible porque la ciudad ya no existe","Será un encuentro entre dos entidades que han cambiado","Será doloroso y la voz poética decidirá no volver"], answer:2 },
          { id:"pA6q5", text:"¿Cuál de las siguientes palabras mejor describe el tono de este poema en prosa?", options:["Furioso","Nostálgico y reflexivo","Alegre y esperanzador","Indiferente"], answer:1 },
        ],
      },
    ],
  },
  partB: {
    label: "Part B — Interpretive: Print and Audio Texts / Textos escritos y auditivos",
    minutes: 55,
    sets: [
      {
        type: "Artículo y audio",
        intro: "El siguiente texto y audio tratan del trabajo remoto en América Latina. Artículo de Expansión, México, 2023.",
        text: `La pandemia de COVID-19 transformó irreversiblemente el mercado laboral latinoamericano. Según un informe del Banco Interamericano de Desarrollo (BID) publicado en 2022, el trabajo remoto pasó del 3% al 23% de los empleos formales en la región entre 2019 y 2021.

Este cambio ha tenido efectos desiguales. Por un lado, ha permitido que profesionales de ciudades secundarias accedan a empleos en empresas de grandes capitales sin tener que emigrar. Por otro, ha profundizado la brecha digital: según la CEPAL, el 46% de los hogares rurales latinoamericanos aún carece de acceso a internet de calidad.

El impacto en las ciudades también es notable. En Ciudad de México, Bogotá y Buenos Aires, el precio del alquiler en zonas residenciales ha aumentado porque muchos trabajadores remotos buscan apartamentos más grandes para montar oficinas en casa. Paradójicamente, mientras el centro comercial pierde dinamismo, los barrios residenciales ganan vida durante el día.

[Transcripción del audio — Podcast 'Economía Hoy', episodio 'El futuro del trabajo en Latinoamérica']

Locutora: Hoy hablamos con Mariana Solís, economista especialista en mercados laborales de la región.

Mariana: Lo que vemos es una polarización. Las personas con educación universitaria y acceso a tecnología han ganado con el teletrabajo: más flexibilidad, menos tiempo en transporte, posibilidad de vivir fuera de la capital. Pero los trabajadores de la economía informal —que representan el 54% del empleo en América Latina— no tuvieron esa opción. No se puede ser albañil o vendedora de mercado desde casa.

Locutora: ¿Y qué pasa con los jóvenes que se incorporan ahora al mercado laboral?

Mariana: Es un grupo interesante. Muchos prefieren el trabajo híbrido al 100% remoto porque extrañan la dimensión social del trabajo. No quieren trabajar en pijama para siempre. Quieren flexibilidad, pero también conexión humana.`,
        questions: [
          { id:"pB1q1", text:"¿Qué porcentaje representaba el trabajo remoto en empleos formales latinoamericanos antes de la pandemia?", options:["23%","46%","3%","54%"], answer:2 },
          { id:"pB1q2", text:"Según el artículo, ¿cuál es una consecuencia negativa del trabajo remoto para las zonas rurales?", options:["La pérdida de empleos agrícolas","La falta de acceso a internet de calidad","El aumento del costo de la vivienda","La reducción del turismo regional"], answer:1 },
          { id:"pB1q3", text:"¿Qué afirma Mariana Solís sobre los trabajadores de la economía informal?", options:["Se han beneficiado más del teletrabajo que nadie","No pudieron acceder al trabajo remoto por la naturaleza de sus empleos","Prefieren trabajar desde casa si se les da la oportunidad","Han encontrado nuevas oportunidades gracias a la tecnología"], answer:1 },
          { id:"pB1q4", text:"¿Qué actitud tienen los jóvenes hacia el trabajo remoto según Mariana Solís?", options:["Prefieren el 100% remoto por su independencia","Rechazan totalmente el trabajo desde casa","Valoran la flexibilidad pero también la interacción social","No tienen opinión definida sobre el tema"], answer:2 },
          { id:"pB1q5", text:"¿Qué efecto paradójico del teletrabajo se menciona en el último párrafo del artículo?", options:["Las empresas ganan más pero los empleados cobran menos","Los centros comerciales pierden dinamismo mientras los barrios residenciales se activan durante el día","La tecnología avanza pero la productividad disminuye","Las ciudades crecen pero los pueblos se despueblan"], answer:1 },
          { id:"pB1q6", text:"¿Cuál es la idea en que coinciden tanto el artículo como el audio?", options:["El trabajo remoto ha beneficiado a todos los sectores por igual","El teletrabajo ha generado efectos desiguales según el tipo de trabajo y acceso tecnológico","Los gobiernos deben prohibir el trabajo remoto","América Latina lidera el teletrabajo a nivel mundial"], answer:1 },
          { id:"pB1q7", text:"¿Cuál es la función del dato de la CEPAL en el artículo?", options:["Criticar la política del gobierno latinoamericano","Apoyar la idea de que el teletrabajo ha profundizado desigualdades existentes","Celebrar el avance tecnológico de la región","Argumentar que el teletrabajo debe expandirse más"], answer:1 },
        ],
      },
      {
        type: "Informe y entrevista",
        intro: "El siguiente texto y audio tratan del español en los Estados Unidos. Adaptado de un informe del Instituto Cervantes, 2023.",
        text: `Con más de 62 millones de hispanohablantes, los Estados Unidos son el segundo país con más hablantes de español en el mundo, solo detrás de México. Esta cifra, que no ha dejado de crecer en las últimas décadas, plantea preguntas profundas sobre identidad, integración y el futuro de la lengua en un contexto no hispanohablante.

El español en Estados Unidos no es una lengua homogénea. Conviven el español caribeño de las comunidades cubanas y puertorriqueñas en Miami y Nueva York, el español mexicano del suroeste, el español centroamericano de Los Ángeles, y una variedad de español "heredado" que hablan los hijos y nietos de inmigrantes, a menudo mezclado con el inglés en un fenómeno conocido como spanglish.

Lejos de ser un "error" o señal de mal dominio de ambas lenguas, el spanglish es cada vez más reconocido por los lingüistas como un dialecto emergente con sus propias reglas de gramática y sintaxis. Para millones de jóvenes latinos en EE.UU., el spanglish es la lengua de la identidad: la que hablan con los primos, la que suena en sus playlists, la que aparece en sus mensajes de texto.

[Transcripción del audio — Entrevista en Radio Pública Latina, programa 'Palabras que nos unen']

Entrevistadora: Hoy hablamos con el sociolingüista Dr. Rafael Moreno sobre el español en Estados Unidos.

Dr. Moreno: El dato más impactante es que, según nuestras proyecciones, para 2050 Estados Unidos tendrá la mayor cantidad de hispanohablantes del mundo, superando a México. Eso es un cambio histórico enorme.

Entrevistadora: ¿Y el spanglish? ¿Es un problema para la preservación del español?

Dr. Moreno: Al contrario. El spanglish demuestra vitalidad lingüística. Una lengua que muere no evoluciona, no se mezcla, no genera nuevas formas. El spanglish es evidencia de que el español está vivo y en movimiento en suelo estadounidense. Lo que sí preocupa a algunos investigadores es la pérdida del español en la tercera generación de inmigrantes, cuando los nietos ya no lo hablan con fluidez.`,
        questions: [
          { id:"pB2q1", text:"¿Cuál es la posición de Estados Unidos en el mundo según el número de hispanohablantes?", options:["Primero","Segundo","Tercero","Cuarto"], answer:1 },
          { id:"pB2q2", text:"¿Qué es el spanglish según el artículo?", options:["Una señal de mal dominio del español y del inglés","Un dialecto emergente con sus propias reglas reconocido por lingüistas","Una forma incorrecta de comunicación que debe corregirse","Un fenómeno exclusivo de la comunidad mexicana"], answer:1 },
          { id:"pB2q3", text:"Según el Dr. Moreno, ¿qué proyección hace para 2050?", options:["El español desaparecerá de Estados Unidos","Estados Unidos tendrá más hispanohablantes que México","El spanglish reemplazará completamente al español","El inglés adoptará palabras del spanglish oficialmente"], answer:1 },
          { id:"pB2q4", text:"¿Qué aspecto del español en EE.UU. preocupa a algunos investigadores según el audio?", options:["El crecimiento del spanglish","La pérdida del español en la tercera generación de inmigrantes","La mezcla del español caribeño con el mexicano","El rechazo del español en las escuelas públicas"], answer:1 },
          { id:"pB2q5", text:"¿Qué actitud comparten el artículo y el audio respecto al spanglish?", options:["Lo ven como una amenaza para el español puro","Lo consideran un fenómeno negativo que debe evitarse","Lo valoran como una manifestación viva de identidad lingüística","Se muestran indiferentes ante su existencia"], answer:2 },
          { id:"pB2q6", text:"¿Por qué el Dr. Moreno afirma que el spanglish demuestra 'vitalidad lingüística'?", options:["Porque tiene más hablantes que el español estándar","Porque está siendo aprobado oficialmente por el gobierno","Porque una lengua que evoluciona y se mezcla está viva","Porque los jóvenes lo prefieren al inglés"], answer:2 },
          { id:"pB2q7", text:"¿Cuál de las siguientes afirmaciones es apoyada tanto por el artículo como por el audio?", options:["El español en EE.UU. es homogéneo y unificado","El español en EE.UU. tiene gran presencia y complejidad pero enfrenta desafíos generacionales","El spanglish es un problema que los gobiernos deben resolver","Los hispanohablantes de EE.UU. prefieren hablar solo inglés"], answer:1 },
        ],
      },
      {
        type: "Informe y reportaje",
        intro: "El siguiente texto y audio tratan de la vivienda en las ciudades latinoamericanas. Adaptado de un informe de ONU-Hábitat, 2022.",
        text: `En América Latina, el acceso a la vivienda digna sigue siendo uno de los retos más urgentes de las políticas públicas. Según ONU-Hábitat, el 21% de la población urbana de la región vive en asentamientos informales —conocidos en distintos países como favelas, comunas, villas miseria o colonias populares—, donde el acceso a servicios básicos como agua potable, saneamiento y electricidad no está garantizado.

El problema no es solo de cantidad, sino de calidad y ubicación. Las familias de bajos ingresos suelen acceder a vivienda en las periferias urbanas, lejos de los empleos, las escuelas de calidad y los centros de salud. Esta segregación espacial reproduce y amplifica las desigualdades sociales: los hijos de familias que viven en la periferia tienen menos acceso a oportunidades que los que crecen en zonas céntricas.

Algunas ciudades han implementado programas innovadores. Medellín, que en los años 90 era conocida por su violencia, invirtió en teleféricos, escaleras mecánicas y bibliotecas en los barrios más marginados. El resultado fue una transformación que el mundo estudia como modelo: conectar físicamente los barrios populares con el centro de la ciudad equivalió, para muchos residentes, a conectarse con el futuro.

[Transcripción del audio — Reportaje de CNN en Español, programa 'Ciudades del mañana']

Periodista: Estamos en el barrio Santo Domingo Savio, en Medellín, uno de los que más ha cambiado en los últimos veinte años. Con nosotros está Doña Esperanza Restrepo, que lleva aquí cincuenta años.

Doña Esperanza: Cuando era joven, esto era tierra de nadie. Ni el alcalde se asomaba. Ahora hay una biblioteca preciosa, el teleférico nos lleva al metro en diez minutos. Mis nietos van a mejores escuelas que yo pude imaginar.

Periodista: ¿Cree que el cambio fue solo físico?

Doña Esperanza: No, fue de dignidad. Antes parecía que vivir aquí arriba era una vergüenza. Ahora la gente viene a visitar el barrio. Eso cambia cómo te sientes contigo mismo.`,
        questions: [
          { id:"pB3q1", text:"¿Qué porcentaje de la población urbana latinoamericana vive en asentamientos informales, según el informe?", options:["3%","21%","46%","54%"], answer:1 },
          { id:"pB3q2", text:"Según el artículo, ¿cuál es una consecuencia de que las familias de bajos ingresos vivan en la periferia?", options:["Tienen más acceso a espacios naturales","Están más cerca de sus empleos","Sus hijos tienen menos acceso a oportunidades","Pagan menos impuestos"], answer:2 },
          { id:"pB3q3", text:"¿Qué transformación experimentó Medellín según el artículo?", options:["Fue reconstruida completamente por el gobierno nacional","Invirtió en infraestructura y servicios en barrios marginados con resultados notables","Trasladó a la población de los barrios pobres al centro","Privatizó todos los servicios públicos"], answer:1 },
          { id:"pB3q4", text:"¿Qué cambio describe Doña Esperanza en el audio además del físico?", options:["Un cambio económico: ahora trabaja más y gana más","Un cambio político: el alcalde visita el barrio frecuentemente","Un cambio de dignidad: cómo los residentes se perciben a sí mismos","Un cambio climático: el barrio tiene más áreas verdes"], answer:2 },
          { id:"pB3q5", text:"¿Cuál es el propósito del ejemplo de Medellín en el artículo?", options:["Criticar la política de Colombia hacia los pobres","Mostrar que el problema de vivienda solo tiene soluciones en ciudades grandes","Ilustrar que la inversión en infraestructura en zonas marginadas puede transformar comunidades","Argumentar que los teleféricos son la mejor solución para todas las ciudades"], answer:2 },
          { id:"pB3q6", text:"¿Qué aspecto de la transformación de Medellín es más valorado por Doña Esperanza?", options:["La belleza de la nueva biblioteca","La rapidez del teleférico","El cambio en cómo los residentes se ven a sí mismos","Las mejoras en las escuelas para sus nietos"], answer:2 },
          { id:"pB3q7", text:"¿Cuál de las siguientes ideas resumen mejor tanto el artículo como el audio?", options:["La vivienda informal es inevitable en América Latina","La inversión en infraestructura en zonas marginadas puede transformar comunidades tanto físicamente como en su autoestima","El gobierno colombiano es un modelo para toda la región","El problema de vivienda en América Latina no tiene solución"], answer:1 },
        ],
      },
    ],
  },
};

function makeSimSectionI(themes, simId) {
  // All simulations use the same Section I passages
  // (College Board never releases official MC; simulations use practice content)
  return SPANISH_SECTION_I;
}

// Attach Section I data to simulation tests
ALL_TESTS.forEach(t => {
  if (t.badge !== "Official") t.sectionI = makeSimSectionI(t.themes, t.id);
});
function Timer({ seconds, onExpire, label }) {
  const [remaining, setRemaining] = useState(seconds);
  const ref = useRef(null);
  useEffect(() => { setRemaining(seconds); }, [seconds]);
  useEffect(() => {
    if (remaining <= 0) { onExpire?.(); return; }
    ref.current = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(ref.current);
  }, [remaining]);
  const pct = (remaining / seconds) * 100;
  const isUrgent = remaining <= 60;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.2rem", fontFamily: "'Courier New', monospace", fontWeight: 700, color: isUrgent ? "#e74c3c" : "#2c3e50", letterSpacing: "0.05em" }}>
        {formatTime(remaining)}
      </div>
      {label && <div style={{ fontSize: "0.75rem", color: "#7f8c8d", marginTop: 2 }}>{label}</div>}
      <div style={{ width: "100%", height: 6, background: "#ecf0f1", borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: isUrgent ? "#e74c3c" : "#27ae60", transition: "width 1s linear, background 0.5s", borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ─── Audio Player (Web Speech API TTS) ───────────────────────────────────────
// Supports two modes:
//   - Single utterance: plain text (reports, interviews)
//   - Dialogue: array of {speaker, text} objects — alternates male/female voices

function AudioPlayer({ text, label = "Listen / Escuchar", dialogue = null }) {
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [plays, setPlays] = useState(0);
  const [speakerIdx, setSpeakerIdx] = useState(0); // which line is playing
  const queueRef = useRef([]);
  const stopRef = useRef(false);

  function makeUtt(txt, voiceHint) {
    // Strip characters that TTS engines read aloud as punctuation names
    const cleaned = txt
      .replace(/[¡¿«»]/g, "")           // Spanish inverted punct & guillemets
      .replace(/[—–]/g, ", ")            // em/en dash → pause
      .replace(/\s{2,}/g, " ")           // collapse extra spaces
      .trim();
    const utt = new SpeechSynthesisUtterance(cleaned);
    utt.lang  = "es-ES";
    utt.rate  = 0.82;
    utt.pitch = 1.0;
    const voices   = window.speechSynthesis.getVoices();
    const spanishs = voices.filter(v => v.lang.startsWith("es"));
    // Female: named Spanish voices + macOS female-coded names
    const femaleVoices = spanishs.filter(v =>
      /mónica|monica|paulina|marisol|maria|elena|laura|sofia|rosa|ines|inés|grandma|flo|shelley|sandy/i.test(v.name)
    );
    // Male: named Spanish voices + macOS male-coded names
    const maleVoices = spanishs.filter(v =>
      /jorge|diego|juan|carlos|miguel|alejandro|pablo|antonio|enrique|felipe|grandpa|eddy|reed|rocko/i.test(v.name)
    );
    // Prefer es-ES accent for female, es-MX for male (more variety)
    const fVoice = femaleVoices.find(v => v.lang === "es-ES") || femaleVoices[0] || spanishs[0];
    const mVoice = maleVoices.find(v => v.lang === "es-MX")   || maleVoices[0]   || spanishs.find(v => v !== fVoice) || spanishs[0];
    if (voiceHint === "f" || voiceHint === "host") {
      if (fVoice) utt.voice = fVoice;
      utt.pitch = voiceHint === "host" ? 1.05 : 1.0;
    } else if (voiceHint === "m") {
      if (mVoice) utt.voice = mVoice;
      utt.pitch = 0.92;
    } else {
      if (fVoice) utt.voice = fVoice;
    }
    return utt;
  }

  // Play a queue of {text, voiceHint} items sequentially with pauses
  function playQueue(items, idx = 0) {
    if (stopRef.current || idx >= items.length) {
      if (!stopRef.current) {
        setPlaying(false);
        setDone(true);
        setSpeakerIdx(0);
        setPlays(p => p + 1);
      }
      return;
    }
    setSpeakerIdx(idx);
    const utt = makeUtt(items[idx].text, items[idx].voiceHint);
    utt.onend = () => {
      // pause between speakers/sentences
      const delay = dialogue ? 650 : 250;
      setTimeout(() => playQueue(items, idx + 1), delay);
    };
    utt.onerror = () => { setPlaying(false); };
    window.speechSynthesis.speak(utt);
  }

  function speak() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    stopRef.current = false;
    setPlaying(true);
    setDone(false);

    let items;
    if (dialogue) {
      const speakers = [...new Set(dialogue.map(d => d.speaker))];
      items = dialogue.map(d => {
        const spk = d.speaker;
        // Conduttore/Moderatore gets neutral host voice
        if (/presentador|presentadora|moderador|moderadora|locutor/i.test(spk)) return { text: d.text, voiceHint: "host" };
        // First speaker gets female, second gets male, then alternates
        const idx = speakers.indexOf(spk);
        return { text: d.text, voiceHint: idx % 2 === 0 ? "f" : "m" };
      });
    } else {
      // Split monologue into sentences for better pacing
      items = text
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.trim().length > 2)
        .map(s => ({ text: s.trim(), voiceHint: "n" }));
    }

    queueRef.current = items;
    // Small initial delay so state updates before speech starts
    setTimeout(() => playQueue(items, 0), 80);
  }

  function stopAll() {
    stopRef.current = true;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setSpeakerIdx(0);
  }

  const displayLines = dialogue || [];

  return (
    <div style={{ background: "linear-gradient(135deg, #1a252f, #2c3e50)", borderRadius: 12, padding: "16px 20px", color: "white" }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#8aa8c0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
        🎧 {label}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        {!playing ? (
          <button onClick={speak} style={{ background: done ? "#27ae60" : "#e74c3c", color: "white", border: "none", borderRadius: "50%", width: 46, height: 46, fontSize: "1.3rem", cursor: "pointer", flexShrink: 0 }}>
            {done ? "↺" : "▶"}
          </button>
        ) : (
          <button onClick={stopAll} style={{ background: "#e74c3c", color: "white", border: "none", borderRadius: "50%", width: 46, height: 46, fontSize: "1.1rem", cursor: "pointer", flexShrink: 0 }}>⏹</button>
        )}

        {playing ? (
          <div style={{ flex: 1, display: "flex", gap: 3, alignItems: "center" }}>
            {[...Array(14)].map((_, i) => (
              <div key={i} style={{ width: 3, background: "#e74c3c", borderRadius: 2, animation: "eq 0.5s ease-in-out infinite", animationDelay: `${i * 0.07}s` }} />
            ))}
            <style>{`@keyframes eq { 0%,100%{height:5px} 50%{height:${14}px} }`}</style>
          </div>
        ) : (
          <span style={{ fontSize: "0.8rem", color: "#8aa8c0" }}>
            {done ? `Listened ${plays}x — listen again / Escuchado ${plays}x — volver a escuchar` : "Press ▶ to listen / Presiona ▶ para escuchar"}
          </span>
        )}
      </div>

      {/* Dialogue transcript with highlighted active speaker */}
      {dialogue && dialogue.length > 0 && (
        <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
          {dialogue.map((line, i) => {
            const speakers = [...new Set(dialogue.map(d => d.speaker))];
            const isA = speakers.indexOf(line.speaker) % 2 === 0;
            const isActive = playing && speakerIdx === i;
            return (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "flex-start",
                opacity: playing && !isActive ? 0.45 : 1,
                transition: "opacity 0.3s",
              }}>
                <div style={{
                  flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, padding: "2px 7px",
                  borderRadius: 10, marginTop: 2,
                  background: isA ? "#2980b9" : "#8e44ad",
                  color: "white", whiteSpace: "nowrap",
                }}>
                  {isActive ? "▶ " : ""}{line.speaker}
                </div>
                <div style={{ fontSize: "0.8rem", lineHeight: 1.55, color: isActive ? "white" : "#a0b8cc" }}>
                  {line.text}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: "0.69rem", color: "#4a6070", marginTop: 8 }}>
        {!window.speechSynthesis ? "⚠️ Audio not available in this browser / Audio no disponible en este navegador" : "Reduced speed · Distinct voices per speaker / Velocidad reducida · Voces distintas"}
      </div>
    </div>
  );
}

// ─── Chart Display (SVG bar chart) ────────────────────────────────────────────
function ChartDisplay({ chartData }) {
  if (!chartData) return null;
  const { title, type = "bar", items } = chartData;
  const maxVal = Math.max(...items.map(d => d.value));

  if (type === "pie") {
    const colors = ["#3498db","#27ae60","#e74c3c","#f39c12","#9b59b6","#1abc9c","#e67e22","#e91e63","#00bcd4","#ff5722","#8bc34a","#673ab7"];
    const maxVal = Math.max(...items.map(d => d.value));
    return (
      <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2c3e50", marginBottom: 16, textAlign: "center" }}>{title}</div>
        {items.map((d, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#2c3e50", marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{d.label}</span>
              <span style={{ fontWeight: 700, color: colors[i % colors.length] }}>{d.value}{d.unit || ""}</span>
            </div>
            <div style={{ height: 18, background: "#e8ecef", borderRadius: 9, overflow: "hidden" }}>
              <div style={{ width: `${(d.value / maxVal) * 100}%`, height: "100%", background: colors[i % colors.length], borderRadius: 9, transition: "width 0.8s ease", opacity: 0.88 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Bar chart
  const svgH = 160, svgW = 340, padL = 40, padB = 40, padT = 10, barW = Math.min(40, (svgW - padL - 20) / items.length - 8);
  const chartH = svgH - padB - padT;
  const spacing = (svgW - padL - 20) / items.length;

  return (
    <div style={{ background: "#f8f9fa", borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2c3e50", marginBottom: 8, textAlign: "center" }}>{title}</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ overflow: "visible" }}>
        {/* Y axis */}
        <line x1={padL} y1={padT} x2={padL} y2={svgH - padB} stroke="#ccc" strokeWidth={1} />
        <line x1={padL} y1={svgH - padB} x2={svgW - 10} y2={svgH - padB} stroke="#ccc" strokeWidth={1} />
        {/* Bars */}
        {items.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const x = padL + i * spacing + (spacing - barW) / 2;
          const y = svgH - padB - barH;
          const colors = ["#3498db","#27ae60","#e74c3c","#f39c12","#9b59b6","#1abc9c","#e67e22"];
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} fill={colors[i % 7]} rx={3} opacity={0.85} />
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={9} fill="#2c3e50" fontWeight="700">{d.value}{d.unit || ""}</text>
              <text x={x + barW / 2} y={svgH - padB + 14} textAnchor="middle" fontSize={8} fill="#666">{d.shortLabel || d.label.substring(0, 10)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}


function AIFeedback({ taskType, prompt, response, onClose }) {
  const [feedback, setFeedback] = useState(""); const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const apiUrl = "https://apspanish-simulation-production.up.railway.app";
        const res = await fetch(`${apiUrl}/api/score`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514", max_tokens: 1000,
            system: `You are an AP Spanish Language and Culture exam scorer. Evaluate the student's response using the AP rubric (1-5 scale). Be specific, constructive, encouraging. Write in English. Format: 1) Score estimate 2) Strengths (2-3 things) 3) Improvements (2-3 suggestions) 4) One example correction in Spanish. Under 250 words.`,
            messages: [{ role: "user", content: `Task: ${taskType}\nPrompt: ${prompt}\nStudent response:\n${response}` }],
          }),
        });
        const data = await res.json();
        setFeedback(data.content?.[0]?.text || "Unable to generate feedback.");
      } catch { setFeedback("Connection error. Please try again."); }
      setLoading(false);
    })();
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: "white", borderRadius: 16, maxWidth: 600, width: "100%", maxHeight: "80vh", overflow: "auto", padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#2c3e50", fontSize: "1.3rem" }}>🤖 AI Feedback</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#7f8c8d" }}>✕</button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ width: 40, height: 40, border: "4px solid #ecf0f1", borderTop: "4px solid #3498db", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ color: "#7f8c8d" }}>Analyzing your response...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ lineHeight: 1.7, color: "#2c3e50", whiteSpace: "pre-wrap" }}>{feedback}</div>
        )}
      </div>
    </div>
  );
}

// ─── Task 1: Email ────────────────────────────────────────────────────────────
function Task1({ data, onComplete }) {
  const [response, setResponse] = useState("");
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={cardStyle}>
          <h3 style={sectionTitle}>📋 Directions</h3>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.65, color: "#444" }}>Write a formal reply to the email. Include a greeting and closing, respond to ALL questions, ask for additional information about something mentioned, and use the formal <em>Lei</em> form throughout.<br/><span style={{ color: "#888", fontSize: "0.79rem" }}>Write a formal reply to the email. Include a greeting and closing, answer ALL questions, chiedi ulteriori informazioni su qualcosa menzionato e usa la forma <em>Lei</em>.</span></p>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }} />
          <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}><strong>Course Theme / Tema del curso:</strong> {data.theme}<br /><strong>Tiempo / Time:</strong> 15 min</p>
        </div>
        <div style={cardStyle}>
          <h3 style={sectionTitle}>✉️ Email</h3>
          <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 14, fontSize: "0.83rem" }}>
            <div style={{ marginBottom: 8 }}><strong>Da:</strong> {data.email.from}<br /><strong>Soggetto:</strong> {data.email.subject}</div>
            <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "8px 0" }} />
            <p style={{ fontSize: "0.77rem", color: "#666", fontStyle: "italic", marginBottom: 10 }}><strong>Introduzione:</strong> {data.email.intro}</p>
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>{data.email.body}</div>
          </div>
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <h3 style={{ ...sectionTitle, marginBottom: 0 }}>✍️ Your Response / Tu respuesta</h3>
          <div style={{ minWidth: 160 }}><Timer seconds={15 * 60} label="15 minutes" onExpire={() => {}} /></div>
        </div>
        <textarea value={response} onChange={e => setResponse(e.target.value)}
          placeholder={`Estimado/a ${data.email.from.split("—")[0].trim()},\n\n...`}
          style={{ width: "100%", minHeight: 260, padding: 14, border: "2px solid #e0e0e0", borderRadius: 8, fontSize: "0.93rem", fontFamily: "Georgia, serif", lineHeight: 1.8, resize: "vertical", boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 12, marginTop: 12, justifyContent: "flex-end" }}>
          <button onClick={() => onComplete(response)} style={btnStyle}>Next Task →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Task 2: Essay ────────────────────────────────────────────────────────────
function Task2({ data, onComplete }) {
  const [phase, setPhase] = useState("reading");
  const [response, setResponse] = useState("");

  // Safety check
  if (!data || !data.sources || !Array.isArray(data.sources)) {
    return (
      <div style={{ ...cardStyle, textAlign: "center", padding: 40 }}>
        <p style={{ color: "#e74c3c" }}>Error loading Task 2 data. Please go back and try again.</p>
        <button onClick={() => onComplete("")} style={btnStyle}>Skip / Salta →</button>
      </div>
    );
  }

  // Parse a text block into structured dialogue lines [{speaker, text}] if it has "Name: text" pattern
  function parseDialogue(txt) {
    const lines = txt.split("\n").filter(l => l.trim());
    const dialogueLines = [];
    for (const line of lines) {
      const m = line.match(/^((?:(?:Prof|Dott|Dr|Sig\.ra?)\.\s+)?[A-ZÀ-Ü][a-zà-ü]+(?:\s[A-ZÀ-Ü][a-zà-ü]+)*|Conduttore|Conduttrice|Moderatore):\s*(.+)/);
      if (m) dialogueLines.push({ speaker: m[1].trim(), text: m[2].trim() });
    }
    return dialogueLines.length >= 2 ? dialogueLines : null;
  }

  function renderSource(src) {
    try {
      const isAudio = src.text.trim().startsWith("[Trascrizione audio]") || src.text.trim().startsWith("[Transcripción") || src.text.trim().startsWith("[Audio");
      const isChart = src.text.trim().startsWith("[Dati") || src.text.trim().startsWith("[Datos del gr") || src.title.toLowerCase().includes("infografic") || src.title.toLowerCase().includes("grafico") || src.title.toLowerCase().includes("gráfico") || src.title.toLowerCase().includes("statistich") || src.title.toLowerCase().includes("dati") || src.title.toLowerCase().includes("deuda") || src.title.toLowerCase().includes("factores");

    // Extract clean audio text (strip stage directions)
    const audioText = src.text.replace(/\[.*?\]\n*/g, "").replace(/^"+|"+$/g, "").trim();
    const dialogue = parseDialogue(audioText);

    // Parse chart data from bullet list
    let chartData = null;
    if (isChart) {
      const lines = src.text.split("\n").filter(l => l.trim().startsWith("•"));
      const items = lines.map(l => {
        const match = l.match(/•\s*(.+?):\s*([\d,.]+)\s*(%|€|ore|anni)?/);
        if (!match) return null;
        const label = match[1].trim();
        const value = parseFloat(match[2].replace(",", "."));
        return { label, shortLabel: label.split(/[\s(,]/)[0], value, unit: match[3] || "" };
      }).filter(Boolean);
      if (items.length >= 2) chartData = { title: src.title, type: "bar", items };
    }

    return (
      <div key={src.num} style={{ ...cardStyle, marginBottom: 14 }}>
        <h4 style={{ margin: "0 0 6px" }}>Source / Fonte {src.num}: {src.title}</h4>
        <p style={{ fontSize: "0.79rem", color: "#777", fontStyle: "italic", marginBottom: 10 }}>{src.intro}</p>
        {isAudio ? (
          <AudioPlayer
            text={audioText}
            dialogue={dialogue}
            label={`Source ${src.num} — Listen / Escucha (2x)`}
          />
        ) : isChart && chartData ? (
          <ChartDisplay chartData={{ ...chartData, type: chartData.items.length > 6 ? "pie" : "bar" }} />
        ) : (
          <div style={{ fontSize: "0.87rem", lineHeight: 1.75, whiteSpace: "pre-line" }}>{src.text}</div>
        )}
      </div>
    );
  } catch(e) {
    return <div style={{ ...cardStyle, marginBottom: 14, color: "#e74c3c" }}>Error rendering source {src?.num}.</div>;
  }
}

  return (
    <div>
      {phase === "reading" && (
        <div>
          <div style={{ ...cardStyle, background: "#e8f4fd", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ ...sectionTitle, color: "#2980b9" }}>📖 Reading Phase / Fase de lectura — 6 minutes / 6 minutos</h3>
                <p style={{ margin: "0 0 4px", fontSize: "0.84rem" }}>Read the topic and all sources. Take notes. For audio sources press ▶ to listen.</p>
                <p style={{ margin: "0 0 8px", fontSize: "0.79rem", color: "#888" }}>Read all sources / Lee todas las fuentes. Take notes. Press ▶ to listen to audio sources / Presiona ▶ para escuchar las fuentes de audio.</p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem" }}><strong>Topic / Tema:</strong> {data.topic}</p>
              </div>
              <div style={{ minWidth: 160 }}><Timer seconds={6 * 60} label="Reading / Lectura" onExpire={() => setPhase("writing")} /></div>
            </div>
            <button onClick={() => setPhase("writing")} style={{ ...btnStyle, marginTop: 12 }}>Ir a la escritura / Go to Writing →</button>
          </div>
          {data.sources.map(src => renderSource(src))}
        </div>
      )}
      {phase === "writing" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ ...cardStyle, background: "#f0f9ff" }}>
              <h4 style={{ margin: "0 0 8px", color: "#2980b9" }}>📝 Essay Prompt / Tema del ensayo</h4>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: "0 0 8px" }}>{data.topic}</p>
              <p style={{ fontSize: "0.79rem", color: "#666", margin: 0 }}>Cite all 3 sources · Defend a clear thesis · Formal Spanish · Organized paragraphs<br/><span style={{ color: "#aaa" }}>Cita tutte e 3 le fonti · Difendi una tesi chiara · Spanisho formale · Paragrafi organizzati</span></p>
            </div>
            <div style={cardStyle}>
              <h4 style={{ margin: "0 0 8px" }}>⏱️ Writing Time / Tiempo de escritura</h4>
              <Timer seconds={49 * 60} label="49 min" onExpire={() => {}} />
            </div>
          </div>
          {/* Sources compact reference */}
          <details style={{ marginBottom: 14 }}>
            <summary style={{ cursor: "pointer", fontSize: "0.82rem", color: "#3498db", fontWeight: 600, padding: "6px 0" }}>📚 Review sources while writing / Revisar fuentes durante la escritura</summary>
            <div style={{ marginTop: 10 }}>{data.sources.map(src => renderSource(src))}</div>
          </details>
          <div style={cardStyle}>
            <textarea value={response} onChange={e => setResponse(e.target.value)}
              placeholder="Write your argumentative essay here... / Escribe tu ensayo argumentativo aquí..."
              style={{ width: "100%", minHeight: 380, padding: 14, border: "2px solid #e0e0e0", borderRadius: 8, fontSize: "0.93rem", fontFamily: "Georgia, serif", lineHeight: 1.85, resize: "vertical", boxSizing: "border-box" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontSize: "0.8rem", color: "#aaa" }}>{response.split(/\s+/).filter(Boolean).length} words / parole</span>
              <button onClick={() => onComplete(response)} style={btnStyle}>Next Task / Siguiente tarea →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Speech Recorder ─────────────────────────────────────────────────────────
function SpeechRecorder({ onResult, onInterim, autoStart = false, maxSeconds = 20 }) {
  const [status, setStatus] = useState("idle");
  const [displayTranscript, setDisplayTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const recogRef = useRef(null);
  const maxTimerRef = useRef(null);
  const elapsedRef = useRef(null);
  const finalRef = useRef("");
  const statusRef = useRef("idle");
  const startTimeRef = useRef(0);
  // Keep callbacks in refs so they never go stale inside SpeechRecognition handlers
  const onResultRef = useRef(onResult);
  const onInterimRef = useRef(onInterim);
  useEffect(() => { onResultRef.current = onResult; }, [onResult]);
  useEffect(() => { onInterimRef.current = onInterim; }, [onInterim]);

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!SR;

  function stopListening() {
    clearTimeout(maxTimerRef.current);
    clearInterval(elapsedRef.current);
    try { recogRef.current?.abort(); } catch (_) {}
    statusRef.current = "done";
    setStatus("done");
    setInterim("");
    onResultRef.current?.(finalRef.current.trim());
  }

  function makeRecog() {
    const recog = new SR();
    recog.lang = "es-ES";
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;
    recog.onresult = (e) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalRef.current += t + " ";
          // fire onResult immediately on each final segment
          onResultRef.current?.(finalRef.current.trim());
        } else {
          interimText += t;
        }
      }
      setDisplayTranscript(finalRef.current.trim());
      setInterim(interimText);
      onInterimRef.current?.(finalRef.current.trim() + (interimText ? " " + interimText : ""));
    };
    recog.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        statusRef.current = "denied";
        setStatus("denied");
        clearTimeout(maxTimerRef.current);
        clearInterval(elapsedRef.current);
      }
      // no-speech / aborted are non-fatal — onend will trigger restartRecog
    };
    recog.onend = () => {
      if (statusRef.current === "listening") {
        // 150ms gap so Chrome fully releases mic before restart
        setTimeout(() => {
          if (statusRef.current !== "listening") return;
          try {
            const r2 = makeRecog();
            recogRef.current = r2;
            r2.start();
          } catch (_) {}
        }, 150);
      }
    };
    return recog;
  }

  function startListening() {
    if (!supported) { setStatus("unsupported"); statusRef.current = "unsupported"; return; }

    // Abort any existing instance before starting fresh
    try { recogRef.current?.abort(); } catch(_) {}
    recogRef.current = null;

    finalRef.current = "";
    startTimeRef.current = Date.now();
    setElapsed(0);
    setDisplayTranscript("");
    setInterim("");
    statusRef.current = "listening";
    setStatus("listening");

    const recog = makeRecog();
    recogRef.current = recog;
    try { recog.start(); } catch (_) {}

    elapsedRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    maxTimerRef.current = setTimeout(() => stopListening(), maxSeconds * 1000);
  }

  useEffect(() => {
    finalRef.current = "";
    statusRef.current = "idle";
    let autoTimer = null;
    if (autoStart) {
      // Delay so Chrome fully releases mic from any previous SpeechRecognition instance
      autoTimer = setTimeout(() => startListening(), 500);
    }
    return () => {
      clearTimeout(autoTimer);
      clearTimeout(maxTimerRef.current);
      clearInterval(elapsedRef.current);
      statusRef.current = "done"; // prevent restartRecog from firing after unmount
      try { recogRef.current?.abort(); } catch(_) {}
      recogRef.current = null;
    };
  }, []);

  const remaining = Math.max(0, maxSeconds - elapsed);
  const colors = {
    idle: "#3498db", requesting: "#f39c12", listening: "#e74c3c",
    done: "#27ae60", denied: "#e74c3c", unsupported: "#95a5a6"
  };
  const bg = colors[status] || "#3498db";

  return (
    <div style={{ border: `2px solid ${bg}`, borderRadius: 12, padding: 16, background: status === "listening" ? "#fff8f8" : "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <button
          onClick={status === "listening" ? stopListening : status === "requesting" || status === "unsupported" ? undefined : (() => {
            if (status === "done") {
              // Reset and allow re-record
              finalRef.current = "";
              setDisplayTranscript("");
              setInterim("");
              setElapsed(0);
              statusRef.current = "idle";
              setStatus("idle");
            } else {
              startListening();
            }
          })}
          disabled={status === "requesting" || status === "unsupported"}
          style={{ width: 52, height: 52, borderRadius: "50%", border: "none", background: bg, color: "white", fontSize: "1.3rem", cursor: (status === "done" || status === "requesting" || status === "unsupported") ? "default" : "pointer", flexShrink: 0, position: "relative" }}
        >
          {status === "listening" ? "⏹" : status === "done" ? "🔄" : status === "requesting" ? "⏳" : status === "denied" ? "🔒" : "🎙️"}
          {status === "listening" && (
            <span style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "3px solid #e74c3c", animation: "pulse 1.2s ease-out infinite" }} />
          )}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: bg }}>
            {status === "idle"       && "Press 🎙️ to start / Presiona 🎙️ para empezar"}
            {status === "requesting" && "⏳ Richiesta accesso microfono..."}
            {status === "listening"  && `🔴 Recording / Grabando — ${remaining}s`}
            {status === "done"       && `✓ Done · ${finalRef.current.trim().split(/\s+/).filter(Boolean).length} words · Tap 🔄 to re-record`}
            {status === "denied"     && "🔒 Accesso microfono negato"}
            {status === "unsupported"&& "⚠️ Requires Google Chrome / Requiere Google Chrome"}
          </div>
          {status === "listening" && (
            <div style={{ marginTop: 4, height: 4, background: "#fdd", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#e74c3c", borderRadius: 2, width: `${(elapsed / maxSeconds) * 100}%`, transition: "width 1s linear" }} />
            </div>
          )}
          {status === "listening" && interim && (
            <div style={{ fontSize: "0.76rem", color: "#999", fontStyle: "italic", marginTop: 4 }}>{interim}</div>
          )}
        </div>
      </div>

      {/* Denied — clear actionable instructions */}
      {status === "denied" && (
        <div style={{ background: "#fdf2f2", border: "1px solid #f5c6cb", borderRadius: 8, padding: "12px 14px", fontSize: "0.8rem", color: "#721c24", lineHeight: 1.7, marginBottom: 8 }}>
          <strong>Microphone access was denied.</strong><br/>
          To fix: click the 🔒 or 🎤 icon in Chrome's address bar → <strong>"Microphone"</strong> → <strong>"Allow"</strong> → reload the page.
        </div>
      )}

      {status === "unsupported" && (
        <div style={{ fontSize: "0.78rem", color: "#e74c3c", marginTop: 8 }}>
          Voice transcription requires Google Chrome. Type your response in the text box below.
        </div>
      )}

      {(displayTranscript || interim) && (
        <div style={{ background: "#f8f9fa", borderRadius: 8, padding: "10px 14px", fontSize: "0.87rem", lineHeight: 1.7, color: "#2c3e50", minHeight: 50, marginTop: 8 }}>
          <span>{displayTranscript}</span>
          {interim && <span style={{ color: "#bbb" }}> {interim}</span>}
        </div>
      )}
      <style>{`@keyframes pulse { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.7)} }`}</style>
    </div>
  );
}

// ─── Task 3: Conversation ─────────────────────────────────────────────────────
// Flow:
//   screen === "reading"  → 1-min countdown, full outline table visible (like official exam p.12)
//   screen === "convo", phase === "playing"   → partner TTS plays; student panel dimmed; partner text HIDDEN
//   screen === "convo", phase === "recording" → 20-sec student window; partner text revealed
function Task3({ data, onComplete }) {
  const [screen, setScreen]       = useState("reading");  // "reading" | "convo"
  const [turnIdx, setTurnIdx]     = useState(0);
  const [phase, setPhase]         = useState("playing");   // "playing" | "recording"
  const [timerKey, setTimerKey]   = useState(0);
  const [responses, setResponses] = useState({});
  const uttRef = useRef(null);

  const currentTurn = data.turns[turnIdx];

  // Speak partner line then open recording window
  function playPartnerLine(text) {
    window.speechSynthesis?.cancel();
    const cleaned = text.replace(/[¡¿«»]/g, "").replace(/[—–]/g, ", ").trim();
    const utt = new SpeechSynthesisUtterance(cleaned);
    utt.lang = "es-ES";
    utt.rate = 0.82;
    utt.pitch = 1.0;
    const voices = window.speechSynthesis?.getVoices() || [];
    const esVoice = voices.find(v => /mónica|monica|paulina|grandma|flo|shelley|sandy/i.test(v.name)) || voices.find(v => v.lang?.startsWith("es"));
    if (esVoice) utt.voice = esVoice;
    utt.onend  = () => { setPhase("recording"); setTimerKey(k => k + 1); };
    utt.onerror = () => { setPhase("recording"); setTimerKey(k => k + 1); };
    uttRef.current = utt;
    window.speechSynthesis?.speak(utt);
  }

  function startTurn(idx) {
    setTurnIdx(idx);
    setPhase("playing");
    setTimeout(() => playPartnerLine(data.turns[idx].text), 120);
  }

  function startConversation() {
    setScreen("convo");
    setTimeout(() => playPartnerLine(data.turns[0].text), 200);
  }

  function nextTurn() {
    window.speechSynthesis?.cancel();
    if (turnIdx < data.turns.length - 1) {
      startTurn(turnIdx + 1);
    } else {
      onComplete(responses);
    }
  }

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  // ── READING PHASE — full outline table, 1-min timer ──
  if (screen === "reading") {
    return (
      <div>
        <div style={{ ...cardStyle, background: "#e8f8f5", marginBottom: 16 }}>
          <h3 style={{ ...sectionTitle, color: "#1abc9c" }}>🗣️ Task 3: Conversation / Conversación</h3>
          <p style={{ margin: "0 0 2px", fontSize: "0.84rem" }}><strong>Course Theme / Tema del examen:</strong> {data.theme}</p>
          <p style={{ margin: 0, fontSize: "0.84rem", color: "#555" }}>{data.intro}</p>
        </div>

        <div style={cardStyle}>
          {/* Header row: instructions + timer side by side */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#e67e22", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                📖 You have 1 minute to read the preview / Hai 1 minuto per leggere l'introduzione
              </div>
              <p style={{ fontSize: "0.84rem", lineHeight: 1.65, margin: 0, color: "#444" }}>
                Participate in a conversation following the outline. When it is your turn, you have <strong>20 seconds</strong> to record your response. Participate as fully and appropriately as possible.
              </p>
              <p style={{ fontSize: "0.79rem", lineHeight: 1.65, margin: "6px 0 0", color: "#888" }}>
                Take part in a conversation. When it's your turn to speak, you have <strong>20 seconds</strong> / Participa en una conversación. Cuando sea tu turno, tienes <strong>20 segundos</strong> para record your response. Be as complete and accurate as possible. / registra tu respuesta. Sé lo más completo/a y preciso/a posible.
              </p>
              <div style={{ background: "#fff3cd", borderRadius: 7, padding: "8px 12px", fontSize: "0.78rem", color: "#856404", marginTop: 10 }}>
                💡 <strong>Chrome:</strong> automatic voice transcription / transcripción de voz automática. Other browsers / Otros navegadores: type in the text field / escribe en el campo de texto.
              </div>
            </div>
            <div style={{ minWidth: 150, textAlign: "center" }}>
              <Timer seconds={60} label="Reading Time / Lectura" onExpire={startConversation} />
            </div>
          </div>

          {/* Outline table — exactly like official exam page 12 */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
            <tbody>
              {data.turns.map((turn, i) => (
                <React.Fragment key={i}>
                  {/* Partner row */}
                  <tr style={{ background: "#eaf4fb" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: "#2980b9", width: 110, whiteSpace: "nowrap", borderBottom: "1px solid #d5e8f5" }}>
                      {turn.speaker}
                    </td>
                    <td style={{ padding: "10px 14px", color: "#555", fontStyle: "italic", borderBottom: "1px solid #d5e8f5" }}>
                      • {i === 0 ? "Makes a statement and asks you a question. / Hace una afirmación y te hace una pregunta." :
                         i === 1 ? "Reacts and asks you another question. / Reacciona y te hace otra pregunta." :
                         i === 2 ? "Responds and asks for your advice. / Responde y te pide un consejo." :
                         i === 3 ? "Makes a comment and asks you a question. / Hace un comentario y te hace una pregunta." :
                                   "Concludes the conversation. / Concluye la conversación."}
                    </td>
                  </tr>
                  {/* Student row */}
                  <tr style={{ background: "white" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: "#27ae60", borderBottom: i < data.turns.length - 1 ? "2px solid #eee" : "none" }}>
                      Tu
                    </td>
                    <td style={{ padding: "10px 14px", color: "#2c3e50", borderBottom: i < data.turns.length - 1 ? "2px solid #eee" : "none" }}>
                      • {turn.hint}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <button onClick={startConversation} style={{ ...btnStyle, marginTop: 20, width: "100%" }}>
            Start Conversation / Iniciar conversación →
          </button>
        </div>
      </div>
    );
  }

  // ── CONVERSATION PHASE ──
  return (
    <div>
      {/* Header */}
      <div style={{ ...cardStyle, background: "#e8f8f5", marginBottom: 16 }}>
        <h3 style={{ ...sectionTitle, color: "#1abc9c" }}>🗣️ Conversation / Conversación — {data.theme}</h3>
        <p style={{ margin: 0, fontSize: "0.84rem", color: "#555" }}>{data.intro}</p>
      </div>

      {/* Turn progress bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {data.turns.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, transition: "background 0.3s",
            background: i < turnIdx ? "#27ae60" : i === turnIdx ? (phase === "playing" ? "#f39c12" : "#e74c3c") : "#ecf0f1" }} />
        ))}
      </div>

      {/* Compact outline — always visible during conversation */}
      <div style={{ ...cardStyle, marginBottom: 16, padding: "10px 16px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Conversation Outline / Esquema de conversación</div>
        <div style={{ display: "flex", gap: 0 }}>
          {data.turns.map((turn, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "4px 2px", borderRight: i < data.turns.length - 1 ? "1px solid #eee" : "none" }}>
              <div style={{ fontSize: "0.62rem", color: "#7f8c8d", marginBottom: 2 }}>{turn.speaker}</div>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#27ae60" }}>Tú</div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", margin: "4px auto 0",
                background: i < turnIdx ? "#27ae60" : i === turnIdx ? (phase === "playing" ? "#f39c12" : "#e74c3c") : "#ecf0f1",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: i <= turnIdx ? "white" : "#aaa", fontWeight: 700 }}>
                {i < turnIdx ? "✓" : i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* ── LEFT: Partner panel ── */}
        <div style={cardStyle}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, transition: "background 0.4s",
              background: phase === "playing" ? "linear-gradient(135deg, #f39c12, #e67e22)" : "linear-gradient(135deg, #3498db, #2980b9)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              {phase === "playing" ? "🔊" : "🇪🇸"}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: phase === "playing" ? "#e67e22" : "#2980b9" }}>{currentTurn.speaker}:</strong>
              {phase === "playing" ? (
                /* Text HIDDEN while audio plays — student must listen */
                <div style={{ marginTop: 8, padding: "10px 14px", background: "#fff8ee", borderRadius: 8, border: "1px dashed #f39c12" }}>
                  <div style={{ color: "#e67e22", fontSize: "0.84rem", fontWeight: 600 }}>
                    🔊 Listening… / In ascolto…
                  </div>
                  <div style={{ color: "#bbb", fontSize: "0.78rem", marginTop: 4, fontStyle: "italic" }}>
                    (text will appear after / el texto aparecerá después)
                  </div>
                </div>
              ) : (
                /* Text revealed once audio ends */
                <p style={{ margin: "6px 0 0", fontSize: "0.93rem", lineHeight: 1.7, fontStyle: "italic" }}>
                  "{currentTurn.text}"
                </p>
              )}
            </div>
          </div>

          {/* Hint — always visible */}
          <div style={{ marginTop: 12, padding: "8px 12px", background: "#f0f9ff", borderRadius: 6, fontSize: "0.78rem", color: "#2980b9" }}>
            💡 <strong>Hint / Pista:</strong> {currentTurn.hint}
          </div>

          {phase === "recording" && (
            <div style={{ marginTop: 12 }}>
              <Timer key={`t-${timerKey}`} seconds={20} label="Your time / Tu tiempo" onExpire={nextTurn} />
            </div>
          )}
          {phase === "playing" && (
            <div style={{ marginTop: 10, fontSize: "0.76rem", color: "#e67e22", fontStyle: "italic", textAlign: "center" }}>
              Timer starts after partner finishes speaking / El cronómetro empieza después de que tu compañero/a termina de hablar…
            </div>
          )}
        </div>

        {/* ── RIGHT: Student response panel ── */}
        <div style={{ ...cardStyle, transition: "opacity 0.4s",
          opacity: phase === "playing" ? 0.45 : 1,
          pointerEvents: phase === "playing" ? "none" : "auto" }}>
          <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 10, transition: "color 0.3s",
            color: phase === "playing" ? "#aaa" : "#e74c3c" }}>
            {phase === "playing" ? "⏳ Wait for your turn… / Espera tu turno…" : `🎤 Turn ${turnIdx + 1} / ${data.turns.length} — Respond in Spanish / Responde en español`}
          </div>

          {phase === "recording" && (
            <SpeechRecorder
              key={`rec-${turnIdx}`}
              autoStart={true}
              maxSeconds={18}
              onResult={text  => { if (text) setResponses(r => ({ ...r, [currentTurn.id]: text })); }}
              onInterim={text => { if (text) setResponses(r => ({ ...r, [currentTurn.id]: text })); }}
            />
          )}
          {phase === "playing" && (
            <div style={{ padding: "14px", border: "2px solid #ddd", borderRadius: 12, background: "#f9f9f9", color: "#aaa", fontSize: "0.85rem", textAlign: "center" }}>
              ⏳ Waiting for partner… mic will start automatically / In attesa del partner… il microfono partirà automaticamente
            </div>
          )}

          <textarea
            key={`txt-${turnIdx}`}
            value={responses[currentTurn.id] || ""}
            onChange={e => setResponses(r => ({ ...r, [currentTurn.id]: e.target.value }))}
            placeholder={phase === "playing" ? "Wait for partner to finish… / Espera que tu compañero/a termine…" : "Or type your response here… / O escribe tu respuesta aquí…"}
            style={{ width: "100%", height: 65, padding: 10, border: "1px solid #e0e0e0", borderRadius: 8,
              fontSize: "0.85rem", fontFamily: "Georgia, serif", lineHeight: 1.6, resize: "none", boxSizing: "border-box", marginTop: 10 }}
          />

          <button onClick={nextTurn} disabled={phase === "playing"}
            style={{ ...btnStyle, marginTop: 10, width: "100%",
              background: phase === "playing" ? "#ccc" : "#27ae60",
              cursor: phase === "playing" ? "default" : "pointer" }}>
            {turnIdx < data.turns.length - 1 ? "Next Turn / Siguiente turno →" : "Complete / Completar ✓"}
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 10, color: "#7f8c8d", fontSize: "0.82rem" }}>
        Turn {turnIdx + 1} of {data.turns.length} —
        {phase === "playing" ? " 🔊 Partner speaking… / Tu compañero/a está hablando…" : " 🎤 Your turn (20 sec) / Tu turno (20 seg)"}
      </div>
    </div>
  );
}

// ─── Task 4: Cultural Comparison ─────────────────────────────────────────────
function Task4({ data, onComplete }) {
  const [phase, setPhase] = useState("prep");
  const [notes, setNotes] = useState("");
  const [spokenTranscript, setSpokenTranscript] = useState("");

  function completeTask() {
    const combined = [
      notes ? `[Preparation Notes]\n${notes}` : "",
      spokenTranscript ? `[Spoken Transcript]\n${spokenTranscript}` : "",
    ].filter(Boolean).join("\n\n");
    onComplete(combined || notes);
  }

  return (
    <div>
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <h3 style={sectionTitle}>📢 Task 4: Cultural Comparison / Confronto culturale</h3>
        <div style={{ background: "#fef9e7", border: "2px solid #f39c12", borderRadius: 8, padding: 14 }}>
          <strong style={{ color: "#e67e22" }}>Topic / Argomento:</strong>
          <p style={{ margin: "8px 0 0", fontSize: "0.9rem", lineHeight: 1.7 }}>{data.topic}</p>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#555", marginTop: 10 }}>
          4 minutes to prepare, then 2 minutes to speak. Compare a Spanish-speaking cultural practice with your own community. / 4 minutos para preparar, luego 2 minutos para hablar.
        </p>
        <p style={{ fontSize: "0.79rem", color: "#aaa", margin: "2px 0 0" }}>
          4 minutes of preparation → 2 minutes of oral presentation. Compare a Spanish-speaking community with your own / 4 minutos de preparación → 2 minutos de presentación oral. Compara una comunidad hispanohablante con la tuya comunità.
        </p>
      </div>

      {/* PREP PHASE */}
      {phase === "prep" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ margin: 0, color: "#f39c12" }}>⏳ Preparation / Preparación</h4>
              <Timer key="prep" seconds={4 * 60} label="4 min" onExpire={() => setPhase("speak")} />
            </div>
            <p style={{ fontSize: "0.8rem", color: "#555", margin: "0 0 4px" }}>Take notes in Spanish. Your notes will be visible during your presentation.</p>
            <p style={{ fontSize: "0.76rem", color: "#aaa", margin: "0 0 10px" }}>Take notes in Spanish. Notes will be visible during your presentation. / Toma apuntes en español. Los apuntes serán visibles durante la presentación.</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={`Notes / Apuntes:\n\nSpanish-speaking community / Comunidad hispanohablante: ...\nCultural practices / Prácticas culturales: ...\nComparison with my community / Confronto con la mia comunità: ...\nSpecific examples / Esempi specifici: ...`}
              style={{ width: "100%", height: 220, padding: 12, border: "2px solid #f39c12", borderRadius: 8, fontSize: "0.87rem", lineHeight: 1.7, resize: "none", boxSizing: "border-box", fontFamily: "Georgia, serif" }}
            />
            <button onClick={() => setPhase("speak")} style={{ ...btnStyle, marginTop: 10, width: "100%", background: "#f39c12" }}>
              Start Presentation / Iniciar presentación →
            </button>
          </div>
          <div>
            <div style={{ ...cardStyle, background: "#eafaf1" }}>
              <h4 style={{ margin: "0 0 8px", color: "#27ae60" }}>💡 Tips / Suggerimenti</h4>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: "0.82rem", lineHeight: 1.9 }}>
                <li>Clearly identify the Spanish cultural practice<br/><span style={{ color: "#aaa", fontSize: "0.77rem" }}>Clearly identify the Spanish-speaking community / Identifica claramente la comunidad hispanohablante</span></li>
                <li>Give 2–3 specific cultural examples<br/><span style={{ color: "#aaa", fontSize: "0.77rem" }}>Dai 2–3 esempi culturali specifici</span></li>
                <li>Make explicit comparisons<br/><span style={{ color: "#aaa", fontSize: "0.77rem" }}>Fai confronti espliciti</span></li>
                <li>Use: <em>invece, al contrario, similarmente, mentre…</em></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SPEAK PHASE */}
      {phase === "speak" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* LEFT: notes panel */}
          <div style={{ ...cardStyle, background: "#fffbf0", border: "2px solid #f39c12" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ margin: 0, color: "#e67e22" }}>📋 Your Notes / Tus apuntes</h4>
              <span style={{ fontSize: "0.72rem", color: "#aaa" }}>read-only / sola lettura</span>
            </div>
            <div style={{ whiteSpace: "pre-line", fontSize: "0.87rem", lineHeight: 1.8, color: "#2c3e50", minHeight: 200 }}>
              {notes || <span style={{ color: "#bbb", fontStyle: "italic" }}>No notes. / Sin apuntes.</span>}
            </div>
          </div>

          {/* RIGHT: recording + timer + text fallback */}
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h4 style={{ margin: 0, color: "#e74c3c" }}>🎙️ Presentation / Presentazione</h4>
              <Timer key="speak" seconds={2 * 60} label="2 min" onExpire={() => setPhase("done")} />
            </div>
            <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: 4 }}>
              Press 🎙️ and speak for 2 minutes. Use your notes as a reference.
            </p>
            <p style={{ fontSize: "0.76rem", color: "#aaa", marginBottom: 12 }}>
              Press 🎙️ and speak for 2 minutes. Use your notes as reference. / Presiona 🎙️ y habla por 2 minutos. Usa tus apuntes como referencia.
            </p>
            <SpeechRecorder
              key="task4-speak"
              autoStart={true}
              maxSeconds={115}
              onResult={text => setSpokenTranscript(t => t ? t + " " + text : text)}
              onInterim={text => setSpokenTranscript(text)}
            />
            {spokenTranscript && (
              <div style={{ marginTop: 10, background: "#f8f9fa", borderRadius: 8, padding: "8px 12px", fontSize: "0.8rem", lineHeight: 1.6, color: "#555", maxHeight: 80, overflow: "auto" }}>
                <strong style={{ color: "#27ae60" }}>🎙️ Transcribed / Trascritto:</strong> {spokenTranscript}
              </div>
            )}
            {/* Text fallback if mic doesn't work */}
            <div style={{ marginTop: 14, borderTop: "1px dashed #ddd", paddingTop: 12 }}>
              <p style={{ fontSize: "0.76rem", color: "#888", margin: "0 0 6px" }}>
                🖊️ <strong>Mic not working?</strong> Type your response below. / <strong>¿Micrófono no funciona?</strong> Escribe tu respuesta aquí.
              </p>
              <textarea
                value={spokenTranscript}
                onChange={e => setSpokenTranscript(e.target.value)}
                placeholder="Type your cultural comparison here… / Escribe aquí tu comparación cultural…"
                style={{ width: "100%", height: 100, padding: 10, border: "1px solid #ddd", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Georgia, serif", lineHeight: 1.6, resize: "none", boxSizing: "border-box" }}
              />
            </div>
            <button onClick={() => setPhase("done")} style={{ ...btnStyle, marginTop: 10, width: "100%", background: "#e74c3c" }}>
              End Presentation / Termina presentazione ⏹
            </button>
          </div>
        </div>
      )}

      {/* DONE PHASE */}
      {phase === "done" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ ...cardStyle, background: "#fffbf0" }}>
            <h4 style={{ margin: "0 0 10px", color: "#e67e22" }}>📋 Notes Used / Apuntes usados</h4>
            <div style={{ whiteSpace: "pre-line", fontSize: "0.87rem", lineHeight: 1.8, color: "#2c3e50" }}>{notes || "—"}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ textAlign: "center", paddingTop: 12 }}>
              <div style={{ fontSize: "3rem", marginBottom: 8 }}>✅</div>
              <p style={{ color: "#27ae60", fontWeight: 700, marginBottom: 12 }}>Presentation Complete! / Presentazione completata!</p>
            </div>
            {spokenTranscript && (
              <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 12, fontSize: "0.82rem", lineHeight: 1.65, color: "#2c3e50" }}>
                <strong>🎙️ Transcribed / Trascritto:</strong> {spokenTranscript}
              </div>
            )}
          </div>
        </div>
      )}

      {(phase === "done" || phase === "speak") && (
        <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "flex-end" }}>
          <button onClick={completeTask} style={btnStyle}>Complete Exam / Completar el examen ✓</button>
        </div>
      )}
    </div>
  );
}

// ─── Teacher Report Generator ─────────────────────────────────────────────────
function generatePDF({ selectedTest, responses, mcScores }) {
  const esc = str => (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const nl2br = str => esc(str).split("\n").join("<br/>");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // ── Section I MC HTML ──────────────────────────────────────────────────────
  function buildMCPart(partData, answers, partLabel, partDetail) {
    if (!partData || !answers) return "<div style='padding:10px 20px;font-size:11.5px;color:#777;font-style:italic;'>[No data available for this part]</div>";
    let html = "";
    html += "<div class='mc-part-hdr'>" + esc(partLabel) + " — " + esc(partDetail) + "</div>";
    html += "<div class='mc-questions'>";
    let globalIdx = 0;
    for (let si = 0; si < partData.sets.length; si++) {
      const set = partData.sets[si];
      if (set.title || set.type) {
        html += "<div class='set-label'>" + esc(set.title || "") + (set.type ? " <span class='set-type'>(" + esc(set.type) + ")</span>" : "") + "</div>";
      }
      if (set.intro) {
        html += "<div class='set-intro'>" + nl2br(set.intro) + "</div>";
      }
      for (let qi = 0; qi < set.questions.length; qi++) {
        const q = set.questions[qi];
        globalIdx++;
        const given = answers[q.id];
        const isCorrect = given === q.answer;
        const unanswered = given === undefined;
        const badge = unanswered
          ? "<div class='mc-badge badge-skip'>— No answer</div>"
          : isCorrect
            ? "<div class='mc-badge badge-ok'>&#10003; Correct</div>"
            : "<div class='mc-badge badge-err'>&#10007; Wrong</div>";
        html += "<div class='mc-q'>";
        html += "<div class='mc-q-top'><div class='mc-qnum'>Q" + globalIdx + "</div><div class='mc-qtext'>" + nl2br(q.text) + "</div>" + badge + "</div>";
        html += "<div class='mc-opts'>";
        const letters = ["A", "B", "C", "D", "E", "F"];
        for (let oi = 0; oi < q.options.length; oi++) {
          const isAnswer = oi === q.answer;
          const isSelected = oi === given;
          let cls = "mc-opt ";
          let flag = "";
          if (isAnswer && isSelected) { cls += "opt-right"; flag = "<span class='mc-opt-flag'>&#10003; Student selected</span>"; }
          else if (isAnswer && !isSelected) { cls += "opt-answer"; flag = "<span class='mc-opt-flag'>&larr; Correct answer</span>"; }
          else if (isSelected && !isAnswer) { cls += "opt-wrong"; flag = "<span class='mc-opt-flag'>&#10007; Selected</span>"; }
          else { cls += "opt-plain"; }
          html += "<div class='" + cls + "'><span class='mc-opt-ltr'>" + letters[oi] + ".</span><span class='mc-opt-txt'>" + esc(q.options[oi]) + "</span>" + flag + "</div>";
        }
        html += "</div></div>";
      }
    }
    html += "</div>";
    return html;
  }

  // ── Task 1 HTML (Email Reply) ──────────────────────────────────────────────
  function buildTask1() {
    const d = selectedTest.task1;
    if (!d) return "";
    const resp = responses && responses.task1 ? responses.task1 : "";
    let html = "";
    html += "<div class='task-card'>";
    html += "<div class='task-header'><div class='task-num'>1</div><div><div class='task-header-label'>Section II &middot; Part A</div><div class='task-header-name'>Task 1 &mdash; Interpersonal Writing: Email Reply</div></div><div class='task-time'>&#9201; 15 min</div></div>";
    html += "<div class='task-body'>";
    if (d.theme) html += "<div class='tema-tag'>Tema: " + esc(d.theme) + "</div>";
    html += "<div class='sec-label'>Original Prompt</div>";
    html += "<div class='prompt-block'>";
    if (d.email) {
      html += "<div class='email-row'><strong>From / De:</strong> " + esc(d.email.from || "") + "</div>";
      html += "<div class='email-row'><strong>Subject / Asunto:</strong> " + esc(d.email.subject || "") + "</div>";
      if (d.email.intro) html += "<p style='margin-bottom:9px;'>" + nl2br(d.email.intro) + "</p>";
      if (d.email.body) html += "<div>" + nl2br(d.email.body) + "</div>";
    }
    html += "</div>";
    html += "<div class='sec-label'>Student Response</div>";
    html += "<div class='response-wrap'><div class='response-hdr'>&#9998; Written response</div><div class='response-body'>" + (resp ? nl2br(resp) : "<span style='color:#aaa;font-style:italic;'>No response recorded.</span>") + "</div></div>";
    html += "</div></div>";
    return html;
  }

  // ── Task 2 HTML (Argumentative Essay) ─────────────────────────────────────
  function buildTask2() {
    const d = selectedTest.task2;
    if (!d) return "";
    const resp = responses && responses.task2 ? responses.task2 : "";
    let html = "";
    html += "<div class='task-card'>";
    html += "<div class='task-header'><div class='task-num'>2</div><div><div class='task-header-label'>Section II &middot; Part A</div><div class='task-header-name'>Task 2 &mdash; Presentational Writing: Argumentative Essay</div></div><div class='task-time'>&#9201; ~55 min</div></div>";
    html += "<div class='task-body'>";
    if (d.theme) html += "<div class='tema-tag'>Tema: " + esc(d.theme) + "</div>";
    html += "<div class='sec-label'>Traccia (Essay Topic)</div>";
    html += "<div class='prompt-block'><p style='font-size:13.5px;font-weight:700;margin-bottom:10px;'>" + esc(d.topic || "") + "</p></div>";
    if (d.sources && d.sources.length > 0) {
      html += "<div class='sec-label'>Sources Provided</div>";
      html += "<div class='sources-block'>";
      for (let i = 0; i < d.sources.length; i++) {
        const src = d.sources[i];
        const typeLabel = src.type || "Print";
        html += "<div class='src-item'><span class='src-num'>" + (i + 1) + ".</span><span>" + esc(src.title || "Source " + (i + 1)) + (src.intro ? " &mdash; " + esc(src.intro.substring(0, 80)) : "") + " <em style='color:#aaa;'>(" + esc(typeLabel) + ")</em></span></div>";
      }
      html += "</div>";
    }
    html += "<div class='sec-label'>Student Essay</div>";
    html += "<div class='response-wrap'><div class='response-hdr'>&#9998; Written response</div><div class='response-body' style='min-height:260px;'>" + (resp ? nl2br(resp) : "<span style='color:#aaa;font-style:italic;'>No response recorded.</span>") + "</div></div>";
    html += "</div></div>";
    return html;
  }

  // ── Task 3 HTML (Conversation) ─────────────────────────────────────────────
  function buildTask3() {
    const d = selectedTest.task3;
    if (!d) return "";
    const resp = responses && responses.task3 ? responses.task3 : {};
    let html = "";
    html += "<div class='task-card'>";
    html += "<div class='task-header'><div class='task-num'>3</div><div><div class='task-header-label'>Section II &middot; Part B &mdash; Spoken</div><div class='task-header-name'>Task 3 &mdash; Interpersonal Speaking: Simulated Conversation</div></div><div class='task-time'>&#9201; 20 sec / turn</div></div>";
    html += "<div class='task-body'>";
    if (d.theme) html += "<div class='tema-tag'>Tema: " + esc(d.theme) + "</div>";
    if (d.intro) {
      html += "<div class='sec-label'>Scenario</div>";
      html += "<div class='prompt-block'>" + nl2br(d.intro) + "</div>";
    }
    html += "<div class='sec-label'>Conversation &mdash; Turn by Turn</div>";
    html += "<p style='font-size:10.5px;color:#777;font-style:italic;margin-bottom:9px;'>&#127908; Student responses spoken aloud (20 sec each), auto-transcribed below.</p>";
    html += "<table class='conv-table'><thead><tr><th class='turn-cell'>#</th><th style='width:42%'>Conversation Partner Prompt</th><th>Student Response (Transcribed)</th></tr></thead><tbody>";
    const turns = d.turns || [];
    for (let i = 0; i < turns.length; i++) {
      const turn = turns[i];
      const spoken = (typeof resp === "object" && resp !== null) ? (resp[turn.id] || "") : "";
      html += "<tr>";
      html += "<td class='turn-cell'><div class='turn-chip'>" + (i + 1) + "</div></td>";
      html += "<td><span class='spk'>" + esc(turn.speaker || "Partner") + "</span><span class='prompt-txt'>" + nl2br(turn.text) + "</span></td>";
      html += "<td><span class='spk'>Student</span>" + (spoken ? "<span class='student-txt'>" + nl2br(spoken) + "</span>" : "<span style='color:#aaa;font-style:italic;'>No response recorded.</span>") + "</td>";
      html += "</tr>";
    }
    html += "</tbody></table>";
    html += "</div></div>";
    return html;
  }

  // ── Task 4 HTML (Cultural Comparison) ─────────────────────────────────────
  function buildTask4() {
    const d = selectedTest.task4;
    if (!d) return "";
    const rawResp = responses && responses.task4 ? responses.task4 : "";
    const speakMarker = "[Spoken Transcript]";
    const prepMarker = "[Preparation Notes]";
    const speakIdx = rawResp.indexOf(speakMarker);
    const prepIdx = rawResp.indexOf(prepMarker);
    let t4Prep = "";
    let t4Spoken = "";
    if (prepIdx !== -1) {
      const afterPrep = rawResp.substring(prepIdx + prepMarker.length).trimStart();
      if (speakIdx !== -1) {
        const relSpeakIdx = afterPrep.indexOf(speakMarker);
        t4Prep = relSpeakIdx !== -1 ? afterPrep.substring(0, relSpeakIdx).trim() : afterPrep.trim();
      } else {
        t4Prep = afterPrep.trim();
      }
    }
    if (speakIdx !== -1) {
      t4Spoken = rawResp.substring(speakIdx + speakMarker.length).trim();
    }
    if (!t4Prep && !t4Spoken) { t4Prep = rawResp; }
    let html = "";
    html += "<div class='task-card'>";
    html += "<div class='task-header'><div class='task-num'>4</div><div><div class='task-header-label'>Section II &middot; Part B &mdash; Spoken</div><div class='task-header-name'>Task 4 &mdash; Presentational Speaking: Cultural Comparison</div></div><div class='task-time'>&#9201; 4 min prep + 2 min spoken</div></div>";
    html += "<div class='task-body'>";
    if (d.theme) html += "<div class='tema-tag'>Tema: " + esc(d.theme) + "</div>";
    html += "<div class='sec-label'>Presentation Topic</div>";
    html += "<div class='prompt-block'><p style='font-weight:600;margin-bottom:6px;'>" + nl2br(d.topic || "") + "</p></div>";
    if (t4Prep) {
      html += "<div class='sec-label'>Preparation Notes</div>";
      html += "<div class='response-wrap'><div class='response-hdr'>&#128221; Student notes &mdash; written during 4-min prep</div><div class='response-body mono'>" + nl2br(t4Prep) + "</div></div>";
      html += "<div style='height:10px'></div>";
    }
    html += "<div class='sec-label'>Oral Presentation</div>";
    html += "<div class='response-wrap'><div class='response-hdr'>&#127908; Auto-transcribed from 2-min recording</div><div class='response-body spoken'>" + (t4Spoken ? nl2br(t4Spoken) : "<span style='color:#aaa;font-style:italic;'>No spoken transcript recorded.</span>") + "</div></div>";
    html += "</div></div>";
    return html;
  }

  // ── Pills ──────────────────────────────────────────────────────────────────
  const hasMC = !!(mcScores && mcScores.partA && selectedTest && selectedTest.sectionI);
  const pills = [];
  if (hasMC) pills.push("Section I &mdash; MC (Part A + B)");
  pills.push("Task 1 &mdash; Email Reply");
  pills.push("Task 2 &mdash; Essay");
  pills.push("Task 3 &mdash; Conversation");
  pills.push("Task 4 &mdash; Oral Comparison");
  const pillsHTML = pills.map(p => "<div class='pill'>" + p + "</div>").join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>AP Spanish &mdash; Teacher Review</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
:root {
  --ink: #111111; --mid: #444444; --muted: #777777; --light: #aaaaaa;
  --border: #cccccc; --border-dark: #888888; --bg-soft: #f4f4f4; --bg-stripe: #ebebeb;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; background: #e8e8e8; color: var(--ink); font-size: 12.5px; line-height: 1.6; }
.toolbar { background: var(--ink); color: white; padding: 11px 28px; display: flex; align-items: center; gap: 14px; position: sticky; top: 0; z-index: 100; }
.toolbar-title { font-weight: 600; font-size: 13px; flex: 1; }
.toolbar-meta { font-size: 11px; color: #999; }
.btn-print { background: white; color: var(--ink); border: none; border-radius: 4px; padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
.btn-print:hover { background: #e0e0e0; }
.doc { max-width: 820px; margin: 28px auto; padding: 0 16px 60px; }
.cover { background: white; border: 1px solid var(--border); border-top: 4px solid var(--ink); padding: 24px 28px 20px; margin-bottom: 16px; }
.cover-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
.cover-name { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.cover-sub { font-size: 12px; color: var(--muted); }
.cover-stamp { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; border: 2px solid var(--ink); padding: 4px 10px; color: var(--ink); white-space: nowrap; }
.cover-note { font-size: 11.5px; color: var(--mid); border-top: 1px solid var(--border); padding-top: 12px; line-height: 1.65; }
.cover-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.pill { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; border: 1px solid var(--border-dark); border-radius: 2px; padding: 2px 9px; color: var(--mid); background: var(--bg-soft); }
.task-card { background: white; border: 1px solid var(--border); margin-bottom: 16px; }
.task-header { display: flex; align-items: center; gap: 12px; padding: 11px 18px; background: var(--ink); color: white; }
.task-num { width: 26px; height: 26px; border-radius: 3px; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; }
.task-header-label { font-size: 9.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #aaa; margin-bottom: 1px; }
.task-header-name { font-size: 13px; font-weight: 700; }
.task-time { margin-left: auto; font-size: 10.5px; color: #bbb; white-space: nowrap; font-weight: 500; }
.task-body { padding: 18px 20px; }
.sec-label { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); margin-bottom: 7px; display: flex; align-items: center; gap: 8px; }
.sec-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.tema-tag { font-size: 10.5px; color: var(--muted); font-style: italic; margin-bottom: 12px; }
.prompt-block { border: 1px solid var(--border-dark); border-left: 3px solid var(--ink); background: var(--bg-soft); padding: 13px 15px; margin-bottom: 16px; font-size: 12.5px; line-height: 1.7; color: var(--ink); }
.email-row { display: flex; gap: 8px; font-size: 11.5px; border-bottom: 1px solid var(--border); padding-bottom: 5px; margin-bottom: 7px; }
.email-row strong { min-width: 70px; color: var(--mid); }
.sources-block { border: 1px solid var(--border); border-left: 3px solid var(--border-dark); background: var(--bg-soft); padding: 11px 14px; margin-bottom: 16px; }
.src-item { display: flex; gap: 8px; font-size: 12px; color: var(--mid); padding: 3px 0; }
.src-num { font-weight: 700; color: var(--ink); min-width: 16px; }
.response-wrap { border: 1px solid var(--border-dark); margin-bottom: 6px; }
.response-hdr { display: flex; align-items: center; gap: 7px; padding: 6px 12px; background: var(--bg-stripe); border-bottom: 1px solid var(--border); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--mid); }
.response-body { padding: 13px 15px; font-size: 13px; line-height: 1.9; color: var(--ink); white-space: pre-wrap; min-height: 100px; background-image: repeating-linear-gradient(transparent, transparent 29px, #ddd 29px, #ddd 30px); background-size: 100% 30px; font-family: 'Georgia', serif; font-style: italic; }
.response-body.mono { font-family: 'JetBrains Mono', monospace; font-style: normal; font-size: 11.5px; line-height: 1.7; background: var(--bg-soft); background-image: none; border-top: 2px dashed var(--border-dark); color: var(--mid); min-height: 70px; }
.response-body.spoken { font-family: 'Inter', sans-serif; font-style: normal; background: var(--bg-soft); background-image: none; border-top: 2px dashed var(--border-dark); font-size: 12.5px; line-height: 1.75; color: var(--mid); }
.conv-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px; border: 1px solid var(--border-dark); }
.conv-table thead tr { background: var(--ink); color: white; }
.conv-table thead th { padding: 7px 12px; text-align: left; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
.conv-table tbody tr:nth-child(even) { background: var(--bg-soft); }
.conv-table tbody tr:nth-child(odd) { background: white; }
.conv-table td { padding: 9px 12px; border: 1px solid var(--border); vertical-align: top; line-height: 1.6; }
.turn-cell { width: 40px; text-align: center; }
.turn-chip { display: inline-block; width: 24px; height: 24px; background: var(--ink); color: white; border-radius: 2px; font-size: 11px; font-weight: 700; line-height: 24px; text-align: center; }
.spk { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); display: block; margin-bottom: 3px; }
.prompt-txt { color: var(--mid); font-style: italic; }
.student-txt { color: var(--ink); }
.mc-part-hdr { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); padding: 8px 20px; background: var(--bg-stripe); border-bottom: 1px solid var(--border); border-top: 1px solid var(--border); }
.mc-questions { padding: 14px 20px; }
.set-label { font-size: 10.5px; font-weight: 700; color: var(--ink); margin: 12px 0 4px; border-bottom: 1px solid var(--border); padding-bottom: 4px; }
.set-type { font-weight: 400; color: var(--muted); }
.set-intro { font-size: 11.5px; font-style: italic; color: var(--mid); margin-bottom: 10px; line-height: 1.6; background: var(--bg-soft); padding: 8px 10px; border-left: 2px solid var(--border-dark); }
.mc-q { margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
.mc-q:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.mc-q-top { display: flex; align-items: flex-start; gap: 9px; margin-bottom: 9px; }
.mc-qnum { background: var(--ink); color: white; border-radius: 2px; padding: 1px 7px; font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
.mc-qtext { font-size: 12.5px; font-weight: 500; flex: 1; line-height: 1.5; }
.mc-badge { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 2px; flex-shrink: 0; white-space: nowrap; margin-top: 2px; }
.badge-ok { border: 1.5px solid var(--ink); background: white; color: var(--ink); }
.badge-err { border: 1.5px solid var(--border-dark); background: var(--bg-stripe); color: var(--mid); }
.badge-skip { border: 1.5px solid var(--border); background: white; color: var(--muted); }
.mc-opts { display: flex; flex-direction: column; gap: 4px; padding-left: 2px; }
.mc-opt { display: flex; align-items: flex-start; gap: 9px; padding: 6px 10px; border: 1px solid transparent; font-size: 12px; line-height: 1.5; }
.mc-opt-ltr { font-weight: 700; min-width: 18px; color: var(--muted); flex-shrink: 0; }
.mc-opt-txt { flex: 1; }
.mc-opt-flag { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0; margin-top: 2px; white-space: nowrap; }
.opt-plain { background: transparent; }
.opt-right { background: var(--bg-soft); border: 1.5px solid var(--ink); font-weight: 600; }
.opt-right .mc-opt-ltr { color: var(--ink); }
.opt-right .mc-opt-flag { color: var(--ink); }
.opt-wrong { background: var(--bg-stripe); border: 1.5px solid var(--border-dark); text-decoration: line-through; color: var(--muted); }
.opt-wrong .mc-opt-ltr { color: var(--muted); }
.opt-wrong .mc-opt-flag { color: var(--muted); }
.opt-answer { background: white; border: 2px solid var(--ink); font-weight: 700; }
.opt-answer .mc-opt-ltr { color: var(--ink); }
.opt-answer .mc-opt-flag { color: var(--ink); }
.sec-divider { display: flex; align-items: center; gap: 12px; margin: 6px 0 10px; }
.sec-divider-line { flex: 1; height: 1px; background: var(--border-dark); }
.sec-divider-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--mid); white-space: nowrap; }
.doc-footer { text-align: center; font-size: 10.5px; color: var(--light); padding-top: 14px; border-top: 1px solid var(--border); margin-top: 6px; }
@media print {
  body { background: white; font-size: 11.5px; }
  .toolbar { display: none; }
  .doc { margin: 0; padding: 8px 0 20px; max-width: 100%; }
  .task-card, .cover { page-break-inside: avoid; }
  .response-body { background-image: repeating-linear-gradient(transparent, transparent 27px, #ccc 27px, #ccc 28px); background-size: 100% 28px; }
  @page { margin: 14mm 13mm; }
}
</style>
</head>
<body>

<div class="toolbar">
  <div class="toolbar-title">AP Spanish Language &amp; Culture &mdash; Teacher Review</div>
  <span class="toolbar-meta">Practice Simulation &middot; Not affiliated with College Board &middot; Generated ${esc(today)}</span>
  <button class="btn-print" onclick="window.print()">&#128424;&#65039; Print / Save PDF</button>
</div>

<div class="doc">

  <div class="cover">
    <div class="cover-top">
      <div>
        <div class="cover-name">${esc(selectedTest ? selectedTest.label : "AP Spanish Language &amp; Culture")} &mdash; Practice Simulation</div>
        <div class="cover-sub">Section I + II &middot; All Tasks &middot; Teacher Review Copy &middot; <strong>Not an official College Board document</strong></div>
      </div>
      <div class="cover-stamp">Teacher Copy</div>
    </div>
    <div class="cover-pills">${pillsHTML}</div>
    <div class="cover-note">
      <strong>&#9888;&#65039; Practice document only &mdash; not an official College Board exam.</strong> Each section shows the <strong>original practice prompt</strong> followed by the <strong>student's submitted response</strong>. Spoken responses (Tasks 3 &amp; 4) were auto-transcribed via speech recognition &mdash; minor errors may be present.
    </div>
  </div>

  ${hasMC ? `
  <div class="task-card">
    <div class="task-header">
      <div class="task-num">I</div>
      <div>
        <div class="task-header-label">Section I &mdash; comes first in the actual exam</div>
        <div class="task-header-name">Multiple Choice &mdash; All Questions</div>
      </div>
      <div class="task-time">&#9646; = correct &nbsp;&middot;&nbsp; strikethrough = wrong pick</div>
    </div>
    ${buildMCPart(
      selectedTest.sectionI.partA,
      mcScores.partA.answers,
      "Part A",
      "Interpretive Listening"
    )}
    ${buildMCPart(
      selectedTest.sectionI.partB,
      mcScores.partB ? mcScores.partB.answers : null,
      "Part B",
      "Interpretive Reading"
    )}
  </div>

  <div class="sec-divider">
    <div class="sec-divider-line"></div>
    <div class="sec-divider-label">Section II &mdash; Free Response (~88 min total)</div>
    <div class="sec-divider-line"></div>
  </div>
  ` : ""}

  ${buildTask1()}
  ${buildTask2()}
  ${buildTask3()}
  ${buildTask4()}

  <div class="doc-footer">
    Generated by AP Spanish Language &amp; Culture Simulator &nbsp;&middot;&nbsp; For classroom practice only &nbsp;&middot;&nbsp; Not affiliated with, endorsed by, or representative of College Board or any official AP exam
  </div>

</div>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (w) {
    w.document.open();
    w.document.write(html);
    w.document.close();
  }
}


// ─── Score Results Screen ─────────────────────────────────────────────────────
function ScoreResults({ selectedTest, responses, mcScores, onRetry, onHome }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // Compute MC Section I score (Part A = 23%, Part B = 27% of total exam)
  const partAScore = mcScores?.partA ? Math.round((mcScores.partA.score / mcScores.partA.total) * 100) : null;
  const partBScore = mcScores?.partB ? Math.round((mcScores.partB.score / mcScores.partB.total) * 100) : null;
  const mcComposite = (partAScore !== null && partBScore !== null)
    ? Math.round(partAScore * 0.46 + partBScore * 0.54) // weighted within Section I
    : null;

  useEffect(() => {
    (async () => {
      const t1 = responses.task1 || "";
      const t2 = responses.task2 || "";

      // Task 3: format each spoken/typed turn with its prompt for context
      let t3Formatted = "";
      if (typeof responses.task3 === "object" && Object.keys(responses.task3).length > 0) {
        const turns = selectedTest.task3.turns || [];
        t3Formatted = turns.map((turn, i) => {
          const spokenText = responses.task3[turn.id] || "[no response]";
          return `  Turn ${i+1} — ${turn.speaker}: "${turn.text}"\n  → Student response: ${spokenText}`;
        }).join("\n\n");
      } else {
        t3Formatted = responses.task3 || "[No response — score 1]";
      }

      // Task 4: separate prep notes from spoken transcript
      const t4Raw = responses.task4 || "";
      const t4PrepMatch = t4Raw.match(/\[Preparation Notes\]\n([\s\S]*?)(?=\[Spoken Transcript\]|$)/);
      const t4SpeakMatch = t4Raw.match(/\[Spoken Transcript\]\n([\s\S]*)/);
      const t4Prep = t4PrepMatch ? t4PrepMatch[1].trim() : (t4SpeakMatch ? "" : t4Raw);
      const t4Spoken = t4SpeakMatch ? t4SpeakMatch[1].trim() : "";
      const mcNote = mcScores?.partA
        ? `Section I MC Results: Part A ${mcScores.partA.score}/${mcScores.partA.total} (${partAScore}%), Part B ${mcScores.partB?.score ?? "?"}/${mcScores.partB?.total ?? "?"} (${partBScore ?? "?"}%). Use these as context for the overall AP score.`
        : "Section I MC not completed.";

      const prompt = `You are an official AP Spanish Language and Culture exam scorer. Evaluate the four free-response tasks and return a JSON score report.

Exam: "${selectedTest.label}"
${mcNote}

--- TASK 1: Email Reply ---
Topic: ${selectedTest.task1.email.subject}
Student response (written):
${t1 || "[No response — score 1]"}

--- TASK 2: Argumentative Essay ---
Topic: ${selectedTest.task2.topic}
Student response (written):
${t2 || "[No response — score 1]"}

--- TASK 3: Scripted Conversation (SPOKEN — transcribed via speech recognition) ---
Theme: ${selectedTest.task3.theme || selectedTest.task3.intro || "Conversación"}
Note: responses were spoken aloud and auto-transcribed. Evaluate naturalness, appropriateness, and Spanish quality. Minor transcription errors are expected.
${t3Formatted || "[No response — score 1]"}

--- TASK 4: Cultural Comparison (SPOKEN — transcribed via speech recognition) ---
Topic: ${selectedTest.task4.topic}
Note: student spoke for up to 2 minutes after 4 minutes of preparation. Evaluate the spoken comparison, not just preparation notes.
${t4Prep ? `Preparation notes:\n${t4Prep}` : ""}
${t4Spoken ? `Spoken transcript (auto-transcribed):\n${t4Spoken}` : t4Prep ? "" : "[No response — score 1]"}

SCORING INSTRUCTIONS:
Score each task on the official AP 1-5 scale:
- 5: Fully addresses all prompts, sophisticated language, minimal errors, rich vocabulary
- 4: Addresses all prompts, good language control, few errors
- 3: Addresses most prompts, adequate language, some errors that don't impede communication
- 2: Partially addresses prompts, limited language, errors impede communication
- 1: Minimal/no response, severely limited language

For Tasks 3 & 4 (spoken): also consider pronunciation approximation visible in transcript, fluency indicators, spontaneous vocabulary use, and response appropriateness to each turn's prompt.

FRQ composite = average of 4 task scores (each worth 12.5% of total = 50% total).
${mcScores?.partA ? `MC composite % = ${mcComposite}% (worth 50% of total exam).` : "No MC score available — base AP score on FRQ only."}

AP score thresholds (totalPct):
- AP 5: >= 75%  |  AP 4: >= 60%  |  AP 3: >= 45%  |  AP 2: >= 30%  |  AP 1: < 30%
FRQ% = (frqComposite - 1) / 4 * 100
${mcScores?.partA ? "totalPct = mcComposite * 0.50 + frqPct * 0.50" : "totalPct = frqPct"}

Respond ONLY with valid JSON, no markdown, no extra text:
{
  "tasks": [
    { "id": "Task 1", "name": "Email Reply", "score": <1-5>, "strengths": ["...","..."], "improvements": ["...","..."], "spanishTip": "One short Spanish correction with English translation" },
    { "id": "Task 2", "name": "Argumentative Essay", "score": <1-5>, "strengths": ["...","..."], "improvements": ["...","..."], "spanishTip": "..." },
    { "id": "Task 3", "name": "Conversation", "score": <1-5>, "strengths": ["...","..."], "improvements": ["...","..."], "spanishTip": "..." },
    { "id": "Task 4", "name": "Cultural Comparison", "score": <1-5>, "strengths": ["...","..."], "improvements": ["...","..."], "spanishTip": "..." }
  ],
  "composite": <average of 4 task scores, 1 decimal>,
  "frqPct": <frq percentage 0-100>,
  "apScore": <1-5 integer>,
  "overallStrengths": ["...","..."],
  "priorityAreas": ["...","...","..."],
  "studyPlan": ["Recommendation 1","Recommendation 2","Recommendation 3","Recommendation 4"],
  "encouragement": "One motivating sentence tailored to this student's performance"
}`;

      try {
        const apiUrl2 = "https://apspanish-simulation-production.up.railway.app";
        const res = await fetch(`${apiUrl2}/api/score`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1800, messages: [{ role: "user", content: prompt }] }),
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || "{}";
        const clean = text.replace(/```json|```/g, "").trim();
        setResult(JSON.parse(clean));
      } catch (e) {
        setResult({ error: true });
      }
      setLoading(false);
    })();
  }, []);

  const scoreColor = (s) => s >= 4 ? "#27ae60" : s >= 3 ? "#f39c12" : "#e74c3c";       // 1-5 scale
  const pctColor  = (p) => p >= 70 ? "#27ae60" : p >= 50 ? "#f39c12" : "#e74c3c";     // 0-100 scale
  const scoreLabel = (s) => s >= 4.5 ? "Excelente" : s >= 3.5 ? "Bueno" : s >= 2.5 ? "Suficiente" : s >= 1.5 ? "En desarrollo" : "Por mejorar";
  const apBadgeColor = (s) => s >= 4 ? "#27ae60" : s >= 3 ? "#2980b9" : "#e74c3c";
  const apLabel = (s) => s === 5 ? "Extremely Well Qualified" : s === 4 ? "Well Qualified" : s === 3 ? "Qualified" : s === 2 ? "Possibly Qualified" : "No Recommendation";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0d1b2a, #162032)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center", color: "white" }}>
        <div style={{ width: 60, height: 60, border: "5px solid rgba(255,255,255,0.1)", borderTop: "5px solid #3498db", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <h2 style={{ margin: "0 0 10px", fontSize: "1.5rem" }}>Scoring Your Exam...</h2>
        <p style={{ color: "#8aa8c0", margin: 0 }}>AI is analyzing all four tasks against the AP rubric</p>
      </div>
    </div>
  );

  if (!result || result.error) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0d1b2a, #162032)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center", color: "white", maxWidth: 400 }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>⚠️</div>
        <h2 style={{ margin: "0 0 12px" }}>Scoring Unavailable</h2>
        <p style={{ color: "#8aa8c0", marginBottom: 24 }}>Could not connect to the scoring service. Your responses have been recorded.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onHome} style={{ ...btnStyle, padding: "12px 24px" }}>← Home</button>
          <button onClick={onRetry} style={{ ...btnStyle, background: "#27ae60", padding: "12px 24px" }}>Retry Test</button>
        </div>
      </div>
    </div>
  );

  const composite = result.composite || 0;
  const apScore = result.apScore || 1;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d1b2a, #16213e)", padding: "20px 24px", color: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🇪🇸</div>
          <h1 style={{ margin: "0 0 4px", fontSize: "1.7rem", fontWeight: 700 }}>Exam Results</h1>
          <p style={{ margin: 0, color: "#8aa8c0", fontSize: "0.9rem" }}>{selectedTest.label} · AP Spanish Language & Culture</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>

        {/* Section I MC Summary */}
        {mcScores?.partA && (
          <div style={{ background: "white", borderRadius: 16, padding: "20px 24px", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", borderLeft: "5px solid #3498db" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3498db", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Section I — Multiple Choice (50% of exam)</div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.74rem", color: "#7f8c8d", marginBottom: 4 }}>Part A · Reading (23%)</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: pctColor(partAScore), fontFamily: "monospace" }}>{mcScores.partA.score}<span style={{ fontSize: "1rem", color: "#bdc3c7" }}>/{mcScores.partA.total}</span></div>
                <div style={{ fontSize: "0.8rem", color: pctColor(partAScore), fontWeight: 600 }}>{partAScore}%</div>
              </div>
              <div style={{ width: 1, background: "#ecf0f1" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.74rem", color: "#7f8c8d", marginBottom: 4 }}>Part B · Listening (27%)</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: pctColor(partBScore || 0), fontFamily: "monospace" }}>{mcScores.partB?.score ?? "–"}<span style={{ fontSize: "1rem", color: "#bdc3c7" }}>/{mcScores.partB?.total ?? "–"}</span></div>
                <div style={{ fontSize: "0.8rem", color: pctColor(partBScore || 0), fontWeight: 600 }}>{partBScore ?? "–"}%</div>
              </div>
              <div style={{ width: 1, background: "#ecf0f1" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.74rem", color: "#7f8c8d", marginBottom: 4 }}>Section I Composite</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: pctColor(mcComposite || 0), fontFamily: "monospace" }}>{mcComposite ?? "–"}<span style={{ fontSize: "1rem", color: "#bdc3c7" }}>%</span></div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: "0.74rem", color: "#7f8c8d", marginBottom: 6 }}>Score breakdown</div>
                {[{ label: "Part A (Reading)", pct: partAScore, weight: "23%" }, { label: "Part B (Listening)", pct: partBScore, weight: "27%" }].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: "0.72rem", color: "#555", width: 110 }}>{row.label}</div>
                    <div style={{ flex: 1, height: 7, background: "#ecf0f1", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${row.pct || 0}%`, height: "100%", background: pctColor(row.pct || 0), borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#7f8c8d", width: 32 }}>{row.pct ?? "–"}%</div>
                    <div style={{ fontSize: "0.68rem", color: "#bdc3c7", width: 28 }}>{row.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AP Score Hero */}
        <div style={{ background: "white", borderRadius: 20, padding: "32px 28px", marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${apBadgeColor(apScore)}, ${apBadgeColor(apScore)}88)` }} />
          <div style={{ display: "flex", justifyContent: "center", gap: 40, alignItems: "center", flexWrap: "wrap", textAlign: "center" }}>
            {/* AP Score */}
            <div>
              <div style={{ fontSize: "0.75rem", color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Predicted AP Score</div>
              <div style={{ fontSize: "5.5rem", fontWeight: 900, color: apBadgeColor(apScore), lineHeight: 1, fontFamily: "'Courier New', monospace" }}>{apScore}</div>
              <div style={{ fontSize: "0.85rem", color: apBadgeColor(apScore), fontWeight: 600, marginTop: 6 }}>{apLabel(apScore)}</div>
            </div>
            <div style={{ width: 1, height: 90, background: "#ecf0f1" }} />
            {/* FRQ score */}
            <div>
              <div style={{ fontSize: "0.75rem", color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>FRQ Score</div>
              <div style={{ fontSize: "3.5rem", fontWeight: 800, color: scoreColor(composite), lineHeight: 1, fontFamily: "'Courier New', monospace" }}>{composite.toFixed(1)}<span style={{ fontSize: "1.3rem", color: "#bdc3c7" }}>/5</span></div>
              <div style={{ fontSize: "0.82rem", color: scoreColor(composite), fontWeight: 600, marginTop: 6 }}>{scoreLabel(composite)}</div>
              {result.frqPct != null && <div style={{ fontSize: "0.75rem", color: "#95a5a6", marginTop: 2 }}>{result.frqPct}% · worth 50%</div>}
            </div>
            {mcComposite != null && <>
              <div style={{ width: 1, height: 90, background: "#ecf0f1" }} />
              <div>
                <div style={{ fontSize: "0.75rem", color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>MC Score</div>
                <div style={{ fontSize: "3.5rem", fontWeight: 800, color: pctColor(mcComposite), lineHeight: 1, fontFamily: "'Courier New', monospace" }}>{mcComposite}<span style={{ fontSize: "1.3rem", color: "#bdc3c7" }}>%</span></div>
                <div style={{ fontSize: "0.82rem", color: pctColor(mcComposite), fontWeight: 600, marginTop: 6 }}>{mcComposite >= 70 ? "Bueno" : mcComposite >= 50 ? "Suficiente" : "Por mejorar"}</div>
                <div style={{ fontSize: "0.75rem", color: "#95a5a6", marginTop: 2 }}>worth 50%</div>
              </div>
            </>}
            <div style={{ width: 1, height: 90, background: "#ecf0f1" }} />
            {/* Task bars */}
            <div style={{ textAlign: "left", minWidth: 200 }}>
              <div style={{ fontSize: "0.75rem", color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Task Breakdown</div>
              {result.tasks?.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                  <div style={{ width: 62, fontSize: "0.74rem", color: "#555", whiteSpace: "nowrap" }}>{t.id}</div>
                  <div style={{ flex: 1, height: 9, background: "#ecf0f1", borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ width: `${(t.score / 5) * 100}%`, height: "100%", background: scoreColor(t.score), borderRadius: 5, transition: "width 0.8s ease" }} />
                  </div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: scoreColor(t.score), width: 30 }}>{t.score}/5</div>
                </div>
              ))}
            </div>
          </div>
          {result.encouragement && (
            <div style={{ marginTop: 24, padding: "12px 20px", background: "#f8f9fa", borderRadius: 10, fontSize: "0.9rem", color: "#2c3e50", fontStyle: "italic", textAlign: "center" }}>
              💬 {result.encouragement}
            </div>
          )}
        </div>

        {/* Task-by-task breakdown */}
        <h2 style={{ margin: "0 0 16px", fontSize: "1.1rem", color: "#2c3e50" }}>📝 Analisi per Task — Free Response</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {result.tasks?.map((t, i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderTop: `4px solid ${scoreColor(t.score)}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: "0.95rem" }}>{t.id}: {t.name}</div>
                <div style={{ background: scoreColor(t.score), color: "white", borderRadius: 20, padding: "3px 12px", fontWeight: 800, fontSize: "0.95rem", fontFamily: "monospace", flexShrink: 0 }}>{t.score}/5</div>
              </div>
              {t.strengths?.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#27ae60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>✓ Punti di forza</div>
                  {t.strengths.map((s, j) => <div key={j} style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.5, marginBottom: 3, paddingLeft: 10, borderLeft: "2px solid #27ae6055" }}>{s}</div>)}
                </div>
              )}
              {t.improvements?.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#e67e22", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>↑ Por mejorar</div>
                  {t.improvements.map((s, j) => <div key={j} style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.5, marginBottom: 3, paddingLeft: 10, borderLeft: "2px solid #e67e2255" }}>{s}</div>)}
                </div>
              )}
              {t.spanishTip && (
                <div style={{ background: "#f0f4ff", borderRadius: 8, padding: "8px 12px", fontSize: "0.79rem", color: "#2c3e50", borderLeft: "3px solid #3498db" }}>
                  🇪🇸 <em>{t.spanishTip}</em>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Spoken Responses Review — Task 3 & 4 */}
        {(responses?.task3 && Object.keys(responses.task3).length > 0) || responses?.task4 ? (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "1.1rem", color: "#2c3e50" }}>🎤 Risposte Orali — Trascrizioni</h2>

            {/* Task 3 turns */}
            {responses?.task3 && Object.keys(responses.task3).length > 0 && (
              <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 14, borderLeft: "4px solid #1abc9c" }}>
                <div style={{ fontWeight: 700, color: "#1abc9c", marginBottom: 14, fontSize: "0.95rem" }}>🗣️ Task 3 — Conversation</div>
                {(selectedTest.task3.turns || []).map((turn, i) => {
                  const spoken = responses.task3[turn.id] || "";
                  const hasSpoken = spoken.trim().length > 0;
                  return (
                    <div key={turn.id} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < (selectedTest.task3.turns.length - 1) ? "1px solid #f0f0f0" : "none" }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                        <div style={{ flexShrink: 0, background: "#2980b9", color: "white", borderRadius: 12, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 700 }}>T{i+1}</div>
                        <div style={{ fontSize: "0.82rem", color: "#555", fontStyle: "italic" }}>
                          <strong style={{ color: "#2980b9", fontStyle: "normal" }}>{turn.speaker}:</strong> "{turn.text}"
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, paddingLeft: 36 }}>
                        <div style={{ flexShrink: 0, background: hasSpoken ? "#27ae60" : "#e74c3c", color: "white", borderRadius: 12, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 700 }}>Tú</div>
                        <div style={{ fontSize: "0.85rem", color: hasSpoken ? "#2c3e50" : "#999", fontStyle: hasSpoken ? "normal" : "italic", lineHeight: 1.6 }}>
                          {hasSpoken ? spoken : "No response recorded / Ninguna respuesta registrada"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Task 4 spoken transcript */}
            {responses?.task4 && (() => {
              const t4SpeakMatch = responses.task4.match(/\[Spoken Transcript\]\n([\s\S]*)/);
              const t4Spoken = t4SpeakMatch ? t4SpeakMatch[1].trim() : "";
              const t4PrepMatch = responses.task4.match(/\[Preparation Notes\]\n([\s\S]*?)(?=\[Spoken Transcript\]|$)/);
              const t4Prep = t4PrepMatch ? t4PrepMatch[1].trim() : (!t4SpeakMatch ? responses.task4 : "");
              if (!t4Spoken && !t4Prep) return null;
              return (
                <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderLeft: "4px solid #f39c12" }}>
                  <div style={{ fontWeight: 700, color: "#f39c12", marginBottom: 14, fontSize: "0.95rem" }}>📢 Task 4 — Confronto Culturale</div>
                  <div style={{ fontSize: "0.82rem", color: "#777", fontStyle: "italic", marginBottom: 10 }}>{selectedTest.task4.topic}</div>
                  {t4Prep && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#95a5a6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>📋 Preparation Notes / Notas de preparación</div>
                      <div style={{ background: "#fffbf0", borderRadius: 8, padding: "10px 14px", fontSize: "0.84rem", lineHeight: 1.7, color: "#2c3e50", whiteSpace: "pre-line" }}>{t4Prep}</div>
                    </div>
                  )}
                  {t4Spoken && (
                    <div>
                      <div style={{ fontSize: "0.74rem", fontWeight: 700, color: "#f39c12", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>🎙️ Spoken Transcript / Transcripción oral</div>
                      <div style={{ background: "#fef9e7", border: "1px solid #f39c12", borderRadius: 8, padding: "10px 14px", fontSize: "0.87rem", lineHeight: 1.75, color: "#2c3e50" }}>{t4Spoken}</div>
                    </div>
                  )}
                  {!t4Spoken && (
                    <div style={{ color: "#999", fontSize: "0.82rem", fontStyle: "italic" }}>No spoken transcript available. / Ninguna transcripción oral disponible.</div>
                  )}
                </div>
              );
            })()}
          </div>
        ) : null}

        {/* MC Question-by-question review */}
        {mcScores?.partA && selectedTest.sectionI && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "1.1rem", color: "#2c3e50" }}>🔢 Section I Review — Multiple Choice / Revisión de la Sección I</h2>
            {[
              { part: "A", label: "Part A — Comprensione scritta (23%)", data: selectedTest.sectionI.partA, answers: mcScores.partA.answers },
              { part: "B", label: "Part B — Comprensione audio e combinata (27%)", data: selectedTest.sectionI.partB, answers: mcScores.partB?.answers },
            ].map(({ part, label, data, answers: ans }) => {
              if (!data || !ans) return null;
              const allQs = data.sets.flatMap(s => s.questions.map(q => ({ ...q, setType: s.type })));
              const partScore = allQs.filter(q => ans[q.id] === q.answer).length;
              const partTotal = allQs.length;
              const partPct = Math.round((partScore / partTotal) * 100);
              return (
                <div key={part} style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#2c3e50", fontSize: "0.95rem" }}>{label}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ height: 8, width: 120, background: "#ecf0f1", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ width: `${partPct}%`, height: "100%", background: pctColor(partPct), borderRadius: 4 }} />
                      </div>
                      <div style={{ fontWeight: 800, fontFamily: "monospace", fontSize: "1.1rem", color: pctColor(partPct) }}>{partScore}/{partTotal}</div>
                      <div style={{ fontSize: "0.85rem", color: pctColor(partPct), fontWeight: 600 }}>{partPct}%</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {allQs.map((q, qi) => {
                      const given = ans[q.id];
                      const correct = given === q.answer;
                      const unanswered = given === undefined;
                      return (
                        <div key={q.id} style={{ padding: "10px 14px", borderRadius: 8, background: correct ? "#eafaf1" : "#fdf2f2", border: `1px solid ${correct ? "#a9dfbf" : "#f5c6cb"}`, fontSize: "0.82rem" }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontWeight: 700, color: correct ? "#27ae60" : "#e74c3c", flexShrink: 0, fontSize: "1rem" }}>{correct ? "✓" : "✗"}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, color: "#2c3e50", marginBottom: 4 }}>D{qi + 1}. {q.text}</div>
                              {!correct && !unanswered && (
                                <div style={{ color: "#e74c3c", marginBottom: 2 }}>Your answer / Tu respuesta: {q.options[given]}</div>
                              )}
                              {unanswered && (
                                <div style={{ color: "#e74c3c", marginBottom: 2 }}>Not answered / No respondido</div>
                              )}
                              {!correct && (
                                <div style={{ color: "#27ae60", fontWeight: 600 }}>✓ Correct Answer / Respuesta correcta: {q.options[q.answer]}</div>
                              )}
                              <div style={{ color: "#95a5a6", fontSize: "0.74rem", marginTop: 3 }}>{q.setType}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Overall + Study Plan */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "1rem", color: "#2c3e50" }}>🌟 Overall Strengths</h3>
            {result.overallStrengths?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: "0.85rem", lineHeight: 1.5, color: "#333" }}>
                <span style={{ color: "#27ae60", flexShrink: 0 }}>✓</span><span>{s}</span>
              </div>
            ))}
            <h3 style={{ margin: "18px 0 12px", fontSize: "1rem", color: "#2c3e50" }}>🎯 Priority Areas</h3>
            {result.priorityAreas?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: "0.85rem", lineHeight: 1.5, color: "#333" }}>
                <span style={{ color: "#e74c3c", flexShrink: 0 }}>!</span><span>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "1rem", color: "#2c3e50" }}>📚 Personalized Study Plan</h3>
            {result.studyPlan?.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: "0.84rem", lineHeight: 1.55, color: "#333" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#3498db", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AP Score Scale Reference */}
        <div style={{ background: "white", borderRadius: 14, padding: 20, marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "0.95rem", color: "#2c3e50" }}>AP Score Scale Reference</h3>
          <div style={{ display: "flex", gap: 8 }}>
            {[1,2,3,4,5].map(s => (
              <div key={s} style={{ flex: 1, textAlign: "center", padding: "10px 6px", borderRadius: 10, background: s === apScore ? apBadgeColor(s) : "#f8f9fa", color: s === apScore ? "white" : "#555", border: `2px solid ${s === apScore ? apBadgeColor(s) : "#e0e0e0"}`, transition: "all 0.2s" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, fontFamily: "monospace" }}>{s}</div>
                <div style={{ fontSize: "0.65rem", lineHeight: 1.3, marginTop: 4 }}>{["No Rec.", "Possibly Qualified", "Qualified", "Well Qualified", "Extremely Well Qualified"][s-1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onHome} style={{ ...btnStyle, padding: "13px 28px", background: "#2c3e50" }}>← Choose Another Test</button>
          <button
            onClick={() => generatePDF({ selectedTest, responses, mcScores })}
            style={{ background: "#111", color: "white", border: "none", borderRadius: "6px", padding: "13px 26px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "inherit" }}
          >
            📄 Download Report for Teacher
          </button>
          <button onClick={onRetry} style={{ ...btnStyle, padding: "13px 28px", background: "#27ae60" }}>↺ Retry This Test</button>
        </div>
      </div>
    </div>
  );
}

// ─── Section I: Multiple Choice ───────────────────────────────────────────────
// Bilingual labels for set types (Spanish → English)
// Source type bilingual labels handled by bilingualType()
function bilingualType(t) {
  const map = {
    "Texto literario": "Literary Text / Texto literario",
    "Artículo informativo": "Article / Artículo",
    "Texto académico": "Academic Text / Texto académico",
    "Texto literario narrativo": "Narrative / Texto narrativo",
    "Artículo de opinión": "Opinion Piece / Artículo de opinión",
    "Poema en prosa": "Prose Poem / Poema en prosa",
    "Artículo y audio": "Article + Audio / Artículo y audio",
    "Informe y entrevista": "Report + Interview / Informe y entrevista",
    "Informe y reportaje": "Report + Audio / Informe y audio",
    // Italian source type fallbacks (inherited from Italian sim — kept for compatibility)
    "Materiale promozionale": "Promotional / Promocional",
    "Testo letterario": "Literary / Literario",
    "Articolo e grafico": "Article + Chart / Artículo y gráfico",
    "Articolo e audio": "Article + Audio / Artículo y audio",
    "Brano narrativo": "Narrative / Narrativo",
    "Testo informativo": "Informational / Informativo",
  };
  return map[t] || t;
}

function SectionI({ test, part, onComplete }) {
  const [setIdx, setSetIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset state if part changes (component reused for A then B)
  useEffect(() => {
    setSetIdx(0);
    setAnswers({});
    setSubmitted(false);
  }, [part]);

  // All hooks above — safe to do early returns now
  if (!test?.sectionI) {
    return <div style={{padding:40,textAlign:"center",color:"#e74c3c"}}>Section I data not found.</div>;
  }
  const data = part === "A" ? test.sectionI.partA : test.sectionI.partB;
  const allQs = data.sets.flatMap(s => s.questions);
  const totalQ = allQs.length;
  const answeredCount = Object.keys(answers).length;
  const currentSet = data.sets[setIdx];
  if (!currentSet) return <div style={{padding:40,textAlign:"center",color:"#7f8c8d"}}>Loading...</div>;

  function handleAnswer(qid, idx) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [qid]: idx }));
  }

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const score = allQs.filter(q => answers[q.id] === q.answer).length;
    // Defer onComplete so React finishes this render cycle before screen changes
    setTimeout(() => onComplete({ answers, score, total: totalQ }), 50);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px", fontFamily: "Georgia, serif" }}>
      {/* Sticky top bar: progress + timer + set tabs */}
      <div style={{ ...cardStyle, marginBottom: 20, padding: "12px 20px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: "0.82rem", color: "#7f8c8d" }}>Answered / Respondidas: <strong style={{ color: answeredCount === totalQ ? "#27ae60" : "#2c3e50" }}>{answeredCount}/{totalQ}</strong></span>
            <div style={{ display: "flex", gap: 3 }}>
              {data.sets.map((_, i) => (
                <div key={i} onClick={() => setSetIdx(i)} title={data.sets[i].type} style={{ width: 28, height: 6, borderRadius: 3, background: i < setIdx ? "#27ae60" : i === setIdx ? "#3498db" : "#ecf0f1", cursor: "pointer", transition: "background 0.2s" }} />
              ))}
            </div>
          </div>
          <div style={{ minWidth: 160 }}><Timer seconds={data.minutes * 60} label={`${data.minutes} min`} onExpire={handleSubmit} /></div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {data.sets.map((s, i) => (
            <button key={i} onClick={() => setSetIdx(i)} style={{ fontSize: "0.72rem", padding: "4px 12px", borderRadius: 12, border: `2px solid ${i === setIdx ? "#3498db" : "transparent"}`, cursor: "pointer", background: i === setIdx ? "#3498db" : "#ecf0f1", color: i === setIdx ? "white" : "#555", fontWeight: i === setIdx ? 700 : 400, transition: "all 0.15s" }}>{i + 1}. {bilingualType(s.type)}</button>
          ))}
        </div>
      </div>

      {/* ── FULL-WIDTH TEXT / SOURCE PANEL ── */}
      <div style={{ ...cardStyle, marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", background: "#3498db", padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.07em" }}>{bilingualType(currentSet.type)}</span>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#666", fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.5 }}>{currentSet.intro}</p>
        {(() => {
          const rawText = currentSet.text || "";
          const hasAudio = rawText.includes("[Trascrizione") || rawText.includes("[Transcripción");
          const hasChart = rawText.includes("[Dati grafico") || rawText.includes("[Datos del gr");
          const markerIdx = rawText.search(/\[Trascrizione|\[Transcripción|\[Dati grafico|\[Datos del gr/);
          const articleText = markerIdx > 0 ? rawText.substring(0, markerIdx).trim() : (hasAudio || hasChart ? "" : rawText);

          const audioMatch = rawText.match(/\[Trascrizione[^\]]*\]|\[Transcripci[^\]]*\]\s*([\s\S]*?)(?=\[Dati grafico|\[Datos del gr|$)/);
          const audioRaw = audioMatch ? audioMatch[1].replace(/^"+|"+$/gm, "").trim() : null;

          function parseDialogueLocal(txt) {
            if (!txt) return null;
            const lines = txt.split("\n").filter(l => l.trim());
            const dialogueLines = [];
            for (const line of lines) {
              const m = line.match(/^((?:(?:Prof|Dott|Dr|Sig\.ra?)\.\s+)?[A-ZÀ-Ü][a-zà-ü]+(?:\s[A-ZÀ-Ü][a-zà-ü]+)*|Conduttore|Conduttrice|Moderatore):\s*(.+)/);
              if (m) dialogueLines.push({ speaker: m[1].trim(), text: m[2].trim() });
            }
            return dialogueLines.length >= 2 ? dialogueLines : null;
          }
          const dialogue = audioRaw ? parseDialogueLocal(audioRaw) : null;

          const chartMatch = rawText.match(/(?:\[Dati grafico[^\]]*\]|\[Datos del gr[^\]]*\])\s*([\s\S]*?)$/);
          const chartLines = chartMatch ? chartMatch[1].trim().split("\n").filter(l => l.trim().startsWith("•")) : [];
          const chartItems = chartLines.map(l => {
            const m = l.match(/•\s*(.+?):\s*([+-]?[\d,.]+)\s*(%)?/);
            if (!m) return null;
            return { label: m[1].trim(), shortLabel: m[1].trim().split(/[\s(,]/)[0], value: parseFloat(m[2].replace(",",".")), unit: m[3] || "" };
          }).filter(Boolean);
          const chartData = chartItems.length >= 2 ? { title: "Chart Data / Datos del gráfico", type: "bar", items: chartItems } : null;

          return (
            <>
              {articleText && (
                <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#2c3e50", whiteSpace: "pre-line", background: "#f8f9fa", padding: "18px 22px", borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: audioRaw || chartData ? 16 : 0 }}>{articleText}</div>
              )}
              {audioRaw && (
                <div style={{ marginTop: articleText ? 12 : 0 }}>
                  <AudioPlayer text={audioRaw} dialogue={dialogue} label={`Listen / Escucha — ${bilingualType(currentSet.type)}`} />
                </div>
              )}
              {chartData && (
                <div style={{ marginTop: 16 }}>
                  <ChartDisplay chartData={chartData} />
                </div>
              )}
              {!articleText && !audioRaw && !chartData && (
                <div style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#2c3e50", whiteSpace: "pre-line", background: "#f8f9fa", padding: "18px 22px", borderRadius: 8, border: "1px solid #e0e0e0" }}>{rawText}</div>
              )}
            </>
          );
        })()}
      </div>

      {/* ── QUESTIONS GRID — 2 columns below the text ── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7f8c8d", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
          Questions / Preguntas — {bilingualType(currentSet.type)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {currentSet.questions.map((q, qi) => {
            const sel = answers[q.id];
            return (
              <div key={q.id} style={{ ...cardStyle, padding: 16, border: sel !== undefined ? "2px solid #3498db" : "2px solid #e8ecef" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2c3e50", marginBottom: 10, lineHeight: 1.45 }}>{qi + 1}. {q.text}</div>
                {q.options.map((opt, oi) => (
                  <div key={oi} onClick={() => handleAnswer(q.id, oi)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 11px", marginBottom: 5, borderRadius: 7, cursor: submitted ? "default" : "pointer", border: `2px solid ${sel === oi ? "#3498db" : "#e0e0e0"}`, background: sel === oi ? "#ebf5fb" : "white", transition: "all 0.12s" }}
                    onMouseEnter={e => { if (!submitted && sel !== oi) e.currentTarget.style.background = "#f0f4f8"; }}
                    onMouseLeave={e => { if (!submitted && sel !== oi) e.currentTarget.style.background = "white"; }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel === oi ? "#3498db" : "#bdc3c7"}`, background: sel === oi ? "#3498db" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {sel === oi && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <span style={{ fontSize: "0.81rem", color: "#2c3e50" }}>{opt}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid #eee" }}>
        {setIdx > 0
          ? <button onClick={() => { setSetIdx(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ ...btnStyle, background: "#95a5a6" }}>← Previous Set / Set precedente</button>
          : <div />}
        {setIdx < data.sets.length - 1
          ? <button onClick={() => { setSetIdx(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={btnStyle}>Next Set / Siguiente bloque →</button>
          : <button onClick={handleSubmit} disabled={submitted} style={{ ...btnStyle, background: "#27ae60" }}>
              {part === "A" ? "End Part A — Continue / Fin Parte A →" : "End Part B — Continue / Fin Parte B →"}
            </button>
        }
      </div>
    </div>
  );
}

// ─── Beta Banner ──────────────────────────────────────────────────────────────
function BetaBanner({ onDismiss }) {
  const font = `"DM Sans", "Segoe UI", system-ui, sans-serif`;
  return (
    <div style={{
      position: "sticky", top: 0, left: 0, right: 0, zIndex: 9999,
      background: "linear-gradient(90deg, #4f46e5 0%, #6d28d9 100%)",
      padding: "10px 20px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      fontFamily: font,
      boxShadow: "0 2px 16px rgba(79,70,229,0.4)",
      minHeight: 42
    }}>
      <span style={{
        background: "white", color: "#4f46e5",
        fontWeight: 800, fontSize: "0.65rem", letterSpacing: "0.08em",
        padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", flexShrink: 0
      }}>BETA</span>
      <span style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.82rem" }}>
        This simulator is in beta. Found a bug or have feedback?&nbsp;
        <a href="mailto:apexamsimulator@gmail.com"
          style={{ color: "white", fontWeight: 700, textDecoration: "none" }}>
          apexamsimulator@gmail.com
        </a>
      </span>
      <button onClick={onDismiss} style={{
        position: "absolute", right: 16,
        background: "transparent", border: "none", color: "rgba(255,255,255,0.6)",
        cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: "0 4px",
        fontFamily: font
      }}>✕</button>
    </div>
  );
}

// ─── Device Setup & Check ─────────────────────────────────────────────────────
function DeviceSetup({ test, onBack, onReady }) {
  const font = `"DM Sans", "Segoe UI", system-ui, sans-serif`;
  const G = "#00f5a0";
  const isOfficial = test?.badge === "Official";

  // mic state: idle | requesting | ok | denied | error
  const [micState, setMicState]     = useState("idle");
  const [micLevel, setMicLevel]     = useState(0);   // 0-100 live level
  const [micRecording, setMicRecording] = useState(false);
  const [micWords, setMicWords]     = useState("");  // transcribed test words
  const streamRef  = useRef(null);
  const analyserRef = useRef(null);
  const rafRef      = useRef(null);
  const recogRef    = useRef(null);

  // audio state: idle | playing | ok | error
  const [audioState, setAudioState] = useState("idle");
  const [audioVoices, setAudioVoices] = useState([]);

  // Load voices on mount
  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis?.getVoices() || [];
      setAudioVoices(v.filter(x => x.lang.startsWith("es")));
    }
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
  }, []);

  // ── Mic check ──
  async function requestMic() {
    setMicState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      // Set up analyser for live level meter
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      analyserRef.current = analyser;
      setMicState("ok");
      // Start level meter
      startLevelMeter(analyser);
    } catch (e) {
      setMicState(e.name === "NotAllowedError" ? "denied" : "error");
    }
  }

  function startLevelMeter(analyser) {
    const data = new Uint8Array(analyser.frequencyBinCount);
    function tick() {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((s, v) => s + v, 0) / data.length;
      setMicLevel(Math.min(100, Math.round(avg * 2.5)));
      rafRef.current = requestAnimationFrame(tick);
    }
    tick();
  }

  function stopMicStream() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setMicLevel(0);
  }

  // ── Mic recording test ──
  function startMicTest() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    // CRITICAL: Stop the getUserMedia stream before starting SpeechRecognition
    // Both cannot hold the mic at the same time in Chrome
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setMicLevel(0);

    setMicRecording(true);
    setMicWords(""); // clear previous result when user presses Speak again

    const recog = new SR();
    recog.lang = "es-ES";
    recog.continuous = false;
    recog.interimResults = true;
    recog.onresult = e => {
      // Show interim results immediately so user sees transcription in real time
      let interim = "";
      let final = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setMicWords(final || interim);
    };
    recog.onerror = (e) => {
      if (e.error !== "aborted" && e.error !== "no-speech") setMicRecording(false);
    };
    recog.onend = () => {
      setMicRecording(false);
      // Restart level meter after SpeechRecognition releases mic — delay so mic is free
      setTimeout(() => {
        if (streamRef.current === null) requestMic();
      }, 400);
    };
    recogRef.current = recog;
    try { recog.start(); } catch(_) { setMicRecording(false); }
  }

  // ── Audio test ──
  const audioStoppedByUser = useRef(false);

  function testAudio() {
    if (!window.speechSynthesis) { setAudioState("error"); return; }
    audioStoppedByUser.current = false;
    setAudioState("playing");
    window.speechSynthesis.cancel();

    const voices   = window.speechSynthesis.getVoices();
    const spanishs = voices.filter(v => v.lang.startsWith("es"));
    const preferred = spanishs.find(v => /mónica|monica|paulina|grandma|flo|shelley|sandy|grandpa|eddy|reed|rocko/i.test(v.name)) || spanishs[0];

    function speak(txt, onDone) {
      const cleaned = txt.replace(/[¡¿«»]/g, "").replace(/[—–]/g, ", ").trim();
      const utt = new SpeechSynthesisUtterance(cleaned);
      utt.lang  = "es-ES";
      utt.rate  = 0.82;
      utt.pitch = 1.0;
      if (preferred) utt.voice = preferred;
      utt.onend  = onDone;
      utt.onerror = () => { if (!audioStoppedByUser.current) setAudioState("error"); };
      window.speechSynthesis.speak(utt);
    }

    // Play a short sample dialogue
    speak("Hola. Esto es una prueba de audio. El audio funciona correctamente.", () => {
      if (audioStoppedByUser.current) return;
      setTimeout(() => {
        speak("Audio is ready. You can start the exam. / El audio está listo. Puede comenzar el examen.", () => {
          if (!audioStoppedByUser.current) setAudioState("ok");
        });
      }, 400);
    });
  }

  function stopAudio() {
    audioStoppedByUser.current = true;
    window.speechSynthesis?.cancel();
    setAudioState("ok");
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicStream();
      window.speechSynthesis?.cancel();
      try { recogRef.current?.abort(); } catch(_) {}
    };
  }, []);

  const micOk    = micState === "ok";
  const audioOk  = audioState === "ok";
  // Can proceed if mic is ok (or denied but user acknowledges) + audio done or skipped
  const canStart = micState !== "idle" && micState !== "requesting" && audioState !== "playing";

  const checkCard = (title, icon, state, children) => {
    const colors = { idle: "#334155", ok: "#00f5a0", denied: "#ff4757", error: "#ff4757", playing: "#f39c12", requesting: "#f39c12" };
    const icons  = { idle: "○", ok: "✓", denied: "✗", error: "✗", playing: "⏳", requesting: "⏳" };
    const c = colors[state] || "#334155";
    return (
      <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${state === "idle" ? "rgba(255,255,255,0.08)" : c + "44"}`, borderRadius: 16, padding: "22px 24px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: state === "idle" ? "rgba(255,255,255,0.06)" : c + "22", border: `2px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: c, fontWeight: 800, flexShrink: 0 }}>
            {state === "idle" ? icon : icons[state]}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e2e8f0" }}>{title}</div>
            <div style={{ fontSize: "0.75rem", color: c, fontWeight: 600, marginTop: 2 }}>
              {{ idle: "Not tested", ok: "Working correctly ✓", denied: "Access denied", error: "Error detected", playing: "Testing...", requesting: "Requesting access...", ok_manual: "Skipped — manual text entry" }[state]}
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060b14 0%, #0d1a2d 50%, #081022 100%)", fontFamily: font, color: "white" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&display=swap'); * { box-sizing: border-box; }`}</style>

      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => { stopMicStream(); stopAudio(); onBack(); }}
          style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: "0.8rem" }}>← Back</button>
        <span style={{ color: "#334155", fontSize: "0.8rem" }}>Device Check · {test?.label}</span>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px 60px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: "2rem", marginBottom: 10 }}>🎧</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Device Check</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
            Complete these checks before starting — takes about 1 minute and prevents interruptions during your exam.
          </p>
        </div>

        {/* ── CHECK 1: MICROPHONE ── */}
        {checkCard("Microphone", "🎙️", micState, <>
          {micState === "idle" && (
            <button onClick={requestMic}
              style={{ background: G, color: "#060b14", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", fontFamily: font }}>
              Request microphone access →
            </button>
          )}

          {micState === "ok" && (
            <div>
              {/* Live level meter */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 6 }}>Live audio level — speak to test:</div>
                <div style={{ height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${micLevel}%`, background: micLevel > 60 ? "#00f5a0" : micLevel > 20 ? "#38bdf8" : "#334155", borderRadius: 6, transition: "width 0.08s ease" }} />
                </div>
                <div style={{ fontSize: "0.72rem", color: micLevel > 10 ? G : "#475569", marginTop: 4 }}>
                  {micLevel > 10 ? "✓ Signal detected — microphone is working" : "Speak into your microphone..."}
                </div>
              </div>

              {/* Quick speech test */}
              <div style={{ background: "rgba(0,245,160,0.06)", border: "1px solid rgba(0,245,160,0.15)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 8 }}>
                  Transcription test — press the button and say something in Spanish:
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={micRecording ? () => { try { recogRef.current?.stop(); } catch(_){} setMicRecording(false); } : startMicTest}
                    style={{ background: micRecording ? "#ff4757" : "rgba(0,245,160,0.15)", color: micRecording ? "white" : G, border: `1px solid ${micRecording ? "#ff4757" : "rgba(0,245,160,0.3)"}`, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", fontFamily: font, display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    {micRecording ? <><span style={{ width: 8, height: 8, borderRadius: "50%", background: "white", display: "inline-block", animation: "pulse2 1s infinite" }} /> Stop</> : "🎙️ Speak"}
                  </button>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "7px 12px", fontSize: "0.82rem", color: micWords ? "#e2e8f0" : "#475569", fontStyle: micWords ? "normal" : "italic", minHeight: 34 }}>
                    {micRecording
                      ? (micWords
                          ? <span>{micWords}<span style={{ color: "#ff4757", marginLeft: 6 }}>●</span></span>
                          : <span style={{ color: "#ff4757" }}>● Listening… speak now</span>)
                      : micWords || "Transcription will appear here"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {micState === "denied" && (
            <div style={{ background: "rgba(255,71,87,0.08)", border: "1px solid rgba(255,71,87,0.25)", borderRadius: 10, padding: "14px 16px", fontSize: "0.82rem", color: "#fca5a5", lineHeight: 1.75 }}>
              <strong style={{ color: "#ff4757", fontSize: "0.88rem" }}>Why is this happening?</strong><br/>
              <span style={{ color: "#94a3b8" }}>
                When running inside Claude.ai, the microphone is blocked by the browser's iframe security policy — this is a Claude.ai limitation, not your computer.
                <strong style={{ color: "#e2e8f0" }}> Voice recording will work once the app is deployed to its own domain</strong> (e.g. on Vercel or localhost).
              </span>

              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <strong style={{ color: "#fbbf24" }}>If you believe mic should work (e.g. on localhost):</strong><br/>
                <span style={{ color: "#94a3b8" }}>
                  1. Look for a 🔒 or 📷 icon in Chrome's address bar<br/>
                  2. Click it → find <strong style={{ color: "white" }}>"Microphone"</strong> → set to <strong style={{ color: "white" }}>"Allow"</strong><br/>
                  3. Reload the page and try again
                </span>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: 8 }}>You can still use the app — just type your spoken responses instead.</div>
                <button onClick={() => setMicState("ok_manual")}
                  style={{ background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontSize: "0.8rem", fontFamily: font, fontWeight: 600 }}>
                  Continue without microphone →
                </button>
              </div>
            </div>
          )}

          {micState === "ok_manual" && (
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>You'll type your spoken responses manually. All other features work normally.</div>
          )}
        </>)}

        {/* ── CHECK 2: AUDIO PLAYBACK ── */}
        {checkCard("Audio Playback (Text-to-Speech)", "🔊", audioState, <>
          {audioVoices.length === 0 && audioState === "idle" && (
            <div style={{ fontSize: "0.78rem", color: "#f59e0b", marginBottom: 10 }}>
              ⚠️ No Spanish voices found on this system. Go to <strong>System Settings → Accessibility → Spoken Content</strong> and add a Spanish voice, then reload.
            </div>
          )}
          {audioState === "idle" && (
            <button onClick={testAudio}
              style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 10, padding: "10px 22px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", fontFamily: font }}>
              ▶ Play audio test
            </button>
          )}
          {audioState === "playing" && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: "0.85rem", color: "#f59e0b" }}>🔊 Playing — you should hear two distinct voices...</div>
              <button onClick={stopAudio}
                style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: "0.75rem", fontFamily: font, flexShrink: 0 }}>
                Stop
              </button>
            </div>
          )}
          {audioState === "ok" && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Did you hear both voices clearly?</div>
              <button onClick={testAudio}
                style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: "0.75rem", fontFamily: font }}>
                Play again
              </button>
            </div>
          )}
          {audioState === "error" && (
            <div style={{ fontSize: "0.8rem", color: "#fca5a5" }}>
              Audio not available in this browser. Written text will remain readable, but there will be no spoken audio.
            </div>
          )}
        </>)}

        {/* ── CHECK 3: BROWSER INFO ── */}
        {(() => {
          const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR/.test(navigator.userAgent);
          return checkCard("Browser", "🌐", isChrome ? "ok" : "denied", (
            <div style={{ fontSize: "0.8rem", color: isChrome ? "#64748b" : "#fca5a5", lineHeight: 1.6 }}>
              {isChrome
                ? `Google Chrome detected ✓ — voice transcription is supported.`
                : `Non-Chrome browser detected. Voice transcription requires Google Chrome. You can still use the app with manual text entry for spoken responses.`}
            </div>
          ));
        })()}

        {/* ── SUMMARY + START ── */}
        <div style={{ marginTop: 28, background: canStart ? "rgba(0,245,160,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${canStart ? "rgba(0,245,160,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 16 }}>
            {!canStart
              ? "⏳ Complete the microphone check above to continue."
              : "✓ Device ready — you can start the exam."}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => { stopMicStream(); stopAudio(); onReady(); }}
              disabled={!canStart}
              style={{ background: canStart ? G : "rgba(255,255,255,0.08)", color: canStart ? "#060b14" : "#475569", border: "none", borderRadius: 12, padding: "13px 32px", fontWeight: 900, fontSize: "0.95rem", cursor: canStart ? "pointer" : "not-allowed", fontFamily: font, transition: "all 0.2s", flex: 1 }}>
              {canStart ? `Start — ${test?.label} →` : "Complete device check to continue"}
            </button>
          </div>
          {canStart && (
            <div style={{ marginTop: 10, fontSize: "0.72rem", color: "#334155" }}>
              The microphone stream will be released now — Chrome will re-activate it automatically when needed during the exam.
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}


function AppInner() {
  const [screen, setScreen] = useState("landing");   // landing | setup | home | s1a | s1b | exam | done
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [responses, setResponses] = useState({ task1: "", task2: "", task3: {}, task4: "" });
  const [mcScores, setMcScores] = useState({ partA: null, partB: null });

  const tasks = [
    { label: "Task 1", subtitle: "Email Reply", icon: "✉️", time: "15 min" },
    { label: "Task 2", subtitle: "Argumentative Essay", icon: "📝", time: "55 min" },
    { label: "Task 3", subtitle: "Conversation", icon: "🗣️", time: "~4 min" },
    { label: "Task 4", subtitle: "Cultural Comparison", icon: "📢", time: "6 min" },
  ];

  function startTest(test) {
    setSelectedTest(test);
    setCurrentTask(0);
    setResponses({ task1: "", task2: "", task3: {}, task4: "" });
    setMcScores({ partA: null, partB: null });
    setScreen("setup"); // always go through setup first
  }

  function launchAfterSetup(test) {
    setScreen(test.badge === "Official" ? "exam" : "s1a");
  }

  function completePartA(result) {
    setMcScores(s => ({ ...s, partA: result }));
    setScreen("s1b");
  }

  function completePartB(result) {
    setMcScores(s => ({ ...s, partB: result }));
    setScreen("exam");
  }

  function completeTask(responseData) {
    const keys = ["task1", "task2", "task3", "task4"];
    setResponses(prev => ({ ...prev, [keys[currentTask]]: responseData }));
    if (currentTask < 3) setCurrentTask(t => t + 1);
    else setScreen("done");
  }


  // ── SHARED DESIGN TOKENS ──
  const G = "#00f5a0";   // neon green accent
  const B = "#38bdf8";   // sky blue
  const R = "#ff4757";   // red
  const goldC = "#ffd60a";
  const appBg = "linear-gradient(135deg, #060b14 0%, #0d1a2d 50%, #081022 100%)";
  const cardGlass = "rgba(255,255,255,0.04)";
  const borderFaint = "rgba(255,255,255,0.08)";
  const font = `"DM Sans", "Segoe UI", system-ui, sans-serif`;

  // ── MOBILE LANDING PAGE ──
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh", background: appBg, fontFamily: font, color: "white", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes floatIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(0,245,160,0.3); } 50% { box-shadow: 0 0 0 8px rgba(0,245,160,0); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .mob-fade { animation: floatIn 0.5s ease both; }
          .mob-fade-1 { animation-delay: 0.05s; }
          .mob-fade-2 { animation-delay: 0.15s; }
          .mob-fade-3 { animation-delay: 0.25s; }
          .mob-fade-4 { animation-delay: 0.35s; }
          .mob-fade-5 { animation-delay: 0.45s; }
          .mob-fade-6 { animation-delay: 0.55s; }
          .mob-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 20px; padding: 22px 20px; margin-bottom: 14px; }
          .mob-task-row { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .mob-task-row:last-child { border-bottom: none; padding-bottom: 0; }
        `}</style>

        {/* Floating flag header */}
        <div className="mob-fade mob-fade-1" style={{ padding: "28px 24px 0", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.6rem" }}>🇪🇸</span>
          <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#e2e8f0" }}>AP Spanish</span>
          <span style={{ marginLeft: "auto", color: "#475569", fontSize: "0.75rem" }}>Language & Culture</span>
        </div>

        {/* Hero */}
        <div className="mob-fade mob-fade-2" style={{ padding: "28px 24px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "3.2rem", marginBottom: 4, lineHeight: 1 }}>🎯</div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 900, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.03em" }}>
            Ace your<br/>
            <span style={{ background: "linear-gradient(90deg, #00f5a0, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AP Spanish exam.
            </span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 300, margin: "0 auto" }}>
            Practice the <strong style={{ color: "#e2e8f0" }}>full AP exam</strong> — multiple choice <em>and</em> free response — with real questions, AI scoring, and detailed feedback. 🧠
          </p>
        </div>

        {/* Social proof strip */}
        <div className="mob-fade mob-fade-2" style={{ padding: "0 24px 20px" }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "🎙️", text: "Voice recording" },
              { icon: "🤖", text: "AI scoring" },
              { icon: "📊", text: "Real feedback" },
              { icon: "✅", text: "Official FRQs" },
            ].map(({ icon, text }) => (
              <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 12px", fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>
                {icon} {text}
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: "0 20px", flex: 1 }}>

          {/* What you actually do */}
          <div className="mob-card mob-fade mob-fade-3">
            <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#00f5a0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>What you practice</div>
            <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: 16 }}>Full exam — both sections</div>

            {/* Section I header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ height: 1, flex: 1, background: "rgba(56,189,248,0.2)" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Section I — Multiple Choice</span>
              <div style={{ height: 1, flex: 1, background: "rgba(56,189,248,0.2)" }} />
            </div>
            {[
              { icon: "📄", label: "Part A — Print Texts", time: "40 min", desc: "30 questions on literary & informational texts in Spanish", color: "#38bdf8" },
              { icon: "🔊", label: "Part B — Print + Audio", time: "55 min", desc: "35 questions combining written sources with audio clips", color: "#38bdf8" },
            ].map(({ icon, label, time, desc, color }) => (
              <div key={label} className="mob-task-row">
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#e2e8f0" }}>{label}</span>
                    <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, borderRadius: 6, padding: "1px 7px", fontSize: "0.65rem", fontWeight: 700 }}>{time}</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.77rem", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}

            {/* Section II header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0 10px" }}>
              <div style={{ height: 1, flex: 1, background: "rgba(0,245,160,0.2)" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#00f5a0", textTransform: "uppercase", letterSpacing: "0.08em" }}>Section II — Free Response</span>
              <div style={{ height: 1, flex: 1, background: "rgba(0,245,160,0.2)" }} />
            </div>
            {[
              { icon: "✉️", label: "Email Reply", time: "15 min", desc: "Write a formal response to a Spanish speaker in context", color: "#00f5a0" },
              { icon: "📝", label: "Argumentative Essay", time: "55 min", desc: "Analyze 3 sources (text, chart, audio) and build an argument", color: "#a78bfa" },
              { icon: "🗣️", label: "Simulated Conversation", time: "5 turns", desc: "The AI plays your conversation partner — you respond in 20 sec", color: "#00f5a0" },
              { icon: "📢", label: "Cultural Comparison", time: "2 min", desc: "Speak: compare your community to a Spanish-speaking one", color: "#fbbf24" },
            ].map(({ icon, label, time, desc, color }) => (
              <div key={label} className="mob-task-row">
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#e2e8f0" }}>{label}</span>
                    <span style={{ background: `${color}20`, color, border: `1px solid ${color}40`, borderRadius: 6, padding: "1px 7px", fontSize: "0.65rem", fontWeight: 700 }}>{time}</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.77rem", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}

            {/* Section I note */}
            <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 12, fontSize: "0.73rem", color: "#64748b", lineHeight: 1.5 }}>
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>Note:</span> Section I is available in the 6 full simulations. Official AP exams (2023–2025) start at Section II — the College Board does not publicly release MC questions.
            </div>
          </div>

          {/* How it works — 3 steps */}
          <div className="mob-card mob-fade mob-fade-4">
            <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>How it works</div>
            {[
              { n: "1", title: "Pick a test", body: "Official 2023, 2024, or 2025 FRQs — or one of 6 full simulations on topics like health, the environment, the arts…" },
              { n: "2", title: "Do the tasks", body: "Type your essay, speak your responses out loud. The AI voice plays your conversation partner." },
              { n: "3", title: "Get your AP score + feedback", body: "The AI generates your score on the 1–5 AP rubric, then gives you specific comments and suggestions for every task — what worked, what to fix, and how to improve." },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ display: "flex", gap: 14, marginBottom: n === "3" ? 0 : 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #00f5a0, #38bdf8)", color: "#060b14", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.85rem", flexShrink: 0, marginTop: 2 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#e2e8f0", marginBottom: 4 }}>{title}</div>
                  <div style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.6 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Scoring highlight */}
          <div className="mob-fade mob-fade-4" style={{ background: "rgba(0,245,160,0.06)", border: "2px solid rgba(0,245,160,0.3)", borderRadius: 20, padding: "20px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>🤖</span>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#e2e8f0" }}>AI-generated score & feedback</div>
            </div>
            {[
              { icon: "🎯", text: "Generates your AP score estimate (1–5 scale)" },
              { icon: "💬", text: "Written comments on each of your 4 responses" },
              { icon: "📈", text: "Specific suggestions on what to improve" },
              { icon: "✍️", text: "Example corrections in Spanish where needed" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: "1rem", lineHeight: 1.4, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
            <div style={{ marginTop: 6, paddingTop: 12, borderTop: "1px solid rgba(0,245,160,0.15)", fontSize: "0.72rem", color: "#475569" }}>
              For practice only. Not endorsed by College Board.
            </div>
          </div>

          {/* Desktop required — reframed positively */}
          <div className="mob-fade mob-fade-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "20px", marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.8rem", lineHeight: 1, flexShrink: 0 }}>🖥️</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#e2e8f0", marginBottom: 6 }}>Opens on desktop — totally worth it</div>
                <p style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.65 }}>
                  Voice recording and timed tasks need a laptop or computer + Chrome. Bookmark this page and you're 30 seconds away from your first practice exam.
                </p>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#475569", fontSize: "0.78rem", marginBottom: 28 }}>Open on a laptop or desktop with Chrome to start practicing.</p>

          {/* Fine print */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, marginBottom: 32 }}>
            <p style={{ color: "#334155", fontSize: "0.68rem", lineHeight: 1.8, textAlign: "center" }}>
              Official FRQs from College Board AP Central (2023–2025). Simulations are not affiliated with or endorsed by College Board. AI scoring is for practice only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Shared nav back button style
  const backBtn = {
    background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: "0.8rem", fontFamily: font,
    transition: "all 0.15s",
  };

  // ── SETUP SCREEN ──
  if (screen === "setup") {
    return <DeviceSetup test={selectedTest} onBack={() => setScreen("landing")} onReady={() => launchAfterSetup(selectedTest)} />;
  }

  // ── LANDING ──
  if (screen === "landing") {
    const examRows = [
      { sec: "I", part: "Part A — Multiple Choice", n: 30, w: "23%", t: "40 min", sub: "Interpretive: Print texts", accent: B },
      { sec: "I", part: "Part B — Multiple Choice", n: 35, w: "27%", t: "55 min", sub: "Interpretive: Print + audio combined", accent: B },
      { sec: "II", part: "Free-Response (4 tasks)", n: 4, w: "50%", t: "88 min", sub: null, accent: G, children: [
        { name: "Email Reply", w: "12.5%", t: "15 min" },
        { name: "Argumentative Essay", w: "12.5%", t: "55 min" },
        { name: "Conversation", w: "12.5%", t: "" },
        { name: "Cultural Comparison", w: "12.5%", t: "18 min (Q3+Q4)" },
      ]},
    ];

    const skills = [
      { n: 1, name: "Comprehend Text",  mc: "20–30% of MC", frq: "FRQ 1, 2, 3" },
      { n: 2, name: "Make Connections", mc: "30–40% of MC", frq: "All 4 FRQs" },
      { n: 3, name: "Interpret Text",   mc: "30–40% of MC", frq: "FRQ 2 (Essay)" },
      { n: 4, name: "Make Meanings",    mc: "10–15% of MC", frq: "All 4 FRQs" },
      { n: 5, name: "Speak to Others",  mc: "—",            frq: "FRQ 3: Conversation" },
      { n: 6, name: "Write to Others",  mc: "—",            frq: "FRQ 1: Email Reply" },
      { n: 7, name: "Present Orally",   mc: "—",            frq: "FRQ 4: Cultural Comparison" },
      { n: 8, name: "Present in Writing", mc: "—",          frq: "FRQ 2: Essay" },
    ];

    return (
      <div style={{ minHeight: "100vh", background: appBg, fontFamily: font, color: "white" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; }
          .card-hover { transition: all 0.2s ease; }
          .card-hover:hover { transform: translateY(-4px); }
          .cta-official:hover { background: rgba(255,71,87,0.22) !important; border-color: rgba(255,71,87,0.7) !important; box-shadow: 0 0 40px rgba(255,71,87,0.2) !important; }
          .cta-sim:hover { background: rgba(0,245,160,0.12) !important; border-color: rgba(0,245,160,0.6) !important; box-shadow: 0 0 40px rgba(0,245,160,0.15) !important; }
          .pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 4px 14px; font-size: 0.75rem; color: #94a3b8; }
          .glow-green { box-shadow: 0 0 0 1px rgba(0,245,160,0.3), 0 0 32px rgba(0,245,160,0.08); }
          .badge-mc { background: rgba(56,189,248,0.15); color: ${B}; border: 1px solid rgba(56,189,248,0.25); border-radius: 6px; padding: 2px 10px; font-size: 0.72rem; font-weight: 600; }
          .badge-frq { background: rgba(0,245,160,0.12); color: ${G}; border: 1px solid rgba(0,245,160,0.25); border-radius: 6px; padding: 2px 10px; font-size: 0.72rem; font-weight: 600; }
        `}</style>

        {/* Nav strip */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.2rem" }}>🇪🇸</span>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e2e8f0" }}>AP Spanish</span>
          <span style={{ color: "#334155", fontSize: "0.75rem", marginLeft: 4 }}>/ Exam Simulator</span>
        </div>

        <div style={{ maxWidth: 820, margin: "0 auto", padding: "52px 24px 80px" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ marginBottom: 20 }}>
              <span className="pill">🎓 AP Spanish Language & Culture</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Study smarter.<br/>
              <span style={{ background: `linear-gradient(90deg, ${G}, ${B})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Score higher.
              </span>
            </h1>
            <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>
              Practice with real AP Spanish free-response questions or full AI-generated simulations — with live voice recording and instant AI scoring.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["🎙️ Voice recording","🤖 AI scoring","📊 Detailed feedback","🇪🇸 Official FRQ format"].map(t => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Exam overview */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 32px", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 3, height: 22, background: G, borderRadius: 2 }} />
              <span style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Exam at a glance</span>
              <span style={{ marginLeft: "auto", background: "rgba(255,214,10,0.12)", color: goldC, border: "1px solid rgba(255,214,10,0.25)", borderRadius: 6, padding: "2px 10px", fontSize: "0.72rem", fontWeight: 600 }}>3 hours · 65 MC · 4 FRQ</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
                <thead>
                  <tr>
                    {["Sec","Question Type","#","Weight","Time"].map((h,i) => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: i === 0 ? "center" : i > 2 ? "center" : "left", color: "#475569", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {examRows.map((row, i) => (
                    <>
                      <tr key={i}>
                        <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 800, fontSize: "0.9rem", color: row.accent }}>{row.sec}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{row.part}</span>
                          {row.sub && <div style={{ fontSize: "0.73rem", color: "#475569", marginTop: 2 }}>{row.sub}</div>}
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>{row.n}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: row.accent, fontWeight: 700 }}>{row.w}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#64748b" }}>{row.t}</td>
                      </tr>
                      {row.children?.map((c, j) => (
                        <tr key={`c${j}`} style={{ background: "rgba(0,245,160,0.02)" }}>
                          <td style={{ padding: "5px 12px" }}/>
                          <td style={{ padding: "5px 12px", paddingLeft: 28, color: "#64748b", fontSize: "0.78rem" }}>↳ {c.name}</td>
                          <td/>
                          <td style={{ padding: "5px 12px", textAlign: "center", color: G, fontSize: "0.78rem" }}>{c.w}</td>
                          <td style={{ padding: "5px 12px", textAlign: "center", color: "#475569", fontSize: "0.78rem" }}>{c.t}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skills grid */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "28px 32px", marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 22, background: B, borderRadius: 2 }} />
              <span style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>8 Skill Categories Assessed</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {skills.map(s => (
                <div key={s.n} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: s.mc === "—" ? "rgba(0,245,160,0.15)" : "rgba(56,189,248,0.15)", border: `1px solid ${s.mc === "—" ? "rgba(0,245,160,0.3)" : "rgba(56,189,248,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: s.mc === "—" ? G : B, flexShrink: 0 }}>{s.n}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "#e2e8f0", marginBottom: 4 }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {s.mc !== "—" && <span className="badge-mc">MC: {s.mc}</span>}
                      <span className="badge-frq">{s.frq}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#334155", marginBottom: 16 }}>Choose your practice mode</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>

            {/* Official */}
            <div className="cta-official card-hover" onClick={() => setScreen("home-official")}
              style={{ background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)", borderRadius: 18, padding: "28px 24px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 6 }}>Official AP Exams</div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: 18 }}>
                Free-response questions sourced from publicly released materials on College Board AP Central. Section II (FRQ) only — MC questions are not publicly released.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: R, color: "white", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: "0.8rem" }}>2023 · 2024 · 2025</span>
                <span style={{ color: "#475569", fontSize: "0.8rem" }}>→</span>
              </div>
            </div>

            {/* Simulations */}
            <div className="cta-sim card-hover" onClick={() => setScreen("home-sim")}
              style={{ background: "rgba(0,245,160,0.06)", border: "1px solid rgba(0,245,160,0.25)", borderRadius: 18, padding: "28px 24px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>🚀</div>
              <div style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 6 }}>Full Simulations</div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: 18 }}>
                Full simulated tests replicating the official AP exam timing, question types, and task structure across 6 cultural themes. Not official College Board material.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: G, color: "#060b14", borderRadius: 8, padding: "6px 16px", fontWeight: 800, fontSize: "0.8rem" }}>6 simulations</span>
                <span style={{ color: "#475569", fontSize: "0.8rem" }}>→</span>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 24px", marginTop: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>📋</span>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  <strong style={{ color: "#e2e8f0", display: "block", marginBottom: 3 }}>Official Tests</strong>
                  Free-response questions sourced from publicly released materials on <strong style={{ color: "#38bdf8" }}>College Board AP Central</strong>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🚀</span>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  <strong style={{ color: "#e2e8f0", display: "block", marginBottom: 3 }}>Simulations</strong>
                  Full simulated tests replicating the official AP exam timing, question types, and task structure. Not official College Board material.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🤖</span>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.6 }}>
                  <strong style={{ color: "#e2e8f0", display: "block", marginBottom: 3 }}>AI Scoring & Feedback</strong>
                  Results and comments are AI-generated for practice only. Not endorsed or approved by College Board.
                </div>
              </div>
            </div>
          </div>

          {/* Chrome recommendation */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "12px 24px" }}>
              <span style={{ fontSize: "1.2rem" }}>🌐</span>
              <span style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                <strong style={{ color: "#ffffff" }}>Google Chrome recommended</strong> — voice recording requires Chrome for full functionality.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME: OFFICIAL EXAMS ──
  if (screen === "home-official") {
    const officialTests = ALL_TESTS.filter(t => t.badge === "Official");
    return (
      <div style={{ minHeight: "100vh", background: appBg, fontFamily: font, color: "white" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; }
          .yr-card { transition: all 0.2s ease; }
          .yr-card:hover { transform: translateY(-6px); background: rgba(255,71,87,0.15) !important; border-color: rgba(255,71,87,0.6) !important; box-shadow: 0 16px 48px rgba(255,71,87,0.2) !important; }
        `}</style>

        {/* Top nav */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12 }}>
          <button style={backBtn} onClick={() => setScreen("landing")}>← Back</button>
          <span style={{ color: "#334155", fontSize: "0.75rem" }}>Official AP Exams</span>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 24px 80px" }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <span style={{ background: "rgba(255,71,87,0.15)", color: R, border: `1px solid rgba(255,71,87,0.3)`, borderRadius: 6, padding: "3px 12px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Official College Board</span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, margin: "16px 0 10px", letterSpacing: "-0.03em" }}>Official AP Exams</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>
              Authentic free-response questions from the College Board. Practice with real exam prompts, sources, and conversation scripts.
            </p>
          </div>

          {/* Notice */}
          <div style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 36, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
            <div style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.65 }}>
              <strong style={{ color: goldC }}>Section II (FRQ) only.</strong> The College Board does not publicly release Section I (Multiple Choice) questions for official AP exams. These tests begin directly at the free-response section.
            </div>
          </div>

          {/* Year cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {officialTests.map((test, i) => (
              <div key={test.id} className="yr-card" onClick={() => startTest(test)}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 16, padding: "22px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(255,71,87,0.15)", border: "1px solid rgba(255,71,87,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: R, flexShrink: 0 }}>
                  {test.year.split(" ")[1]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>AP Spanish {test.year.split(" ")[1]} — Official FRQ</div>
                  <div style={{ color: "#475569", fontSize: "0.8rem" }}>4 free-response tasks · AI scoring · ~88 minutes</div>
                </div>
                <div style={{ color: "#334155", fontSize: "1.2rem" }}>→</div>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div style={{ marginTop: 40, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: 14, fontWeight: 600 }}>What's included in each official exam</div>
            {[
              { icon: "✉️", label: "Task 1", desc: "Email Reply — 15 min" },
              { icon: "📝", label: "Task 2", desc: "Argumentative Essay — 55 min (6 min reading + 49 min writing)" },
              { icon: "🗣️", label: "Task 3", desc: "Scripted Conversation — 5 turns, 20s each" },
              { icon: "📢", label: "Task 4", desc: "Cultural Comparison — 4 min prep + 2 min speaking" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: "1rem", width: 24, textAlign: "center" }}>{item.icon}</span>
                <span style={{ color: G, fontWeight: 600, fontSize: "0.8rem", width: 52, flexShrink: 0 }}>{item.label}</span>
                <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── HOME: SIMULATIONS ──
  if (screen === "home-sim") {
    const simTests = ALL_TESTS.filter(t => t.badge !== "Official");
    const themeIcons = { "Ambiente": "🌍", "Famiglia": "👨‍👩‍👧", "Tecnologia": "💻", "Arte": "🎨", "Istruzione": "📚", "Salute": "🧠" };
    return (
      <div style={{ minHeight: "100vh", background: appBg, fontFamily: font, color: "white" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; }
          .sim-card { transition: all 0.2s ease; }
          .sim-card:hover { transform: translateY(-5px) !important; background: rgba(0,245,160,0.09) !important; border-color: rgba(0,245,160,0.4) !important; box-shadow: 0 20px 48px rgba(0,245,160,0.1) !important; }
          .sim-card:hover .sim-arrow { color: #00f5a0 !important; opacity: 1 !important; }
        `}</style>

        {/* Top nav */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12 }}>
          <button style={backBtn} onClick={() => setScreen("landing")}>← Back</button>
          <span style={{ color: "#334155", fontSize: "0.75rem" }}>Full Simulations</span>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px 80px" }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <span style={{ background: "rgba(0,245,160,0.12)", color: G, border: `1px solid rgba(0,245,160,0.25)`, borderRadius: 6, padding: "3px 12px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>AI Practice · Not Official</span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 900, margin: "16px 0 10px", letterSpacing: "-0.03em" }}>Full Simulations</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.65, margin: "0 0 20px" }}>
              Complete 3-hour practice exams including Section I Multiple Choice and Section II Free-Response — scored by AI in real time.
            </p>

            {/* Feature strip */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["📖","30 MC Part A"],["🎧","35 MC Part B"],["✉️","Email Reply"],["📝","Essay"],["🗣️","Conversation"],["📢","Cultural Comparison"]].map(([icon, label]) => (
                <span key={label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "4px 12px", fontSize: "0.75rem", color: "#94a3b8" }}>{icon} {label}</span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 12, padding: "12px 18px", marginBottom: 36, fontSize: "0.78rem", color: "#64748b", lineHeight: 1.65 }}>
            <strong style={{ color: "#38bdf8" }}>Practice only.</strong> These simulations are AI-generated materials for study purposes. They are not affiliated with, endorsed by, or representative of official College Board AP exam content.
          </div>

          {/* Sim cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {simTests.map((test, i) => {
              const mainTheme = (test.themes || [])[0] || "";
              const icon = Object.entries(themeIcons).find(([k]) => mainTheme.includes(k))?.[1] || "🇪🇸";
              const letter = test.year?.replace("Simulazione ", "") || String.fromCharCode(65 + i);
              return (
                <div key={test.id} className="sim-card" onClick={() => startTest(test)}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 18px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden" }}>

                  {/* Background letter watermark */}
                  <div style={{ position: "absolute", right: -6, bottom: -10, fontSize: "5rem", fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, pointerEvents: "none" }}>{letter}</div>

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "2rem" }}>{icon}</div>
                    <div style={{ background: "rgba(0,245,160,0.12)", color: G, borderRadius: 6, padding: "2px 8px", fontSize: "0.68rem", fontWeight: 700 }}>SIM {letter}</div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4, color: "#e2e8f0" }}>{test.label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {(test.themes || []).slice(0, 2).map((th, ti) => (
                        <span key={ti} style={{ background: "rgba(255,255,255,0.05)", color: "#64748b", borderRadius: 5, padding: "2px 8px", fontSize: "0.68rem" }}>{th}</span>
                      ))}
                    </div>
                  </div>

                  <div className="sim-arrow" style={{ color: "#1e293b", fontSize: "0.78rem", fontWeight: 600, opacity: 0.6, transition: "all 0.2s" }}>
                    Start simulation →
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: "center", color: "#1e293b", fontSize: "0.7rem", marginTop: 32 }}>
            Full simulations replicate official AP exam timing, question types, and task structure but are not affiliated with, endorsed by, or approved by College Board. AI scoring and feedback are for practice only and not approved by College Board.
          </p>

          {/* Chrome recommendation */}
          <div style={{ textAlign: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 20px" }}>
              <span style={{ fontSize: "1.1rem" }}>🌐</span>
              <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
                <strong style={{ color: "#f1f5f9" }}>Google Chrome recommended</strong> — voice recording and speech transcription require Chrome.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME (legacy fallback → redirect) ──
  if (screen === "home") { setScreen("landing"); return null; }

  // ── SECTION I PART A ──
  if (screen === "s1a") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Georgia, serif" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1b2a, #16213e)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
          <div>
            <span style={{ color: "#8aa8c0", fontSize: "0.75rem" }}>{selectedTest?.label} · Section I</span>
            <div style={{ color: "white", fontWeight: 700, fontSize: "0.97rem" }}>📖 Part A: Interpretive Reading</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setScreen("landing")} style={{ background: "rgba(255,255,255,0.1)", color: "#8aa8c0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.75rem" }}>← Tests</button>
            {["I-A","I-B","II-1","II-2","II-3","II-4"].map((lbl, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "#3498db" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6rem", fontWeight: 700, border: i === 0 ? "2px solid white" : "2px solid transparent" }}>{lbl}</div>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "6px 24px" }}>
          <span style={{ color: "#8aa8c0", fontSize: "0.76rem" }}>Section I · Part A · Print Texts · 40 min · 23% of exam</span>
        </div>
        <SectionI test={selectedTest} part="A" onComplete={completePartA} />
      </div>
    );
  }

  // ── SECTION I PART B ──
  if (screen === "s1b") {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Georgia, serif" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1b2a, #16213e)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
          <div>
            <span style={{ color: "#8aa8c0", fontSize: "0.75rem" }}>{selectedTest?.label} · Section I</span>
            <div style={{ color: "white", fontWeight: 700, fontSize: "0.97rem" }}>🎧 Part B: Interpretive Listening</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setScreen("landing")} style={{ background: "rgba(255,255,255,0.1)", color: "#8aa8c0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.75rem" }}>← Tests</button>
            {["I-A","I-B","II-1","II-2","II-3","II-4"].map((lbl, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "#27ae60" : i === 1 ? "#3498db" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6rem", fontWeight: 700, border: i === 1 ? "2px solid white" : "2px solid transparent" }}>
                {i === 0 ? "✓" : lbl}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "6px 24px" }}>
          <span style={{ color: "#8aa8c0", fontSize: "0.76rem" }}>Section I · Part B · Audio & Combined Texts · 55 min · 27% of exam</span>
        </div>
        <SectionI test={selectedTest} part="B" onComplete={completePartB} />
      </div>
    );
  }

  // ── DONE = SCORE RESULTS ──
  if (screen === "done") {
    return (
      <ScoreResults
        selectedTest={selectedTest}
        responses={responses}
        mcScores={mcScores}
        onRetry={() => startTest(selectedTest)}
        onHome={() => { setSelectedTest(null); setScreen("landing"); }}
      />
    );
  }

  // ── SECTION II EXAM ──
  const task = tasks[currentTask];
  const isOfficial = selectedTest?.badge === "Official";
  const sectionIParts = isOfficial ? ["II-1","II-2","II-3","II-4"] : ["I-A","I-B","II-1","II-2","II-3","II-4"];
  const dotOffset = isOfficial ? 0 : 2;  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "linear-gradient(135deg, #0d1b2a, #16213e)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
        <div>
          <span style={{ color: "#8aa8c0", fontSize: "0.75rem" }}>{selectedTest?.label} · Section II</span>
          <div style={{ color: "white", fontWeight: 700, fontSize: "0.97rem" }}>{task.icon} {task.label}: {task.subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setScreen("landing")} style={{ background: "rgba(255,255,255,0.1)", color: "#8aa8c0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.75rem" }}>← Tests</button>
          {sectionIParts.map((lbl, i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: i < dotOffset ? "#27ae60" : i - dotOffset < currentTask ? "#27ae60" : i - dotOffset === currentTask ? "#3498db" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.6rem", fontWeight: 700, border: i - dotOffset === currentTask ? "2px solid white" : "2px solid transparent" }}>
              {i < dotOffset || i - dotOffset < currentTask ? "✓" : lbl}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#2c3e50", padding: "6px 24px", display: "flex", gap: 20 }}>
        <span style={{ color: "#8aa8c0", fontSize: "0.76rem" }}>🎓 Tema: {selectedTest?.themes?.[0]}</span>
        <span style={{ color: "#4a6070", fontSize: "0.76rem" }}>Section II · Part {currentTask < 2 ? "A" : "B"} · {task.time}</span>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        {currentTask === 0 && <Task1 data={selectedTest.task1} onComplete={completeTask} />}
        {currentTask === 1 && <Task2 data={selectedTest.task2} onComplete={completeTask} />}
        {currentTask === 2 && <Task3 data={selectedTest.task3} onComplete={completeTask} />}
        {currentTask === 3 && <Task4 data={selectedTest.task4} onComplete={completeTask} />}
      </div>
    </div>
  );
}

function AppShell() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  return (
    <>
      {!bannerDismissed && <BetaBanner onDismiss={() => setBannerDismissed(true)} />}
      <AppInner />
    </>
  );
}

export default function App() {
  return <ErrorBoundary><AppShell /></ErrorBoundary>;
}
