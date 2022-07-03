"use strict"

document.addEventListener('DOMContentLoaded', () => {

  const theme = document.querySelector('.theme')
  const form = document.querySelector('.form')
  const input = document.querySelector('.input')
  const picsContainer = document.querySelector('.pics-container')
  // you shouldn't store API keys publicy, this is an exeception because the data is free and avialable anyways
  const apiKey = 'IkyOffGFcx5KRl5SdI0uODyOnbD4kD7y_4vgUmP0Pe4'
  const baseUrl = 'https://api.unsplash.com/photos/random/'

  let searchTerm = null
  let apiUrl = null
  let picsArray = []

  function initTheme() {
    const theme = localStorage.getItem('theme')

    if (theme === null) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } 
    else if (theme === 'light') {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    else {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }

  function setAttributes(element, attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }

  function displayPics() {
    picsArray.forEach((pic) => {
      const card = document.createElement('div')
      const img = document.createElement('img')
      const picLinks = document.createElement('div')
      const picSource = document.createElement('a')
      
      card.classList.add('card')
      picLinks.classList.add('pic-links')
      picSource.innerText = 'Source'

      setAttributes(img, {
        src: pic.urls.regular,
        alt: pic.description
      })

      setAttributes(picSource, {
        href: pic.links.html,
        target: '_blank'
      })

      picLinks.appendChild(picSource)
      card.appendChild(img)
      card.appendChild(picLinks)
      picsContainer.appendChild(card)
    })
  }

  async function getPics() {
    try {
      const response = await fetch(apiUrl)
      picsArray = await response.json()
      displayPics()
    } catch (error) {
      console.log(error)
    }
  }

  theme.addEventListener('click', () => {
    const theme = localStorage.getItem('theme')
  
    if (theme === 'dark') {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    else {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    while (picsContainer.firstChild) {
      picsContainer.firstChild.remove()
    }

    searchTerm = input.value
    apiUrl = `${baseUrl}?client_id=${apiKey}&count=12&query=${searchTerm}&orientation=squarish;`
    getPics()

    input.value = ''
    input.placeholder = 'type your keywords ...'
    input.focus()
  })

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPics()
    }
  })

  initTheme()

})