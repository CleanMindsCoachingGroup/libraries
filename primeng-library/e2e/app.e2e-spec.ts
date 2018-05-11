import { AppPage } from './app.po';
import { element, by } from 'protractor';

describe('clean-minds-primeng-library App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to The Clean Minds PrimeNg Library Demo!');
  });

  it('should work the library component', () => {
    expect(element(by.css('h2')).getText()).toEqual('The Clean Minds PrimeNg Library component works!');
  });

  it('should work the library service', () => {
    expect(element(by.css('h3')).getText()).toEqual('The Clean Minds PrimeNg Library service works!');
  });
});
