# Software para gestão de tarefas

O projeto consiste em criar uma aplicação simples de gestão de tarefas.

## Entidades

### 1.Company

- id
- name
- users
- tasks

### 2.User

- id
- name
- password
- image
- email
- role: 'admin' | 'user';

### 3.Task

- id
- name
- taskOwner
- responsibleParties
- deliveryDate

## API Docs

### Rotas de Usuários

#### POST /users

- Cria um novo usuário
- Body Params:
  `{ name, password, image, email, role }`
- todos os campos são obrigatórios.
- todos os campos são strings.
- o campo role só pode ser 'admin' ou 'user'.
- não aceita e-mails repetidos.

_caso algum atributo não seja passado, retorna erro 400, com a response:_

`{ message: 'Missing required fields'}`

_caso o atributo "role" seja diferente de 'admin' ou 'user', retorna erro 422, com a response:_

`{ message: 'Invalid role, must be "admin" or "user"'}`

_obs.: vou adicionar a validação por e-mail repetido depois_

_caso tudo esteja correto, retorna status 201, com a response:_

`{ token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva.EXAMPLE }`

### Rotas de Login

### Rotas de Tarefas

