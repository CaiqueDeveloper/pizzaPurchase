const selectOne = ((el) => document.querySelector(el))
const selectAll = ((el) => document.querySelectorAll(el))

//clone element
let itemPizza = pizzaJson.map((item, key) => {

    let pizzCotentModel = selectOne('.models .pizza-item').cloneNode(true)

    pizzCotentModel.querySelector('.pizza-item--img img').setAttribute('src', item.img)
    pizzCotentModel.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzCotentModel.querySelector('.pizza-item--name').innerHTML = item.name
    pizzCotentModel.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzCotentModel.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();


        let modalPizzaContent = selectOne('.pizzaWindowArea')
        modalPizzaContent.style.opacity = 0
        modalPizzaContent.style.display = 'flex'
        setTimeout(() => {
            modalPizzaContent.style.opacity = 1
        }, 200)

        modalPizzaContent.querySelector('.pizzaInfo--cancelButton').addEventListener('click', ((e) => {

            e.preventDefault()
            modalPizzaContent.style.opacity = 1
            setTimeout(() => {
                modalPizzaContent.style.opacity = 0
            }, 200)
            modalPizzaContent.style.display = 'none'
        }))


    })
    selectOne('.pizza-area').append(pizzCotentModel)

})