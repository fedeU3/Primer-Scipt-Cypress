# Primer Script de Cypress — Trabajo Práctico 5

Suite de pruebas end-to-end (E2E) automatizadas con Cypress sobre el sitio de práctica [practicesoftwaretesting.com](https://practicesoftwaretesting.com). Cubre los flujos principales de una tienda online: registro, login, catálogo y carrito, tanto en escenarios positivos como negativos.

---

## Características

- Prueba de registro de usuario nuevo con datos dinámicos generados con Faker.js
- Prueba de inicio de sesión con credenciales válidas (happy path)
- Prueba de búsqueda de producto y navegación al detalle
- Prueba de agregar un producto al carrito
- Prueba negativa: credenciales inválidas muestran mensaje de error
- Prueba negativa: carrito vacío no muestra botón de checkout
- Generación de email único por ejecución usando `Date.now()` para evitar colisiones

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| [Cypress](https://www.cypress.io/) | ^15.6.0 | Framework de testing E2E |
| [@faker-js/faker](https://fakerjs.dev/) | ^9.9.0 | Generación de datos de prueba aleatorios |
| Node.js | LTS recomendado | Entorno de ejecución |
| JavaScript (ES2015+) | — | Lenguaje de los tests |

---

## Estructura del proyecto

```
Primer-Scipt-Cypress/
├── cypress/
│   ├── e2e/
│   │   └── file.cy.js          # Archivo principal con todos los tests E2E
│   ├── fixtures/
│   │   └── example.json        # Fixture de ejemplo (datos mock estáticos)
│   └── support/
│       ├── commands.js         # Comandos personalizados de Cypress
│       └── e2e.js              # Configuración global cargada antes de cada test
├── cypress.config.js           # Configuración principal de Cypress
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Este archivo
```

---

## Instalación

**Requisitos previos:** tener instalado [Node.js](https://nodejs.org/) (versión LTS recomendada).

```bash
# 1. Clonar el repositorio
git clone https://github.com/federicohuespe/Primer-Scipt-Cypress.git
cd Primer-Scipt-Cypress

# 2. Instalar dependencias
npm install
```

---

## Configuración

El proyecto apunta a un sitio de práctica público, por lo que no requiere variables de entorno.

Las opciones de configuración se encuentran en `cypress.config.js`:

| Parámetro | Valor | Descripción |
|---|---|---|
| `baseUrl` | `https://practicesoftwaretesting.com` | URL base del sitio bajo prueba |
| `viewportWidth` | `1280` | Ancho de la ventana del navegador |
| `viewportHeight` | `800` | Alto de la ventana del navegador |

---

## Uso

### Abrir Cypress en modo interactivo (con UI)

```bash
npx cypress open
```

Abre el Cypress Test Runner, donde se puede seleccionar y correr cada test de forma visual.

### Ejecutar todos los tests en modo headless (sin UI)

```bash
npx cypress run
```

Corre todos los tests en segundo plano y genera un reporte en la terminal.

### Ejecutar un archivo de tests específico

```bash
npx cypress run --spec "cypress/e2e/file.cy.js"
```

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `npm test` | `echo "Error: no test specified" && exit 1` | Placeholder por defecto (no configurado) |

> Para correr los tests de Cypress, usar directamente `npx cypress open` o `npx cypress run`.

---

## Tests incluidos

### Happy Paths

| Suite | Descripción |
|---|---|
| `REQ-Registro` | Usuario nuevo completa el formulario de registro y luego inicia sesión correctamente |
| `REQ-Login` | Inicio de sesión exitoso con las credenciales de demo del sitio |
| `REQ-Catálogo` | Búsqueda de un producto ("pliers") y navegación al detalle del mismo |
| `REQ-Carrito` | Búsqueda de producto, entrada al detalle y agregado al carrito |

### Casos Negativos

| Suite | Descripción |
|---|---|
| `REQ-Login (Negativo)` | Credenciales incorrectas muestran mensaje de error |
| `REQ-Carrito (Negativo)` | Carrito vacío no presenta el botón de checkout |

---

## Autor

**Federico Huespe**
- GitHub: [federicohuespe](https://github.com/federicohuespe)
- Email: federicohue@gmail.com
