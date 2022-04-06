    // Manipulação DOM

let res = document.getElementById("res");   
let cpfUser = document.getElementById("cpf-user");

const invalid = 'INVÁLIDO.';
const valid = 'VÁLIDO.';

    // Click Button

function handleClick(){       

    let cpf = new validaCPF(cpfUser.value);     // Novo Valor 
    let comparation = cpf.valida();

    if(comparation){
        res.style.display = 'block';
        res.innerHTML = 'O CPF inserido é ' + valid.fontcolor('#0f4f02');
    }
    else{
        res.style.display = 'block';
        res.innerHTML = 'O CPF inserido é ' + invalid.fontcolor('red');
    };
};

    // Remove Specials Characters

function validaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '')
        }
    });
};

    // Validação 1 (Origem)

validaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequency()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);   // criando digito 1
    const digito2 = this.criaDigito(cpfParcial + digito1); // criando digito 2
    
    const newCpf = cpfParcial + digito1 + digito2;

    return newCpf === this.cpfLimpo; // Comparando se o valor inserido é igual (válido) ou não.
};

    // Validação 2

validaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length +1;
    const total = cpfArray.reduce((ac, val) =>{
        ac += (regressivo * Number(val))   // multiplicando o acumulador com o valor
        regressivo --
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);    // retornando string (função ternária)

};

    // Validação 3

validaCPF.prototype.isSequency = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;   // comparando se tem sequencia no cpf inserido
};
