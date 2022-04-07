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
    
    selectOne('.modal').style.display = 'block'
    selectOne('.modal').classList.add('show')
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
        cartFinal.push({
            name: pizzaName,
            quantity: cart[i].modalQt,
        })
        
    }
  

    for(let i in cartFinal){
        itemPayment += `${cartFinal[i].name} - Quantidade: ${cartFinal[i].quantity}\n\n`
    }

    let addrres = `Bairro: Centro\nRua: Faustino Caló\nNª: 190\nCompleto: Do lado da casa de ciclano`
    let paymentMethod = `Cartão: não\nDinheiro: sim\nTroco para?: R$: 150.00`
    let troco = 150 - subtotal
    let bodyUrl = `*PEDIDO*\n\n${itemPayment}\n*Endereço*\n\n${addrres}\n\n*Método de Pagamento*\n${paymentMethod}\n\n============\n\nTotal:${subtotal} \nTroco:R$ ${troco.toFixed(2)}`
   sendMessage(bodyUrl);
})
function sendMessage(bodyUrl){
   
    let isMobile = (function(a) {
        if ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)) ) {
            return true
        } else {
            return false
           
        }
    })(navigator.userAgent || navigator.vendor || window.opera)
   
    if ( isMobile ) {
        let target = `whatsapp://send?phone=7399811792&text=${window.encodeURIComponent(bodyUrl)}`
        window.open(target,'_blank')
    } else {
        let target = `https://api.whatsapp.com/send?phone=7399811792&text=${window.encodeURIComponent(bodyUrl)}`
        window.open(target,'_blank')
    }
      
}
function updateCart(){
    selectOne('aside').classList.add('show');
    if(cart.length > 0){
        selectOne('.menu-openner').innerHTML =  cart.length;
       
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