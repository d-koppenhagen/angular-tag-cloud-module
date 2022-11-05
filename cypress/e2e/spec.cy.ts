describe('AngularTagCloudModule', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#staticDataBtn').click();
  });

  it('retreives static example data', () => {
    cy.get('angular-tag-cloud').contains('example-1');
    cy.get('angular-tag-cloud').contains('example-2');
    cy.get('angular-tag-cloud').contains('example-3');
    cy.get('angular-tag-cloud').contains('example-4');
    cy.get('angular-tag-cloud').contains('example-5');
    cy.get('angular-tag-cloud').contains('example-6');
    cy.get('angular-tag-cloud').contains('example-7');
    cy.get('angular-tag-cloud').contains('example-8');
    cy.get('angular-tag-cloud').contains('example-9');
    cy.get('angular-tag-cloud').contains('example-10');
  });

  it('find elements with tooltip class', () => {
    cy.get('angular-tag-cloud')
      .find('span.tooltip')
      .should((el) => {
        expect(el).to.have.length(4);
        expect(el).to.contain('tooltip-');
      });
  });

  it('modify colors when property has been set', () => {
    cy.get('angular-tag-cloud')
      .find('span.w1')
      .should((el) => {
        expect(el).to.have.css('color', 'rgb(187, 187, 187)'); // equals #bbbbbb
      });
    cy.get('angular-tag-cloud')
      .find('span.w4')
      .should((el) => {
        expect(el).to.have.css('color', 'rgb(255, 0, 0)'); // equals red
      });
    cy.get('angular-tag-cloud')
      .find('span.w5')
      .should((el) => {
        expect(el).to.have.css('color', 'rgb(110, 63, 131)'); // equals #6e3f83
      });
    cy.get('angular-tag-cloud')
      .find('span.w6')
      .should((el) => {
        expect(el).to.have.css('color', 'rgb(187, 187, 187)'); // equals #bbbbbb
      });
  });

  it('zoom an elements on hover', () => {
    cy.get('angular-tag-cloud>span').each((el) => {
      expect(el.trigger('mouseover'))
        .css('transform')
        .match(/matrix/);
      if (!el.children('a')) {
        expect(el.trigger('mouseover')).css('color', 'rgb(170, 170, 170)');
      }
      expect(el.trigger('mouseout')).not.css('color', 'rgb(170, 170, 170)');
    });
  });
});
