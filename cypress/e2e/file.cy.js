// cypress/e2e/file.cy.js
import { faker } from '@faker-js/faker';

const EMAIL = `qa_${Date.now()}@example.com`;
const PASS  = '@Otorrino1';

beforeEach(() => {
  cy.visit('/');
});


//
// =============== HAPPY PATHS (4 historias) ===============
//

/* =================== REQ-Registro (Happy Path) =================== */
describe('REQ-Registro', () => {
  it('usuario nuevo se registra y ve confirmación', () => {
    cy.contains(/sign in/i).click();
    cy.contains(/Register your account/i).click();                    
    cy.get('input[placeholder="First name *"]').type('Ana');
    cy.get('input[placeholder="Your last name *"]').type('Pérez');
    cy.get('input[placeholder="YYYY-MM-DD"]').type('1999-01-15'); // formato exacto
    cy.get('input[placeholder="Your Street *"]').type('Av. Siempre Viva 123');
    cy.get('input[placeholder="Your Postcode *"]').type('4000');
    cy.get('input[placeholder="Your City *"]').type('San Miguel de Tucumán');
    cy.get('input[placeholder="Your State *"]').type('Tucumán');
    cy.get('select').first().select(1); // o .select('Argentina') si aparece en la lista
    cy.get('input[placeholder="Your phone *"]').type('3811234567');
    cy.get('input[placeholder="Your email *"]').type(EMAIL);
    cy.get('input[placeholder="Your password"]').type(PASS, { log: false });
    cy.contains('button', /Register/i).click();
    cy.contains('button', /Register/i).click();

    cy.wait(5000);

    cy.get('input[type="email"], input[placeholder="Your email"]').should('be.visible').clear().type(EMAIL);

    cy.get('input[type="password"], input[placeholder="Your password"]').clear().type(PASS, { log: false });

    cy.focused().type('{enter}');

    cy.contains(/My account/i)
      .should('be.visible');
  });
});

/* =================== REQ-Login (Happy Path) =================== */
describe('REQ-Login', () => {
  it('inicia sesión con credenciales válidas', () => {
    cy.contains(/sign in/i).click(); // abre /auth/login

    cy.get('input[type="email"], input[placeholder="Your email"]')
      .should('be.visible')
      .clear()
      .type('customer@practicesoftwaretesting.com'); // demo

    cy.get('input[type="password"], input[placeholder="Your password"]')
      .clear()
      .type('welcome01', { log: false }); // demo

    cy.focused().type('{enter}');

    cy.contains(/My account/i, { timeout: 10000 }).should('be.visible');
  });
});


/* =================== REQ-Catálogo (Happy Path) =================== */
describe('REQ-Catálogo', () => {
  it('busca un producto y entra al detalle', () => {
    cy.get('input[placeholder="Search"]').type('pliers');

    cy.get('body').then($b => {
      const hasResults = $b.find('a[href^="/product/"]').length > 0;
      if (!hasResults) {
        cy.visit('/category/hand-tools');
      }
    });

    cy.get('a[href^="/product/"]', { timeout: 10000 }).first().click();
    cy.location('pathname').should('match', /\/product\//);
  });
});


/* =================== REQ-Carrito (Happy Path) =================== */
describe('REQ-Carrito', () => {
  it('busca un producto, entra al detalle y lo agrega al carrito', () => {
    cy.get('input[placeholder="Search"]').type('pliers');

    cy.get('body').then($b => {
      const hasResults = $b.find('a[href^="/product/"]').length > 0;
      if (!hasResults) {
        cy.visit('/category/hand-tools');
      }
    });

    cy.get('a[href^="/product/"]', { timeout: 10000 }).first().click();

    cy.contains(/Add to cart/i).click();

    cy.contains(/Product added to shopping cart./i).should('be.visible');

  });
});


//
// =============== NEGATIVOS (2 historias distintas) ===============
//


/* =================== REQ-Login (Negativo) =================== */
describe('REQ-Login (Negativo)', () => {
  it('credenciales inválidas muestran error', () => {
    cy.contains(/sign in/i).click();

    cy.get('input[type="email"], input[placeholder="Your email"]')
      .should('be.visible')
      .clear()
      .type(`fake+${Date.now()}@mail.test`);

    cy.get('input[type="password"], input[placeholder="Your password"]')
      .clear()
      .type('wrong123', { log: false });

    cy.focused().type('{enter}');

    cy.contains(/invalid/i, { timeout: 6000 })
      .should('be.visible');
  });
});

// REQ-Carrito (Negativo) — carrito vacío
describe('REQ-Carrito (Negativo) — vacío', () => {
  it('no muestra botón de checkout sin ítems', () => {
    cy.clearCookies(); cy.clearLocalStorage();
    cy.visit('/cart');
    // El botón de checkout no debería estar disponible
    cy.contains(/checkout|pagar|finalizar compra|proceed/i).should('not.exist');
  });
});
