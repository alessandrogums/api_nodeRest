class Tabelas{
    init (conexao){
        this.conexao=conexao
        this.CriarAtendimentos()
    }
    CriarAtendimentos() {
        
        const sql='CREATE TABLE  IF NOT EXISTS tendimentos (id int NOT NULL AUTO_INCREMENT,cliente varchar(50) NOT NULL,pet varchar(20),servico varchar(20) NOT NULL, data datetime NOT NULL, datadecriacao datetime NOT NULL, status varchar(20) NOT NULL,observacoes text,PRIMARY KEY(id))'

        this.conexao.query(sql,(erro)=>{
            if (erro){
                console.log(erro)
            }else{
                console.log('Tabela atendimentos criada com sucesso!')
            }
        })
    }


}   

module.exports=new Tabelas