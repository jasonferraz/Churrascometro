function updatePercent(val) {
    document.getElementById("valPercent").innerText = val + "%";
}

function calcular() {
    const adultos = parseInt(document.getElementById("adultos").value) || 0;
    const criancas = parseInt(document.getElementById("criancas").value) || 0;
    const duracao = parseFloat(document.getElementById("duracao").value) || 0;
    const tipo = document.getElementById("tipoChurrasco").value;
    const percentAlcool = parseInt(document.getElementById("percentAlcool").value) / 100;

    if (adultos + criancas === 0) {
        alert("Por favor, adicione a quantidade de convidados!");
        return;
    }

    let carneBase = tipo === "economico" ? 350 : (tipo === "premium" ? 550 : 400);
    let cervejaBase = 1200;
    let refriBase = 1000;

    if (duracao >= 6) {
        carneBase *= 1.3;
        cervejaBase = 2000;
        refriBase = 1500;
    }

    const adultosBebem = Math.ceil(adultos * percentAlcool);
    const carneTotal = (adultos * carneBase) + (criancas * (carneBase / 2));
    const cervejaTotal = adultosBebem * cervejaBase;
    const refriTotal = (adultos * refriBase) + (criancas * (refriBase / 2));

    const sugestoes = {
        economico: { 
            bov: 0.2, sui: 0.4, fra: 0.4, 
            nomes: ["Acém ou Maçã do Peito", "Linguiça Toscana", "Sobrecoxa de Frango"] 
        },
        tradicional: { 
            bov: 0.5, sui: 0.2, fra: 0.3, 
            nomes: ["Alcatra ou Contrafilé", "Linguiça Cuiabana", "Coração e Asa"] 
        },
        premium: { 
            bov: 0.7, sui: 0.1, fra: 0.2, 
            nomes: ["Picanha ou Ancho", "Costelinha Premium", "Pão de Alho e Queijo"] 
        }
    };

    const s = sugestoes[tipo];

    document.getElementById("lista-compras").innerHTML = `
        <span class="categoria-titulo">🥩 Carnes (${(carneTotal / 1000).toFixed(1)}kg)</span>
        
        <div class="item-lista">
            <span>${s.nomes[0]}</span> 
            <span>${(carneTotal * s.bov / 1000).toFixed(2)}kg</span>
        </div>
        
        <div class="item-lista">
            <span>${s.nomes[1]}</span> 
            <span>${(carneTotal * s.sui / 1000).toFixed(2)}kg</span>
        </div>
        
        <div class="item-lista">
            <span>${s.nomes[2]}</span> 
            <span>${(carneTotal * s.fra / 1000).toFixed(2)}kg</span>
        </div>
        
        <span class="categoria-titulo">🍺 Bebidas</span>
        
        ${adultosBebem > 0 ? `
            <div class="item-lista">
                <span>Cerveja (${adultosBebem} adultos)</span> 
                <span class="badge-bebida">${Math.ceil(cervejaTotal / 355)} latas</span>
            </div>
        ` : ''}
        
        <div class="item-lista">
            <span>Refri/Água (2L)</span> 
            <span class="badge-bebida">${Math.ceil(refriTotal / 2000)} garrafas</span>
        </div>
    `;

    document.getElementById("detalhes-logica").innerHTML = `
        <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; margin-bottom: 15px;">
            <strong style="font-size: 0.8em; color: var(--primary);">
                📌 LÓGICA APLICADA (${tipo.toUpperCase()}):
            </strong><br>
            
            <small>• <b>Carne:</b> ${Math.round(carneBase)}g por adulto e ${Math.round(carneBase / 2)}g por criança.</small><br>
            <small>• <b>Cerveja:</b> ${cervejaBase}ml por adulto que consome álcool.</small><br>
            <small>• <b>Não alcoólicos:</b> ${refriBase}ml por adulto e ${refriBase / 2}ml por criança.</small>
            
            <small style="color: #888; display: block; margin-top: 5px;">
                *Valores ajustados para ${duracao}h de evento.
            </small>
        </div>

        <small style="display: block; margin-bottom: 4px;">
            🚀 <strong>Sistema desenvolvido por Jason Ferraz</strong>
        </small>
        
        <div style="display: flex; gap: 15px; justify-content: flex-start;">
            <small>
                📸 <a href="https://instagram.com/jason.ferraz" target="_blank" style="color: #e67e22; text-decoration: none;">Instagram</a>
            </small>
            <small>
                💬 <a href="https://wa.me/5541997773745" target="_blank" style="color: #27ae60; text-decoration: none;">WhatsApp</a>
            </small>
        </div>
    `;

    document.getElementById("resultado").style.display = "block";
}

function compartilhar() {
    const shareData = {
        title: 'Churrascômetro',
        text: 'Cálculo de churrasco perfeito feito pelo Jason Ferraz:',
        url: window.location.href 
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Link copiado para compartilhar!");
        });
    }
}