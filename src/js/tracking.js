import Promart from './promart';

const orderStates = [{
  id: '23',
  name: 'Retiro en tienda',
  slug: 'pickup',
  estados: [{
      id: '25',
      name: 'Facturado',
      step: 'first'
    },
    {
      id: '26',
      name: 'Pendiente de recojo',
      step: 'second'
    },
    {
      id: '27',
      name: 'Entregado',
      step: 'third'
    }
  ]
}, {
  id: '24',
  name: 'Despacho a domicilio',
  slug: 'delivery',
  estados: [{
      id: '28',
      name: 'Facturado',
      step: 'first',
    },
    {
      id: '29',
      name: 'Asignado al vehículo',
      step: 'second',
    },
    {
      id: '33',
      name: 'En camino',
      step: 'third',
    },
    {
      id: '34',
      name: 'Entregado',
      step: 'fourth',
    },
    {
      id: '35',
      name: 'Entrega parcial',
      step: 'fourth',
      type: 'Despacho a domicilio'
    },
    {
      id: '49',
      name: 'No entregado',
      step: 'fourth',
      type: 'Despacho a domicilio'
    }
  ]
}];

let quotationList = null;
$(document).ready(init);

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function init() {
  var userB2B = JSON.parse(Cookies.get('newB2B-User'));

  quotationList = Promart.getQuotationList(userB2B.id);
  quotationList
    .then(data => data.json())
    .then(res => {
      quotationList = res.sort((a, b) => b.id - a.id);
      quotationList = quotationList.filter(elm => elm.estadoId == 15)
      renderTrackingList(quotationList);
    })

  // GA
  $('.btn-tracking-detail').on('click', () => ga('send', 'event', 'Tracking de pedidos', 'Pedido', 'Ver Detalle'));
  $('.btn-new-quotation').on('click', () => ga('send', 'event', 'Tracking de pedidos', 'Boton', 'Nueva Cotizacion'));
};

function renderTrackingList(data) {
  const container = $('.order-item-wrapper');
  container.empty();

  data.map(elm => {
    let fechaEntrega = '-';
    let expiresIn = '-';
    let metodo = {
      name: 'Facturado',
      step: 'first'
    };
    let type = '-';

    if (elm.cotizacionCaducidad && elm.cotizacionCaducidad != '1900-01-01T00:00:00') expiresIn = moment(elm.cotizacionCaducidad).format('DD/MM/YYYY');
    if (elm.fechaEntrega && elm.fechaEntrega != '1900-01-01T00:00:00') fechaEntrega = moment(elm.fechaEntrega).format('DD/MM/YYYY');
    if (elm.entregaId && elm.tranckingId) {
      type = orderStates.find(item => item.id == elm.entregaId);
      metodo = orderStates.find(item => item.id == elm.entregaId).estados.find(estado => estado.id == elm.tranckingId);
    }

    let steps = '';
    type.estados.slice(0, 4).map(elm => steps += `<div class="${elm.step}"></div>`);

    console.log(data);

    let item = `
    <a class="row order-item ${type.slug} btn-tracking-detail" href="/pedidos-realizados/tracking-de-pedidos/detalle?id=${elm.id}">
    <div class="col-md-3"> <small>Nombre del proyecto</small>
    <p>${elm.nombreProyecto ? elm.nombreProyecto : '-'}</p>
    </div>
    <div class="col-md-2"> <small>Fecha de entrega</small>
    <p class="d-flex">${fechaEntrega}</p>
    </div>
    <div class="col-md-3"> <small>Tipo de recojo</small>
    <p class="d-flex">${type.name}</p>
    </div>
    <div class="col-md-3"> <small>Estado</small>
    <p class="d-flex">
    <div class="range ${metodo.step} range-${metodo.name.toLowerCase().replace(/ /g, '-')}">
    <div class="range-fill"></div>
    ${steps}
    </div>
    </p>
    </div>
    <div class="arrow-btn d-flex justify-content-center flex-column align-items-center"> <i class="fas fa-angle-right"></i></div>
    </a>`;

    container.append(item);
  });

}