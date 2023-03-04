function receberDado() {

    //Declaração de variaveis da função
    let receber = document.querySelector("#valor_digitado");
    let valor = parseInt(receber.value);

    //Condições para cada lista adicionada, criar um novo case.
    switch(valor){
        
        case listaRecA.find(itemLista => itemLista == valor):
            var posicao = listaRecA.indexOf(valor) + 1;
            achadosNaList.push(valor);
            document.getElementById("resultado").innerHTML = "<p>O valor: " + valor + "</p>" + 
            "Se encontra na posição "+ posicao +" da lista A.";
        break;

        case listaRecB.find(itemLista => itemLista == valor):
            posicao = listaRecB.indexOf(valor) + 1;
            achadosNaList.push(valor);
            document.getElementById("resultado").innerHTML = "<p>O valor: " + valor + "</p>" + 
            "Se encontra na posição "+ posicao +" da lista B.";
        break;

        default:
            if (valor > 1){
                naoAchadosList.push(valor);
            }
            document.getElementById("resultado").innerHTML = "<p>O valor: " + valor + "</p>" + "Não foi encontrado em nenhuma lista." ;
    }
}

//Função para gerar o PDF
function gerarPDF(){

    const date = new Date();
    const dataHora = date.getHours();
    const dataMin = date.getMinutes();
    const dataSeg = date.getSeconds();

    //Variavel para modelar como será o PDF
    var pageWidth = 8.5,
        lineHeight = 1.2,
        margin = 0.5,
        maxLineWidth = pageWidth - margin * 2,
        fontSize = 12,
        ptsPerInch = 72,
        oneLineHeight = (fontSize * lineHeight) / ptsPerInch,
        text = `${date}.\n\Este arquivo é para demonstração.
        \n\nExistem atualmente ${contagemTot} valores na lista.
        \n\nVocê achou os seguintes itens nas listas: ${achadosNaList}.
        \n\nVocê achou: ${achadosNaList.length} itens na lista.
        \n\nVocê procurou os seguintes valores: ${naoAchadosList}.
        \n\nVocê procurou: ${naoAchadosList.length} valores.`

    doc = new jsPDF({
        unit: "in",
        lineHeight: lineHeight
    }).setProperties({ title: "Valores Procurados" });

    //Informar como será o modelo do texto.
    var textLines = doc.setFont("Arial").setFontSize(fontSize).splitTextToSize(text, maxLineWidth);

    //doc.text para informar as variáveis que modelam o comportamento do texto.
    doc.text(textLines, margin, margin + 2 * oneLineHeight);
    
    //Salvar usando o momento que foi feito o download.
    doc.save(dataHora + 'H_' + dataMin + 'M_' + dataSeg + 's' + ' - valores' + '.pdf');
}

//Exemplo de funções para as listas
//Posteriormente colocar em arquivo separado para melhor vizualização.
function listaA(){
    let lista = [1,2,3];
    return lista;
 }
 
function listaB(){
    let lista = [100,200,300];
    return lista;
 }

//Instânciamento
let listaRecA = listaA();
let listaRecB = listaB();

//Variaveis externas
let naoAchadosList = [];
let achadosNaList = [];
let contagemTot = (listaRecA.length + listaRecB.length);
