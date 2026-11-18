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
      'La causa principal del aumento acelerado de la temperatura terrestre en los últimos dos siglos son las actividades humanas, como la quema de combustibles fósiles.',
    esVerdadera: true,
    explicacion:
      'Correcto: desde la era industrial las actividades humanas han incrementado en más de 30% el CO2 atmosférico.',
  },
  {
    id: 2,
    dimension: 'Concepto',
    afirmacion:
      'El calentamiento global ocurre principalmente porque la Tierra se está acercando físicamente al Sol.',
    esVerdadera: false,
    explicacion:
      'Falso: el calentamiento actual se debe a la acumulación de gases de efecto invernadero que atrapan calor en la atmósfera, no a un acercamiento al Sol.',
  },
  {
    id: 3,
    dimension: 'Consecuencias',
    afirmacion:
      'Las altas temperaturas globales aumentan los niveles de ozono y contaminantes del aire, agravando enfermedades cardiovasculares y respiratorias.',
    esVerdadera: true,
    explicacion:
      'Correcto: tal como muestra la cápsula del minijuego shooter, el calor extremo impacta directamente la salud respiratoria y cardiovascular.',
  },
  {
    id: 4,
    dimension: 'Acciones',
    afirmacion:
      'La energía eólica y la energía solar son fuentes limpias porque no emiten dióxido de carbono durante su producción eléctrica.',
    esVerdadera: true,
    explicacion:
      'Correcto: reemplazar combustibles fósiles por fuentes renovables como la solar y eólica reduce las emisiones de GEI.',
  },
];
