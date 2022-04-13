export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeButtonClose)
}

export function escapeButtonClose(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened')
        closePopup(activePopup)
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeButtonClose)

}