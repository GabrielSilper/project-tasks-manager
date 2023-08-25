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
