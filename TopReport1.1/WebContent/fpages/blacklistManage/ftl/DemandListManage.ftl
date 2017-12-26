<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign op=RequestParameters["op"]?default("")>
<@CommonQueryMacro.page title="需求信息编辑">
    <@CommonQueryMacro.CommonQuery id="DemandListManage" init="true">
<table align="center" width="100%">
    <tr>
        <td  align="left">
				<@CommonQueryMacro.Group id ="DemandListManageGroup" label="需求信息"
                fieldStr="id,bank_id,bank_name,bank_type,bank_start,hourly_wage,demand_theme,rel_system_name,rel_system_team,dev_name,dev_day,"+
                "dev_quote_day,dev_confirm_day,confirm_no,customer_manager,cop_bank_principal,cop_bank_principal_phone,remarks"
                colNm=4/>
        </td>
    </tr>
    <tr >
        <td  align="center">
	  		<@CommonQueryMacro.Button id="btSave" />
            &nbsp;&nbsp;&nbsp;&nbsp;
			<@CommonQueryMacro.Button id="btClose" />
        </td>
    </tr>
</table>
    </@CommonQueryMacro.CommonQuery>

<script language="JavaScript">

    function btSave_onClickCheck(button) {
        var id = DemandListManage_dataset.getValue("id");
        var demand_theme = DemandListManage_dataset.getValue("demand_theme");
        var bank_name = DemandListManage_dataset.getValue("bank_name");
        DemandListManage_dataset.setParameter("opSave", "save");
        if(id == null || "" == id){
            alert("需求单号不能为空")
        }
        if (bank_name == null || "" == bank_name) {
            alert("银行名不能为空");
            return false;
        }
        if (demand_theme == null || "" == demand_theme) {
            alert("需求主题不能为空");
            return false;
        }
        return true;
    }
    //保存后刷新当前页
    function btSave_postSubmit(button) {
        alert("保存成功。");
    }
    function btClose_onClickCheck(button) {
        if(!confirm("确认取消编辑？修改将不会保存")){
            return false;
        }
        return true;
    }

    function btClose_onClick(button) {
        flushCurrentPage();
        window.location = "${contextPath}/fpages/blacklistManage/ftl/DemandlistEdit.ftl";

    }
    //刷新当前页
    function flushCurrentPage() {
        DemandListManage_dataset
                .flushData(DemandListManage_dataset.pageIndex);
    }



</script>
</@CommonQueryMacro.page>
