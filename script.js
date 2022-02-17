const selectOne = ((el) => document.querySelector(el))
const selectAll = ((el) => document.querySelectorAll(el))

//clone element
let itemPizza = pizzaJson.map((item, key) => {

    let pizzCotentModel = selectOne('.models .pizza-item').cloneNode(true)
    pizzCotentModel.querySelector('.pizza-item--img img').setAttribute('src', item.img)
    pizzCotentModel.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzCotentModel.querySelector('.pizza-item--name').innerHTML = item.name
    pizzCotentModel.querySelector('.pizza-item--desc').innerHTML = item.description
    selectOne('.pizza-area').append(pizzCotentModel)

})