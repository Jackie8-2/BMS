var _fileIncluded_dataset = true;
var _maxAutoGenID = 0;
function _getAutoGenID() {
	_maxAutoGenID++;
	return "__" + _maxAutoGenID;
};
function _downloadData(dataset, pageSize, pageIndex) {
	try {
		if (dataset.sessionKey) {
			var result = new Object();
			return result;
		}
	} catch (e) {
		processException(e);
	}
};
function getDatasetByID(ID) {
	for (var i = 0; i < _array_dataset.length; i++) {
		if (_array_dataset[i].id == ID) {
			return _array_dataset[i];
		}
	}
};
function getDatasets() {
	return _array_dataset;
};
function setElementDataset(_as, dataset) {
	var _p = getDatasetByID(dataset);
	_as.dataset = _p;
	if (_p) {
		var array = _p.editors;
		if (!array) {
			array = new pArray();
			_p.editors = array;
		}
		pArray_ex_insert(array, _as);
	}
};
function _dataset_getField(fields, fieldName) {
	var _aY = null;
	if (typeof (fieldName) == "number") {
		_aY = fields[fieldName];
	} else if (typeof (fieldName) == "string") {
		var _bE = fields["_index_" + fieldName.toLowerCase()];
		if (!isNaN(_bE))
			_aY = fields[_bE];
	}
	return _aY;
};
function dataset_getField(fieldName) {
	var dataset = this;
	return _dataset_getField(dataset.fields, fieldName);
};
function appendFromDataString(dataset, _ae, recordStr, init) {
	if (!recordStr)
		return;
	var fields = null;
	if (_ae) {
		fields = _ae.split(",");
	}
	var _aZ = recordStr.split(";");
	for (var i = 0; i < _aZ.length; i++) {
		var record = _aZ[i].split(",");
		for (var j = 0; j < record.length; j++) {
			record[j] = getDecodeStr(record[j]);
		}
		var _bT = new Array();
		if (fields != null) {
			for (var j = 0; j < fields.length; j++) {
				var index;
				var _aY = _dataset_getField(dataset.fields, fields[j]
						.toLowerCase());
				index = dataset.fields["_index_" + fields[j].toLowerCase()];
				_bT[index] = record[j];
			}
			record = _bT;
		}
		pArray_insert(dataset, "end", null, record);
		if (init) {
			initRecord(record, dataset);
		}
	}
};
function transferToDataString(dataset) {
	var result = "";
	var i = 0;
	var record = dataset.getFirstRecord();
	while (record) {
		if (i != 0)
			result += ";";
		for (var j = 0; j < dataset.fields.fieldCount; j++) {
			if (j != 0)
				result += ",";
			result += getEncodeStr(record.getString(j));
		}
		record = record.getNextRecord();
		i++;
	}
	return result;
};
function createDataset(ID, _ae, recordStr) {
	var dataset = new pArray();
	dataset.fields = new Array();
	dataset.parameters = _createParameters();
	dataset.updateItems = new Array();
	dataset.fields.fieldCount = 0;
	dataset.addField = dataset_addField;
	dataset.pageSize = 9999;
	dataset.pageCount = 1;
	dataset.pageIndex = 1;
	dataset.autoLoadPage = true;
	dataset.loadCompleted = false;
	dataset._saveOldValue = record_saveOldValue;
	dataset._getValue = record_getValue;
	dataset._getString = record_getString;
	dataset._getViewString = record_getViewString;
	dataset._setValue = record_setValue;
	dataset._getCurValue = record_getCurValue;
	dataset._setCurValue = record_setCurValue;
	dataset._getOldValue = record_getOldValue;
	dataset._setOldValue = record_setOldValue;
	dataset._getPrevRecord = record_getPrevRecord;
	dataset._getNextRecord = record_getNextRecord;
	dataset.getField = dataset_getField;
	dataset.getValue = dataset_getValue;
	dataset.getString = dataset_getString;
	dataset.getViewString = dataset_getViewString;
	dataset.setValue = dataset_setValue;
	dataset.setValue2 = dataset_setValue_2;
	dataset.getCurValue = dataset_getCurValue;
	dataset.setCurValue = dataset_setCurValue;
	dataset.getOldValue = dataset_getOldValue;
	dataset.setOldValue = dataset_setOldValue;
	dataset.disableControls = dataset_disableControls;
	dataset.enableControls = dataset_enableControls;
	dataset.disableEvents = dataset_disableEvents;
	dataset.enableEvents = dataset_enableEvents;
	dataset.refreshControls = dataset_refreshControls;
	dataset.setRecord = dataset_setRecord;
	dataset.setReadOnly = dataset_setReadOnly;
	dataset.setAllFieldsReadOnly = dataset_setAllFieldsReadOnly;
	dataset.setFieldReadOnly = dataset_setFieldReadOnly;
	dataset.getFirstRecord = dataset_getFirstRecord;
	dataset.getLastRecord = dataset_getLastRecord;
	dataset.move = dataset_move;
	dataset.movePrev = dataset_movePrev;
	dataset.moveNext = dataset_moveNext;
	dataset.moveFirst = dataset_moveFirst;
	dataset.moveLast = dataset_moveLast;
	dataset.find = dataset_find;
	dataset.findRecordByUUID = dataset_findRecordByUUID;
	dataset.locate = dataset_locate;
	dataset.updateRecord = dataset_updateRecord;
	dataset.cancelRecord = dataset_cancelRecord;
	dataset.insertRecord = dataset_insertRecord;
	dataset.deleteRecord = dataset_deleteRecord;
	dataset.copyRecord = dataset_copyRecord;
	dataset.loadPage = dataset_loadPage;
	dataset.loadDetail = dataset_loadDetail;
	dataset.isPageLoaded = dataset_isPageLoaded;
	dataset.moveToPage = dataset_moveToPage;
	dataset.setMasterDataset = dataset_setMasterDataset;
	dataset.flushData = dataset_flushData;
	dataset.clearData = dataset_clearData;
	dataset.sort = dataset_sort;
	dataset.setParameter = dataset_setParameter;
	dataset.getParameter = dataset_getParameter;
	dataset.getParameterName = dataset_getParameterName;
	dataset.getParameterCount = dataset_getParameterCount;
	dataset.getRealRecordCounts = dataset_getRealRecordCounts;
	dataset.toJson = dataset_toJson;
	if (ID) {
		dataset.id = ID;
		_array_dataset[_array_dataset.length] = dataset;
	}
	if (_ae) {
		var fields = _ae.split(",");
		for (var i = 0; i < fields.length; i++) {
			dataset.addField(fields[i]);
		}
	}
	appendFromDataString(dataset, null, recordStr);
	return dataset;
};
function dataset_setParameter(name, value, dataType) {
	this.parameters.setParameter(name, value, dataType);
};
function dataset_getParameter(name) {
	return this.parameters.getParameter(name);
};
function dataset_getParameterName(index) {
	return this.parameters.getParameter(index);
};
function dataset_getParameterCount() {
	var dataset = this;
	return dataset.parameters.length;
};
function dataset_addField(name, dataType) {
	var dataset = this;
	try {
		if (getValidStr(name) == "")
			throw constErrEmptyFieldName;
		if (dataset.prepared)
			throw constErrAddDataField;
		var _Y = name.toLowerCase();
		var _aY = new Object;
		var i = dataset.fields.length;
		dataset.fields["_index_" + _Y] = i;
		dataset.fields[i] = _aY;
		dataset.fields.fieldCount++;
		_aY.index = i;
		_aY.dataset = dataset;
		_aY.fields = dataset.fields;
		_aY.name = _Y;
		_aY.label = name;
		_aY.fieldName = name;
		_aY.dataType = dataType;
		switch (dataType) {
		case "string": {
			_aY.editorType = "text";
			_aY.align = "left";
			_aY.vAlign = "top";
			break;
		}
		case "byte":
			;
		case "short":
			;
		case "int":
			;
		case "long":
			;
		case "float":
			;
		case "double":
			;
		case "currency":
			;
		case "bigdecimal": {
			_aY.editorType = "text";
			_aY.align = "right";
			_aY.vAlign = "top";
			break;
		}
		case "boolean": {
			_aY.editorType = "checkbox";
			_aY.align = "middle";
			_aY.vAlign = "middle";
			break;
		}
		case "predate":
			;
		case "postdate":
			;
		case "date": {
			_aY.editorType = "text";
			_aY.align = "left";
			_aY.vAlign = "top";
			_aY.size = 10;
			break;
		}
		case "time": {
			_aY.editorType = "text";
			_aY.align = "left";
			_aY.vAlign = "top";
			_aY.size = 8;
			break;
		}
		case "timestamp": {
			_aY.editorType = "text";
			_aY.align = "left";
			_aY.vAlign = "top";
			_aY.size = 19;
			break;
		}
		default: {
			_aY.editorType = "text";
			_aY.align = "left";
			_aY.vAlign = "top";
			break;
		}
		}
		return _aY;
	} catch (e) {
		processException(e);
	}
};
function _addUpdateItem(dataset) {
	var item = new Object();
	dataset.updateItems[dataset.updateItems.length] = item;
	return item;
};
function initFieldArray(dataset, fields) {
	var fieldCount = fields.fieldCount;
	fields.dataset = dataset;
	for (var i = 0; i < fieldCount; i++) {
		if (dataset.id) {
			if (fields[i].id && typeof (_J) != "undefined") {
				var root = _J[fields[i].id];
				if (root) {
					var _ay = root.length;
					for (var j = 0; j < _ay; j++)
						eval("fields[i]." + root[j].property
								+ "=getDecodeStr(root[j].value)");
				}
			}
		}
		fields[fieldCount + i] = new Object;
		fields[fieldCount + i].name = "_cur_" + fields[i].name;
		fields[fieldCount + i].dataType = fields[i].dataType;
		fields["_index__cur_" + fields[i].name] = fieldCount + i;
		fields[fieldCount * 2 + i] = new Object;
		fields[fieldCount * 2 + i].name = "_old_" + fields[i].name;
		fields[fieldCount * 2 + i].dataType = fields[i].dataType;
		fields["_index__old_" + fields[i].name] = fieldCount * 2 + i;
		fields[i].readOnly = isTrue(fields[i].readOnly);
		fireUserEvent(getElementEventName(dataset, "onInitField"), [ dataset,
				fields[i] ]);
	}
};
function initRecord(record, dataset, _bw) {
	record.dataset = dataset;
	record.fields = dataset.fields;
	record.recordState = "none";
	record.pageIndex = dataset.pageIndex;
	record.visible = true;
	record.saveOldValue = dataset._saveOldValue;
	record.getValue = dataset._getValue;
	record.getString = dataset._getString;
	record.getViewString = dataset._getViewString;
	record.setValue = dataset._setValue;
	record.getCurValue = dataset._getCurValue;
	record.setCurValue = dataset._setCurValue;
	record.getOldValue = dataset._getOldValue;
	record.setOldValue = dataset._setOldValue;
	record.getPrevRecord = dataset._getPrevRecord;
	record.getNextRecord = dataset._getNextRecord;
	record.getJsonValue = _record_getJsonValue;
	if (!_bw)
		record.saveOldValue();
};
function initDataset(dataset) {
	if (dataset.prepared)
		return;
	dataset.disableControlCount = 1;
	dataset.disableEventCount = 1;
	try {
		if (dataset.id && typeof (_J) != "undefined") {
			var root = _J[dataset.id];
			if (root) {
				var _ay = root.length;
				for (var i = 0; i < _ay; i++)
					eval("dataset." + root[i].property
							+ "=getDecodeStr(root[i].value)");
			}
		}
		dataset.window = window;
		dataset.bof = true;
		dataset.eof = true;
		dataset.state = "none";
		dataset.readOnly = isTrue(dataset.readOnly);
		dataset.sortFields = "";
		dataset.loadedPage = new Array();
		if (dataset.pageIndex > 0)
			dataset.loadedPage[dataset.pageIndex - 1] = true;
		fireUserEvent(getElementEventName(dataset, "onInitDataset"),
				[ dataset ]);
		dataset.setReadOnly(isTrue(dataset.readOnly));
		initFieldArray(dataset, dataset.fields);
		var record = dataset.firstUnit;
		while (record) {
			initRecord(record, dataset);
			record = record.nextUnit;
		}
		dataset.prepared = true;
	} finally {
		dataset.disableControlCount = 0;
		dataset.disableEventCount = 0;
	}
	if (dataset.pageIndex == 1 || !dataset.autoLoadPage) {
		dataset.moveFirst();
	} else {
		dataset.setRecord(dataset.getFirstRecord());
	}
	if (!dataset.record) {
		if (dataset.insertOnEmpty && !dataset.readOnly) {
			dataset.insertRecord();
		}
	}
	fireUserEvent(getElementEventName(dataset, "afterInitDataset"), [ dataset ]);
};
function isFieldEditable(dataset, _aY) {
	if (_aY) {
		var _bm = !(dataset.readOnly || _aY.readOnly);
		if (dataset.record) {
			var recordState = dataset.record.recordState;
			_bm = (_bm && !((recordState == "none" || recordState == "modify") && _aY.valueProtected));
		}
	} else {
		var _bm = true;
	}
	return _bm;
};
function _dataset_setMasterDataset(dataset, masterDataset, referencesString) {
	if (dataset.masterDataset) {
		var array = dataset.masterDataset.detailDatasets;
		if (array)
			pArray_ex_delete(array, dataset);
	}
	if (typeof (masterDataset) == "string")
		masterDataset = getDatasetByID(masterDataset);
	dataset.masterDataset = masterDataset;
	if (masterDataset) {
		var array = masterDataset.detailDatasets;
		if (!array) {
			array = new pArray();
			masterDataset.detailDatasets = array;
		}
		pArray_ex_insert(array, dataset);
		var _bg = referencesString.split(";");
		var _aY, fieldName;
		dataset.referencesString = referencesString;
		dataset.references = new Array();
		for (var i = 0; i < _bg.length; i++) {
			var index = _bg[i].indexOf("=");
			dataset.references[i] = new Object();
			if (index >= 0) {
				fieldName = _bg[i].substr(0, index);
			} else {
				fieldName = _bg[i];
			}
			_aY = masterDataset.getField(fieldName);
			if (_aY) {
				dataset.references[i].masterField = _aY.name;
				dataset.references[i].masterIndex = _aY.index;
			} else
				throw constErrCantFindMasterField.replace("%s", fieldName);
			if (index >= 0) {
				fieldName = _bg[i].substr(index + 1);
			} else {
				fieldName = _bg[i];
			}
			_aY = dataset.getField(fieldName);
			if (_aY) {
				dataset.references[i].detailField = _aY.name;
				dataset.references[i].detailIndex = _aY.index;
			} else {
				throw constErrCantFindDetailField.replace("%s", fieldName);
			}
		}
		delete _bg;
		delete dataset.loaded_detail;
		dataset.loaded_detail = new Array;
		masterDataset.loadDetail();
	}
};
function dataset_setMasterDataset(masterDataset, referencesString) {
	var dataset = this;
	try {
		_dataset_setMasterDataset(dataset, masterDataset, referencesString);
	} catch (e) {
		processException(e);
	}
};
function _dataset_loadDetail(dataset) {
	if (dataset.detailDatasets) {
		var unit = dataset.detailDatasets.firstUnit;
		while (unit && unit.data) {
			var _aB = unit.data;
			if (dataset.record && dataset.record.recordState != "insert"
					&& dataset.record.recordState != "new") {
				try {
					validateDatasetCursor(_aB);
					if (_aB.bof && _aB.eof) {
						var _aw = false;
						if (dataset.record) {
							var _av = "";
							for (var i = 0; i < _aB.references.length; i++) {
								_av += dataset.record[_aB.references[i].masterIndex];
							}
							for (var i = 0; i < _aB.loaded_detail.length; i++) {
								if (_aB.loaded_detail[i] == _av) {
									_aw = true;
									break;
								}
							}
						}
						if (!_aw) {
							var _ag = false;
							var _aJ = fireDatasetEvent(_aB, "beforeLoadDetail",
									[ _aB, dataset ]);
							if (_aJ)
								throw _aJ;
							if (_aB.references.length > 0) {
								for (var i = 0; i < _aB.references.length; i++) {
									_aB
											.setParameter(
													_aB.references[i].detailField,
													dataset
															.getValue(_aB.references[i].masterIndex));
									var _ap = dataset
											.getValue(_aB.references[i].masterIndex);
									var dataType = dataset
											.getField(_aB.references[i].masterIndex).dataType;
									if (dataType == "timestamp"
											|| dataType == "date"
											|| dataType == "time"
											|| dataType == "predate"
											|| dataType == "postdate") {
										_aB.setParameter(
												_aB.references[i].detailField,
												formatDateTime(_ap, dataType));
									}
								}
								var result = _downloadData_new(_aB);
								if (result && result.recordStr) {
									appendFromDataString(_aB, result._ae,
											result.recordStr, true);
								}
								delete result;
							}
							_aB.loaded_detail[_aB.loaded_detail.length] = _av;
						}
					}
				} catch (e) {
					processException(e);
				}
			}
			_aB.refreshControls();
			_aB.moveFirst();
			unit = unit.nextUnit;
		}
	}
};
function dataset_loadDetail() {
	var dataset = this;
	try {
		_dataset_loadDetail(dataset);
	} catch (e) {
		processException(e);
	}
};
function dataset_isPageLoaded(pageIndex) {
	var dataset = this;
	return dataset.loadedPage[pageIndex - 1];
};
function _dataset_loadPage(dataset, pageIndex) {
	if (!dataset.autoLoadPage || pageIndex < 1 || pageIndex > dataset.pageCount
			|| dataset.isPageLoaded(pageIndex))
		return;
	if (dataset.masterDataset)
		throw constErrLoadPageOnDetailDataset;
	if (dataset.sortFields)
		throw constErrLoadPageAfterSort;
	var result = _downloadData_new(dataset, dataset.pageSize, pageIndex);
	if (result && result.recordStr) {
		var _bF = new pArray();
		_bF.fields = dataset.fields;
		appendFromDataString(_bF, result._ae, result.recordStr);
		var record = _bF.lastUnit;
		while (record) {
			initRecord(record, dataset);
			record.pageIndex = pageIndex;
			record = record.prevUnit;
		}
		var _ba = false;
		var record = dataset.lastUnit;
		while (record) {
			if (record.pageIndex < pageIndex) {
				pArray_insertArray(dataset, "after", record, _bF);
				_ba = true;
				break;
			}
			record = record.prevUnit;
		}
		if (!_ba)
			pArray_insertArray(dataset, "begin", null, _bF);
		delete _bF;
		dataset.loadedPage[pageIndex - 1] = true;
		dataset.refreshControls();
	}
	delete result;
};
function dataset_loadPage(pageIndex) {
	try {
		var dataset = this;
		_dataset_loadPage(dataset, pageIndex);
	} catch (e) {
		processException(e);
	}
};
function _dataset_clearData(dataset) {
	dataset.disableControls();
	var autoLoadPage = dataset.autoLoadPage;
	dataset.autoLoadPage = false;
	try {
		dataset.modified = false;
		if (dataset.loaded_detail)
			delete dataset.loaded_detail;
		if (dataset.loadedPage)
			delete dataset.loadedPage;
		dataset.loaded_detail = new Array();
		dataset.loadedPage = new Array();
		if (dataset.pageIndex > 0)
			dataset.loadedPage[dataset.pageIndex - 1] = true;
		pArray_clear(dataset);
		dataset.moveFirst();
	} finally {
		dataset.modified = true;
		dataset.enableControls();
		dataset.autoLoadPage = autoLoadPage;
	}
};
function dataset_clearData() {
	try {
		var dataset = this;
		_dataset_clearData(dataset);
	} catch (e) {
		processException(e);
	}
};
function freeDataset(dataset) {
	if (dataset.detailDatasets)
		pArray_clear(dataset.detailDatasets);
	if (dataset.editors)
		pArray_clear(dataset.editors);
	delete dataset.references;
	pArray_clear(dataset.fields);
	dataset.clearData();
	delete dataset;
};
function _dataset_flushData(dataset, pageIndex) {
	dataset.disableControls();
	try {
		dataset.clearData();
		var result = _downloadData(dataset, dataset.pageSize, pageIndex);
		if (result) {
			if (result.recordStr) {
				appendFromDataString(dataset, result._ae, result.recordStr,
						true);
			}
			dataset.pageIndex = result.pageIndex;
			dataset.pageCount = result.pageCount;
		}
		delete result;
	} finally {
		dataset.enableControls();
		dataset.loadDetail();
	}
};
function dataset_flushData(pageIndex) {
	try {
		var dataset = this;
		_dataset_flushData(dataset, pageIndex);
	} catch (e) {
		processException(e);
	}
};
function dataset_moveToPage(pageIndex) {
	try {
		var dataset = this;
		if (!dataset.isPageLoaded(pageIndex))
			_dataset_loadPage(dataset, pageIndex);
		var record = dataset.getFirstRecord();
		while (record) {
			if (record.pageIndex >= pageIndex) {
				_dataset_setRecord(dataset, record);
				break;
			}
			record = record.getNextRecord();
		}
	} catch (e) {
		processException(e);
	}
};
function record_saveOldValue() {
	var record = this;
	var fieldCount = record.fields.fieldCount;
	for (var i = 0; i < fieldCount; i++) {
		record[fieldCount + i] = record[i];
		record[fieldCount * 2 + i] = record[i];
	}
};
function _dataset_sort(dataset, fields) {
	function _D(_q, _R, _T, _N) {
		function _C(record, _g) {
			if (_R.length > 0) {
				var _aj, _aO;
				for (var i = 0; i < _R.length; i++) {
					if (_field[i].ascend) {
						_aj = 1;
						_aO = -1;
					} else {
						_aj = -1;
						_aO = 1;
					}
					if (record.getValue(_R[i].index) > _g[i]) {
						return _aj;
					} else if (record.getValue(_R[i].index) < _g[i]) {
						return _aO;
					}
				}
			} else {
				if (record.recordno > _g[0]) {
					return 1;
				} else if (record.recordno < _g[0]) {
					return -1;
				}
			}
			return 0;
		}
		;
		var _bK = _T;
		var _az = _N;
		var mid = getInt((_bK + _az) / 2);
		var _at = new Array();
		if (_R.length > 0) {
			for (var i = 0; i < _R.length; i++)
				_at[i] = _q[mid].getValue(_R[i].index);
		} else {
			_at[0] = _q[mid].recordno;
		}
		do {
			while (_C(_q[_bK], _at) < 0)
				_bK++;
			while (_C(_q[_az], _at) > 0)
				_az--;
			if (_bK <= _az) {
				var tmp = _q[_bK];
				_q[_bK] = _q[_az];
				_q[_az] = tmp;
				_bK++;
				_az--;
			}
		} while (_bK <= _az)
		if (_az > _T)
			_D(_q, _R, _T, _az);
		if (_N > _bK)
			_D(_q, _R, _bK, _N);
	}
	;
	var _field = new Array();
	if (fields) {
		var _ab = fields.split(",");
		for (var i = 0; i < _ab.length; i++) {
			_field[i] = new Object();
			_field[i].ascend = true;
			var _aA = _ab[i].substring(0, 1);
			var fieldName;
			if (_aA == "+" || _aA == "-") {
				if (_aA == "-")
					_field[i].ascend = false;
				fieldName = _ab[i].substring(1, _ab[i].length);
			} else {
				fieldName = _ab[i];
			}
			for (var j = 0; j < dataset.fields.fieldCount; j++) {
				if (compareText(fieldName, dataset.fields[j].name)) {
					_field[i].index = j;
					break;
				}
			}
		}
	}
	function _Z(_q, _T, _N) {
		function _C(_aS, _be) {
			var _aV = getElementEventName(dataset, "onCompareRecord");
			if (isUserEventDefined(_aV)) {
				return fireUserEvent(_aV, [ _aS.dataset, _aS, _be ]);
			}
		}
		;
		var _bK = _T;
		var _az = _N;
		var _ao = _q[getInt((_bK + _az) / 2)];
		do {
			while (_C(_q[_bK], _ao) < 0)
				_bK++;
			while (_C(_q[_az], _ao) > 0)
				_az--;
			if (_bK <= _az) {
				var tmp = _q[_bK];
				_q[_bK] = _q[_az];
				_q[_az] = tmp;
				_bK++;
				_az--;
			}
		} while (_bK <= _az)
		if (_az > _T)
			_Z(_q, _T, _az);
		if (_N > _bK)
			_Z(_q, _bK, _N);
	}
	;
	var _field = new Array();
	if (fields) {
		if (fields != "#custom") {
			var _ab = fields.split(",");
			for (var i = 0; i < _ab.length; i++) {
				_field[i] = new Object();
				_field[i].ascend = true;
				var _aA = _ab[i].substring(0, 1);
				var fieldName;
				if (_aA == "+" || _aA == "-") {
					if (_aA == "-")
						_field[i].ascend = false;
					fieldName = _ab[i].substring(1, _ab[i].length);
				} else {
					fieldName = _ab[i];
				}
				for (var j = 0; j < dataset.fields.fieldCount; j++) {
					if (compareText(fieldName, dataset.fields[j].name)) {
						_field[i].index = j;
						break;
					}
				}
			}
		}
	}
	if (!dataset.firstUnit)
		return;
	var _bH = new Array();
	try {
		var record = dataset.firstUnit;
		var i = 0;
		while (record) {
			_bH[i++] = record;
			if (!dataset.sortFields)
				record.recordno = i;
			record = record.nextUnit;
		}
		dataset.sortFields = fields;
		if (fields != "#custom") {
			_D(_bH, _field, 0, _bH.length - 1);
		} else {
			_Z(_bH, 0, _bH.length - 1);
		}
		dataset.firstUnit = null;
		dataset.lastUnit = null;
		dataset.length = 0;
		for (var i = 0; i < _bH.length; i++) {
			pArray_insert(dataset, "end", null, _bH[i]);
		}
		dataset.refreshControls();
	} finally {
		delete _bH;
		for (var i = 0; i < _field.length; i++)
			delete _field[i];
		delete _field;
	}
};
function dataset_sort(fields) {
	try {
		var dataset = this;
		_dataset_sort(dataset, fields);
	} catch (e) {
		processException(e);
	}
};
function dataset_setReadOnly(readOnly) {
	var dataset = this;
	dataset.readOnly = readOnly;
	_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset);
};
function dataset_setAllFieldsReadOnly(readOnly) {
	var dataset = this;
	for (var i = 0; i < dataset.fields.length; i++) {
		if (typeof (dataset.fields[i].fieldName) != "undefined") {
			dataset_setFieldReadOnly2(dataset, dataset.fields[i].fieldName,
					readOnly);
		}
	}
};
function dataset_setFieldReadOnly(fieldName, readOnly) {
	var dataset = this;
	var _aY = dataset.getField(fieldName);
	if (_aY) {
		_aY.readOnly = readOnly;
		_broadcastFieldMsg(_notifyFieldStateChanged, dataset, dataset.record,
				_aY);
	} else
		throw constErrCantFindField.replace("%s", dataset.id + "." + fieldName);
};
function dataset_setFieldReadOnly2(dataset, fieldName, readOnly) {
	var _bu = dataset.getField(fieldName);
	if (_bu) {
		_bu.readOnly = readOnly;
		_broadcastFieldMsg(_notifyFieldStateChanged, dataset, dataset.record,
				_bu);
	} else
		throw constErrCantFindField.replace("%s", dataset.id + "." + fieldName);
};
function fireDatasetEvent(dataset, _aW, param) {
	if (dataset.disableEventCount > 0)
		return;
	var result;
	result = fireUserEvent(getElementEventName(dataset, _aW), param);
	return result;
};
function dataset_isRecordValid(record) {
	if (!record)
		return false;
	else {
		var result = (record.recordState != "delete"
				&& record.recordState != "discard" && record.visible);
		var dataset = record.dataset;
		var masterDataset = dataset.masterDataset;
		if (result) {
			if (masterDataset) {
				if (!masterDataset.record)
					return false;
				for (var i = 0; i < dataset.references.length; i++) {
					var _ap = getStringValue(masterDataset
							.getCurValue(dataset.references[i].masterIndex));
					var _bD = getStringValue(getTypedValue(
							record[dataset.references[i].detailIndex],
							dataset.getField(dataset.references[i].detailIndex).dataType));
					if (compareText(_ap, _bD) == false) {
						result = false;
						break;
					}
				}
			}
			if (dataset.filtered
					&& !(record == dataset.record && dataset.state != "none")) {
				var _aV = getElementEventName(dataset, "onFilterRecord");
				if (isUserEventDefined(_aV)) {
					if (!fireUserEvent(_aV, [ dataset, record ]))
						result = false;
				}
			}
		}
		return result;
	}
};
function dataset_setBofnEof(dataset, _j, _aL) {
	if (dataset.bof != _j || dataset.eof != _aL) {
		dataset.bof = _j;
		dataset.eof = _aL;
		_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset,
				dataset.record);
	}
};
function _do_dataset_setRecord(dataset, record) {
	if (dataset.record != record) {
		if (dataset.record) {
			_dataset_updateRecord(dataset);
		}
		if (dataset.detailDatasets) {
			var unit = dataset.detailDatasets.firstUnit;
			while (unit) {
				var _bp = unit.data;
				_dataset_updateRecord(_bp);
				unit = unit.nextUnit;
			}
		}
		var _aJ = fireDatasetEvent(dataset, "beforeScroll", [ dataset ]);
		if (_aJ)
			throw _aJ;
		dataset.record = record;
		dataset.modified = false;
		if (dataset.disableControlCount < 1)
			dataset.loadDetail();
		fireDatasetEvent(dataset, "afterScroll", [ dataset ]);
		_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset, record);
		_broadcastDatasetMsg(_notifyDatasetCursorChanged, dataset, record);
	}
};
function _dataset_setRecord(dataset, record) {
	_do_dataset_setRecord(dataset, record);
	if (record) {
		dataset_setBofnEof(dataset, false, false);
		dataset_setBofnEof(dataset, false, false);
	}
};
function dataset_setRecord(record) {
	try {
		_dataset_setRecord(this, record);
	} catch (e) {
		processException(e);
	}
};
function validateDatasetCursor(dataset) {
	var _al = false, _bO = false;
	var _H = (dataset.record) ? dataset.record : dataset.firstUnit;
	var record = _H;
	while (record) {
		if (dataset_isRecordValid(record)) {
			_do_dataset_setRecord(dataset, record);
			_bO = true;
			break;
		}
		record = _record_getPrevRecord(record);
	}
	var record = _H;
	while (record) {
		if (dataset_isRecordValid(record)) {
			_do_dataset_setRecord(dataset, record);
			_al = true;
			break;
		}
		record = _record_getNextRecord(record);
	}
	if (!_bO && !_al)
		_do_dataset_setRecord(dataset, null);
	dataset_setBofnEof(dataset, (!_bO), (!_al));
};
function dataset_setState(dataset, state) {
	dataset.state = state;
	_broadcastDatasetMsg(_notifyDatasetStateChanged, dataset, dataset.record);
	fireDatasetEvent(dataset, "onStateChanged", [ dataset ]);
};
function dataset_getState(dataset) {
	return dataset.state;
};
function _record_getValue(record, fieldName) {
	var dataset = record.dataset;
	var fields = record.fields;
	var _bE = -1;
	var result;
	if (typeof (fieldName) == "number") {
		_bE = fieldName;
	} else if (typeof (fieldName) == "string") {
		_bE = fields["_index_" + fieldName.toLowerCase()];
	}
	var _aY = fields[_bE];
	if (typeof (_aY) == "undefined") {
		throw constErrCantFindField.replace("%s", record.dataset.id + "."
				+ fieldName);
	}
	result = getTypedValue(record[_bE], _aY.dataType);
	return result;
};
function record_getValue(fieldName) {
	try {
		return _record_getValue(this, fieldName);
	} catch (e) {
		processException(e);
	}
};
function _record_getJsonValue(fieldName) {
	var record = this;
	var result = "";
	var _aY = record.dataset.getField(fieldName);
	if (_aY) {
		var value = record.getValue(fieldName);
		switch (_aY.dataType) {
		case "string": {
			result = getValidStr(value);
			break;
		}
		case "byte":
			;
		case "short":
			;
		case "int":
			;
		case "long": {
			if (!isNaN(value))
				result = value + "";
			break;
		}
		case "float":
			;
		case "double":
			;
		case "currency":
			;
		case "bigdecimal": {
			if (!isNaN(value))
				result = formatFloat(value, _aY.scale);
			break;
		}
		case "predate":
			;
		case "postdate":
			;
		case "date": {
			if (typeof (value) == "object" && !isNaN(value)) {
				result = value.format(_VIEW_DATE_PATTERN);
			} else {
				result = "";
			}
			break;
		}
		case "time":
			;
			{
				if (typeof (value) == "object" && !isNaN(value)) {
					result = value.format(_VIEW_TIME_PATTERN);
				} else {
					result = "";
				}
				break;
			}
		case "timestamp": {
			if (typeof (value) == "object" && !isNaN(value)) {
				result = value.format(_VIEW_DATETIME_PATTERN);
			} else {
				result = "";
			}
			break;
		}
		case "boolean":
			;
		default: {
			result = getValidStr(value);
			break;
		}
		}
	}
	return result;
};
function record_getString(fieldName) {
	var record = this, _aY, result = "";
	var _aY = record.dataset.getField(fieldName);
	if (_aY) {
		var value = record.getValue(fieldName);
		switch (_aY.dataType) {
		case "string": {
			result = getValidStr(value);
			break;
		}
		case "byte":
			;
		case "short":
			;
		case "int":
			;
		case "long": {
			if (!isNaN(value))
				result = value + "";
			break;
		}
		case "float":
			;
		case "double":
			;
		case "currency":
			;
		case "bigdecimal": {
			if (!isNaN(value))
				result = formatFloat(value, _aY.scale);
			break;
		}
		case "predate":
			;
		case "postdate":
			;
		case "date":
			;
		case "time":
			;
		case "timestamp": {
			result = formatDateTime(value, _aY.dataType);
			break;
		}
		case "boolean":
			;
		default: {
			result = getValidStr(value);
			break;
		}
		}
	}
	try {
		if (typeof (_aY.tag) != "undefined" && _aY.tag != ""
				&& _aY.tag == "selectName" && value == "") {
			result = getFieldSelectNameValue(record, _aY);
		} else if (typeof (_aY.tag) != "undefined" && _aY.tag != ""
				&& _aY.tag == "radioName" && value == "") {
			result = getFieldRadioNameValue(record, _aY);
		}
	} catch (e) {
	} finally {
		return result;
	}
};
function record_getViewString(fieldName) {
	var record = this, _aY, result = "";
	var _aY = record.dataset.getField(fieldName);
	if (_aY) {
		var value = record.getValue(fieldName);
		switch (_aY.dataType) {
		case "string": {
			result = getValidStr(value);
			break;
		}
		case "byte":
			;
		case "short":
			;
		case "int":
			;
		case "long": {
			if (!isNaN(value))
				result = value + "";
			break;
		}
		case "currency": {
			if (!isNaN(value)) {
				result = formatFloat(value, _aY.scale);
				result = formatCurrency(result);
			}
			break;
		}
		case "float":
			;
		case "double":
			;
		case "bigdecimal": {
			if (!isNaN(value))
				result = formatFloat(value, _aY.scale);
			break;
		}
		case "predate":
			;
		case "postdate":
			;
		case "date":
			;
		case "time":
			;
		case "timestamp": {
			result = formatViewDateTime(value, _aY.dataType);
			break;
		}
		case "boolean":
			;
		default: {
			result = getValidStr(value);
			break;
		}
		}
	}
	try {
		if (typeof (_aY.tag) != "undefined" && _aY.tag != ""
				&& _aY.tag == "selectName" && value == "") {
			result = getFieldSelectNameValue(record, _aY);
		} else if (_aY.tag == "radioName" && value == "") {
			result = getFieldRadioNameValue(record, _aY);
		}
	} catch (e) {
	} finally {
		return result;
	}
};
function record_getString_2(record, fieldName) {
	var _aY, result = "";
	var _aY = record.dataset.getField(fieldName);
	if (_aY) {
		var value = record.getValue(fieldName);
		switch (_aY.dataType) {
		case "string": {
			result = getValidStr(value);
			break;
		}
		case "byte":
			;
		case "short":
			;
		case "int":
			;
		case "long": {
			if (!isNaN(value))
				result = value + "";
			break;
		}
		case "float":
			;
		case "double":
			;
		case "bigdecimal": {
			if (!isNaN(value))
				result = formatFloat(value, _aY.scale);
			break;
		}
		case "predate":
			;
		case "postdate":
			;
		case "date":
			;
		case "time":
			;
		case "timestamp": {
			result = formatDateTime(value, _aY.dataType);
			break;
		}
		case "boolean":
			;
		default: {
			result = getValidStr(value);
			break;
		}
		}
	}
	return result;
};
function _record_setValue(record, fieldName, value) {
	var dataset = record.dataset;
	var fields = record.fields;
	var _bE = -1;
	if (typeof (fieldName) == "number") {
		_bE = fieldName;
	} else if (typeof (fieldName) == "string") {
		_bE = fields["_index_" + fieldName.toLowerCase()];
	}
	if (typeof (fields[_bE]) == "undefined") {
		throw constErrCantFindField.replace("%s", record.dataset.id + "."
				+ fieldName);
	}
	var _aY = fields[_bE];
	if (getValidStr(_aY.mask) != "") {
		if (value == "" && !_aY.required) {
		} else {
			var valid = false;
			value = (value + "").replace(/\\/g, '\\\\');
			value = value.replace(/\"/g, '\\"');
			var valid = new RegExp(_aY.mask).test(value + '');
			if (!valid) {
				if (_aY.maskErrorMessage) {
					throw _aY.maskErrorMessage.replace("%s", value);
				} else {
					throw constErrInputMask.replace("%s", value);
				}
			}
		}
	}
	switch (_aY.dataType) {
	case "int":
		value = getValidStr(value);
		value = parseInt(parseFloat(value));
		break;
	case "float":
		value = getValidStr(value);
		value = parseFloat(value);
		break;
	case "double":
		value = getValidStr(value);
		value = value * 1;
		break;
	case "predate":
		;
	case "postdate":
		;
	case "date":
		value = getValidStr(value);
		value = parseDate(value);
		break;
	case "timestamp":
		value = getValidStr(value);
		value = parseTimestamp(value);
		break;
	case "time":
		value = getValidStr(value);
		value = new Date("2000/01/01 " + value.replace(/-/g, "/"));
		break;
	case "boolean":
		value = isTrue(value);
		break;
	}
	if (dataset.loadCompleted) {
		var _aJ = fireDatasetEvent(dataset, "beforeChange", [ dataset, _aY,
				value ]);
		if (_aJ) {
			throw _aJ;
		}
	}
	var _aW = getElementEventName(dataset, "onSetValue");
	if (isUserEventDefined(_aW) && dataset.record && dataset.loadCompleted) {
		value = fireUserEvent(_aW, [ dataset, _aY, value ]);
	}
	record[_bE] = value;
	dataset.modified = true;
	if (dataset.loadCompleted) {
		fireDatasetEvent(dataset, "afterChange", [ dataset, _aY ]);
	}
	if (record.recordState == "none")
		record.recordState = "modify";
	if (dataset.state == "none")
		dataset_setState(dataset, "modify");
	if (fieldName != "select") {
		_broadcastFieldMsg(_notifyFieldDataChanged, dataset, record, _aY);
	}
};
function _record_setValue_2(record, fieldName, value) {
	var dataset = record.dataset;
	var fields = record.fields;
	var _bE = -1;
	if (typeof (fieldName) == "number") {
		_bE = fieldName;
	} else if (typeof (fieldName) == "string") {
		_bE = fields["_index_" + fieldName.toLowerCase()];
	}
	if (typeof (fields[_bE]) == "undefined") {
		throw constErrCantFindField.replace("%s", record.dataset.id + "."
				+ fieldName);
	}
	var _aY = fields[_bE];
	if (getValidStr(_aY.mask) != "") {
		if (value == "" && !_aY.required) {
		} else {
			var valid = false;
			eval("valid=" + _aY.mask + ".test(\""
					+ (value + '').replace(/\\/g, '\\\\') + "\");");
			if (!valid) {
				if (_aY.maskErrorMessage) {
					throw _aY.maskErrorMessage.replace("%s", value);
				} else {
					throw constErrInputMask.replace("%s", value);
				}
			}
		}
	}
	switch (_aY.dataType) {
	case "int":
		value = getValidStr(value);
		value = parseInt(value);
		break;
	case "float":
		value = getValidStr(value);
		value = parseFloat(value);
		break;
	case "double":
		value = getValidStr(value);
		value = value * 1;
		break;
	case "predate":
		;
	case "postdate":
		;
	case "date":
		;
	case "timestamp":
		value = getValidStr(value);
		value = new Date(value.replace(/-/g, "/"));
		break;
	case "time":
		value = getValidStr(value);
		value = new Date("2000/01/01 " + value.replace(/-/g, "/"));
		break;
	case "boolean":
		value = isTrue(value);
		break;
	}
	if (dataset.loadCompleted) {
		var _aJ = fireDatasetEvent(dataset, "beforeChange", [ dataset, _aY,
				value ]);
		if (_aJ) {
			throw _aJ;
		}
	}
	var _aW = getElementEventName(dataset, "onSetValue");
	if (isUserEventDefined(_aW) && dataset.record && dataset.loadCompleted) {
		value = fireUserEvent(_aW, [ dataset, _aY, value ]);
	}
	record[_bE] = value;
};
function record_setValue(fieldName, value) {
	try {
		_record_setValue(this, fieldName, value);
	} catch (e) {
		processException(e);
	}
};
function record_getCurValue(fieldName) {
	var record = this;
	if (typeof (fieldName) == "number") {
		return record.getValue(fieldName + record.fields.fieldCount);
	} else {
		return record.getValue("_cur_" + fieldName);
	}
};
function record_setCurValue(fieldName, value) {
	var record = this;
	if (typeof (fieldName) == "number") {
		record.setValue(fieldName + record.fields.fieldCount, value);
	} else {
		record.setValue("_cur_" + fieldName, value);
	}
};
function record_getOldValue(fieldName) {
	var record = this;
	if (typeof (fieldName) == "number") {
		return record.getValue(fieldName + record.fields.fieldCount * 2);
	} else {
		return record.getValue("_old_" + fieldName);
	}
};
function record_setOldValue(fieldName, value) {
	var record = this;
	if (typeof (fieldName) == "number") {
		record.setValue(fieldName + record.fields.fieldCount * 2, value);
	} else {
		record.setValue("_old_" + fieldName, value);
	}
};
function dataset_getValue(fieldName) {
	var dataset = this;
	if (dataset.record)
		return dataset.record.getValue(fieldName);
	else
		return "";
};
function dataset_getString(fieldName) {
	var dataset = this;
	if (dataset.record)
		return dataset.record.getString(fieldName);
	else
		return "";
};
function dataset_getViewString(fieldName) {
	var dataset = this;
	if (dataset.record)
		return dataset.record.getViewString(fieldName);
	else
		return "";
};
function dataset_setValue(fieldName, value) {
	try {
		var dataset = this;
		if (dataset.record) {
			dataset.record.setValue(fieldName, value);
		} else {
			dataset.insertRecord();
			dataset.record.setValue(fieldName, value);
		}
	} catch (e) {
		processException(e);
	}
};
function dataset_setValue_2(fieldName, value) {
	try {
		var dataset = this;
		if (dataset.record) {
			dataset.record.setValue(fieldName, value);
			var _aY = _dataset_getField(dataset.fields, fieldName.toLowerCase());
			if (_aY.tag == "select" || _aY.tag == "selectCQ") {
				var _bQ = fieldName + "Name";
				if (value = "") {
					dataset.record.setValue(_bQ, "");
					return;
				}
				var _bu = _dataset_getField(dataset.fields, _bQ.toLowerCase());
				var _ax = getFieldSelectNameValue(dataset.record, _bu);
				dataset.record.setValue(_bQ, _ax);
			} else {
			}
		} else {
			dataset.insertRecord();
			dataset.record.setValue(fieldName, value);
			var _aY = _dataset_getField(dataset.fields, fieldName.toLowerCase());
			if (_aY.tag == "select" || _aY.tag == "selectCQ") {
				var _bQ = fieldName + "Name";
				if (value = "") {
					dataset.record.setValue(_bQ, "");
					return;
				}
				var _bu = _dataset_getField(dataset.fields, _bQ.toLowerCase());
				var _ax = getFieldSelectNameValue(dataset.record, _bu);
				dataset.record.setValue(_bQ, _ax);
			} else {
			}
		}
	} catch (e) {
		processException(e);
	}
};
function dataset_getCurValue(fieldName) {
	var dataset = this;
	if (typeof (fieldName) == "number") {
		return dataset.getValue(fieldName + dataset.fields.fieldCount);
	} else {
		return dataset.getValue("_cur_" + fieldName);
	}
};
function dataset_setCurValue(fieldName, value) {
	var dataset = this;
	if (typeof (fieldName) == "number") {
		dataset.setValue(fieldName + dataset.fields.fieldCount, value);
	} else {
		dataset.setValue("_cur_" + fieldName, value);
	}
};
function dataset_getOldValue(fieldName) {
	var dataset = this;
	if (typeof (fieldName) == "number") {
		return dataset.getValue(fieldName + dataset.fields.fieldCount * 2);
	} else {
		return dataset.getValue("_old_" + fieldName);
	}
};
function dataset_setOldValue(fieldName, value) {
	var dataset = this;
	if (typeof (fieldName) == "number") {
		dataset.setValue(fieldName + dataset.fields.fieldCount * 2, value);
	} else {
		dataset.setValue("_old_" + fieldName, value);
	}
};
function _record_getPrevRecord(record) {
	var _k = record;
	while (_k) {
		_k = _k.prevUnit;
		if (dataset_isRecordValid(_k))
			return _k;
	}
};
function record_getPrevRecord() {
	return _record_getPrevRecord(this);
};
function _record_getNextRecord(record) {
	var _k = record;
	while (_k) {
		_k = _k.nextUnit;
		if (dataset_isRecordValid(_k))
			return _k;
	}
};
function record_getNextRecord() {
	return _record_getNextRecord(this);
};
function dataset_disableControls() {
	var dataset = this;
	dataset.disableControlCount = dataset.disableControlCount + 1;
};
function dataset_enableControls() {
	var dataset = this;
	dataset.disableControlCount = (dataset.disableControlCount > 0) ? dataset.disableControlCount - 1
			: 0;
	dataset.refreshControls();
};
function dataset_disableEvents() {
	var dataset = this;
	dataset.disableEventCount = dataset.disableEventCount + 1;
};
function dataset_enableEvents() {
	var dataset = this;
	dataset.disableEventCount = (dataset.disableEventCount > 0) ? dataset.disableEventCount - 1
			: 0;
};
function dataset_refreshControls() {
	var dataset = this;
	validateDatasetCursor(dataset);
	_broadcastDatasetMsg(_notifyDatasetRefresh, dataset);
};
function _dataset_move(dataset, count) {
	var _k = dataset.record;
	if (!_k)
		_k = dataset.getFirstRecord();
	if (!_k)
		return;
	var record = _k;
	if (count > 0) {
		var old_pageIndex = record.pageIndex;
		var eof = false;
		for (var i = 0; i < count; i++) {
			var pageIndex = 0;
			_k = record.getNextRecord();
			if (!_k || (_k && _k.pageIndex != old_pageIndex)) {
				if (old_pageIndex < dataset.pageCount) {
					if (!dataset.isPageLoaded(old_pageIndex + 1)) {
						if ((i + dataset.pageSize < count)
								&& (old_pageIndex + 1 < dataset.pageCount)) {
							i += dataset.pageSize - 1;
							_k = record;
						} else {
							_dataset_loadPage(dataset, old_pageIndex + 1);
							_k = record.getNextRecord();
						}
					}
				}
				old_pageIndex++;
			}
			if (_k) {
				record = _k;
			} else {
				eof = true;
				break;
			}
		}
		dataset_setBofnEof(dataset, (!dataset_isRecordValid(dataset.record)),
				eof);
	} else {
		var old_pageIndex = record.pageIndex;
		var bof = false;
		for (var i = count; i < 0; i++) {
			var pageIndex = 0;
			_k = record.getPrevRecord();
			if (!_k || (_k && _k.pageIndex != old_pageIndex)) {
				if (old_pageIndex > 1) {
					if (!dataset.isPageLoaded(old_pageIndex - 1)) {
						if ((i + dataset.pageSize < 0) && (old_pageIndex > 1)) {
							i += dataset.pageSize - 1;
							_k = record;
						} else {
							_dataset_loadPage(dataset, old_pageIndex - 1);
							_k = record.getPrevRecord();
						}
					}
				}
				old_pageIndex--;
			}
			if (_k) {
				record = _k;
			} else {
				bof = true;
				break;
			}
		}
		dataset_setBofnEof(dataset, bof,
				(!dataset_isRecordValid(dataset.record)));
	}
	if (record)
		_do_dataset_setRecord(dataset, record);
};
function dataset_move(count) {
	var dataset = this;
	try {
		_dataset_move(dataset, count);
	} catch (e) {
		processException(e);
	}
};
function dataset_movePrev() {
	var dataset = this;
	try {
		_dataset_move(dataset, -1);
	} catch (e) {
		processException(e);
	}
};
function dataset_moveNext() {
	var dataset = this;
	try {
		_dataset_move(dataset, 1);
	} catch (e) {
		processException(e);
	}
};
function _dataset_getFirstRecord(dataset) {
	var record = dataset.firstUnit;
	if (record && !dataset_isRecordValid(record))
		record = record.getNextRecord();
	return record;
};
function dataset_getFirstRecord() {
	return _dataset_getFirstRecord(this);
};
function dataset_moveFirst() {
	var dataset = this;
	try {
		if (!dataset.isPageLoaded(1))
			_dataset_loadPage(dataset, 1);
		_do_dataset_setRecord(dataset, dataset.getFirstRecord());
		dataset_setBofnEof(dataset, true,
				(!dataset_isRecordValid(dataset.record)));
	} catch (e) {
		processException(e);
	}
};
function _dataset_getLastRecord(dataset) {
	var record = dataset.lastUnit;
	if (!dataset_isRecordValid(record) && record)
		record = record.getPrevRecord();
	return record;
};
function dataset_getLastRecord() {
	return _dataset_getLastRecord(this);
};
function dataset_moveLast() {
	var dataset = this;
	try {
		if (!dataset.isPageLoaded(dataset.pageCount))
			_dataset_loadPage(dataset, dataset.pageCount);
		_do_dataset_setRecord(dataset, dataset.getLastRecord());
		dataset_setBofnEof(dataset, (!dataset_isRecordValid(dataset.record)),
				true);
	} catch (e) {
		processException(e);
	}
};
function dataset_find(_af, values, _bR) {
	function _l(_af, values, record) {
		var result = true;
		for (var j = 0; j < _af.length && j < values.length; j++) {
			if (!compareText(record.getString(_af[j]), values[j])) {
				result = false;
				break;
			}
		}
		return result;
	}
	;
	if (!_af || !values)
		return false;
	var dataset = this;
	if (!dataset.record)
		return;
	if (_l(_af, values, dataset.record))
		return dataset.record;
	var record = (_bR) ? _bR : dataset.getFirstRecord();
	while (record) {
		if (_l(_af, values, record))
			return record;
		record = record.getNextRecord();
	}
};
function dataset_findRecordByUUID(uuid) {
	var record = this.getFirstRecord();
	while (record) {
		if (record._uuid == uuid) {
			return record;
		}
		record = record.getNextRecord();
	}
};
function dataset_locate(fieldName, value, _bR) {
	function _l(fieldName, value, record) {
		var _aK = record.getString(fieldName);
		return (_aK && compareText(_aK.substr(0, len), value));
	}
	;
	if (!value)
		return false;
	var dataset = this;
	if (!dataset.record)
		return;
	if (_l(fieldName, value, dataset.record))
		return dataset.record;
	var len = value.length;
	var record = (_bR) ? _bR : dataset.getFirstRecord();
	while (record) {
		if (_l(fieldName, value, record))
			return record;
		record = record.getNextRecord();
	}
};
function _dataset_insertRecord(dataset, mode) {
	_dataset_updateRecord(dataset);
	var _aJ = fireDatasetEvent(dataset, "beforeInsert", [ dataset, mode ]);
	if (_aJ)
		throw _aJ;
	var _a = dataset.masterDataset;
	if (_a) {
		if (_a.record) {
			_dataset_updateRecord(_a);
		}
	}
	var pageIndex = (dataset.record) ? dataset.record.pageIndex : 1;
	var _bk = new Array();
	pArray_insert(dataset, mode, dataset.record, _bk);
	initRecord(_bk, dataset);
	switch (mode) {
	case "begin": {
		_bk.pageIndex = 1;
		break;
	}
	case "end": {
		_bk.pageIndex = dataset.pageCount;
		break;
	}
	default: {
		_bk.pageIndex = pageIndex;
		break;
	}
	}
	_bk.recordState = "new";
	_bk.recordno = 9999;
	var _a = dataset.masterDataset;
	if (_a) {
		if (_a.record) {
			for (var i = 0; i < dataset.references.length; i++) {
				var _bE = dataset.references[i].masterIndex;
				if (_a.getString(_bE) == "") {
					var _aY = _a.getField(_bE);
					switch (_aY.dataType) {
					case "string":
						_a.setValue(_bE, _getAutoGenID());
						break;
					case "byte":
						;
					case "short":
						;
					case "int":
						;
					case "long":
						;
					case "float":
						;
					case "double":
						;
					case "bigdecimal":
						;
						var _bb = 0;
						var record = _a.firstUnit;
						while (record) {
							if (record.getValue(_bE) > _bb) {
								_bb = record.getValue(_bE);
							}
							record = record.nextUnit;
						}
						_a.setValue(_bE, _bb + 1);
						break;
					}
				}
			}
			_dataset_updateRecord(_a);
			for (var i = 0; i < dataset.references.length; i++) {
				var reference = dataset.references[i];
				_bk[reference.detailIndex] = _a.getValue(reference.masterIndex);
			}
		} else {
			throw constErrNoMasterRecord;
		}
	}
	var fieldCount = dataset.fields.fieldCount;
	for (var i = 0; i < fieldCount; i++) {
		var _aY = dataset.fields[i];
		var defaultValue = getValidStr(_aY.defaultValue);
		if (defaultValue != "") {
			_bk[i] = defaultValue;
		}
	}
	dataset_setState(dataset, "insert");
	_broadcastDatasetMsg(_notifyDatasetInsert, dataset, dataset.record, [ mode,
			_bk ]);
	_dataset_setRecord(dataset, _bk);
	var fieldCount = dataset.fields.fieldCount;
	for (var i = 0; i < fieldCount; i++) {
		var _aY = dataset.fields[i];
		if (_aY.autoGenId) {
			dataset.setValue(i, _getAutoGenID());
		}
	}
	fireDatasetEvent(dataset, "afterInsert", [ dataset, mode ]);
	dataset.modified = true;
};
function dataset_insertRecord(mode) {
	try {
		_dataset_insertRecord(this, mode);
	} catch (e) {
		processException(e);
	}
};
function _dataset_deleteRecord(dataset) {
	if (!dataset.record)
		return;
	if (dataset.detailDatasets) {
		var unit = dataset.detailDatasets.firstUnit;
		while (unit && unit.data) {
			var _aB = unit.data;
			if (_aB.references.length > 0) {
				_dataset_updateRecord(_aB);
				_aB.moveFirst();
				while (!_aB.eof) {
					_aB.deleteRecord();
				}
			}
			_aB.refreshControls();
			unit = unit.nextUnit;
		}
	}
	_ah = false;
	try {
		if (dataset.record.recordState == "new"
				|| dataset.record.recordState == "insert") {
			var _aJ = fireDatasetEvent(dataset, "beforeDelete", [ dataset ]);
			if (_aJ)
				throw _aJ;
			dataset.record.recordState = "discard";
		} else {
			var _aJ = fireDatasetEvent(dataset, "beforeDelete", [ dataset ]);
			if (_aJ)
				throw _aJ;
			dataset.record.recordState = "delete";
			_changeMasterRecordState(dataset);
		}
		dataset.modified = false;
		fireDatasetEvent(dataset, "afterDelete", [ dataset ]);
		dataset_setState(dataset, "none");
		_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
		validateDatasetCursor(dataset);
	} finally {
		_ah = true;
	}
};
function dataset_deleteRecord() {
	try {
		_dataset_deleteRecord(this);
	} catch (e) {
		processException(e);
	}
};
function _dataset_updateRecord(dataset) {
	if (!dataset.record)
		return;
	if (!dataset_isRecordValid(dataset.record))
		return;
	_broadcastDatasetMsg(_notifyDatasetBeforeUpdate, dataset, dataset.record);
	if (dataset.modified) {
		var fieldCount = dataset.fields.fieldCount;
		for (var i = 0; i < fieldCount; i++) {
			if (!isTrue(dataset.fields[i].readOnly)
					&& isTrue(dataset.fields[i].required)
					&& dataset.getString(i) == "") {
				throw constErrFieldValueRequired.replace("%s",
						dataset.fields[i].label);
			}
		}
		var _aJ = fireDatasetEvent(dataset, "beforeUpdate", [ dataset ]);
		if (_aJ)
			throw _aJ;
		var _aG = new Array();
		if (dataset.detailDatasets) {
			var unit = dataset.detailDatasets.firstUnit;
			while (unit && unit.data) {
				var _aB = unit.data;
				if (_aB.references.length > 0) {
					var disableCount = _aB.disableControlCount;
					_aB.disableControlCount = 1;
					try {
						var _O = false;
						_dataset_updateRecord(_aB);
						_aB.moveFirst();
						while (!_aB.eof) {
							for (var i = 0; i < _aB.references.length; i++) {
								var detailIndex = _aB.references[i].detailIndex;
								var masterIndex = _aB.references[i].masterIndex;
								if (_aB.getValue(detailIndex) != dataset
										.getValue(masterIndex)) {
									_aB.setValue(detailIndex, dataset
											.getValue(masterIndex));
									_O = true;
								}
							}
							_dataset_updateRecord(_aB);
							_aB.moveNext();
						}
					} finally {
						_aB.disableControlCount = disableCount;
					}
					if (_O) {
						_aG[_aG.length] = _aB;
					}
				}
				unit = unit.nextUnit;
			}
		}
		switch (dataset.record.recordState) {
		case "none": {
			dataset.record.recordState = "modify";
			_changeMasterRecordState(dataset);
			break;
		}
		case "new": {
			dataset.record.recordState = "insert";
			_changeMasterRecordState(dataset);
			break;
		}
		}
		for (var i = 0; i < fieldCount; i++) {
			dataset.record[fieldCount + i] = dataset.record[i];
		}
		dataset.modified = false;
		fireDatasetEvent(dataset, "afterUpdate", [ dataset ]);
		dataset_setState(dataset, "none");
		for (var i = 0; i < _aG.length; i++) {
			_aB.refreshControls();
			validateDatasetCursor(_aB);
		}
	} else {
		if (dataset.record.recordState == "new") {
			dataset.record.recordState = "discard";
			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
			validateDatasetCursor(dataset);
		}
	}
};
function dataset_updateRecord() {
	try {
		_dataset_updateRecord(this);
		return true;
	} catch (e) {
		processException(e);
		return false;
	}
};
function _dataset_cancelRecord(dataset) {
	if (!dataset.record)
		return;
	_ah = false;
	try {
		if (dataset.record.recordState == "new") {
			var _aJ = fireDatasetEvent(dataset, "beforeCancel", [ dataset ]);
			if (_aJ)
				throw _aJ;
			dataset.record.recordState = "discard";
			fireDatasetEvent(dataset, "afterCancel", [ dataset ]);
			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetDelete, dataset, dataset.record);
			validateDatasetCursor(dataset);
		} else if (dataset.modified) {
			var _aJ = fireDatasetEvent(dataset, "beforeCancel", [ dataset ]);
			if (_aJ)
				throw _aJ;
			var fieldCount = dataset.fields.fieldCount;
			for (var i = 0; i < fieldCount; i++) {
				dataset.record[i] = dataset.record[fieldCount + i];
			}
			dataset.modified = false;
			fireDatasetEvent(dataset, "afterCancel", [ dataset ]);
			dataset_setState(dataset, "none");
			_broadcastDatasetMsg(_notifyDatasetRefreshRecord, dataset,
					dataset.record);
		}
	} finally {
		_ah = true;
	}
};
function dataset_cancelRecord() {
	try {
		_dataset_cancelRecord(this);
	} catch (e) {
		processException(e);
	}
};
function _dataset_copyRecord(dataset, record, fieldMap) {
	if (fieldMap) {
		var _bd = new Array();
		var fields = fieldMap.split(";");
		var _br = "", _bu = "";
		for (var i = 0; i < fields.length; i++) {
			_bd[i] = new Object();
			var index = fields[i].indexOf("=");
			if (index >= 0) {
				_br = fields[i].substr(0, index);
				_bu = fields[i].substr(index + 1);
			} else {
				_br = fields[i];
				_bu = fields[i];
			}
			var value = record.getValue(_bu);
			if (typeof (value) != "undefined")
				dataset.setValue(_br, value);
		}
	} else {
		for (var i = 0; i < dataset.fields.fieldCount; i++) {
			var fieldName = dataset.getField(i).name;
			var _aY = record.dataset.getField(fieldName);
			if (_aY) {
				var value = record.getValue(fieldName);
				if (typeof (value) != "undefined")
					dataset.setValue(fieldName, value);
			}
		}
	}
};
function dataset_copyRecord(record, fieldMap) {
	var dataset = this;
	_dataset_copyRecord(dataset, record, fieldMap);
};
function _broadcastDatasetMsg(_bP, dataset, record, _aP) {
	if (dataset.disableControlCount > 0)
		return;
	var pArray = dataset.editors;
	if (pArray) {
		var unit = pArray.firstUnit;
		while (unit && unit.data) {
			_bP(unit.data, dataset, record, _aP);
			unit = unit.nextUnit;
		}
	}
};
function _broadcastFieldMsg(_bP, dataset, record, _aY, _aP) {
	if (dataset.disableControlCount > 0)
		return;
	var pArray = dataset.editors;
	if (pArray) {
		var unit = pArray.firstUnit;
		while (unit && unit.data) {
			_bP(unit.data, dataset, record, _aY, _aP);
			unit = unit.nextUnit;
		}
	}
};
function _FieldValid(dataset) {
	if (dataset.disableControlCount > 0)
		return;
	var pArray = dataset.editors;
	var fieldArray = new Array();
	var _aq = new Array();
	var fieldCount = dataset.fields.fieldCount;
	for (var i = 0; i < fieldCount; i++) {
		fieldArray.push(dataset.fields[i]);
	}
	var isValid = false;
	if (pArray) {
		var unit = pArray.firstUnit;
		while (unit && unit.data) {
			var _as = unit.data;
			switch (_as.getAttribute("extra")) {
			case "dropDownSelect":
			case "editor":
			case "dockeditor":
				isValid = validateQuery(isValid, _as);
				_aq.push(_as.getAttribute("dataField"));
				break;
			}
			unit = unit.nextUnit;
		}
	}
	for (var i = 0; i < fieldArray.length;) {
		var _bf = true;
		for (var j = 0; j < _aq.length; j++) {
			if (fieldArray[i].fieldName == _aq[j]) {
				fieldArray.splice(i, 1);
				_bf = false;
			}
		}
		if (_bf)
			i++;
	}
	return {
		fieldArray : fieldArray,
		isValid : isValid
	};
};
function _notifyDatasetCursorChanged(_as, dataset, record, _aP) {
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		refreshDatagridCursor(_as, dataset, record, _aP);
		break;
	}
	case "datalabel": {
		refreshDatalabelValue(_as, dataset, record);
		break;
	}
	case "dropDownSelect":
		if (dataset.type == "dropdown")
			break;
	case "editor": {
		refreshInputValue(_as, dataset, record);
		_as.isUserInput = false;
		break;
	}
	}
};
function _notifyDatasetBeforeUpdate(_as, dataset, record, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "dockeditor": {
		_F.updateEditorInput(_as);
		break;
	}
	}
};
function _notifyDatasetStateChanged(_as, dataset, record, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "editor":
		;
	case "dropDownSelect":
	case "dockeditor": {
		var _aY = _F.getElementField(_as);
		_as.setReadOnly(!isFieldEditable(dataset, _aY));
		break;
	}
	case "datapilot": {
		_F.refreshDataPilot(_as);
		break;
	}
	case "datatable": {
		if (_as.activeRow)
			_F.refreshTableRowIndicate(_as.activeRow);
		break;
	}
	}
};
function _notifyDatasetInsert(_as, dataset, record, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		var grid = $(_as);
		var json = {};
		var _aM = "jquery" + $.uuid++;
		_k = _aP[1];
		_k._uuid = _aM;
		json.record = _k;
		json._recordUUID = _aM;
		for (var i = 0; i < dataset.fields.fieldCount; i++) {
			var fieldName = dataset.getField(i).fieldName;
			json[fieldName] = _k.getJsonValue(fieldName);
		}
		grid.datagrid('appendRow', json);
		grid.datagrid('selectRecord', _aM);
		grid.datagrid('options').init = true;
		break;
	}
	}
};
function _notifyDatasetDelete(_as, dataset, record, _aP) {
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		if (record) {
			var grid = $(_as);
			var opts = grid.datagrid("options");
			var selectedIndex = opts.selectedIndex;
			grid.datagrid('deleteRow', selectedIndex);
		}
		break;
	}
	}
};
function _notifyDatasetRefreshRecord(_as, dataset, record, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		if (record) {
		}
		break;
	}
	case "datalabel":
		;
	case "editor":
		;
	case "dropDownSelect":
		;
	case "dockeditor": {
		refreshInputValue(_as, dataset, record);
		_as.isUserInput = false;
		break;
	}
	}
	if (_F.isFileIncluded("editor"))
		_F.sizeDockEditor();
};
function _notifyDatasetRefresh(_as, dataset, record, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		_F.refreshDataTable(_as);
		break;
	}
	case "editor":
	case "dropDownSelect": {
		dataset.modified = false;
		refreshInputValue(_as, dataset, record);
		break;
	}
	case "datapilot": {
		_F.refreshDataPilot(_as);
		break;
	}
	case "pagination": {
		_F.refreshPagination(_as);
		break;
	}
	case "pagepilot": {
		_F.refreshPagePilot(_as);
		break;
	}
	}
	_notifyDatasetStateChanged(_as, dataset, record, _aP);
	if (_F.isFileIncluded("editor"))
		_F.sizeDockEditor();
};
function _notifyFieldDataChanged(_as, dataset, record, _aY, _aP) {
	var _F = _as.window;
	switch (_as.getAttribute("extra")) {
	case "datagrid": {
		_F.refreshDataGridCellValue(_as, dataset, _aY, record);
		break;
	}
	case "editor": {
		if (compareText(_as.getAttribute("dataField"), _aY.name)) {
			refreshInputValue(_as, dataset, record);
		}
		break;
	}
	case "datalabel": {
		if (compareText(_as.getAttribute("dataField"), _aY.name)) {
		}
		break;
	}
	case "dropDownSelect": {
		if (compareText(_as.getAttribute("dataField"), _aY.name)) {
			record.dropdownKey = true;
			refreshInputValue(_as, dataset, record);
		} else if (compareText(_as.getAttribute("dataField") + 'Name', _aY.name)) {
			record.dropdownKey = false;
			refreshInputValue(_as, dataset, record);
		}
		break;
	}
	}
};
function _notifyFieldStateChanged(_as, dataset, record, _aY, _aP) {
	var dataField = _as.getAttribute("dataField");
	if (dataField == _aY.fieldName && _as.getAttribute("extra") != 'fieldlabel') {
		_as.setReadOnly(!isFieldEditable(dataset, _aY));
	}
};
function _resetRecordState(record) {
	record.saveOldValue();
	if (record.recordState == "delete") {
		record.recordState = "discard";
	} else if (record.recordState != "discard") {
		record.recordState = "none";
	}
};
function _resetDatasetsState(submitManager) {
	for (var i = 0; i < submitManager.datasets.length; i++) {
		var dataset = submitManager.datasets[i];
		dataset.disableControls();
	}
	try {
		for (var i = 0; i < submitManager.datasets.length; i++) {
			var dataset = submitManager.datasets[i];
			var record = dataset.firstUnit;
			while (record) {
				if (record.recordState != "none"
						&& record.recordState != "discard") {
					var fieldCount = dataset.fields.fieldCount;
					for (var j = 0; j < fieldCount; j++) {
						var _aY = record.fields[j];
						if (_aY.dataType == "lob") {
							record.setValue(j, "");
						}
						if (_oidmap && record.recordState == "insert") {
							if (_aY.autoGenId) {
								var value = _oidmap[record.getString(j)];
								if (getValidStr(value) != "") {
									dataset.setRecord(record);
									dataset.setValue(j, value);
								}
								dataset.updateRecord();
							}
						}
					}
				}
				_resetRecordState(record);
				record = record.nextUnit;
			}
		}
	} finally {
		for (var i = 0; i < submitManager.datasets.length; i++) {
			var dataset = submitManager.datasets[i];
			dataset.enableControls();
		}
	}
};
function _getUpdateString(submitManager) {
	function _w(dataset) {
		var _bx = "";
		_bx += "id=\"" + dataset.id + "\" ";
		_bx += "sessionKey=\"" + dataset.sessionKey + "\" ";
		if (dataset.masterDataset) {
			_bx += "masterDataset=\"" + dataset.masterDataset.id + "\" ";
			_bx += "references=\"" + dataset.referencesString + "\" ";
		}
		_bx += "tag=\"" + getEncodeStr(dataset.tag) + "\" ";
		var result = "<Dataset " + _bx + ">";
		result += "<Fields>";
		for (var i = 0; i < dataset.fields.fieldCount; i++) {
			var _aY = dataset.getField(i);
			var _bx = "";
			_bx += "name=\"" + _aY.name + "\" ";
			_bx += "dataType=\"" + _aY.dataType + "\" ";
			_bx += "nullable=\"" + _aY.nullable + "\" ";
			_bx += "updatable=\"" + _aY.updatable + "\" ";
			_bx += "valueProtected=\"" + _aY.valueProtected + "\" ";
			_bx += "fieldName=\"" + _aY.fieldName + "\" ";
			_bx += "tableName=\"" + _aY.tableName + "\" ";
			_bx += "tag=\"" + getEncodeStr(_aY.tag) + "\" ";
			result += "<Field " + _bx + "/>";
		}
		result += "</Fields>";
		result += "<Records>";
		var record = dataset.firstUnit;
		while (record) {
			var _aF, _ar;
			if (dataset.submitData == "current") {
				_aF = (dataset.record == record);
				_ar = true;
			} else if (dataset.submitData == "selected") {
				_aF = isTrue(record.getValue("select"));
				_ar = true;
			} else {
				switch (record.recordState) {
				case "none":
					_aF = (dataset.submitData == "all");
					_ar = false;
					break;
				case "insert":
					_aF = true;
					_ar = false;
					break;
				case "modify":
				case "delete":
					_aF = true;
					_ar = true;
					break;
				default:
					_aF = false;
					_ar = false;
					break;
				}
			}
			if (_aF) {
				result += "<Record state=\"" + record.recordState + "\">";
				result += "<data>";
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					result += getEncodeStr(record.getString(i)) + ",";
				}
				result += "</data>";
				if (_ar) {
					result += "<old>";
					for (var i = 0; i < dataset.fields.fieldCount; i++) {
						result += getEncodeStr(record
								.getString(dataset.fields.fieldCount * 2 + i))
								+ ",";
					}
					result += "</old>";
				}
				result += "</Record>";
			}
			record = record.nextUnit;
		}
		result += "</Records>";
		result += "<UpdateItems>";
		for (var i = 0; i < dataset.updateItems.length; i++) {
			var item = dataset.updateItems[i];
			var _bx = "";
			_bx += "updateMode=\"" + item.updateMode + "\" ";
			_bx += "dataSource=\"" + item.dataSource + "\" ";
			_bx += "tableName=\"" + item.tableName + "\" ";
			_bx += "keyFields=\"" + item.keyFields + "\" ";
			_bx += "updateFields=\"" + item.updateFields + "\" ";
			result += "<UpdateItem " + _bx + "/>";
		}
		result += "</UpdateItems>";
		result += "</Dataset>";
		return result;
	}
	;
	var result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	result += "<SubmitData updaterClass=\""
			+ getValidStr(submitManager.updaterClass) + "\" ";
	result += "forwardPath=\"" + submitManager.forwardPath + "\">";
	result += "<Parameters>";
	for (var i = 0; i < submitManager.parameters.length; i++) {
		result += "<Parameter name=\"" + submitManager.parameters[i].name
				+ "\">" + getEncodeStr(submitManager.parameters[i].value)
				+ "</Parameter>";
	}
	result += "</Parameters>";
	result += "<Datasets>";
	for (var i = 0; i < submitManager.datasets.length; i++) {
		result += _w(submitManager.datasets[i]);
	}
	result += "</Datasets>";
	result += "</SubmitData>";
	return result;
};
function _changeMasterRecordState(dataset) {
	var masterDataset = dataset.masterDataset;
	if (masterDataset) {
		if (masterDataset.record.recordState == "none") {
			masterDataset.record.recordState = "modify";
			_changeMasterRecordState(masterDataset);
		}
	}
};
function setFieldDropDown(id, targetDataset) {
	var _K = getDatasetByID(targetDataset);
	var _field = _dataset_getField(_K.fields, id);
	_field.dropdown = id + "_DropDown";
};
function initDropDownValues() {
	var _bN = new Array();
	_bN = getDatasets();
	for (var k = 0; k < _bN.length; k++) {
		var dataset = _bN[k];
		if (!dataset.loadCompleted && dataset.type && dataset.type == "result"
				&& dataset.id != "_tmp_dataset_date") {
			for (var i = 0; i < dataset.fields.length; i++) {
				if (dataset.fields[i].tag == "selectCQ") {
					var _bh = dataset.fields[i].fieldName;
					var fieldName = _bh + "Name";
					var _bB = "";
					var _bS = dataset.fields[i].viewField;
					var _v = dataset.fields[i].dropDown;
					var _S = dataset.fields[i].dropDownDataset;
					var _h = getDatasetByID(_S);
					if (_h) {
						var _n = getDropDownByID(_v);
						if (_n != "" && _n != null && _n.fieldMap != "") {
							var _by = _n.fieldMap.split(";");
							for (var j = 0; j < _by.length; j++) {
								var _bL = _by[j].split("=");
								if (_bL[0] == dataset.fields[i].fieldName) {
									_bB = _bL[1];
									if (_bS == "") {
										_bS = _bB + "Name";
									}
									break;
								}
							}
							var record = dataset.firstUnit;
							while (record) {
								var _am = record_getString_2(record, _bh);
								var _k = _h.firstUnit;
								while (_k) {
									var _bz = record_getString_2(_k, _bB);
									if (_bz == _am) {
										var _bV = record_getString_2(_k, _bS);
										_record_setValue_2(record, fieldName,
												_bV);
										break;
									}
									_k = _k.nextUnit;
								}
								record = record.nextUnit;
							}
						}
					}
				}
			}
		} else if (!dataset.loadCompleted && dataset.type
				&& dataset.type == "dropdown") {
			if (dataset.init && dataset.init == "true") {
			}
		}
	}
};
function getFieldSelectNameValue(record, _aY) {
	var fieldName = _aY.fieldName;
	var _bV = "";
	if (fieldName.length > 4) {
		var _bV = "";
		var dataset = record.dataset;
		var length = fieldName.length;
		var _bh = fieldName.substring(0, (length - 4));
		var _bB = "";
		var _bS = _aY.viewField;
		var _v = _aY.dropDown;
		var _S = _aY.dropDownDataset;
		var _h = getDatasetByID(_S);
		var _n = getDropDownByID(_v);
		if (_h) {
			if (_n.fieldMap != "") {
				var _by = _n.fieldMap.split(";");
				for (var j = 0; j < _by.length; j++) {
					var _bL = _by[j].split("=");
					if (_bL[0] == _bh) {
						_bB = _bL[1];
						if (_bS == "") {
							_bS = _bB + "Name";
						}
						break;
					}
				}
				if (record) {
					var _am = record_getString_2(record, _bh);
					if (_am == "") {
						return "";
					}
					var _k = _h.firstUnit;
					while (_k) {
						var _bz = record_getString_2(_k, _bB);
						if (_bz == _am) {
							_bV = record_getString_2(_k, _bS);
							index = dataset.fields["_index_" + _bh];
							record[index] = _am;
							break;
						}
						_k = _k.nextUnit;
					}
					if (_bV == "") {
						_bV = _am;
						index = dataset.fields["_index_" + _bh];
						record[index] = _am;
					}
				}
			}
		}
	} else {
	}
	return _bV;
};
function getFieldRadioNameValue(record, _aY) {
	var fieldName = _aY.fieldName;
	var _bV = "";
	if (fieldName.length > 4) {
		var dataset = record.dataset;
		var length = fieldName.length;
		var _bC = fieldName.substring(0, (length - 4));
		var radio = RadioRender.getRadio(_aY.radio);
		if (radio) {
			_bV = radio.getRadioNameValue(record.getValue(_bC));
		}
	}
	return _bV;
};
function dataset_getRealRecordCounts() {
	var count = 0;
	var dataset = this;
	if (dataset.length == 0) {
		return count;
	} else {
		var record = dataset.firstUnit;
		while (record) {
			if (record.recordState != "discard") {
				count++;
			}
			record = record.nextUnit;
		}
	}
	return count;
};
function dataset_toJson(opts) {
	var sumfieldstr = null;
	var id = null;
	if (opts) {
		sumfieldstr = opts.sumfieldstr;
		id = opts.id;
	}
	var dataset = this;
	if (dataset.masterDataset) {
		dataset.pageSize = dataset.length;
		dataset.pageCount = 1;
	}
	var json = {};
	json.pageIndex = dataset.pageIndex;
	json.pageCount = dataset.pageCount;
	json.total = dataset.pageSize < dataset.length ? dataset.length
			: dataset.pageCount * dataset.pageSize;
	json.rows = [];
	json.footer = [];
	var footer = {};
	footer.isfoot = true;
	var s = "," + sumfieldstr + ",";
	var _k = dataset.getFirstRecord();
	var start = (dataset.pageIndex - 1) * dataset.pageSize;
	var end = Math.min(dataset.length, dataset.pageIndex * dataset.pageSize);
	var n = -1;
	while (_k) {
		var result = fireUserEvent(id + "_onFilterRecord", [ dataset, _k ]);
		if (result) {
			_k = _k.getNextRecord();
			continue;
		}
		if (dataset.pageSize < dataset.length) {
			n++;
			if (n < start) {
				_k = _k.getNextRecord();
				continue;
			}
			if (n >= end) {
				break;
			}
		}
		var _aM = "jquery" + $.uuid++;
		_k._uuid = _aM;
		var row = {};
		row._recordUUID = _aM;
		row.record = _k;
		for (var i = 0; i < dataset.fields.fieldCount; i++) {
			var _f = dataset.getField(i);
			var fieldName = _f.fieldName;
			var v = _k.getJsonValue(fieldName);
			row[fieldName] = v;
			if (s.indexOf(fieldName) > -1) {
				footer[fieldName] = (parseFloat(v) || 0)
						+ (footer[fieldName] || 0);
			} else {
				footer[fieldName] = "";
			}
		}
		json.rows[json.rows.length] = row;
		_k = _k.getNextRecord();
	}
	json.footer[0] = footer;
	return json;
};
function initDefaultDataset(dataset) {
	if (dataset.getRealRecordCounts() == 0) {
		dataset.insertRecord("begin");
	}
	var fieldCount = dataset.fields.fieldCount;
	for (var i = 0; i < fieldCount; i++) {
		var _aY = dataset.getField(i);
		if (_aY.defaultValue && _aY.defaultValue != ""
				&& dataset.getString(i) == "") {
			dataset.setValue(i, _aY.defaultValue);
		}
	}
};
function copyDataset(_aR, _ac) {
	var _U = createDataset(_aR, "", "");
	_U.flushData = dataset_flushData_new;
	var _d = getDatasetByID(_ac);
	_U.fields = _d.fields;
	_U.parameters = _d.parameters;
	_U.readOnly = true;
	_U.cqId = _d.cqId;
	_U.pageSize = _d.pageSize;
	_U.databusId = _d.databusId;
	_U.pageIndex = 1;
	_U.pageCount = 1;
	_U.masterDataset = _d.masterDataset;
	_U.references = _d.references;
	_U.submitData = _d.submitData;
	_U.autoLoadPage = false;
	_U.autoLoadDetail = true;
	_U.downloadUrl = getDecodeStr("~2fextraservice~2fdownloaddata");
	_U.insertOnEmpty = _d.insertOnEmpty;
	_U.tag = "";
	_U.type = "result";
	_U.sessionKey = "dd";
	_U.init = _d.init;
	_U.pKey = _d.pKey;
	initDataset(_U);
	return _U;
};
function _initField(dataset, _bJ, _aX, viewField, mask, _bA, toolTip, _ad, _aI,
		scale, required, readonly, currencyAlign, tag, dropDown,
		dropDownDataset, radio, RadioDataset, editType, multiple) {
	_aY = dataset.addField(_bJ, _aX);
	_aY.label = _ad;
	_aY.size = _aI;
	_aY.scale = scale;
	_aY.readOnly = readonly;
	_aY.required = required;
	_aY.nullable = true;
	_aY.defaultValue = getDecodeStr("");
	_aY.updatable = true;
	_aY.valueProtected = false;
	_aY.visible = true;
	_aY.autoGenId = false;
	_aY.tableName = "";
	_aY.fieldName = _bJ;
	_aY.editorType = "";
	_aY.multiple = (multiple == "true" ? true : false);
	_aY.editType = editType;
	try {
		_aY.mask = eval(mask);
	} catch (e) {
	}
	_aY.maskErrorMessage = _bA;
	_aY.toolTip = toolTip;
	_aY.lobDownloadURL = getDecodeStr("");
	_aY.lobPopupURL = getDecodeStr("");
	_aY.radio = radio;
	_aY.RadioDataset = RadioDataset;
	_aY.tag = tag;
	_aY.viewField = viewField;
	_aY.dropDown = dropDown;
	_aY.dropDownDataset = dropDownDataset;
	_aY.currencyAlign = currencyAlign;
};
function _initDataset(dataset, cqId, pageSize, databusId, masterDataset,
		references, submitData, insertOnEmpty, sessionKey, _bU, init, type,
		pKey) {
	var _t = dataset;
	_t.flushData = dataset_flushData_new;
	_t.readOnly = false;
	_t.cqId = cqId;
	_t.pageSize = pageSize;
	_t.databusId = databusId;
	_t.pageIndex = 1;
	_t.pageCount = 1;
	_t.masterDataset = masterDataset;
	_t.references = references;
	_t.submitData = submitData;
	_t.autoLoadPage = false;
	_t.autoLoadDetail = true;
	_t.downloadUrl = getDecodeStr("~2fextraservice~2fdownloaddata");
	_t.insertOnEmpty = insertOnEmpty;
	_t.tag = "";
	_t.type = type;
	_t.pKey = pKey;
	_t.sessionKey = sessionKey;
	converStr2DataSetParameter(_bU, _t);
	_t.setParameter("CQId", cqId, "string");
	_t.setParameter("nextPage", _t.pageIndex);
	_t.setParameter("everyPage", _t.pageSize);
	_t.setParameter("_session_key", _t.sessionKey);
	_t.setParameter("databusId", _t.databusId);
	_t.init = init;
	_t.initDocumentFlag = false;
};
function dataset_flushData_new(pageIndex) {
	try {
		var dataset = this;
		var _aW = getElementEventName(dataset, "flushDataPre");
		if (isUserEventDefined(_aW)) {
			var _aJ = fireUserEvent(
					getElementEventName(dataset, "flushDataPre"), [ dataset ]);
			if (typeof (result) == "boolean" && !result) {
				return;
			}
		}
		_dataset_flushData_new(dataset, pageIndex);
		fireUserEvent(getElementEventName(dataset, "flushDataComplete"),
				[ dataset ]);
	} catch (e) {
		processException(e);
	}
};
function _dataset_flushData_new(dataset, pageIndex) {
	dataset.disableControls();
	var loadDetail = false;
	try {
		dataset.clearData();
		if (dataset.sessionKey) {
			var _url = _application_root + dataset.downloadUrl;
			var pageSize = dataset.pageSize;
			var _u = new Object();
			_u = converDateSetParameter2Map(dataset, _u);
			_u["nextPage"] = pageIndex;
			_u["everyPage"] = pageSize;
			_u["_session_key"] = dataset.sessionKey;
			DWREngine.setAsync(false);
			var result = new Object();
			CommonQueryResultProcess
					.processAsyncBean(
							_u,
							function(_bj) {
								result._ae = _bj.fieldString;
								result.recordStr = _bj.recordString;
								result.recordOrigStr = _bj.recordOrigString;
								result.pageCount = _bj.pageCount;
								result.pageIndex = pageIndex;
								result.pageSize = pageSize;
								dataset.resCd = _bj.resCd;
								if (_bj.resCd != '000000') {
									dataset.pageIndex = 1;
									dataset.pageCount = 0;
									var err = new Error(_bj.resMsg);
									err.name = _bj.resCd;
									throw err;
								} else {
									if (result.recordStr) {
										appendFromDataString(dataset,
												result._ae, result.recordStr,
												true);
									}
									dataset.pageIndex = result.pageIndex;
									dataset.pageCount = result.pageCount;
									converStr2DataSetParameter(
											_bj.parameterString, dataset);
									var record = dataset.firstUnit;
									var i = 0;
									while (record) {
										i++;
										initRecord(record, dataset);
										if (i / pageSize < 1)
											record.pageIndex = 1;
										else {
											record.pageIndex = calcPageCount(i,
													pageSize);
										}
										record = record.nextUnit;
									}
									if (result.pageCount == 1) {
										dataset.pageCount = calcPageCount(i,
												pageSize);
									}
								}
								dataset.enableControls();
								dataset.loadDetail();
								fireUserEvent(getElementEventName(dataset,
										"flushDataPost"), [ dataset ]);
								if (_lastDataSetID == dataset.id) {
									eval("initDropDownValues();fireUserEvent(\"initCallGetter_post\",0);resetDataSetRecordState();");
								}
								loadDetail = true;
							});
			delete _u;
			DWREngine.setAsync(true);
			return result;
		}
	} catch (e) {
		processException(e);
	} finally {
	}
};
function _downloadData_new(dataset, pageSize, pageIndex) {
	try {
		dataset.disableControls();
		dataset.clearData();
		if (dataset.sessionKey) {
			var _url = _application_root + dataset.downloadUrl;
			var _u = new Object();
			_u = converDateSetParameter2Map(dataset, _u);
			_u["nextPage"] = pageIndex;
			_u["everyPage"] = pageSize;
			_u["_session_key"] = dataset.sessionKey;
			var result = new Object();
			DWREngine.setAsync(false);
			CommonQueryResultProcess.processAsyncBean(_u, function(_bj) {
				result._ae = _bj.fieldString;
				result.recordStr = _bj.recordString;
				result.recordOrigStr = _bj.recordOrigString;
				result.pageCount = _bj.pageCount;
				result.pageIndex = pageIndex;
				result.pageSize = pageSize;
				if (_bj.resCd != '000000') {
					var err = new Error(_bj.resMsg);
					err.name = _bj.resCd;
					throw err;
				}
			});
			DWREngine.setAsync(true);
			return result;
		}
	} catch (e) {
		processException(e);
	} finally {
		dataset.disableControlCount = (dataset.disableControlCount > 0) ? dataset.disableControlCount - 1
				: 0;
	}
};
function getResultData(paramMap, pageSize, pageIndex) {
	var _bj = "";
	DWREngine.setAsync(false);
	useLoadingMessage('loading...');
	CommonQueryResultProcess.processAsyncBean(paramMap["_param_str"], function(
			result) {
		_bj = result;
	});
	DWREngine.setAsync(true);
	return _bj;
};
var _cur_event_button;
function set_cur_event_button(disabled) {
	if (disabled) {
		var op = event.srcElement.defaultOperation.toLowerCase();
		if ('submitform' == op || 'syncsubmit' == op || 'asysubmit' == op
				|| 'asyncqrysubmitflush' == op || 'asyncqrysubmitflush' == op) {
			_cur_event_button = event.srcElement;
			_cur_event_button.disabled = true;
		}
	} else {
		if (_cur_event_button) {
			_cur_event_button.disabled = false;
			_cur_event_button = null;
		}
	}
};
function _button_onclick_new(id) {
	try {
		var button = eval('$("#' + id + '")');
		button = button.get(0);
		var result = fireUserEvent(id + "_" + "onClickCheck", [ button ]);
		if (typeof (result) == "boolean" && !result) {
			return false;
		}
		if (button.defaultOperation) {
			switch (button.defaultOperation.toLowerCase()) {
			case "submitupdate":
				if (button.submitManager) {
					eval(button.submitManager + ".submit();");
				}
				break;
			case "refreshpage":
				window.open(window.location, "_self");
				//window.open(window.location.href, "_self");
				break;
			case "submitform":
				var dataset = getDatasetByID(button.componentDataset);
				var form = document.createElement("FORM");
				form.method = "post";
				if (button.url) {
					form.action = megerURL(_application_root,
							_transDataActionURL);
				} else {
					form.action = _application_root + "#";
				}
				form.style.visibility = "hidden";
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					form.insertAdjacentHTML("beforeEnd",
							"<input type=\"hidden\" name=\""
									+ dataset.getField(i).fieldName + "\" >");
				}
				form.insertAdjacentHTML("beforeEnd",
						"<input type=\"hidden\" name=\"_button_id\" >");
				form.insertAdjacentHTML("beforeEnd",
						"<input type=\"hidden\" name=\"CQId\" >");
				document.body.appendChild(form);
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					form[dataset.getField(i).fieldName].value = dataset
							.getString(i);
				}
				form["_button_id"].value = button.id;
				form["CQId"].value = dataset.cqId;
				form.submit();
				break;
			case "syncsubmit":
				var dataset = getDatasetByID(button.componentDataset);
				var targetFrame = button.targetFrame == "" ? "_self"
						: button.targetFrame;
				var form = document.createElement("FORM");
				form.target = targetFrame;
				form.method = "post";
				if (button.url) {
					form.action = megerURL(_application_root, button.url);
				} else {
					form.action = _application_root + "#";
				}
				form.style.visibility = "hidden";
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					form.insertAdjacentHTML("beforeEnd",
							"<input type=\"hidden\" name=\""
									+ dataset.getField(i).fieldName + "\" >");
				}
				document.body.appendChild(form);
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					form[dataset.getField(i).fieldName].value = dataset
							.getString(i);
				}
				form.submit();
				break;
			case "asysubmit":
				var _B = translateDataset2Bean(button);
				if (checkRequireBeforeSubmit(button)) {
					var updateClass = button.updateclass;
					var targetFrame = button.targetFrame == "" ? "_self"
							: button.targetFrame;
					CommonQueryUpdateProcess.savaOrUpdate(updateClass, _B,
							function(result) {
								var _bj = result;
								if (_bj.resCd == '000000') {
									try {
										var _s = _bj.paramMap;
										button.returnParam = _s;
										var _E = true;
										_E = fireUserEvent(getElementEventName(
												button, "postSubmit"),
												[ button ]);
										var url = button.url;
										var path;
										if (url != "" && url != "#") {
											path = megerURL(_application_root,
													url);
										} else if (url == "#") {
											path = "#";
										} else {
											path = _successURL;
										}
										if (path != "#") {
											window.open(path, targetFrame);
										}
									} catch (e) {
									} finally {
										_resetRecordState2(button);
									}
								} else {
									var err = new Error(result.resMsg);
									err.name = result.resCd;
									throw err;
								}
							});
				}
				break;
			case "asyncqrysubmit":
				var dataset = getDatasetByID(button.componentDataset);
				if (!checkBeforeQuerySubmit(button))
					return;
				var _u = new Object();
				_u = converDateSet2Map(dataset);
				_u = converDateSetParameter2Map(dataset, _u);
				CommonQueryResultProcess
						.processAsyncBean(
								_u,
								function(result) {
									var _bj = result;
									_bj.url = _application_root + button.url;
									if (_bj.resCd != '000000') {
										var err = new Error(_bj.resMsg);
										err.name = _bj.resCd;
										throw err;
									} else {
										if (_bj.pageCount == 0) {
											wrnAlert(constNoFoundRecode);
											return;
										}
										converStr2DataSetParameter(
												_bj.parameterString, dataset);
										var form = document
												.createElement("FORM");
										form.method = "post";
										if (button.url) {
											form.action = megerURL(
													_application_root,
													button.url);
										} else {
											form.action = _application_root
													+ "#";
										}
										form.style.visibility = "hidden";
										for (var i = 0; i < dataset.fields.fieldCount; i++) {
											form
													.insertAdjacentHTML(
															"beforeEnd",
															"<input type=\"hidden\" name=\""
																	+ dataset
																			.getField(i).fieldName
																	+ "\"  value=\""
																	+ dataset
																			.getString(i)
																	+ "\">");
										}
										var pId, pVal;
										var _bv = converDateSetParameter2Str(dataset);
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"_paramStr_\" value=\""
														+ _bv + "\">");
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"CQId\" value=\""
														+ _bj.cqId + "\">");
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"fieldString\" value=\""
														+ _bj.fieldString
														+ "\">");
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"recordString\" value=\""
														+ _bj.recordString
														+ "\">");
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"recordOrigString\" value=\""
														+ _bj.recordOrigString
														+ "\">");
										form
												.insertAdjacentHTML(
														"beforeEnd",
														"<input type=\"hidden\" name=\"pageCount\" value=\""
																+ _bj.pageCount
																+ "\">");
										form
												.insertAdjacentHTML(
														"beforeEnd",
														"<input type=\"hidden\" name=\"pageIndex\" value=\""
																+ _bj.pageIndex
																+ "\">");
										form.insertAdjacentHTML("beforeEnd",
												"<input type=\"hidden\" name=\"pageSize\" value=\""
														+ _bj.pageSize + "\">");
										document.body.appendChild(form);
										form.submit();
									}
								});
				break;
			case "addrecord":
				var dataset = getDatasetByID(button.componentDataset);
				dataset.insertRecord("end");
				fireUserEvent(getElementEventName(button, "onClick"),
						[ button ]);
				break;
			case "delrecord":
				var dataset = getDatasetByID(button.componentDataset);
				var _V = dataset.getRealRecordCounts();
				if (_V != 0) {
					dataset.deleteRecord();
				} else {
				}
				break;
			case "asyncqrysubmitflush":
				var dataset = getDatasetByID(button.componentDataset);
				if (!checkBeforeQuerySubmit(button))
					return;
				var resultDataset = getDatasetByID(button.resultDataset);
				copyDateSetParameter(dataset, resultDataset);
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
					resultDataset.setParameter(dataset.getField(i).fieldName,
							dataset.getString(i));
				}
				funPreHook(_theme_root + "/loading.gif");
				resultDataset.flushData(1);
				break;
			case "href":
				if (button.url) {
					var targetFrame = button.targetFrame == "" ? "_self"
							: button.targetFrame;
					var path = megerURL(_application_root, button.url);
					if (targetFrame == "_self") {
						window.location = path;
						//window.location.href = path;
					} else {
						window.open(path, targetFrame);
					}
				}
				break;
			case "modesubmit":
				var dataset = getDatasetByID(button.componentDataset);
				var targetFrame = button.targetFrame == "" ? "_self"
						: button.targetFrame;
				for (var i = 0; i < dataset.fields.fieldCount; i++) {
				}
				window
						.showModalDialog(
								megerURL(_application_root, button.url), "",
								"dialogHeight:600px; dialogWidth:600px; status:no; help:no; scroll:auto");
				break;
			case "delrecordasysubmit":
				var dataset = getDatasetByID(button.componentDataset);
				var _V = dataset.getRealRecordCounts();
				if (_V != 0) {
					var _B = translateDataset2Bean(button);
					var _aF = checkDelRecordSubmitNeeded(button);
					var _P = true;
					if (_aF) {
						_P = checkBeforeDelRecordSubmit(button);
					} else {
						dataset.deleteRecord();
						break;
					}
					if (_P) {
						if (_aF) {
							var updateClass = button.updateclass;
							var targetFrame = button.targetFrame == "" ? "_self"
									: button.targetFrame;
							CommonQueryUpdateProcess
									.savaOrUpdate(
											updateClass,
											_B,
											function(result) {
												var _bj = result;
												if (_bj.resCd == '000000') {
													try {
														var _ai = getDatasetByID(button.componentDataset);
														_ai.deleteRecord();
														var _s = _bj.paramMap;
														button.returnParam = _s;
														var _E = true;
														_E = fireUserEvent(
																getElementEventName(
																		button,
																		"postSubmit"),
																[ button ]);
														var url = button.url;
														var path;
														if (url != ""
																&& url != "#") {
															path = megerURL(
																	_application_root,
																	url);
														} else if (url == "#") {
															path = "#";
														} else {
															path = _successURL;
														}
														if (path != "#") {
															window
																	.open(path,
																			targetFrame);
														}
													} catch (e) {
													} finally {
														_resetRecordState2(button);
													}
												} else {
													var err = new Error(
															result.resMsg);
													err.name = result.resCd;
													throw err;
												}
											});
						}
					}
				}
				break;
			}
			;
		} else {
			fireUserEvent(getElementEventName(button, "onClick"), [ button ]);
		}
	} catch (e) {
		processException(e);
	} finally {
	}
};
function checkRequireBeforeSubmit(button) {
	var result = fireUserEvent(getElementEventName(button, "needCheck"),
			[ button ]);
	if (typeof (result) == "boolean" && !result) {
		return true;
	}
	var updateSize = isNaN(button.submitUpdateTotalListSize) ? 0
			: button.submitUpdateTotalListSize;
	var noneSize = isNaN(button.noneListSize) ? 0 : button.noneListSize;
	var deleteSize = isNaN(button.deleteSize) ? 0 : button.deleteSize;
	if (updateSize == 0 && noneSize == 0 && deleteSize == 0) {
		alert(constCheckModify);
		return false;
	} else if (updateSize != 0) {
		var _bN = new Array();
		if (button.submitDataset) {
			_aT = button.submitDataset.split(";");
			for (var j = 0; j < _aT.length; j++) {
				var _i = getDatasetByID(_aT[j]);
				_i.type == "result";
				_bN[_bN.length] = _i;
			}
		} else {
			_bN = getDatasets();
		}
		var _aQ = "";
		var _aE = "";
		var isValid = false;
		for (var k = 0; k < _bN.length; k++) {
			var dataset = _bN[k];
			if (dataset.record == null) {
				continue;
			}
			if (dataset.type != "interface" && dataset.type != "dropdown"
					&& dataset.id != "_tmp_dataset_date") {
				var _bM = _FieldValid(dataset);
				var fieldArray = _bM['fieldArray'];
				if (!isValid)
					isValid = _bM['isValid'];
				var fieldCount = fieldArray.length;
				for (var i = 0; i < fieldCount; i++) {
					try {
						if (fieldArray[i].tag != "selectName"
								&& fieldArray[i].tag != "radioName"
								&& fieldArray[i].label != ""
								&& dataset.getValue(fieldArray[i].fieldName) == "") {
							if (!isTrue(fieldArray[i].readOnly)
									&& isTrue(fieldArray[i].required)) {
								_aQ += constErrFieldValueRequired.replace("%s",
										fieldArray[i].label)
										+ '\n';
							}
						}
					} catch (e) {
					}
				}
			}
		}
		if (_aQ != "") {
			_aQ = _aQ.replace(/\<br\>/gi, "");
			errAlert(_aQ);
			return false;
		}
		if (isValid) {
			return false;
		} else {
			return true;
		}
	}
	return true;
};
function checkBeforeQuerySubmit(button) {
	var result = fireUserEvent(getElementEventName(button, "needCheck"),
			[ button ]);
	if (typeof (result) == "boolean" && !result) {
		return true;
	}
	var dataset = getDatasetByID(button.componentDataset);
	if (dataset.record == null) {
		return true;
	}
	var _aQ = "";
	var _aE = "";
	var _bM = _FieldValid(dataset);
	var fieldArray = _bM['fieldArray'];
	var fieldCount = fieldArray.length;
	for (var i = 0; i < fieldCount; i++) {
		if (fieldArray[i].tag
				&& (fieldArray[i].tag == "selectName" || fieldArray[i].tag == "radioName")) {
			continue;
		}
		if (!isTrue(fieldArray[i].readOnly) && isTrue(fieldArray[i].required)
				&& dataset.getValue(fieldArray[i].fieldName) == "") {
			_aQ += constErrFieldValueRequired.replace("%s",
					dataset.fields[i].label)
					+ '\n';
		}
	}
	if (_aQ.length != 0) {
		_aQ = _aQ.replace(/\<br\>/gi, "");
		throw _aQ;
	}
	if (_bM['isValid']) {
		return false;
	} else {
		return true;
	}
};
function validateQuery(isValid, _as) {
	var input = $(_as);
	switch (input.attr('editType')) {
	case "numberbox":
		;
	case "validatebox":
		if (!input.validatebox('isValid')) {
			isValid = true;
		}
		;
		break;
	case "month":
		;
	case "dropDownSelect":
		if (!input.combo('isValid')) {
			isValid = true;
		}
		;
		break;
	case "datetimebox":
		;
	case "datebox":
		if (!input.datebox('isValid')) {
			isValid = true;
		}
		;
		break;
	case "hidden":
		if (!input.validatebox('isValid')) {
			isValid = true;
			alert('隐藏字段- ' + input.attr('dataField') + ' -为空，请输入值！');
		}
		;
		break;
	}
	return isValid;
};
function translateDataset2List(_au) {
	var dataset = getDatasetByID(_au);
	var list = new Array();
	var record = dataset.firstUnit;
	var i = 0;
	while (record) {
		if (record.recordState != "none" && record.recordState != "discard") {
			var map = translateRecord2Map(dataset, record);
			list[i] = map;
			i++;
		}
		_resetRecordState(record);
		record = record.nextUnit;
	}
	return list;
};
function translateRecord2Map(dataset, record) {
	var _aN = {};
	var key;
	var value;
	for (var j = 0; j < dataset.fields.fieldCount; j++) {
		key = dataset.getField(j).fieldName;
		value = record.getString(j);
		_aN[key] = value;
	}
	if (record.recordState == "new") {
		_aN["recordState"] = "insert";
	} else {
		_aN["recordState"] = record.recordState;
	}
	return _aN;
};
function resetDataSetRecordState() {
	var _bN = getDatasets();
	for (var k = 0; k < _bN.length; k++) {
		var dataset = _bN[k];
		if (!dataset.loadCompleted) {
			dataset.loadCompleted = true;
			if (dataset.type && dataset.type == "result") {
				var record = dataset.firstUnit;
				while (record) {
					record.recordState = "none";
					record = record.nextUnit;
				}
			}
		}
	}
};
var _lastDataSetID = null;
function initCallGetter() {
	var _bN = getDatasets();
	useLoadingImage(_theme_root + "/loading.gif");
	fireUserEvent("initCallGetter_pre", 0);
	DWREngine.beginBatch();
	DWREngine.setOrdered(true);
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		if (dataset.type && dataset.type == "dropdown") {
			if (dataset.init && dataset.init == "true") {
			} else {
			}
		} else {
		}
	}
	_lastDataSetID = null;
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		if (dataset.type && dataset.type == "result") {
			if (dataset.init && dataset.init == "true") {
				_lastDataSetID = dataset.id;
			}
		}
	}
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		fireUserEvent(getElementEventName(dataset, "requestInit"), []);
		if (dataset.type && dataset.type == "result") {
			if (dataset.init && dataset.init == "true") {
				dataset.flushData(1);
			}
		} else {
		}
	}
	if (!_lastDataSetID) {
		eval("initDropDownValues();fireUserEvent(\"initCallGetter_post\",0);resetDataSetRecordState();");
	}
	DWREngine.setOrdered(false);
	DWREngine.endBatch();
};
function initLetCallGetter(id) {
	var _bN = getDatasets();
	useLoadingImage(_theme_root + "/loading.gif");
	fireUserEvent(id + "_initCallGetter_pre", 0);
	DWREngine.beginBatch();
	DWREngine.setOrdered(true);
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		if (dataset.type && dataset.type == "dropdown") {
			if (!dataset.loadCompleted && dataset.init
					&& dataset.init == "true") {
				dataset.flushData(1);
			} else {
			}
		} else {
		}
	}
	_lastDataSetID = null;
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		if (dataset.type && dataset.type == "result") {
			if (!dataset.loadCompleted && dataset.init
					&& dataset.init == "true") {
				_lastDataSetID = dataset.id;
			}
		}
	}
	for (var i = 0; i < _bN.length; i++) {
		var dataset = _bN[i];
		fireUserEvent(getElementEventName(dataset, "requestInit"), []);
		if (dataset.type && dataset.type == "result") {
			if (!dataset.loadCompleted && dataset.init
					&& dataset.init == "true") {
				dataset.flushData(1);
			}
		} else {
		}
	}
	if (!_lastDataSetID) {
		eval("initDropDownValues();fireUserEvent(\"" + id
				+ "_initCallGetter_post\",0);resetDataSetRecordState();");
	}
	DWREngine.setOrdered(false);
	DWREngine.endBatch();
};
function flushDataset(dataset) {
	dataset.disableControls();
	dataset.clearData();
	var _I = converDateSetParameter2Map(dataset);
	CommonQueryResultProcess.processAsyncBean(_I, function(result) {
		var _bj = result;
		if (_bj.resCd != '000000') {
			errAlert(_bj.resMsg);
		} else {
		}
		appendFromDataString(dataset, result.fieldString, result.recordString,
				true);
		dataset.pageIndex = result.pageIndex;
		dataset.pageCount = result.pageCount;
		converStr2DataSetParameter(result.parameterString, dataset);
		dataset.enableControls();
		dataset.loadDetail();
	});
};
function translateDataset2Bean(button) {
	var submitUpdateTotalListSize = 0;
	var deleteSize = 0;
	var noneListSize = 0;
	var _X = new Object();
	var _aD = new Object();
	var _bN = new Array();
	var dataBusId = "";
	var _c = getDatasetByID(button.componentDataset);
	var _r = _c.cqId;
	var _M = button.id;
	if (button.submitDataset) {
		_aT = button.submitDataset.split(";");
		for (var j = 0; j < _aT.length; j++) {
			var _i = getDatasetByID(_aT[j]);
			_i.type = "result";
			_bN[_bN.length] = _i;
		}
	} else {
		_bN = getDatasets();
	}
	for (var k = 0; k < _bN.length; k++) {
		var dataset = _bN[k];
		var totalList = new Array();
		if (dataset.type && dataset.type == "result") {
			var record = dataset.firstUnit;
			while (record) {
				if (dataset.submitData == "allchange") {
					if (record.recordState != "none"
							&& record.recordState != "discard") {
						var map = translateRecord2Map(dataset, record);
						totalList[totalList.length] = map;
						if (record.recordState != "delete") {
							submitUpdateTotalListSize++;
						}
						if (record.recordState == "delete") {
							deleteSize++;
						}
					}
				} else if (dataset.submitData == "current") {
					if (dataset.record == record) {
						var map = translateRecord2Map(dataset, record);
						totalList[totalList.length] = map;
						submitUpdateTotalListSize++;
					}
				} else if (dataset.submitData == "selected") {
					if (record.getValue("select")) {
						var map = translateRecord2Map(dataset, record);
						totalList[totalList.length] = map;
						submitUpdateTotalListSize++;
					}
				} else if (dataset.submitData == "all") {
					if (record.recordState != "discard") {
						var map = translateRecord2Map(dataset, record);
						totalList[totalList.length] = map;
						if (record.recordState != "none") {
							submitUpdateTotalListSize++;
						} else {
							noneListSize++;
						}
					}
				} else {
				}
				record = record.nextUnit;
			}
			var _aH = new Object();
			_aH = converDateSetParameter2Map_2(_bN[k]);
			var datasetid = dataset.id;
			if (dataBusId == "")
				dataBusId = dataset.databusId;
			datasetid = dataset.cqId;
			var _B = {
				id : datasetid,
				paramMap : _aH,
				totalList : totalList,
				recodeIndex : 0
			};
			_X[datasetid] = _B;
		}
	}
	_aD["databusId"] = dataBusId;
	var _bt = {
		updCqId : _r,
		updateResult : _X,
		paramMap : _aD,
		updBtnId : _M
	};
	button.submitUpdateTotalListSize = submitUpdateTotalListSize;
	button.noneListSize = noneListSize;
	button.deleteSize = deleteSize;
	return _bt;
};
function _resetRecordState2(button) {
	try {
		if (button.submitDataset) {
			_aT = button.submitDataset.split(";");
			for (var j = 0; j < _aT.length; j++) {
				var _i = getDatasetByID(_aT[j]);
				_i.type == "result";
				_bN[_bN.length] = _i;
			}
		} else {
			_bN = getDatasets();
		}
		for (var k = 0; k < _bN.length; k++) {
			var dataset = _bN[k];
			if (dataset.type && dataset.type == "result") {
				try {
					var record = dataset.firstUnit;
					while (record) {
						_resetRecordState(record);
						record = record.nextUnit;
					}
				} catch (e) {
				} finally {
					dataset_setState(dataset, "none");
					dataset.modified = false;
				}
			}
		}
	} catch (e) {
	}
};
function converDateSetParameter2Map_2(dataset) {
	var pId, pVal;
	var _aC = new Object();
	for (var i = 0; i < dataset.parameters.length; i++) {
		pId = dataset.parameters[i].name;
		pVal = dataset.parameters[i].value;
		if (pVal != null) {
			_aC[pId] = pVal;
		}
	}
	_aC["_dataset_id"] = dataset.id;
	return _aC;
};
function refreshProgress() {
	DWREngine.setPreHook(function() {
	});
	DWREngine.setPostHook(function() {
	});
	UploadMonitor.getUploadInfo(updateProgress);
};
function updateProgress(uploadInfo) {
	if (uploadInfo.inProgress) {
		fireUserEvent("uploadFileProgress", 0);
		var fileIndex = uploadInfo.fileIndex;
		var progressPercent = Math
				.ceil((uploadInfo.bytesRead / uploadInfo.totalSize) * 100);
		document.getElementById('progressBarText').innerHTML = 'upload in progress: '
				+ progressPercent + '%';
		document.getElementById('progressBarBoxContent').style.width = parseInt(progressPercent * 3.5)
				+ 'px';
		window.setTimeout('refreshProgress()', 1000);
	} else {
		fireUserEvent("uploadFileComplete", 0);
	}
	return true;
};
function startProgress() {
	document.getElementById('progressBar').style.display = 'block';
	document.getElementById('progressBarText').innerHTML = 'upload in progress: 0%';
	window.setTimeout("refreshProgress()", 1500);
	return true;
};
function loanPageLet(url, paramMap, _bi) {
	funPreHook(_theme_root + "/loading.gif");
	var _ak = document.getElementById(_bi);
	uninitLet(_ak);
	_ak.innerHTML = "";
	_G();
	var _bc = _A();
	var url = _application_root + url + "?_mpf_=false" + _bc;
	xmlHttp.open("POST", url, true);
	xmlHttp.onreadystatechange = _L;
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlHttp.send(_bc);
	function _L() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				_e();
			}
		}
	}
	;
	function _e() {
		var _ak = document.getElementById(_bi);
		_ak.innerHTML = xmlHttp.responseText;
		$.parser.parse($(_ak));
		_x(_ak);
		initDocumentLet(_ak);
	}
	;
	function _x(parent) {
		var _ak = parent;
		var arg = _ak.getElementsByTagName("SCRIPT");
		for (var j = 0; j < arg.length; j++) {
			CQSPACE.Eval(arg[j].innerHTML);
		}
	}
	;
	function _G() {
		if (window.ActiveXObject) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		}
	}
	;
	function _A() {
		var pId, pVal;
		var _bc = "";
		var _bs = paramMap.keys();
		for (var i = 0; i < _bs.length; i++) {
			pId = _bs[i];
			pVal = paramMap.get(pId);
			_bc += "&" + pId + "=" + pVal;
		}
		return _bc;
	}
	;
};
function unloadPageLet(_bi) {
	funPreHook(_theme_root + "/loading.gif");
	var _ak = document.getElementById(_bi);
	uninitLet(_ak);
	_ak.innerHTML = "";
	funPostHook();
};
var CQSPACE = {};
CQSPACE.Eval = function(code) {
	if (null == code || "" == code) {
		return;
	}
	if (!!(window.attachEvent && !window.opera)) {
		execScript(code);
	} else {
		window.eval(code);
	}
};
var win = {
	target : {},
	close : function() {
		this.target.window("close");
	}
};
function loadPageWindows(id, title, url, paramMap, zone) {
	if (!$('#' + id)[0]) {
		$(document.body).append(
				"<div id='" + id + "' title='" + title + "'><div id='" + id
						+ "_" + zone + "'/></div>");
	}
	$('<input type="text" style="width:0;height:0;" name="_alertFocusCtr"/>')
			.appendTo(document.body).focus().remove();
	var _win = $('#' + id).window({
		id : id,
		width : 600,
		minimizable : false,
		maximizable : false,
		height : 400,
		modal : true,
		onBeforeClose : function() {
			var _aW = id + "_onCloseCheck";
			if (isUserEventDefined(_aW)) {
				var _aJ = fireUserEvent(_aW, [ $('#' + id)[0] ]);
				if (typeof (_aJ) == "boolean") {
					if (_aJ != true) {
						return false;
					}
				}
			}
			return true;
		}
	});
	_win.window('maximize');
	loanPageLet(url, paramMap, id + "_" + zone);
	win.target = _win;
};
function unloadPageWindows(id) {
	$('#' + id).window('close');
};
function createWindows(id, left, top, width, height) {
	var win = dhxWins.createWindow(id, left, top, width, height);
	win.setModal(true);
	win.keepInViewport(true);
	win.clearIcon();
	win.denyMove();
	win.button("help").show();
	win.button("stick").show();
	win.button("minmax1").hide();
	win.button("minmax2").hide();
	return win;
};
function _printButton_onclick() {
	showLoadingImage(_theme_root + "/loading.gif", true);
	var button = event.srcElement;
	var _ae = button._ae;
	var dataset = button.componentDataset;
	var headTitle = button.headTitle;
	var _aU = "_" + dataset + "_print";
	_y = copyDataset("_" + dataset + "_print", dataset);
	_y.pageIndex = 1;
	_y.pageSize = 10000;
	_y.setReadOnly(true);
	_y.flushData(1);
	printDatasetASExcel(_y, _ae, headTitle);
	_y.clearData();
	delete _y;
	showLoadingImage(_theme_root + "/loading.gif", false);
};
function checkDelRecordSubmitNeeded(button) {
	var _c = getDatasetByID(button.componentDataset);
	if (_c.record.recordState == "new" || _c.record.recordState == "insert") {
		return false;
	}
	return true;
};
function checkBeforeDelRecordSubmit(button) {
	var _c = getDatasetByID(button.componentDataset);
	var updateSize = isNaN(button.submitUpdateTotalListSize) ? 0
			: button.submitUpdateTotalListSize;
	var deleteSize = isNaN(button.deleteSize) ? 0 : button.deleteSize;
	if (updateSize == 1
			&& (_c.record.recordState == "modify"
					|| _c.record.recordState == "new" || _c.record.recordState == "insert")) {
		return true;
	} else if (updateSize != 0 || deleteSize != 0) {
		return confirm(constDatasetConfirmSubmitModifiedRecordsSameTime);
	}
	return true;
};
function _printapplet_clearUrlList() {
	var _Q = document.getElementById('PrintApplet');
	_Q.clearUrlList();
};
function _printapplet_addReportUrl(_bq, _bo, _bl) {
	var _Q = document.getElementById('PrintApplet');
	var _W = _application_root + "/PrintServlet?";
	if (_bl == null) {
		_Q.addReportUrl(_W + "report_id=" + _bq + "&" + _bo);
	} else {
		_Q.addReportUrl(_W + "report_id=" + _bq + "&" + _bo, _W + "report_id="
				+ _bq + "&" + _bl);
	}
};
function _printapplet_showViewForm() {
	var _Q = document.getElementById('PrintApplet');
	_Q.showViewForm();
};
function openSubWin(id, title, url, width, height, cache, modal, _b) {
	var body = $(document.body);
	var win = $("#subwin_" + id);
	var _url = _application_root + url;
	if (url && url.startWith(_application_root)) {
		_url = url;
	}
	if (win[0]) {
		win.window("open");
	} else {
		win = $("<div/>").attr("id", "subwin_" + id).attr("title",
				title || "&nbsp;").appendTo(body);
		if (_url.indexOf("?") > -1) {
			_url += "&_dd_=" + new Date().getTime();
		} else {
			_url += "?_dd_=" + new Date().getTime();
		}
		var ifr = $(
				'<iframe scrolling="yes" frameborder="0" src="' + _url
						+ '" style="width:100%;height:100%;"></iframe>')
				.appendTo(win);
		win.window({
			width : width || 600,
			minimizable : false,
			maximizable : true,
			collapsible : false,
			height : height || 400,
			modal : true,
			ifr : ifr,
			onBeforeClose : function() {
				var panel = $.data(this, 'panel').panel;
				var p = panel.parent();
				p.removeClass("panel-noscroll");
				if (p[0].tagName == "BODY") {
					$("html").removeClass("panel-fit");
				}
				if (_b) {
					_b("close");
					return true;
				}
				var _aW = id + "_onCloseCheck";
				if (isUserEventDefined(_aW)) {
					var _aJ = fireUserEvent(_aW, [ win[0] ]);
					if (typeof (_aJ) == "boolean") {
						return _aJ;
					}
				}
				return true;
			}
		});
	}
	var _z = undefined ? true : cache;
	var opts = win.window('options');
	if (!_z) {
		opts.ifr[0].contentWindow.document.write("");
		opts.ifr.attr("src", _url);
		win.panel("setTitle", title);
		win.window("center");
		win.window("maximize");
	}
	this.doHandler = function(sign) {
		try {
			_b(sign);
		} catch (e) {
			errAlert(e.message);
		}
	};
	this.close = function() {
		win.window("close");
	};
	return this;
}