const selectOne = ((el) => document.querySelector(el))
const selectAll = ((el) => document.querySelectorAll(el))
let modalQt = 1;
let modalKey = 0;
let cart = [];
//clone element
let itemPizza = pizzaJson.map((item, key) => {

    let pizzCotentModel = selectOne('.models .pizza-item').cloneNode(true)
    pizzCotentModel.setAttribute('data-key', key);
    pizzCotentModel.querySelector('.pizza-item--img img').setAttribute('src', item.img)
    pizzCotentModel.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzCotentModel.querySelector('.pizza-item--name').innerHTML = item.name
    pizzCotentModel.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzCotentModel.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        //get element by clicked
        let keyPizza = e.target.closest('.pizza-item').getAttribute('data-key')
        modalKey = keyPizza

        selectOne('.pizzaBig img').setAttribute('src', pizzaJson[keyPizza].img)
        selectOne('.pizzaInfo h1').innerHTML = pizzaJson[keyPizza].name
        selectOne('.pizzaInfo--desc').innerHTML = pizzaJson[keyPizza].description
        selectOne('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[keyPizza].price.toFixed(2)}`
        modalQt = 0
        selectOne('.pizzaInfo--size.selected').classList.remove('selected')
        selectAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex) => {
                if (sizeIndex == 2) {
                    sizeItem.classList.add('selected')
                }
                sizeItem.querySelector('span').innerHTML = pizzaJson[keyPizza].sizes[sizeIndex]
            })
            //open modal
        let modalPizzaContent = selectOne('.pizzaWindowArea')
        modalPizzaContent.style.opacity = 0
        modalPizzaContent.style.display = 'flex'
        setTimeout(() => {
            modalPizzaContent.style.opacity = 1
        }, 200)
        selectOne('.pizzaInfo--qt').innerHTML = modalQt


    })
    selectOne('.pizza-area').append(pizzCotentModel)

})

function colsedModal() {

    selectOne('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        selectOne('.pizzaWindowArea').style.display = 'none'
    }, 500)
}
selectAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', colsedModal)
})
selectOne('.pizzaInfo--qtmais').addEventListener('click', (e) => {
    e.preventDefault()
    modalQt++
    selectOne('.pizzaInfo--qt').innerHTML = modalQt

})
selectOne('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
    e.preventDefault()
    if (modalQt > 1) {
        modalQt--;
        selectOne('.pizzaInfo--qt').innerHTML = modalQt
    }
})

selectAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex) => {
    sizeItem.addEventListener('click', (e) => {
        selectOne('.pizzaInfo--size.selected').classList.remove('selected')
        e.target.classList.add('selected')
        console.log(sizeItem.classList.add('selected'))
    })
})

selectOne('.pizzaInfo--addButton').addEventListener('click', (e) => {
    e.preventDefault()
    let size = selectOne('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[modalKey].id+'@'+size
    let key = cart.findIndex((item) => item.identifier == identifier)

    if(key > -1){
        cart[key].modalQt += modalQt
    }else{

        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            modalQt
        })
    }
    
    updateCart()
    colsedModal()
})
selectOne('.menu-openner').addEventListener('click', (e)=>{
    if(cart.length > 0){
        selectOne('aside').style.left = '0';
    }
})
selectOne('.menu-closer').addEventListener('click', (e)=>{
    if(cart.length > 0){
        selectOne('aside').style.left = '100vw';
    }
})
selectOne('.cart--finalizar').addEventListener('click', (e)=>{
    // selectOne('.modal').style.display = 'block'
    // selectOne('.modal').classList.add('show')
    const cartFinal = []
    let subtotal = 0
    let itemPayment = ''
    for(let i in cart){
        let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
        subtotal += pizzaItem.price * cart[i].modalQt
        let pizzaSizeName;
        switch(cart[i].size){
            case '0':
                pizzaSizeName = 'P';
                break;
            case '1':
                pizzaSizeName = 'M';
                break;
            case '2':
                pizzaSizeName = 'G';
                break;
        }
        
        let pizzaName = `${pizzaItem.name} - (${pizzaSizeName}) - R$ ${pizzaItem.price.toFixed(2)}`;
       // cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].modalQt;
        cartFinal.push({
            name: pizzaName,
            quantity: cart[i].modalQt,
        })
        
    }
  

    for(let i in cartFinal){
        
        itemPayment += `${cartFinal[i].name} - Quantidade: ${cartFinal[i].quantity}\n`
    }
    let addrres = `Bairro: Centro\nRua: Faustino Caló\nNª: 190\nCompleto: Do lado da casa de ciclano`
    let paymentMethod = `Cartão: não\nDinheiro: sim\nTroco para?: R$: 150.00`
    let troco = 150 - subtotal
    let bodyUrl = `=========PEDIDO========\n\n${itemPayment}\n=========Endereço========\n\n${addrres}\n\n=========Método de Pagamento========\n${paymentMethod}\n\n ================\n\nTotoal:${subtotal} \nTroco:R$ ${troco.toFixed(2)}`
   window.open(`https://api.whatsapp.com/send?phone=7399811792&text=${window.encodeURIComponent(bodyUrl)}`,"_blank")
   console.log(bodyUrl);
})
function updateCart(){
    selectOne('.menu-openner').innerHTML =  cart.length;
    if(cart.length > 0){
        selectOne('aside').classList.add('show');
        selectOne('.cart').innerHTML = '';
        
        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].modalQt
            let cartItem = selectOne('.cart--item').cloneNode(true);
            

            let pizzaSizeName;
            switch(cart[i].size){
                case '0':
                    pizzaSizeName = 'P';
                    break;
                case '1':
                    pizzaSizeName = 'M';
                    break;
                case '2':
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].modalQt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', (e) =>{
                cart[i].modalQt++;
                updateCart();
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', (e) =>{
                if(cart[i].modalQt > 1){
                    cart[i].modalQt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            })


            selectOne('.cart').append(cartItem)
           
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto
        selectOne('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selectOne('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        selectOne('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }else{
        selectOne('aside').classList.remove('show');
        selectOne('aside').style.left = '0';
    }
}