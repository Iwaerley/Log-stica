import { randomUUID } from "crypto"

export class DatabaseMemory{
#trechoaereos = new Map()

getById(id) {
    return this.#trechoaereos.get(id);
}

//listando trechoaereos em as  chaves
list(search){
    return Array.from(this.#trechoaereos.entries()).map((trechoaereoArray)  => {
        //Primeira Posição
        const id = trechoaereoArray[0]
        //Segunda Posição
        const data = trechoaereoArray[1]

        return{
            id,
            ...data,
        }
    })
//Retornando apenas resultados da pesquisa
.filter(trechoaereo => {
    if (search) {
        return trechoaereo.País.includes(search)
    }
    return true
})
}

//Estou criando um trechoaereo
create(trechoaereo){
    // Gerando id de trechoaereos aleatorio
    const trechoaereoId = randomUUID()
    this.#trechoaereos.set(trechoaereoId, trechoaereo)
}

//Atualizando o trechoaereo
update(id, trechoaereo){
    this.#trechoaereos.set(id, trechoaereo)
}
//Deletando livro
delete(id, trechoaereo){
    this.#trechoaereos.delete(id, trechoaereo)
}
}
