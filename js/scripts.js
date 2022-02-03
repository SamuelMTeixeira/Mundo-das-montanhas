
// ALTERA A VERSÃO DO SOFTWARE
function setDefinirVersao() {
    const nVersao = "Versão 2.1.0.0";
    document.getElementById("versao-software").textContent = nVersao;
}

setDefinirVersao();

// FECHA O MODAL
function setFecharModal() {
    modal = document.getElementById("modal");

    headerPg = document.querySelector("header");
    mainPg = document.querySelector("main");
    footerPg = document.querySelector("footer");

    headerPg.style.display = "inline";
    mainPg.style.display = "inline";
    footerPg.style.display = "block";
    modal.style.display = "none";
    let oi = "";
    document.location.href = "#all-comentarios";
}

// TRANSFORMA O NUMERO EM UM VALOR COM 2 DIGITOS
function getValue2Digitos(valor) {
    if (parseInt(valor) < 10)
        return `0${valor}`;

    else
        return valor;
}

let numeroComentario = 1;

// ADICIONA O COMENTARIO
function setNewComentario() {
    let campoComentarios = document.getElementById("all-comentarios");

    // HORA DO POST
    let data = new Date();
    let dia = getValue2Digitos(data.getDate());
    let mes = getValue2Digitos(data.getMonth());
    let hora = getValue2Digitos(data.getHours());
    let minuto = getValue2Digitos(data.getMinutes());

    // PEGA TODOS OS VALORES NECESSARIOS PRO NOVO COMENTARIO
    let newUsuario = document.getElementById("user-comentario").value;
    let newComentario = document.getElementById("texto-comentario").value;
    let newData = `${dia}/${mes}/${data.getFullYear()} às ${hora}:${minuto}`;

    // CASO O USUARIO PREENCHE OS CAMPOS DO COMENTARIO
    if (!(newUsuario === "" || newComentario === "")) {

        // CRIA OS COMPONENTES
        // CAIXA DO COMENTARIO
        let comentarioBox = document.createElement("div");
        comentarioBox.className = "container comentario";
        comentarioBox.id = `cmt-${numeroComentario}`;
        campoComentarios.appendChild(comentarioBox);

        // NOME DO USUARIO
        let comentarioUser = document.createElement("h5");
        comentarioUser.className = "nome-comentario";
        comentarioUser.textContent = newUsuario;
        comentarioBox.appendChild(comentarioUser);

        // HORA DA POSTAGEM
        let comentarioHorario = document.createElement("time");
        comentarioHorario.className = "horario-comentario";
        comentarioHorario.textContent = newData;
        comentarioBox.appendChild(comentarioHorario);


        // POST
        let comentarioPost = document.createElement("p");
        comentarioPost.className = "post-comentario";
        comentarioPost.textContent = newComentario;
        comentarioBox.appendChild(comentarioPost);

        // BOTÃO CURTIR
        let btnCurtir = document.createElement("button");
        btnCurtir.className = "curtir-comentario no-like";
        btnCurtir.id = `lk-${numeroComentario}`;
        btnCurtir.onclick = function setCurtirComentario() {
            let btn = document.getElementById(btnCurtir.id);
            if (btn.classList.contains("like")) {
                btn.classList.remove("like");
                btn.classList.add("no-like");
                btn.textContent = "";

                let icone = document.createElement("i");
                icone.className = "fas fa-thumbs-up fa-1x";

                let txt = document.createElement("p");
                txt.textContent = " Curtir";

                btn.appendChild(icone);
                btn.appendChild(txt);
            }
            else {
                btn.classList.remove("no-like");
                btn.classList.add("like");
                btn.textContent = "";

                let icone = document.createElement("i");
                icone.className = "fas fa-thumbs-up fa-1x";

                let txt = document.createElement("p");
                txt.textContent = " Descurtir";

                btn.appendChild(icone);
                btn.appendChild(txt);
            }
        }

        let iconeLike = document.createElement("i");
        iconeLike.className = "fas fa-thumbs-up fa-1x";
        btnCurtir.appendChild(iconeLike);

        let txtLike = document.createElement("p");
        txtLike.textContent = " Curtir";
        btnCurtir.appendChild(txtLike);
        comentarioBox.appendChild(btnCurtir);

        // BOTÃO REPORTAR
        let btnReport = document.createElement("button");
        btnReport.className = "reportar-comentario";
        btnReport.onclick = function setReportarComentario() {
            modal = document.getElementById("modal");

            headerPg = document.querySelector("header");
            mainPg = document.querySelector("main");
            footerPg = document.querySelector("footer");

            headerPg.style.display = "none";
            mainPg.style.display = "none";
            footerPg.style.display = "none";
            modal.style.display = "flex";
        }

        let iconeReport = document.createElement("i");
        iconeReport.className = "fas fa-flag fa-1x";
        btnReport.appendChild(iconeReport);

        let txtReport = document.createElement("p");
        txtReport.textContent = " Reportar";
        btnReport.appendChild(txtReport);
        comentarioBox.appendChild(btnReport);

        numeroComentario++;
    }
    // CASO NÃO PREENCHA, EXIBE UMA MSG DE ERRO
    else {
        // INSERE O TEXTO DENTRO DO MODAL DINAMICAMENTE
        let titulo = document.getElementById("staticBackdropLabel");
        titulo.textContent = "";
        let descricaoModal = document.getElementById("texto-modal");
        let botaoFechar = document.getElementById("btn-modal");

        let newTitulo = document.createElement("h5");
        newTitulo.className = "modal-title d-flex align-items-center text-danger";

        let icone = document.createElement("i");
        icone.className = "fs-4 bi bi-check-circle me-2 text-danger";

        newTitulo.textContent = "Ops, não foi possível prosseguir";

        titulo.appendChild(icone);
        titulo.appendChild(newTitulo);

        document.getElementById("btn-fechar").className = "btn btn-danger";

        descricaoModal.textContent = "Parece que algum campo ficou vazio, corrija e tente novamente";

        // INSTANCIA O MODAL
        let modal = new bootstrap.Modal(document.getElementById("dialogErro"));

        // EXIBE O MODAL
        modal.show();
    }
}