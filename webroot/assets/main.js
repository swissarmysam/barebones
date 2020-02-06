

function handleTab(evt) {
    if(evt.keyCode === 9) {
        document.body.classList.add('user-tabbing');
        window.removeEventListener('keydown', handleTab);
    }
}

function updateYear(){
    const date = new Date();
    document.querySelector('#year').innerHTML = date.getFullYear();
}

function loadJSON() {
    fetch('assets/deals.json')
        .then((response) => { return response.json()})
        .then((obj) => {
            const deals = Object.entries(obj);
            for(let idx = 0; idx < deals.length; idx++){
                const item = `<div class="card tech" data-filter="${deals[idx][1].cat}">
                                <!-- <img src="${deals[idx][1].image}" /> -->
                                <div class="info">
                                    <div class="title">
                                        <h3>${deals[idx][1].name}</h3>
                                        <span>${deals[idx][1].cat}</span>
                                    </div>
                                    <p>${deals[idx][1].offer}</p>
                                    <a href="${deals[idx][1].link}" target="_blank" rel="noopener">Visit website</a>
                                </div>
                            </div>`;
                document.querySelector(".wrapper").innerHTML += item;
            }
        })
        .catch((err) => {
            console.log(err);
        });

        updateYear();
}

function filterDeals(evt) {
    const result = evt.currentTarget.dataset.filter;
    console.log(result);

    const deal = document.querySelectorAll('.card');
    deal.forEach(card => {
        // console.log(card);
        if(result == 'All') {
            card.classList.remove('hide');
            card.classList.add('show');
        }
        else if(card.dataset.filter != result) {
            card.classList.add('hide');
            card.classList.remove('show');
        }
        else if (card.dataset.filter == result) {
            card.classList.remove('hide');
            card.classList.add('show');
        }
    });
}

window.addEventListener('keydown', handleTab);
window.addEventListener('load', loadJSON);
document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', filterDeals));