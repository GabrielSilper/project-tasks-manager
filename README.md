# Software para gestão de tarefas

O projeto consiste em criar uma aplicação simples de gestão de tarefas.

## Entidades

### 1.Company

- id - string
- name - string

### 2.User

- id - string
- image - string
- name - string
- email - string
- password - string
- role - string - "Admin" | "User"
- company - string - Company.id

### 3.Task

- id - string
- name - string
- creator - string - User.id
- responsibleParties - User[]
- deliveryDate - Date
- company - string - Company.id
