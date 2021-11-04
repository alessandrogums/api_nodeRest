const { response } = require('express')
const atendimentos = require('../models/atendimentos')
const Atendimento=require('../models/atendimentos')

module.exports=app=> { 
    app.get('/atendimentos',(require,response)=>{Atendimento.listar(response)})
    
    app.get('/atendimentos/:id',(require,response)=>{
        const id=parseInt(require.params.id)
        Atendimento.buscarPorId(id,response)
        
      

    })
    app.post('/atendimentos',(require,response)=>{
    const atendimento= require.body
    Atendimento.adicionar(atendimento,response)
    // response.send('você está na rota de atendimentos via POST')
    
    })
    app.patch('/atendimentos/:id',(require,response)=>{
        const id=parseInt(require.params.id)
        const valores=require.body
        Atendimento.alterar(id,valores,response)
    })
    app.delete('/atendimentos/:id',(require,response)=>{
        const id=parseInt(require.params.id)
        Atendimento.deletar(id,response)
    })
}

