function myReplace() {
    var questoes = document.getElementById('questoes').value;

    // console.log(questoes)
    questoes = questoes.replace(/\n[0-9] |\n[0-9][0-9] |\n[0-9][0-9][0-9] /g, '\n-=');
    // console.log('\n\Primeira formatação\n\n')
    // console.log(questoes)
    // console.log('\n\Segunda formatação\n\n')
    questoes = questoes.replace(/[0-9][0-9][0-9]\n/g, function (x) {
        return '//' + x + '-=';
    });
    //console.log(questoes)
    // console.log("\n\nPrimeiro Split\n\n")

    questoes = questoes.replace(/ulgue os itens a seguir/g, 'ulgue o item a seguir');
    questoes = questoes.replace(/ulgue os itens subsequentes/g, 'ulgue o item subsequente');
    questoes = questoes.replace(/ulgue os itens subsecutivos/g, 'ulgue o item subsecutivo');
    questoes = questoes.replace(/ulgue os itens seguintes/g, 'ulgue o item seguinte');
    questoes = questoes.replace(/ulgue os itens que se seguem/g, 'ulgue o item que se segue');
    questoes = questoes.replace(/ulgue os próximos itens/g, 'ulgue o próximo item');
    questoes = questoes.replace(/Em cada um dos itens a seguir/g, 'No item a seguir');
    questoes = questoes.replace(/ulgue os seguintes itens/g, 'ulgue o seguinte item');
    questoes = questoes.replace(/udge the following items/g, 'udge the following item');


    questoes = questoes.split("\n\n//");
    // console.log(questoes.length)

    // for (var i = 0; i < questoes.length; i++) {
    //     console.log(i + 1)
    //     console.log(questoes[i])
    // }


    // console.log("\n\nSegundo split\n\n")

    for (var i = 0; i < questoes.length; i++) {
        questoes[i] = questoes[i].split("-=");
        questoes[i] = questoes[i].slice(1);
    }

    // for (var i = 0; i < questoes.length; i++) {
    //      console.log(questoes[i])
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
        questoes[i] = questoes[i];
        titulo = questoes[i][0];
        //Percorre cada questão de um mesmo título
        for (let j = 0; j < questoes[i].length - 1; j++) {
            questaoatual = questoes[i][j + 1];
            questaoinicial = questaoinicial + 1;
            formated = formated + organizar() + '<br><br>';
        }
    }
    document.getElementById("formated").innerHTML = formated;
}


function organizar() {


    // console.log(`::TJSE 2014 - C18 - Serviço Social - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`)
    // console.log(`<i>(CESPE - TJSE 2014 - Cargo 18 - Serviço Social - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})</i><br>`)
    // console.log(`<b>${titulo}</b><br><br>`)
    // console.log(questaoatual)
    // console.log('')

    // namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`;
    // nameviewed = `<i>(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})</i><br>`


    namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)}::`;
    nameviewed = `&lt;i&gt;(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 3 }).format(questaoinicial)})&lt;/i&gt;&lt;br&gt;`

    return formated = namehidden + '<br>'
        + nameviewed + '<br>'
        + '&lt;b&gt;' + titulo + '&lt;/b&gt;&lt;br&gt;&lt;br&gt;<br>'
        + questaoatual;


}
let titulo;
let questaoinicial = 0;
questaoinicial = 51;
//document.getElementById('questaoinicial').value;
questaoinicial -= 1;


//[A-z.,:;<>!'”“"-+_/()?çÉÀáéêóíúàãõâô]