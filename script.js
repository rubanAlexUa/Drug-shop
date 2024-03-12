let totalPrice = 0
for(let i=0; i < drugs.length; i++){
    let star = document.createElement('img')
    star.src = 'star1.png'
    star.classList.add('star-f')
    let btn = document.createElement("button")
    btn.classList.add('add-drug')
    btn.innerText = 'Add to Cart'
    btn.setAttribute('value', drugs[i].price)
    let img = document.createElement('img')
    img.src = drugs[i].src
    img.classList.add('img-drug')
    let divDrug = document.createElement("div")
    divDrug.classList.add('div-drug')
    divDrug.classList.add('parent-border')
    divDrug.setAttribute('name', drugs[i].name)
    let h2 = document.createElement("h2")
    h2.innerText = drugs[i].name
    let price = document.createElement('h3')
    price.innerText = 'Price: '+drugs[i].price+'$'
    let date = document.createElement('h3')
    date.setAttribute('title', 'Date of adding')
    date.innerText = drugs[i].date
    let divInfo = document.createElement('div')
    divInfo.appendChild(h2)
    divInfo.appendChild(price)
    divInfo.appendChild(date)
    let divIB = document.createElement('div')
    divIB.classList.add('div-info-btn')
    divIB.appendChild(divInfo)
    divIB.appendChild(btn)
    divDrug.appendChild(img)
    divDrug.appendChild(star)
    divDrug.appendChild(divIB)
    document.querySelector('.right-part').appendChild(divDrug)
}

var stars = document.querySelectorAll(".star-f");
   stars.forEach(star => {
    star.addEventListener("click", function() {
        let src = star.getAttribute('src')
        let parentName = star.parentElement.getAttribute('name')
        let parentIndex
        for(let i=0; i < drugs.length; i++){
            console.log(parentName)
            if(drugs[i].name == parentName){
                parentIndex = i
                break
            }
            else{

            }
        }
        if(src.includes('star1.png')){
            star.setAttribute("src", 'star2.png');
            drugs[parentIndex].favourite = 'Yes'

            let div = document.querySelector('.div-drug[name="' + drugs[parentIndex].name + '"]');
            div.parentNode.prepend(div);
        }
        else{
            star.setAttribute('src', 'star1.png')
            drugs[parentIndex].favourite = 'No'

            let div = document.querySelector('.div-drug[name="' + drugs[parentIndex].name + '"]');
            div.parentNode.appendChild(div);
        }
    });
});

document.querySelector('.cart-hyp').addEventListener('click', () =>{
    let cart = document.querySelector('.cart')
    cart.style.width = '100%'
    cart.style.height= '100%'
    cart.style.visibility = 'visible'
    console.log('Visible')
})
document.querySelector('.shop').addEventListener('click', () =>{
    let cart = document.querySelector('.cart')
    cart.style.width = '0%'
    cart.style.height= '0%'
    cart.style.visibility = 'hidden'
    console.log('Hidden')
})

let btns = document.querySelectorAll('.add-drug')
btns.forEach(btn => {
    btn.addEventListener('click', () =>{
        let elementIndex
        for(let i =0; i < drugs.length; i++){
            if(btn.value == drugs[i].price){
                elementIndex = i
                break 
            }
            else{

            }
        }
        let cart = document.querySelector('.drugs-cart')
        let divCart = document.createElement('div')
        divCart.classList.add('parent-border')
        divCart.classList.add('drug-buy')
        let imgDrugCart = document.createElement('img')
        imgDrugCart.src = drugs[elementIndex].src
        let h1Cart = document.createElement('h1')
        h1Cart.innerText = drugs[elementIndex].name
        let h3Cart = document.createElement('h3')
        h3Cart.innerText = 'Price: '+drugs[elementIndex].price+'$'
        let amount = document.createElement('input')
        amount.setAttribute('type', 'number')
        amount.setAttribute('min', '1')
        amount.setAttribute('max', '10')
        amount.setAttribute('data-object-index', elementIndex)
        amount.classList.add('input-amount')
        let btnDelete = document.createElement('button')
        btnDelete.innerText = 'Delete'
        btnDelete.setAttribute('title', 'Delete drug from cart')
        btnDelete.classList.add('btnDelete')
        btnDelete.value = drugs[elementIndex].price
        let divInfoCart = document.createElement('div')
        divInfoCart.classList.add('info-drug-cart')
        divInfoCart.appendChild(h1Cart)
        divInfoCart.appendChild(h3Cart)
        divInfoCart.appendChild(amount)
        divInfoCart.appendChild(btnDelete)
        divCart.appendChild(imgDrugCart)
        divCart.appendChild(divInfoCart)
        cart.appendChild(divCart)
        console.log('Done!')
    })
});


let drugsCart = document.querySelector('.drugs-cart')
drugsCart.addEventListener('click', (event) => {
    if (event.target.classList.contains('btnDelete')) {
        let btnDelete = event.target
        let drugPrice = parseFloat(btnDelete.value)
        totalPrice -= drugPrice
        document.querySelector('.total-price').innerText = 'Total price: ' + totalPrice + '$'
        btnDelete.parentElement.parentElement.remove()
    }
})

drugsCart.addEventListener('change', (event) => {
    if (event.target.classList.contains('input-amount')) {
        let input = event.target
        let objectIndex = input.getAttribute('data-object-index')
        let previousAmount = parseFloat(input.dataset.previousAmount || 0)
        let currentAmount = parseFloat(input.value)
        let pricePerUnit = drugs[Number(objectIndex)].price

        let priceDifference = (currentAmount - previousAmount) * pricePerUnit
        console.log('('+currentAmount +'-'+ previousAmount+') *' +pricePerUnit)
        totalPrice += priceDifference

        input.dataset.previousAmount = currentAmount
        document.querySelector('.total-price').innerText = 'Total price: ' + totalPrice + '$'
    }
});

document.querySelector('.submit').addEventListener('click', ()=>{
    let name = document.querySelector('.client-name').value
    if(!name || totalPrice == 0){
        alert('Oops, I see that you guys or are truying to test or just forget to buy smth, else write your name so try to write name and buy dmth if you want!')
    }
    else{
        alert('My congrats '+name+' you have already bought drugs, I hope you`ll be healthy after some time!')
        totalPrice = 0
        document.querySelector('.total-price').innerText = 'Total price: ' + totalPrice + '$'
        let divDrugBuy = document.querySelector('.drugs-cart')
        while (divDrugBuy.firstChild) {
            divDrugBuy.removeChild(divDrugBuy.firstChild);
        }
    }
})
const lowPriceBtn = document.querySelector('.low-price');
const highPriceBtn = document.querySelector('.high-price');
const dateBtn = document.querySelector('.date');
const drugDivs = Array.from(document.querySelectorAll('.div-drug'));

lowPriceBtn.addEventListener('click', () => {
  sortDivs('price', true);
});

highPriceBtn.addEventListener('click', () => {
  sortDivs('price', false);
});

dateBtn.addEventListener('click', () => {
  sortDivs('date', true);
});

function sortDivs(sortBy, isAscending) {
  const sortedDivs = drugDivs.sort((a, b) => {
    const aProp = sortBy === 'price' ? parseFloat(a.querySelector('h3').textContent.match(/\d+(\.\d+)?/)[0]) : new Date(a.querySelector('h3[title="Date of adding"]').textContent.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'));
    const bProp = sortBy === 'price' ? parseFloat(b.querySelector('h3').textContent.match(/\d+(\.\d+)?/)[0]) : new Date(b.querySelector('h3[title="Date of adding"]').textContent.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'));

    return isAscending ? aProp - bProp : bProp - aProp;
  });

  const rightPart = document.querySelector('.right-part');
  rightPart.innerHTML = '';

  sortedDivs.forEach(div => {
    rightPart.appendChild(div);
  });
}