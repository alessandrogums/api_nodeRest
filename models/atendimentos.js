const { response } = require('express')
const moment=require('moment')
const conexao=require('../infraestrutura/conexao')

class Atendimentos{
    adicionar(atendimento,response) {
        const datadecriacao=moment().format('YYYY-MM-DD HH:MM:SS')
        const data=moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        

        const data_e_valida=moment(data).isSameOrAfter(datadecriacao)
        const cliente_e_valido=atendimento.cliente.length >=5

        const validacoes=[
            {
                nome:'data',
                valido:data_e_valida,
                mensagem:'data deve ser igual ou maior do que a atual'
            },
            {
                nome:'cliente',
                valido:cliente_e_valido,
                mensagem:'cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros= validacoes.filter(campo=> !campo.valido)
        const tem_erros=erros.length 
        if (tem_erros){
            response.status(400).json(erros)
        }else{
            const atendimentodata={...atendimento,datadecriacao,data}
            const sql= 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql,atendimentodata,(erro,resultados) =>{
                if (erro){
                    response.status(400).json(erro)
                }else{
                    response.status(201).json(atendimento)
                }
            })
        }
    }
    listar(response){
        const sql='SELECT *FROM Atendimentos'
        conexao.query(sql,(erro,resultados)=>{
            if(erro){
                response.status(400).json(erro)
            }else{
                response.status(200).json(resultados)
            }
        })
    }
    buscarPorId(id,response){
        const sql=`SELECT * FROM Atendimentos WHERE id=${id}`
        conexao.query(sql,(erro,resultados)=>{
            if(erro){
                response.status(400).json(erro)
            }else{
                response.status(200).json(resultados[0])
            }
        })
    }
    alterar(id,valores,response){
        if (valores.data){
            valores.data=moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql='UPDATE Atendimentos SET ? WHERE id=?'
        conexao.query(sql, [valores,id], (erro,resultados)=>{
            if(erro){
                response.status(400).json(erro)
            }else{
                response.status(200).json({...valores,id})
            }
        })

    }
    deletar(id,response){
        const sql='DELETE FROM Atendimentos WHERE id=?'
        conexao.query(sql,id, (erro,resultados)=>{
            if(erro){
                response.status(400).json(erro)
            }else{
                response.status(200).json({id})
            }
        })
    }
}

module.exports=new Atendimentos