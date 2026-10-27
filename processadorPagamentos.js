
function processarTransacaoPix(chavePix, valor, callbackAcao) {
    // Validar o valor da transação
    if (valor <= 0) {
        console.log("Erro: O valor do PIX deve ser maior que zero.");
        return;
    }

    // Criar o objeto da transação
    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix: chavePix,
        valor: valor,
        data: new Date().toLocaleTimeString()
    };

    console.log("Transação PIX processada com sucesso!");

    // Executar a função callback
    callbackAcao(transacao);
}


processarTransacaoPix("cliente@email.com", 100, (transacao) => {
    console.log(transacao);
});


function emitirComprovantePorEmail(transacao) {
    console.log("=== COMPROVANTE PIX ===");
    console.log("ID:", transacao.id);
    console.log("Valor: R$", transacao.valor.toFixed(2));
    console.log("Destinatário:", transacao.chavePix);
}

function creditarCashback(transacao) {
    const cashback = transacao.valor * 0.02;
    console.log("Cashback de 2%: R$", cashback.toFixed(2));
}

function auditarTransacaoSuspeita(transacao) {
    if (transacao.valor > 5000) {
        console.log("ALERTA: Transação suspeita!");
    } else {
        console.log("Transação normal.");
    }
}


console.log("\n--- TESTE 1: COMPROVANTE POR E-MAIL ---");
processarTransacaoPix("cliente@email.com", 100, emitirComprovantePorEmail);

console.log("\n--- TESTE 2: CASHBACK ---");
processarTransacaoPix("cliente@email.com", 200, creditarCashback);

console.log("\n--- TESTE 3: AUDITORIA ANTIFRAUDE ---");
processarTransacaoPix("loja@email.com", 6000, auditarTransacaoSuspeita);

console.log("\n--- TESTE 4: ARROW FUNCTION COM DESCONTO ---");
processarTransacaoPix("cliente@email.com", 100, (transacao) => {
    const valorFinal = transacao.valor - 5;
    console.log("Valor original: R$", transacao.valor.toFixed(2));
    console.log("Desconto: R$ 5,00");
    console.log("Valor final: R$", valorFinal.toFixed(2));
});


function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
    console.log("Webhook agendado para envio...");

    setTimeout(() => {
        console.log("Webhook enviado após 2 segundos!");

        callbackFinalizacao(transacao);
    }, 2000);
}

// Teste do webhook
console.log("\n--- TESTE 5: WEBHOOK ASSÍNCRONO ---");

processarTransacaoPix("loja@email.com", 250, (transacao) => {
    enviarWebhookAssincrono(transacao, (resultado) => {
        console.log("Notificação finalizada!");
        console.log("ID da transação:", resultado.id);
        console.log("Valor: R$", resultado.valor.toFixed(2));
    });
});

console.log("O programa continua executando enquanto aguarda o webhook.");
