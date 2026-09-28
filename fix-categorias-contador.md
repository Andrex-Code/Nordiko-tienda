# Fix: Contador de categorías del admin mostraba 0

## Problema reportado
> "En admin categorías sale en 0 pero aparecen varias en la página principal"

## Diagnóstico

### Causa raíz
En `admin.js`, la función `cargarDatos()` cargaba la configuración desde
`localStorage` (`nordiko_config`) con un merge superficial:

```js
config = { ...config, ...JSON.parse(configGuardada) };
```

Si la configuración guardada contenía `categorias` con un valor que **no es un
array** (por ejemplo `null`, un string o un objeto — restos de versiones
anteriores del admin o datos corruptos), el merge lo copiaba tal cual. Después:

- `renderCategorias()` hacía `config.categorias || []` → `length` = **0** →
  el badge `#categoriaCount` del sidebar mostraba **0** y la lista salía vacía.
- En el peor caso (`categorias: "hidratante"`), el admin **ni siquiera cargaba**:
  `(config.categorias || []).find is not a function`.

### Por qué la tienda sí mostraba categorías
En `index.html` los filtros de categoría son **estáticos** (Hidratantes,
Corporales, Facial, Antiedad). El código de la tienda solo los reemplaza por
los de `nordiko_config` si `config.categorias` es un array válido
(`config.categorias && Array.isArray(config.categorias)`). Con `categorias: null`
no se cumplía la condición, así que la tienda dejaba los filtros estáticos
visibles — de ahí la aparente contradicción: admin en 0, tienda con categorías.

## Corrección aplicada

**Archivo:** `admin.js` — función `cargarDatos()` (tras el merge de configuración)

```js
// Validar categorías: si la config guardada no contiene un array válido
// (null, string, objeto, etc. por datos corruptos o versiones anteriores),
// restaurar las categorías por defecto y reparar localStorage.
if (!Array.isArray(config.categorias)) {
  config.categorias = [
    { id: 'hidratante', nombre: 'Hidratante', activa: true },
    { id: 'corporal', nombre: 'Corporal', activa: true },
    { id: 'facial', nombre: 'Facial', activa: true },
    { id: 'ante-envejecimiento', nombre: 'Antiedad', activa: true }
  ];
  guardarConfig();
}
```

Comportamiento:
- `categorias` inválido (null, string, número, objeto) → se restauran las 4
  categorías por defecto **y se repara `nordiko_config` en localStorage**.
- `categorias` es un array válido → se respeta (incluido un `[]` legítimo,
  p. ej. si el usuario eliminó todas a propósito: el contador 0 es correcto).

## Verificación

Se ejecutó el **código real de `admin.js`** en Node.js con mock de DOM +
localStorage (7 escenarios, aserciones automatizadas). Resultados:

| Escenario | Antes del fix | Después del fix |
|---|---|---|
| localStorage limpio | contador 4 ✓ | contador 4 ✓ |
| `nordiko_config` sin clave `categorias` | contador 4 ✓ | contador 4 ✓ |
| `categorias: null` | **contador 0 (bug)** | contador 4, localStorage reparado ✓ |
| `categorias: "hidratante"` | **el admin crasheaba** | contador 4, carga correcta ✓ |
| config válida con 2 categorías | contador 2 ✓ | contador 2 ✓ |
| 2 categorías (1 inactiva) | contador 2 ✓ | contador 2 ✓ (preview solo muestra la activa) |
| CRUD crear → editar → eliminar | 5 → 5 → 4 ✓ | 5 → 5 → 4 ✓ |

**Estado final: TODAS las comprobaciones pasan.**

El contador ahora siempre muestra el número correcto de categorías, la lista
del admin las renderiza, y crear/editar/eliminar categorías sigue funcionando
y actualizando el badge en vivo.
