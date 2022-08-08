class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    adicionar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.add(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        this.listTable();
        this.cancelar();
    }

    listTable() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valorProduto;

            td_id.classList.add('center')
            td_acoes.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'IMG/editar.png'
            imgEdit.setAttribute("onclick", "produto.prepEdit(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'IMG/trash.png'
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    add(produto) {
        produto.valorProduto = parseFloat(produto.valorProduto)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
        }
    }

    prepEdit(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valorProduto;

        document.getElementById('btn1').innerText = 'ATUALIZAR'
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valorProduto = document.getElementById('valor').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += 'Informe o Nome do Produto \n'
        }

        if (produto.valorProduto == '') {
            msg += 'Informe o valor do Produto \n'
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        produto.nomeProduto = document.getElementById('produto').value = '';
        produto.nomeProduto = document.getElementById('valor').value = '';

        document.getElementById('btn1').innerText = 'ADICIONAR';
        this.editId = null;
    }


    deletar(id) {

        if (confirm('deseja mesmo apagar o produto de ID ' + id + '?')) {
            let tbody = document.getElementById('tbody')

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

var produto = new Produto();