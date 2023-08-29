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
- isDone

## API Docs

#### GET /live

- Verifica se o servidor está online
- Response: `{ message: 'Manager tasks is live...' }`

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

#### GET /users

- Retorna todos os usuários
- é necessário um token válido para acessar a rota

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso o token seja válido, retorna status 200, com a response:_

`{ users: [ { id, name } ] }`

### Rotas de Login

#### POST /login

- Faz login de um usuário
- Body Params:
  `{ email, password, role }`
- todos os campos são obrigatórios.
- todos os campos são strings.
- o campo role só pode ser 'admin' ou 'user'.

_caso algum atributo não seja passado, retorna erro 400, com a response:_

`{ message: 'Missing required fields'}`

_caso o atributo "role" seja diferente de 'admin' ou 'user', retorna erro 422, com a response:_

`{ message: 'Invalid role, must be "admin" or "user"'}`

_caso o login falhe por e-mail, senha e role, retorna erro 401, com a response:_

`{ message: 'Yours credentials are not valid. Verify your email, role and password, and try again'}`

_caso tudo esteja correto, retorna status 200, com a response:_

`{ token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N.EXAMPLE }`

### Rotas de Tarefas

#### POST /tasks

- Cria uma nova tarefa
- Body Params:
  `{ name, responsibleParties, deliveryDate }`
- todos os campos são obrigatórios.
- tipo de cada campo:
  - name: string
  - responsibleParties: array de ObjectId referencia a entidade User
    - é necessário passar pelo menos um id de usuário
  - deliveryDate: string no formato 'YYYY-MM-DD'
- é necessário um token válido para acessar a rota

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso algum atributo não seja passado, retorna erro 400, com a response:_

`{ message: 'Missing required fields'}`

_o atributo responsibleParties deve ter pelo menos um id de usuário, caso contrário retorna erro 422, com a response:_

`{ message: 'Must have at least one responsible party'}`

#### GET /tasks

- Retorna todas as tarefas
- é necessário um token válido para acessar a rota
- o token enviado vai conter sua permissão de acesso, se for 'admin' retorna todas as tarefas, se for 'user' retorna apenas as tarefas que você é criador ou responsável

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso o token seja válido e com sua permissão, retorna status 200, com a response:_

`{ tasks: [ { id, name, taskOwner, responsibleParties, deliveryDate, isDone } ] }`

#### PATCH /tasks/:id/finish

- Finaliza uma tarefa
- é necessário um token válido para acessar a rota
- o token enviado vai conter sua permissão de acesso, se for 'admin' pode finalizar qualquer tarefa, se for 'user' só pode finalizar as tarefas que você criou ou é responsável

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso você nao tenha permissão para finalizar a tarefa, retorna erro 401, com a response:_

`{ message: 'You are not allowed to manager this task'}`

_caso o token seja válido e com sua permissão, retorna status 200, com a response:_

`{ message: 'Task with id ####### is Done' }`

#### PUT /tasks/:id

- Atualiza uma tarefa
- é necessário um token válido para acessar a rota
- o token enviado vai conter sua permissão de acesso, se for 'admin' pode atualizar qualquer tarefa, se for 'user' só pode atualizar as tarefas que você criou ou é responsável
- Body Params:
  `{ name, responsibleParties, deliveryDate }`
- tipo de cada campo:
  - name: string
  - responsibleParties: array de ObjectId referencia a entidade User
    - é necessário passar pelo menos um id de usuário
  - deliveryDate: string no formato 'YYYY-MM-DD'
- todos os campos são opcionais

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso você nao tenha permissão para finalizar a tarefa, retorna erro 401, com a response:_

`{ message: 'You are not allowed to manager this task'}`

_caso o token seja válido e com sua permissão, retorna status 200, com a response:_

`{ id, name, taskOwner, responsibleParties, deliveryDate, isDone }`

#### DELETE /tasks/:id

- Deleta uma tarefa
- é necessário um token válido para acessar a rota
- o token enviado vai conter sua permissão de acesso, se for 'admin' pode deletar qualquer tarefa, se for 'user' só pode deletar as tarefas que você criou ou é responsável

_caso o token não seja enviado, retorna erro 401, com a response:_

`{ message: 'Token not found'}`

_caso o token seja inválido, retorna erro 401, com a response:_

`{ message: 'Token must be a valid token'}`

_caso você nao tenha permissão para finalizar a tarefa, retorna erro 401, com a response:_

`{ message: 'You are not allowed to manager this task'}`

_caso o token seja válido e com sua permissão, retorna status 204, sem response_
