export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._items = items
        this._renderer = renderer
    }

    renderItems() {
        this._items.forEach((data) => {
            this._renderer(data)
        })
    }
    addItem(element) {
        this._container.prepend(element)
    }
}
//Прошу прощения, что не исправил эту ошибку. Я пробовал разные подходы,
//но не смог придумать другого способа.