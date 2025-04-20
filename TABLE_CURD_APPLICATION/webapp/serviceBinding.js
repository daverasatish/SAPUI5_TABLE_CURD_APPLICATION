function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZSTDATA_GATEWAY_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}