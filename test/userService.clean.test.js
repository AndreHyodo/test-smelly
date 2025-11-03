const { UserService } = require('../src/userService');

describe('UserService - Suíte de Testes Limpa', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB(); // Limpa o "banco" para cada teste
  });

  // =================== TESTES DE CRIAÇÃO E BUSCA ===================

  test('deve criar um usuário com ID e status "ativo"', () => {
    const nome = 'Fulano de Tal';
    const email = 'fulano@teste.com';
    const idade = 25;

    const usuarioCriado = userService.createUser(nome, email, idade);

    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(nome);
    expect(usuarioCriado.email).toBe(email);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve buscar um usuário pelo ID corretamente', () => {
    const usuarioCriado = userService.createUser('Carlos', 'carlos@email.com', 30);

    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    expect(usuarioBuscado).not.toBeNull();
    expect(usuarioBuscado.id).toBe(usuarioCriado.id);
    expect(usuarioBuscado.nome).toBe('Carlos');
  });

  // =================== TESTES DE DESATIVAÇÃO ===================

  test('deve desativar um usuário comum com sucesso', () => {
    const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30);

    const resultado = userService.deactivateUser(usuarioComum.id);

    expect(resultado).toBe(true);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('não deve desativar um usuário administrador', () => {
    const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

    const resultado = userService.deactivateUser(usuarioAdmin.id);

    expect(resultado).toBe(false);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);
    expect(usuarioAtualizado.status).toBe('ativo'); // Status deve permanecer 'ativo'
  });

  // =================== TESTES DE RELATÓRIO ===================

  test('deve gerar um relatório contendo informações dos usuários', () => {
    const usuario1 = userService.createUser('Alice', 'alice@email.com', 28);
    const usuario2 = userService.createUser('Bob', 'bob@email.com', 32);

    const relatorio = userService.generateUserReport();

    expect(relatorio).toContain('--- Relatório de Usuários ---');
    expect(relatorio).toContain(usuario1.id.toString());
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain(usuario2.id.toString());
    expect(relatorio).toContain('Bob');
  });

  // =================== TESTES DE EXCEÇÃO ===================

  test('deve lançar um erro ao tentar criar usuário menor de idade', () => {
    const nome = 'Menor de Idade';
    const email = 'menor@email.com';
    const idade = 17;

    expect(() => {
      userService.createUser(nome, email, idade);
    }).toThrow('O usuário deve ser maior de idade.');
  });

  // =================== TESTE IMPLEMENTADO ===================

  test('deve retornar o cabeçalho e uma mensagem quando não há usuários', () => {
    
    const relatorio = userService.generateUserReport();
    
    expect(relatorio).toBe('--- Relatório de Usuários ---\nNenhum usuário cadastrado.');
  });
});