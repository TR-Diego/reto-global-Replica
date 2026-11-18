# Supuestos de diseño y guía rápida de edición — Reto Global (prototipo web)

Este archivo documenta las decisiones tomadas donde las fuentes adjuntas (artículo científico de Barcena-Vazquez et al., 2023; video de baja fidelidad v1; y video de alta fidelidad v2) presentaban vacíos, diferencias o requerían adaptación a navegador.

## 1. Supuestos aplicados

1. **Documento adicional no recibido**: En el mensaje inicial se listó un segundo documento descriptivo, pero en los adjuntos solo llegaron el artículo científico en PDF y los dos videos. Todo el diseño se reconstruyó fielmente a partir de esas tres fuentes.
2. **Controles de teclado, ratón y táctiles**: El artículo señala controles simples tipo arcade para PC sin especificar las teclas exactas. Se asignaron controles estándar (`←`/`→` o `A`/`D` para mover, `↑`/`W` para saltar, `Espacio`/`Z`/`Clic` para disparar *Poder Verde* y `Enter`/`Espacio` para avanzar diálogos), junto con botones clicables/táctiles equivalentes en pantalla.
3. **Economía de monedas (`10,000` por mejora)**: En el video de alta fidelidad se observa que cada inversión descuenta exactamente `10,000` monedas (p. ej. `012600 → 002600` y `016900 → 006900`). Dado que la fórmula exacta del bono final no se detalla en el artículo, este prototipo otorga `+100` por nube/moneda, `+500` por bote en llamas, `+2,000` por derrotar a *Smogger* y un bono de `+10,000` al completar cada minijuego para que el jugador pueda desbloquear una mejora tras cada partida.
4. **Recomendaciones de sectores no abiertos en el video**: El video de alta fidelidad muestra los textos completos de *Campañas de reforestación* y *Transporte público cero emisiones*. Para *Automóvil eléctrico* y *Fuentes de energía limpia* se redactaron recomendaciones coherentes con los temas del artículo y las guías UNESCO citadas (Paas, 2016).
5. **Preguntas educativas de demostración**: Se incluyó un modal opcional (*Preguntas demo*) con 4 ítems de Verdadero/Falso inspirados en las dimensiones del estudio, aclarando explícitamente que son de demostración para clase y que no constituyen el cuestionario validado ni recopilan datos personales.
6. **Diferencias entre baja y alta fidelidad**: Se priorizó el flujo y estética del prototipo de alta fidelidad (2 personajes, Charrán Ártico, animación del efecto invernadero, 2 minijuegos de libre elección, 4 sectores estratégicos y pantalla final con aldea restaurada).

## 2. Dónde editar cada parte del proyecto

- **Textos educativos, diálogos y cápsulas**: `src/data/educationalContent.ts`
- **Colores, tipografía y estilos globales**: `index.html` y `src/index.css`
- **Gráficos SVG originales (emblema, personajes, Charrán Ártico, mapa isométrico)**: `src/components/art/GameArtwork.tsx`
- **Mecánicas del minijuego Shooter (*Elimina los gases de efecto invernadero*)**: `src/screens/ShooterMinigame.tsx`
- **Mecánicas del minijuego Plataformas (*Vence a los enemigos de la atmósfera* y jefe *Smogger*)**: `src/screens/PlatformerMinigame.tsx`
- **Flujo general de pantallas y estado de partida**: `src/App.tsx`
- **Efectos de sonido retro (Web Audio API)**: `src/utils/sound.ts`
