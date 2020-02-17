function myReplace() {
    var questoes = document.getElementById('questoes').value;

    // console.log(questoes)

    questoes = questoes.replace(/[^0-9]\n[A|B|C|D|E] /g, (x) => {
        x = x.charAt(0) + x.charAt(1);
        return x + '-=';
    });
    // console.log('\n\Primeira formatação\n\n')
    // console.log(questoes)

    questoes = questoes.replace(/QUESTÃO [0-9][0-9][0-9]\n|QUESTÃO [0-9][0-9]\n|QUESTÃO [0-9]\n/g, 'SplitQuestao\n-=');
    // console.log('\n\Segunda formatação\n\n')
    //console.log(questoes)

    questoes = questoes.split("SplitQuestao");
    // console.log("\n\nPrimeiro Split\n\n")
    // console.log(questoes.length)
    // for (var i = 0; i < questoes.length; i++) {
    //     console.log(i + 1)
    //     console.log(questoes[i])
    // }

    for (var i = 0; i < questoes.length; i++) {
        questoes[i] = questoes[i].split("-=");
        questoes[i] = questoes[i].slice(1);
    }

    questoes = questoes.slice(1);

    // console.log("\n\nSegundo split\n\n")
    // for (var i = 0; i < questoes.length; i++) {
    //     console.log(questoes[i])
    //     for (var j = 0; j < questoes[i].length; j++) {
    // console.log(questoes[i][j]);
    //     }
    // }

    format(questoes);
}

function format(questoes) {

    var formated = '';
    questaoinicial = document.getElementById('questaoinicial').value;
    questaoinicial = parseInt(questaoinicial) - 1;

    for (let i = 0; i < questoes.length; i++) {
        var aux = questoes[i];
        var titulo = aux[0]
        questaoinicial = questaoinicial + 1
        formated = formated + organizar(questaoinicial, titulo) + '{<br>';

        for (let j = 0; j < aux.length - 1; j++) {
            questaoatual = aux[j + 1]
            formated = formated + "~" + questaoatual + "<br>";
        }
        formated = formated + '}<br><br>';
    }

    document.getElementById("formated").innerHTML = formated;
}

function organizar(questaoinicial, titulo) {


    // console.log(`::TJSE 2014 - C18 - Serviço Social - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`)
    // console.log(`<i>(CESPE - TJSE 2014 - Cargo 18 - Serviço Social - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})</i><br>`)
    // console.log(`<b>${titulo}</b><br><br>`)
    // console.log(questaoatual)
    // console.log('')

    // namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`;
    // nameviewed = `<i>(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})</i><br>`

    var namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`;
    var nameviewed = `&lt;i&gt;(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})&lt;/i&gt;&lt;br&gt;`

    return namehidden + '<br>'
        + nameviewed + '<br>'
        + titulo + '<br>'


}
let titulo;
let questaoinicial = 0;
questaoinicial = 1;
//document.getElementById('questaoinicial').value;
questaoinicial -= 1;


//[A-z.,:;<>!'‘’”“"-+_/()?çÉÀáéêóíúàãõâô]
//&lt;br&gt;          <br>