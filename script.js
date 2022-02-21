const selectOne = ((el) => document.querySelector(el))
const selectAll = ((el) => document.querySelectorAll(el))
let modalQt = 1;
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