'use strict'

$(init)
var $elPortfolioItem

function init() {
  renderProjs()
}
$(".contact .btn").on('click', onSendMail);


function renderProjs() {
  var strHTML = ''
  const elProjectsContainer = $('.projects')
  var projects = getProjects()

  var counter = 0
  projects.forEach((proj) => {
    console.log(proj.name);
    counter++
    console.log(proj.id);
    strHTML += `<div class="col-md-4 col-sm-6 portfolio-item" data-proj="${proj.id}">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
    <div class="portfolio-hover">
    <div class="portfolio-hover-content">
    <i class="fa fa-plus fa-3x"></i>
    </div>
    </div>
    <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="${proj.name}">
    </a>
    <div class="portfolio-caption">
    <h4>Threads</h4>
    <p class="text-muted">Illustration</p>
    </div>
    </div>`


  })
  elProjectsContainer.html(strHTML)
  $('.portfolio-item').on('click', renderModal)

}

function renderModal() {
  var projId = $(this).data().proj
  var proj = getProjById(projId)
  console.log(proj);
  $('.modal-body h2').text(proj.name)
  $('.modal-body p').text('intro')
  $('.describe').text(proj.desc)
  $('.modal-body .img-fluid').attr('src', `img/portfolio/${proj.id}.png`)
  $('.try-me').attr('action', `${proj.url}`)



}

function onSendMail() {
  const mail = $('#contact-form #email').val()
  const subject = $('#contact-form #subject').val()
  const message = $('#contact-form #message').val()
  const myMail = 'shilo.klein1@gmail.com'
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myMail}.com&su=${subject}&body=${message}`)


}

{/* <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="close-modal" data-dismiss="modal">
      <div class="lr">
        <div class="rl"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="modal-body">
            <!-- Project Details Go Here -->
            <h2>Project Name</h2>
            <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
              blanditiis
              dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
              cupiditate,
              maiores repudiandae, nostrum, reiciendis facere nemo!</p>
            <ul class="list-inline">
              <li>Date: January 2017</li>
              <li>Client: Threads</li>
              <li>Category: Illustration</li>
            </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
              <i class="fa fa-times"></i>
              Close Project</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */}

