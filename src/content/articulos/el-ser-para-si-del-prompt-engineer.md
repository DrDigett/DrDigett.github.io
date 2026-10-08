---
title: "El ser para sí del Prompt Engineer"
date: "05-10-2026"
image: "https://i.imgur.com/IBgVZCc.jpeg"
description: "Figura 0.0. Fotograma extraído de la película Häxan (1922)."
---

## 1. El LLM en sí

Los grandes modelos de lenguaje (LLM) basados en Transformers (la arquitectura de básicamente todos los sistemas a los que nos referimos cuando decimos IA en la actualidad), exhiben su característica más resaltante llamado aprendizaje en contexto (*In-Context Learning*) o ICL para abreviar, cuando las predicciones que ellos realizan (recordemos que ellos predicen el token siguiente a partir de unos pocos pares de entrada) se van adaptando según la entrada-etiqueta que les hemos entregado.

> **Ejemplo:** Cuando le decimos: *«Quiero que me digas nombres latinoamericanos que empiecen con D: Diego, Daniel, David...»*, el LLM nos responderá: *«Dante, Damián, Darío, Deyanira»*.

Gracias al ICL, un modelo de IA no está simplemente copiando y pegando lo que le hemos enviado dentro del contexto, sino esta «adivinando» la próxima palabra (Dong et al., 2022).
Esta caracterista desencadena en uno de los cuatro patrones de *prompting*: el *few-shot* que nos hace recordar bastante a cómo aprende el ser humano utilizando analogías.

Aquella caracteristica tan importante de la IA, la termina explotando tanto internamente que hasta genera dentro de sí vectores por «temáticas de tareas» para agilizar y resolver de manera más precisa algún trabajo. <br>
Imaginémoslo como una llave. si la IA detecta que tiene que «traducir de español a inglés», saca la llave de traducción y la usa para responder.

Esta capacidad de inferencia de tareas se reconoce como una forma de metaaprendizaje que, curiosamente, nadie la programó o configuró en el «circuito». Incluso no se sabía cómo funcionaba hasta recién en mayo del año pasado gracias al artículo *«Beyond Induction Heads: In-Context Meta Learning Induces Multi-Phase Circuit Emergence»* (Minegishi et al., 2025).

**¿Cómo se desarrolla el ICL?** Nace en el preentrenamiento del modelo gracias a la manera en cómo se organizan los datos con los que se instruye. Especialmente con una organización variada, donde no importa el tamaño del dato con el que estamos entrenando, sino la variedad de datos y fuentes con los que se entrena.
Ahora bien, ya sabemos que el ICL nace en el preentrenamiento. Pero la pregunta clave es: cuando ya tenemos el modelo entrenado y le entregamos un *prompt*, ¿qué pasa ahí adentro? ¿Cómo hace el modelo para «entender» lo que le pedimos?

La respuesta corta es que el modelo no comprende el significado de las palabras y simplemente ejecuta algoritmos estadísticos. El motor detrás de esta aparente capacidad de aprendizaje es un mecanismo llamado circuito de inducción (*induction head*). Este circuito actúa como un sistema de copia y pega biestacional donde dos cabezas de atención, ubicadas en diferentes capas del transformador (las que se encargan de procesar texto), trabajan en equipo para resolver un problema: completar el patrón `[A][B] ... [A] → [B]`. Esto lo realizan dos cabezas trabajando juntas: una mira el token anterior; la otra busca dónde apareció ese token antes en el contexto y copia lo que le siguió.

> **Ejemplo:** *«El joven [Henry] [Spencer] entró a su departamento... Al ver dentro de los cajones, [Henry]...»*. La primera cabeza ya ha asociado internamente que antes de `[Spencer]` venía `[Henry]`. Al llegar al segundo `[Henry]`, la cabeza de inducción busca hacia atrás, detecta el primer bloque y concluye matemáticamente que la siguiente palabra debe ser `[Spencer]` (Olsson et al., 2022).

Si el ICL depende enteramente de que el modelo detecte patrones en el contexto que le hemos dado, cualquier ruido o ambigüedad en el *prompt* puede hacer que las *induction heads* hagan un patrón errado. He aquí la importancia del *prompt engineering* (Sclar et al., 2023).

---

## 2. Hacerse para sí

La estructuración de un *prompt* a nivel de producción no debe abordarse como una redacion en prosa libre, lo correcto seria que sea equivalente al planeamiento delicado de la arquitectura de un software bien estructurado. La convergencia entre la literatura científica y las directrices técnicas de OpenAI para su API y ChatGPT establece un conjunto de principios arquitectónicos para garantizar la reproducibilidad y veracidad de las respuestas.

### I. Delimitación de roles

El primer pilar reside en la delimitación de roles y la instrucción principal. En entornos modernos de interacción, el mensaje del sistema (*system prompt*) asume el control ontológico: define las tareas operativas, el marco conceptual, el tono y las reglas.

> Ubicar las instrucciones imperativas al inicio del *prompt* asegura que reciban una alta atención durante el procesamiento de la secuencia, fijando los límites funcionales del asistente.

### II. Delimitadores

Para evitar la colisión semántica entre las órdenes del desarrollador y el texto no confiable provisto dinámicamente por usuarios o fuentes externas, es indispensable encapsular las variables de entrada con separadores unívocos como comillas triples (`"""`), almohadillas (`###`) o etiquetas de tipo XML (`<context> ... </context>`).

> Estos marcadores orienta la atención del transformador y minimiza las interpretaciones erróneas de los límites de la tarea.

### III. Especificidad de restricciones

Siguiendo las directrices de diseño de OpenAI, las instrucciones deben redactarse indicando con precisión la acción a ejecutar, evitando consignas puramente restrictivas que especifiquen qué omitir. Las negativas introducen los términos vedados dentro del flujo.

> **Por ejemplo,** exigir límites basados en recuentos de párrafos o palabras es mucho mejor que calificativos vagos como «breve» o «conciso» (Teki, 2023).

### IV. Modularización y descomposición

Finalmente, las tareas de alta carga analítica o que involucran operaciones aritméticas complejas no deben forzarse a resolución directa en una única llamada, sino que deben modularizarse y descomponerse en subflujos (*prompt chaining*) o apoyarse en herramientas externas (*tool calling*, ejecución de código o RAG) para garantizar la exactitud de los resultados.

---

## Referencias

- **Dong, Q., Li, L., Dai, D., Zheng, C., Ma, J., Li, R., Xia, H., Xu, J., Wu, Z., Liu, T., Chang, B., Sun, X., Li, L., & Sui, Z.** (2022). *A Survey on In-context Learning*. arXiv:2301.00234 [cs.CL]. https://arxiv.org/abs/2301.00234
- **Minegishi, G., Furuta, H., Taniguchi, S., Iwasawa, Y., & Matsuo, Y.** (2025). *Beyond Induction Heads: In-Context Meta Learning Induces Multi-Phase Circuit Emergence*. arXiv:2505.16694 [cs.CL]. https://arxiv.org/abs/2505.16694
- **Olsson, C., Elhage, N., Nanda, N., Joseph, N., DasSarma, N., Henighan, T., Mann, B., Askell, A., Bai, Y., Chen, A., Conerly, T., Drain, D., Ganguli, D., Hatfield-Dodds, Z., Hernandez, D., Johnston, S., Jones, A., Kernion, J., Lovitt, L., Ndousse, K., Amodei, D., Brown, T., Clark, J., Kaplan, J., & McCandlish, S.** (2022). *In-context Learning and Induction Heads*. arXiv:2209.11895 [cs.LG]. https://arxiv.org/abs/2209.11895
- **Sclar, M., Choi, Y., Tsvetkov, Y., & Suhr, A.** (2023). *Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design or: How I learned to start worrying about prompt formatting*. International Conference on Learning Representations (ICLR 2024). arXiv:2310.11324 [cs.CL]. https://arxiv.org/abs/2310.11324
- **Teki, S.** (2023). *The Definitive Guide to Prompt Engineering: From Principles to Production*. SundeepTeki.org. https://www.sundeepteki.org/advice/the-definitive-guide-to-prompt-engineering-from-principles-to-production