console.log('Starting up');

$(init)
var $elPortfolioItem

function init(){
  renderProjs()
  var a = $('.portfolio-item')
  console.log(a);
}


function renderProjs(){
  var strHTML = ''
  const elProjectsContainer = $('.projects')
  var projects = getProjects()
  console.log(projects);
  
  var counter = 0
  projects.forEach((proj)=>{
    console.log(proj.name);
    counter++
    console.log(proj.id);
    strHTML+= `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${counter}">
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
    console.log($elPortfolioItem);
  
  })
    elProjectsContainer.html(strHTML)
}
