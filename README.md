# Bank Transfer Full-Stack

## Descrição do Projeto

Este projeto consiste no desenvolvimento de um serviço Full-Stack para o gerenciamento de
transferências financeiras. O projeto permite o usuário criar e
vizualizar as suas trânsferências bancárias.

O Back-end foi desenvolvido com Node.js e Express e o front-end com Next.js. Toda aplicação,
incluindo o banco de dados PostgreSQL, foi containerizada e executada utilizando Docker para
garantir a facilidade de configuração e consistência no ambiente de desenvolvimento.
---

## Detalhes Técnicos

- **Back-end:** Node.js com Express.
- **Front-end:** Next.js.
- **Banco de Dados:** PostgreSQL.
- **Containerização:** Docker e Docker Compose.

---

## **Pré-requisitos**

Antes de começar, certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

# Como rodar o projeto

## **1. Clone o repositório**

Clone este repositório para sua máquina local:

```bash
git clone git@github.com:Marc-bd/bank-transfer-fullstack.git

```
---
## **2. Instale as dependências do projeto.**

- ### **2.1. Entre no projeto.**
- ```cd bank-transfer-fullstack ```

- ### **2.1. Front-End.**
- Acesse o front-end:
  ``` cd frontend ```
- Instale as dependências:
  ```npm istall ```
- Volte para raiz do projeto: ```cd ..```

- ### **2.1. Back-End.**
- Acesse o back-end:
  ``` cd backend ```
- Instale as dependências:
  ```npm istall ```
- Volte para raiz do projeto: ```cd ..```
---
## **3. Inicie o docker**

- **1**. Na raiz do projeto ```/bank-transfer-fullStack```,
- abra o terminal e execute o seguinte
  comando: ``` docker-compose-up ```

Se você tiver algum problema durante a instalação, verifique se o Docker está em execução
corretamente e se todas as dependências foram instaladas nas pastas correspondentes.
---
# API Endpoints

Esta seção descreve os principais endpoints da API para o serviço de transferências financeiras.

---

## **POST /transfers**

### **Descrição:**
Cria uma nova transferência financeira.

### **Método:**
`POST`

### **Campos Necessários (Request Body):**

```json lines
{
  "amount": "number",     //Valor da transferência (ex: 100.00)
  "expectedOn": "string",  // date format YYYY/MM/DD (ex: 2024/12/28)
  "dueDate":  "string",  // opcional date format YYYY/MM/DD (ex: 2024/12/28)
}
```
### **Resposta Esperada**
```json 
{
  "externalId": "uuid",
  "amount": "number",
  "expectedOn": "date",
  "dueDate": "date | null",
  "status": "boolean",
  "observation": "string",
  "createdAt": "date"
}
```
---

## **GET /transfers**

### **Descrição:**
Busca todas as trânsferências

### **Método:**
`GET`


### **Resposta Esperada**
```json 
[
  {
    "externalId": "uuid",
    "amount": "number",
    "expectedOn": "date",
    "dueDate": "date | null",
    "status": "boolean",
    "observation": "string",
    "createdAt": "date"
  }]
```

## **GET /transfers/{ID}**

### **Descrição:**
Busca todas as informações de uma determinada trânsferência

### **Método:**
`GET`

### **Campos Necessários (Path Param):**

```
id: uuid        
```

### **Resposta Esperada**
```json
  {
    "externalId": "uuid",
    "amount": "number",
    "expectedOn": "date",
    "dueDate": "date | null",
    "status": "boolean",
    "observation": "string",
    "createdAt": "date"
  }
```