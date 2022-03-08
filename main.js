$(function () {
  const $folder = $('[data-role="attraction"]')

  $folder
    .ecpFolder({
      wrapper: '.attraction-wrapper'
    })
    .on('beforeScroll', function () {
      console.log('beforeScroll')
    })
    .on('afterScroll', function () {
      console.log('afterScroll')
    })
})
