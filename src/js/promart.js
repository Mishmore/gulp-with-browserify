class Promart {
  constructor() {
    this.endpoint = 'https://promartb2b.vtexcommercestable.com.br/api';
    this.headers = {
      "x-vtex-api-appKey": 'vtexappkey-promart-WETHWU',
      "x-vtex-api-appToken": 'JHVRMLGJJESCGKFBLQOWYSFJOWHUBDLIMYWOSNQGUCPCLVFYPIXEBLLRCMCQEMIFSJPHOQIXAHCVCDXTRIESGHHANELFLZCIUKJCFYJZAADTJPOYPJZVIQZKCPTJFCMA',
      "Content-Type": "application/json",
      // "Accept": "application/vnd.vtex.ds.v10+json"
    }
  }

  credit_line(id_lineacredito) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };

    const url = `${this.endpoint}/dataentities/LC/search/?_fields=lineaId,montoTotal,montoConsumido,montoDisponible&_where=id=${id_lineacredito}`;
    let request = new Request(url, config);


    return fetch(request)
  }
  category_client(id_customerClass) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };

    const url = `${this.endpoint}/dataentities/ES/search/?_fields=id,estadoNombre,estadoInstancia&_where=id=${id_customerClass}`;
    let request = new Request(url, config);


    return fetch(request)
  }

  getQuotationList(enterprise_id, filters) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };

    const url = `${this.endpoint}/dataentities/CZ/search/?_fields=id,solicitudId,userId,nombreProyecto,cotizacionProductos,tipoPago,estadoId,cotizacionInstancia,createdIn,cotizacionCaducidad,cotizacionFile,comentario,transaccionId,cotizacionCN,docOp,docNv,entregaId,fechaEntrega,entregaDetalle,tranckingId,cotizacionFilerespuesta,fileOC,fileFactura,fileDocEntrega,existsPMM&_where=userId=${enterprise_id} AND estadoId<>12`;
    let request = new Request(url, config);

    let response;

    return fetch(url, config)
  }

  empresas(id_empresa) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };
    const url = `${this.endpoint}/dataentities/EM/search/?_fields=id,lineaId,razonSocial,nombreComercial,ruc,telefono,customerClass,direccion,estadoId&_where=id=${id_empresa}`;
    let request = new Request(url, config);

    return fetch(request)
  }
  method_payment(id_empresa) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };
    const url = `${this.endpoint}/dataentities/EM/search/?_fields=id,lineaId,razonSocial,nombreComercial,ruc,telefono,customerClass,direccion,estadoId&_where=id=${id_empresa}`;
    let request = new Request(url, config);
    return fetch(request);
  }

  newQuote(data) {
    const config = {
      method: 'POST',
      headers: this.headers,
      async: true,
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      body: JSON.stringify({
        'userId': data.userId,
        'nombreProyecto': data.nombreProyecto,
        'cotizacionProductos': data.cotizacionProductos,
        'tipoPago': data.tipoPago,
        'estadoId': data.estadoId,
        'cotizacionInstancia': data.cotizacionInstancia,
        'cotizacionCaducidad': data.cotizacionCaducidad,
        'cotizacionFile': data.cotizacionFile,
        'comentario': data.comentario,
        'transaccionId': data.transaccionId,
        'cotizacionCN': data.cotizacionCN,
        'docOp': data.docOp,
        'docNv': data.docNv,
        'entregaId': data.entregaId,
        'entregaDetalle': data.entregaDetalle,
        'existsPMM': data.existsPMM
      }),
    };

    const url = `${this.endpoint}/dataentities/CZ/documents/`;
    let request = new Request(url, config);
    return fetch(request)
  }

  acceptQuote(quoteId, data) {
    const config = {
      method: 'PATCH',
      headers: this.headers,
      async: true,
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      body: JSON.stringify({
        'estadoId': data.estadoId,
        'existsPMM': "F"
      }),
    };

    const url = `${this.endpoint}/dataentities/CZ/documents/${quoteId}`;
    let request = new Request(url, config);
    return fetch(request)
  }

  modifiedQuote(quoteId, data) {
    const config = {
      method: 'PATCH',
      headers: this.headers,
      async: true,
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      body: JSON.stringify({
        'nombreProyecto': data.nombreProyecto,
        'tipoPago': data.tipoPago,
        'estadoId': data.estadoId,
        'cotizacionFile': data.cotizacionFile,
        'comentario': data.comentario,
        'entregaId': data.entregaId,
        'entregaDetalle': data.entregaDetalle,
        'existsPMM': "F"
      }),
    };

    const url = `${this.endpoint}/dataentities/CZ/documents/${quoteId}`;
    let request = new Request(url, config);
    return fetch(request)
  }

  uploadOc(quoteId, oc) {
    const config = {
      method: 'PATCH',
      headers: this.headers,
      async: true,
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      body: JSON.stringify({
        'id': quoteId,
        'fileOC': oc,
        'existsPMM': "F"
      }),
    };

    const url = `${this.endpoint}/dataentities/CZ/documents/${quoteId}`;
    let request = new Request(url, config);
    return fetch(request)
  }

  rejectQuote(quoteId, data) {
    const config = {
      method: 'PATCH',
      headers: this.headers,
      async: true,
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      body: JSON.stringify({
        'comentarioRechazo': data.comentarioRechazo,
        'estadoId': data.estadoId,
        'existsPMM': "F"
      }),
    };

    const url = `${this.endpoint}/dataentities/CZ/documents/${quoteId}`;
    let request = new Request(url, config);
    return fetch(request)
  }

  getQuotationDetail(id, userId) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };
    const url = `${this.endpoint}/dataentities/CZ/search/?_fields=id,userId,nombreProyecto,cotizacionProductos,tipoPago,estadoId,cotizacionInstancia,createdIn,cotizacionCaducidad,comentario,cotizacionFile,comentarioAgente,cotizacionFilerespuesta,transaccionId,cotizacionCN,docOp,docNv,entregaId,entregaDetalle,tranckingId,fechaFactura,fechaVehiculo,fechaCaminoPendiente,fechaEntrega,fileOP,existsPMM&_where=id=${id} AND userId=${userId}`;
    let request = new Request(url, config);

    return fetch(request);
  }

  getHistoryQuotation(statusId, userId) {
    const config = {
      method: 'GET',
      headers: this.headers,
      async: true,
      crossDomain: true,
    };
    const url = `${this.endpoint}/dataentities/CZ/search/?_fields=id,solicitudId,userId,nombreProyecto,cotizacionProductos,tipoPago,estadoId,cotizacionInstancia,createdIn,cotizacionCaducidad,cotizacionFile,comentario,transaccionId,cotizacionCN,docOp,docNv,fechaEntrega,entregaId,entregaDetalle,tranckingId,existsPMM&_where=estadoId=${statusId} AND userId=${userId}`;
    let request = new Request(url, config);

    return fetch(request);
  }
}
export default new Promart();