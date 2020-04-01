function myReplace() {
    var questoes = document.getElementById('questoes').value;
    questoes = questoes.replace(/[^0-9]\n[A|B|C|D|E] /g, (x) => {
        x = x.charAt(0) + x.charAt(1);
        return x + '-=';
    });
    questoes = questoes.replace(/QUESTÃO [0-9][0-9][0-9]\n|QUESTÃO [0-9][0-9]\n|QUESTÃO [0-9]\n/g, 'SplitQuestao\n-=');
    questoes = questoes.split("SplitQuestao");
 
    for (var i = 0; i < questoes.length; i++) {
        questoes[i] = questoes[i].split("-=");
        questoes[i] = questoes[i].slice(1);
    }
    questoes = questoes.slice(1);
    format(questoes);
}

function organizar(questaoinicial, titulo) {
    var namehidden = `::${document.getElementById('namehidden').value} - ${new Intl.NumberFormat('pt-BR',{ minimumIntegerDigits: questaoInicialStr.length }).format(questaoinicial)}::`;
    var nameviewed = `&lt;i&gt;(CESPE - ${document.getElementById('nameviewed').value} - Questão: ${new Intl.NumberFormat('pt-BR',{ minimumIntegerDigits: questaoInicialStr.length }).format(questaoinicial)})&lt;/i&gt;&lt;br&gt;`

    return namehidden + '\n' + nameviewed + '\n' + titulo
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
            if (correction[i][j] == 'A') {
                correct += 0
            }else if (correction[i][j] == 'B') {
                correct += 1
            }else if (correction[i][j] == 'C') {
                correct += 2
            }else if (correction[i][j] == 'D') {
                correct += 3
            }else if (correction[i][j] == 'E') {
                correct += 4
            }else if (correction[i][j] == 'X') {
                correct += 5
            }
        }
    }
}

function format(questoes) {
    var formated = '';
    var chrAt = 0
    questaoInicialStr = document.getElementById('questaoinicial').value;
    questaoinicial = parseInt(questaoInicialStr) - 1;
    getCorrection()

    for (let i = 0; i < questoes.length; i++) {
        var aux = questoes[i];
        var titulo = aux[0]
        let eachCorrect
        questaoinicial = questaoinicial + 1
        formated = formated + organizar(questaoinicial, titulo) + '{\n';
        eachCorrect = parseInt(correct.charAt(chrAt))

        //if(eacheCorrect == null)
            
        if (eachCorrect == 5) {
            formated = formated + 'ANULADA\n\n}\n\n'
            chrAt++
        }else {
            for (let j = 0; j < aux.length - 1; j++) {
                questaoatual = aux[j + 1]
                if (j == eachCorrect) {
                    formated = formated + "=" + questaoatual;
                }else {
                    formated = formated + "~" + questaoatual;
                }
            }
            formated = formated + '}\n\n';
            chrAt++
        }
    }
    formated = formated.replace(/[^:>\.{}\n]\n[^{]/g, (x) =>{
        x = x.charAt(0) + ' ' + x.charAt(2)
        return x
    })

    document.getElementById("formated").innerHTML = formated;
}

function copyText() {
    let el = document.getElementById('formated')
    el.select();
    document.execCommand('copy');
    alert('Texto copiado');
}

//[A-z.,:;<>!'‘’”“"-+_/()?ç&%ÉÀáéêóíúàãõâô]
//[^A|B|C|D|E|QUEST]
//&lt;br&gt;           <br>