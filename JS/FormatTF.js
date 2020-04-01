function myReplace() {
    var questoes = document.getElementById('questoes').value;

    questoes = questoes.replace(/\n[0-9] |\n[0-9][0-9] |\n[0-9][0-9][0-9] /g, '\n-=');
    questoes = questoes.replace(/[0-9][0-9][0-9]\n/g, (x) => {
        return '//' + x + '-=';
    });
    questoes = questoes.replace(/[^:>\.{}\n]\n[^<]/g, (x) =>{
        x = x.charAt(0) + ' ' + x.charAt(2)
        return x
    })
    questoes = questoes.replace(/ulgue os itens a seguir/g, 'ulgue o item a seguir');
    questoes = questoes.replace(/ulgue os itens subsequentes/g, 'ulgue o item subsequente');
    questoes = questoes.replace(/ulgue os itens subsecutivos/g, 'ulgue o item subsecutivo');
    questoes = questoes.replace(/ulgue os itens seguintes/g, 'ulgue o item seguinte');
    questoes = questoes.replace(/ulgue os itens que se seguem/g, 'ulgue o item que se segue');
    questoes = questoes.replace(/ulgue os próximos itens/g, 'ulgue o próximo item');
    questoes = questoes.replace(/Em cada um dos itens a seguir/g, 'No item a seguir');
    questoes = questoes.replace(/ulgue os seguintes itens/g, 'ulgue o seguinte item');
    questoes = questoes.replace(/udge the following items/g, 'udge the following item');
    //julgue os itens que se seguem
    
    questoes = questoes.split("\n\n//");
    
    for (var i = 0; i < questoes.length; i++) {
        questoes[i] = questoes[i].split("-=");
        questoes[i] = questoes[i].slice(1);
    }
    
    format(questoes);
    // console.log(questoes)
}

var correct
function getCorrection() {
    correct = []
    var correction = document.getElementById("correction").value
    correction = correction.split(/\n/g)
    for (var i = 0; i < correction.length; i++) {
        correction[i] = correction[i].split(" ")
    }
    
    // console.log(correction)
    for (var i = 0; i < correction.length; i++) {
        i++
        for (var j = 0; j < correction[i].length; j++) {
            if (correction[i][j] == 'E') {
                correct += 0
            } else if (correction[i][j] == 'C') {
                correct += 1
            } else if (correction[i][j] == 'X') {
                correct += 2
            }
        }
    }
}
function format(questoes) {
    var formated = '';
    var eachCorrect;
    var chrAt = 0
    questaoInicialStr = document.getElementById('questaoinicial').value;
    questaoinicial = parseInt(questaoInicialStr) -1;
    getCorrection()

    for (let i = 0; i < questoes.length; i++) {
        var aux = questoes[i];
        var titulo = aux[0];
        
        //Percorre cada questão de um mesmo título
        for (let j = 0; j < aux.length - 1; j++) {
            eachCorrect = parseInt(correct.charAt(chrAt))
            questaoatual = aux[j + 1];
            questaoinicial = questaoinicial + 1;

            formated = formated + organizar(questaoinicial, titulo)

            if (eachCorrect == 0) {
                formated = formated + questaoatual + '{F}\n\n'
            } else if (eachCorrect == 1) {
                formated = formated + questaoatual + '{T}\n\n'
            } else if (eachCorrect == 2) {
                formated = formated + questaoatual + '{ANULADA}\n\n'
            }
            chrAt++
        }
    }

    formated = formated.replace(/\n<\//g, (x) => {
        x = x.charAt(1) + x.charAt(2)
        return x
    })
    formated = formated.replace(/[^\n]{/g, (x) =>{
        x = x.charAt(0) + '\n' + x.charAt(1)
        return x
    })
    document.getElementById("formated").innerHTML = formated;
}

function organizar(questaoinicial, titulo) {
    var namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: questaoInicialStr.length }).format(questaoinicial)}::`;
    var nameviewed = `<i>(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: questaoInicialStr.length }).format(questaoinicial)})</i><br>`
    
    return namehidden + '\n' + nameviewed + '\n' + '<b>' + titulo + '</b><br><br>\n'
}

function copyText() {
    let el = document.getElementById('formated')
    el.select();
    document.execCommand('copy');
    alert('Texto copiado');
}


//[A-z.,:;<>!'”“"-+_/()?çÉÀáéêóíúàãõâô]