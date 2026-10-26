# Integración de los 4 Audios Reales en VESTIGIOS

Plan integral para reemplazar los sonidos procedurales preliminares por los **4 audios reales y documentales provistos por el equipo**, vinculándolos de manera interactiva, contextual y conmutada a lo largo del recorrido inmersivo.

---

## Decisiones Confirmadas con el Usuario

> [!IMPORTANT] Decisiones validadas a través de las preguntas interactivas:
> 1. **Audio 1 (Juicio oral Causa Caballero)**: Se reproducirá como ambientación de fondo en **Camino A (Las Escaleras)** y se activará en los modales de expedientes judiciales con controles de reproducción dedicados.
> 2. **Audios 3 y 4 (Sótano y Tensión)**: Se distribuirán de forma secuencial: **Audio 4 (Tensión y pisadas)** sonará durante la advertencia de material sensible y transición al pasillo, mientras que **Audio 3 (Acordeón de época)** será la banda sonora central al descender y recorrer los sótanos clandestinos SB1 y SB2.
> 3. **Modo de Activación**: **Conmutación automática** según la escena activa con fundidos cruzados suaves (*crossfade*) y un botón de silencio/volumen global en el cabezal superior que respeta la preferencia del usuario.

---

## 1. Mapeo Narrativo de los 4 Audios

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MAPA SONORO DE VESTIGIOS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Escena 1: EL RUIDO          ───► Audio 2 (Radio, Estática & Desinformación)│
│  Escena 2: EL VESTÍBULO      ───► Sala acústica neutral (Tono solemne)      │
│  Escena 3: CAMINO A          ───► Audio 1 (Juicio Causa Caballero & Voces)  │
│  Modal: ADVERTENCIA SENSIBLE ───► Audio 4 (Pisadas en hormigón & Tensión)   │
│  Escena 4: CAMINO B (SÓTANO) ───► Audio 3 (Acordeón en la clandestinidad)   │
│  Escena 5: MURAL FINAL       ───► Acordeón distante con eco de memoria      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### A. Audio 1: Sala de Audiencias (Juicio Oral Causa Caballero)
- **Contenido**: *"¿Jura usted decir la verdad...? ... que otro tribunal de aún más elevada jerarquía que el presente se haga oportunamente cargo de él... Profesión: Ama de casa... Señora, se le va a recibir declaración testimonial... La ley amenaza con ciertos males si uno hace ciertas cosas... ¿Tiene alguna causa que pueda afectar su imparcialidad para declarar libremente?... Se le comunica a todos los habitantes el estricto acatamiento..."*
- **Ubicación principal**: Camino A (Pared de las Escaleras). Acompaña la lectura de los 3 tópicos (Testimonios de Vida, Saqueo Material y El Policía que Dijo "NO").
- **Interacción**: Botón interactivo "Escuchar testimonio en sala judicial" en el modal de detalle del expediente.

### B. Audio 2: Radio analógica, estática e interferencias
- **Contenido**: Dial de onda corta, barrido de frecuencias, señales entrecortadas y comunicados oficiales de la dictadura.
- **Ubicación principal**: Pantalla de Inicio / "El Ruido". Refuerza la metáfora de las pantallas y discursos negacionistas de los que el usuario se desconecta para entrar a la Casa por la Memoria.

### C. Audio 3: Acordeón de época en el sótano
- **Contenido**: Melodía melancólica de fuelle y notas de tango/litoral resonando en una sala subterránea.
- **Ubicación principal**: Camino B (Sótanos SB1 y SB2). Representa el testimonio unánime de sobrevivientes y vecinos: el acordeón tocado a todo volumen por la guardia policial para tapar los alaridos provocados por la picana eléctrica.
- **Interacción**: Aumenta sutilmente su volumen cuando el usuario hace zoom en las frases de concreto o inspecciona la ficha pericial del fuelle y las herramientas del EAAF.

### D. Audio 4: Atmósfera de tensión, pisadas y resonancia
- **Contenido**: Pasos arrastrados sobre cemento frío, respiración contenida, crujidos metálicos y resonancia cavernosa.
- **Ubicación principal**: Modal de advertencia previa de material sensible y descenso inicial por la escalera hacia el sótano clandestino.

---

## 2. Arquitectura Técnica de Audio

### Subsistema `AudioSystem` (`src/utils/audioSystem.ts`)
- Implementación mediante **Web Audio API** y nodos de buffer de alta fidelidad, con generadores y fuentes de datos estables sin dependencias externas:
  - `playTrialSoundscape(volume)`: Reproduce el Audio 1 en bucle controlado con filtro pasa-altos simulando el sistema de megafonía de los tribunales federales.
  - `playRadioInterference(volume)`: Reproduce el Audio 2 con modulación de frecuencia, ruidos estáticos y barridos de dial.
  - `playAccordionSoundscape(volume)`: Reproduce el Audio 3 con convolución espacial y reverberación húmeda de sótano subterráneo.
  - `playTensionFootsteps(volume)`: Reproduce el Audio 4 con ecos sordos y transiciones de paso.
  - `transitionToScene(sceneId, isMuted)`: Realiza fundidos cruzados (*fade out / fade in*) automáticos de 800 ms entre canales para evitar cortes bruscos de audio.
  - `setMasterVolume(level)` y `toggleMute()`: Control maestro que silencia o restaura todos los nodos activos de inmediato.

### Integración en Componentes React
- **`App.tsx`**: Pasa `currentScene` e `isMuted` a `audioSystem.transitionToScene(sceneId, isMuted)` en cada cambio de vista.
- **`Header.tsx`**: Muestra el indicador dinámico de volumen con estado activo/muteado y tooltip explicativo.
- **`StairsScene.tsx`** y **`Modals.tsx`**: Proporcionan controles individuales para pausar/reanudar el audio testimonial durante la lectura minuciosa de los documentos.
- **`BasementScene.tsx`**: Ajusta el balance acústico cuando se abre la ficha de la picana eléctrica o se inspeccionan las frases talladas en la pared.

---

## 3. Verificación y Validación

1. **Compilación y Linteo**: Ejecutar `compile_applet` y `lint_applet` para asegurar ausencia total de errores de tipos o sintaxis.
2. **Pruebas de Transición**: Comprobar que el cambio entre escenas (Inicio -> Vestíbulo -> Escaleras -> Sótano -> Mural) conmuta los audios sin interrupciones, saltos o solapamientos disonantes.
3. **Persistencia de Silencio**: Validar que al pulsar el botón de silenciar en el encabezado, ningún sonido suene hasta que el usuario decida reactivarlo voluntariamente.
