# Issue #25 — verificación de intake escolar

Implementación: `bbc19a1` en `codex/school-intake-no-autocreate-on24`, con base provisional `0fe03886720df60e319c1be2bec37aabf8529ade` (#24). Este branch no está listo para publicar: tras integrar la ascendencia de #24 en `main`, aislar solo el commit #25 sobre el nuevo `main` y revalidar el diff.

## Escenarios y contrato esperado

| Escenario | Resultado esperado | Evidencia ejecutada |
| --- | --- | --- |
| Alumno nuevo, escuela hallada | Seleccionar una opción real envía `id_escuela`; nunca `escuela` libre. | Harness Node: ID seleccionado serializa únicamente `id_escuela`; serializer común excluye `escuela`. |
| Alumno nuevo, escuela ausente | “Continuar sin escuela” permite seguir; el payload omite ambos campos escolares. | Harness Node verifica payload sin escuela; la validación de registro admite el estado confirmado y el build compila la vista. |
| Perfil existente, escuela previa | Guardar municipio/grado conserva `id_escuela` si no se elige otra opción. | Harness Node verifica conservación; `actualizaEscolares()` resuelve el ID previo. |
| Perfil existente con `escuela.id/value` pero sin `id_escuela` explícito | Guardar la pestaña Personal reconstruye el ID real desde el objeto; un `id_escuela` explícito siempre gana. | Harness Node verifica el fallback, precedencia explícita y que no se adjunte el objeto `escuela`. |
| Perfil sin escuela | Municipio y grado permiten avanzar a Home y guardar sin inventar vínculo escolar. | Inspección de `verificaEscolarFunction()` / `siguientePaso()`; build Quasar exitoso. |
| Búsqueda sin coincidencias | Copy de cero resultados, separado del fallo de red; se permite continuar sin escuela. | Inspección de estados/copy en ambas vistas; build exitoso. |
| Error y reintento de búsqueda | Mensaje de red y botón de reintento; una respuesta vieja no reemplaza los resultados de la consulta actual. | Harness Node verifica secuencia/invalidación; handlers usan `requestSequence`; build exitoso. |

## Comandos y resultados

Desde la raíz del repo FE en el worktree provisional:

```sh
node scripts/verify-school-intake.js
./node_modules/.bin/eslint src/pages/Auth/RegisterLogin.vue src/pages/Profile.vue src/store/auth/actions.js src/store/auth/appendUserUpdateFields.js src/utils/requestSequence.js src/utils/schoolSelection.js scripts/verify-school-intake.js
./node_modules/.bin/quasar build
git diff --check
```

El harness Node, ESLint y `git diff --check` se repitieron después del fix del serializer y terminaron con exit 0. Quasar compiló `dist/spa` dentro del worktree en el commit previo `0d37391`; no se repitió porque el fix solo cambió el serializer/harness y no las vistas. El build emitió avisos de Browserslist/caniuse-lite desactualizado y del chequeo de actualización de Quasar CLI. No se instalaron dependencias.

`package.json` no declara framework de pruebas de componentes/browser; no se ejecutó flujo manual en navegador ni llamada real al backend. La evidencia cubre helpers, serialización, guardas de carrera, lint y compilación. Requiere auditoría independiente `FINAL` antes de declarar la unidad lista para integración.
