export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._items = document.querySelector(items)
        this._renderer = renderer
    }

    renderItems() {
        this._items.forEach(data => {
            this._renderer(data)
        })
    }
    adItem(element) {
        this._container.prepend(element)
    }
}