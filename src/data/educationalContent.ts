import { InformativeCapsule, SectorImprovement, SectorId } from '../types/game';

/**
 * Textos educativos, diálogos y cápsulas informativas de Reto Global.
 * Basados en el artículo científico (Barcena-Vazquez et al., 2023) y el
 * prototipo de alta fidelidad. Cada cápsula sigue el patrón:
 * Información -> Consecuencia -> Llamado a la acción.
 */

export const NARRATOR_DIALOGUES = [
  {
    id: 'saludo',
    texto:
      'Hola, yo soy el Charrán Ártico. En mi ruta migratoria desde el Círculo Polar Ártico al Círculo Polar Antártico he recorrido las distintas latitudes del planeta y he presenciado las alteraciones ambientales derivadas del calentamiento global.',
  },
  {
    id: 'concepto',
    texto:
      'El calentamiento global es el aumento de temperatura que se ha observado en el planeta, a partir del inicio de la era industrial, debido a las actividades humanas.',
  },
  {
    id: 'combustibles',
    texto:
      'Cuando quemamos combustibles fósiles incrementamos los niveles de gases de «efecto invernadero», como el dióxido de carbono (CO2), y estos a su vez mantienen el calor atrapado en la atmósfera. Veamos cómo funciona:',
  },
];

export const GREENHOUSE_STEPS = [
  {
    id: 1,
    titulo: '1. Radiación solar entrante',
    texto: 'La luz del Sol llega a la Tierra cruzando la atmósfera.',
  },
  {
    id: 2,
    titulo: '2. Energía reflejada',
    texto: 'Una parte de la energía es reflejada de vuelta al espacio.',
  },
  {
    id: 3,
    titulo: '3. Absorción e irradiación',
    texto:
      'La Tierra absorbe otra parte de la energía y la vuelve a irradiar en forma de calor.',
  },
  {
    id: 4,
    titulo: '4. Atrapamiento por gases de efecto invernadero',
    texto:
      'Los gases de efecto invernadero (principalmente el dióxido de carbono CO2 y el metano) absorben la mayor parte del calor y lo dispersan en todas direcciones, calentando el planeta.',
  },
];

export const VILLAGE_INTRO_STEPS = [
  {
    id: 'aldea',
    titulo: 'Aldea Global afectada',
    texto:
      '¡Esta es la Aldea Global! Actualmente se encuentra muy afectada por nuestra falta de cuidado y el exceso de emisiones de gases de efecto invernadero. La temperatura está fuera de control. Solo con tu ayuda podremos restaurar el equilibrio y disminuir el calentamiento global.',
  },
  {
    id: 'termometro',
    titulo: 'Termómetro global',
    texto:
      'Hagamos descender el termómetro global. Cada mejora ambiental que financies reducirá la temperatura de la aldea hasta restaurar el equilibrio.',
  },
  {
    id: 'insignias',
    titulo: 'Mejoras ganadas',
    texto:
      'Aquí irás acumulando tus logros en beneficio del planeta. Reúne las 4 insignias jugando los minijuegos e invirtiendo tus monedas.',
  },
];

export const CAPSULES: Record<string, InformativeCapsule> = {
  shooter_intro: {
    id: 'shooter_intro',
    titulo: 'Huella de carbono',
    informacion:
      'En los últimos dos siglos más de 2,000 gigatones de CO2 se han emitido a la atmósfera debido a la actividad humana; a esto lo conocemos como huella de carbono.',
    consecuencia:
      'La acumulación excesiva de CO2 intensifica el efecto invernadero y eleva la temperatura promedio del planeta.',
    accion:
      '¿Preparado? Es momento de reducir nuestra huella de carbono eliminando las nubes de gases de efecto invernadero.',
  },
  shooter_outro: {
    id: 'shooter_outro',
    titulo: 'Calor y salud respiratoria',
    informacion:
      '¿Sabías que las temperaturas altas provocan un aumento de los niveles de ozono y otros contaminantes del aire?',
    consecuencia:
      'Estos contaminantes agravan las enfermedades cardiovasculares y respiratorias en las personas.',
    accion:
      'Al combatir el calentamiento global cuidamos nuestra salud. ¡Aprovecha tus monedas para mejorar un sector de la aldea!',
  },
  platformer_intro: {
    id: 'platformer_intro',
    titulo: 'Incremento desde 1850',
    informacion:
      'A partir del año 1850 a la fecha, la concentración de CO2 en la atmósfera se ha incrementado por arriba de un 30%.',
    consecuencia:
      'Esto ha provocado un aumento cercano a 1 °C en la temperatura global del planeta.',
    accion:
      '¡Vamos! Es momento de emplear toda la energía de nuestro poder verde para eliminar las amenazas y derrotar al calentamiento global.',
  },
  platformer_mid: {
    id: 'platformer_mid',
    titulo: 'Origen humano del calentamiento',
    informacion:
      'El calentamiento global tiene su origen principal en las actividades humanas.',
    consecuencia:
      'La quema de combustibles fósiles y la destrucción de bosques para convertirlos en pastizales contribuyen al aumento de CO2.',
    accion:
      '¡Vamos! Es momento de revertir la tendencia neutralizando los focos contaminantes.',
  },
  platformer_boss: {
    id: 'platformer_boss',
    titulo: 'Sumideros naturales y reto final',
    informacion:
      'Las emisiones de CO2 han aumentado en un 45% durante las últimas dos décadas.',
    consecuencia:
      'Los árboles y los océanos absorben hasta la mitad de estas emisiones, atenuando los efectos del calentamiento global, pero esta lucha necesita de tu ayuda.',
    accion: '¡Adelante! Es hora de acabar con el villano «Smogger».',
  },
};

// Supuesto documentado: en el video de alta fidelidad una mejora cuesta 10,000 monedas.
export const SECTOR_COST = 10000;

export const SECTORS: Record<SectorId, SectorImprovement> = {
  transporte: {
    id: 'transporte',
    nombre: 'Transporte público cero emisiones',
    descripcionCorta: 'Movilidad colectiva eléctrica, caminatas y bicicleta.',
    recomendacion:
      'Siempre que puedas deja el carro y camina, o utiliza la bicicleta para llegar a tu destino. Si son distancias grandes, usa el transporte público y sugiere a tu municipio que renueve su flota de autobuses para que sean más ecológicos.',
    costo: SECTOR_COST,
    esTextoConfirmadoEnFuentes: true,
  },
  vehiculos: {
    id: 'vehiculos',
    nombre: 'Automóvil eléctrico',
    descripcionCorta: 'Sustitución de motores de combustión por movilidad eléctrica.',
    recomendacion:
      'Los automóviles de combustión liberan dióxido de carbono en cada viaje. Cuando necesites vehículo motorizado, prioriza opciones eléctricas abastecidas con energías limpias, comparte trayectos y evita aceleraciones innecesarias para reducir tu huella de carbono.',
    costo: SECTOR_COST,
    esTextoConfirmadoEnFuentes: false,
  },
  energia: {
    id: 'energia',
    nombre: 'Fuentes de energía limpia',
    descripcionCorta: 'Generación solar y eólica sin quema de combustibles fósiles.',
    recomendacion:
      'La energía eólica y solar generan electricidad sin emitir dióxido de carbono a la atmósfera. Apoya la transición hacia energías renovables en tu comunidad y adopta hábitos de ahorro eléctrico en casa y en la escuela.',
    costo: SECTOR_COST,
    esTextoConfirmadoEnFuentes: false,
  },
  reforestacion: {
    id: 'reforestacion',
    nombre: 'Campañas de reforestación',
    descripcionCorta: 'Siembra y cuidado de árboles que absorben CO2.',
    recomendacion:
      'Los árboles brindan beneficios importantes tanto a las personas como al planeta al fortalecer los medios de vida, suministrar aire y agua limpios, conservar la biodiversidad y responder al calentamiento global. Siempre que puedas únete a actividades de reforestación y organiza una con tus amigos.',
    costo: SECTOR_COST,
    esTextoConfirmadoEnFuentes: true,
  },
};

export const VICTORY_SUMMARY_TEXT =
  'Durante esta serie de minijuegos hemos descubierto que el calentamiento global es provocado por el efecto invernadero producto de las emisiones de carbono, derivadas de las actividades humanas; y que la mejor manera de ayudar a combatirlo es reducir nuestra huella de carbono a través de un cambio de hábitos.';

export interface DemoQuestion {
  id: number;
  dimension: 'Concepto' | 'Causas' | 'Consecuencias' | 'Acciones';
  afirmacion: string;
  esVerdadera: boolean;
  explicacion: string;
}

/**
 * Preguntas de demostración inspiradas en los temas del artículo (Apéndice Tabla 6).
 * NOTA: Se aclara explícitamente en la interfaz que son preguntas de demostración
 * para uso en clase y no constituyen el cuestionario validado del estudio.
 */
export const DEMO_CLASSROOM_QUESTIONS: DemoQuestion[] = [
  {
    id: 1,
    dimension: 'Causas',
    afirmacion:
      'Una ciudad reemplaza sus buses diésel por buses eléctricos, pero genera esa electricidad quemando carbón y continúa talando bosques. Con esos cambios basta para afirmar que redujo a cero su aporte al calentamiento global.',
    esVerdadera: false,
    explicacion:
      'Falso. Electrificar los buses no elimina las emisiones si la electricidad aún se produce quemando carbón. Además, la deforestación libera carbono y reduce los árboles que pueden absorber CO₂.',
  },
  {
    id: 2,
    dimension: 'Concepto',
    afirmacion:
      'El aumento de CO₂ no crea el calor que llega del Sol: intensifica el efecto invernadero al absorber y redistribuir parte del calor que la Tierra vuelve a emitir.',
    esVerdadera: true,
    explicacion:
      'Verdadero. La cápsula del juego explica que la Tierra absorbe energía y la reemite como calor; gases como el CO₂ y el metano absorben parte de ese calor y lo dispersan, calentando el planeta.',
  },
  {
    id: 3,
    dimension: 'Causas',
    afirmacion:
      'Si se detuviera la quema de combustibles fósiles, pero continuara la deforestación para ampliar pastizales, todavía habría una actividad humana que contribuye al calentamiento global.',
    esVerdadera: true,
    explicacion:
      'Correcto. El artículo identifica tanto la quema de combustibles fósiles como la deforestación para cambiar el uso del suelo entre las actividades humanas que contribuyen al calentamiento.',
  },
  {
    id: 4,
    dimension: 'Consecuencias',
    afirmacion:
      'El juego relaciona temperaturas más altas con aumentos de ozono y otros contaminantes del aire, que pueden agravar problemas respiratorios y cardiovasculares.',
    esVerdadera: true,
    explicacion:
      'Verdadero. Esa es la relación que presenta la cápsula educativa: más calor puede elevar los niveles de ozono y otros contaminantes, con efectos en la salud respiratoria y cardiovascular.',
  },
  {
    id: 5,
    dimension: 'Causas',
    afirmacion:
      'Como los árboles y los océanos absorben hasta la mitad de las emisiones de CO₂, sus sumideros naturales hacen innecesario reducir las emisiones humanas.',
    esVerdadera: false,
    explicacion:
      'Falso. El artículo explica que árboles y océanos absorben una parte importante de las emisiones, pero la acumulación de CO₂ sigue aumentando. Los sumideros no sustituyen la reducción de emisiones.',
  },
  {
    id: 6,
    dimension: 'Acciones',
    afirmacion:
      'En Reto Global, las monedas se invierten en cuatro sectores: transporte público sin emisiones, energía limpia, reforestación y vehículos eléctricos.',
    esVerdadera: true,
    explicacion:
      'Verdadero. Esos son los cuatro sectores de mejora descritos en el artículo y representados en el juego. Las mejoras convierten las recompensas en acciones de mitigación.',
  },
  {
    id: 7,
    dimension: 'Causas',
    afirmacion:
      'Las cifras del artículo describen dos medidas distintas: la concentración atmosférica de CO₂ aumentó más de 30% desde 1850, y las emisiones de CO₂ crecieron 45% durante las últimas dos décadas.',
    esVerdadera: true,
    explicacion:
      'Verdadero. La cápsula sobre el minijuego de plataformas habla del aumento de la concentración desde 1850; otra cápsula menciona el aumento de emisiones durante las últimas dos décadas. Cambian tanto la medida como el periodo.',
  },
  {
    id: 8,
    dimension: 'Acciones',
    afirmacion:
      'Para reducir emisiones del transporte, el juego recomienda caminar o usar bicicleta en trayectos cortos y recurrir al transporte público en distancias largas.',
    esVerdadera: true,
    explicacion:
      'Verdadero. La cápsula recomienda caminar o ir en bicicleta cuando sea posible y usar transporte público en trayectos largos; también propone renovar la flota de buses para hacerla más ecológica.',
  },
];
