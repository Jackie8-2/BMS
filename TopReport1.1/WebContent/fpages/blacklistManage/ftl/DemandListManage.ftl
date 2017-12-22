<#import "/templets/commonQuery/CommonQueryTagMacro.ftl" as CommonQueryMacro>
<#assign op=RequestParameters["op"]?default("")>
<@CommonQueryMacro.page title="需求信息编辑">
    <@CommonQueryMacro.CommonQuery id="DemandListManage" init="true">
<table align="center" width="100%">
    <tr>
        <td  align="left">
				<@CommonQueryMacro.Group id ="DemandListManageGroup" label="需求信息"
                fieldStr="id,bank_id,bank_name,demand_theme,hourly_wage,rel_system_team,dev_confirm_day,confirm_no,status_cd,remarks"
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
</script>
</@CommonQueryMacro.page>
