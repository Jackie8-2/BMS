<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>

<@CommonQueryMacro.page title="岗位权限管理">
<script type="text/javascript" src="${contextPath}/js/xmlUtil.js"></script>
<script type="text/javascript" src="${contextPath}/js/tree.js"></script>
<script type="text/javascript" src="${contextPath}/js/xtree.js"></script>
<script type='text/javascript' src='${contextPath}/dwr/interface/PrivAction.js'> </script>
<@CommonQueryMacro.CommonQuery id="RoleInfoManage" init="true">
<table align="left" width="100%">
	<tr >
		<td  align="left">
				<@CommonQueryMacro.Group id ="RoleInfoManageGroup" label="岗位权限选择" fieldStr="id,roleName" colNm=4/>
		</td>
	</tr>
	<tr>
		<td  align="left">
		 	<@CommonQueryMacro.Button id= "btOpen" />
		 	&nbsp;&nbsp;&nbsp;&nbsp;
			<@CommonQueryMacro.Button id= "btSelectAll" />
			&nbsp;&nbsp;&nbsp;&nbsp;
	  		<@CommonQueryMacro.Button id= "btUnSelectAll" />
	  		&nbsp;&nbsp;&nbsp;&nbsp;
	  		<@CommonQueryMacro.Button id= "btSave" />
	  		&nbsp;&nbsp;&nbsp;&nbsp;
	  		<@CommonQueryMacro.Button id= "btCancel" />
	  	</td>
	</tr>
	<tr>
		<td align="left">
		 <div id="tree">
			<script language="javascript">
				var functree = null;
				dwr.engine.setAsync(false);
				PrivAction.getFuncArray(
					function(data){
						functree = data;
					}
				);
				dwr.engine.setAsync(true);
                createTree(functree,0,0);
           </script>
          </div>
		</td>
	</tr>
</table>
</@CommonQueryMacro.CommonQuery>
<span style="display:none">
<@CommonQueryMacro.CommonQuery id="PosiNameCheck" init="false" navigate="false" >
</@CommonQueryMacro.CommonQuery>
</span>
<script language="javascript">
	
	var op = "${RequestParameters['op']?default('')}";
	_close_flag = true;

	function load() {
		funSelectNo();
		var value = RoleInfoManage_dataset.getString("id");
		if (value == "") {
			RoleInfoManage_dataset.setFieldReadOnly("rolename", false);
		} else {
			RoleInfoManage_dataset.setFieldReadOnly("rolename", false);
			PrivAction.getRoleFuncByid(value, selectFunction);
		}
	}
	
	function selectFunction(data) {
		for (var i = 0; i < data.length; i++) {
			var num = "id" + data[i];
			if (document.getElementById(num) != null) {
				document.getElementById(num).checked = true;
			}
		}
		//<#--20110818 BMSA-54 权限树目录菜单可全选 begin -->
		pcheck();
		//<#--20110818 BMSA-54 权限树目录菜单可全选 end -->
	}

	function initCallGetter_post() {
		load();
		if ('detail' == op) {
			var chkboxs = $(":checkbox");
			var len = chkboxs.length;
			RoleInfoManage_dataset.setFieldReadOnly("rolename", true);
			for (i = 0; i < len; i++) {
				chkboxs[i].disabled = true;
			}
			btSelectAll.disable(true);
			btUnSelectAll.disable(true);
			btSave.disable(true);
		}
	}


	function btSelectAll_onClick(button) {
		funSelectAll();
	}
	//全选
	function funSelectAll() {
		var len = document.getElementsByName("id").length;
		for (i = 0; i < len; i++) {
			if (document.getElementsByName("id")[i].disabled == false) {
				document.getElementsByName("id")[i].checked = true;
			}
		}
		//<#--20110818 BMSA-54 权限树目录菜单可全选 begin -->
		pcheck(1);
		//<#--20110818 BMSA-54 权限树目录菜单可全选 end -->
	}
	
	
	function btUnSelectAll_onClick(button) {
		funSelectNo();
	}
	//全不选
	function funSelectNo() {
		var len = document.getElementsByName("id").length;
		for (i = 0; i < len; i++) {
			if (document.getElementsByName("id")[i].disabled == false) {
				document.getElementsByName("id")[i].checked = false;
			}
		}
		//<#--20110818 BMSA-54 权限树目录菜单可全选 begin -->
		pcheck(0);
		//<#--20110818 BMSA-54 权限树目录菜单可全选 end -->
	}
	
	//得到所选的权限
	function getCheckDatas() {
		var len = document.getElementsByName("id").length;
		var s = "";
		var flag = 0;
		for (i = 0; i < len; i++) {
			if (document.getElementsByName("id")[i].checked == true) {
				if (flag > 0)
					s += ",";
				s += document.getElementsByName("id")[i].value;
				flag++;
			}
		}
		return s;

	}

	function btOpen_onClick(button) {
		viewtree();
	}
	//展开节点树
	function viewtree() {
		if (_close_flag) {
			closeAll(1);
			_close_flag = false;
		} else {
			closeAll(0);
			_close_flag = true;
		}
	}
	
	function btSave_onClickCheck(button) {
		save();
		return true;
	}

	function save() {
		var s = getCheckDatas();
		//因为无法获取id,所以必须传到后台处理:
		RoleInfoManage_dataset.setValue("roleList", s);
	}
	
	function RoleInfoManage_dataset_afterChange(dataset, field, value) {
		if (field.fieldName == "roleName") {
			PosiNameCheck_dataset.setParameter("roleName", RoleInfoManage_dataset
					.getValue("roleName"));
			PosiNameCheck_dataset.flushData(0);
			var v_flag = PosiNameCheck_dataset.getValue("flag");
			if (v_flag == "true") {
				alert("该岗位名称已存在，请重新输入");
				RoleInfoManage_dataset.setValue("roleName", "");
				return false;
			}
		}
	}

	function btCancel_onClickCheck() {
		if ('detail' == op) {
			closeWind();
		} else
			btCancel.click();
	}
</script>
</@CommonQueryMacro.page>
