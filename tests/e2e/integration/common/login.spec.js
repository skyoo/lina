describe('首次打开JumpServer', () => {
  before(() => {
    cy.visit('/')
    cy.clearCookies()
    cy.reload()
    cy.wait(2000)
  })
  it('访问默认页面, 跳转到登录页面', () => {
    cy.url().should('include', '/core/auth/login/')
  })
  it('输入错误的账号密码,无法登陆', () => {
    cy.get('input[name=username]').clear().type('Orange')
    cy.get('input[name=password]').clear().type('password')
    cy.get('#id_captcha_1').clear().type('PASSED')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/core/auth/login/')
  })
  it('输入正确的账号密码', () => {
    cy.get('input[name=username]').clear().type('admin')
    cy.get('input[name=password]').clear().type('Admin!')
    cy.get('#id_captcha_1').clear().type('PASSED')
    cy.get('button[type=submit]').click()
    cy.wait(5000)
    cy.url().should('include', '/ui/#/dashboard')
  })
  it('刷新后还在dashboard', () => {
    cy.reload()
    cy.wait(5000)
    cy.url().should('include', '/ui/#/dashboard')
  })
  it('退出登录', () => {
    cy.get('.header-tools > .el-dropdown').click()
    cy.get('.el-dropdown-menu__item--divided').click()
    cy.wait(5000)
    cy.url().should('include', '/core/auth/login/')
  })
})
