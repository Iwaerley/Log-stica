//Criando o servidor usando o fastify
import  { fastify } from 'fastify'

import { DatabaseMemory } from './database-memory.js'

//Criando o database
const database = new DatabaseMemory()

//Criando o servidor 
const trechoaereo = fastify()

/*trechoaereo.post('/trechoaereo', (request, reply) => {
    const body = request.body
    console.log(body)
})*/

trechoaereo.get('/', () => {
    return 'Olá Mundo'
})

trechoaereo.post('/trechoaereos', (request, reply) => {
    //Acessando dados do corpo(desestrurados)
    const {País, Cidade, tempodevoou } = request.body
    database.create({
        País: País,
        Cidade: Cidade,
        tempodevoou: tempodevoou,
    })
    //Listando o trechoaereo
    console.log(database.list())
    //Retornando o status da rota
    return reply.status(201).send()
})


trechoaereo.get('/trechoaereos',(request) => {
    //Pegando o busca
    const search = request.query.search
    //Imprimindo a busca
    console.log(search)
    //Acessando o database
    const trechoaereos = database.list(search)
    
    return trechoaereos
})

trechoaereo.put('/trechoaereos/:id',(request, reply) => {
    //Passando o ID do trechoaereo
    const trechoaereoId = request.params.id
    //Passando restante dos atibutos
    const{País, Cidade, tempodevoou} = request.body

    const trechoaereo = database.update(trechoaereoId, {
        País: País,
        Cidade: Cidade,
        tempodevoou: tempodevoou,

    })
    //Sucesso sem conteudo
    return reply.status(204).send()
    //return 'atualizar'
})

trechoaereo.patch('/trechoaereos/:id',(request, reply) => {
    //Passando o ID do trechoaereo
    const trechoaereoId = request.params.id
    //Passando restante dos atibutos
    const{País, Cidade, tempodevoou} = request.body

    const trechoaereo = database.update(trechoaereoId, {
        País: País,
        Cidade: Cidade,
        tempodevoou: tempodevoou,

    })
    //Sucesso sem conteudo
    return reply.status(204).send()
    //return 'atualizar'
})

trechoaereo.delete('/trechoaereos/:id',(request, reply) => {
    //Passando o ID do trechoaereo
    const trechoaereoId = request.params.id
    //Deletando o trechoaereo
    database.delete(trechoaereoId)
    //Retornando status de sucesso em branco
    return reply.status(204).send()
})

//Passando a porta com objecto
trechoaereo.listen({
    port:3333,
})

