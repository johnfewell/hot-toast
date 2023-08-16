/// <reference types="cypress" />
import { HOT_TOAST_DEFAULT_TIMEOUTS } from '../../projects/ngneat/hot-toast/src/lib/constants';

describe('Test toasts with callback - component', () => {
  it('should show and hide component toast', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });

    cy.get('#callback').click();
    cy.get('hot-toast').as('componentToast');
    cy.get('@componentToast').should('contain', 'Something went wrong');
    cy.get('@componentToast').find('.hot-toast-action-btn').as('actionButton').should('exist');

    cy.get('@actionButton').should('contain', 'Retry');
    cy.get('@actionButton').should('have.attr', 'aria-label', 'Retry the request');
    cy.get('@actionButton').click();

    cy.get('@consoleLog').should('be.calledWith', 'callback clicked');

    cy.wait(HOT_TOAST_DEFAULT_TIMEOUTS.blank);
    cy.get('hot-toast').should('not.exist');
  });
});
